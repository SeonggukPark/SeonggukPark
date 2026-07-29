---
title: "C++ 08. 객체지향을 돕는 기능"
description: "컴포지션·어그리게이션, 가상 함수와 동적 바인딩을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2a86b9674ad880dda3bef139b8513060"
importedAt: 2026-07-24
---

# (1) 컴포지션과 어그리게이션
## 다중 상속(multi inheritance)
- 부모 클래스를 여러 개 상속받아 자식 클래스를 정의하는 것
- 부모 클래스 개발 시 안정적이고 견고한 디자인 패턴을 적용해 두면, 자식 클래스에도 개발 방법론이나 구조를 탄탄하게 전파 가능
- 그러나, 다중 상속이 많아질수록 여러 문제 발생 가능

### 클래스가 커지는 문제
- 클래스가 다양한 역할을 수행하는 거대 클래스(large class)는 지양해야 하는 문제
- 부모 클래스 일부가 변경되면 상속 받은 모든 클래스에 영향을 줌
- 상속, 사용관계로 인해 의존도가 높아지는 걸 **결합도(couplinc)****가 높다고 함**
→ 결합도는 낮을수록 유지/보수 수월
- 거대 클래스는 결합도를 높이는 주요 원인

### 컴파일 시간이 늘어나는 문제
- 상속 관계가 복잡하고 다중 상속이 복잡하게 엉켜 있으면 컴파일에 많은 시간이 소요됨

- 다중 상속으로 코드 재사용하는 것이 아닌, 재사용할 속성과 기능을 별도 클래스로 분리 후 이 클래스를 멤버 변수로 포함하는 것이 **컴포지션, 어그리게이션**

## 컴포지션(Composition)
- 어그리게이션과 마찬가지로, 클래스가 가져야 할 특징을 상속 받는 것이 아닌, **멤버 변수로 포함**하는 개념
- **part-of 관계**: 별도 분리한 클래스의 객체가 **멤버 변수**로 포함한 클래스에 종속
→ 포함한 클래스에서 생명 주기를 직접 관리
→ 논리적으로 완전한 포함 관계로, 두 클래스의 생명 주기는 **같음**
- 다형성(자식 클래스가 부모 클래스 완전 대체) 구현에도 상속보다 유리
```c++
#include <iostream>
using namespace std;

// 캐릭터의 특성을 가지고 있는 캐릭터 클래스
class character {
/// .. (생략) ..
};

//Monster 클래스
class monster {
/// .. (생략) ..
};

//몬스터 A는 monster, charactoer 클래스를 컴포지션으로 포함
class monster_a {
/// .. (생략) ..
private:
    character main_body;
    monster main_role;
};

int main() {
    /// .. (생략) ..

    // 컴포지션을 객체와 생명주기가 같아 객체에서 직접 생성
    monster_a forest_monster;

  // .. (생략) ..
    return 0;
}
```

Q. 상속과 컴포지션은 각각 어떤 경우에 사용?
A.
상속
- 부모 타입을 자식 타입이 치환할 수 있고 (is-a)
- 부모 인터페이스를 기반으로 다형성이 필요한 경우

컴포지션
- 객체의 기능을 독립된 단위로 분리하여 조합하거나 (has-a)
- 유연한 구조를 만들 때 사용

## 어그리게이션(Aggregation)
- 컴포지션과 마찬가지로, 클래스가 가져야 할 특징을 상속 받는 것이 아닌, **멤버 변수로 포함**하는 개념
- 컴포지션과 달리, 분리된 클래스 객체를 **포인터나 레퍼런스 변수**로 포함
- **has-a 관계: **분리된 클래스를 사용하는 개념
→ 두 클래스의 생명 주기는 **다름**
- 분리된 클래스를 직접 참조하거나 해당 클래스를 상속받은 자식 클래스도 참조 가능
```c++
#include <iostream>
using namespace std;

// 캐릭터의 특성을 가지고 있는 캐릭터 클래스
class character {
/// .. (생략) ..
};

//Monster 클래스
class monster {
/// .. (생략) ..
};

//몬스터 B는 monster, charactoer 클래스를 어그리게이션으로 포함
class monster_b {
public:
    // 레퍼런스 멤버 변수는 초기화 리스트로 초기화 진행
    monster_b(character& ref_character, monster& ref_monster)
            : main_body(ref_character), main_role(ref_monster) {};
    void attack(player target_player) {
        main_role.attack(target_player);
    };
private:
    character& main_body;
    monster& main_role;
};

int main() {
/// .. (생략) ..

    // 어그리게이션을 위해서 외부의 객체의 참조를 전달
    monster_b tutorial_monster(chararater_obj, monster_obj);
    monster_b urban_monster(chararater_obj, monster_new_obj);

/// .. (생략) ..
    return 0;
}
```

