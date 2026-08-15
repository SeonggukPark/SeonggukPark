---
title: "Docker & Kubernetes 2. 도커 개요"
description: "Dockerfile, 이미지 레이어와 Docker·OCI 런타임 구조를 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Docker", "Kubernetes", "Container"]
draft: true
source: "https://app.notion.com/p/3966b9674ad88066ac37e84acfc34013"
importedAt: 2026-08-15
---

# <span color="gray_bg">(1) 도커와 Build, Ship, Run</span>
## 1) Build: 컨테이너 이미지 작성
- 컨테이너 실행 위해 컨테이너 이미지 필요
![](/SeonggukPark/images/notion/notes/docker-overview-01.svg)
	- 컨테이너 이미지: 컨테이너로 실행할 애플리케이션, 의존파일, 설정 등을 포함한 컨테이너 재료
![](/SeonggukPark/images/notion/notes/docker-overview-02.svg)
	- 빌드(Build): 컨테이너 이미지를 작성하는 것
- 컨테이너 재료: 도커파일, 컨텍스트
	- 도커파일: 컨테이너 작성 절차를 기록한 파일
	- 컨텍스트: 컨테이너에 저장하거나 빌드할 때 사용하는 파일
![](/SeonggukPark/images/notion/notes/docker-overview-03.svg)
	### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-04.png)
→ Hello world!를 출력하는 셸 스크립트 작성
	![](/SeonggukPark/images/notion/notes/docker-overview-05.png)
→ Dockerfile 작성
→ ubuntu:22.04도 이미 만들어져 있는 컨테이너 이미지 (커널 포함 X)
→ 여기에 hello.sh랑 ENTRYPOINT 설정 추가해서 새로운 컨테이너 이미지 생성하는 것
	![](/SeonggukPark/images/notion/notes/docker-overview-06.png)
→ Docker build
	## 2) Run: 컨테이너 실행
![](/SeonggukPark/images/notion/notes/docker-overview-07.svg)
![](/SeonggukPark/images/notion/notes/docker-overview-08.png)
→ 컨테이너 이미지로 컨테이너 실행
	![](/SeonggukPark/images/notion/notes/docker-overview-09.png)
→ docker exec 명령어로 컨테이너 내부 확인
→ 컨테이너를 계속 running 상태로 유지하려면, 어떤 형태로든 종료되지 않는 메인 프로세스 필요
	![](/SeonggukPark/images/notion/notes/docker-overview-10.png)
→ 컨테이너 정지 및 삭제
	## 3) Ship: 레지스트리를 사용한 컨테이너 배포
- 도커는 작성한 이미지를 다른 호스트에 배포 가능
- 레지스트리라고 부르는 이미지 배포용 서버를 통해 다른 호스트와 공유
![](/SeonggukPark/images/notion/notes/docker-overview-11.png)
	- 대표적인 레지스트리 서비스로 **도커 허브**가 있음
- 도커 허브에 등록한 사용자는 레포지토리를 도커 허브에 작성 가능
- 레포지토리에는 여러 이미지 저장 가능, 각 이미지는 태그 문자열로 구분
- 앞선 myimage:v1에서 myimage는 레포지토리명, v1은 해당 레포에서 이미지를 가리키는 태그
	### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-12.png)
→ 발급받은 PAT 활용 로그인
	![](/SeonggukPark/images/notion/notes/docker-overview-13.png)
→ Docker Hub에 push 하기 위한 태깅
	![](/SeonggukPark/images/notion/notes/docker-overview-14.png)
→ Docker Hub에 image push
	![](/SeonggukPark/images/notion/notes/docker-overview-15.png)
→ 성공적으로 저장된 모습
	![](/SeonggukPark/images/notion/notes/docker-overview-16.png)
