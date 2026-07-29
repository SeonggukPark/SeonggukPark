---
title: "소프트웨어공학 12. 객체지향 분석과 설계"
description: "객체지향 개념, 분석·설계 절차와 모델링 방법을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Software Engineering", "System Analysis"]
draft: true
source: "https://app.notion.com/p/33b6b9674ad8801689fdfe4782e979b1"
importedAt: 2026-07-24
---

## 12-1. 객체지향의 개념

<!-- Notion source: https://app.notion.com/p/3486b9674ad880348835c498bbe88923 -->

### (1) 객체지향의 기원
- 객체지향 프로그래밍이 일반화 → 설계, 분석, 도구 등 소프트웨어 개발 영역에 객체지향 개념 도입
### (2) 객체지향의 출현 배경
#### 1) 새로운 개발 방법론의 필요성
- 프로젝트마다 업무 성격, 규모, 개발기간, 예산 등이 모두 달라 전통적인 방법론만으로는 프로젝트 특징 반영 힘듦
#### 2) 새로운 사고로의 전환
- Reusability → 개발비용 절감 & 유지보수 용이
- 객체는 정보화 함께 처리 방법까지 모두 포함하는 종합적 단위 
### (3) 객체지향 분석과 설계 개요
#### 1) 객체지향 분석
- 객체와 클래스에 관계된 요소 정의
- 시스템의 동적인 상태 변화와 사건 반응에 대한 활동의 변화를 정형화하는 과정
#### 2) 객체지향 설계
- 분석한 요소 상세화
- 객체를 클래스로 정의
- 상관관계 → 속성 상속으로 정의
- 시스템에 물리적 요소 추가하여 구현 가능한 수준으로 작성
#### 3) 객체지향 분석과 설계단계
##### \[1\] 객체, 클래스 정의
##### \[2\] 클래스의 특성 정의
##### \[3\] 연관된 클래스들을 속성 상속 구조화
##### \[4\] 클래스 특성 구조화 - 데이터 구조와 연산 알고리즘 정의
#### 4) 객체지향 개념 이해
![12-1. 객체지향의 개념 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-01-1.png)
#### 5) 구조적 개발 방식과 객체지향 개발 방식 비교
![12-1. 객체지향의 개념 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-01-2.png)

---

## 12-2. 객체지향 개념과 원리

<!-- Notion source: https://app.notion.com/p/3486b9674ad8800988a6cf8900ee67c1 -->

### (1) 객체지향 기법의 핵심 요소 및 원리
![12-2. 객체지향 개념과 원리 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-02-1.png)
#### 1) 객체지향 핵심 요소
- 객체 - 인스턴스
![12-2. 객체지향 개념과 원리 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-02-2.png)
- 메세지
![12-2. 객체지향 개념과 원리 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-02-3.png)
- 클래스
![12-2. 객체지향 개념과 원리 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-02-4.png)
#### 2) 객체지향의 원리
- 캡슐화
![12-2. 객체지향 개념과 원리 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-02-5.png)
- 상속성
![12-2. 객체지향 개념과 원리 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-02-6.png)
- 다형성
![12-2. 객체지향 개념과 원리 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-02-7.png)
- 추상화
### (2) 객체지향 개발 방법
![12-2. 객체지향 개념과 원리 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-02-8.png)
![12-2. 객체지향 개념과 원리 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-02-9.png)

##### \[1\] 객체지향 분석(OOA)
- 객체 모델, 동적 모델, 기능 모델을 정의
##### \[2\] 객체지향 설계(OOD)
- 자료구조와 알고리즘이 정의
##### \[3\] 객체지향 프로그래밍(OOP)
- 객체지향 언어나 객체지향 DBMS를 사용하는 것이 바람직

---

## 12-3. 객체지향 분석

<!-- Notion source: https://app.notion.com/p/3486b9674ad8808da916f483b0c12398 -->

