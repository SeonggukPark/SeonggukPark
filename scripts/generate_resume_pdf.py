from __future__ import annotations

from pathlib import Path
from xml.sax.saxutils import escape

import fitz
from PIL import Image as PILImage, ImageDraw
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
TMP_DIR = ROOT / "tmp" / "pdfs" / "resume"
OUTPUT_PDF = OUTPUT_DIR / "seongguk-park-resume.pdf"

PAGE_WIDTH, PAGE_HEIGHT = A4
NAVY = colors.HexColor("#102A43")
BLUE = colors.HexColor("#1473B8")
BLUE_DARK = colors.HexColor("#0D5A91")
SKY = colors.HexColor("#EAF4FB")
INK = colors.HexColor("#17212B")
MUTED = colors.HexColor("#5C6875")
LINE = colors.HexColor("#D7E1E8")
PAPER = colors.HexColor("#F6F9FB")
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
        .replace("·", " | ")
    )


def register_fonts() -> None:
    if not FONT_PATH.exists() or not BOLD_FONT_PATH.exists():
        raise FileNotFoundError("맑은 고딕 글꼴을 찾을 수 없습니다.")
    pdfmetrics.registerFont(TTFont(FONT, str(FONT_PATH)))
    pdfmetrics.registerFont(TTFont(BOLD, str(BOLD_FONT_PATH)))


def build_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base["Heading1"],
            fontName=BOLD,
            fontSize=25,
            leading=30,
            textColor=WHITE,
            spaceAfter=2,
        ),
        "title": ParagraphStyle(
            "Title",
            parent=base["BodyText"],
            fontName=BOLD,
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#A9D6F3"),
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=7.3,
            leading=11.2,
            textColor=colors.HexColor("#DCEAF4"),
            alignment=TA_RIGHT,
        ),
        "summary": ParagraphStyle(
            "Summary",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=9.2,
            leading=14.3,
            textColor=INK,
            wordWrap="CJK",
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Heading2"],
            fontName=BOLD,
            fontSize=12.7,
            leading=16,
            textColor=NAVY,
            spaceAfter=0,
        ),
        "section_en": ParagraphStyle(
            "SectionEnglish",
            parent=base["BodyText"],
            fontName=BOLD,
            fontSize=6.4,
            leading=9,
            textColor=BLUE,
            tracking=0.8,
            alignment=TA_RIGHT,
        ),
        "item_title": ParagraphStyle(
            "ItemTitle",
            parent=base["Heading3"],
            fontName=BOLD,
            fontSize=9.5,
            leading=13,
            textColor=INK,
            wordWrap="CJK",
            spaceAfter=1,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["BodyText"],
            fontName=BOLD,
            fontSize=7.6,
            leading=11,
            textColor=BLUE_DARK,
            wordWrap="CJK",
            spaceAfter=3,
        ),
        "period": ParagraphStyle(
            "Period",
            parent=base["BodyText"],
            fontName=BOLD,
            fontSize=7.1,
            leading=10.5,
            textColor=MUTED,
            alignment=TA_RIGHT,
            wordWrap="CJK",
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=7.7,
            leading=11.7,
            textColor=INK,
            wordWrap="CJK",
            spaceAfter=2,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=7.6,
            leading=11.5,
            leftIndent=8,
            firstLineIndent=-7,
            textColor=INK,
            wordWrap="CJK",
            spaceAfter=1.7,
        ),
        "label": ParagraphStyle(
            "Label",
            parent=base["BodyText"],
            fontName=BOLD,
            fontSize=6.6,
            leading=9,
            textColor=BLUE_DARK,
            tracking=0.3,
        ),
        "skill": ParagraphStyle(
            "Skill",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=7.3,
            leading=10.7,
            textColor=INK,
            wordWrap="CJK",
        ),
        "project_title": ParagraphStyle(
            "ProjectTitle",
            parent=base["Heading3"],
            fontName=BOLD,
            fontSize=9.2,
            leading=12.5,
            textColor=NAVY,
            wordWrap="CJK",
            spaceAfter=1.5,
        ),
        "metric": ParagraphStyle(
            "Metric",
            parent=base["BodyText"],
            fontName=BOLD,
            fontSize=7.5,
            leading=11,
            textColor=BLUE_DARK,
            wordWrap="CJK",
        ),
        "compact": ParagraphStyle(
            "Compact",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=7.15,
            leading=10.5,
            textColor=INK,
            wordWrap="CJK",
        ),
        "footer": ParagraphStyle(
            "Footer",
            parent=base["BodyText"],
            fontName=FONT,
            fontSize=6.3,
            leading=8,
            textColor=MUTED,
        ),
    }


