from __future__ import annotations

import re
from pathlib import Path

import fitz
import yaml
from PIL import Image as PILImage, ImageDraw
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    Image,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs"
OUTPUT_PDF = OUTPUT_DIR / "seongguk-park-portfolio.pdf"

PAGE_WIDTH, PAGE_HEIGHT = A4
NAVY = colors.HexColor("#10243E")
BLUE = colors.HexColor("#1261A6")
SKY = colors.HexColor("#EAF3FA")
INK = colors.HexColor("#172033")
MUTED = colors.HexColor("#5E6A7C")
LINE = colors.HexColor("#D9E1EA")
PAPER = colors.HexColor("#F7F9FC")
WHITE = colors.white

FONT_PATH = Path("C:/Windows/Fonts/malgun.ttf")
BOLD_FONT_PATH = Path("C:/Windows/Fonts/malgunbd.ttf")
FONT = "Malgun"
BOLD = "MalgunBold"


def normalize(text: str) -> str:
    return (
        str(text)
        .replace("—", "-")
        .replace("–", "-")
        .replace("‑", "-")
        .replace("&", "&amp;")
    )


def register_fonts() -> None:
    if not FONT_PATH.exists() or not BOLD_FONT_PATH.exists():
        raise FileNotFoundError("맑은 고딕 글꼴을 찾을 수 없습니다.")
    pdfmetrics.registerFont(TTFont(FONT, str(FONT_PATH)))
    pdfmetrics.registerFont(TTFont(BOLD, str(BOLD_FONT_PATH)))


def build_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=9.2,
            leading=14.2,
            textColor=INK,
            wordWrap="CJK",
            spaceAfter=5,
        ),
        "small": ParagraphStyle(
            "Small",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=7.6,
            leading=11.5,
            textColor=MUTED,
            wordWrap="CJK",
        ),
        "eyebrow": ParagraphStyle(
            "Eyebrow",
            parent=base["BodyText"],
            fontName=BOLD,
            fontSize=7.5,
            leading=10,
            tracking=1.2,
            textColor=BLUE,
            spaceAfter=4,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading1"],
            fontName=BOLD,
            fontSize=19,
            leading=24,
            textColor=NAVY,
            spaceBefore=2,
            spaceAfter=9,
        ),
        "subsection": ParagraphStyle(
            "Subsection",
            parent=base["Heading2"],
            fontName=BOLD,
            fontSize=11.5,
            leading=15,
            textColor=NAVY,
            spaceBefore=7,
            spaceAfter=4,
        ),
        "item_title": ParagraphStyle(
            "ItemTitle",
            parent=base["Heading3"],
            fontName=BOLD,
            fontSize=11,
            leading=15,
            textColor=INK,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["BodyText"],
            fontName=BOLD,
            fontSize=8.2,
            leading=12,
            textColor=BLUE,
            wordWrap="CJK",
            spaceAfter=4,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=8.4,
            leading=12.5,
            leftIndent=10,
            firstLineIndent=-8,
            textColor=INK,
            wordWrap="CJK",
            spaceAfter=2.5,
        ),
        "project_title": ParagraphStyle(
            "ProjectTitle",
            parent=base["Heading1"],
            fontName=BOLD,
            fontSize=22,
            leading=27,
            textColor=NAVY,
            wordWrap="CJK",
            spaceAfter=5,
        ),
        "project_desc": ParagraphStyle(
            "ProjectDesc",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=10,
            leading=15.5,
            textColor=MUTED,
            wordWrap="CJK",
            spaceAfter=8,
        ),
        "cover_contact": ParagraphStyle(
            "CoverContact",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=9,
            leading=15,
            textColor=colors.HexColor("#D7E5F2"),
            alignment=TA_LEFT,
        ),
        "metric": ParagraphStyle(
            "Metric",
            parent=base["BodyText"],
            fontName=BOLD,
            fontSize=8.5,
            leading=12.5,
            textColor=NAVY,
            wordWrap="CJK",
            alignment=TA_CENTER,
        ),
    }


