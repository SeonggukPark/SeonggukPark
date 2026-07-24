---
title: "소프트웨어공학 11. 구조적 분석과 설계"
description: "Notion MCP에서 직접 가져온 소프트웨어공학 11. 구조적 분석과 설계 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Software Engineering", "System Analysis"]
draft: true
source: "https://app.notion.com/p/33b6b9674ad8801689fdfe4782e979b1"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

## 11-1. 구조적 분석

[Notion 원본](https://app.notion.com/p/3486b9674ad880aeb8bcc8fd2860c73c)

### (1) 구조적 분석의 개요
- 구조적 프로그래밍으로부터 구조적 분석/설계로 확대 적용하려는 기법
### (2) 구조적 분석의 정의
- 그림 중심의 시스템 분석용 도구인 자료 흐름도, 자료 사전, 소단위 명세서를 이용하여 정형화된 분석 절차에 따라 사용자의 요구사항을 파악하고 문서화하는 분석 기법
- 하향식 기능 분해 기법 사용 
→ 시스템 명세서에서 구현할 시스템을 하향식으로 분할하여 표현한 모형 작성
### (3) 구조적 분석 모형화 도구
- 서술형, 프로토타입, 다양한 도형적 모형등 존재
- 여기서는 Paper model들만 설명
#### 특성
- 이해하기 쉽도록 그림 중심 도구, 서술적 표현은 보조적 방법
- Top-Down으로 세분화되는 형태
##### \[1\] 도형적 모형
- 시스템 구성부분 간의 인터페이스를 확인하기 위해 도형 사용
- 그 외의 세부 사항은 자료 사전, 소단위 명세서 등 서술식 문서 사용 (보조 자료)
##### \[2\] 하향식 분할 모형
- 시스템 각 구성 부분을 독자적으로 표시하고 한 부분에서 다른 부분으로 간단히 연결할 수 있어야
- 최상위 단계에서 하위 단계까지 쉽게 확인 가능한 메커니즘을 제공해야 함
##### \[3\] 변경이 쉬운 모형
- 시스템 자체가 변화한다면 모형을 최신 상태로 유지하기 위해서 모형 자체도 변경되어야 함
##### \[4\] 최소 중복 모형
- 모형이 포함하는 중복 사항이 많아질수록, 그것을 유지보수하는건 더 어려워짐
##### \[5\] 투명적 모형
- 모형은 이해하기 쉬워야 하고 시스템 자체를 이해하도록 해야함
- 시스템의 한 표현을 보고 있다는 느낌을 줘서는 안됨
##### \[6\] 다양한 모형
- 여러 부류의 사용자들을 만족시키려면 다양한 모형화 도구가 필요

### (4) 구조적 분석의 주요 도구
![11-1. 구조적 분석 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-01-1.png)
### (5) 구조적 분석의 절차
![11-1. 구조적 분석 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-01-2.png)
![11-1. 구조적 분석 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-01-3.png)

---

## 11-2. 자료흐름도

[Notion 원본](https://app.notion.com/p/3486b9674ad88087a81fe831c98b6e44)

### (1) 자료 흐름도의 기본 개념
- 데이터가 소프트웨어 내의 각 프로세스를 따라 진행되면서 변환되는 과정을 나타낸 그림
- 시스템 모형화 도구로서 가장 보편적으로 사용
- 데이터에 비해 기능이 매우 복잡하고 중요할 경우 유용
- 데이터 양이 커질수록 구조 변경이 유지보수에 큰 영향
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-1.png)
##### \[1\] 자료 흐름도의 특성
- 하향식 분석 도구
- 다차원적 도구 
- 데이터의 흐름에 중심을 두는 분석용 도구
- 제어의 흐름은 중요하지 않음
##### \[2\] 자료 흐름도 작성 효과
- 사용자 업무 및 요구사항 문서화 용이

### (2) 자료 흐름도의 구성 요소
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-2.png)
##### \[1\] 자료 흐름(Data Flow)
- 단말이나 프로세스 사이에 전달되는 데이터의 흐름
- 서로 다른 Flow에는 동일한 이름 부여 안함
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-3.png)
##### \[2\] 프로세스(Process)
- 타원과 그 안의 이름으로 표시
- 안의 이름은 프로세스가 수행하는 일 또는 프로세스를 수행하는 행위자 기술
- 프로세스 자체적으로 데이터 생성은 불가 (입력 데이터 필요)
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-4.png)
##### \[3\] 자료 저장소(Data Store)
- 두 개의 평행선 안에 자료 저장소의 명칭 부여하거나 열린 사각형으로 표시
- 단순 데이터의 저장 의미 (데이터 변동 표시 X)
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-5.png)
##### \[4\] 단말(Terminal)
- Source: 데이터가 들어오는 곳
- Sink: 데이터가 이용되는 곳
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-6.png)

