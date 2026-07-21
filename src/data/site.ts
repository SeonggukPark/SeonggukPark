export const site = {
  name: "Seongguk Park",
  initials: "SP",
  title: "Embedded Software Engineer",
  email: "psk2013@naver.com",
  description:
    "MCU 펌웨어, 차량용 ECU, Embedded Linux와 Edge AI를 다루는 박성국의 포트폴리오와 기술 기록입니다.",
  links: {
    github: "https://github.com/SeonggukPark",
    velog: "https://velog.io/@seonggukpark/series"
  }
} as const;

export const skills = [
  { name: "Languages", items: ["C", "C++", "Python"] },
  { name: "Embedded", items: ["MCU", "Embedded Linux", "CAN-FD", "OTA", "BLE"] },
  { name: "AI", items: ["PyTorch", "TensorFlow", "Computer Vision", "Model Quantization"] },
  { name: "Tools", items: ["Git", "Bitbucket", "Jira", "Jupyter", "VS Code"] }
] as const;

export const experience = [
  {
    period: "2025.01 — 2026.03",
    organization: "현대모비스",
    role: "조향SW설계팀 · 연구원",
    description: "차량 조향 장치(EPS)에 탑재되는 C 기반 ECU 펌웨어를 설계하고 유지보수했습니다.",
    points: [
      "CAN-FD 기반 Hardware–Application 인터페이스 API 설계",
      "고객 요구사항에 따른 ECU OTA 소프트웨어 설계 및 구현",
      "Bitbucket·Jira 기반 형상 관리와 Python 반복 업무 자동화"
    ]
  },
  {
    period: "2024.01 — 2025.01",
    organization: "경북대학교 Brain AI Lab",
    role: "학부연구생",
    description: "딥러닝 모델을 개발하고 제한된 임베디드 환경에 이식하는 연구를 수행했습니다.",
    points: [
      "LG전자·LIG넥스원 산학과제 모델 개발 및 임베디드 추론 엔진 이식",
      "Vision Transformer 양자화 연구 및 교내 학술대회 포스터 발표",
      "정확도뿐 아니라 메모리·연산량·실제 배포 환경을 함께 검증"
    ]
  },
  {
    period: "2021.03 — 2025.02",
    organization: "경북대학교",
    role: "전자공학부 주전공 · 컴퓨터학부 부전공",
    description: "하드웨어와 소프트웨어의 기반을 함께 쌓았습니다.",
    points: [
      "학점 4.13 / 4.5",
      "마이크로프로세서·운영체제·임베디드시스템 프로그래밍 이수",
      "알고리즘·컴퓨터구조·데이터통신·딥러닝 이수"
    ]
  }
] as const;

type LearningItem = {
  title: string;
  description: string;
  href?: string;
};

export const learning: readonly LearningItem[] = [
  { title: "Linux & System Software", description: "프로세스, 스레드, IPC, 네트워크와 시스템 프로그래밍", href: "https://github.com/SeonggukPark/Modern_Linux" },
  { title: "삼성전자 알고리즘 역량강화", description: "멘토 피드백 기반 알고리즘과 코드 최적화 학습" },
  { title: "LG Aimers", description: "ML/DL 교육과 잠재 고객 전환 가능성 예측 모델 개발" },
  { title: "CJ Remote Internship", description: "Python 데이터 분석과 스마트 헬스케어 데이터 분석" }
];