def p(text: str, style: ParagraphStyle) -> Paragraph:
    return Paragraph(normalize(text), style)


def bullet_rows(items: list[str], styles: dict[str, ParagraphStyle]) -> list[Paragraph]:
    return [p(f'<font color="#1261A6">●</font> {item}', styles["bullet"]) for item in items]


def section_header(label: str, title: str, styles: dict[str, ParagraphStyle]) -> list:
    return [
        p(label.upper(), styles["eyebrow"]),
        p(title, styles["section"]),
        HRFlowable(width="100%", thickness=0.7, color=LINE, spaceAfter=9),
    ]


def info_card(
    period: str,
    title: str,
    role: str,
    description: str,
    points: list[str],
    styles: dict[str, ParagraphStyle],
    groups: list[tuple[str, list[str]]] | None = None,
) -> Table:
    content: list = [p(title, styles["item_title"]), p(role, styles["role"]), p(description, styles["body"])]
    if groups:
        for group_title, group_items in groups:
            content.append(p(group_title, styles["subsection"]))
            content.extend(bullet_rows(group_items, styles))
    else:
        content.extend(bullet_rows(points, styles))

    table = Table(
        [[p(period, styles["small"]), content]],
        colWidths=[31 * mm, 129 * mm],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LINEAFTER", (0, 0), (0, -1), 0.6, LINE),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 9),
                ("RIGHTPADDING", (0, 0), (-1, -1), 9),
                ("TOPPADDING", (0, 0), (-1, -1), 9),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
            ]
        )
    )
    return table


def skill_table(styles: dict[str, ParagraphStyle]) -> Table:
    skills = [
        ("LANGUAGES", "C · C++ · Python"),
        ("AUTOMOTIVE", "AUTOSAR Classic · CAN(FD) · UDS · XCP · OTA"),
        ("TOOLS", "Git · Jira · VS Code · Jupyter Notebook · Windows Batch"),
        ("AI / ML", "PyTorch · TensorFlow · TensorFlow Lite"),
        ("SYSTEM", "Linux"),
    ]
    rows = [[p(name, styles["eyebrow"]), p(items, styles["body"])] for name, items in skills]
    table = Table(rows, colWidths=[34 * mm, 126 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("GRID", (0, 0), (-1, -1), 0.5, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 6),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ]
        )
    )
    return table


def load_project(path: Path) -> dict:
    raw = path.read_text(encoding="utf-8")
    _, frontmatter, body = raw.split("---", 2)
    data = yaml.safe_load(frontmatter)
    data["id"] = path.stem
    data["body"] = body
    data["images"] = [
        ROOT / "public" / ref.removeprefix("/SeonggukPark/")
        for ref in re.findall(r"!\[[^\]]*\]\(([^)]+)\)", body)
    ]
    return data


def extract_section(markdown: str, heading: str) -> tuple[list[str], list[str]]:
    match = re.search(rf"^## {re.escape(heading)}\s*$([\s\S]*?)(?=^## |\Z)", markdown, re.MULTILINE)
    if not match:
        return [], []
    block = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", match.group(1)).strip()
    bullets: list[str] = []
    paragraphs: list[str] = []
    current: list[str] = []
    for line in block.splitlines():
        stripped = line.strip()
        if not stripped:
            if current:
                paragraphs.append(" ".join(current))
                current = []
            continue
        if stripped.startswith("- "):
            if current:
                paragraphs.append(" ".join(current))
                current = []
            bullets.append(stripped[2:])
        else:
            current.append(stripped)
    if current:
        paragraphs.append(" ".join(current))
    return paragraphs, bullets


