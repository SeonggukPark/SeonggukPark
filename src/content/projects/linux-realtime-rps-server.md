---
title: "Linux 멀티스레드 TCP 서버"
description: "운영체제 강의에서 Linux 기반 TCP 다중 클라이언트 서버 구현 프로젝트를 수행 (개인 프로젝트)"
cardPoints:
  - "Linux 환경에서 C 기반 멀티스레드 TCP 서버 구현"
period: "2023.03 — 2023.06"
categories: ["Linux"]
role: "클라이언스/서버 구현"
tags: ["C", "Linux"]
featured: false
repository: "https://github.com/SeonggukPark/Linux_TCP_Server"
outcomes:
  - "TCP 기반 서버와 두 클라이언트의 동시 접속·반복 대전 구현"
  - "클라이언트별 통신 스레드와 판정 전용 스레드로 역할 분리"
  - "두 개의 System V 메시지 큐를 이용한 입력·결과 전달"
  - "mutex 임계 구역으로 공유 접속 카운터 갱신 보호"
relatedNotes: []
---

## 프로젝트 개요

운영체제 과목의 소켓·스레드·동기화·IPC 개념을 하나의 동작하는 프로그램으로 연결한 프로젝트입니다. Ubuntu 22.04.2 LTS에서 C로 TCP 서버와 두 개의 클라이언트를 구현했습니다. 각 사용자가 `R`, `S`, `P` 중 하나를 입력하면 서버가 두 선택을 모아 `win`, `lose`, `draw` 결과를 각 클라이언트에 반환하며, 연결을 유지한 채 다음 라운드를 반복합니다.

과제의 핵심 요구사항은 Socket API, pthread, mutex, 메시지 큐와 두 명의 참가자를 모두 활용하는 것이었습니다. 네트워크 입출력과 게임 판정을 서로 다른 스레드로 분리하고 System V 메시지 큐로 연결해, 단순한 소켓 예제를 넘어 동시성과 프로세스 간 통신을 함께 다뤘습니다.

<figure class="project-figure project-figure-diagram">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/system-flow.png" alt="Client 1과 Client 2가 TCP 소켓으로 서버에 접속하고 서버 스레드와 판정 스레드를 거쳐 결과를 받는 전체 동작 흐름도" loading="lazy" />
  <figcaption>두 클라이언트의 입력이 서버 통신 스레드와 판정 스레드를 거쳐 다시 결과로 반환되는 전체 흐름</figcaption>
</figure>

## 설계 목표

- 클라이언트 두 대의 TCP 연결을 동시에 유지하고 각 연결을 독립적으로 처리
- 소켓 통신과 게임 판정을 분리해 스레드별 책임을 명확하게 구성
- 공유 접속 상태는 mutex로 보호하고 게임 입력·결과는 메시지 큐로 전달
- 정상 대전뿐 아니라 연결 실패, 서버 재시작, 종료 입력 등 실패 흐름까지 직접 실행해 확인

## 시스템 구성과 데이터 흐름

1. 서버가 기본 TCP 포트 `5193`에 소켓을 생성하고 `bind()`·`listen()` 후 접속을 기다립니다.
2. 서버 시작 시 게임 판정을 담당하는 `evalthread`와 키 `1234`, `1235`의 메시지 큐 두 개를 준비합니다.
3. `accept()`가 연결을 수락할 때마다 해당 클라이언트 소켓을 담당하는 `serverthread`를 생성합니다.
4. 각 `serverthread`는 TCP로 받은 선택값을 자신의 메시지 큐에 넣고 판정 결과를 기다립니다.
5. `evalthread`는 두 큐의 입력을 `evalgame()`에 전달해 승패를 계산하고 각 큐로 결과를 돌려보냅니다.
6. `serverthread`는 결과를 클라이언트에 전송하고 다음 라운드의 입력을 다시 기다립니다.

이 구조에서 TCP 소켓은 **클라이언트와 서버 사이의 통신 채널**, 메시지 큐는 **서버 내부 실행 흐름 사이의 전달 채널** 역할을 합니다. 외부 네트워크 I/O와 내부 게임 판정이 서로 다른 경계로 나뉘기 때문에 각 단계의 책임과 대기 지점을 확인하기 쉬웠습니다.

## 핵심 구현

### 역할을 분리한 스레드 구성

`serverthread(void* parm)`은 한 클라이언트와 1:1로 연결되어 입력 수신과 결과 송신을 담당합니다. `evalthread()`는 두 클라이언트의 선택이 모두 도착할 때까지 기다린 뒤 `evalgame(char a, char b)`를 호출합니다. 게임 판정 함수는 무승부 `0`, A 승리 `1`, B 승리 `2`를 반환하고, 각 통신 스레드가 이를 사용자 관점의 결과 문자열로 변환해 전송합니다.

