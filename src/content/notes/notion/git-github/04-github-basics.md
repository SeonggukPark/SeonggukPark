---
title: "Git & GitHub 04. GitHub 시작하기"
description: "원격 저장소 연결, push·pull과 SSH 인증을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Git", "GitHub"]
draft: true
source: "https://app.notion.com/p/28e6b9674ad880ef84a1d6e36be29aae"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

## 4-1. 원격 저장소와 GitHub
- 로컬 저장소(local repository): 사용자 컴퓨터에 있는 저장소
- 원격 저장소(remote repository): local이 아닌 컴퓨터 or 서버에 만든 저장소
![](https://velog.velcdn.com/images/seonggukpark/post/bae94a69-aa84-4333-be1c-990c2f7e0332/image.png)
### GitHub 역할
- 원격 repo에서 git 사용
- local repo backup
- 온라인 개발 툴 사용 (ex. Codespaces)
- 협업 프로젝트 사용
- 자신의 개발 이력 기록
- 다른 사람의 코드 보기 + 오픈 소스 참여
+) GitHub에서 오픈 소스 검색
- 검색 상자에 'korean' 입력하면 관련 여러 repo 등장

## 4-2. GitHub 가입
### 지역저장소 & 원격 저장소
- push: 지역 저장소 → 원격 저장소로 commit 등록하는 것
- pull: 원격 저장소 → 지역 저장소로 내려 받는 것
- local-remote 저장소를 같게 유지하는 것을 동기화(synchronize)라 함

## 4-3. 로컬 저장소 - 원격 저장소 연결
### 원격저장소 연결
```plain text
$ git remote add <원격이름> <저장소주소> // 내 로컬 저장소에 <원격이름> 이라는 이름으로 <저장소주소> 원격 저장소를 등록하겠다.
$ git remote -v // 현재 로컬 저장소에 연결된 원격저장소 목록과 주소 확인
```
→ origin: 기본 원격 저장소

## 4-4. 로컬 저장소 - 원격 저장소 동기화
### 원격 저장소에 처음 올리기
```plain text
$ git push -u origin master
```
→ -u 옵션은 --set-upstream으로도 쓸 수 있음
→ upstream 설정 + push 동시
→ 단, 원격-로컬 브랜치 이름 다를 경우에는 push만 되고 upstrean 설정은 안됨
```plain text
$ git push -u origin dev:master
```
→ 이러면 로컬의 'dev'브랜치가 원격의 'master'를 추적하도록 설정 가능

### git push
- 원격 저장소에 파일 올리기
- upstream 설정했으면 그냥 하면 됨
```plain text
$ git push
```

### git pull
- 원격 저장소에서 커밋 내려받기
```plain text
$ git pull <remote> <branch>
$ git pull // upstream 설정 된 경우
```
→ ex) git pull origin master

## 4-5. GitHub에 SSH 원격 접속
### SSH 원격 접속이란
- Secure SHell의 약자로, 보안 강화된 프로토콜
- public, private key 사용해 현재 사용하는 기기를 인증
- 일일이 로그인 안해도 되서 편리

### SSH Key 생성
```plain text
$ cd ~ // 홈 디렉터리 이동
$ ssh-keygen -t -ed25519 -C "이메일 주소" // ed25519 알고리즘 왈용해 SSH 키 생성
```
→ 이후 Enter만 3번 입력
![](https://velog.velcdn.com/images/seonggukpark/post/9c972785-4261-4aed-bf7c-1c4213d10730/image.png)
```plain text
$ cd .ssh
$ ls -ls
```
→ 다음 사진 처럼 나오면 성공
![](https://velog.velcdn.com/images/seonggukpark/post/f65da38f-6fd7-4859-a6bd-ec39edc31ab8/image.png)
- SSH Agent 실행 및 private key 등록
```plain text
$ eval "$(ssh-agent -s)"
$ ssh-add ~/.ssh/id_ed25519
```
![](https://velog.velcdn.com/images/seonggukpark/post/eec3bdbd-85c5-460a-83b5-36d3e1696577/image.png)

### GitHub에 Public key 전송
```plain text
$ clip < ~/.ssh/id_ed25519.pub // id_ed25519.pub 파일 복사
```
→ 이후 깃허브에서 사용자 아이콘 → \[Settings\] → \[Access Tab\] → \[SSH AND GPG keys\] → \[New SSH key\]
→ key에 현재 복사된 key값 붙여넣기

### SSH 주소로 원격 저장소 연결
- 원격 레포에서 SSH 주소 복사 후
```plain text
$ git remote add origin {복사한 주소}
```