def project_image(path: Path, max_width: float, max_height: float) -> Image | None:
    if not path.exists():
        return None
    with PILImage.open(path) as source:
        width, height = source.size
    scale = min(max_width / width, max_height / height)
    return Image(str(path), width=width * scale, height=height * scale)


def project_story(project: dict, index: int, styles: dict[str, ParagraphStyle]) -> list:
    flow: list = [
        p(f"PROJECT {index:02d}", styles["eyebrow"]),
        p(project["title"], styles["project_title"]),
        p(project["description"], styles["project_desc"]),
    ]

    meta = Table(
        [
            [p("PERIOD", styles["eyebrow"]), p(project["period"], styles["small"]), p("CATEGORY", styles["eyebrow"]), p(project["category"], styles["small"])],
            [p("ROLE", styles["eyebrow"]), p(project["role"], styles["small"]), p("STACK", styles["eyebrow"]), p(" · ".join(project["tags"]), styles["small"])],
        ],
        colWidths=[18 * mm, 62 * mm, 20 * mm, 60 * mm],
    )
    meta.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                ("GRID", (0, 0), (-1, -1), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    flow.extend([meta, Spacer(1, 7 * mm)])

    if project["images"]:
        hero = project_image(project["images"][0], 160 * mm, 55 * mm)
        if hero:
            image_table = Table([[hero]], colWidths=[160 * mm], hAlign="CENTER")
            image_table.setStyle(
                TableStyle(
                    [
                        ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                        ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 4),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                        ("TOPPADDING", (0, 0), (-1, -1), 4),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                    ]
                )
            )
            flow.extend([image_table, Spacer(1, 5 * mm)])

    metrics = [p(item, styles["metric"]) for item in project.get("outcomes", [])]
    if metrics:
        metric_table = Table([metrics], colWidths=[160 * mm / len(metrics)] * len(metrics))
        metric_table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), SKY),
                    ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#BBD5EA")),
                    ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#BBD5EA")),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 6),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                    ("TOPPADDING", (0, 0), (-1, -1), 7),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
                ]
            )
        )
        flow.extend([metric_table, Spacer(1, 4 * mm)])

    pipelines = {
        "container-crane-automation": ["선적 스케줄링", "3축 임베디드 제어", "Bluetooth 통신", "Flask Web"],
        "pcb-defect-detection": ["이미지 전처리", "PCB 보드 검출", "코팅 불량 판정", "Jetson 검증"],
        "air-conditioner-clustering": ["센서 시계열", "DTW 거리 계산", "K-Means 군집화", "C++ 엔진 이식"],
        "vision-transformer-quantization": ["모델 자원 분석", "INT8 PTQ", "Profiler 측정", "Trade-off 검증"],
        "mcu-human-detection": ["데이터 구성", "MobileNet 학습", "모델 양자화", "MCU 배포"],
        "linux-realtime-rps-server": ["Socket 연결", "pthread 병렬 처리", "Mutex 동기화", "Message Queue IPC"],
    }
    pipeline = pipelines.get(project["id"])
    if pipeline:
        flow.append(p("IMPLEMENTATION FLOW", styles["eyebrow"]))
        pipeline_cells = []
        for step_index, step in enumerate(pipeline, 1):
            pipeline_cells.append(p(f'<font color="#1261A6">{step_index:02d}</font><br/>{step}', styles["metric"]))
        pipeline_table = Table([pipeline_cells], colWidths=[40 * mm] * 4)
        pipeline_table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                    ("BOX", (0, 0), (-1, -1), 0.5, LINE),
                    ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("TOPPADDING", (0, 0), (-1, -1), 5),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ]
            )
        )
        flow.extend([pipeline_table, Spacer(1, 3 * mm)])

    overview, _ = extract_section(project["body"], "프로젝트 개요")
    if overview:
        flow.append(p("프로젝트 개요", styles["subsection"]))
        flow.append(p(overview[0], styles["body"]))

    detail_heading = next(
        (heading for heading in ["담당 역할", "핵심 구현", "설계와 최적화", "연구 내용"] if f"## {heading}" in project["body"]),
        None,
    )
    if detail_heading:
        detail_paragraphs, detail_bullets = extract_section(project["body"], detail_heading)
        flow.append(p(detail_heading, styles["subsection"]))
        flow.extend(bullet_rows(detail_bullets[:5], styles))
        flow.extend(p(text, styles["body"]) for text in detail_paragraphs[:1])

    problem_heading = next(
        (heading for heading in ["문제 해결", "동시성 문제 분석", "기술적 판단"] if f"## {heading}" in project["body"]),
        None,
    )
    if problem_heading:
        problem_paragraphs, _ = extract_section(project["body"], problem_heading)
        if problem_paragraphs:
            flow.append(p(problem_heading, styles["subsection"]))
            flow.append(p(problem_paragraphs[0], styles["body"]))

    return flow


