---
title: "Git & GitHub 03. 브랜치와 병합"
description: "브랜치 생성과 전환, 병합, 충돌 해결과 cherry-pick을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Git", "GitHub"]
draft: true
source: "https://app.notion.com/p/28e6b9674ad880ef84a1d6e36be29aae"
importedAt: 2026-07-24
---

## **3-1. Branch 알아보기**
- branch(분기): 기존 branch에서 새 branch를 만드는 것
- merge(병합): 새 branch의 내용을 기존 branch와 병합하는 것
![](https://velog.velcdn.com/images/seonggukpark/post/5f794c5a-9c7a-4b68-ae58-6964e1e5de7b/image.png)

## **3-2. Branch 만들기 및 이동하기**
### 새 branch 만들기
```plain text
$ git branch // 브랜치 확인
$ git branch test // test branch 생성
```
→ git branch 명령은 branch를 만들거나 확인할 때 둘 다 사용

### git switch
- branch 전환하기
- 기존의 checkout 명령이 restore와 switch로 쪼개짐
- restore: 수정사항 or staging 취소할 때
- switch: branch 전환할 때
```plain text
$ git switch apple
```

## **3-3. Branch에서 commit 하기**
### 브랜치 간 차이점 보기
```plain text
$ git log main..apple // main에는 없고 apple에만 있는 커밋 보여줌
$ git log apple..main // apple에는 없고 main에만 있는 커밋 보여줌
```

## **3-4. Branch에서 병합하기**
### 서로 다른 파일 병합하기
- 그냥 merge만 해주면 됨
```plain text
$ git switch main // main branch checkout
$ git merge o2 // o2 branch merge
```
+) Fash-forward merge란?
- main 브랜치에서 분기 후, main의 변화가 없다면 (= 새로운 commit이 없다면) 분기한 브랜치의 최신 커밋을 main 브랜치가 가리키게만 하면 됨 (단순 포인터만 이동)
- 이 경우를 fast-forward merge라고 함

### 서로 다른 브랜치에서 한 문서의 "다른" 부분 수정시 병합
Q. 다음 사진과 같이 한 파일의 다른 부분을 다른 브랜치에서 수정 후 merge하면 어떻게 될까?
![](https://velog.velcdn.com/images/seonggukpark/post/00fb96d4-efe2-484c-847d-173ef4960c2e/image.png)
A. Auto-merge로 자연스럽게 합쳐줌
![](https://velog.velcdn.com/images/seonggukpark/post/4980187c-9d42-43b1-8e6a-0d1f5c4a3696/image.png)
+) "ort" strategy?
![](https://velog.velcdn.com/images/seonggukpark/post/492f742f-d1e8-4db0-b6b7-ddd81b92773f/image.png)

### 서로 다른 브랜치에서 한 문서의 "같은" 부분 수정시 병합
![](https://velog.velcdn.com/images/seonggukpark/post/78cf2244-680c-4559-990a-98291900d519/image.png)
→ 동일 부분 수정 후 merge시 conflict 발생
![](https://velog.velcdn.com/images/seonggukpark/post/b8a2321a-53c0-4be6-9431-81dc3a5d666b/image.png)
![](https://velog.velcdn.com/images/seonggukpark/post/732c387a-18fd-4e87-a421-31494e165679/image.png)
→ 좌/우측 창에서 incoming or current 수락 눌러서 병합해나가기 → 아래 화면은 병합 결과
+) 2 way merge vs 3 way merge
- 2 way merge: 2개의 변경사항 비교 후 병합
- 3 way merge: 2개의 변경사항을 공통 조상과 비교하여 병합→ 3 way가 훨씬 효율적

### 병합 끝난 브랜치 삭제
```plain text
$ git branch -d o2 // o2 브랜치 삭제
```
- main에 병합하지 않은 브랜치 삭제시 오류 메세지 발생함 → -D 사용 강제 삭제 가능

### cherry-pick
- 특정 커밋만 가져와서 merge하는 기능
```plain text
$ touch m1 // m1이라는 빈 파일 생성
```
![](https://velog.velcdn.com/images/seonggukpark/post/6f5daf97-ee4f-4e73-b4fd-3edd04e727e2/image.png)
```plain text
$ git cherry-pick 848bbdaa
```
![](https://velog.velcdn.com/images/seonggukpark/post/e224725f-56ed-4993-ae3a-01fa3f20e639/image.png)
→ t2를 추가한 commit이 합쳐져서 main branch에도 t2가 추가됨

