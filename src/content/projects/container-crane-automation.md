---
title: "항만 컨테이너 크레인 자동화"
description: "다중 모터 MCU 제어와 Linux 서버 애플리케이션을 연결해 컨테이너 선적을 자동화한 H/W-S/W 통합 프로젝트입니다."
period: "2023.03 — 2023.12"
category: "Embedded"
role: "팀장·선적 알고리즘·회로·MCU 펌웨어·Linux 서버 애플리케이션 개발"
tags: ["C", "C++", "Python", "Linux"]
featured: true
demo: "https://youtu.be/P9J5YVBiWrk?si=ZFAFCixaW8i_-APe"
source: "https://app.notion.com/p/9101bbe6ff8e4b6d86eb652260d0b583"
importedAt: 2026-07-24
outcomes:
  - "기존 1차원 방식 대비 운송 시간 약 10% 단축"
  - "해양수산부 장관상 수상"
  - "대한민국 소프트웨어 대전 시연"
relatedNotes:
  - "cpp-solid-design-checklist"
  - "linux-network-troubleshooting"
---

![KNURANE 자동화 키 크레인 프로젝트](/SeonggukPark/images/notion/crane-1.png)

## 프로젝트 개요

사람의 개입을 최소화해 야드에서 컨테이너선으로 물류 컨테이너를 운송하는 자동 선적 키(Quay) 크레인 시스템입니다. 기존의 1차원 이동 방식에서 벗어나 2차원 위치 제어를 적용하고, 센서와 알고리즘을 결합해 연속 운용 가능한 물류 자동화를 목표로 했습니다.

## 담당 역할

- 팀장으로 프로젝트 계획, 일정과 예산 관리
- 선적 알고리즘과 크레인 회로 설계 및 개발
- 다중 모터 제어를 위한 멀티스레드 MCU 펌웨어 개발
- 제어기와 서버 사이의 BLE 통신 프로토콜 및 Linux 서버 애플리케이션 개발

## 문제 해결

초기에는 서버 명령과 센서 이벤트를 하나의 흐름에서 처리해 통신 지연이 발생하면 제어 상태 갱신도 함께 늦어졌습니다. 경로 연산, 통신과 제어 흐름을 멀티스레드 구조로 분리하고 우선순위를 조정해 장치 상태와 제어 명령이 안정적으로 연동되도록 개선했습니다.

![자동화 크레인 프로토타입](/SeonggukPark/images/notion/crane-2.png)

## 결과

- 2차원 배치 알고리즘을 적용해 기존 1차원 방식보다 컨테이너 운송 시간을 약 10% 단축했습니다.
- 2023 스마트 해상물류 경진대회에서 해양수산부 장관상을 받았습니다.
- 대한민국 소프트웨어 대전에서 작품을 시연하고 기술을 소개했습니다.
