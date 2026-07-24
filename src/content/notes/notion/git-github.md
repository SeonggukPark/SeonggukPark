---
title: "Git & GitHub"
description: "Notion MCP에서 직접 가져온 Git & GitHub 학습 내용입니다."
publishedAt: 2026-07-24
tags: ["Git", "GitHub"]
draft: true
source: "https://app.notion.com/p/28e6b9674ad880ef84a1d6e36be29aae"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

- 학습 기간: 2025/10/01 \~ 2025/10/10
- 참고도서: **Do it! 5일 만에 끝내는 깃&깃허브 입문**
![Git & GitHub 이미지](/SeonggukPark/images/notion/notes/git-github-1.png)

---
# **1. Git 시작하기**
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

# **2. Git으로 버전관리 하기**
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

# **3. Git과 Branch**
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

# **4. GitHub 시작하기**
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

# **5. GitHub로 협업하기**
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

# **6. GitHub에서 소통하기**
## **6-1. GitHub Profile 관리하기**
- 자신의 깃허브에 커밋 올리는 것 뿐만 아니라, 다른 오픈소스 프로젝트에 PR를 등록하는 것처럼 깃허브에서 하는 모든 활동

## **6-2. README 파일 (with Markdown)**
- 방문자에게 repository 설명 위한 파일
- 기본적으로 markdown 문법 사용

### markdown 기본 문법
**제목 입력**
```plain text
# 제목 1
## 제목 2
### 제목 3
#### 제목 4
##### 제목 5
###### 제목 6
```

**가로줄 입력**
```plain text
--- or ***
```

**강조**
```plain text
*기울임* 또는 _기울임_
**굵게** 또는 __굵게__
~~취소선~~
```

**목록**
```plain text
- 항목 1
  - 하위 항목
    - 하위 하위 항목
1. 첫째
2. 둘째
```

**코드**
' \` ' (backtick) 3개로 열고 닫기

