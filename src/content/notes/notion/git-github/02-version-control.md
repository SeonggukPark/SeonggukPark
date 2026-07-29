---
title: "Git & GitHub 02. Git으로 버전 관리하기"
description: "작업 트리, 스테이지, 커밋과 이력 복구 방법을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Git", "GitHub"]
draft: true
source: "https://app.notion.com/p/28e6b9674ad880ef84a1d6e36be29aae"
importedAt: 2026-07-24
---

## **2-1. 깃 저장소 만들기**
```plain text
$ git init // 현재 디렉토리에서 깃 사용 위해 초기화
```
→ .git 디렉터리가 생성되면 정상, 안보이면 \[보기\] → \[숨긴 항목\] 체크

## **2-2. 버전 만들기**
- version (버전)
: 프로그램 개발 과정에서 수정 내용이 발생하면 새로운 번호를 붙여서 이전 상태와 구별하는 것
### 깃의 작업영역
![](https://velog.velcdn.com/images/seonggukpark/post/c125a1a5-ef46-4378-889a-514c89a47659/image.png)
→ stage + repository는 .git 디렉터리 (git init 명령으로 만든 저장소 영역)에 숨어있어서 안 보임
- working directory (작업 트리)
: 파일 수정, 저장 등의 작업을 하는 디렉토리로, 우리 눈에 보이는 디렉터리
- stage (스테이지)
: version으로 만들 파일이 대기하는 곳, 'staging area' 라고도 함
- repository (저장소)
: stage에서 대기하고 있던 파일들을 version으로 만들어 저장하는 곳

### Stage & Commit
- commit (커밋)
: 버전을 만드는 명령, 사용 시 새로운 버전 생성되면서 staged된 파일이 모두 저장소에 저장
- 정리
→ working dir에서 작업
→ 수정 파일 중 버전으로 만들고 싶은 걸 staging
→ staged된 파일을 commit하면 version 생성

### Stage에 변경사항 올리기 - git add
- staging or stage에 올린다고 표현
- staging 내용은 .git/index에 저장 → 'index에 등록한다'라고도 함
```plain text
$ git status // 깃 상태 확인
$ git add hello.txt // staging 명령어
```

### Staged 파일 commit - git commit
- m 옵션으로 커밋 메세지 입력
- 커밋 메세지는 영문/한글 모두 가능
```plain text
$ git commit -m "msg"
$ git commit -am "msg2" // staging + commit 한번에 (단, tracked file에 대해서만 가능)
$ git commit --amend // commit msg 수정 → 실행하면 메세지 창 나오는데 메세지 수정하고 닫으면 commit 추가됨

```
![](https://velog.velcdn.com/images/seonggukpark/post/6f1550d1-7409-4664-8ebe-d491c4ac003d/image.png)

## **2-3. 커밋 내용 확인하기**
```plain text
$ git log // commit log 확인
$ git log --stat // 커밋과 관련된 여러 통계도 함께 보여줌
$ git log --oneline // 한 줄에 한 커밋씩 보여줌 → 가독성 good
$ git log --oneline --branches // 브랜치마다 최신 커밋 한눈에
$ git log --oneline --branches --graph // 그래프 형태

```
- commit hash (git hash): commit을 구별하는 일종의 id
- (HEAD -\> main): 해당 버전이 가장 최신이라는 의미

### 변경 사항 확인 - git diff
- vscode에서는 편집 창 우상단 \[변경 내용 열기\] 아이콘으로 확인 가능 → 왼쪽이 변경 전, 오른쪽이 변경 후 화면

## **2-4. 버전 만드는 단계마다 파일 상태 알아보기**
### tracked, untracked 파일
- tracked: 한번이라도 commit한 파일은 계속해서 git에 의해 수정 여부 추적, 이러한 파일이 tracked file
- untracked: 한 번도 commit 안 된 경우 추적 X, 이러한 파일이 untracked file
- 특정 파일, 디렉터리를 tracking 제외하려면 .gitignore 파일 사용하면 됨 → 주로 swp file, backup file을 지정
### unmodified, modified, stage 상태
![](https://velog.velcdn.com/images/seonggukpark/post/5708d005-af6a-4eb8-9457-c1a2252e774a/image.png)

## **2-5. 작업 되돌리기**
### working dir에서 수정한 파일 되돌리기 - git restore
- staging 안된 파일의 수정 내용 되돌리기
- 기존에는 checkout으로 수정 내용 되돌렸지만, git 2.23 부터는 restore 명령 사용
```plain text
$ git restore hello.txt
```

### staging 되돌리기 - git restore --staged
- staging 취소, 수정된 내용은 그대로 변경사항에 남아있음
- 기존에는 reset으로 수정 내용 되돌렸지만, git 2.23 부터는 restore 명령 사용
```plain text
$ git restore --staged // 모든 staged 파일 취소
$ git restore --staged [파일 이름] // 특정 staged 파일 취소
```

### 최신 commit 되돌리기 - git reset HEAD\^
```plain text
$ git reset --soft HEAD^ // commit 취소 & 파일을 staged 상태로 working dir에 보관
$ git reset --mixed HEAD^ // commit 취소 & 파일을 unstaged 상태로 working dir에 보관
$ git reset HEAD^ // mixed와 동일
```
![](https://velog.velcdn.com/images/seonggukpark/post/06d84107-bc85-4a6c-a8eb-dd862d774d9c/image.png)

### 특정 commit으로 되돌리기 - git reset "hash"
- reset A를 입력한다면, A commit을 삭제하는게 아니라 최신 커밋을 가리키는 HEAD를 A로 리셋한다는 의미
```plain text
$ git reset --hard [복사한 커밋 헤시] // 이 때 해쉬는 되돌아갈 commit hash
```

### 커밋 변경 이력 취소 - git revert
- git reset의 hash는 되돌아갈 커밋, git revert의 hash는 취소할 커밋임을 유의
```plain text
$ git revert [복사한 커밋 헤시] // 이 때 해쉬는 취소할 commit hash
```

