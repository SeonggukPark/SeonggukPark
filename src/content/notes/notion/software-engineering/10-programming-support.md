---
title: "소프트웨어공학 10. 프로그래밍 지원 기법"
description: "Notion MCP에서 직접 가져온 소프트웨어공학 10. 프로그래밍 지원 기법 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Software Engineering", "System Analysis"]
draft: true
source: "https://app.notion.com/p/33b6b9674ad8801689fdfe4782e979b1"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

## 10-1. 프로그래밍지원 기법 개요

[Notion 원본](https://app.notion.com/p/3466b9674ad880d3b27dcb2c1433e5ab)

### (1) 개념
- 프로그램을 **효율적으로 개발·관리·검증·유지보수**할 수 있도록 도와주는 각종 방법과 도구
##### \[1\] 모듈화의 관점
- 프로그램을 여러개의 적절한 크기로 나누거나 분배
- 점진적 설계 방법 → 하향식 설계 근접
##### \[2\] 추상화의 관점
- 복잡한 문제를 간략하게 표현하기 쉽도록 하는 기법
- 하위 단계와 무관하게 상위의 개괄적인 문제에 집중
### (2) 프로그래밍 지원 기법 종류
- 이론상 정립된 건 아니고, 개발 당시 다양하게 출현되는 것들을 총칭하는 것

---

## 10-2. IPT

[Notion 원본](https://app.notion.com/p/3466b9674ad880b9b9abcf0fd1e49236)

### (1) 출현 배경
- Improved Programming Technologies (프로그래밍 개선 기법) 이라는 용어는 원래 IBM이 개발한 효과적으로 프로그램을 개발하는 기법을 총칭하는 말로 시작
### (2) 분류
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-1.png)
→ 기술 지원 / 관리 지원 도구로 분류 되며, 서로 병용함으로써 상승효과 기대 가능
### (3) 기술적 지원 기법
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-2.png)

##### \[1\] 구조적 설계(Structured Design)
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-3.png)
- 시스템을 기능 단위의 모듈로 계층적으로 분해하여 설계하는 방법
**특징**
- 상위 모듈 → 하위 모듈로 단계적 분할
- 모듈 간 **결합도(Coupling)는 낮게**, **응집도(Cohesion)는 높게** 유지
- 구조도(Structure Chart) 사용
**목적**
- 복잡한 시스템의 체계적 설계
- 유지보수성 향상
- 모듈 재사용성 증가
##### \[2\] 구조적 프로그래밍(Structured Programming)
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-4.png)
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-5.png)
- 프로그램을 **순차, 선택, 반복**의 3가지 기본 제어 구조만으로 작성하는 방법
**3가지 기본 구조**
1. 순차 구조 (Sequence)
2. 선택 구조 (Selection: if)
3. 반복 구조 (Iteration: while, for)
**특징**
- goto문 사용 최소화
- 프로그램 흐름 명확
- 오류 감소 및 유지보수 용이
##### \[3\] 하향식 프로그래밍(Top-Down Programming)
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-6.png)
- 전체 시스템을 먼저 정의한 후 점차 세부 기능으로 분해하는 개발 방법
**개념**
전체 시스템
→ 주요 기능
→ 세부 기능
→ 프로그램 코드
**장점**
- 설계 구조 명확
- 단계적 개발 가능
- 오류 발견 용이
##### \[4\] 프로그램 기술 언어(Program Description Language)
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-7.png)
- 프로그램의 논리 구조를 자연어와 프로그래밍 언어 중간 형태로 표현하는 설계 도구
**특징**
- 의사코드(Pseudo Code) 형태
- 설계 단계에서 사용
- 실제 코드 작성 전에 알고리즘 검증 가능
##### \[5\] N-S (Nassi-Schneiderman) 차트
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-8.png)
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-9.png)
- 조적 프로그래밍의 논리 흐름을 도식적으로 표현하는 차트
**특징**
- 순차 / 선택 / 반복 구조 표현 가능
- 흐름선(화살표) 없이 표현
- 프로그램 구조를 직관적으로 표현
**장점**
- 논리 흐름 이해 쉬움
- 구조적 설계 표현에 적합
##### \[6\] HIPO(Hierarchy plus Input Process Output)
- 시스템 기능을 계층 구조와 IPO 관점으로 표현하는 설계 기법
**구성 요소**
① Hierarchy Chart
- 전체 시스템의 기능 계층 구조 표현
② IPO Chart
- 각 모듈의
- 입력(Input)
- 처리(Process)
- 출력(Output)<br>정의
**장점**
- 시스템 구조 이해 용이
- 문서화에 매우 효과적
- 사용자와 개발자 간 의사소통 개선
### (4) 관리적 지원 기법
![10-2. IPT 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-02-10.png)
##### \[1\] 책임 프로그래머 팀(Chief Programmer Team)
- 소수 정예 멤버
- 작업 분담 및 책임 명확히
- 작성된 코드는 책임자가 점검 → 전체 품질 보증에 유의
##### \[2\] 검토 회의(Walk-through)
- 전문가들이 모여 검토하는 방법
- 대상 자료를 누구나 이해하기 쉽게 작성할 필요
##### \[3\] 심사(Inspection)
- 검토 회의와 유사하나 오류를 문서화 → 다른 소프트웨어 개발시 참고 자료로 활용할 수 있도록 함
##### \[4\] 개발 원조 라이브러리(library)
- 개발 환경을 정비하여 관리를 쉽게 → 품질과 생산성 높이는 방법