<figure class="project-figure project-figure-code">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/thread-functions.png" alt="serverthread, evalthread, evalgame 함수 원형을 정의한 C 코드" loading="lazy" />
  <figcaption>통신 처리, 판정 처리, 승패 계산을 각각 분리한 핵심 함수 인터페이스</figcaption>
</figure>

### TCP Socket 기반 실시간 통신

- `socket(PF_INET, SOCK_STREAM, ...)`으로 TCP 소켓 생성
- 서버의 `bind()`·`listen()`·`accept()`와 클라이언트의 `connect()` 흐름 구현
- `send()`·`recv()`로 선택값과 게임 결과를 양방향 전달
- 클라이언트 접속 시 서버 측 식별값을 전달하고 접속 순서에 따라 A와 B 슬롯 할당
- 연결을 닫지 않고 여러 라운드의 입력과 결과를 반복 처리

### pthread와 mutex를 이용한 동시성 제어

- 접속한 클라이언트마다 전용 `serverthread`를 생성해 연결별 네트워크 처리를 분리
- 판정 전용 `evalthread`를 두어 소켓 I/O와 게임 규칙의 책임을 분리
- 공유 변수 `visits` 갱신을 `pthread_mutex_lock()`과 `pthread_mutex_unlock()` 사이의 임계 구역으로 보호
- 잠금 범위를 접속 카운터 갱신으로 제한해 소켓 입출력 전체가 불필요하게 직렬화되지 않도록 구성

### System V Message Queue 기반 IPC

- `msgget()`으로 두 메시지 큐를 생성하고 Client A·B의 통신 스레드와 각각 연결
- `msgsnd()`·`msgrcv()`로 `serverthread`와 `evalthread` 사이의 선택값과 판정 결과 전달
- 네트워크 스레드는 큐에 입력을 보낸 뒤 자신의 결과를 기다리고, 판정 스레드는 두 입력을 모두 받은 후 각 큐에 응답
- 종료 과정에서 `msgctl(..., IPC_RMID, ...)`로 큐를 제거해야 한다는 자원 수명주기까지 확인

## 실행 과정

### 1. 서버와 IPC 자원 초기화

서버를 먼저 실행해 포트와 소켓, `evalthread`, 두 개의 메시지 큐가 정상적으로 준비되는지 확인했습니다. 이 시점부터 서버는 `accept()`에서 첫 연결을 기다립니다.

<figure class="project-figure project-figure-terminal">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/server-initialized.jpg" alt="Ubuntu에서 서버가 실행되어 접속 대기, 판정 스레드 실행, 두 메시지 큐 연결을 출력한 터미널" loading="lazy" />
  <figcaption>서버 시작 직후: TCP 접속 대기, 판정 스레드 실행, 두 메시지 큐 연결 완료</figcaption>
</figure>

### 2. 두 클라이언트 연결

Client A와 B를 차례로 실행했습니다. 서버는 각 `connect()` 요청을 수락하고 전용 `serverthread`를 만든 뒤, 두 연결이 모두 준비되면 `2 clients connected` 상태를 출력합니다.

<figure class="project-figure project-figure-terminal">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/two-clients-connected.jpg" alt="서버 터미널과 두 클라이언트 터미널이 함께 실행되고 두 클라이언트 연결 완료가 표시된 화면" loading="lazy" />
  <figcaption>서버 한 대와 클라이언트 두 대가 연결되고 각 연결에 서버 측 식별값이 할당된 상태</figcaption>
</figure>

### 3. 첫 입력 대기와 메시지 전달

Client A가 `R`을 입력하면 담당 통신 스레드가 값을 메시지 큐로 전달합니다. 판정 스레드는 A의 값을 보관한 채 Client B의 선택이 도착할 때까지 대기합니다. 이 화면을 통해 TCP 수신 이후 메시지 큐로 제어가 넘어가는 시점을 확인했습니다.

<figure class="project-figure project-figure-terminal">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/client-a-waiting.jpg" alt="Client A가 R을 입력하고 서버 판정 스레드가 Client B의 입력을 기다리는 터미널 화면" loading="lazy" />
  <figcaption>Client A의 입력을 받은 뒤 판정 스레드가 두 번째 선택을 기다리는 상태</figcaption>
</figure>

### 4. 판정 결과 반환

Client B가 `S`를 입력하면 `evalgame()`이 A 승리를 계산합니다. 서버 로그에는 두 입력과 판정값이 남고, Client A에는 `win`, Client B에는 `lose`가 반환됩니다.

<figure class="project-figure project-figure-terminal">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/round-result.jpg" alt="Client A의 R과 Client B의 S를 판정하여 각각 win과 lose를 반환한 서버 및 클라이언트 터미널" loading="lazy" />
  <figcaption>두 입력을 모아 판정한 뒤 각 클라이언트 관점의 결과를 반환한 한 라운드</figcaption>
