---
title: "새 C++ 코드에서 지키는 모던 C++ 기준선"
description: "RAII, 값 의미론, 스마트 포인터와 표준 컨테이너를 중심으로 새 C++ 코드의 기본 작성 원칙을 정리했습니다."
publishedAt: 2026-07-24
tags: ["C++", "Modern C++", "RAII"]
draft: false
relatedProjects: ["air-conditioner-clustering"]
---

모던 C++의 핵심은 새로운 문법을 많이 사용하는 것이 아니라 **자원 수명과 소유권을 코드 구조로 표현하는 것**이다. 새 코드를 작성할 때 다음 항목을 기본값으로 삼는다.

## 직접 해제보다 RAII

메모리, 파일, 잠금 같은 자원은 객체의 수명에 묶는다. 생성 시 획득하고 소멸 시 해제하면 중간 반환이나 예외가 발생해도 정리 경로를 따로 관리할 필요가 없다.

```cpp
void update() {
    std::lock_guard<std::mutex> lock(state_mutex);
    // 범위를 벗어나면 자동으로 unlock
}
```

동적 객체가 필요하면 소유권부터 결정한다.

- 단독 소유: `std::unique_ptr`
- 공유 소유가 실제로 필요: `std::shared_ptr`
- 소유하지 않는 접근: 참조, 포인터, `std::span`

`shared_ptr`은 편리하지만 소유 관계를 흐리고 순환 참조를 만들 수 있으므로 기본값으로 사용하지 않는다.

## 배열보다 표준 컨테이너

고정 길이는 `std::array`, 가변 길이는 `std::vector`를 우선 검토한다. 크기 정보와 반복자를 함께 제공하므로 원시 포인터와 길이를 따로 전달할 때보다 경계가 명확하다.

```cpp
int average(std::span<const int> values) {
    if (values.empty()) return 0;

    const int sum = std::accumulate(values.begin(), values.end(), 0);
    return sum / static_cast<int>(values.size());
}
```

## null과 실패 가능성을 타입으로 표현

널 포인터는 `0`이나 `NULL` 대신 `nullptr`를 사용한다. 값이 없을 수 있다면 별도 플래그보다 `std::optional<T>`가 의도를 더 잘 드러낸다.

```cpp
std::optional<int> find_channel(std::string_view name);

if (const auto channel = find_channel("motor")) {
    configure(*channel);
}
```

## 추론은 타입을 숨기지 않을 때만

`auto`는 반복자나 긴 템플릿 타입처럼 우변에서 타입이 분명할 때 유용하다. 단위, 부호, 정밀도처럼 타입 자체가 의미를 전달한다면 명시적으로 작성한다.

```cpp
const auto it = devices.find(id);  // 결과 타입이 명확함
std::uint32_t timeout_ms = 500;    // 단위와 범위가 중요함
```

## 이동은 최적화보다 소유권 전달

이동 시맨틱은 복사를 무조건 빠르게 만드는 주문이 아니다. 더 이상 사용하지 않을 객체의 자원을 다른 객체로 넘긴다는 의미다. `std::move` 이후 객체는 유효하지만 값은 특정할 수 없으므로, 재할당하거나 소멸시키는 용도로만 다루는 편이 안전하다.

## 기준선 체크리스트

- `new`와 `delete`가 애플리케이션 코드에 직접 나타나는가?
- 소유하는 포인터와 관찰만 하는 포인터가 구분되는가?
- 범위와 크기를 원시 포인터와 별도 정수로 전달하고 있지는 않은가?
- 실패와 값 부재가 반환 타입에 표현되는가?
- `const`, 범위 기반 `for`, 표준 알고리즘으로 의도를 더 분명하게 만들 수 있는가?

버전별 기능을 모두 도입하는 것보다 이 기준선을 일관되게 지키는 편이 안전성과 유지보수성에 더 큰 차이를 만든다.
