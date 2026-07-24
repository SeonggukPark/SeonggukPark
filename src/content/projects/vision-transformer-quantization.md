---
title: "Vision Transformer 양자화"
description: "Post-Training Quantization으로 정확도 저하를 억제하면서 Vision Transformer의 추론 성능을 개선했습니다."
period: "2024.05 — 2024.07"
category: "Edge AI"
role: "자원 분석·INT8 양자화·성능 검증"
tags: ["Python", "PyTorch"]
featured: true
outcomes:
  - "추론 속도 약 43% 개선"
  - "양자화 전후 정확도·지연시간 trade-off 검증"
  - "교내 학술대회 논문·포스터 발표"
source: "https://app.notion.com/p/b3abeb01290748968d2f55ab71b16e55"
importedAt: 2026-07-24
---

![부동소수점 값을 INT8로 양자화하는 과정](/SeonggukPark/images/notion/vit-1.png)

## 프로젝트 개요

Vision Transformer를 모바일과 Edge 환경에서 실행하기 위해 모델을 경량화한 개인 연구 프로젝트입니다. 모델의 자원 사용량을 분석하고 양자화 전후의 정확도와 추론 성능을 비교했습니다.

## 연구 내용

- `timm`의 ImageNet-1K 사전학습 모델인 ViT, EfficientNet, LeViT를 비교 대상으로 선정
- ImageNet validation set에서 무작위로 선택한 5,000장의 이미지로 정확도 측정
- PyTorch Profiler와 Intel i7-10700K 3.80GHz CPU 환경에서 연산량과 지연시간 분석
- Linear layer에 Dynamic Post-Training Quantization을 적용해 INT8 weight로 변환
- 양자화 전후 정확도와 CPU 추론 속도를 같은 조건에서 측정 및 비교

## 기술적 판단

동적 양자화는 입력 activation을 실행 시점에 양자화하면서 Linear layer의 weight를 INT8로 저장합니다. 별도의 재학습 없이 적용할 수 있어 여러 모델의 양자화 효과를 같은 기준에서 비교하기에 적합했습니다.

단순히 모델 하나의 전후 성능만 비교하지 않고 CNN 기반 EfficientNet과 경량 Transformer인 LeViT를 함께 측정했습니다. 이를 통해 모델 구조에 따라 양자화의 효과와 정확도·지연시간의 균형이 어떻게 달라지는지 확인했습니다.

## 결과

- 추론 속도를 약 43% 개선했습니다.
- ViT와 LeViT에서 양자화 후 지연시간이 감소하고, 정확도 감소 대비 유의미한 latency-accuracy trade-off가 나타나는 것을 확인했습니다.
- 교내 학술대회 논문을 작성하고 포스터를 발표했습니다.

![모델별 양자화 전후 실험 결과](/SeonggukPark/images/notion/vit-2.png)

![2024 KNU-EERC 포스터 발표](/SeonggukPark/images/notion/vit-4.jpg)

논문 제목은 `Optimizing Vision Transformers via Post-Training Quantization for Edge Computing`이며, 2024년 7월 교내 학술대회에서 발표했습니다.