# (2) 가상 함수와 동적 바인딩
## 가상함수
- 객체지향에서 다형성을 구현하는 데 필요
- 멤버 함수 가운데 자식 클래스에서 오버라이딩해야 하는 함수는 가상 함수로 재정의
```c++
[가상 함수 선언]
virtual 반환_형식 함수_이름(매개변수);

[가상 함수 오버라이딩 선언]
virtual 반환_형식 함수_이름(매개변수) override; // 마지막 override는 생략 가능

[예시]
class monster{
public:
void attack(player target_player) {};
virtual void attack_special(player target_player); // 가상 함수 선언
};

void monster::attack_special(player target_player) { .. } // 가상 함수 정의

class monster_c : public monster {
public:
void attack_special(player target_player) override; // 가상 함수 오버라이드 선언
};

void monster_c::attack_special(player target_player) { .. } // 가상 함수 오버라이딩
```

- 가상 함수 사용하지 않고 함수 오버라이딩 하면 업캐스팅 후 부모의 멤버함수가 호출 됨

## 바인딩
- 프로그램 실행 시 함수 호출이나 변수 참조가 해당 코드와 연결되는 것

### 정적 바인딩 (static binding)
- 이른 바인딩 (early binding) 이라고도 함
- 컴파일 시점에 동작 → 프로그램 실행 중 그대로 유지
- C++은 auto 외에는 형식 추론을 안함
→ 일반 변수, 함수, 클래스, 정적 멤버 함수, 템플릿 등 대부분은 정적으로 바인딩
- 실제 메모리 주소를 고정하는 게 아니라, 바인딩 대상이 있는 위치를 고정하는 것

### 동적 바인딩 (dynamic binding)
- 늦은 바인딩 (late binding) 이라고도 함
- 런타임에 결정
- C++의 가상 함수, 자식 클래스로 치환된 부모 클래스의 포인터가 동적으로 바인딩
- 동적 바인딩 된 함수는 호출 대상이 바뀔수 있음 → 바인딩 대상이 계속 변경 가능

```c++
#include <iostream>
using namespace std;

class character {
public:
    character() : hp(100), power(100)
    {};
    void get_damage(int _damage) {};

protected:
    int hp;
    int power;
};

//Player 클래스
class player : public character {
public:
    player() {};
};

//기본 Monster 클래스
class monster {
public:
    monster() {};
    virtual void attack_special(player target_player);
};

void monster::attack_special(player target_player) {
    cout << "기본 공격 : 데미지 - 10 hp" << endl;
}

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster, character {
public:
    //상속받은 함수 오버라이딩
    virtual void attack_special(player target_player) override;
};

void monster_a::attack_special(player target_player) {
    cout << "인텡글 공격 : 데미지 - 15 hp" << endl;
}

int main() {
    player player_1;

    monster mother_monster;
    monster_a forest_monster;

    mother_monster.attack_special(player_1);

    monster* mon = &forest_monster;
    cout << endl << "부모 클래스로 업케스팅 후 공격" << endl;
    mon->attack_special(player_1);

    mon = &mother_monster;
    cout << endl << "부모 클래스로 공격" << endl;
    mon->attack_special(player_1);

    return 0;
}
```
![C++ 08. 객체지향을 돕는 기능 이미지](/SeonggukPark/images/notion/notes/cpp/08-oop-helpers-1.png)
→ 부모 클래스의 객체인 mother_monster로 멤버 함수 직접 호출 시 정적 바인딩 함수 호출
→ 클래스 포인터 mon으로 호출 시 동적 바인딩 함수 호출

### 가상 함수 테이블
- 가상 함수가 있는 클래스로 객체를 생성
→ 메모리에 _vfptr이라는 가상함수 테이블을 가리키는 포인터 자동 생성
→ 객체가 가상 함수 호출 시 _vfptr 사용
- 클래스 계층 구조에서 최상위 클래스에만 존재
→ 자식 클래스는 부모의 가상 함수 테이블 상속 받음

![C++ 08. 객체지향을 돕는 기능 이미지](/SeonggukPark/images/notion/notes/cpp/08-oop-helpers-2.png)

### 순수 가상 함수 (pure virtual function)
- 부모 클래스에서 가상 함수를 선언만 하고** 자식 클래스에서 정의하도록 강제**하는 것
- 즉, **오버라이딩을 강제 하는 것**
- 자식 클래스에서 다시 상속받는 클래스에서 정의하게 하려면 다시 자식 클래스에서 순수 가상함수로 선언
```c++
[순수 가상 함수 선언]
virtual void attack_special(player target_player) = 0;
```
→ 클래스에서 가상 함수 선언만 하면 오류 발생 → 마지막에 ‘= 0’ 추가

