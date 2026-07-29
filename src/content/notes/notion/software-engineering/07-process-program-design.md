---
title: "소프트웨어공학 7. 프로세스와 프로그램 설계"
description: "프로세스 설계, 흐름도와 프로그램 설계·검사 방법을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Software Engineering", "System Analysis"]
draft: true
source: "https://app.notion.com/p/33b6b9674ad8801689fdfe4782e979b1"
importedAt: 2026-07-24
---

## 7-1. 프로세스 설계의 개요

<!-- Notion source: https://app.notion.com/p/3416b9674ad880f4be34d8a5e2be54a7 -->

### (1) 프로세스의 설계 원칙
##### \[1\] 처리 과정을 명확하게 정의
##### \[2\] 프로세스 차트 작성
##### \[3\] 오류 검출 시스템 구성
##### \[4\] 프로세스 설계 표준화
##### \[5\] 시스템 환경 구성
##### \[6\] 시스템 조작 편리성, 단순화, 오퍼레이터 동작의 최소화 방안 검토

### (2) 프로세스 설계 과정
#### 1) 요구사항 분석
#### 2) 처리 방식 확정
- 컴퓨터 구성방식 - 집중처리 / 분산처리
- 데이터 처리방식 - 일괄처리 / 즉시처리
- 네트워크 환경 - 온라인 / 오프라인
#### 3) 프로세스 설계 작업
##### \[1\] 시스템 모듈화
##### \[2\] 서브시스템의 구성 요건
##### \[3\] 처리과정 정의
##### \[4\] 표준화
#### 4) 프로세스 흐름도 작성

---

## 7-2. 흐름도

<!-- Notion source: https://app.notion.com/p/3416b9674ad8814fadbbc317f2b99964 -->

### (1) 흐름도 종류
#### 1) 블록 차트
![7-2. 흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-02-1.png)
#### 2) 시스템 흐름도
![7-2. 흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-02-2.png)
#### 3) 프로세스 흐름도
#### 4) 프로그램 흐름도
#### 5) 흐름도의 기호
![7-2. 흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-02-3.png)
![7-2. 흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-02-4.png)

### (2) 흐름도 제어 구조
##### \[1\] 순차 구조 (Sequence Structure)
![7-2. 흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-02-5.png)
##### \[2\] 선택 구조 (Selection Structure)
![7-2. 흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-02-6.png)
##### \[3\] 반복 구조 (Iteration Structure)
![7-2. 흐름도 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-02-7.png)

---

## 7-3. 데이터 프로세스 유형

<!-- Notion source: https://app.notion.com/p/3416b9674ad8802599fdd6e003618c97 -->

### (1) 매체 변환(Conversion)
![7-3. 데이터 프로세스 유형 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-03-1.png)
### (2) 정렬(Sort)
![7-3. 데이터 프로세스 유형 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-03-2.png)
### (3) 병합(Merge)
![7-3. 데이터 프로세스 유형 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-03-3.png)
### (4) 대조(Matching)
![7-3. 데이터 프로세스 유형 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-03-4.png)
### (5) 갱신(Update)
![7-3. 데이터 프로세스 유형 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-03-5.png)
### (6) 추출(Extract)
![7-3. 데이터 프로세스 유형 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-03-6.png)
### (7) 분배(Distribution)
![7-3. 데이터 프로세스 유형 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-03-7.png)
→ 특정 조건을 만족하는 데이터와 만족하지 못하는 데이터로 분리 처리
### (8) 생성(Generate)
![7-3. 데이터 프로세스 유형 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-03-8.png)
### (9) 보고서 작성(List)
- 컴퓨터 처리의 마지막 결과
- 단일 보고서, 부속 보고서, 집계표 등

---

## 7-4. 오류 체크 설계

<!-- Notion source: https://app.notion.com/p/3416b9674ad881d981a2c0b0f2ed9afc -->

### 1) 원시 데이터 발생장소에서의 검증
- 원시 전표 기입과정에서 오류 발생 가능
### 2) 입력 매체로 변환 단계에서의 검증
### 3) 컴퓨터 처리 단계에서의 검증
##### \[1\] 컴퓨터 입력처리 단계에서의 검증
- 계산처리에 앞서 입력 변환처리 과정에서 검증
- 숫자 검사, 형식 검사, 범위 검사 등
##### \[2\] 컴퓨터 계산처리 단계에서의 검증
- 중복 레코드 검사, 불일치 레코드 검사, 제로 검사 등
### 4) 오류 데이터의 관리
#### 오류 데이터 검출, 수정 및 재투입 방법
##### \[1\] 수정 후 일괄 처리
- 오류 데이터를 수정하여 올바른 데이터에 포함시켜 일괄 처리 방법
##### \[2\] 수정 후 부분 처리
- 오류 데이터는 수정하여 처리한 후 정상 작업 파일과 병합하여 정상 데이터로 만드는 방법
##### \[3\] 처리 후 수정 보완 처리
- 정상 데이터만으로 모든 처리 완료 후, 수정 데이터만으로 다시 동일 작업 반복
##### \[4\] 처리 후 수정 처리
- 정상 데이터로 처리하여 결과 파일 만들고, 수정데이터로서 결과파일 다시 수정