### (1) 객체지향 분석의 개요
#### 1) 객체지향 분석(OOA) 접근 기법
##### \[1\] 객체 및 클래스 식별
##### \[2\] 구조 식별
##### \[3\] 주제 정의
##### \[4\] 속성 - 인스턴스 연결 정의
##### \[5\] 연산 - 메세지 연결 정의
#### 2) 사용 모델의 5계층 분리
##### \[1\] 1계층 : Class/Object Layer
- 객체와 클래스를 찾아내는 단계
##### \[2\] 2계층 : Structure Layer
- 클래스와 객체들의 구조를 포함시키는 단계
##### \[3\] 3계층 : 서비스 계층
- 메세지, 행위를 기술하는 단계
##### \[4\] 4계층 : 속성 계층
- 클래스, 객체의 속성을 기술하는 단계
##### \[5\] 5계층 : 주제 계층
- 객체 구조의 확장 → 실행 단위로 설계를 분할하는 단계

### (2) 객체 및 클래스 식별
- 객체 파악을 위해 시스템 분석가는 문제 명세, 요구 사항 명세서, 시스템 정의서 등을 이용

### (3) 구조 식별
##### \[1\] Gen-Spec 구조
- 하위 객체는 상위 객체의 특성을 포함하면서 더 구체적인 특성을 추가한 관계
- **IS-A 관계 → “\~은 \~이다” (입력센서는 센서이다)**
![12-3. 객체지향 분석 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-03-1.png)

##### \[2\] Whole-Part 구조
- 하나의 객체가 다른 객체를 구성 요소로 포함하는 관계
- **HAS-A 관계 → “\~은 \~을 가진다” (수송기관은 엔진을 가진다)**
![12-3. 객체지향 분석 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-03-2.png)

### (4) 주제의 정의
![12-3. 객체지향 분석 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-03-3.png)

### (5) 속성 분석
- 클래스의 속성 명칭은 클래스 상자의 가운데 부분에 쓰임

### (6) 서비스 분석
- 서비스란 메소드 혹은 프로시져라고도 함
- 객체가 수행할 처리과정을 명세화하는 단계
##### \[1\] 객체상태 분석(Object State Analysis)
- 객체의 상태가 어떻게 변하는지를 정의하는 것
##### \[2\] 서비스 명세서(Service Specification)
- 객체가 수행할 기능 정의
##### \[3\] 메세지 명세서(Message Specification)
- 객체 간 서비스 요청 관계 정의

### (7) 연산의 정의
- 객체내의 포함된 하나 이상의 속성값 변경

### (8) 객체 상호간의 통신

---

## 12-4. 객체지향 설계

<!-- Notion source: https://app.notion.com/p/3486b9674ad8810bbb41cbd3b7d1cc86 -->

### (1) 객체지향 설계 작성
##### \[1\] 설계 단계에서의 객체, 연산, 메세지
##### \[2\] 모듈화
- 분해성
- 조립성
- 이해성
- 연속성
- 보호성
##### \[3\] 클래스, 인스턴스, 상속성

### (2) 객체의 설계 기술
##### \[1\] 프로토콜 기술(Protocol description)
- 객체가 **외부 객체와 어떻게 상호작용하는지**를 정의
- 객체가 어떤 메시지를 받을 수 있고, 어떤 서비스를 제공하는지를 기술하는 것
##### \[2\] 구현 기술(Implementation description)
- 객체 내부 속성과 연산의 실제 처리 방법을 기술하는 것
- 객체 내부 속성과 연산의 실제 처리 방법을 기술하는 것

### (3) 객체지향 설계 절차
![12-4. 객체지향 설계 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-04-1.png)

---

## 12-5. 객체지향 프로그래밍

<!-- Notion source: https://app.notion.com/p/3486b9674ad881f1ae52eec7df707ad4 -->

### (1) 객체지향 언어
- C++
- Smalltalk
- Java
### (2) 객체지향 프로그래밍 지침
![12-5. 객체지향 프로그래밍 이미지](/SeonggukPark/images/notion/notes/software-engineering/12-05-1.png)
