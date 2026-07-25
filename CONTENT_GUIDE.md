# 콘텐츠 작성 가이드

이 사이트의 프로젝트, 기술 글, 학습 노트는 `src/content` 아래의 Markdown 또는 MDX 파일로 관리합니다. 공개 화면에서는 기술 글과 학습 노트를 상위 메뉴 `학습 기록` 아래에서 함께 탐색합니다.

## 기술 글 추가

`src/content/posts/my-article.md` 파일을 만들고 다음 메타데이터로 시작합니다.

```md
---
title: "글 제목"
description: "목록과 검색 결과에 표시할 한두 문장"
publishedAt: 2026-07-21
updatedAt: 2026-07-21
tags: ["C++", "Linux"]
series: "System Software"
draft: true
---

## 배경

본문을 작성합니다.
```

완성 전에는 `draft: true`, 공개할 때는 `draft: false`로 설정합니다.

## 기술 주제 허브 추가

Notion 스터디 플래너의 상위 학습 페이지는 `src/content/topics`에 주제 허브로 작성합니다. 파일명은 `/posts/{파일명}/` 경로가 됩니다.

```md
---
title: "C++"
description: "주제 설명"
period: "2025.10 — 2026.01"
status: "완료"
order: 1
tags: ["C++"]
noteIds: ["modern-cpp-baseline"]
draft: false
source: "Notion 원본 URL"
importedAt: 2026-07-24
---

## 학습 목차

- 세부 주제
```

`noteIds`에는 주제 페이지의 `정리한 콘텐츠` 영역에 노출할 공개 학습 노트 ID를 기록합니다.

Notion에서 가져온 실제 학습 기록은 `src/data/topicContent.ts`에서 별도로 연결합니다. 대단원은 `section`, 하위 페이지는 `items` 배열로 표현하며 배열 순서가 사이트의 목차 순서가 됩니다.

```ts
cpp: [
  {
    title: "1. C++ 프로그래밍 기초",
    items: [
      {
        id: "notion/cpp/01-getting-started",
        slug: "01-getting-started"
      }
    ]
  }
]
```

`id`는 `src/content/notes` 아래 Markdown 경로에서 확장자를 제외한 값이고, `slug`는 `/posts/{주제}/{slug}/` 주소가 됩니다. 원본 계층에 빈 대단원이 있으면 `items: []`로 남겨 학습 계획 구조를 보존합니다. 이 목록에 명시된 Notion 문서만 기술 주제 아래에 공개되며 일반 학습 노트 목록에는 나타나지 않습니다.

## 학습 노트 추가

`src/content/notes/my-note.md`에 다음 형식으로 작성합니다.

```md
---
title: "문제를 드러내는 제목"
description: "무엇을 확인하고 해결했는지 요약"
publishedAt: 2026-07-21
tags: ["Linux", "Debugging"]
draft: false
repository: "https://github.com/..."
relatedProjects: ["container-crane-automation"]
---

## 상황
## 원인
## 해결
## 다시 확인할 것
```

Notion MCP에서 자동으로 가져온 문서는 `src/content/notes/notion`에 있으며 모두 `draft: true` 상태입니다. 원문 경로는 `source`, 가져온 날짜는 `importedAt`에 기록합니다. 공개할 때는 가져온 파일을 직접 덮어쓰기보다 루트 `src/content/notes`에 공개용 문서를 새로 작성해 원본 초안을 보존합니다. 제목과 설명을 다듬고, 코드·출처·이미지를 검증한 뒤 `publishedAt`을 실제 공개일로 지정합니다.

개발 서버를 실행한 뒤 `/SeonggukPark/drafts/`에서 가져온 초안을 검색하고 본문을 미리볼 수 있습니다. 이 경로는 개발 모드에서만 생성되며 프로덕션 빌드와 GitHub Pages에는 포함되지 않습니다.

공개 노트의 `relatedProjects`에는 `src/content/projects`의 파일명에서 확장자를 제외한 ID를 적습니다. 해당 프로젝트 페이지에서도 노트를 연결하려면 프로젝트의 `relatedNotes`에 노트 ID를 추가합니다.

## 프로젝트 추가

`src/content/projects`의 기존 파일을 복사한 뒤 `role`, `period`, `category`, `outcomes`, `relatedNotes`를 포함해 작성합니다. 채용 포트폴리오에서는 담당 범위, 제약, 기술적 판단과 정량적인 결과를 우선합니다.