→ Docker Hub에서 pull
# <span color="gray_bg">(2) 다양한 컨테이너 실행 방법</span>
## 1) 호스트와 컨테이너의 파일 공유와 데이터 유지
### bind mount
- 호스트의 파일 or 디렉터리를 컨테이너에 마운트 하는 기능
- `docker run`의 `-v` 플래그로 사용 가능 **(-v 뒤에는 경로가 옴)**
![](/SeonggukPark/images/notion/notes/docker-overview-17.svg)
#### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-18.png)
![](/SeonggukPark/images/notion/notes/docker-overview-19.png)
	### docker volume
- 컨테이너끼리 파일과 디렉터리 공유하거나 볼륨에 기록한 내용을 컨테이너 삭제 후에도 유지 가능
- 마찬가지로 `docker run`의 `-v` 플래그로 사용 가능** (-v 뒤에는 볼륨 이름이 옴)**
#### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-20.png)
→ 볼륨을 공유하는 컨테이너 실행
	![](/SeonggukPark/images/notion/notes/docker-overview-21.png)
→ 앞에서 만든 shared-vol을 읽기 전용으로 마운트
→ /mht/hello 파일은 다른 컨테이너에서 작성 했음에도 새로운 컨테이너에서도 확인 가능
→ 볼륨 이외의 파일은 접근 X
→ ro 플래그로 마운트한 볼륨 플래그는 쓰기 불가능
	![](/SeonggukPark/images/notion/notes/docker-overview-22.png)
→ 컨테이너 종료 및 삭제
→ 도커 볼륨 삭제
	## 2) 컨테이너 포트를 호스트에서 공개하기
- 컨테이너에는 호스트와 독립된 네트워크 인터페이스 부여
	→ Host와 다른 IP 주소 할당
	→ 기본적으로 컨테이너는 호스트의 포트를 사용해서 통신 대기 불가능
- 도커는 컨테이너의 특정 포트를 호스트 쪽 포트와 연결해, 호스트에서 컨테이너 포트를 공개하는 기능 존재
	→ `-p` 플래그로 지정 가능
### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-23.svg)
![](/SeonggukPark/images/notion/notes/docker-overview-24.png)
→ 컨테이너의 80번 포트를 Host의 127.0.0.1:8080에 publish한 예제
	## 3) 컴포즈: 여러 컨테이너를 한꺼번에 관리
### 컴포즈(Compose)
- 하나의 머신에서 연관된 여러 컨테이너를 한꺼번에 관리하는 기능
- docker 명령어는 컨테이너 1개 대상, 컴포즈는 머신 1개가 대상
	→ 다음 장의 쿠버네티스는 여러 대의 머신으로 구성된 분산 환경에서 컨테이너 관리
- 하나로 묶어 관리하고 싶은 컨테이너들의 실행 설정을 YAML 형식의 **컴포즈 파일**로 작성
- docker compose 명령어를 컴포즈 파일과 사용해서 컨테이너 그룹을 한번에 build, ship, run
	- `docker compose build` : 컴포즈 파일에 지정한 빌드를 실행
	- `docker compose up`: 컴포즈 파일에 기록된 컨테이너를 가동
	- `docker compose down`: 컴포즈 파일에 기록된 컨테이너를 정지, 삭제
	### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-25.svg)
![](/SeonggukPark/images/notion/notes/docker-overview-26.png)
→ compose 파일 작성
→ 각 컨테이너는 최상위 단계 요소인 volumes에 정의된 볼륨 사용
→ wordpress는 wordpress 컨테이너의 /var/www/html에 마운트
→ db볼륨은 db 컨테이너의 /var/lib/mysql에 마운트
→ wordpress 컨테이너의 80번 포트가 호스트의 127.0.0.1:8080에 연결된 상태로 외부에 공개
	![](/SeonggukPark/images/notion/notes/docker-overview-27.png)
→ compose로 컨테이너를 한번에 가동
	![](/SeonggukPark/images/notion/notes/docker-overview-28.png)
→ 컴포즈로 가동한 워드프레스에 접속
	![](/SeonggukPark/images/notion/notes/docker-overview-29.png)