```c++
[잘못된 코드]
#include <iostream>
#include <list>
using namespace std;

// .. (생략) ..

//기본 Monster 클래스
class monster {
public:
    monster() {};
    void attack(player target_player) {};
    virtual void attack_special(player target_player);
    virtual void attack_at_dawn() = 0; // 순수 가상 함수로 선언
};

void monster::attack_special(player target_player) {
    cout << "기본 공격 : 데미지 - 10 hp" << endl;
}

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster, character {
public:
    //상속받은 함수 오버라이딩
    virtual void attack_special(player target_player) override;
};

void monster_a::attack_special(player target_player) {
    cout << "인텡글 공격 : 데미지 - 15 hp" << endl;
}

//몬스터 B는 기본 Monster 클래스로부터 상속
class monster_b : public monster, character {
public:
    //상속받은 함수 오버라이딩
    virtual void attack_special(player target_player) override;
};

void monster_b::attack_special(player target_player) {
    cout << "가상 공격 : 데미지 - 0 hp" << endl;
}

//몬스터 C는 기본 Monster 클래스로부터 상속
class monster_c : public monster, character {
public:
    //상속받은 함수 오버라이딩
    virtual void attack_special(player target_player) override;
};

void monster_c::attack_special(player target_player) {
    cout << "강력 뇌전 공격 : 데미지 - 100 hp" << endl;
}

int main() {
    list<monster*> mon_list;

    monster_a first_monster;
    mon_list.push_back(&first_monster);

    monster_b second_monster;
    mon_list.push_back(&second_monster);

    monster_c third_monster;
    mon_list.push_back(&third_monster);

    for (auto item : mon_list) {
        item->attack_at_dawn();
    }

    return 0;
}
```
![C++ 08. 객체지향을 돕는 기능 이미지](/SeonggukPark/images/notion/notes/cpp/08-oop-helpers-3.png)
→ 순수 가상 함수를 정의하지 않아 추상 클래스를 인스턴스화 할 수 없다는 에러 발생

```c++
#include <iostream>
#include <list>
using namespace std;

// .. (생략) ..

//기본 Monster 클래스
class monster {
public:
    monster() {};
    void attack(player target_player) {};
    virtual void attack_special(player target_player);
    virtual void attack_at_dawn() = 0;
};

void monster::attack_special(player target_player) {
    cout << "기본 공격 : 데미지 - 10 hp" << endl;
}

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster, character {
public:
    //상속받은 함수 오버라이딩
    virtual void attack_special(player target_player) override;
    virtual void attack_at_dawn() override;
};

void monster_a::attack_at_dawn() {
    cout << "동쪽에서 기습!" << endl;
}

void monster_a::attack_special(player target_player) {
    cout << "인텡글 공격 : 데미지 - 15 hp" << endl;
}

//몬스터 B는 기본 Monster 클래스로부터 상속
class monster_b : public monster, character {
public:
    //상속받은 함수 오버라이딩
    virtual void attack_special(player target_player) override;
    virtual void attack_at_dawn() override;
};

void monster_b::attack_special(player target_player) {
    cout << "가상 공격 : 데미지 - 0 hp" << endl;
}

void monster_b::attack_at_dawn() {
    cout << "적진에 조용히 침투하여 방화!" << endl;
}

//몬스터 C는 기본 Monster 클래스로부터 상속
class monster_c : public monster, character {
public:
    //상속받은 함수 오버라이딩
    virtual void attack_special(player target_player) override;
    virtual void attack_at_dawn() override;
};

void monster_c::attack_special(player target_player) {
    cout << "강력 뇌전 공격 : 데미지 - 100 hp" << endl;
}

void monster_c::attack_at_dawn() {
    cout << "남쪽에서 적진을 향해 대포 발사!" << endl;
}

int main() {
    list<monster*> mon_list;

    monster_a first_monster;
    mon_list.push_back(&first_monster);

    monster_b second_monster;
    mon_list.push_back(&second_monster);

    monster_c third_monster;
    mon_list.push_back(&third_monster);

    for (auto item : mon_list) {
        item->attack_at_dawn();
    }

    return 0;
}
```
![C++ 08. 객체지향을 돕는 기능 이미지](/SeonggukPark/images/notion/notes/cpp/08-oop-helpers-4.png)
→ 모든 자식 클래스에서 순수 가상 함수를 오버라이딩 해서 정상 실행 됨