def p(text: str, style: ParagraphStyle, *, raw: bool = False) -> Paragraph:
    normalized = normalize(text)
    return Paragraph(normalized if raw else escape(normalized), style)


def section_header(korean: str, english: str, styles: dict[str, ParagraphStyle]) -> list:
    heading = Table(
        [[p(korean, styles["section"]), p(english.upper(), styles["section_en"])]],
        colWidths=[112 * mm, 50 * mm],
    )
    heading.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
            ]
        )
    )
    return [heading, HRFlowable(width="100%", thickness=0.8, color=BLUE, spaceAfter=4.5 * mm)]


def bullets(items: list[str], styles: dict[str, ParagraphStyle]) -> list[Paragraph]:
    return [
        p(f'<font color="#1473B8">■</font> {escape(normalize(item))}', styles["bullet"], raw=True)
        for item in items
    ]


def timeline_item(
    period: str,
    title: str,
    role: str,
    items: list[str],
    styles: dict[str, ParagraphStyle],
    description: str | None = None,
) -> KeepTogether:
    content: list = [p(title, styles["item_title"]), p(role, styles["role"])]
    if description:
        content.append(p(description, styles["body"]))
    content.extend(bullets(items, styles))
    table = Table(
        [[p(period, styles["period"]), content]],
        colWidths=[28 * mm, 134 * mm],
        hAlign="LEFT",
    )
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEAFTER", (0, 0), (0, -1), 0.55, LINE),
                ("LEFTPADDING", (0, 0), (0, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, -1), 6),
                ("LEFTPADDING", (1, 0), (1, -1), 9),
                ("RIGHTPADDING", (1, 0), (1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return KeepTogether([table])


def skill_panel(styles: dict[str, ParagraphStyle]) -> Table:
    skills = [
        ("LANGUAGES", "C, C++, Python"),
        ("AUTOMOTIVE", "AUTOSAR Classic, CAN(FD), UDS, XCP, OTA"),
        ("SYSTEM", "Linux, TCP Socket, pthread, IPC"),
        ("AI / ML", "PyTorch, TensorFlow, Edge AI"),
        ("TOOLS", "Git, Jira, VS Code, Jupyter Notebook, Windows Batch"),
    ]
    rows = [[p(label, styles["label"]), p(value, styles["skill"])] for label, value in skills]
    table = Table(rows, colWidths=[28 * mm, 134 * mm])
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PAPER),
                ("BOX", (0, 0), (-1, -1), 0.6, LINE),
                ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 4.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
            ]
        )
    )
    return table


def project_card(
    title: str,
    period: str,
    role: str,
    summary: str,
    outcome: str,
    tech: str,
    styles: dict[str, ParagraphStyle],
) -> Table:
    title_row = Table(
        [[p(title, styles["project_title"]), p(period, styles["period"])]],
        colWidths=[102 * mm, 48 * mm],
    )
    title_row.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    content = [
        title_row,
        p(role, styles["role"]),
        p(summary, styles["compact"]),
        Spacer(1, 1.2 * mm),
        p(f'<font color="#1473B8">RESULT</font>  {escape(normalize(outcome))}', styles["metric"], raw=True),
        p(f'<font color="#5C6875">TECH</font>  {escape(normalize(tech))}', styles["compact"], raw=True),
    ]
    card = Table([[content]], colWidths=[150 * mm])
    card.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                ("BOX", (0, 0), (-1, -1), 0.65, LINE),
                ("LINEBEFORE", (0, 0), (0, -1), 3.2, BLUE),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 4.5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4.5),
            ]
        )
    )
    return card


