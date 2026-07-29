---
title: "C++ 13. 모던 C++에 추가된 기능"
description: "C++11부터 C++23까지의 주요 변화와 현대적 C++ 관점을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2de6b9674ad8800d8345e965ef4012e5"
importedAt: 2026-07-24
---

# (1) C++ 버전별 주요 특징
- C++98에서 C++의 기본 골격 확립 (C++03은 C++98의 결함 수정판)
- C++11부터 3년 단위로 표준 제정 → 기차 모델(train model)

### C++11
- Modern C++의 시작 (가장 큰 변화)
- `auto` 타입 추론
- 범위 기반 for문
- 람다 표현식
- 스마트 포인터 (`unique_ptr`, `shared_ptr`)
- 이동 시맨틱 (`&&`, `std::move`)
- `nullptr`
- `constexpr` (초기 버전)
- 표준 멀티스레딩 (`thread`, `mutex`)
- 균일 초기화 `{}`

### C++14
- C++11의 개선
- 함수 반환 타입 `auto`
- 람다 캡처 확장
- `make_unique`
- `constexpr` 제약 완화

### C++17
- 대규모 변경
- 구조적 바인딩
- `if / switch` initializer
- `std::optional`, `std::variant`, `std::any`
- `std::filesystem`
- `string_view`
- `constexpr` 대폭 강화

### C++20
- 현대 언어로의 탈바꿈
- Concepts (템플릿 제약)
- Ranges
- Coroutine
- 함수를 멈췄다가 멈춘 부분 다음부터 다시 호출 가능한 루틴
- 일반적인 함수: Sub-routine
- Modules
- `std::span`
- `std::format`
- 거의 모든 영역에서 `constexpr` 가능

### C++23
- C++20의 보완 (코로나 이슈)
- `std::expected`
- `if consteval`
- Ranges / constexpr 추가 확장
- 라이브러리 및 알고리즘 개선
# (2) 현대적 관점의 C++
- C++의 시작은 C언어 + 객체 지향이었으나, 현재는 모던 C++이 최신 환경에 적합
- CppCon2015의 [\<Stop Teaching C\>](https://www.youtube.com/watch?v=YnWhqhNdYyk&t=11s) 참조
- char\* 대신 string, \[\]array 대신 vector\<\> 사용
- 포인터 대신 레퍼런스 사용
- 메모리 직접 관리하지 말고, RAII (Resource Acquisition Is Initialization) 사용
