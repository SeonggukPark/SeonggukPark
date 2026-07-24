---
title: "모던 리눅스 3. 쉘과 스크립팅"
description: "Notion MCP에서 직접 가져온 모던 리눅스 3. 쉘과 스크립팅 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Linux", "System Software"]
draft: true
source: "https://app.notion.com/p/33a6b9674ad880b38d46cf6bd29f0d52"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

# (1) 기본 개요
- CLI 관점에서 리눅스와 상호 작용 하는 방법은 크게 **수동**(대화식 명령 입력), **스크립팅** 2가지 존재
![모던 리눅스 3. 쉘과 스크립팅 이미지](/SeonggukPark/images/notion/notes/modern-linux/03-shell-scripting-1.png)

## 터미널
- 텍스트로 된 UI를 제공하는 프로그램
- 고전적인 터미널로 xterm, rxct, Gnome terminator 존재
- 차세대 터미널로 Alacritty, kitty, warp 존재

## 셸
- 터미널 내부에서 실행, 명령 인터프리터 역할하는 프로그램
- 특징: 스트림 통해 입출력 처리, 변수 지원, built-in 명령 존재, 대화식, 스크립트 사용 모두 허용
- 공식적으로 sh로 정의 (종종 POSIX 셸이라는 용어도 등장, 이는 스크립트 및 이식성 측면에서 중요)
- 최근에는 sh 대신 bash 셸이 기본적으로 널리 쓰임
- `file -h /bin/sh` or `echo $0` 으로 현재 사용중인 셸 확인 가능
![모던 리눅스 3. 쉘과 스크립팅 이미지](/SeonggukPark/images/notion/notes/modern-linux/03-shell-scripting-2.png)
### 스트림
- 셸은 입출력을 위해 세 가지 기본 파일 디스크립터(FD)를 모든 프로세스에 제공
![모던 리눅스 3. 쉘과 스크립팅 이미지](/SeonggukPark/images/notion/notes/modern-linux/03-shell-scripting-3.png)
- stdin (FD 0)
- stdout (FD 1)
- stderr (FD 2)
- \$FD\>, \<\$FD를 사용해 프로세스의 입출력 스트림 재지정 가능 (\$FD는 파일 디스크립터 - 0, 1, 2)
- e.g.) `2>` : stderr 스트림 재지정, `1>, >` : stdout 지정, `&>` : stdout, stderr 모두 재지정
- e.g.) `$curl `[`https://example.com`](https://example.com)` &> /dev/null` : stdout, stderr을 모두 /dev/null로 재지정해 출력값 버림

- 셸에서의 특수문자
- `&` : 명령 마지막에 배치, 백그라운드에서 실행
- `\` : 긴 명령의 가독성을 위해 다음 행에서 명령 계속할 때 사용
- `|` : 한 프로세스의 stdout 값을 다음 프로세스의 stdin과 연결해 데이터를 파일에 임시 저장하지 않고 바로 전달 가능
### 변수
#### 사용 케이스
- 리눅스가 노출하는 구성 항목 처리시
- 스크립트에서 사용자에게 값을 대화 형식으로 질문 시
- 긴 값을 한 번 정의해 입력 줄일 경우 (이 경우, 변수 선언 후 값 고정이므로 프로그램 언어의 const 값에 해당)
#### [변수 종류](https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html)
- 환경 변수
- 셸 전체의 설정
- `env` 명령어로 목록 나열
- bash에서 `export` 명령어로 만들 수 있음
- 셸 변수
- 현재 실행 상황에서 유효
- bash에서 `set` 명령어로 목록 나열 가능
- 하위 프로세스는 셸 변수 상속 X
- bash에서 `set`, `unset` 으로 생성 및 제거 가능
### 종료 상태
- 셸은 종료 상태를 활용해 명령 실행 완료를 명령 호출자에게 알림
- 0은 오류 없이 성공적으로 실행, 1\~255사이 값은 실패 의미
- `echo $?`로 확인 가능
### 내장 명령어
- `yes, echo, cat, read` 등 
### 작업 제어
- 실행 중인 명령어/프로세스를 포그라운드, 백그라운드, 일시정지, 재개, 종료하는 기능
- 그러나 터미널 멀티플렉서 사용하는 걸 추천

## 모던 리눅스 명령어
- drop-in replace : 코드 변경이 거의 없이 하나의 요소를 다른 요소로 교체하여 더욱 좋은 성능을 내는 것
### exa
- ls(디렉터리 내용 나열)의 대체 명령어로 사용 가능
### bat
- cat(파일 내용 보기)의 대체 명령어로 사용 가능
### rg
- grep(파일에서 컨텐츠 찾기) 대체 명령어로 사용 가능
### jq
- json용 특수 도구
- 특정 값 뽑기 가능

## 일반 작업
### 자주 쓰는 명령어 단축
- git diff —color-moved 대신 d를 쓰는 것 처럼
- 배시 셸에서는 ‘앨리어스’, 피시 셸에서는 ‘약어’라 부름
### 행 탐색 & 조작
<table>
<colgroup>
<col>
<col>
</colgroup>
<tr>
<td>단축키</td>
<td>의미</td>
</tr>
<tr>
<td>`Ctrl + A`</td>
<td>현재 입력 줄의 맨 앞으로 이동</td>
</tr>
<tr>
<td>`Ctrl + E`</td>
<td>현재 입력 줄의 맨 뒤로 이동</td>
</tr>
<tr>
<td>`Ctrl + B`</td>
<td>커서를 한 글자 왼쪽으로 이동</td>
</tr>
<tr>
<td>`Ctrl + F`</td>
<td>커서를 한 글자 오른쪽으로 이동</td>
</tr>
<tr>
<td>`Alt + B`</td>
<td>커서를 한 단어 왼쪽으로 이동</td>
</tr>
<tr>
<td>`Alt + F`</td>
<td>커서를 한 단어 오른쪽으로 이동</td>
</tr>
<tr>
<td>`Ctrl + H`</td>
<td>커서 왼쪽 문자 삭제, Backspace와 유사</td>
</tr>
<tr>
<td>`Ctrl + D`</td>
<td>커서 위치의 문자 삭제</td>
</tr>
<tr>
<td>`Ctrl + W`</td>
<td>커서 왼쪽의 단어 삭제</td>
</tr>
<tr>
<td>`Alt + D`</td>
<td>커서 오른쪽의 단어 삭제</td>
</tr>
<tr>
<td>`Ctrl + K`</td>
<td>커서부터 줄 끝까지 삭제</td>
</tr>
<tr>
<td>`Ctrl + U`</td>
<td>커서부터 줄 앞까지 삭제</td>
</tr>
</table>
…
### 파일 내용 관리
- 매번 vi 같은 편집기를 실행하지 않고 텍스트 내용 조작 가능
### 긴 파일 보기
- less, bat 같은 pager 사용 가능
- 또는 head, tail 활용해 처음, 끝 몇 행만 출력 가능
### 날짜와 시간 처리
- date 명령

# (2) 인간 친화적인 셸
- bash는 나이가 많아서 인간 친화적이지는 않음
## 피시 셸
### 기본 사용법
- 명시적인 이력 관리 없고, 대다수 명령에 대해 자동완성을 사용할 수 있는점이 bash 대비 특징
![모던 리눅스 3. 쉘과 스크립팅 이미지](/SeonggukPark/images/notion/notes/modern-linux/03-shell-scripting-4.png)
### 구성
- fish_config 명령 하나로 셸 구성 가능
![모던 리눅스 3. 쉘과 스크립팅 이미지](/SeonggukPark/images/notion/notes/modern-linux/03-shell-scripting-5.png)

## Z셸
- 가장 강력한 자동 완성, 풍부한 테마 제공

## 그 밖의 최신 셸
- 오일 셸, 뮤렉스, 파워셸 등

## 어떤 셸을 사용해야 할까
- 2022년 기준 bash셸만 아니면.. 다 좋아 보임

# (3) 터미널 멀티플렉서
- 하나의 터미널 창 안에서 여러 개의 터미널 세션을 동시에 관리할 수 있게 해주는 도구
## screen
- 원조 터미널 멀티플렉서
- 오늘날 유지 관리가 활발하지 않고, 유연하지도 않고, 최신 기능이 부족하므로 되도록 사용 X

## tmux
### tmux 기본 구조
![모던 리눅스 3. 쉘과 스크립팅 이미지](/SeonggukPark/images/notion/notes/modern-linux/03-shell-scripting-6.png)
- 세션(session)
- ‘블로그 게시물 Y 작성’처럼 특정 작업 위한 작업 환경
- 윈도(window)
- 세션에 속한 단위
- 브라우저의 탭 같은 존재
- 사용 여부는 선택 가능
- 대부분 한 세션에 한 윈도우
- 영역(pane)
- 실행 가능한 단일 셸 인스턴스
- 윈도의 일부로, 세로 가로 분할 및 필요에 따른 확장/축소 가능

### tmux 사용
- `$ tmux new -s test` : tmux에서 구성한 셀이 클라이언트로 실행
- `$ tmux attach -t test` : test라는 기존 세션에 연결
- tmux는 접두사(=트리거)라는 기본 키보드 단축키로 `Ctrl + b` 사용
- e.g.) 모든 윈도우 나열 : `Ctrl + b`  → `w` , 현재 영역 확장 : `Ctrl + b` → `z`

## 그 밖의 멀티플렉서
- tmuxinator, Byobu, Zellij 등

## 어떤 멀티플렉서를 사용해야 할까
- **쉘과 달리, 멀티플렉서는 대체로 tmux를 선호하므로 그냥 이거 쓸것**

# (4) 스크립팅
- 대부분 스크립트는 배시 셸로 작성, 또한 많은 시스템이 배시 셸 사용 → 배시 셸로 스크립트 작성

## 스크립팅의 기본 개요
- 변수, 스트림과 재지정, 일반 명령 등 익숙한 개념 존재

## 이식 가능한 배시 스크립트 작성
- 이식 가능: 스크립트가 실행될 환경에 대해 많은 가정을 하지 않는다는 의미
- 스크립트는 단순한 텍스트 파일이라 확장자 중요 X, but `.sh`가 관례로 많이 사용
→ 이런 텍스트 파일 첫 행에서 `#!` 로 작성하는 shebang(hashbang)을 사용해 인터프리터 선언 후, `chmod +x` 등을 사용해 스크립트를 실행 가능하게 만들어서 셸에서 실행 가능
### 스크립트 작성 원칙
- 빠르고 요란하게 실패할 것
- 암호 같은 민감한 정보는 하드코딩해서는 안됨
- ps는 프로그램 매개변수 등을 공개 → 정보 유출 가능
- 의존성 확인 (curl 대신 wget을 사용하는 등)
- 예외처리
- 메인 블록의 스크립트를 인라인 문서화 (`# 여기에 문서 정보 추가` 같은 주석 활용)
- git 활용한 버전 관리도 고려
- 스크립트 lint & test

## 스크립트 린트와 테스트
- 개발 과정에서 명령, 지침 점검을 위해 스크립트 확인 및 린트 필요
- 린트: 실행 전 문법 오류, 코드, 버그 등 체크
- **ShellCheck **프로그램 사용

## 전체 예제: 깃허브 사용자 정보 스크립트

# (5) 정리

