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
  { name: "Tools", items: ["Git", "Jira", "VS Code", "Jupyter Notebook", "Windows Batch"] },
  { name: "AI/ML", items: ["PyTorch", "TensorFlow", "TensorFlow Lite"] },
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
  projectLinks: readonly ResumeProjectLink[];
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
    description: "차량 조향 ECU 펌웨어와 OTA 기능을 개발하고, 개발 자동화와 생성형 AI 활용 확산을 함께 추진하고 있습니다.",
    points: [
      "C/C++ 기반 EPS 제어기 MCU 펌웨어 설계 및 유지보수",
      "고객사 요구사항을 분석해 차량 무선 업데이트 과정에 필요한 OTA 서비스를 제어 펌웨어 내부에 구현",
      "H/W 인터페이스와 영향성을 분석하고 설계·구현·리뷰·검증으로 이어지는 제품 SW 개발 프로세스 수행",
      "Python·Batch·YAML 기반으로 빌드·배포와 검증 산출물 생성 업무를 자동화하고 유틸리티 프로그램 개발",
      "코드 리뷰·문서화용 생성형 AI 응용 도구 개발과 사내 활용 사례 확산"
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
    role: "전자공학부(주) · 컴퓨터학부(부)",
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
    period: "2025.11",
    organization: "현대모비스 사내 아이디어 공모전",
    role: "은상",
    description: "AI 기반 교통 법규 안내 시스템 아이디어를 제안했습니다.",
    points: ["현장 문제를 AI 서비스 아이디어로 구체화"],
    projectLinks: []
  },
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
  },
  {
    period: "2023.11",
    organization: "대한민국 소프트웨어 대전",
    role: "프로젝트 부스 운영",
    description: "항만 컨테이너 크레인 자동화 프로젝트를 전시하고 IoT 기술 도입에 관해 참관객과 소통했습니다.",
    points: [],
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
