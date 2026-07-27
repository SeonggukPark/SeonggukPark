---
title: "항만 컨테이너 크레인 자동화"
description: "IoT 공모전을 통한 임베디드 프로젝트 수행 (5인 팀 프로젝트)"
cardPoints:
  - "Linux 기반 제어 프로그램 및 다중 제어기와의 통신 서비스 구현"
  - "전체 운송 시퀀스 구현 및 임베디드 시스템 설계"
  - "멀티스레딩으로 경로 계산과 크레인 제어를 병렬 처리하여 전체 물류 운송 시간 10% 단축"
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
  - "Raspberry Pi-다중 Arduino 명령·상태 통신과 Linux 기반 크레인 제어 자동화"
  - "해양수산부 장관상 수상"
  - "대한민국 소프트웨어 대전 시연"
relatedNotes: []
---

<a class="button" href="/SeonggukPark/projects/container-crane-automation/report/">프로젝트 결과보고서 보기 →</a>

![KNURANE 자동화 키 크레인 프로젝트](/SeonggukPark/images/notion/crane-1.png)

## 프로젝트 개요

2023 스마트해상물류 × ICT멘토링에서 수행한 자동 선적 키(Quay) 크레인 프로젝트입니다. 사람의 개입을 최소화해 야드의 컨테이너를 선박으로 운송하고, 선적 계획부터 컨테이너 인식·이동·상태 갱신까지 하나의 흐름으로 자동화하는 것을 목표로 했습니다.

![Core-XY 크레인과 컨테이너 적재 구역의 3D 시스템 모델](/SeonggukPark/images/notion/crane-system-model.webp)

## 담당 역할

- Raspberry Pi OS에서 서버 명령을 처리하는 크레인 제어 프로그램 구현
- 다중 Arduino의 Core-XY 모터·리니어 액추에이터·전자석 구동 코드 구현
- Bluetooth 기반 명령 전송과 동작 완료 상태 수신 기능 구현
- 축별 구동 순서를 제어하는 자동 운송 시퀀스와 H/W-S/W 통합 테스트 수행
- 팀장으로서 개발 범위와 일정을 관리


## 핵심 구현

### Raspberry Pi-Arduino 제어 구조

Raspberry Pi를 상위 제어기로 두고 두 Arduino가 실제 구동부를 나누어 제어하도록 구성했습니다. Raspberry Pi의 Linux 프로그램은 서버에서 목적지 좌표와 작업 명령을 받아 제어기별 명령으로 변환하고, Arduino는 담당 축을 구동한 뒤 완료 상태를 회신합니다.

- X-Y축 제어기는 두 스텝 모터를 Core-XY 방식으로 구동해 스프레더를 목표 좌표로 이동
- Z축 제어기는 리니어 액추에이터의 상승·하강과 전자석의 부착·해제를 제어
- 실제 전원 환경에서 스텝 모터 이동량과 액추에이터 길이를 측정하고 제어값을 보정해 위치 오차 축소

![X-Y축 모터와 Z축 액추에이터를 담당하는 Arduino 제어 회로](/SeonggukPark/images/notion/crane-control-circuits.webp)

### Bluetooth 명령·상태 통신

- Raspberry Pi OS에서 Bluetooth 장치를 탐색·페어링하고 다중 Arduino 제어기와의 연결 상태 관리
- HC-06 모듈을 연결한 Arduino 제어기별 명령 채널을 분리해 X-Y축과 Z축 제어 신호 송수신
- 제어기별 동작 완료 상태를 Raspberry Pi로 회신해 다음 제어 단계의 실행 조건으로 사용
- 유선 연결 없이 한 대의 Raspberry Pi에서 여러 구동 제어기를 제어하는 양방향 통신 검증

<div class="project-image-row">
  <img src="/SeonggukPark/images/notion/crane-bluetooth-discovery.webp" alt="Raspberry Pi OS에서 Arduino Bluetooth 장치를 탐색하고 연결 정보를 확인하는 과정" loading="lazy" />
  <img src="/SeonggukPark/images/notion/crane-bluetooth-integration.webp" alt="다중 Arduino 제어기와 리니어 액추에이터를 연결한 Bluetooth 통합 시험" loading="lazy" />
