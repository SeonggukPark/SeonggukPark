---
title: "Git & GitHub 01. Git 시작하기"
description: "버전 관리의 역할, Git 환경 설정과 기본 CLI 명령을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Git", "GitHub"]
draft: true
source: "https://app.notion.com/p/28e6b9674ad880ef84a1d6e36be29aae"
importedAt: 2026-07-24
---

- 학습 기간: 2025/10/01 ~ 2025/10/10
- 참고도서: **Do it! 5일 만에 끝내는 깃&깃허브 입문**

![Git & GitHub 이미지](/SeonggukPark/images/notion/notes/git-github-1.png)

## 1-1. 깃이란?
핵심 기능은 크게 3가지
1) 버전관리(version control)
2) 백업(backup)
3) 협업(collaboration)
→ 위 3가지는 순차적으로 배우는게 좋다
### 깃 프로그램의 종류
- GitHub Desktop: 깃허브 제공 프로그램, 쉽지만 기본 기능 위주
- TortoiseGit: 윈도우 탐색기의 빠른 메뉴에 추가되는 윈도우 전용 프로그램
- Source Tree: 복잡, but 다양한 기능
- CLI: 최근에는 vscode의 터미널 창으로 많이 씀

## 1-2. 깃 설치 및 환경설정
Git bash 열어서 다음 명령으로 사용자 정보 입력
```plain text
$ git config --global user.name "이름"
$ git config --global user.email "메일주소"
```

## 1-3. 리눅스 커맨드
- \~ (물결표): 현재 위치가 홈 디렉토리라는 의미
![](https://velog.velcdn.com/images/seonggukpark/post/2b6e19ed-d2bd-4410-a10f-904dfb18886d/image.png)

- pwd (print working directory): 현재 위치의 경로
![](https://velog.velcdn.com/images/seonggukpark/post/e492e4c6-b09f-42aa-8630-0a79f39e8ef9/image.png)

- ls (list)현재 디렉터리에 어떤 파일이나 디렉터리가 있는지 확인명령 옵션들이 존재하며, '-al' 처럼 2개 이상 붙여 쓸 수 있음
![](https://velog.velcdn.com/images/seonggukpark/post/45376bec-33db-4349-8b82-8fae991ee675/image.png)
![](https://velog.velcdn.com/images/seonggukpark/post/f84043bc-a7a5-460f-95c4-554fbb67ec5a/image.png)

- clear: 터미널 화면 비우기

- cd (change directory): 디렉터리 이동
```plain text
- 상위 디렉토리 이동: $ cd ..
- 하위 디렉토리 이동: $ cd (디렉토리 이름)
- 홈 디렉토리 이동: $ cd ~
```

+) 참고: 리눅스 경로 관련 기호
![](https://velog.velcdn.com/images/seonggukpark/post/ceab31ee-96d4-4a92-9e13-97c0e0379cb9/image.png)

- mkdir (make directory): 하위 디렉터리 생성

- rm: 디렉터리 삭제-r 옵션 붙이면 디렉터리 내 하위 파일 + 디렉터리들도 함께 삭제

- exit: 터미널 종료