def draw_cover(canvas, doc) -> None:
    canvas.saveState()
    canvas.setFillColor(NAVY)
    canvas.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    canvas.setFillColor(BLUE)
    canvas.rect(0, 0, 12 * mm, PAGE_HEIGHT, fill=1, stroke=0)

    profile = ROOT / "public" / "images" / "notion" / "profile-1.jpg"
    if profile.exists():
        canvas.drawImage(
            ImageReader(str(profile)),
            PAGE_WIDTH - 68 * mm,
            PAGE_HEIGHT - 95 * mm,
            width=42 * mm,
            height=52.5 * mm,
            preserveAspectRatio=True,
            mask="auto",
        )

    canvas.setFillColor(colors.HexColor("#7FC1F0"))
    canvas.setFont(BOLD, 9)
    canvas.drawString(26 * mm, PAGE_HEIGHT - 41 * mm, "EMBEDDED SOFTWARE ENGINEER")
    canvas.setFillColor(WHITE)
    canvas.setFont(BOLD, 28)
    canvas.drawString(26 * mm, PAGE_HEIGHT - 62 * mm, "박성국")
    canvas.setFont(BOLD, 16)
    canvas.drawString(26 * mm, PAGE_HEIGHT - 77 * mm, "PARK SEONGGUK")

    canvas.setFillColor(colors.HexColor("#D7E5F2"))
    canvas.setFont(FONT, 10)
    canvas.drawString(26 * mm, PAGE_HEIGHT - 102 * mm, "차량 ECU · Embedded Linux · 개발 자동화 · Edge AI")
    canvas.setFont(FONT, 9)
    canvas.drawString(26 * mm, 57 * mm, "psk2013@naver.com  |  010-2013-5456")
    canvas.drawString(26 * mm, 48 * mm, "github.com/SeonggukPark")
    canvas.drawString(26 * mm, 39 * mm, "seonggukpark.github.io/SeonggukPark/")

    canvas.setStrokeColor(colors.HexColor("#38516D"))
    canvas.line(26 * mm, 71 * mm, PAGE_WIDTH - 26 * mm, 71 * mm)
    canvas.setFillColor(colors.HexColor("#8FA8BF"))
    canvas.setFont(FONT, 7)
    canvas.drawRightString(PAGE_WIDTH - 26 * mm, 20 * mm, "PORTFOLIO · 2026")
    canvas.restoreState()


def draw_page(canvas, doc) -> None:
    canvas.saveState()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.5)
    canvas.line(18 * mm, PAGE_HEIGHT - 15 * mm, PAGE_WIDTH - 18 * mm, PAGE_HEIGHT - 15 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT, 6.8)
    canvas.drawString(18 * mm, PAGE_HEIGHT - 11.5 * mm, "PARK SEONGGUK · PORTFOLIO")
    canvas.drawRightString(PAGE_WIDTH - 18 * mm, 10 * mm, f"{doc.page}")
    canvas.restoreState()