</figure>

### 5. 연결을 유지한 반복 대전

한 라운드가 끝나도 소켓을 닫지 않고 입력 수신 단계로 돌아갑니다. 여러 조합을 연속으로 입력해 승리·패배·무승부가 반복해서 계산되는지 확인했습니다.

<figure class="project-figure project-figure-terminal">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/repeated-rounds.jpg" alt="두 클라이언트가 여러 차례 R S P를 입력하고 win lose draw 결과를 반복해서 받은 터미널 화면" loading="lazy" />
  <figcaption>하나의 TCP 연결에서 여러 라운드의 승리·패배·무승부를 연속 검증한 결과</figcaption>
</figure>

## 실패 시나리오에서 확인한 문제

정상 동작만 확인하지 않고 실행 순서와 종료 방식에 따른 실패도 재현했습니다. 실패 화면은 이후 개선 항목을 구체화하는 근거로 활용했습니다.

### 서버보다 클라이언트를 먼저 실행한 경우

연결을 받을 서버가 없는 상태에서 클라이언트를 실행하면 `connect failed`로 종료됩니다. 재시도나 지수 백오프가 없으므로 서버 시작 순서에 의존한다는 점을 확인했습니다.

<figure class="project-figure project-figure-terminal-crop">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/client-before-server.png" alt="서버 실행 전에 클라이언트를 실행해 connect failed가 출력된 터미널" loading="lazy" />
  <figcaption>서버가 준비되지 않은 경우의 연결 실패</figcaption>
</figure>

### 서버 종료 직후 다시 실행한 경우

강제 종료 직후 같은 포트로 서버를 다시 실행하면 `bind failed`가 발생했습니다. 소켓 옵션과 정상 종료 처리의 필요성을 확인한 사례입니다.

<figure class="project-figure project-figure-terminal-crop">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/server-restart-bind-failure.png" alt="서버 종료 직후 재실행하여 bind failed가 출력된 터미널" loading="lazy" />
  <figcaption>포트 재사용 설정과 소켓 정리가 부족해 발생한 재시작 실패</figcaption>
</figure>

### 한 클라이언트만 종료한 경우

한 사용자가 `Q`로 먼저 종료하면 남은 통신 스레드와 판정 스레드가 서로 다른 자원 상태를 바라보며 메시지 큐 수신 오류가 발생했습니다. 클라이언트 연결, 스레드, 메시지 큐를 하나의 세션 수명주기로 정리해야 한다는 점을 확인했습니다.

<figure class="project-figure project-figure-terminal">
  <img src="/SeonggukPark/images/projects/linux-realtime-rps-server/quit-cleanup-failure.png" alt="한 클라이언트가 Q로 종료한 뒤 서버에서 메시지 큐 수신 오류가 발생한 터미널 화면" loading="lazy" />
  <figcaption>부분 종료 시 스레드와 메시지 큐 정리가 연동되지 않아 발생한 오류</figcaption>
</figure>

## 제약과 개선 방향

- **입력 순서 의존성**: `evalthread`가 A 큐를 먼저 기다려 Client A가 B보다 먼저 입력해야 합니다. 조건 변수, `poll()` 또는 이벤트 기반 상태 관리로 입력 순서를 분리할 수 있습니다.
- **고정된 사용자 슬롯**: 두 개의 큐와 `visits` 값으로 사용자를 구분해 세 번째 접속과 재접속을 처리하기 어렵습니다. 연결별 세션 객체와 명시적인 슬롯 관리가 필요합니다.
- **불완전한 종료 처리**: 한 사용자가 종료하면 상대 연결, 통신 스레드, 판정 대기와 메시지 큐를 함께 정리하는 종료 프로토콜이 필요합니다.
- **서버 재시작 실패**: 정상적인 `close()` 흐름과 `SO_REUSEADDR` 설정을 추가해 종료 직후에도 같은 포트에 다시 바인딩할 수 있어야 합니다.
- **오류 복구 부족**: 연결 실패 시 즉시 종료하는 대신 재시도 정책과 사용자 안내를 제공할 수 있습니다.

## 결과와 배운 점

- TCP 서버와 두 클라이언트를 연결해 여러 라운드의 실시간 가위바위보 대전을 완성했습니다.
- 클라이언트별 통신 스레드, 판정 스레드와 메시지 큐를 분리하면서 네트워크 I/O와 동시성 제어의 경계를 설계했습니다.
- mutex 임계 구역으로 공유 상태를 보호하고, System V 메시지 큐로 실행 흐름 사이의 입력·결과 전달을 구현했습니다.
- 정상 시나리오와 실패 시나리오를 함께 시험하면서 서버 프로그램에서는 기능 구현뿐 아니라 연결·스레드·IPC 자원의 수명주기 관리가 중요하다는 점을 배웠습니다.
