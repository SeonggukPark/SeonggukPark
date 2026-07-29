from __future__ import annotations

import shutil
import socket
import subprocess
import tempfile
import time
from pathlib import Path
from urllib.request import urlopen

import fitz


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PDF = ROOT / "output" / "pdf" / "seongguk-park-resume.pdf"


def find_browser() -> Path:
    candidates = [
        Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"),
        Path(r"C:\Program Files\Google\Chrome\Application\chrome.exe"),
        Path(r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"),
    ]
    for command in ("msedge", "chrome", "chromium"):
        executable = shutil.which(command)
        if executable:
            candidates.insert(0, Path(executable))
    for candidate in candidates:
        if candidate.exists():
            return candidate
    raise FileNotFoundError("PDF 출력에 사용할 Edge 또는 Chrome을 찾을 수 없습니다.")


def find_free_port() -> int:
    with socket.socket() as listener:
        listener.bind(("127.0.0.1", 0))
        return int(listener.getsockname()[1])


def wait_for_page(url: str, process: subprocess.Popen[str], timeout: float = 30.0) -> None:
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        if process.poll() is not None:
            output = process.stdout.read() if process.stdout else ""
            raise RuntimeError(f"Astro preview가 예기치 않게 종료되었습니다.\n{output}")
        try:
            with urlopen(url, timeout=1) as response:
                if response.status == 200:
                    return
        except OSError:
            time.sleep(0.2)
    raise TimeoutError(f"페이지 로드를 기다리는 중 시간 초과: {url}")


def save_with_portfolio_link(source: Path, destination: Path) -> None:
    document = fitz.open(source)
    try:
        metadata = document.metadata
        metadata["title"] = "이력서 - 박성국"
        document.set_metadata(metadata)
        for page in document:
            for link in page.get_links():
                if link.get("uri") != "https://seonggukpark.github.io/SeonggukPark/":
                    page.delete_link(link)
        destination.unlink(missing_ok=True)
        document.save(destination, garbage=4, deflate=True)
    finally:
        document.close()


def main() -> None:
    npm = shutil.which("npm.cmd") or shutil.which("npm")
    if not npm:
        raise FileNotFoundError("npm을 찾을 수 없습니다.")

    subprocess.run([npm, "run", "build"], cwd=ROOT, check=True)

    port = find_free_port()
    url = f"http://127.0.0.1:{port}/SeonggukPark/resume/"
    preview = subprocess.Popen(
        [npm, "run", "preview", "--", "--host", "127.0.0.1", "--port", str(port)],
        cwd=ROOT,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
        creationflags=subprocess.CREATE_NO_WINDOW if hasattr(subprocess, "CREATE_NO_WINDOW") else 0,
    )

    profile_dir = Path(tempfile.mkdtemp(prefix="seongguk-resume-edge-"))
    temporary_pdf = Path(tempfile.gettempdir()) / "seongguk-park-resume-page.pdf"
    try:
        wait_for_page(url, preview)
        browser = find_browser()
        temporary_pdf.unlink(missing_ok=True)
        subprocess.run(
            [
                str(browser),
                "--headless=new",
                "--disable-gpu",
                "--disable-extensions",
                "--no-pdf-header-footer",
                "--run-all-compositor-stages-before-draw",
                "--virtual-time-budget=5000",
                f"--user-data-dir={profile_dir}",
                f"--print-to-pdf={temporary_pdf}",
                url,
            ],
            check=True,
            creationflags=subprocess.CREATE_NO_WINDOW if hasattr(subprocess, "CREATE_NO_WINDOW") else 0,
        )
        OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)
        save_with_portfolio_link(temporary_pdf, OUTPUT_PDF)
        print(f"PDF={OUTPUT_PDF}")
    finally:
        preview.terminate()
        try:
            preview.wait(timeout=5)
        except subprocess.TimeoutExpired:
            preview.kill()
        shutil.rmtree(profile_dir, ignore_errors=True)
        temporary_pdf.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