def build_story(styles: dict[str, ParagraphStyle]) -> list:
    story: list = [Spacer(1, 1), PageBreak()]

    story.extend(section_header("Profile", "임베디드와 AI를 연결하는 소프트웨어 엔지니어", styles))
    story.append(
        p(
            "차량 조향 ECU 펌웨어와 OTA 기능을 개발하고 있습니다. 하드웨어 인터페이스를 이해하는 임베디드 개발 역량을 바탕으로 개발 자동화와 Edge AI 프로젝트까지 확장해 왔습니다.",
            styles["project_desc"],
        )
    )
    story.extend([Spacer(1, 2 * mm), p("TECH STACK", styles["eyebrow"]), skill_table(styles), Spacer(1, 7 * mm)])
    story.extend(section_header("Experience", "경력", styles))
    story.append(
        info_card(
            "2025.01 - 현재",
            "현대모비스",
            "조향SW설계팀 · 연구원",
            "차량 조향 장치(EPS)에 탑재되는 C언어 기반의 ECU 펌웨어 설계 및 유지보수를 담당하고 있습니다.",
            [],
            styles,
            groups=[
                (
                    "제어기 펌웨어 설계 및 유지보수",
                    [
                        "C/C++을 활용한 EPS 제어기 MCU 펌웨어 개발 및 유지보수",
                        "고객사 요구 사양을 바탕으로 차량 무선 업데이트 과정(OTA)에 필요한 서비스 구현",
                    ],
                ),
                (
                    "SW 개발 환경 자동화",
                    [
                        "Python 및 Batch Script를 활용하여 SW 개발 과정에서 발생하는 반복 작업 자동화",
                        "빌드, 배포, 검증 과정에 필요한 유틸리티 프로그램 개발 및 개발 환경 안정화",
                    ],
                ),
                (
                    "생성형 AI Key Man",
                    [
                        "코드 리뷰, 문서화, 데이터 처리 등에 필요한 AI 응용 프로그램 개발",
                        "AI 공유회, PoC, Pilot 활동 등 조직 내 생성형 AI 도구 확산을 위한 KeyMan 업무 수행",
                    ],
                ),
            ],
        )
    )

    story.append(PageBreak())
    story.extend(section_header("Education & Research", "학력과 연구", styles))
    story.append(
        info_card(
            "2021.03 - 2025.02",
            "경북대학교",
            "전자공학(주) · 컴퓨터학(부)",
            "하드웨어와 소프트웨어의 기반을 함께 학습했습니다.",
            [
                "학점 4.13 / 4.5",
                "마이크로프로세서 · 운영체제 · 임베디드시스템프로그래밍 이수",
                "알고리즘 · 컴퓨터구조 · 데이터통신 · 딥러닝 이수",
            ],
            styles,
        )
    )
    story.append(Spacer(1, 5 * mm))
    story.append(
        info_card(
            "2024.01 - 2024.12",
            "경북대학교 Brain AI Lab",
            "학부연구생",
            "딥러닝 모델을 개발하고 제한된 임베디드 환경에 이식하는 연구를 수행했습니다.",
            [
                "LG전자 · LIG넥스원 산학과제 모델 개발 및 임베디드 추론 환경 이식",
                "Vision Transformer 양자화 연구 및 교내 학술대회 포스터 발표",
                "정확도뿐 아니라 메모리 · 연산량 · 실제 배포 환경을 함께 검증",
            ],
            styles,
        )
    )
    story.append(Spacer(1, 5 * mm))
    story.append(
        info_card(
            "2024.07",
            "경북대학교 전자공학부 학술대회",
            "제1저자 · 포스터 발표",
            "Optimizing Vision Transformers via Post-Training Quantization for Edge Computing",
            [
                "ViT · EfficientNet · LeViT의 양자화 전후 정확도와 CPU 추론 지연시간 비교",
                "ImageNet-1K validation image 5,000장과 PyTorch Profiler를 활용한 성능 검증",
            ],
            styles,
        )
    )

    story.append(PageBreak())
    story.extend(section_header("Training", "교육", styles))
    training = [
        (
            "2024.07 - 2024.08",
            "삼성전자 DX부문 알고리즘 역량강화 과정",
            "교육생",
            "멘토 피드백을 바탕으로 알고리즘과 C++ 코드 최적화를 집중적으로 학습했습니다.",
            [
                "알고리즘 문제 풀이 우수자를 대상으로 진행된 알고리즘 교육 과정 수료",
                "자료구조, 그래프 탐색, 동적 계획법 등 주요 알고리즘을 집중 학습하며 문제 해결 역량 강화",
                "현직 멘토 피드백을 통해 코드 최적화, 예외 조건 처리, 시간 복잡도 개선 관점 학습",
                "제한된 시간 안에 문제를 분석하고 효율적인 로직으로 구현하는 SW 개발 기초 역량 확보",
            ],
        ),
        (
            "2024.01 - 2024.02",
            "LG Aimers",
            "교육생",
            "AI 모델 개발 교육과 B2B 영업 전환 예측 프로젝트를 수행했습니다.",
            [
                "AI 모델 개발 교육 과정 수료",
                "ML/DL 모델 개발을 위한 기초 이론과 데이터 기반 문제 해결 방법 학습",
                "잠재 고객 데이터를 활용하여 영업 전환 가능성이 높은 고객을 선별하는 이진 분류 모델 개발",
                "실제 데이터의 전처리, 모델 학습, 성능 평가 과정을 수행하며 AI 활용 역량 강화",
            ],
        ),
        (
            "2023.04 - 2023.06",
            "CJ Remote Internship",
            "교육생",
            "Python 데이터 분석과 스마트 헬스케어 서비스 기획 프로젝트를 수행했습니다.",
            [
                "Python 기반 데이터 분석 교육 과정 수료",
                "NumPy, Pandas 등 Python 라이브러리를 활용한 데이터 처리 및 분석 방법 학습",
                "스마트 헬스케어 서비스 기획 프로젝트에서 데이터 분석가로 활동",
                "분석 결과를 서비스 기획 방향으로 연결하는 경험 축적",
            ],
        ),
    ]
    for index, item in enumerate(training):
        story.append(info_card(*item, styles))
        if index < len(training) - 1:
            story.append(Spacer(1, 4 * mm))

    story.append(PageBreak())
    story.extend(section_header("Activities & Awards", "활동 · 수상 · 어학", styles))
    misc = [
        (
            "2024.03 - 2024.10",
            "알고리즘 동아리 Gori",
            "동아리원",
            "C++ 기반 알고리즘 문제 풀이와 코드 리뷰 활동에 참여했습니다.",
            ["C++ 기반 알고리즘 문제 풀이", "동아리원 간 코드 리뷰를 통한 풀이 및 구현 개선"],
        ),
        (
            "2023.11",
            "대한민국 소프트웨어 대전",
            "프로젝트 부스 운영",
            "항만 컨테이너 크레인 자동화 프로젝트를 전시하고 참관객과 소통했습니다.",
            ["항만 컨테이너 크레인 자동화 프로젝트 전시 및 시연", "IoT 기술 도입 방식과 프로젝트 구현 내용을 참관객에게 설명"],
        ),
        (
            "2025.11",
            "현대모비스 사내 아이디어 공모전",
            "은상",
            "AI 기반 교통 법규 안내 시스템 아이디어를 제안했습니다.",
            ["현장 문제를 AI 서비스 아이디어로 구체화"],
        ),
        (
            "2023.11",
            "스마트 해상물류 경진대회",
            "금상 · 해양수산부 장관상",
            "항만 컨테이너 자동 운송을 위한 크레인 제어 · 관리 시스템을 개발했습니다.",
            ["대한민국 소프트웨어 대전에서 작품 시연"],
        ),
        (
            "2026.07.20",
            "OPIc (영어)",
            "ACTFL · Intermediate High (IH)",
            "영어 말하기 능력 인증",
            ["유효기간 2028.07.19"],
        ),
    ]
    for index, item in enumerate(misc):
        story.append(info_card(*item, styles))
        if index < len(misc) - 1:
            story.append(Spacer(1, 3 * mm))

    project_paths = [
        ROOT / "src/content/projects/container-crane-automation.md",
        ROOT / "src/content/projects/pcb-defect-detection.md",
        ROOT / "src/content/projects/air-conditioner-clustering.md",
        ROOT / "src/content/projects/vision-transformer-quantization.md",
        ROOT / "src/content/projects/mcu-human-detection.md",
        ROOT / "src/content/projects/linux-realtime-rps-server.md",
    ]
    for index, path in enumerate(project_paths, 1):
        story.append(PageBreak())
        story.extend(project_story(load_project(path), index, styles))

    story.append(Spacer(1, 8 * mm))
    story.append(HRFlowable(width="100%", thickness=0.7, color=LINE, spaceAfter=5 * mm))
    story.append(p("더 자세한 프로젝트 기록과 학습 노트는 웹 포트폴리오에서 확인할 수 있습니다.", styles["body"]))
    story.append(
        p(
            '<link href="https://seonggukpark.github.io/SeonggukPark/" color="#1261A6">seonggukpark.github.io/SeonggukPark/</link>',
            styles["body"],
        )
    )
    return story


