---
title: "시스템 에어컨 실내기 분류 모델"
description: "LG전자와 함께 수행한 산학과제에서 “시스템에어컨 자율 제어”를 주제로 AI 개발 과제를 수행하였습니다."
cardPoints:
  - "Python 시계열 군집화 모델의 C++ 전환 및 Linux AI 엔진 이식"
  - "실제 현장 데이터 기반 동작 검증 및 약 90% 분류 정확도 확보"
period: "2024.07 — 2024.12"
categories: ["Linux", "AI"]
role: "클러스터링 모델 개발·C++ 전환·AI 엔진 이식"
tags: ["C++", "Python", "Linux"]
featured: true
source: "https://app.notion.com/p/bba14d837011451e9317f029232ece52"
importedAt: 2026-07-24
outcomes:
  - "실제 현장 기준 약 90% 분류 정확도"
  - "동일 공간 실내기 그룹화 시뮬레이션 검증"
  - "Python 모델의 C++ 전환 및 AI 엔진 환경 이식"
relatedNotes: []
---

![시스템 에어컨 구성](/SeonggukPark/images/notion/aircon-1.png)

## 프로젝트 개요

LG전자 산학과제로 수행한 시스템 에어컨 협조 제어용 실내기 분류 모델 개발 프로젝트입니다. 에너지 사용을 효율화하기 위해 센서 시계열 데이터로 동일 공간에 설치된 실내기를 묶는 알고리즘을 개발했습니다.

## 담당 역할

- 시계열 센서 데이터를 이용한 Clustering 모델 개발
- Python 모델을 C++로 변환
- AI 엔진과 유사한 환경에서 변환 모델의 동작과 성능을 시험한 뒤 실제 엔진 환경에 이식

## 핵심 구현

유사한 경향의 시계열도 시간축에서 조금 어긋나면 Euclidean distance가 크게 측정될 수 있습니다.

![시계열 데이터의 Euclidean distance 비교](/SeonggukPark/images/notion/aircon-3.png)

이를 보완하기 위해 DTW로 두 시계열의 정렬 비용을 비교했습니다.

![Dynamic Time Warping을 이용한 시계열 정렬 과정](/SeonggukPark/images/notion/aircon-4.png)

정렬된 시계열 간 거리를 바탕으로 K-Means를 적용해 동일 공간의 실내기를 그룹화했습니다.

![K-Means 군집 할당과 중심점 갱신 과정](/SeonggukPark/images/notion/aircon-2.png)

![실내기 군집화 시뮬레이션](/SeonggukPark/images/notion/aircon-5.png)

모델 결과만 확인하는 데 그치지 않고 실제 제품 환경에서 실행할 수 있도록 Python 모델을 C++로 전환하고 AI 엔진 환경에 이식했습니다.

## 결과

- 실제 현장 데이터 기준 약 90% 수준의 실내기 분류 정확도를 확보했습니다.
- 시뮬레이션에서 같은 공간의 실내기가 함께 그룹화되는 것을 확인했습니다.
- 개발 모델의 C++ 전환과 AI 엔진 환경 이식을 완료했습니다.
