---
title: "모던 리눅스 6. 애플리케이션·패키지·컨테이너"
description: "Notion MCP에서 직접 가져온 모던 리눅스 6. 애플리케이션·패키지·컨테이너 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Linux", "System Software"]
draft: true
source: "https://app.notion.com/p/33a6b9674ad880109cd9ce3eb4d7115c"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

1
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-1.png)

- 애플리케이션 = 프로그램 / 바이너리 / 실행 파일
# (1) 기본 개요
### 프로그램
- 리눅스가 메모리에 로드&실행할 수 있는 바이너리 파일 or 셸 스크립트
- 실행 파일 이라고도 함
- 실행 파일 유형에 따라 실행을 관리하는 주체가 다름 (e.g. 셸 스크립트 → 셸이 해석 및 실행) 
### 프로세스
- 프로그램 기반의 실행 엔티티
- 슬립 상태가 아닌 한 메인 메모리에 로드되어 CPU나 I/O를 사용
### 데몬
- 다른 프로세스에 특정 기능을 제공하는 백그라운드 프로세스
- 데몬 프로세스의 줄임말로 **서비스**라고도 함
- e.g.) 프린터 데몬을 통한 인쇄, 웹 서비스, 로깅, 시간 등 매일 사용하는 유틸리티를 위한 많은 데몬
### 애플리케이션
- 종속성, UI를 포함한 실질적인 프로그램
- 일반적으로 검색, 설치, 제거에 이르기까지 프로그램 전체 수명주기, 구성, 데이터와 관련해 애플리케이션 용어 사용 
### 패키지
- 프로그램과 구성을 포함한 파일
- 소포트웨어 애플리케이션 배포 시 사용
### 패키지 관리자
- 패키지를 입력으로 받아 해당 콘텐츠, 사용자 지침에 따라 리눅스 환경에서 패키지를 설치, 업그레이드, 제거하는 프로그램
### 공급망
- 패키지 기반으로 사용자가 애플리케이션을 찾고 사용할 수 있는 소프트웨어 생산자와 배포자의 모음
### 부팅
- 리눅스를 사용할 수 있는 상태로 만드는 것을 목표로, HW/SW를 초기화 하는 리눅스 시작 시퀀스
- 커널 로딩, 서비스(or daemon) 프로그램 시작도 포함
### 프로그램
- 리눅스가 메모리에 로드&실행할 수 있는 바이너리 파일 or 셸 스크립트
- 실행 파일 이라고도 함
- 실행 파일 유형에 따라 실행을 관리하는 주체가 다름 (e.g. 셸 스크립트 → 셸이 해석 및 실행) 

# (2) 리눅스 시작 프로세스
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-2.png)
1. UEFI가 부트로더 실행 (이전 시스템은 POST → BIOS가 HW 초기화 후 실행)
2. 부트로더가 커널을 메모리에 올리고 실행 (이를 부트스트랩이라 함)
3. 커널에서 하위 시스템, 파일 시스템, 드라이버 초기화 후 init 프로세스에 제어권 넘김
4. init(현대 리눅스에서는 systemd)이 데몬 실행, 네트워크 설정 등을 하고 사용자 환경 
5. 사용자 공간 프로그램 실행
# (3) systemd
- initd를 대체하는 init 시스템으로 시작해서 최근에는 로깅, 네트워크 기능 등을 포함하는 강력한 관리자
- initd는 초기화 시 영숫자 순서로 서비스를 시작하는 바면, systemd는 종속성만 충족되면 시작
→ 시작 시간 단축 가능
→ systemd에 지시하는 방법은 유닛을 통해 이뤄짐
## 유닛
- 기능 및 리소스에 따라 의미가 다른 논리 그룹
- systemd가 관리하는 대상 하나
- e.g.) service 유닛 : 서비스/데몬 관리, socket : 네트워크, IPC 소켓을 설명
## systemctl
- 시스템 유닛을 관리하는 명령
- e.g.) `systemctl start ~~.service` : 서비스 시작
## journalctl
- 로그 확인하는 명령어
## 예제: greeter 스케쥴링
- service, timer 유형의 systemd 유닛 파일 정의 후, `/run/systemd/system` 에 복사
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-3.png)
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-4.png)
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-5.png)
→ systemd가 greeter에 대해 알고 있으며, 실행할 예정
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-6.png)