---

## 10-3. HIPO

[Notion 원본](https://app.notion.com/p/3466b9674ad8805aa6bac517cadbacca)

### (1) HIPO의 개요
- HIPO(Hierarchy plus Input-Process-Output)은 IBM이 개발한 프로그램 설계 도구
- 처리 내용을 입력/처리 출력으로 분해
- 도형을 사용하여 계층화한 처리기능 중심의 문서화 도구
- 하향식 설계에서 수행되는 모듈을 분해하는 유용한 도구로 사용
### (2) HIPO의 종류
##### \[1\] 초기설계 패키지(Initial Design Package)
- 설계의 보조수단으로서 시스템 기능의 개요 기술
- 전체적인 구성과 방법을 전달하고 확인하기 위해 설계 담당그룹에 의해 작성
- **시스템 수행 과정 및 목적 설명 가능해야**
##### \[2\] 상세설계 패키지(Detail Design Package)
- 초기설계 패키지를 기초로하여, 다시 상세 설계한 것
- 개발 담당그룹에 의해 준비된다
##### \[3\] 문서화 및 유지보수 패키지(Documentation and maintanance package)
- 시스템에 대한 정정, 변경, 추가를 위해
- 상세설계 패키지에서 대용 가능
### (3) HIPO의 구성
![10-3. HIPO 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-03-1.png)
##### \[1\] 도형 목차 (Visual table of Contents)
![10-3. HIPO 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-03-2.png)
- 시스템이나 프로그램을 구성하는 전체 모듈에 대한 구조와 각 기능의 관계를 계층 구조로 도식화 한 것
- 프로그램 구성도는 아니고, 전체적인 자료와 제어의 흐름 파악 가능
##### \[2\] 총괄 도표 (Overview Diagram)
![10-3. HIPO 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-03-3.png)
- 도형 목차에 나타난 시스템, 프로그램을 구성하는 전체 기능을 입력, 처리, 출력의 관계로 표현
- 사용자 관점에서 시스템 기능과 처리내용을 쉽게 파악 가능
- 간단한 시스템, 프로그램의 경우 도형 목차로 그 기능 대신 가능
##### \[3\] 상세 도표 (Detail Diagram)
![10-3. HIPO 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-03-4.png)
- 총괄 도표의 형태와 같으나, 각 모듈 하나하나에 대해 처리의 기능을 상세히 정의
- 처리 절차는 프로그래밍이 가능한 순서도 수준까지 작성 되어야 함
- 입출력 자료는 레코드 단위의 변수명, 배열명 같은 자료구조 형태로 표현되어야 함

### (4) HIPO의 서식
![10-3. HIPO 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-03-5.png)

---

## 10-4. 모듈설계

[Notion 원본](https://app.notion.com/p/3466b9674ad880ffa3b5fac2030eacad)

### (1) 모듈의 개념
- 모듈이란, 독립되어 컴파일되는 단위로서 각각의 이름을 갖고 다른 모듈에서 호출이 가능함
- **복수의 모듈이 하나의 프로그램 구성**
- 일반적으로 외부 설계(External Design)과 논리 설계(Logical Design)로 구분

### (2) 모듈의 외부 설계
- 다른 모듈이 해당 모듈을 호출할 때 요구되는 모든 정보를 정의해야 함
##### 정의해야 할 외부 특성
- 모듈 명칭(Module Name)
- 기능(Function) → 내부 논리까지 다루지 않도록 주의
- 파라미터 리스트(Parameter List)
- 입/출력(Input/Output)
- 외부효과(External Effect)

### (3) 모듈의 논리 설계
- 외부 설계 완료 후 해당 모듈이 필요한 기능을 수행하도록 기능 처리 절차와 내용을 상세히 설계하는 모듈의 논리 설계
- 기억 장치의 기억 용량, 처리시간 단축, 작업 및 처리 효율성 등 좌우
##### \[1\] 논리의 작성
- 모듈의 기능을 수행하는데 필요한 처리 절차와 내용을 상세히 설계하는 단계
- IPT에서는 PDL, N-S차트, 구조적 코딩 등 존재
##### \[2\] 데이터의 정의

### (4) 모듈의 특징
- 코딩-컴파일은 독립적으로 이루어진다
- 서로 결합되어 종속적으로 실행
- C언어의 함수

### (5) 모듈 작성시 유의점
- 적절한 크기
- 재사용 위한 표준화
- 모듈간 결합도 적게
- 모듈내 구성요소들간 응집도 크게

---

## 10-5. 4세대 언어(4GL)

[Notion 원본](https://app.notion.com/p/3466b9674ad880739dcdf1b2ac3ce2bc)

### (1) 4세대 언어의 개요
- 개발자 명세에 기초하여 원시코드를 자동 생성
![10-5. 4세대 언어(4GL) 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-05-1.png)
### (2) 4세대 언어의 장단점
##### \[1\] 장점
- 명세서 해석 및 이해에 정확성 기할 수 있다
- 개발 과정의 자동화 가능
##### \[2\] 단점
- 아직 성능면에서 부족 → 불필요한 많은 양의 코드 생성 및 유지보수 어려움

---

## 10-6. 컴포넌트 기반 개발(CBD)

[Notion 원본](https://app.notion.com/p/3466b9674ad880eba472cf14ddbc44f1)

### (1) 컴포넌트 기반 개발(CBD)의 등장 배경
- **컴포넌트**
- 재사용이 가능한 소프트웨어 모듈 또는 개체
- 다른 컴포넌트와 밀접한 관계에 있는 소프트웨어 패키지
- 독립적으로 개발되어 분배될 수 있는 단위
- **중복 개발을 피하고, 재활용 할 수 있다는 것이 가장 큰 장점**
- 컴포넌트 기반 개발
- 각 컴포넌트 또는 모듈과의 조합을 인터페이스를 통해 하나의 응용 처리를 할 수 있는 프로그램을 개발하는 방법
![10-6. 컴포넌트 기반 개발(CBD) 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-06-1.png)

### (2) 컴포넌트 개념
- 캡슐화 기능을 제공하며 컴포넌트 제공자와 사용자 사이의 변경영향을 제한하는 방화벽 역할 수행
- 그룹웨어 패키지에서 전자게시판, 전자결재, 이메일, 데이터관리 등 단위 업무를 수행하는 소프트웨어 들을 각각 컴포넌트로 정의하여 인터페이스를 통해 퍼즐 조합하듯 사용 가능
![10-6. 컴포넌트 기반 개발(CBD) 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-06-2.png)

### (3) 컴포넌트 개발의 특징
- 소프트웨어 개발의 적시성(Time-to-Market) 제공
- 소프트웨어 재사용을 통한 비용 절감
- 소프트웨어의 개발 노력 경감
- 소프트웨어 품질 향상

---

## 10-7. CASE 도구(Tools)

[Notion 원본](https://app.notion.com/p/3466b9674ad8808e8acbd0dbccb1b763)

### (1) CASE의 정의
- Computer-Aided Software Engineering
- 소프트웨어 공학에서 여러 작업들을 자동화하는 과정
### (2) CASE의 분류
##### \[1\] 상위(Upper) CASE
- 요구 분석과 설계단계 지원 문제를 기술 및 계획
- 명세서 작성 위한 도구 제공
- 다이어그래밍, 프로토타이핑 도구
##### \[2\] 하위(Lower) CASE
- 구현, 테스트, 문서화 과정
- 코드생성기, 테스트도구(정적, 동적)
##### \[3\] 통합(Integrated) CASE
- 전체 소프트웨어 개발 단계 지원 위한 공통 정보 저장소, 사용자 인터페이스로 도구 통합
- 그래픽, 프로토타이핑, 명세화, 설계 도구
![10-7. CASE 도구(Tools) 이미지](/SeonggukPark/images/notion/notes/software-engineering/10-07-1.png)
### (3) CASE의 구성요소
- 소프트웨어 개발을 위한 CAD/CAM
##### \[1\] 다이어그래밍 도구
- 소프트웨어의 명세서 정의, 설계 표현의 수단
- 자동화 된 다이어그램 → 쉽고 일관성 있는 결과
##### \[2\] 구조적 기법
- 쉽게 이해되고 효율적인 의사교환
##### \[3\] 프로토타이핑 기술
- 시제품 형태의 소프트웨어 제작하여 사용자 요구사항 확인하여 진행 → 사용자 만족도 상승 및 비용 절감 효과
##### \[4\] 자동 프로그래밍 기술
##### \[5\] 정보 저장소 기술
- 소프트웨어 요구 분석과 관련된 논리/물리적 자료 정의와 모형, 프로세스 자료와 규칙등이 해당
##### \[6\] 설계 분석과 오류 발견

