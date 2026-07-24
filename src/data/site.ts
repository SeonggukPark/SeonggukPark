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

type ResumeProjectLink = {
  label: string;
  id: string;
};

type ResumeItem = {
  period: string;
  organization: string;
  role: string;
  description: string;
  points: readonly string[];
  projectLinks: readonly ResumeProjectLink[];
};

export const experience: readonly ResumeItem[] = [
  {
    period: "2025.01 — 현재",
    organization: "현대모비스",
    role: "조향SW설계팀 · 연구원",
    description: "차량 조향 장치(EPS)에 탑재되는 C 기반 ECU 펌웨어를 설계하고 유지보수했습니다.",
    points: [
      "고객사 요구사항에 따른 ECU OTA 소프트웨어 설계 및 구현",
      "차량용 제어기 인터페이스 설계",
      "Python과 배치 스크립트를 활용한 빌드·배포 업무 자동화"
    ],
    projectLinks: []
  },
  {
    period: "2024.01 — 2024.12",
    organization: "경북대학교 Brain AI Lab",
    role: "학부연구생",
    description: "딥러닝 모델을 개발하고 제한된 임베디드 환경에 이식하는 연구를 수행했습니다.",
    points: [
      "LG전자·LIG넥스원 산학과제 모델 개발 및 임베디드 추론 엔진 이식",
      "Vision Transformer 양자화 연구 및 교내 학술대회 포스터 발표",
      "정확도뿐 아니라 메모리·연산량·실제 배포 환경을 함께 검증"
    ],
    projectLinks: [
      { label: "시스템 에어컨 분류 모델", id: "air-conditioner-clustering" },
      { label: "PCB 코팅 상태 인지", id: "pcb-defect-detection" },
      { label: "ViT 양자화", id: "vision-transformer-quantization" }
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
    ],
    projectLinks: []
  }
];

export const publications: readonly ResumeItem[] = [
  {
    period: "2024.07",
    organization: "경북대학교 전자공학부 학술대회",
    role: "제1저자 · 포스터 발표",
    description: "Optimizing Vision Transformers via Post-Training Quantization for Edge Computing",
    points: [
      "ViT·EfficientNet·LeViT의 양자화 전후 정확도와 CPU 추론 지연시간 비교",
      "ImageNet-1K validation image 5,000장과 PyTorch Profiler를 활용한 성능 검증"
    ],
    projectLinks: [{ label: "연구 프로젝트 상세", id: "vision-transformer-quantization" }]
  }
];

export const awards: readonly ResumeItem[] = [
  {
    period: "2023.11",
    organization: "스마트 해상물류 경진대회",
    role: "금상 · 해양수산부 장관상",
    description: "항만 컨테이너 자동 운송을 위한 크레인 제어·관리 시스템을 개발했습니다.",
    points: ["대한민국 소프트웨어 대전에서 작품 시연"],
    projectLinks: [{ label: "수상 프로젝트 상세", id: "container-crane-automation" }]
  }
];

export const activities: readonly ResumeItem[] = [
  {
    period: "2024.07 — 2024.08",
    organization: "삼성전자 알고리즘 역량강화 교육",
    role: "교육생",
    description: "멘토 피드백을 바탕으로 자료구조, 알고리즘과 C++ 코드 최적화를 집중적으로 학습했습니다.",
    points: ["Trie·Segment Tree·최단경로·시뮬레이션 문제 풀이와 성능 개선"],
    projectLinks: []
  },
  {
    period: "2024.01 — 2024.02",
    organization: "LG Aimers",
    role: "교육생",
    description: "머신러닝·딥러닝 교육을 이수하고 B2B 영업 기회 전환 여부를 예측하는 이진 분류 문제를 수행했습니다.",
    points: [],
    projectLinks: []
  },
  {
    period: "2023.04 — 2023.06",
    organization: "CJ Remote Internship",
    role: "교육생",
    description: "Python 데이터 분석과 스마트 헬스케어 데이터 분석 프로젝트를 수행했습니다.",
    points: [],
    projectLinks: []
  },
  {
    period: "2024.03 — 2024.10",
    organization: "알고리즘 동아리 Gori",
    role: "동아리원",
    description: "C++ 기반 알고리즘 문제 풀이와 코드 리뷰 활동에 참여했습니다.",
    points: [],
    projectLinks: []
  }
];

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
