---
title: "C++ STL 컨테이너 선택 기준"
description: "vector를 기본값으로 두고 삽입 위치, 탐색 방식, 메모리 배치를 기준으로 다른 STL 컨테이너를 선택하는 방법입니다."
publishedAt: 2026-07-24
tags: ["C++", "STL", "Data Structure"]
draft: false
relatedProjects: ["air-conditioner-clustering"]
---

STL 컨테이너는 기능 목록보다 **데이터를 어떻게 읽고 수정하는지**를 기준으로 선택해야 한다. 특별한 제약이 없다면 연속 메모리와 캐시 효율이 좋은 `std::vector`에서 시작하는 것이 실용적이다.

## 빠른 선택표

| 요구사항 | 우선 검토할 컨테이너 | 이유 |
| --- | --- | --- |
| 크기가 컴파일 시점에 고정 | `std::array` | 크기가 타입에 포함되고 추가 할당이 없음 |
| 순차 저장과 임의 접근 | `std::vector` | 연속 메모리, 빠른 인덱스 접근 |
| 앞뒤 삽입·삭제가 모두 빈번 | `std::deque` | 양 끝 연산이 효율적 |
| 반복자 위치에서 삽입·삭제가 핵심 | `std::list` | 노드 연결 변경으로 처리 |
| 정렬된 키와 범위 탐색 | `std::map`, `std::set` | 일반적으로 로그 시간 탐색 |
| 키의 빠른 단건 조회 | `std::unordered_map`, `std::unordered_set` | 평균 상수 시간 탐색 |

`std::list`는 중간 삽입이 상수 시간이어도 노드를 찾는 과정과 메모리 지역성 비용이 있다. 단순히 삽입·삭제가 있다는 이유만으로 `vector`보다 유리하다고 단정하면 안 된다.

## vector에서 먼저 확인할 것

`vector`의 크기가 용량을 넘으면 더 큰 메모리를 확보하고 기존 원소를 이동한다. 최종 크기를 예상할 수 있다면 `reserve()`로 재할당 횟수를 줄일 수 있다.

```cpp
std::vector<int> samples;
samples.reserve(1024);

for (int value : input) {
    samples.push_back(value);
}
```

재할당이나 원소 삽입·삭제 후에는 기존 반복자, 포인터, 참조가 무효화될 수 있다. 컨테이너를 수정한 뒤 오래 보관한 반복자를 다시 사용하는 코드는 특히 주의한다.

## 반복자는 알고리즘과 컨테이너를 잇는다

표준 알고리즘은 컨테이너 자체가 아니라 반복자 범위를 받는다. 같은 처리 코드를 여러 컨테이너에 재사용할 수 있는 이유다.

```cpp
const auto found = std::find(samples.cbegin(), samples.cend(), target);

if (found != samples.cend()) {
    const auto index = std::distance(samples.cbegin(), found);
}
```

탐색 전에 정렬되어 있다면 `std::binary_search`나 `std::lower_bound`를 사용할 수 있다. 정렬 비용을 한 번 지불하고 탐색을 여러 번 수행하는 상황에 적합하다.

```cpp
std::sort(samples.begin(), samples.end());
const bool exists = std::binary_search(samples.begin(), samples.end(), target);
```

## 선택 전에 답할 질문

1. 원소 수가 고정인가, 계속 변하는가?
2. 가장 빈번한 연산은 순회·탐색·삽입·삭제 중 무엇인가?
3. 삽입과 삭제는 앞, 뒤, 중간 중 어디에서 일어나는가?
4. 정렬 순서가 필요한가, 키의 빠른 조회만 필요한가?
5. 반복자와 참조의 안정성이 중요한가?

복잡도 표는 출발점일 뿐이다. 임베디드 환경에서는 할당 횟수와 메모리 예측 가능성도 함께 측정해야 최종 선택을 내릴 수 있다.