### 가상 소멸자
- 부모 클래스로 업캐스팅 하면 자식 클래스의 소멸자가 호출되지 않음
```c++
#include <iostream>
using namespace std;

//기본 Monster 클래스
class monster {
public:
    monster();   // 생성자
    ~monster();  // 소멸자
private:
    int* dummy;
}

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster {
public:
    monster_a();
    ~monster_a();
private:
    int* dummy_a;
};

int main() {
    monster* mon = new monster_a();    // 부모 클래스로 업캐스팅
    delete mon;
    return 0;
}
```
![C++ 08. 객체지향을 돕는 기능 이미지](/SeonggukPark/images/notion/notes/cpp/08-oop-helpers-5.png)
→ 원래라면 자식 소멸자 호출 후 부모 소멸자가 호출 되어야 하지만, 업캐스팅 시 부모 클래스의 소멸자가 호출되어 메모리를 바로 해제 
→ 자식 클래스 메모리 누수 발생

- 위 문제 해결을 위해 **가상 소멸자** 사용
- 클래스의 생성자와 소멸자는 특별한 함수
→ 자식 클래스에서 정의한 생성자, 소멸자는 이름이 달라도 부모 클래스의 생성자와 소멸자를 재정의한 것으로 여김
→ 소멸자를 가상 함수로 정의하면 업캐스팅 상황에서도 자식 클래스의 소멸자 호출 가능
```c++
#include <iostream>
using namespace std;

//기본 Monster 클래스
class monster {
public:
    monster();
    //~monster();
    virtual ~monster();
private:
    int* dummy;
};

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster {
public:
    monster_a();
    //~monster_a();
    virtual ~monster_a();
private:
    int* dummy_a;
};

int main() {
    monster* mon = new monster_a();   // 부모 클래스로 업캐스팅
    delete mon;
    return 0;
}
```
![C++ 08. 객체지향을 돕는 기능 이미지](/SeonggukPark/images/notion/notes/cpp/08-oop-helpers-6.png)

# (3) 추상 클래스와 정적 클래스 멤버
## 추상 클래스
- 클래스에 순수 가상 함수를 포함하면 추상 클래스라 함 (인터페이스 라고도 함)
- 객체 직접 생성 X
- 자식 클래스에서 순수 가상 함수를 반드시 오버라이딩 해야함
- 객체지향의 다형성 구현할 때 사용 <br>→ 추상 클래스에 특정 역할의 함수만 선언하고, 여러 자식 클래스에서 각자의 알고리즘으로 동작하도록 정의

```c++
//추상 클래스 Monster
class monster {
public:
    monster();             // 생성자
    virtual ~monster();    // 소멸자
    virtual void find_route() = 0;                            // 순수 가상 함수
};

//몬스터 A는 추상 클래스 Monster 클래스로부터 상속
class monster_a : public monster {
public:
    virtual void find_route() override;   // 순수 가상 함수 오버라이드 선언
};

// 추상 클래스의 순수 가상 함수 구현
void monster_a::find_route() {
    cout << "깊이 우선 탐색(DFS)" << endl;
}

//몬스터 B는 추상 클래스 Monster 클래스로부터 상속
class monster_b : public monster {
public:
    virtual void find_route() override;
};

void monster_b::find_route() {
    cout << "너비 우선 탐색(BFS)" << endl;
}
```

### 전략 패턴
- 같은 기능을 다른 알고리즘으로 정의하고 싶을 때 각각을 캡슐화 → 교체할 수 있도록 하는 것
- 유지 보수성 ↑, 새 알고리즘 추가 용이

- 추상 클래스는 전략 패턴 외에도 여러 디자인 패턴에 활용 가능

##  정적 멤버
- 클래스의 멤버 변수, 멤버 함수 선언 할 때 static 키워드를 사용하면 정적 멤버
- 클래스에 속하지만 인스턴스에 독립적
→ 메모리에 한 번만 할당되어 모든 인스턴스가 공유 가능
- 접근 지정자로 사용 범위 통제 가능
- 클래스로 캡슐화 → 소속 파악 쉬움
- 정적 멤버 변수는 클래스 안에서 선언, 밖에서 초기화 해야함 → 클래스 내부는 일종의 템플릿
```c++
[멤버 변수, 멤버 함수 사용]
class_name::static_variable = 10;
class_name::static_function();

[정적 멤버]
class monster {
public:
static monster* create_monster(); // 정적 멤버 함수 선언
static int mon_count; // 정적 멤버 변수 선언
};

// 정적 멤버 변수 초기화
int monster::mon_count = 0;
```

- 정적 멤버 변수 → 모든 객체가 공유해야 할 때
- 정적 멤버 함수 → 클래스 객체를 클래스 내부에서 관리하고 싶을때, or 유틸리티 함수 만들 때 
- 유틸리티 함수: 문자열 조작, 날짜/시간 계산, 수학 계산 등 특정 작업 지원하는 함수
- 정적 멤버 변수만 접근 가능하므로 매개변수로 객체를 입력받아야 함
- 정적 멤버로만 구성된 클래스를 보통 ‘정적 클래스’라고 함