</div>

### 자동 운송 상태 제어

Linux 제어 프로그램이 각 구동부를 한꺼번에 실행하지 않고 완료 상태를 확인하며 다음 단계로 넘어가도록 운송 과정을 구성했습니다.

1. 서버에서 컨테이너의 현재 위치와 목적지 좌표 수신
2. Raspberry Pi가 좌표를 X-Y축 이동 명령으로 변환해 해당 Arduino에 전달
3. 이동 완료 후 Z축 하강과 전자석 부착을 차례로 실행
4. Z축 상승, 목적지 이동, 하강과 전자석 해제를 순서대로 수행
5. 각 단계의 완료 상태를 수집하고 전체 작업 결과를 상위 시스템에 전달

![선적 요청부터 크레인 이동과 상태 갱신까지의 팀 전체 시스템 시퀀스 다이어그램](/SeonggukPark/images/notion/sequence_diagram.png)

## 문제 해결

### 멀티스레드로 제어기 통신 블로킹 해결

초기에는 Raspberry Pi의 단일 실행 흐름에서 서버 명령 수신과 두 Arduino의 Bluetooth 통신을 순차적으로 처리했습니다. 이 구조에서는 한 제어기의 동작 완료 응답이 늦어지면 해당 수신 구간에서 프로그램이 대기하면서 다른 제어기의 상태 확인과 다음 운송 단계까지 함께 지연되는 문제가 발생했습니다.

이를 해결하기 위해 Arduino별 Bluetooth 송수신을 독립된 작업 스레드로 분리했습니다. 각 스레드가 담당 제어기의 명령 전송과 완료 응답 수신을 전담하고, 메인 제어 흐름은 수집된 완료 상태를 기준으로 다음 동작을 결정하도록 구조를 변경했습니다. 그 결과 한 제어기의 응답 대기가 다른 통신 흐름을 막지 않게 되었고, X-Y축 이동과 Z축·전자석 동작이 연결되는 자동 운송 시퀀스를 안정적으로 실행할 수 있었습니다.

## 팀 리딩과 통합 개발

<div class="project-image-row project-image-row-collaboration">
  <img src="/SeonggukPark/images/notion/crane-collaboration-notion.webp" alt="Notion 캘린더로 공유한 KNURANE 팀원별 개발 일정" loading="lazy" />
  <img src="/SeonggukPark/images/notion/crane-collaboration-meeting.webp" alt="Discord에서 진행한 KNURANE 하드웨어 설계 회의" loading="lazy" />
</div>

팀장으로서 크레인 구동부, 웹·영상 처리, 컨테이너 제작으로 업무를 나누고 Notion과 주간 회의로 개발 현황을 관리했습니다. H/W와 S/W 연동이 시작된 뒤에는 각 모듈의 입력·출력과 완료 조건을 기준으로 통합 순서를 조율하고, 실제 크레인에서 발생한 통신·이동 오차를 팀원들과 함께 반복 검증했습니다.

## 결과

- 한 대의 Raspberry Pi에서 다중 Arduino 제어기로 명령을 전달하고 상태를 회신받는 무선 제어 구조를 구현했습니다.
- 2023 스마트 해상물류 경진대회에서 해양수산부 장관상을 받았습니다.
- 대한민국 소프트웨어 대전에서 작품을 시연하고 기술을 소개했습니다.

<div class="project-image-row project-image-row-three">
  <img src="/SeonggukPark/images/notion/crane-minister-award.webp" alt="2023 스마트 해상물류 경진대회 해양수산부 장관상" loading="lazy" />
  <img src="/SeonggukPark/images/notion/crane-sw-expo-1.webp" alt="대한민국 소프트웨어 대전 KNURANE 프로젝트 전시 보드" loading="lazy" />
  <img src="/SeonggukPark/images/notion/crane-sw-expo-2.webp" alt="대한민국 소프트웨어 대전에서 시연한 자동화 크레인 프로토타입" loading="lazy" />
</div>
