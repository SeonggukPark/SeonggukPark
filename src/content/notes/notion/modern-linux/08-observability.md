---
title: "모던 리눅스 8. 관측가능성"
description: "Notion MCP에서 직접 가져온 모던 리눅스 8. 관측가능성 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Linux", "System Software"]
draft: true
source: "https://app.notion.com/p/33a6b9674ad880b5b0f5da309ee63caa"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-1.png)
# (1) 기본 개요
## 관측가능성 전략
### 우다(OODA) 루프
- 관측된 데이터를 기반으로 가설 테스트, 이에 따라 조치를 취하는 구조화된 방법
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-2.png)
- e.g.) 애플리케이션이 느릴 경우
→ 느려진 원인으로 여러 후보 지목 (메모리 부족, CPU 주기 부족, 네트워크 I/O 부족 등)
→ 각 리소스 소비 측정
→ 각 리소스의 할당을 변경해가며 결과 측정 (e.g. 앱에 더 많은 RAM만 제공해보고 성능 향상 측정)
## 용어
### 관측가능성
- 외부 정보를 측정하여 시스템의 내부 상태 평가하는 것
- e.g.) 시스템이 느려 지는 현상 → 주 메모리 양 측정 → 메모리 독차지하는 앱을 종료
### 시그널 유형
- 기호적 수단, 숫자 값, 이들의 조합을 통해 시스템 상태에 대한 정보를 보여주고 내보내는 다양한 방식
### 소스
- 시그널을 생성 하는 곳
- 리눅스 OS, 애플리케이션 등
### 목적지
- 시그널을 소비, 저장, 추가적으로 처리하는 곳
- 사용자 인터페이스 (GUI, TUI, CLI)를 노출하는 목적지를 프론트엔드라고 함
### 텔레메트리
- 소스에서 시그널을 추출하고 시그널을 목적지로 전송하는 프로세스
- 시그널을 수집/전처리 하는 에이전트를 사용하는 경우 多

## 시그널 유형
- 추가 처리나 해석을 위해 시스템 상태를 전달하는 방법
- 텍스트 페이로드(사람에 적합), 숫자 페이로드(기계에 적합)로 구분
### 로그
- 거의 모든 시스템이 생성하는 기본 시그널 유형
- 사람이 사용할 수 있는 텍스트 페이로드가 있는 개별 이벤트
- 일반적으로 타임스탬프 지정
- 구조화된 로깅 = 로그가 json을 이용해 구성된다는 의미

### 지표
- 샘플링된 숫자 데이터 포인트
- 시게열 형성
- 일반적으로 raw 값을 직접 쓰기 보다는 일종의 집계, 그래픽 표현 사용
#### 카운터
- 올라갈 수 만 있는 값
- e.g.) 서비스에서 처리한 총 요청 수, 일정기간 인터페이스를 통해 전송된 바이트
#### 게이지
- 올라가거나 내려 가는 값
- e.g.) 현재 사용 가능한 전체 메인 메모리, 실행 중인 프로세스 수
#### 히스토그램
- 값의 분포를 보여주는 정교한 방법

### 추적
- 런타임 정보의 동적 모음으로서, 디버깅뿐만 아니라 성능 평가에서도 자주 사용

# (2) 로깅
### 로그의 구성
- 로그 항목, 메세지, 행의 모음
- 메타데이터, 컨텍스트
- 개별 로그 메세지를 해석하는 방법을 보여주는 형식

- 데이터 온도 : 데이터가 얼마나 자주, 빠르게 접근되어야 하는지를 온도에 비유
- 대부분의 로그는 레벨을 정의 (e.g. 개발: DEBUG, 정상 상태: INFO)
## Syslog
- 커널에서부터 데몬, 사용자 공간까지 이르는 다양한 소스의 로깅 표준
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-3.png)
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-4.png)
- 일반적으로 로그 관리 시 syslogd 바이너리 사용
## journalctl
- Syslog와 바이너리 형식을 사용하여 로그 저장
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-5.png)
→ 지난 3시간으로 범위 제한하여 로그 조회

