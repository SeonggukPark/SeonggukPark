---
title: "PCB 코팅 불량 탐지 모델"
description: "LIG넥스원과 함께 수행한 산학과제에서 UV 이미지를 바탕으로 불량품 여부를 판단하는 AI 모델 개발을 수행 (개인 프로젝트)"
cardPoints:
  - "Python을 활용한 Detection 모델 개발"
  - "Jetson Nano에서의 실시간 추론을 통해 코팅 불량 탐지 정확도 약 85% 확보"
period: "2024.09 — 2024.12"
categories: ["AI"]
role: "코팅 불량 판정 모델 개발·Jetson Nano 환경 이식"
tags: ["Python", "PyTorch"]
featured: true
source: "https://app.notion.com/p/c90aebae0db04e888359d27eac3d0520"
importedAt: 2026-07-24
outcomes:
  - "약 85% 수준의 코팅 불량 탐지 정확도"
  - "PCB 코팅 불량 자동 판정 파이프라인 설계"
  - "Jetson 환경에서 실시간 추론 성능 검증"
relatedNotes: []
---

![PCB 코팅 자동화 시스템 구성](/SeonggukPark/images/notion/pcb-1.png)

## 프로젝트 개요

LIG넥스원 산학과제로 수행한 PCB 코팅 자동화 프로젝트입니다. 기존 공정에서 작업자가 육안으로 판정하던 PCB 코팅 불량 여부를 이미지 기반으로 자동 판단하고, 결과를 로봇의 후속 작업과 경로 결정에 활용하는 시스템 개발에 참여했습니다.

## 담당 역할

- 컨베이어 벨트로 이동된 PCB 보드 검출
- 이미지 데이터 전처리와 Vision 모델 학습을 통한 코팅 불량 판정
- Jetson Nano 환경 배포와 제한된 연산 자원에서의 추론 성능 검증

![PCB와 코팅 작업 이미지](/SeonggukPark/images/notion/pcb-2.png)

## 결과

- 약 85% 수준의 코팅 불량 탐지 정확도를 확보했습니다.
- 카메라 입력부터 불량 판정까지 이어지는 흐름을 구성하고 Jetson Nano에서 Edge 추론 가능성을 검증했습니다.
