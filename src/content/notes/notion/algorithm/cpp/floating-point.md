---
title: "실수 연산"
description: "C++ 실수 연산의 형 변환, 반올림과 정수 변환 방법을 정리합니다."
publishedAt: 2026-07-26
tags: ["Algorithm", "C++", "Math"]
draft: true
source: "https://app.notion.com/p/3a86b9674ad880099756c070d2d17ca9"
importedAt: 2026-07-26
---

> Notion Study 페이지의 Algorithm 학습 기록에서 가져온 콘텐츠입니다.

- `(ll)(dist_acc * e)` 처럼 바로 정수형으로 캐스팅하면 **소수점 아래를 무조건 버리는(내림)** 효과
- `std::round(double)` : 가장 가까운 정수로 반올림해 `double` 을 돌려줍니다.
- `std::llround(double)`: 반올림 뒤 `long long` 으로 바로 반환합니다.
