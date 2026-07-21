---
title: "PCB 이미지 기반 불량 검출 모델"
description: "부족한 불량 데이터를 Augmentation으로 보완하고 검출 모델을 Jetson Nano에 배포한 산학 프로젝트입니다."
period: "2024.09 — 2024.12"
category: "AI"
role: "모델 개발·데이터 전처리·Edge 배포"
tags: ["Python", "PyTorch", "Computer Vision", "Jetson Nano"]
featured: true
outcomes:
  - "약 85% 불량 탐지 정확도"
  - "Jetson Nano 추론 환경 구축"
---

## 프로젝트 개요

LIG넥스원 산학과제로 수행한 PCB 생산 라인의 불량품 검출 모델 개발 프로젝트입니다. UV 이미지를 이용해 PCB 코팅 상태의 불량 여부를 판별하는 모델을 개발했습니다.

## 담당 역할

- PCB 불량 탐지를 위한 Detection 모델 개발
- 학습 데이터 전처리와 Augmentation 적용
- Jetson Nano 기반 Edge 환경에 모델 배포 및 성능 검증

## 문제와 해결

다품종 소량 생산되는 제품의 특성상 확보할 수 있는 불량 데이터가 부족했습니다.

데이터 특성을 보존하는 Augmentation 기법을 적용해 학습 데이터의 다양성을 확보하고 제한된 데이터 환경에서 모델의 일반화 성능을 보완했습니다.

## 결과

제한된 연산 자원을 가진 Jetson Nano에 추론 환경을 구축하고 약 85% 수준의 불량 탐지 정확도를 확인했습니다.