def compact_rows(
    rows: list[tuple[str, str, str]], styles: dict[str, ParagraphStyle], widths: tuple[float, float, float]
) -> Table:
    data = [
        [p(period, styles["period"]), p(title, styles["item_title"]), p(detail, styles["compact"])]
        for period, title, detail in rows
    ]
    table = Table(data, colWidths=list(widths))
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LINEBELOW", (0, 0), (-1, -2), 0.35, LINE),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ("BACKGROUND", (0, 0), (-1, -1), PAPER),
            ]
        )
    )
    return table


def profile_header(styles: dict[str, ParagraphStyle]) -> Table:
    contact = (
        '010-2013-5456 &nbsp; | &nbsp; '
        '<link href="mailto:psk2013@naver.com" color="#DCEAF4">psk2013@naver.com</link><br/>'
        '<link href="https://github.com/SeonggukPark" color="#DCEAF4">github.com/SeonggukPark</link><br/>'
        '<link href="https://seonggukpark.github.io/SeonggukPark/" color="#DCEAF4">seonggukpark.github.io/SeonggukPark</link><br/>'
        '1999.07.17'
    )
    identity = [p("박성국", styles["name"]), p("EMBEDDED SOFTWARE ENGINEER", styles["title"])]
    profile_path = ROOT / "public" / "images" / "notion" / "profile-1.jpg"
    if profile_path.exists():
        # The portrait is placed in a small table to keep its framing consistent.
        from reportlab.platypus import Image

        photo = Image(str(profile_path), width=24 * mm, height=30 * mm)
        photo_table = Table([[photo]], colWidths=[27 * mm], rowHeights=[33 * mm])
        photo_table.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), WHITE),
                    ("BOX", (0, 0), (-1, -1), 0.8, colors.HexColor("#6A88A0")),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 2),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 2),
                    ("TOPPADDING", (0, 0), (-1, -1), 2),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
                ]
            )
        )
    else:
        photo_table = Spacer(27 * mm, 33 * mm)

    header = Table(
        [[identity, p(contact, styles["contact"], raw=True), photo_table]],
        colWidths=[78 * mm, 66 * mm, 30 * mm],
        rowHeights=[39 * mm],
    )
    header.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), NAVY),
                ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                ("LEFTPADDING", (0, 0), (0, 0), 9),
                ("RIGHTPADDING", (0, 0), (0, 0), 4),
                ("LEFTPADDING", (1, 0), (1, 0), 4),
                ("RIGHTPADDING", (1, 0), (1, 0), 8),
                ("LEFTPADDING", (2, 0), (2, 0), 1),
                ("RIGHTPADDING", (2, 0), (2, 0), 2),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return header