### (3) 자료 흐름도의 작성 원칙
- Context Diagram 포함하여 수준 3까지 분할되면 적당
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-7.png)

##### \[1\] 자료 보존의 원칙(Data Conservation Rule)
- 데이터 흐름상 필요하거나 제공되어야 할 단말 정의
- 프로세스의 출력 데이터 흐름은 반드시 입력 데이터 흐름을 이용해 생성된 것이어야 함
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-8.png)
##### \[2\] 최소 자료 입력의 원칙(Parsimony Rule)
- 어떤 프로세스가 출력 데이터 흐름을 산출하는데 반드시 필요로 하는 최소 데이터 흐름만 입력
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-9.png)
##### \[3\] 독립성의 원칙(Independence Rule)
- 각자의 처리는 오직 자신의 입력, 출력 자체에 대해서만 알면 됨
→ 그들이 어디서 와서 어디로 가는지 알 필요 없음
→ 유지보수 용이하게 함
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-10.png)
##### \[4\] 지속성의 원칙(Persistence Rule)
- 프로세스는 입력 데이터 흐름이 들어오기만 하면 항상 수행할 준비를 갖추고 있어야 함
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-11.png)
##### \[5\] 순차 처리의 원칙(Ordering Rule)
- 프로세스 입력 자료 흐름의 순서는 출력되는 자료 흐름에서도 지켜져야 한다
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-12.png)
##### \[6\] 영구성의 원칙(Permanence Rule)
- 자료 저장소의 자료는 입력으로 사용해도 제거되지 않고 항상 남아있다
##### \[7\] 자료 변환의 원칙(Nature of Change)
###### 데이터 본질의 변환
- 입력 데이터 흐름에 편집, 계산하여 출력 데이터 흐름을 산출
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-13.png)
###### 데이터 합성의 변환
- 입력 데이터의 본질을 변화시키지 않으면서 출력 변환 발생
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-14.png)
###### 데이터 관점의 변환
- 데이터에 대해 실제 변경은 하지 않고 입력 데이터 흐름은 동일하게 출력 데이터 흐름으로 나타남
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-15.png)
###### 데이터 구성의 변환
- 출력데이터가 입력데이터와 동일하지만, 데이터 구성 형태가 변환
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-16.png)

### (4) 자료 흐름도의 단계화
- 자료 흐름도의 규모가 너무 클 경우 시스템을 서브 시스템들로 분할
- 흐름도를 단순한 기능으로 그릴 수 있는 단계까지 분할
- 단계화된 자료 흐름도는 반드시 다른 단계와 등가 관계를 유지하는 일관성을 가져야 함
##### \[1\] 체제 배경도(Context Diagram)
- 개발하고자 하는 시스템과 단말 사이의 자료 흐름 명시
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-17.png)
##### \[2\] 중간 단계 자료 흐름도(Middle level DFD)
- 개괄적인 자료 흐름 표현
- 흐름도 내의 하나 이상의 처리가 하위 단계로 다시 분할되는 흐름도
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-18.png)
##### \[3\] 최하위 단계 자료 흐름도(Low level DFD)
- 더 이상 하위 단계의 흐름도로 분할되지 않는 자료 흐름도
- 모든 프로세스들이 소단위 명세서를 갖는 기본 기능
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-19.png)

### (5) 자료 흐름도의 작성 방법
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-20.png)
##### \[1\] 자료 흐름 중심 접근법
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-21.png)
##### \[2\] 처리중심 접근 방법
![11-2. 자료흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-02-22.png)

### (6) 자료 흐름도의 평가 및 개선
##### \[1\] 정확성 검토
- 자료 흐름도의 명칭 검토
- 중복 처리
- 자료 흐름의 균형 법칙
- 자료 보존의 법칙
- 자료 저장소의 검토
- 개념적 오류 제거
##### \[2\] 유용성 검토
- 접속 관계의 복잡성 여부
- 처리 명칭의 정확성
- 흐름에 대한 정확한 명칭 부여
- 시스템의 균형있는 분할 여부

---

## 11-3. 자료사전

[Notion 원본](https://app.notion.com/p/3486b9674ad88033bcade13820d6b1d7)

### (1) 자료 사전의 기본 개념
- 자료 흐름도에 표현된 자료 저장소를 구체적으로 명시하기 위한 것
- 자료 흐름도와 상호 보완적 관계
##### 정의 대상
- 자료 흐름을 구성하는 자료 항목
- 자료 저장소를 구성하는 자료 항목
- 자료에 대한 의미
- 자료 원소의 단위와 값
### (2) 자료 사전의 표기법
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-1.png)
##### \[1\] 정의 기호 사용 방법
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-2.png)
##### \[2\] 반복 기호 사용 방법
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-3.png)
##### \[3\] 선택 기호 사용 방법
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-4.png)