→ 컴포즈로 컨테이너를 한꺼번에 종료
# <span color="gray_bg">(3) 도커 파일</span>
- 컨테이너 이미지 작성 절차를 기록한 파일
- docker build에 도커파일 지정하면 도커는 도커파일에 적힌 절차대로 이미지 작성
## 1) 도커파일 기본 문법
- 도커파일 같은 이미지 빌드 도구는 각 줄에 기록된 명령을 앞에서 **순서대로 **실행해서 이미지 작성
- 베이스 이미지 지정하는 `FROM` 명령어 부터 시작
### 기본 문법
- `COPY` 명령: 컨텍스트 등에서 이미지로 파일을 복사
- `RUN` 명령: 이미지에서 셸 명령어를 실행
- `ENV` 명령: 후속 명령이나 빌드된 이미지를 실행할 때 설정할 환경 변수를 지정
- `ENTRYPOINT` 명령: 이미지를 컨테이너로 실행할 때 컨테이너 내부에서 실행할 명령어 지정
	### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-30.png)
→ figlet을 사용한 스크립트의 컨텍스트 작성
→ hello.sh 라는 셸 스크립트 생성 후 권한 부여
![](/SeonggukPark/images/notion/notes/docker-overview-31.svg)
![](/SeonggukPark/images/notion/notes/docker-overview-32.png)
→ 앞에서 작성한 hello.sh를 실행하는 컨테이너를 작성하는 Dockerfile
	![](/SeonggukPark/images/notion/notes/docker-overview-33.png)
→ 컨텍스트(./hello 디렉터리)와 도커파일로 이미지 빌드
	## 2) 멀티 스테이지 빌드
- 도커파일은 다수의 FROM 명령을 사용해 여러 종류의 빌드를 하나로 묶을 수 있음
- 각 `FROM` 명령어로 시작하는 빌드 절차를 Stage라 함
- 멀티 스테이지 빌드는 여러 Stage를 하나의 도커파일로 작성하는 기능
- 이미지 경량화에 편리
	→ 
### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-34.svg)
![](/SeonggukPark/images/notion/notes/docker-overview-35.png)
→ 멀티 스테이지 빌드를 사용한 Dockerfile
	![](/SeonggukPark/images/notion/notes/docker-overview-36.png)
→ hello를 출력하는 Go 소스코드
	![](/SeonggukPark/images/notion/notes/docker-overview-37.png)
→ Go 프로그램 컴파일에 필요한 패키지 관리자용 go.mod 파일
	![](/SeonggukPark/images/notion/notes/docker-overview-38.png)
→ 멀티 스테이지 빌드 실시
	![](/SeonggukPark/images/notion/notes/docker-overview-39.png)
→ dev stage까지만 이미지로 만들기 위해 빌드
→ 최종 스테이지까지 작성된 이미지는 빌드용 의존 파일이 없는 만큼, dev stage 까지의 이미지 보다 용량이 훨씬 작음
![](/SeonggukPark/images/notion/notes/docker-overview-40.svg)
![](/SeonggukPark/images/notion/notes/docker-overview-41.png)
→ 병렬 멀티 스테이지 빌드 실습
# <span color="gray_bg">(4) 컨테이너 레이어 구조</span>
## 1) 컨테이너 이미지의 레이어 구조
- 컨테이너는 변경 사항의 집합
	- 파일 추가, 삭제, 수정 같은 변경 작업 내용을 하나로 모은 집합
	- 이런 변경 사항들을 layer라고 함
![](/SeonggukPark/images/notion/notes/docker-overview-42.svg)
![](/SeonggukPark/images/notion/notes/docker-overview-43.svg)
	## 2) 컨테이너 이미지 내부 내용 보기
### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-44.png)
→ 도커 이미지 분석
→ `blobs/` : 실제 이미지 데이터 저장 공간
	→ `sha256/` : blob들을 SHA-256 값으로 구분해서 저장하는 디렉터리
	→ Config, Manifest, Layer blob들이 존재
		![](/SeonggukPark/images/notion/notes/docker-overview-45.png)
→ layer blob에 포함된 파일 확인
	## 3) 컨테이너 빌드와 레이어 구조
