/*
  이 파일만 수정하면 사이트의 주요 내용이 바뀝니다.
  url이 아직 없으면 빈 문자열("")로 두세요.
*/

window.PORTFOLIO_DATA = {
  profile: {
    name: "Seongguk Park",
    initials: "SP",
    role: "Embedded · System Software Engineer",
    eyebrow: "SYSTEM SOFTWARE · EMBEDDED · LINUX",
    title: "문제를 구조적으로 이해하고\n직접 구현해 해결합니다.",
    description:
      "임베디드 소프트웨어 경험을 바탕으로 Linux, 운영체제, 네트워크와 시스템 프로그래밍 역량을 확장하고 있습니다. 공부한 개념은 명령어·코드·프로젝트로 검증하고 기록합니다.",
    facts: [
      { label: "Focus", value: "Linux · OS · Embedded" },
      { label: "Language", value: "C · C++ · Python" },
      { label: "Location", value: "South Korea" }
    ],
    about: [
      "하드웨어와 가까운 소프트웨어부터 운영체제와 시스템 프레임워크까지 연결해서 이해하는 것을 목표로 합니다.",
      "개념을 읽는 데서 끝내지 않고 직접 실행한 명령어, 구현 코드, 오류 원인과 해결 과정을 결과물로 남깁니다.",
      "이 사이트는 이력서, 프로젝트, 공부 기록과 외부 글을 한곳에서 보여주는 공개 포트폴리오입니다."
    ],
    email: "",
    resumeUrl: "",
    links: [
      { label: "GitHub", url: "https://github.com/SeonggukPark" },
      { label: "Velog", url: "" },
      { label: "Notion", url: "" }
    ]
  },

  skills: [
    {
      name: "Languages",
      items: ["C", "C++", "Python", "Shell Script"]
    },
    {
      name: "System",
      items: ["Linux", "Process & Thread", "IPC", "Socket", "Device Driver"]
    },
    {
      name: "Embedded",
      items: ["MCU", "AUTOSAR", "CAN", "RTOS", "Diagnostics"]
    },
    {
      name: "Tools",
      items: ["Git", "CMake", "Docker", "GDB", "Prometheus", "Grafana"]
    }
  ],

  experience: [
    {
      period: "현재",
      organization: "실무 경험",
      role: "Embedded Software",
      description:
        "임베디드 환경의 소프트웨어 개발과 검증 경험을 기반으로 시스템 소프트웨어 영역을 확장하고 있습니다.",
      points: [
        "C/C++ 기반 소프트웨어 개발과 디버깅",
        "차량 통신·진단 및 임베디드 개발 도구 활용",
        "문제 재현, 원인 분석, 수정 및 검증"
      ]
    },
    {
      period: "지속 학습",
      organization: "System Software Study",
      role: "Linux · OS · Network",
      description:
        "직무 전환과 역량 강화를 위해 시스템 프로그래밍 실습과 프로젝트를 축적하고 있습니다.",
      points: [
        "프로세스, 스레드, 시그널, IPC 학습",
        "TCP/IP, HTTP, 소켓 프로그래밍 학습",
        "관측 가능성과 Linux 운영 도구 실습"
      ]
    }
  ],

  projects: [
    {
      title: "Linux 멀티스레드 소켓 서버",
      category: "System",
      period: "Personal Project",
      summary:
        "다수 클라이언트가 접속하는 C 기반 서버를 구현하고, 공유 자원에서 발생한 경쟁 상태를 mutex로 해결했습니다.",
      skills: ["C", "Linux", "Socket", "pthread"],
      repositoryUrl: "",
      detailUrl: ""
    },
    {
      title: "Linux Character Device Driver",
      category: "System",
      period: "OS Project",
      summary:
        "리눅스 커널 모듈과 문자 디바이스 드라이버를 구현하며 사용자 공간과 커널 공간의 인터페이스를 학습했습니다.",
      skills: ["C", "Linux Kernel", "Device Driver"],
      repositoryUrl: "",
      detailUrl: ""
    },
    {
      title: "MCU Edge AI Classification",
      category: "AI",
      period: "Research Project",
      summary:
        "경량 CNN 모델을 학습·변환해 제한된 MCU 환경에서 이미지 분류를 실행하는 배포 파이프라인을 구축했습니다.",
      skills: ["Python", "TensorFlow Lite", "MCU", "Computer Vision"],
      repositoryUrl: "",
      detailUrl: ""
    },
    {
      title: "무인 갠트리 크레인",
      category: "Embedded",
      period: "Team Project",
      summary:
        "카메라, 라즈베리파이와 MCU를 연결한 무인 운송 시스템을 제작하고, 블로킹 문제를 스레드 분리로 개선했습니다.",
      skills: ["Raspberry Pi", "Arduino", "C++", "Thread"],
      repositoryUrl: "",
      detailUrl: ""
    }
  ],

  study: [
    {
      title: "Linux & Operating System",
      description: "프로세스, 스레드, 시그널, IPC, systemd, 파일시스템",
      url: "https://github.com/SeonggukPark/Modern_Linux"
    },
    {
      title: "Network",
      description: "TCP/IP, ARP, 라우팅, HTTP, 엔드포인트, 소켓",
      url: ""
    },
    {
      title: "Observability",
      description: "로그, 지표, 추적, Prometheus, Grafana",
      url: ""
    },
    {
      title: "System Programming",
      description: "C/C++, pthread, 동기화, 디버깅, 성능 분석",
      url: ""
    }
  ],

  writing: [
    {
      source: "Velog",
      title: "기존 기술 글을 여기에 연결하세요",
      date: "YYYY.MM",
      url: ""
    },
    {
      source: "Notion",
      title: "공개할 가치가 있는 학습 기록을 선별하세요",
      date: "YYYY.MM",
      url: ""
    },
    {
      source: "GitHub",
      title: "프로젝트 README와 상세 문서를 연결하세요",
      date: "YYYY.MM",
      url: "https://github.com/SeonggukPark"
    }
  ]
};