- 전체 기호 사용 예시
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-5.png)

### (3) 자료 사전의 작성 원칙
##### \[1\] 자료의 의미 기술
##### \[2\] 자료 구성 항목의 기술
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-6.png)
##### \[3\] 동의어(Alias)의 기술 예
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-7.png)

### (4) 소단위 명세서
##### \[1\] 소단위 명세서의 개념
- 자료 흐름도의 최소 단위 처리의 업무 처리 과정을 기술
- 입력 자료 흐름을 출력 자료 흐름으로 변환하기 위해 어떤 일들이 수행되는지 정의
- 구조적 언어, 선후 조건문, 의사결정표 등이 주로 사용
##### \[2\] 소단위 명세서의 역할
- 자료 흐름도에 나타난 모든 최소 단위 처리의 입력 흐름을 출력 흐름으로 변환하는 과정을 기술
- 다양한 사람들이 읽고 이해할 수 있어야 함
- 설계와 구현 사항을 임의로 결정하지 않아야 함
##### \[3\] 소단위 명세서의 작성 도구
###### 구조적 언어
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-8.png)

###### Decision Tree & Decision Table
- 비절차적 시스템 모형화 도구
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-9.png)
![11-3. 자료사전 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-03-10.png)

---

## 11-4. 구조적 설계