# (4) 리눅스 애플리케이션 공급망
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-7.png)
- 소프트웨어 유지보수 담당자
- 개별 개발자, 오픈소스프로젝트 같은 회사가 포함
- 저장소
- 앱 일부 혹은 전체가 메타데이터와 함께 포함된 패키지 존재
- 일반적으로 패키지는 앱의 종속성도 포함
- 종속성: 앱이 작동하기 위해 필요한 다른 패키지
- 종속성을 최신 상태로 유지하는 건 어려움
- 도구
- 대상 시스템 쪽에서 패키지 관리자를 통해 저장소에 위치한 패키지 조회, 설치, 업데이터, 삭제 가능

![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-8.png)
- 전통적 패키지 관리자
- 저수준, 고수준 구분
- 패키지 관리자가 속성 해결 가능하고, 고수준 인터페이스(설치, 업데이트, 제거)를 제공할 경우 고수준 패키지 관리자라 함
- 컨테이너 기반 솔루션
- 서버-클라우드 컴퓨팅 영역에서 나온 솔루션
- 애플리케이션 관리에 사용하기 좋음
→ 쉽게 테스트 및 프로덕션으로 배포 가능한 앱 제작 가능
- 모던 관리자
- 데스크톱 환경에 뿌리를 두고 있음
- 최종 사용자가 앱을 최대한 쉽게 사용하게 하는것이 주요 목표

# (5) 패키지와 패키지 관리
- 패키지
- 압축된 파일 하나, 메타데이터 포함
- 도구(=패키지 관리자)
- 대상 시스템에서 패키지를 처리해 앱 설치 & 유지 관리
- 사용자를 대신해 저장소와 상호 작용, 패키지의 로컬 캐시 유지 관리
## RPM 패키지 관리자
- 레드헷에서 시작, 현재는 다양한 배포판에서 날리 사용
- .rpm 파일 형은 리눅스 표준 베이스에서 사용, 바이너리나 소스 파일 포함 가능
- e.g.) yum, dnf, Zypper
- but, rpm은 의존성 해결을 잘 안 해줌
## 데비안 deb
- Ubuntu가 데비안 기반 배포판인 점을 감안할 때, deb 패키지는 데스크톱, 서버 모두에서 널리 사용
<table>
<colgroup>
<col>
<col>
</colgroup>
<tr>
<td>구분</td>
<td>역할</td>
</tr>
<tr>
<td>`.deb`</td>
<td>패키지 파일 형식</td>
</tr>
<tr>
<td>`dpkg`</td>
<td>`.deb` 파일을 직접 설치/삭제하는 저수준 도구</td>
</tr>
<tr>
<td>`apt`</td>
<td>저장소에서 패키지를 찾아 의존성까지 해결하는 고수준 패키지 관리자</td>
</tr>
</table>
### 예시
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-9.png)
→ apt로 curl 패키지 검색
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-10.png)
→ curl 패키지 설치
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-11.png)
→ curl 패키지 검증
## 프로그래밍 언어별 패키지 관리자
### Node.js
- npm등
### Python
- pip, pyPM 등
# (6) 컨테이너
- 프로그램을 실행하기 위한 **격리된 실행 환경**
- 도커 덕분에 컨테이너는 2014년부터 주류로 편입
- 컨테이너 이미지를 통해 패키징 정의, 인간 친화적 UI를 통해 기존 개념 혁신
- 불변성 특징 → 설정 한 번 구성되면 사용 중 변경 불가
### OCI(Open Container Initiative)
- 컨테이너 이미지와 런타임의 표준 규격
- 런타임 사양, 이미지 형식 사양, 배포 사용이 3가지 핵심 사양

