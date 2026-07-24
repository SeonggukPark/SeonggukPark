---
title: "PCB 코팅 작업 상태 인지 모델"
description: "카메라 영상으로 PCB 코팅 진행 상태를 인지하고 로봇의 후속 작업 판단에 활용하는 산학 프로젝트입니다."
period: "2024.09 — 2024.12"
category: "AI"
role: "PCB 검출·코팅 상태 인지·Jetson 추론 검증"
tags: ["Python", "Deep Learning", "Computer Vision", "Jetson"]
featured: true
source: "https://app.notion.com/p/c90aebae0db04e888359d27eac3d0520"
importedAt: 2026-07-24
outcomes:
  - "PCB 코팅 작업 상태 인지 파이프라인 설계"
  - "Jetson 환경에서 실시간 추론 성능 검증"
relatedNotes:
  - "linux-observability-first-checks"
---

![PCB 코팅 자동화 시스템 구성](/SeonggukPark/images/notion/pcb-1.png)

## 프로젝트 개요

LIG넥스원 산학과제로 수행한 PCB 코팅 자동화 프로젝트입니다. 카메라로 PCB와 코팅 진행 상태를 인지하고, 상태에 따라 로봇의 후속 작업과 경로를 결정할 수 있는 제어 시스템 개발에 참여했습니다.

## 담당 역할

- 컨베이어 벨트로 이동된 PCB 보드 검출
- 촬영 이미지에서 딥러닝 기반 코팅 작업 진행 상태 분석
- Jetson 환경에서 실시간 추론 성능 검증

![PCB와 코팅 작업 이미지](/SeonggukPark/images/notion/pcb-2.png)

## 결과

카메라 입력에서 PCB와 코팅 진행 상태를 인지하는 흐름을 구성했고, Jetson 환경에서 실시간 추론 가능성을 검증했습니다.