[Notion 원본](https://app.notion.com/p/3486b9674ad8819bb739d8e065ccf3d4)

### (1) 구조적 설계의 정의
![11-4. 구조적 설계 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-04-1.png)

#### 1) 구조적 설계 전략
##### \[1\] 변환 분석(Transform Analysis)
- 균형 잡힌 시스템 설계 위한 방법
- 분석 단계에서 작성한 DFD를 데이터 흐름 중심 변환점을 기준으로 설계 단계의 구조도로 변환
##### \[2\] 거래 분석(Transaction Analysis)
- 자료 흐름도에서 거래에 해당하는 부분을 찾아 이 거래 중심 자료 흐름도를 거래 중심 구조도로 변환하는 일련의 과정
#### 2) 구조적 설계 핵심
##### \[1\] 설계전략
- 변환 분석
- 거래 분석
##### \[2\] 설계 평가 지침
- 모듈 결합도
- 모듈 응집도
##### \[3\] 문서화 도구
- 설계 구조도
- 모듈 명세서
##### \[4\] 구조화 설계의 도구
- 설계 구조도
![11-4. 구조적 설계 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-04-2.png)
- 모듈 명세서
#### 3) 구조적 설계 절차
![11-4. 구조적 설계 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-04-3.png)
#### 4) 설계의 평가 지침
- 결합도(Coupling): 두 모듈간 의존도를 측정하는 척도
- 응집도(Cohesion): 시스템 설계 시 산출물의 우수성을 평가하는 척도

### (2) 모듈화(Modularization)
- 전체 프로그램을 기능 단위로 분해
→ 프로그램 복잡도 경감
→ 개발 시 소프트웨어 품질 증대
- 모듈: 하나 또는 그 이상의 논리적 기능을 수행하는 컴퓨터 지시어들의 집합
##### \[1\] 구조 도표(Structured Chart)
- 분할된 모듈을 계층 구조로 조직화
- 모듈들의 상호 의사소통 표시
- 프로그램 구조를 문서화한 그래픽 도구
![11-4. 구조적 설계 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-04-4.png)
##### \[2\] 모듈 설계
- 각 구조 도표의 모듈을 명세화함으로써 프로그래머에게 구현에 필요한 정보를 주는 설계 활동
##### 기본적 제어 구조
- 순차 구조, 선택 구조, 반복 구조
##### \[3\] 모듈 설계 시 문서화 도구
- 의사 코드 (Pseudo Code)
- N-S 차트

### (3) 모둘 결합도(Module Coupling)
#### 1) 결합도(Coupling)의 개념
- 모듈 간의 상호 의존의 정도
- **낮을 수록 바람직**

#### ![11-4. 구조적 설계 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-04-5.png)
##### \[1\] 내용 결합도 (Content Coupling)
- 한 모듈이 다른 모듈 내의 명령이나 내부 데이터 값을 참조하거나 변경시키는 경우
##### \[2\] 공통 결합도 (Common Coupling)
- 공유 영역에 정의된 자료를 몇 개의 모듈이 공통으로 사용할 때 관계
##### \[3\] 외부 결합도 (External Coupling)
- 하나의 모듈에서 광역 데이터 아이템을 선언하고 다른 모듈들이 이를 참조하는 형태
##### \[4\] 제어 결합도 (Control Coupling)
- 어떤 모듈이 다른 모듈을 호출하는 경우, 제어 정보를 넘겨주는 경우
##### \[5\] 검인 결합도 (Stamp Coupling)
- 한 그룹의 모듈들이 관련된 데이터의 합 집합인 비광역 데이터 구조를 사용
##### \[6\] 자료 결합도 (Data Coupling)
- 어떤 모듈이 다른 모듈을 호출할 경우 자료를 파라미터 혹은 인수로 넘겨주면 상대 모듈은 이 자료를 처리하여 그 결과를 자료로 돌려줄 때 이 두 모듈을 자료 결합적이라 함
### (4) 모듈 응집도 (Module Cohesion)
#### 1) 모듈 응집도의 개념
- 한 모듈 내에 있는 구성 요소의 기능적 관련성을 평가하는 기준
#### 2) 모듈 응집도의 종류
![11-4. 구조적 설계 이미지](/SeonggukPark/images/notion/notes/software-engineering/11-04-6.png)
##### \[1\] 우연적 응집도(Coincidental Cohesion)
- 모듈 내부의 각 요소들이 서로 관계없는 것들이 모인 경우
##### \[2\] 논리적 응집도(Logical Cohesion)
- 서로 관련 있는 요소를 모아 하나의 모듈로 한 경우
##### \[3\] 시간적 응집도(Temporal Cohesion)
- 어느 특정 시간에 처리되는 몇 개의 기능을 모아 한 모듈로 한 경우
##### \[4\] 절차적 응집도(Procedual Cohesion)
- 모듈 내의 단위 활동들이 서로 다르거나 관련 없는 기능을 하고 있으나, 이러한 단위 활동들이 서로 다른 요소들을 제어함으로써 일정한 수서로 수행되는 경우
##### \[5\] 통신적 응집도(Communication Cohesion)
- 절차적 응집성에 한 가지 기능을 추가한 것
##### \[6\] 순차적 응집도(Sequential Cohesion)
- 실행되는 순서가 서로 밀접한 관계를 갖는 기능을 모아 한 모듈로 구성한 것
##### \[7\] 기능적 응집도(Functional Cohesion)
- 모듈 내부의 모든 기능 요소들이 단일 문제와 연관되어 수행되는 경우

### (5) 구조적 설계 후 작업
##### \[1\] 패키징(Packaging)
- 시스템의 효율적인 수행을 위해 하드웨어 특성을 고려함과 동시에 논리적 설계 결과로 얻어진 시스템을 구현 단위로 분할하는 작업
##### \[2\] 패키징 수행 단계
- 각 작업, 작업 단계, 프로그램 및 적재 단위
##### \[3\] 시스템 구현 및 최적화
- 꾸밈
### (6) 구조적 프로그래밍
##### \[1\] 구조적 프로그래밍의 목적
- 프로그램 신뢰성, 해독성, 생산성 향상
- 프로그램 복잡도, 유지관리 최소화
- 프로그램 기법의 효율성 정립
##### \[2\] 구조적 프로그래밍의 특징
- 계층적 형식에 맞는 코딩과 제한된 코딩구조(순차-선택-반복)만을 사용
- 작성된 구조의 순서에 맞게 실행
##### \[3\] 구조적 방법론의 주장자
###### 다익스트라 설계 방법
- GOTO 배제, 저급한 제어 구조 배제
- 프로그램의 단일 입구, 단일 출구
- 동적 처리와 정적 처리의 격차 좁혀 구조 명확화
###### Jackson 설계 방법
- 프로그램이 다루는 입출력 데이터 구조 설계 → 프로그램 제어 구조 유도
- 입력-출력 데이터 구조에 관한 설계 내용으로 대응 관계 형성
- 기본, 순차, 선택, 반복 4가지 구조 사용
###### Yourdon 설계 방법
- DFD 방법론 제안
- 외부 입출력, 처리과정, 데이터 흐름 방향, 데이터 저장소로 표현
- 순차, 선택, 반복 구조 사용
- 데이터 흐름 중심의 처리 주장
###### Warnier-Orr 설계 방법
- HIPO 또는 구조화 도표에 대한 대체 방법으로 데이터 구조적 시스템 개발에 사용
- 시스템의 출력을 근거로 데이터 구조 결정 → 프로그램 구조 결정
- 선택과 반복 구조만으로 프로그램 표현
##### \[4\] 구조적 프로그래밍의 의미

