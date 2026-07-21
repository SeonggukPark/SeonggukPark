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
---

## 상황
## 원인
## 해결
## 다시 확인할 것
```

## 프로젝트 추가

`src/content/projects`의 기존 파일을 복사한 뒤 `role`, `period`, `category`, `outcomes`를 포함해 작성합니다. 채용 포트폴리오에서는 담당 범위, 제약, 기술적 판단과 정량적인 결과를 우선합니다.