def build_story(styles: dict[str, ParagraphStyle]) -> list:
    story: list = [profile_header(styles), Spacer(1, 6 * mm)]

    story.extend(section_header("소개", "Profile", styles))
    story.append(
        p(
            "차량용 EPS ECU 펌웨어를 개발하며 C 기반 제어기 SW와 OTA 서비스 구현, Python/Batch 기반 개발 자동화를 수행하고 있습니다. 하드웨어-소프트웨어 통합 경험과 Edge AI 연구를 바탕으로, 실제 제약 환경에서 안정적으로 동작하는 시스템을 설계합니다.",
            styles["summary"],
        )
    )
    story.extend([Spacer(1, 4.2 * mm), *section_header("기술 역량", "Technical Skills", styles), skill_panel(styles)])
    story.extend([Spacer(1, 5 * mm), *section_header("경력", "Experience", styles)])
    story.append(
        timeline_item(
            "2025.01 - 현재",
            "현대모비스",
            "조향SW설계팀 | 연구원",
            [
                "C를 활용한 EPS 제어기 펌웨어 개발 및 유지보수",
                "고객사 요구 사양을 바탕으로 차량 무선 업데이트(OTA) 서비스 구현",
                "Python 및 Batch Script로 빌드, 배포, 검증 과정의 반복 업무 자동화와 유틸리티 개발",
                "코드 리뷰, 문서화, 데이터 처리용 생성형 AI 응용 프로그램 개발 및 조직 내 PoC/Pilot 확산",
            ],
            styles,
            "차량 조향 장치(EPS)에 탑재되는 ECU 소프트웨어를 설계하고 개발 환경을 개선합니다.",
        )
    )
    story.extend([Spacer(1, 5 * mm), *section_header("학력 및 연구", "Education & Research", styles)])
    story.append(
        timeline_item(
            "2021.03 - 2025.02",
            "경북대학교",
            "전자공학(주) | 컴퓨터학(부)",
            ["학점 4.13 / 4.5", "운영체제, 컴퓨터구조, 임베디드시스템프로그래밍, 알고리즘 등 이수"],
            styles,
        )
    )
    story.append(Spacer(1, 3.5 * mm))
    story.append(
        timeline_item(
            "2024.01 - 2024.12",
            "경북대학교 Brain AI Lab",
            "학부연구생",
            [
                "산학과제에서 AI 모델 개발과 임베디드 추론 엔진 이식 수행",
                "Vision Transformer 양자화 연구 및 교내 학술대회 포스터 발표",
            ],
            styles,
        )
    )

    story.append(PageBreak())
    story.extend(section_header("주요 프로젝트", "Selected Projects", styles))
    projects = [
        (
            "항만 컨테이너 크레인 자동화",
            "2023.03 - 2023.12",
            "팀장 | 임베디드 시스템 구현",
            "Raspberry Pi와 다중 Arduino의 통신, Core-XY 모터 제어, 자동 운송 시퀀스를 통합하고 멀티스레딩으로 경로 계산과 크레인 제어를 병렬화했습니다.",
            "운송 시간 약 10% 단축 | 18개 컨테이너 자동 선적 검증 | 해양수산부 장관상",
            "C, C++, Python, Linux, Bluetooth",
        ),
        (
            "시스템 에어컨 실내기 분류 모델",
            "2024.07 - 2024.12",
            "클러스터링 모델 개발 | C++ 변환 및 Linux AP 이식",
            "시계열 센서 데이터의 시간축 오차를 보완하기 위해 DTW 거리와 K-Means를 결합하고, Python 모델을 C++로 전환해 임베디드 AI 엔진에 이식했습니다.",
            "현장 기준 약 90% 분류 정확도 | 동일 공간 실내기 그룹화 검증",
            "Python, C++, Linux, DTW, K-Means",
        ),
        (
            "PCB 코팅 불량 탐지 모델",
            "2024.09 - 2024.12",
            "코팅 불량 판정 모델 개발 | Jetson Nano 이식",
            "UV 이미지 전처리와 Vision 모델 학습을 통해 작업자의 육안 판정을 자동화하고, 카메라 입력부터 불량 판정까지의 Edge 추론 파이프라인을 구성했습니다.",
            "약 85% 탐지 정확도 | Jetson Nano 실시간 추론 검증",
            "Python, PyTorch, Jetson Nano",
        ),
        (
            "Vision Transformer 양자화",
            "2024.05 - 2024.07",
            "개인 연구 | 모델 경량화",
            "ViT, EfficientNet, LeViT에 Dynamic PTQ를 적용하고 ImageNet-1K 표본과 PyTorch Profiler로 정확도-지연시간 trade-off를 비교했습니다.",
            "추론 속도 약 43% 개선 | 교내 학술대회 논문 및 포스터 발표",
            "Python, PyTorch, INT8 PTQ",
        ),
    ]
    for index, project in enumerate(projects):
        story.append(project_card(*project, styles))
        if index < len(projects) - 1:
            story.append(Spacer(1, 2.4 * mm))

    story.extend([Spacer(1, 3.8 * mm), *section_header("수상", "Awards", styles)])
    story.append(
        compact_rows(
            [
                ("2025.11", "현대모비스 사내 아이디어 공모전", "은상 | 생성형 AI 기반 AR 교통 법규 안내 시스템 제안"),
                ("2023.11", "스마트 해상물류 경진대회", "금상 | 해양수산부 장관상 | 크레인 자동화 프로젝트"),
            ],
            styles,
            (24 * mm, 61 * mm, 77 * mm),
        )
    )

    story.extend([Spacer(1, 3.3 * mm), *section_header("교육 및 활동", "Training & Activities", styles)])
    story.append(
        compact_rows(
            [
                ("2024.07 - 08", "삼성전자 DX 알고리즘 역량강화", "교육 수료 | 사내 SW 자격 Professional 취득"),
                ("2024.01 - 02", "LG Aimers", "AI 교육 수료 | 잠재 고객 전환 예측 모델 개발"),
                ("2023.04 - 06", "CJ Remote Internship", "Python 데이터 분석 교육 및 서비스 기획 프로젝트"),
                ("2024.03 - 10", "알고리즘 동아리 Gori", "C++ 기반 알고리즘 스터디 및 대회 참가"),
            ],
            styles,
            (24 * mm, 61 * mm, 77 * mm),
        )
    )

    story.extend([Spacer(1, 3.3 * mm), *section_header("어학", "Language", styles)])
    story.append(
        compact_rows(
            [("2026.07.20", "OPIc 영어", "Intermediate High (IH) | 유효기간 2028.07.19")],
            styles,
            (24 * mm, 61 * mm, 77 * mm),
        )
    )
    return story


