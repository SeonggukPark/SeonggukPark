---
title: "C++ 09. 객체지향 설계 원칙 SOLID"
description: "Notion MCP에서 직접 가져온 C++ 09. 객체지향 설계 원칙 SOLID 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2a86b9674ad8803c96aee0163ba48df1"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

## SOLID 원칙
- 로버트 C. 마틴이 2000년대 초반에 발표한 객체지향 설계의 다섯가지 원칙
- 소프트웨어의 유지보수 및 확장성에 도움이 되는 기본 원칙
# (1) 단일 책임 원칙(SRP)
- **‘****S**ingle **R**esponsibility **P**rinciple’의 약자
- **클래스는 한 가지 기능만 수행해야 하고, 한 가지 이유로만 변경해야 한다.**
- 변경 사항이 한 클래스에만 국한되는 것과 변경된 클래스가 다른 클래스에 영향을 주지 않는 것이 핵심
- 의도: 변경이 일어나도 한 영역만 수정하면 되는 구조를 만든다.

### 산탄총 수술(Shotgun surgery)
- 한 가지 기능을 수정할 때 여러 클래스를 수정해야 하는 현상

### 단일 책임 원칙 적용법
**설계 측면**
- 상속보다 컴포지션이나 어그리게이션을 적극 활용하는 방법
- 다중 상속이 많아지거나 상속이 쌓이면 클래스가 커짐
→ 다중 상속을 받았다는 것은 자식 클래스의 역할이 여러가지라는 의미
→ 다중 상속이 필요한 상황에서 컴포지션과 어그리게이션을 사용하면, 단일 책임 원칙을 지켜 수정 범위를 단일 클래스로 갇히게 할 수 있음

**리팩토링 측면**
- 클래스를 추출해 거대 클래스를 작은 단위로 나누는 방법

**→ 설계, 리팩토링에는 정답이 없으므로, 많은 훈련으로 경험 쌓는 것이 중요..**

Q. 그렇다면 다중 상속을 문법에서 없애는게 맞지 않나?
A. 물론 다중 상속을 남발하면 ‘산탄총 수술’ 현상이 발생할 수 있지만, 상속이 복잡하지 않거나 상속 세대가 깊지 않다면 다중 상속으로 간단하게 구현 가능함. 즉, 필요할 때 한정해서 사용하는 것은 좋음.

# (2) 개방/폐쇄 원칙(OCP)
- ‘**O**pen-**C**losed **P**rinciple’의 약자
- **확장에 열려있고 수정에 닫혀 있어야 한다.** → 동적 바인딩이 좋은 사례
- **의도**: 기존 코드를 건드리지 않고 기능을 추가할 수 있게 한다.

### 추상 클래스 활용
- 추상 클래스(인터페이스) 통해 OCP 구현 가**능**
- **템플릿 메서드 패턴 : **프로그램의 주요 기능은 추상 클래스로, 이를 상속받아 구현하는 클래스에 따라 세부 동작 결정 되도록, 즉 흐름의 뼈대는 템플릿, 살 붙이는 건 자식 클래스에 위임하는 패턴

```c++
// .. (생략) ..

//Monster 인터페이스
class monster
{
public:
    // 템플릿 패턴을 위한 순수 가상 함수 구현
    virtual void find_route(player& target_player) = 0;
    virtual bool attach_target(player* target_player) = 0;
    virtual void check_target(player& target_player) = 0;
    virtual void attack_special(player& target_player) = 0;
    virtual void set_location(int x, int y) { monster_body.set_location(x, y); };
    virtual ~monster() {};

// .. (생략) ..

}

//몬스터 A는 추상 클래스 Monster 클래스로부터 상속
class monster_a : public monster {
public:
    // 템플릿 패턴 구현을 위한 순수 가상 함수 오버라이딩
    virtual void find_route(player& target_player) override;
    virtual bool attach_target(player* target_player) override;
    virtual void check_target(player& target_player) override;
    virtual void attack_special(player& target_player) override;
};

// .. (생략) ..
```

# (3) 리스코프 치환 원칙(LSP)
- ‘**L**isKov **S**ubstitution **P**rinciple’의 약자
- **하위 클래스는 상위 클래스를 대체할 수 있어야 한다.**
- **의도**: 다형성이 제대로 동작하도록 보장한다.
- ‘is-a’ 관계로 정의된 클래스는 LSP를 따르는 클래스
→ 부모 클래스를 상속받아 구현한 자식 클래스는 부모 클래스로 업캐스팅이 가능하다
→ 자식 클래스에서 부모 클래스의 멤버 함수를 상속받아 오버라이딩하거나 유지해야 한다.<br>
# (4) 인터페이스 분리 원칙(ISP)
- ‘**I**nterface **S**egregation **P**rinciple’의 약자
- **인터페이스는 작고 섬세해야 하고, 클래스는 필요한 인터페이스만 구현해야 한다.**
- **의도**: 불필요한 기능 구현을 막고 인터페이스를 더 명확히 한다.
- C++ 표준에는 인터페이스 공식 정의가 없음 
→ 순수 가상 함수만으로 구성된 추상 클래스를 인터페이스로 활용

![C++ 09. 객체지향 설계 원칙 SOLID 이미지](/SeonggukPark/images/notion/notes/cpp/09-solid-1.png)
→ 인터페이스 분리 원칙 미적용 사례
→ 각 사용자가 자신이 사용하지 않는 메서드에 의존

![C++ 09. 객체지향 설계 원칙 SOLID 이미지](/SeonggukPark/images/notion/notes/cpp/09-solid-2.png)
→ 인터페이스 분리 원칙 적용 사례

# (5) 의존성 역전 원칙(DIP)
- ‘**D**ependency **I**nversion **P**rinciple’의 약자
- **상위 수준의 모듈은 하위 수준의 모듈에 의존해서는 안 되며, 상위/하위 수준 모두 추상 레이어(인터페이스)에 의존해야 한다.**
- **의도**: 모듈 간 결합도를 낮추고 테스트/확장성을 높인다.
- 개방/폐쇄 원칙 적용 위해 사용됨

![C++ 09. 객체지향 설계 원칙 SOLID 이미지](/SeonggukPark/images/notion/notes/cpp/09-solid-3.png)
→ 의존 역전 원칙 미적용 사례
→ 여름이 되어 일반 타이어로 변경할 때, 타이어 뿐만 아니라 자동차 코드도 변경해야 함

![C++ 09. 객체지향 설계 원칙 SOLID 이미지](/SeonggukPark/images/notion/notes/cpp/09-solid-4.png)
→ 의존 역전 원칙 적용 사례