---

## 7-5. 신뢰성 설계

<!-- Notion source: https://app.notion.com/p/3416b9674ad88001bf2ee731ce5dcd39 -->

### (1) 장애의 종류
#### 1) 기계 고장에 의한 장애
- 중앙처리장치 / 주변장치의 고장에 의한 장애
#### 2) 전원 고장에 의한 장애
#### 3) 소프트웨어에 의한 장애
#### 4) 바이러스에 의한 장애
#### 5) 사람에 의한 장애
#### 6) 정보에 의한 장애
- 정보의 파괴에 의한 장애
- 정보의 오류에 의한 장애
- 재해, 정보 분실 및 도난에 의한 장애
- 바이러스에 의한 장애

### (2) 장애 대책
#### 1) 예방 대책
##### \[1\] 보수에 의한 대책
- 정기 보수(업체), 수시 보수(사용자)
##### \[2\] 소프트웨어에 대한 대책
##### \[3\] 운용에 의한 대책
#### 2) 복구 대책
##### \[1\] 하드웨어 장애에 대한 대책
- 예비 기계 설치, 대용 시스템 등
##### \[2\] 소프트웨어에 의한 대책

### (3) 백업 대책
#### 1) 백업 계획
#### 2) 백업용 소프트웨어
- 백업 소프트웨어 (디스크 내용을 백업 관리)
- 복사 유틸리티
- 디스크 복사
#### 3) 백업의 종류
##### \[1\] 완전 백업 (full backup)
##### \[2\] 차등 백업 (differential backup)
- 마지막 완전 백업 이후 변경된 데이터만 백업
##### \[3\] 점증적 백업 (incremental backup)
- 마지막 백업 이후 변경된 데이터만 백업
##### \[4\] 백업 스케쥴

---

## 7-6. 프로그램 설계 및 작성

<!-- Notion source: https://app.notion.com/p/3416b9674ad88004b5fafd2f3bc9edfc -->

- 프로그램 설계는 시스템 설계의 마지막 단계
### (1) 프로그램 설계 개요
- 프로그램 설계는 시스템 분석가, 프로그래머, 오퍼레이터 등의 업무를 빠르고 정확하게 수행하는 데 목적이 있다
### (2) 프로그램 설계서 작성 효과

### (3) 프로그램 설계서 작성 방법
![7-6. 프로그램 설계 및 작성 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-06-1.png)
![7-6. 프로그램 설계 및 작성 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-06-2.png)
![7-6. 프로그램 설계 및 작성 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-06-3.png)
![7-6. 프로그램 설계 및 작성 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-06-4.png)
![7-6. 프로그램 설계 및 작성 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-06-5.png)

### (4) 프로그래밍 작업

---

## 7-7. 프로그램 테스트

<!-- Notion source: https://app.notion.com/p/3416b9674ad881b4bb6df6db504ed225 -->

### (1) 테스트 계획 수립
![7-7. 프로그램 테스트 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-07-1.png)
##### \[1\] 테스트 단계마다 목표 및 합격 기준 설정
##### \[2\] 테스트 단계별 책임자 결정
##### \[3\] 테스트 시스템의 준비

### (2) 테스트 케이스의 설계
- 테스트 케이스 설계는 프로그래머와 별도로 테스트 전문가가 행하는 것이 품질 향상에 도움 됨
##### \[1\] 명세서를 기초로 하는 테스트 케이스 설계
##### \[2\] 프로그램의 logical path를 중심으로 하는 테스트 케이스 설계

### (3) 테스트 종류
![7-7. 프로그램 테스트 이미지](/SeonggukPark/images/notion/notes/software-engineering/07-07-2.png)
#### 1) 단위 테스트
- 프로그램 명세를 기초로 한 논리 중심의 테스트
- 다른 프로그램과의 데이터 인터페이스와 프로그램내의 자료 구조상의 오류를 검사
#### 2) 통합 테스트
- 프로그램 시스템 전체가 통합될 때까지 진행
#### 3) 시스템 테스트
- 시스템의 목표 달성 여부 검증
- 데이터 작성 → 데이터 입력 → 실행 → 출력 → 파일 유지보수 의 전과정
#### 4) 인수 테스트
- 사용자의 승인을 받는 테스트
- 사용자 테스트(사용자 승인을 받기 위해 사용자 환경에서)
- 알파 테스트(선택된 사용자가 개발 환경에서)
- 베타 테스트(고객의 사용환경에서)
