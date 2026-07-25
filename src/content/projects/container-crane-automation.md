---
title: "항만 컨테이너 크레인 자동화"
description: "해양수산부에서 주관한 IoT 공모전에서 임베디드 프로젝트를 수행하였습니다."
cardPoints:
  - "Linux 기반의 크레인 제어 프로그램과 서버-다중제어기 간 통신 서비스 구현"
  - "전체 물류 운송 시퀀스 구현 및 HW를 포함한 전체 시스템 구성"
period: "2023.03 — 2023.12"
categories: ["Embedded", "Linux"]
role: "팀장, 임베디드 시스템 구현"
tags: ["C", "C++", "Python", "Linux"]
featured: true
source: "https://app.notion.com/p/9101bbe6ff8e4b6d86eb652260d0b583"
importedAt: 2026-07-24
outcomes:
  - "기존 1차원 방식 대비 운송 시간 약 10% 단축"
  - "X-Y-Z 3축 제어와 18개 컨테이너 자동 선적 검증"
  - "서버-제어기 명령·상태 통신과 Linux 기반 크레인 제어 자동화"
  - "해양수산부 장관상 수상"
  - "대한민국 소프트웨어 대전 시연"
relatedNotes: []
---

<a class="button" href="/SeonggukPark/projects/container-crane-automation/report/">프로젝트 결과보고서 보기 →</a>

![KNURANE 자동화 키 크레인 프로젝트](/SeonggukPark/images/notion/crane-1.png)

## 프로젝트 개요

2023 스마트해상물류 × ICT멘토링에서 수행한 자동 선적 키(Quay) 크레인 프로젝트입니다. 사람의 개입을 최소화해 야드의 컨테이너를 선박으로 운송하고, 선적 계획부터 컨테이너 인식·이동·상태 갱신까지 하나의 흐름으로 자동화하는 것을 목표로 했습니다.

기존 수상작의 1축 이동 구조를 개선해 Core-XY 방식으로 X-Y 평면을 제어하고, 리니어 액추에이터로 Z축을 제어했습니다. 선박은 2(가로) × 3(세로) × 3(높이) 구조로 제작해 총 18개 컨테이너의 적재 시나리오를 검증했습니다.

![Core-XY 크레인과 컨테이너 적재 구역의 3D 시스템 모델](/SeonggukPark/images/notion/crane-system-model.webp)

## 담당 역할

- Raspberry PI OS(Linux 배포판)에서 크레인 제어 프로그램 구현
- Raspberry로 구현한 서버와 다중 Arduino 제어기 사이의 통신 서비스 구현
- Core-XY 플로터, 리니어 액추에이터, 전자석 스프레더를 포함한 크레인 임베디드 시스템 전체 구현
- 팀장으로 프로젝트 전체를 관리하고 HW-SW 통합 조율
- Notion·Google Meet·Discord를 활용한 개발 현황 공유와 팀 협업 운영


## 핵심 구현

### 무선 통신을 활용한 제어기 컨트롤

- Raspberry Pi OS에서 Bluetooth 장치를 탐색·페어링하고 다중 Arduino 제어기와의 연결 상태 관리
- HC-06 모듈을 연결한 Arduino 제어기별 명령 채널을 분리해 X-Y축과 Z축 제어 신호 송수신
- 제어기별 동작 완료·상태 데이터가 Raspberry Pi로 회신되는 양방향 Bluetooth 통신 검증

<div class="project-image-row">
  <img src="/SeonggukPark/images/notion/crane-bluetooth-discovery.webp" alt="Raspberry Pi OS에서 Arduino Bluetooth 장치를 탐색하고 연결 정보를 확인하는 과정" loading="lazy" />
  <img src="/SeonggukPark/images/notion/crane-bluetooth-integration.webp" alt="다중 Arduino 제어기와 리니어 액추에이터를 연결한 Bluetooth 통합 시험" loading="lazy" />
</div>

### Linux 크레인 제어 프로그램

