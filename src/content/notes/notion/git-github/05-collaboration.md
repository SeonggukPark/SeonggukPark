---
title: "Git & GitHub 05. GitHub로 협업하기"
description: "clone, fetch, Pull Request와 코드 리뷰 흐름을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Git", "GitHub"]
draft: true
source: "https://app.notion.com/p/28e6b9674ad880ef84a1d6e36be29aae"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

## **5-1. 다른 PC에서 원격 저장소 같이 쓰기**
### git clone
- 원격저장소를 로컬에 복사
```plain text
$ git clone {원격 저장소 주소} . // 현재 디렉토리에 복사
$ git clone {원격 저장소 주소} {새 디렉터리 이름} // 원격 저장소 복사 + 새 디렉터리 생성
```
- 하나의 원격 저장소에 지역 저장소 2개 이상 연결 시, 작업 전 반드시 git pull 부터

## **5-2. 원격 브랜치 정보 가져오기**
![](https://velog.velcdn.com/images/seonggukpark/post/ea7f9c8d-e1b5-46f2-abb0-dd3d30a528af/image.png)
### git fetch
- 원격 브랜치 정보 가져오기
- merge는 안함 (git pull = git fetch + git merge)

## **5-3. 협업의 기본 알아보기**
### 협업 과정
1) 협업을 위한 repository 생성
2) 팀원 추가 (공동 작업자)
3) branch별 commit & push
4) PR(pull request) 요청
5) 코드 리뷰 & branch 병합

