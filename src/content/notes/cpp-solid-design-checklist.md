---
title: "C++ 설계에서 SOLID를 점검하는 기준"
description: "SOLID 다섯 원칙을 정의 암기보다 변경 범위, 대체 가능성, 의존 방향이라는 실무 질문으로 정리했습니다."
publishedAt: 2026-07-24
tags: ["C++", "OOP", "Design"]
draft: false
relatedProjects: ["container-crane-automation"]
---

SOLID는 클래스를 많이 나누는 규칙이 아니라 **변경이 퍼지는 범위를 통제하기 위한 판단 기준**이다. 설계할 때는 원칙의 이름보다 아래 질문이 더 유용하다.

## SRP: 이 코드는 왜 변경되는가

단일 책임 원칙은 클래스가 반드시 함수 하나만 가져야 한다는 뜻이 아니다. 서로 다른 이유로 변경되는 코드가 한곳에 섞여 있는지를 확인하는 원칙이다.

예를 들어 센서 값을 읽고, 필터링하고, 파일로 저장하는 클래스는 하드웨어 변경·알고리즘 변경·저장 형식 변경에 모두 영향을 받는다. 다음처럼 역할의 경계를 분리하면 변경 범위를 줄일 수 있다.

```cpp
class SensorReader {
public:
    virtual int read() = 0;
    virtual ~SensorReader() = default;
};

class ValueFilter {
public:
    int apply(int value) const;
};

class DataStore {
public:
    void save(int value);
};
```

점검 질문: 요구사항 하나를 바꿨는데 관련 없는 클래스까지 연쇄적으로 수정해야 하는가?

## OCP: 새 기능이 기존 분기를 늘리는가

개방·폐쇄 원칙은 기능 확장은 가능하되, 검증된 코드를 반복해서 수정하지 않는 구조를 지향한다. 장치 종류가 추가될 때마다 `switch` 문을 고치는 대신 공통 인터페이스 뒤에 구현을 배치하는 방식이 대표적이다.

```cpp
class Output {
public:
    virtual void write(int value) = 0;
    virtual ~Output() = default;
};

class UartOutput final : public Output {
public:
    void write(int value) override;
};
```

다만 확장 가능성만 예상하고 추상화를 미리 늘리면 구조가 더 복잡해진다. 실제로 반복되는 변경 축이 보일 때 적용하는 편이 안전하다.

## LSP: 부모 타입으로 사용해도 의미가 유지되는가

리스코프 치환 원칙은 문법적인 상속보다 **행동 계약**에 관한 원칙이다. 하위 타입이 상위 타입의 입력 조건을 더 까다롭게 만들거나, 약속한 결과를 반환하지 않으면 치환할 수 없다.

점검할 항목은 세 가지다.

- 상위 타입이 허용한 입력을 하위 타입도 처리하는가
- 상위 타입이 보장한 결과를 하위 타입도 보장하는가
- 호출자가 실제 구현 타입을 확인하지 않아도 되는가

## ISP: 사용하지 않는 기능에 의존하는가

인터페이스 분리 원칙은 큰 인터페이스 하나보다 사용 목적에 맞는 작은 인터페이스를 선호한다. 읽기 전용 장치가 `write()`까지 억지로 구현한다면 인터페이스 경계가 잘못된 신호다.

```cpp
class Readable {
public:
    virtual int read() = 0;
    virtual ~Readable() = default;
};

class Writable {
public:
    virtual void write(int value) = 0;
    virtual ~Writable() = default;
};
```

## DIP: 정책이 구체적인 장치에 묶여 있는가

의존성 역전 원칙은 상위 정책과 하위 구현이 모두 추상화에 의존하도록 만든다. 제어 로직이 특정 GPIO·UART 구현을 직접 생성하면 테스트와 장치 교체가 어려워진다. 구현 객체를 외부에서 주입하면 정책을 하드웨어와 분리할 수 있다.

```cpp
class Controller {
public:
    explicit Controller(SensorReader& sensor) : sensor_(sensor) {}
    int sample() { return sensor_.read(); }

private:
    SensorReader& sensor_;
};
```

## 적용 순서

SOLID를 한 번에 모두 적용할 필요는 없다. 먼저 변경이 자주 퍼지는 지점을 찾고, 책임을 나눈 뒤, 실제 교체가 필요한 경계에만 인터페이스를 둔다. 마지막으로 테스트가 구체 구현 없이 가능한지 확인하면 과도한 추상화를 피하면서 설계의 유연성을 높일 수 있다.
