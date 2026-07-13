/*
  이 파일만 수정하면 사이트의 주요 내용이 바뀝니다.
  url이 아직 없으면 빈 문자열("")로 두세요.
*/

window.PORTFOLIO_DATA = {
  profile: {
    name: "Seongguk Park",
    initials: "SP",
    role: "Embedded Software Engineer",
    eyebrow: "EMBEDDED SOFTWARE · ECU · EDGE AI",
    title: "하드웨어를 이해하고\n신뢰할 수 있는 소프트웨어를 만듭니다.",
    description:
      "MCU 펌웨어와 차량용 ECU 소프트웨어를 개발해 왔습니다. 임베디드 환경에서 소프트웨어와 하드웨어가 만나는 지점을 이해하며, 문제를 재현하고 원인을 끝까지 추적해 안정적인 시스템으로 구현합니다.",
    facts: [
      { label: "Experience", value: "Hyundai Mobis · 2025-2026" },
      { label: "Focus", value: "ECU · Embedded Linux · Edge AI" },
      { label: "Education", value: "Kyungpook National University" }
    ],
    about: [
      "전자공학을 주전공하고 컴퓨터학을 부전공하며 하드웨어와 소프트웨어의 기반을 함께 쌓았습니다. 현대모비스에서 조향 장치에 탑재되는 MCU 펌웨어와 OTA 소프트웨어를 개발했습니다.",
      "CAN-FD 기반 통신 구조와 Hardware-Application 인터페이스를 설계하고, 반복 업무를 Python으로 자동화하며 개발 과정의 안정성과 효율을 높이고 있습니다.",
      "대학에서는 임베디드 시스템과 딥러닝을 결합한 프로젝트를 수행했습니다. 모델 학습에 그치지 않고 C++ 변환, 경량화, 임베디드 Linux 및 MCU 배포까지 직접 검증했습니다."
    ],
    contactDescription:
      "임베디드 소프트웨어, 시스템 개발과 프로젝트에 관한 이야기를 나누고 싶다면 이메일이나 아래 채널로 연락해 주세요.",
    email: "psk2013@naver.com",
    resumeUrl: "",
    links: [
      { label: "GitHub", url: "https://github.com/SeonggukPark" },
      { label: "Velog", url: "https://velog.io/@seonggukpark/series" },
      { label: "Notion", url: "https://iridescent-kale-823.notion.site/a724acc444804319aedb75be04e8eb27?source=copy_link" }
    ]
  },

  skills: [
    {
      name: "Languages",
      items: ["C", "C++", "Python"]
    },
    {
      name: "Embedded",
      items: ["MCU", "Embedded Linux", "CAN-FD", "OTA", "BLE"]
    },
    {
      name: "AI",
      items: ["PyTorch", "TensorFlow", "Computer Vision", "Model Quantization"]
    },
    {
      name: "Tools",
      items: ["Git", "Bitbucket", "Jira", "Jupyter", "Visual Studio Code"]
    }
  ],

  experience: [
    {
      period: "2025.01 - 2026.03",
      organization: "현대모비스",
      role: "조향SW설계팀 · 연구원",
      description:
        "차량 조향 장치(EPS)에 탑재되는 C 기반 ECU 펌웨어를 설계하고 유지보수했습니다.",
      points: [
        "CAN-FD 기반 통신 구조를 활용한 Hardware-Application 인터페이스 API 설계",
        "고객 요구사항에 따른 ECU OTA(무선 업데이트) 소프트웨어 설계 및 구현",
        "Bitbucket과 Jira 기반 형상·이슈 관리 및 Python 기반 반복 업무 자동화"
      ]
    },
    {
      period: "2024.01 - 2025.01",
      organization: "경북대학교 Brain AI Lab",
      role: "학부연구생",
      description:
        "딥러닝 모델을 개발하고 제한된 임베디드 환경에 이식하는 산학과제와 개인 연구를 수행했습니다.",
      points: [
        "LG전자·LIG넥스원 산학과제에서 모델 개발 및 임베디드 추론 엔진 이식",
        "Vision Transformer 양자화 기반 경량화 연구 및 교내 학술대회 포스터 발표",
        "모델의 정확도뿐 아니라 메모리, 연산량과 실제 배포 환경을 함께 고려"
      ]
    },
    {
      period: "2021.03 - 2025.02",
      organization: "경북대학교",
      role: "전자공학부 주전공 · 컴퓨터학부 부전공",
      description:
        "전자공학과 컴퓨터학을 함께 이수하며 임베디드 시스템, 운영체제, 알고리즘과 인공지능의 기반을 학습했습니다.",
      points: [
        "학점 4.13 / 4.5",
        "마이크로프로세서, 운영체제, 임베디드시스템 프로그래밍 이수",
        "알고리즘, 컴퓨터구조, 데이터통신, 딥러닝 이수"
      ]
    }
  ],

  projects: [
    {
      title: "항만 컨테이너 크레인 자동화",
      category: "Embedded",
      period: "2023.03 - 2023.12",
      summary:
        "제어기와 Linux 서버 간 BLE 통신 구조를 설계하고 멀티스레드로 크레인 제어와 경로 계산을 병렬화해 전체 물류 운송 시간을 약 10% 단축했습니다. 2023 스마트 해상물류 경진대회에서 해양수산부 장관상을 수상했습니다.",
      skills: ["C", "C++", "Python", "Embedded Linux", "BLE", "Multi-thread"],
      repositoryUrl: "",
      detailUrl: ""
    },
    {
      title: "PCB 이미지 기반 불량 검출 모델",
      category: "AI",
      period: "2024.09 - 2024.12",
      summary:
        "소량·다품종 생산 환경의 데이터 부족을 Augmentation으로 보완하고 PCB 불량 Detection 모델을 Jetson Nano에 배포했습니다. 제한된 연산 환경에서 약 85%의 불량 탐지 정확도를 달성했습니다.",
      skills: ["Python", "PyTorch", "Computer Vision", "Jetson Nano"],
      repositoryUrl: "",
      detailUrl: ""
    },
    {
      title: "에어컨 실내기 분류 모델",
      category: "AI",
      period: "2024.07 - 2024.12",
      summary:
        "온·습도 시계열 데이터를 벡터 기반으로 군집화하고 Cosine Similarity로 동일 공간의 실내기를 분류했습니다. Python 모델을 C++로 변환해 실외기 Linux 추론 엔진에 이식하고 약 90%의 정확도를 달성했습니다.",
      skills: ["C++", "Python", "PyTorch", "Embedded Linux", "Clustering"],
      repositoryUrl: "",
      detailUrl: ""
    },
    {
      title: "MCU 환경 사람 검출 모델",
      category: "Edge AI",
      period: "2024.07 - 2024.08",
      summary:
        "MobileNet 기반 모델을 설계하고 양자화를 적용해 제한된 MCU 자원에서 추론 가능한 수준으로 최적화했습니다. 학습부터 배포까지 전 과정을 수행하고 약 75% 정확도의 사람 검출 가능성을 검증했습니다.",
      skills: ["Python", "TensorFlow", "MobileNet", "MCU", "Quantization"],
      repositoryUrl: "",
      detailUrl: ""
    },
    {
      title: "Vision Transformer 양자화",
      category: "Edge AI",
      period: "2024.03 - 2024.07",
      summary:
        "Vision Transformer의 자원 사용량을 분석하고 Post-Training Quantization을 적용했습니다. 정확도 저하를 1% 이내로 유지하면서 추론 속도를 약 43% 개선해 모바일·Edge 환경의 실행 가능성을 검증했습니다.",
      skills: ["Python", "PyTorch", "Vision Transformer", "INT8", "PTQ"],
      repositoryUrl: "",
      detailUrl: ""
    }
  ],

  study: [
    {
      title: "삼성전자 알고리즘 역량강화 과정",
      description: "문제 풀이 우수자 과정 수료 · 멘토 피드백 기반 알고리즘과 코드 최적화 학습",
      url: ""
    },
    {
      title: "LG Aimers",
      description: "ML/DL 기초·실전 교육 수료 · 잠재 고객 전환 가능성 예측 분류 모델 개발",
      url: ""
    },
    {
      title: "CJ Remote Internship",
      description: "Python 데이터 분석 교육 수료 · 스마트 헬스케어 서비스 데이터 분석",
      url: ""
    },
    {
      title: "Linux & System Software",
      description: "프로세스, 스레드, IPC, 네트워크와 시스템 프로그래밍 학습 기록",
      url: "https://github.com/SeonggukPark/Modern_Linux"
    }
  ],

  writing: [
    {
      source: "Velog",
      title: "개발 및 학습 기록",
      date: "Series",
      url: "https://velog.io/@seonggukpark/series"
    },
    {
      source: "Notion",
      title: "프로젝트와 학습 노트",
      date: "Archive",
      url: "https://iridescent-kale-823.notion.site/a724acc444804319aedb75be04e8eb27?source=copy_link"
    },
    {
      source: "GitHub",
      title: "소스 코드와 프로젝트 문서",
      date: "Repository",
      url: "https://github.com/SeonggukPark"
    }
  ]
};