# (3) 모니터링
- 다양한 이유로 시스템과 애플리케이션 지표를 캡쳐하는 것
- 보통 시간 경과에 따른 지표 추적, 조건에 의거한 알림 유형의 활동 많이 함
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-6.png)
→ uptime 명령을 통한 기본 시스템 지표 조회
→ load average : 최근 1분/5분/15분의 평균 부하(CPU 사용 or 사용을 기다리는 작업의 수 평균)
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-7.png)
→ free 명령을 통한 RAM과 Swap 사용량 조회
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-8.png)
→ 1초 마다 메모리 사용량을 더욱 정교하게 모니터링

## 디바이스 I/O와 네트워크 인터페이스
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-9.png)
→ iostat을 통한 I/O 디바이스 모니터링

![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-10.png)
→ 현재 시스템의 TCP/UDP 소켓 상태와 연결 정보 표시

![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-11.png)
→ TCP 포트 1\~1024를 사용 중인 프로세스 조회

- 이 외에도 sar, perf등 많은 모니터링 도구 존재
## 통합 성능 모니터
- 더 편리한 모니터링을 위한 통합 솔루션
- TUI와 함께 여러 리소스 유형, 대화식 정렬과 필터링, 실시간 업데이트 등 지원
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-12.png)
→ 널리 사용되는 top
- 이 외에도 htop, atop, below 등의 대안도 존재
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-13.png)
→ htop 실행 화면
## 계측
- 로그와 유사하게 지표를 내보내도록 코드를 만들기
- **자동계측 **/ **사용자화 계측** 두가지 존재
- StatsD, 루비, Node.js, Python 등 언어의 클라이언트 라이브러리와 함께 사용 가능
- StatsD는 쿠버네티스, IoT 같은 동적 환경에서 제약 → 풀 기반 or 스크래핑이라 하는 방식이 나음
- **풀 기반**: 전체 수집 구조
- **스크래핑**: 풀 기반 구조에서 실제로 지표를 가져오는 동작

# (4) 고급 관측가능성
## 추적과 프로파일링
- 리눅스 맥락에서 추적이란, 단일 시스템에서 시간 경과에 따른 프로세스 실행을 캡쳐 하는 것
- 프로파일링이란 프로그램이 실행되는 동안 자원을 어디에서 많이 사용했는지 통계적으로 분석하는 것
### 추적 소스
- 리눅스 커널
- 커널의 함수, 시스템 콜에 의해 추적 활성 가능
- e.g.) 커널 프로브, 커널 트레이스포인트
- 사용자 공간
- 애플리케이션 함수 호출을 통한 추적 소스 역할
- e.g.) 사용자 공간 프로브
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-14.png)
→ sudo perf top을 통한 분석
## 프로메테우스와 그라파나
- 노드 익스포터 : Prometheus가 수집할 수 있는 메트릭 형식으로 노출하는 프로그램
- 프로메테우스 : 노드 익스포터나 애플리케이션이 노출한 메트릭을 **주기적으로 수집하고, 시계열 데이터로 저장·조회하는 모니터링 시스템**
- 그라파나 : Prometheus 등에 저장된 데이터를 조회해 **그래프, 표, 게이지, 대시보드 형태로 시각화하는 도구**
### 실습
- 노드 익스포터를 통해 다양한 시스템 지표 노출
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-15.png)
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-16.png)

- 프로메테우스 구성 파일 생성 (prometheus.yml)
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-17.png)

- 컨테이너 마운트
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-18.png)

- 프로메테우스를 사용해 노트 익스포터를 성공적으로 스크랩
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-19.png)

- 그라파나 컨테이너 실행
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-20.png)

- 공용 도커 네트워크 생성
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-21.png)

- [localhost:3000](http://localhost:3000) 열고 username, pwd에 admin
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-22.png)

- Grafana에서 Prometheus를 데이터 소스로 등록 
- Connections → Data sources → Add new data source → prometheus → URL([http://prometheus:9090](http://prometheus:9090/)) 입력 후 Save
- Dashboards → New → Import dashboard → ID에 1860 입력 → Load
![모던 리눅스 8. 관측가능성 이미지](/SeonggukPark/images/notion/notes/modern-linux/08-observability-23.png)

# (5) 정리
- 진단에 사용되는 주요 시그널 유형은 로그(텍스트)와 지표(숫자)