## 리눅스 네임스페이스
- 프로세스가 리소스에 대한 로컬 뷰를 가질 수 있도록 도입
- 즉, **리소스 가시성**에 관한 것
### 네임스페이스 생성 관련 시스템 콜
- CLONE_NEWNS, CLONE_NEWUTS 등의 플래그 사용 가능
#### clone
- 실행 컨텍스트의 일부를 부모 프로세스와 공유할 수 있는 자식 프로세스를 만드는 데 사용
#### unshare
- 기존 프로세스에서 공유된 실행 컨텍스트를 제거하는 데 사용
#### setns
- 기존 프로세스를 기존 네임스페이스에 결합하는 데 사용
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-12.png)
→ 현재 시스템에 존재하는 리눅스 namespace 목록 조회

## 리눅스 cgroup
- 프로세스 그룹을 구성하는 메커니즘
- 계층 구조와 함께 쓰면 시스템 리소스 사용 제어 가능
- 리소스 사용 추적도 가능
### cgroup v1
- 필요에 따라 새로운 cgroup과 컨트롤러 추가가 가능한 애드혹 접근 방식 사용 가능
- 프로세스별로 구분
- e.g.) CFS 대역폭 제어, 메모리 리소스 컨트롤러
### cgroup v2
- v1의 교훈을 바탕으로 완전히 다시 작성한 cgroupm
- 단일 계층 구조, 모든 컨트롤러가 동일한 방식으로 관리
- e.g.) CPU 컨트롤러, 메모리 컨트롤러
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-13.png)
→ 리눅스 시스템의 모든 v2 cgroup 계층 조회
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-14.png)
→ cgroup별 자원 사용량 실시간 조회

## CoW 파일 시스템
- 빌드 시 사용, 애플리케이션과 모든 종속성을 배포 가능한 독립 파일 하나로 패키징
- 주로 bind mount와 함께 사용 → 종속성이 서로 다른 콘텐츠를 효율적으로 계층화

## 도커
- 프로그램-종속성을 쉽게 패키징 → 데스크톱\~클라우드 다양한 환경에서 실행 가능
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-15.png)
- 컨테이너 이미지
- 실질 디렉터리인 json 파일과 계층의 메타데이터를 포함하는 압축된 아카이브 파일
- 도커 데몬은 필요에 따라 컨테이너 레지스트리에서 컨테이너 이미지 가져옴
- 런타임 아티팩트로서 컨테이너 (그림의 앱 A, B, C)
- 필요에 따라 시작, 중지, 종료, 제거 가능
- 도커 데몬과의 상호 작용은 CLI 도구(docker) 사용
- 이 도구는 데몬에 명령을 보내고 데몬은 컨테이너 빌드, 실행 같은 작업 차례로 실행
### 컨테이너 이미지
- 컨테이너 이미지를 빌드 지침 정의 시, 도커파일이라 불리는 일반 텍스트 파일 형식 사용
- 기본 이미지, 메타 데이터, 인자/환경변수, 빌드타임/런타임 사양 등의 지시문이 도커 파일에 포함
### 실행 컨테이너
- 대화형 입력 or 데몬으로 실행 가능
### 예제: 컨테이너화한 greeter
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-16.png)
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-17.png)
![모던 리눅스 6. 애플리케이션·패키지·컨테이너 이미지](/SeonggukPark/images/notion/notes/modern-linux/06-apps-packages-containers-18.png)
## 다른 컨테이너 도구
- 포드맨, 빌다 같이 데몬 없는 도구를 사용해도 OCI 컨테이너 이미지를 빌드, 실행 가능
# (7) 최신 패키지 관리자
- 대부분 컨테이너를 사용, 교차 배포나 대상이 특정된 환경을 목표로 함
- e.g.) 리눅스 데스크톱 사용자가 GUI 앱을 쉽게 설치할 수 있게 하는 경우

# (8) 정리