![](/SeonggukPark/images/notion/notes/docker-overview-46.svg)
![](/SeonggukPark/images/notion/notes/docker-overview-47.svg)
→ 최적화를 위해서는 변경이 적고 공통적인 작업을 코드의 위에, 자주 바뀌는 작업을 코드의 아래에 두는 것이 중요
### 실습
![](/SeonggukPark/images/notion/notes/docker-overview-48.png)
→ 앞서 만든 hello 디렉터리를 복제한 후 hello.sh 내용 다시 작성
	![](/SeonggukPark/images/notion/notes/docker-overview-49.png)
→ 이전 빌드에서 CACHED되어 apt-get 생략하는 모습
	## 4) 컨테이너 실행의 레이어 구조
- 컨테이너의 레이어 구조는 컨테이너 간 데이터 중복 없이 서로의 환경에 영향을 주지 않는다는 요구사항을 만족시켜야 함
![](/SeonggukPark/images/notion/notes/docker-overview-50.svg)
- 특정 이미지로 컨테이너를 여러 번 실행해도 컨테이너간 공통 레이어는 복사가 아닌 공유
	→ 이미지 구성 레이어는 Read Only(RO)로 공유
	→ 컨테이너에서 변경 불가능
	→ 컨테이너 실행 시 레이어 중찹의 한 단계 위에 해당 컨테이너 전용 RW레이어를 새로 작성
	→ 컨테이너 실행 중 발생한 루트 파일 시스템의 변경 내용을 여기 저장
	→ 신규 파일 작성시 RW레이어에 추가 / 기존 RO 레이어의 파일 변경시 대상 파일만 RW레이어 복사 후 변경하는 Copy on Write(CoW) 방식 사용
		## 5) 레이어 구조의 이미지와 루트 파일시스템 작성에 필요한 기술
- 도커는 스토리지 드라이버(or graph driver) 컴포넌트를 사용해 레이어 중첩 및 CoW 방식 구현
	→ 스토리지 드라이버 : 컨테이너 구성 레이어를 호스트에 저장, 레이어를 중첩해서 컨테이너 루트 파일시스템으로 사용하는 레이어 관리용 컴포넌트
![](/SeonggukPark/images/notion/notes/docker-overview-51.svg)
→ overlay2 스토리지 드라이버는 tar 형식의 아카이브 파일을 레이어로 각 디렉터리에 압축 해제 상태로 저장
→ 이 디렉터리와 컨테이너 레이어(RW 레이어)로 사용하는 디렉터리를 오버레이 파일 시스템으로 중첩한 결과가 컨테이너의 루트 파일시스템
	#### 오버레이 파일 시스템
- 리눅스 커널 3.18부터 도입된 기술
- 어떤 디렉터리를 다른 디렉터리와 중첩한 결과를 마운트할 수 있는 파일시스템
	#### 디렉터리 중첩
![](/SeonggukPark/images/notion/notes/docker-overview-52.svg)
![](/SeonggukPark/images/notion/notes/docker-overview-53.svg)
	#### 정리
- **OverlayFS : **리눅스 커널이 제공하는 여러 디렉터리를 중첩하는 파일시스템
- **overlay2 : **Docker가 OverlayFS를 이용하기 위해 사용하는 스토리지 드라이버
- **CoW : **중첩된 RO 레이어의 파일을 수정할 때 RW 레이어로 복사하여 수정하는 방식
# <span color="gray_bg">(5) 도커 아키텍처와 OCI 런타임</span>
- 도커는 클라이언트-서버형 아키텍쳐
- CLI에서 입력하는 docker 명령어가 도커 클라이언트 명령어에 해당
- 머신에서 도커 데몬(dockerd)가 실행, docker 명령어로 도커 API 형태의 HTTP API를 경유해서 지시 받음
- 도커 데몬은 컨테이너 실행, 이미지, 네트워크, 스토리지 같은 컨테이너 생명주기 전체를 관리
![](/SeonggukPark/images/notion/notes/docker-overview-54.png)
