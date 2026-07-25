export interface TopicContentItem {
  id: string;
  slug: string;
  label?: string;
}

export interface TopicContentSection {
  title: string;
  items: TopicContentItem[];
}

export type TopicContentMap = Record<string, TopicContentSection[]>;

// 공개 주제 페이지에서만 노출할 Notion 원문을 명시적으로 관리합니다.
// notes 컬렉션의 draft 상태는 유지하므로 학습 노트 목록에는 섞이지 않습니다.
export const topicContent: TopicContentMap = {
  "git-github": [
    {
      title: "Git & GitHub 학습 기록",
      items: [
        { id: "notion/git-github/01-getting-started", slug: "01-getting-started" },
        { id: "notion/git-github/02-version-control", slug: "02-version-control" },
        { id: "notion/git-github/03-branches-merging", slug: "03-branches-merging" },
        { id: "notion/git-github/04-github-basics", slug: "04-github-basics" },
        { id: "notion/git-github/05-collaboration", slug: "05-collaboration" },
        { id: "notion/git-github/06-communication", slug: "06-communication" }
      ]
    }
  ],
  cpp: [
    {
      title: "1. C++ 프로그래밍 기초",
      items: [
        { id: "notion/cpp/01-getting-started", slug: "01-getting-started" },
        { id: "notion/cpp/02-variables-operators", slug: "02-variables-operators" },
        { id: "notion/cpp/03-pointers-memory", slug: "03-pointers-memory" },
        { id: "notion/cpp/04-control-flow", slug: "04-control-flow" },
        { id: "notion/cpp/05-exceptions", slug: "05-exceptions" }
      ]
    },
    {
      title: "2. 객체지향 프로그래밍",
      items: [
        { id: "notion/cpp/06-oop-classes", slug: "06-oop-classes" },
        { id: "notion/cpp/07-oop-features", slug: "07-oop-features" },
        { id: "notion/cpp/08-oop-helpers", slug: "08-oop-helpers" },
        { id: "notion/cpp/09-solid", slug: "09-solid" },
        { id: "notion/cpp/10-templates", slug: "10-templates" }
      ]
    },
    {
      title: "3. 라이브러리 활용",
      items: [
        { id: "notion/cpp/11-standard-library", slug: "11-standard-library" },
        { id: "notion/cpp/12-stl-containers-algorithms", slug: "12-stl-containers-algorithms" }
      ]
    },
    {
      title: "4. Modern C++ 프로그래밍",
      items: [
        { id: "notion/cpp/13-modern-cpp-features", slug: "13-modern-cpp-features" },
        { id: "notion/cpp/14-new-types-libraries", slug: "14-new-types-libraries" },
        { id: "notion/cpp/15-new-syntax-1", slug: "15-new-syntax-1" },
        { id: "notion/cpp/16-new-syntax-2", slug: "16-new-syntax-2" }
      ]
    }
  ],
  "software-engineering": [
    {
      title: "소프트웨어공학 & 시스템분석설계",
      items: [
        { id: "notion/software-engineering/01-system-overview", slug: "01-system-overview" },
        { id: "notion/software-engineering/02-system-analysis", slug: "02-system-analysis" },
        { id: "notion/software-engineering/03-code-design", slug: "03-code-design" },
        { id: "notion/software-engineering/04-input-design", slug: "04-input-design" },
        { id: "notion/software-engineering/05-output-design", slug: "05-output-design" },
        { id: "notion/software-engineering/06-file-design", slug: "06-file-design" },
        { id: "notion/software-engineering/07-process-program-design", slug: "07-process-program-design" },
        { id: "notion/software-engineering/08-evaluation-documentation", slug: "08-evaluation-documentation" },
        { id: "notion/software-engineering/09-software-engineering", slug: "09-software-engineering" },
        { id: "notion/software-engineering/10-programming-support", slug: "10-programming-support" },
        { id: "notion/software-engineering/11-structured-analysis-design", slug: "11-structured-analysis-design" },
        { id: "notion/software-engineering/12-object-oriented-analysis-design", slug: "12-object-oriented-analysis-design" },
        { id: "notion/software-engineering/13-project-management", slug: "13-project-management" }
      ]
    }
  ],
  "modern-linux": [
    {
      title: "모던 리눅스 교과서",
      items: [
        { id: "notion/modern-linux/01-introduction", slug: "01-introduction" },
        { id: "notion/modern-linux/02-kernel", slug: "02-kernel" },
        { id: "notion/modern-linux/03-shell-scripting", slug: "03-shell-scripting" },
        { id: "notion/modern-linux/04-access-control", slug: "04-access-control" },
        { id: "notion/modern-linux/05-filesystem", slug: "05-filesystem" },
        { id: "notion/modern-linux/06-apps-packages-containers", slug: "06-apps-packages-containers" },
        { id: "notion/modern-linux/07-networking", slug: "07-networking" },
        { id: "notion/modern-linux/08-observability", slug: "08-observability" },
        { id: "notion/modern-linux/09-advanced-topics", slug: "09-advanced-topics" }
      ]
    }
  ],
  "android-kotlin": [
    {
      title: "1. Android 앱 개발 준비하기",
      items: [
        { id: "notion/android-kotlin/01-development-environment", slug: "01-development-environment" },
        { id: "notion/android-kotlin/02-app-structure", slug: "02-app-structure" }
      ]
    },
    {
      title: "2. Kotlin 이해하기",
      items: [
        { id: "notion/android-kotlin/03-kotlin-basics", slug: "03-kotlin-basics" },
        { id: "notion/android-kotlin/04-kotlin-oop", slug: "04-kotlin-oop" },
        { id: "notion/android-kotlin/05-kotlin-techniques", slug: "05-kotlin-techniques" }
      ]
    },
    {
      title: "3. 앱의 기본 기능 구현하기",
      items: [
        { id: "notion/android-kotlin/06-view-ui", slug: "06-view-ui" },
        { id: "notion/android-kotlin/07-layouts", slug: "07-layouts" },
        { id: "notion/android-kotlin/08-user-events", slug: "08-user-events" },
        { id: "notion/android-kotlin/09-resources", slug: "09-resources" },
        { id: "notion/android-kotlin/10-dialogs-notifications", slug: "10-dialogs-notifications" }
      ]
    },
    {
      title: "4. 구글의 라이브러리로 화면 구성하기",
      items: [
        { id: "notion/android-kotlin/11-jetpack", slug: "11-jetpack" },
        { id: "notion/android-kotlin/12-material", slug: "12-material" }
      ]
    },
    {
      title: "5. 컴포넌트 이해하기",
      items: [
        { id: "notion/android-kotlin/13-activity", slug: "13-activity" },
        { id: "notion/android-kotlin/14-broadcast-receiver", slug: "14-broadcast-receiver" },
        { id: "notion/android-kotlin/15-service", slug: "15-service" },
        { id: "notion/android-kotlin/16-content-provider", slug: "16-content-provider" }
      ]
    },
    {
      title: "6. 앱에 다양한 기능 추가하기",
      items: []
    },
    {
      title: "7. 파이어베이스와 연동하기",
      items: []
    },
    {
      title: "8. 컴포즈 활용하기",
      items: []
    }
  ],
  "docker-kubernetes": [
    {
      title: "그림으로 이해하는 도커와 쿠버네티스",
      items: [
        { id: "notion/docker-kubernetes/01-container-overview", slug: "01-container-overview" },
        { id: "notion/docker-kubernetes/02-docker-overview", slug: "02-docker-overview" },
        { id: "notion/docker-kubernetes/03-kubernetes-overview", slug: "03-kubernetes-overview" },
        { id: "notion/docker-kubernetes/04-container-runtime-standards", slug: "04-container-runtime-standards" }
      ]
    }
  ]
};