def draw_page(canvas, doc) -> None:
    canvas.saveState()
    page_number = canvas.getPageNumber()
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(0.45)
    canvas.line(18 * mm, 12.5 * mm, PAGE_WIDTH - 18 * mm, 12.5 * mm)
    canvas.setFillColor(MUTED)
    canvas.setFont(FONT, 6.2)
    canvas.drawString(18 * mm, 8.5 * mm, "PARK SEONGGUK | EMBEDDED SOFTWARE ENGINEER")
    canvas.drawRightString(PAGE_WIDTH - 18 * mm, 8.5 * mm, f"{page_number} / 2   |   UPDATED 2026.07")
    if page_number > 1:
        canvas.setFillColor(NAVY)
        canvas.rect(0, PAGE_HEIGHT - 5 * mm, PAGE_WIDTH, 5 * mm, fill=1, stroke=0)
    canvas.restoreState()


def render_and_make_contact_sheet(pdf_path: Path) -> tuple[list[Path], Path]:
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    for old_file in TMP_DIR.glob("*.png"):
        old_file.unlink()

    document = fitz.open(pdf_path)
    rendered: list[Path] = []
    for index, page in enumerate(document):
        pixmap = page.get_pixmap(matrix=fitz.Matrix(1.6, 1.6), alpha=False)
        output = TMP_DIR / f"page-{index + 1:02d}.png"
        pixmap.save(output)
        rendered.append(output)
    document.close()

    thumb_size = (700, 990)
    sheet = PILImage.new("RGB", (thumb_size[0] * len(rendered) + 30 * (len(rendered) + 1), 1045), "#DCE3E9")
    draw = ImageDraw.Draw(sheet)
    for index, image_path in enumerate(rendered):
        image = PILImage.open(image_path).convert("RGB")
        image.thumbnail(thumb_size)
        x = 30 + index * (thumb_size[0] + 30)
        y = 20
        sheet.paste(image, (x, y))
        draw.text((x, y + image.height + 5), f"Page {index + 1}", fill="#17212B")
    sheet_path = TMP_DIR / "contact-sheet.png"
    sheet.save(sheet_path)
    return rendered, sheet_path


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
        topMargin=10 * mm,
        bottomMargin=17 * mm,
        title="박성국 이력서",
        author="박성국",
        subject="Embedded Software Engineer Resume",
        creator="ReportLab",
    )
    document.build(build_story(styles), onFirstPage=draw_page, onLaterPages=draw_page)
    rendered, sheet = render_and_make_contact_sheet(OUTPUT_PDF)
    print(f"PDF={OUTPUT_PDF}")
    print(f"PAGES={len(rendered)}")
    print(f"CONTACT_SHEET={sheet}")


if __name__ == "__main__":
    main()
