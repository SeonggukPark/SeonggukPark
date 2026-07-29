export const site = {
  name: "박성국",
  initials: "SP",
  title: "Embedded Software Engineer",
  email: "psk2013@naver.com",
  description: "차량용 ECU, Embedded Linux, 개발 자동화와 Edge AI를 다루는 박성국의 포트폴리오와 기술 기록입니다.",
  links: {
    github: "https://github.com/SeonggukPark",
    velog: "https://velog.io/@seonggukpark/series"
  }
} as const;

export const personalInfo = {
  phone: "010-2013-5456",
  birthDate: "1999.07.17",
  email: site.email
} as const;

export const skills = [
  { name: "Languages", items: ["C", "C++", "Python"] },
  { name: "Automotive", items: ["AUTOSAR Classic", "CAN(FD)", "UDS", "XCP", "OTA"] },
  { name: "Tools", items: ["Git", "Jira", "VS Code", "Windows Batch", "Vector Tools (CANoe, CANape, DaVinci)"] },
  { name: "AI/ML", items: ["PyTorch", "TensorFlow"] },
  { name: "Etc", items: ["Linux"] }
] as const;

export const coursework = [
  { period: "2021.2", name: "C프로그래밍과실습", grade: "A+" },
  { period: "2022.1", name: "파이썬프로그래밍", grade: "A+" },
  { period: "2022.여름", name: "신호및시스템", grade: "A-" },
  { period: "2022.2", name: "자료구조", grade: "B+" },
  { period: "2022.겨울", name: "마이크로프로세서", grade: "B+" },
  { period: "2023.1", name: "운영체제", grade: "A+" },
  { period: "2023.1", name: "자동제어", grade: "A0" },
  { period: "2023.여름", name: "인공지능의 이해", grade: "A+" },
  { period: "2023.2", name: "논리회로설계", grade: "B+" },
  { period: "2023.2", name: "데이터통신", grade: "A0" },
  { period: "2023.2", name: "컴퓨터구조", grade: "A+" },
  { period: "2023.2", name: "마이크로프로세서설계실험", grade: "B+" },
  { period: "2023.2", name: "임베디드시스템프로그래밍", grade: "A-" },
  { period: "2023.겨울", name: "컴퓨터망", grade: "A0" },
  { period: "2024.1", name: "알고리즘1", grade: "A+" },
  { period: "2024.1", name: "기계학습시스템설계", grade: "B+" },
  { period: "2024.1", name: "컴퓨터그래픽개론", grade: "A+" },
  { period: "2024.1", name: "고급문제해결", grade: "A+" },
  { period: "2024.1", name: "딥러닝", grade: "A0" },
  { period: "2024.2", name: "알고리즘2", grade: "A+" },
  { period: "2024.2", name: "소프트웨어 특강", grade: "Pass" }
] as const;

type ResumeProjectLink = {
  label: string;
  id: string;
};

type ResumeDocumentLink = {
  label: string;
  id: string;
};

export type ResumeItem = {
  period: string;
  organization: string;
  logo?: {
    readonly src: string;
    readonly alt: string;
    readonly variant: "wordmark" | "emblem";
  };
  role: string;
  description: string;
  points: readonly string[];
  highlightGroups?: readonly {
    title: string;
    items: readonly string[];
  }[];
  projectLinks: readonly ResumeProjectLink[];
  documentLinks?: readonly ResumeDocumentLink[];
};

export const experience: readonly ResumeItem[] = [
  {
    period: "2025.01 — 현재",
    organization: "현대모비스",
    logo: {
      src: "/images/organizations/hyundai-mobis.svg",
      alt: "현대모비스 로고",
      variant: "wordmark"
    },
    role: "조향SW설계팀 · 연구원",
    description: "차량 조향 장치(EPS)에 탑재되는 C언어 기반의 ECU 펌웨어 설계 및 유지보수를 담당하고 있습니다.",
    points: [],
    highlightGroups: [
      {
        title: "제어기 펌웨어 설계 및 유지보수",
        items: [
          "C언어를 활용한 EPS 제어기 펌웨어 개발 및 유지보수",
          "고객사 요구 사양을 바탕으로 차량 무선 업데이트 과정(OTA)에 필요한 서비스 구현"
        ]
      },
      {
        title: "SW 개발 환경 자동화",
        items: [
          "Python 및 Batch Script를 활용하여 SW 개발 과정에서 발생하는 반복 작업 자동화",
          "빌드, 배포, 검증 과정에 필요한 유틸리티 프로그램 개발 및 개발 환경 안정화"
        ]
      },
      {
        title: "생성형 AI 활용 및 확산 담당",
        items: [
          "코드 리뷰, 문서화, 데이터 처리 등에 필요한 AI 응용 프로그램 개발",
          "AI 공유회, PoC, Pilot 활동 등 조직 내 생성형 AI 도구의 활용 확산 활동 수행"
        ]
      }
    ],
    projectLinks: []
  },
  {
    period: "2024.01 — 2024.12",
    organization: "경북대학교 Brain AI Lab",
    role: "학부연구생",
    description: "임베디드 환경에서 동작하는 AI 모델을 개발하고 최적화하는 연구를 수행하였습니다.",
    points: [
      "산학과제를 통한 AI 모델 개발 및 임베디드 추론 엔진 이식",
      "모델 경량화 연구 및 교내 학술대회 포스터 발표",
    ],
    projectLinks: [
      { label: "시스템 에어컨 분류 모델", id: "air-conditioner-clustering" },
      { label: "PCB 코팅 불량 탐지", id: "pcb-defect-detection" },
      { label: "ViT 양자화", id: "vision-transformer-quantization" }
    ]
  },
  {
    period: "2021.03 — 2025.02",
    organization: "경북대학교",
    logo: {
      src: "/images/organizations/kyungpook-national-university.jpg",
      alt: "경북대학교 엠블럼",
      variant: "emblem"
    },
    role: "전자공학(주전공) · 컴퓨터학(부전공)",
    description: "하드웨어와 소프트웨어의 기반을 함께 쌓았습니다.",
    points: [
      "학점 4.13 / 4.5",
    ],
    projectLinks: []
  }
];

