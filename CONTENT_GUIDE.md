# 콘텐츠 작성 가이드

이 사이트의 프로젝트, 기술 글, 학습 노트는 `src/content` 아래의 Markdown 또는 MDX 파일로 관리합니다.

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

`noteIds`에는 주제 페이지 안에 노출할 공개 학습 노트 ID를 기록합니다. 가져온 비공개 초안은 직접 연결하지 않습니다.

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