- 서버에서 전달된 목적지 좌표와 작업 명령을 Linux 기반 Raspberry Pi에서 수신·처리
- X-Y축 Core-XY 플로터, Z축 리니어 액추에이터, 전자석 스프레더의 순차 동작 제어
- 제어기별 동작 완료 상태를 수집해 다음 운반 작업으로 이어지는 제어 흐름 구현

![선적 요청부터 크레인 이동과 상태 갱신까지의 팀 전체 시스템 시퀀스 다이어그램](/SeonggukPark/images/notion/sequence_diagram.png)

### 서버-제어기 통신

- 서버의 좌표·작업 명령을 제어기별 명령 형식으로 변환해 Raspberry Pi에서 다중 Arduino로 전달
- Arduino의 동작 완료·상태 응답을 수집해 서버가 다음 작업을 수행할 수 있는 통신 인터페이스 구성
- 서버 명령부터 크레인 동작과 상태 갱신까지 이어지는 전체 시스템 연동 검증

![X-Y축 모터와 Z축 액추에이터를 담당하는 Arduino 제어 회로](/SeonggukPark/images/notion/crane-control-circuits.webp)

## 문제 해결

- **CNC Shield와 Bluetooth 충돌**: XY 플로터 제어용 CNC Shield와 HC-06 모듈을 함께 사용할 때 통신 문제가 발생해, 모터 제어 회로를 L298N 드라이버 2개 기반으로 변경했습니다.
- **서버-제어기 통신 연동**: 서버에서 전달된 목적지 좌표를 제어 명령으로 변환하고, 각 제어기의 동작 상태를 회신하는 통신 흐름을 정리했습니다.
- **H/W-S/W 동작 불일치**: 축별 구동 순서와 완료 상태를 기준으로 제어 흐름을 조정해 연속 운반 과정의 충돌을 줄였습니다.

## 협업

<div class="project-image-row project-image-row-collaboration">
  <img src="/SeonggukPark/images/notion/crane-collaboration-notion.webp" alt="Notion 캘린더로 공유한 KNURANE 팀원별 개발 일정" loading="lazy" />
  <img src="/SeonggukPark/images/notion/crane-collaboration-meeting.webp" alt="Discord에서 진행한 KNURANE 하드웨어 설계 회의" loading="lazy" />
</div>

- **계획·설계**: 3~5월에는 매주 교내 학습실에서 약 3시간씩 대면 회의를 진행하며 프로젝트를 계획하고 시스템을 분석·설계했습니다.
- **H/W 개발**: 6월 설계와 도메인 학습을 마친 뒤 7월부터 3D 프린팅, 부품 조립, Raspberry Pi·Arduino 학습을 진행했습니다. 8월부터 주 5~6회 회로와 모델링을 개선하고 9월에는 크레인의 동작 정확도를 최적화했습니다.
- **S/W 협업**: Notion으로 학습·개발 현황을 실시간 공유하고 Google Meet 주간 회의에서 계획과 진척도를 점검했습니다.
- **통합 검증**: H/W와 S/W 연동을 시작한 8월 중순부터 주 2~3회 교내 도서관 스터디룸에서 함께 시스템을 통합하고 동작을 검증했습니다.

## 결과

- 2023 스마트 해상물류 경진대회에서 해양수산부 장관상을 받았습니다.
- 대한민국 소프트웨어 대전에서 작품을 시연하고 기술을 소개했습니다.

<div class="project-image-row project-image-row-three">
  <img src="/SeonggukPark/images/notion/crane-minister-award.webp" alt="2023 스마트 해상물류 경진대회 해양수산부 장관상" loading="lazy" />
  <img src="/SeonggukPark/images/notion/crane-sw-expo-1.webp" alt="대한민국 소프트웨어 대전 KNURANE 프로젝트 전시 보드" loading="lazy" />
  <img src="/SeonggukPark/images/notion/crane-sw-expo-2.webp" alt="대한민국 소프트웨어 대전에서 시연한 자동화 크레인 프로토타입" loading="lazy" />
</div>