export const awards: readonly ResumeItem[] = [
  {
    period: "2025.11",
    organization: "현대모비스 사내 아이디어 공모전",
    role: "은상",
    description: "차량 내의 생성형 AI를 활용한 AR 교통 법규 안내 시스템 아이디어를 제안하였습니다.",
    points: ["현장 문제를 AI 서비스 아이디어로 구체화"],
    projectLinks: [],
    documentLinks: [{ label: "수상 자료 보기", id: "mobis-idea-award" }]
  },
  {
    period: "2023.11",
    organization: "스마트 해상물류 경진대회",
    role: "금상 · 해양수산부 장관상",
    description: "항만 컨테이너 자동 운송을 위한 크레인 제어·관리 시스템을 개발하였습니다.",
    points: ["대한민국 소프트웨어 대전에서 작품 시연"],
    projectLinks: [{ label: "수상 프로젝트 상세", id: "container-crane-automation" }],
    documentLinks: [{ label: "수상 자료 보기", id: "smart-maritime-award" }]
  }
];

export const activities: readonly ResumeItem[] = [
  {
    period: "2024.07 — 2024.08",
    organization: "삼성전자 DX부문 알고리즘 역량강화 과정",
    role: "교육생",
    description: "문제 해결 능력 향상을 위한 알고리즘 교육을 수료하였습니다.",
    points: [
      "사전 문제 풀이 우수자를 대상으로 진행된 알고리즘 교육 과정 수료",
      "자료구조, 그래프 탐색, 동적 계획법 등 주요 알고리즘을 집중 학습하며 문제 해결 역량 강화",
      "현직 멘토 피드백을 통해 문제를 분석하고 효율적인 로직으로 구현하는 SW 개발 기초 역량 확보",
      "삼성전자 SW 역량테스트 Professional 등급 취득"
    ],
    projectLinks: [],
    documentLinks: [{ label: "교육 이수증 보기", id: "samsung-algorithm-certificate" }]
  },
  {
    period: "2024.01 — 2024.02",
    organization: "LG Aimers",
    role: "교육생",
    description: "실무 현장에서의 AI 모델 개발을 위한 교육 수강 및 프로젝트를 수행하였습니다.",
    points: [
      "AI 모델 개발 교육 과정 수료",
      "ML/DL 모델 개발을 위한 기초 이론과 데이터 기반 문제 해결 방법 학습",
      "잠재 고객 데이터를 활용하여 영업 전환 가능성이 높은 고객을 선별하는 이진 분류 모델 개발",
      "실제 데이터를 바탕으로 전처리, 모델 학습, 성능 평가 과정을 수행하며 AI 활용 역량 강화"
    ],
    projectLinks: [],
    documentLinks: [{ label: "교육 이수증 보기", id: "lg-aimers-certificate" }]
  },
  {
    period: "2023.04 — 2023.06",
    organization: "CJ Remote Internship",
    role: "교육생",
    description: "Python 데이터 분석 교육 수강 및 프로젝트를 수행하였습니다.",
    points: [
      "NumPy, Pandas 등 Python 라이브러리를 활용한 데이터 처리 및 분석 방법 학습",
      "스마트 헬스케어 서비스 기획 프로젝트에서 데이터 분석가로 활동",
      "데이터를 기반으로 서비스 문제를 정의하고, 분석 결과를 서비스 기획 방향으로 연결하는 경험 축적"
    ],
    projectLinks: [],
    documentLinks: [{ label: "교육 이수증 보기", id: "cj-remote-internship-certificate" }]
  },
  {
    period: "2024.03 — 2024.10",
    organization: "알고리즘 동아리 Gori",
    role: "동아리원",
    description: "교내 알고리즘 동아리에서 활동하였습니다.",
    points: [
      "팀원들과 주기적인 스터디 활동",
      "교내외 알고리즘 대회 참가 및 문제 해결 역량 강화"
    ],
    projectLinks: [],
    documentLinks: [{ label: "활동 증명서 보기", id: "gori-activity-certificate" }]
  },
  {
    period: "2023.11",
    organization: "대한민국 소프트웨어 대전",
    role: "프로젝트 부스 운영",
    description: "'항만 컨테이너 크레인 자동화 프로젝트'의 결과물을 대한민국 소프트웨어 대전에서 전시 및 소개하였습니다.",
    points: [
      "항만 컨테이너 크레인 자동화 프로젝트 전시 및 시연",
      "IoT 기술 도입 방식과 프로젝트 구현 내용을 참관객에게 설명"
    ],
    projectLinks: [{ label: "전시 프로젝트 상세", id: "container-crane-automation" }]
  }
];

export const certifications: readonly ResumeItem[] = [
  {
    period: "2026.07.20",
    organization: "OPIc (영어)",
    role: "ACTFL · Intermediate High (IH)",
    description: "영어 말하기 능력 인증",
    points: ["유효기간 2028.07.19"],
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