def render_pdf(pdf_path: Path) -> list[Path]:
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    for old_file in TMP_DIR.glob("page-*.png"):
        old_file.unlink()
    document = fitz.open(pdf_path)
    rendered: list[Path] = []
    for index, page in enumerate(document):
        pixmap = page.get_pixmap(matrix=fitz.Matrix(1.35, 1.35), alpha=False)
        output = TMP_DIR / f"page-{index + 1:02d}.png"
        pixmap.save(output)
        rendered.append(output)
    document.close()
    return rendered


def make_contact_sheets(rendered: list[Path]) -> list[Path]:
    sheets: list[Path] = []
    thumb_size = (560, 792)
    for sheet_index in range(0, len(rendered), 4):
        batch = rendered[sheet_index : sheet_index + 4]
        sheet = PILImage.new("RGB", (thumb_size[0] * 2 + 60, thumb_size[1] * 2 + 90), "#D8DEE7")
        draw = ImageDraw.Draw(sheet)
        for offset, image_path in enumerate(batch):
            image = PILImage.open(image_path).convert("RGB")
            image.thumbnail(thumb_size)
            x = 20 + (offset % 2) * (thumb_size[0] + 20)
            y = 20 + (offset // 2) * (thumb_size[1] + 25)
            sheet.paste(image, (x, y))
            draw.text((x, y + image.height + 3), f"Page {sheet_index + offset + 1}", fill="#172033")
        sheet_path = TMP_DIR / f"contact-{sheet_index // 4 + 1}.png"
        sheet.save(sheet_path)
        sheets.append(sheet_path)
    return sheets


def main() -> None:
    register_fonts()
    styles = build_styles()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    TMP_DIR.mkdir(parents=True, exist_ok=True)

    document = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=20 * mm,
        bottomMargin=17 * mm,
        title="박성국 포트폴리오",
        author="박성국",
        subject="Embedded Software Engineer Portfolio",
    )
    document.build(build_story(styles), onFirstPage=draw_cover, onLaterPages=draw_page)
    rendered = render_pdf(OUTPUT_PDF)
    sheets = make_contact_sheets(rendered)
    print(f"PDF={OUTPUT_PDF}")
    print(f"PAGES={len(rendered)}")
    print("CONTACT_SHEETS=" + ",".join(str(path) for path in sheets))


if __name__ == "__main__":
    main()
