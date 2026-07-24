---
title: "C++ 16. 새로운 구문 2"
description: "Notion MCP에서 직접 가져온 C++ 16. 새로운 구문 2 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2de6b9674ad88062ad06c5747e832a2a"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

# (1) 폴드 표현식
- C++17에서 도입
- 매개변수 팩을 반복해서 계산해줌

### 매개변수 팩
- C++11에서 도입
- 개수가 정해지지 않은 템플릿 인자들의 묶음
```c++
#include <iostream>

using namespace std;

// 매개변수 팩을 이용한 가변 인자 템플릿 – 말단 함수용
template<typename doll>
// 매개변수 팩의 마지막 인자를 연산 하기 위한 함수
void find_doll(doll doll_name) {
    cout << "'" << doll_name << "' is ";
}

// 매개변수 팩을 이용한 가변 인자 템플릿 – 재귀 함수 용
template<typename doll, typename... dolls>
// find_dell 함수 오버로딩
void find_doll(doll doll_name, dolls... doll_list) {
    cout << "inside '" << doll_name << "', ";
    // 재귀 호출
    find_doll(doll_list...);

}

int main() {
    cout << "First Matryoshka ";
    // 가변 인자로 함수 호출
    find_doll("Large", "Medium", "Small");
    cout << "exists." << endl << endl;

    cout << "Second Matryoshka ";
    // 가변 인자로 함수 호출
    find_doll("Extra Large", "Large", "Medium", "Small", "Extra Small");
    cout << "exists." << endl;

    return 0;
}

```
![C++ 16. 새로운 구문 2 이미지](/SeonggukPark/images/notion/notes/cpp/16-new-syntax-2-1.png)

### 폴드 표현식
- 매개변수 팩 쉽게 사용할 수 있도록 해줌
```c++
// [기본 폴드 표현식 형태]
(매개변수_팩_이름_연산자 ...)

// [예제]
#include <iostream>

using namespace std;

template<typename doll>
doll show_doll(doll doll_name) {
    return "'" + doll_name + "' inside ";
}

template<typename... dolls>
string find_doll(dolls... doll_list) {
    // Using a fold expression
    return (show_doll(doll_list) + ...);
}

int main() {
    cout << "First Matryoshka ";
    cout << find_doll(string("Large"), string("Medium"), string("Small"));
    cout << "exists." << endl << endl;

    cout << "Second Matryoshka ";
    cout << find_doll(string("Extra Large"), string("Large"), string("Medium"), string("Small"),string("Extra Small"));
    cout << "exists." << endl;

    return 0;
}
```
![C++ 16. 새로운 구문 2 이미지](/SeonggukPark/images/notion/notes/cpp/16-new-syntax-2-2.png)

- 유형별 연산 순서
![C++ 16. 새로운 구문 2 이미지](/SeonggukPark/images/notion/notes/cpp/16-new-syntax-2-3.png)
→ 뺄셈, 나눗셈 등의 연산은 순서에 따라 결과가 달라짐
```c++
#include <iostream>
using namespace std;

// Unary left fold expression
template<typename... numbers>
double unary_left(numbers... num_list) {
    return (... / num_list );
}

// Unary right fold expression
template<typename... numbers>
double unary_right(numbers... num_list) {
    return (num_list / ...);
}

// Binary left fold expression
template<typename... numbers>
double binary_left(numbers... num_list) {
    return (10.0 / ... / num_list);
}

// Binary right fold expression
template<typename... numbers>
double binary_right(numbers... num_list) {
    return (num_list / ... / 10.0);
}

int main() {

    cout << "Unary left fold expression: " <<
         unary_left(1.0, 2.0, 3.0, 4.0, 5.0, 6.0) << endl;

    cout << "Unary right fold expression: " <<
         unary_right(1.0, 2.0, 3.0, 4.0, 5.0, 6.0) << endl;

    cout << "Binary left fold expression: " <<
         binary_left(1.0, 2.0, 3.0, 4.0, 5.0, 6.0) << endl;

    cout << "Binary right fold expression: " <<
         binary_right(1.0, 2.0, 3.0, 4.0, 5.0, 6.0) << endl;

    return 0;
}
```
![C++ 16. 새로운 구문 2 이미지](/SeonggukPark/images/notion/notes/cpp/16-new-syntax-2-4.png)

# (2) 3방향 비교 연산자
- C++ 20에서 도입
- 모양 때문에 ‘우주선 연산자’라고도 함
```c++
a <=> b
```
→ `a < b` 이면 **음수**
→ `a == b` 이면 **0**
→ `a > b` 이면 **양수**

```c++
#include <iostream>
#include <compare>
using namespace std;

struct _tag {
    int number;
    char alphabet;
    auto operator<=>(const _tag& object) const {
        return number <=> object.number;
    }
};

using DATA = struct _tag;

DATA data_element[5] = { {4, 'a'}, {1, 'c'}, {8, 'b'}, {2, 'z'}, {4, 'd'} };

int main() {

    cout << boolalpha << "Element 0 is greater than element 3: ";
    cout << ((data_element[0] <=> data_element[3]) > 0) << endl;

    cout << "Element 1 is greater than element 2: ";
    cout << (data_element[1] > data_element[2]) << endl;

    return 0;
}

```
![C++ 16. 새로운 구문 2 이미지](/SeonggukPark/images/notion/notes/cpp/16-new-syntax-2-5.png)

### 반환 타입
![C++ 16. 새로운 구문 2 이미지](/SeonggukPark/images/notion/notes/cpp/16-new-syntax-2-6.png)

# (3) using 키워드
### 상속 멤버의 접근 지정자 변경
- 자식 클래스에서 부모 클래스의 멤버 접근 지정자 변경시 사용
```c++
#include <iostream>
using namespace std;

...

//기본 Monster 클래스
class monster {
public:
    monster() {};

protected:
    void get_damage(int _damage) {};
    void attack(player target_player) {};
    void attack_special(player target_player);
};

void monster::attack_special(player target_player) {
    cout << "Basic attack : Damage - 10 hp" << endl;
}

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster, character {
public:
    using monster::get_damage;
private:
    //상속받은 함수 오버라이딩
    void attack_special(player target_player);
};

...

int main() {
    monster_a mon_1;
    monster_b mon_2;

    mon_1.get_damage(100);
    // 아래 코드는 오류가 발생합니다.
    // mon_2.get_damage(100);

    return 0;
}

```
→ monster_a는 using으로 get_damage의 접근 수준을 public으로 → 외부(main)에서 호출 가능
→ monster_b는 여전히 protected → 외부(main)에서 호출 불가

### 열거형 사용 선언
- 열거형 선언을 구조체나 클래스 내부에 있는 데이터 형식처럼 사용 가능
```c++
#include <iostream>
using namespace std;

enum class weapon : int { gun, arrow, machine_gun };

class monster {
public:
  weapon weapon_type;
};

struct weapon_class {
  using enum weapon;
};

int main() {
  monster monster_obj;
  weapon_class weapon_obj;

  monster_obj.weapon_type = weapon::gun;
  monster_obj.weapon_type = weapon_obj.arrow;
  monster_obj.weapon_type = weapon_class::machine_gun;
 
  return 0;
}
```
→ enum class: 기본적으로 weapon::gun처럼 접근해야 함
→ weapon enum class에 정의된 모든 열거자를 weapon_class의 멤버처럼 끌어옴. 즉,
```c++
struct weapon_class {
  using enum weapon;
};

// 아래와 동치

struct weapon_class {
  static constexpr weapon gun = weapon::gun;
  static constexpr weapon arrow = weapon::arrow;
  static constexpr weapon machine_gun = weapon::machine_gun;
};
```

### 별칭 만들기
```c++
// [사용법]
using 별칭 = 식별자

// [예제]
struct _tag {
  int number;
  char alphabet;
  auto operator<=>(const _tag& object) const {
    return number <=> object.number;
  }
};

using DATA = struct _tag;
```

# (4) 함수 키워드 (default, delete, override, final)
## default
- 컴파일러가 제공하는 기본 함수를 사용하겠다는 의미
- 기본 생성자를 사용하다가 매개변수를 포함하는 생성자 추가시, 기본 생성자 사용 불가능
→ 기존 기본 생성자가 호출되는 기존 코드에 문제 발생
→ 이를 막기위해 사용 가능
```c++
class A {
public:
    A() = default;                 // 기본 생성자
    A(const A&) = default;         // 복사 생성자
    A& operator=(const A&) = default; // 복사 대입
};
```

## delete
- 특정 함수의 사용을 컴파일 타임에 금지
- 그냥 함수를 삭제하면 이름이 바뀌거나 누락된걸로 오해 가능
→ 의도 파악 명확하게 하기 위해 삭제되었음을 확실하게 알려줌
![C++ 16. 새로운 구문 2 이미지](/SeonggukPark/images/notion/notes/cpp/16-new-syntax-2-7.png)
![C++ 16. 새로운 구문 2 이미지](/SeonggukPark/images/notion/notes/cpp/16-new-syntax-2-8.png)
→ 두 경우에 대한 오류 메세지가 다름

## override
- 가상 함수 재정의(오버라이딩)를 명시적으로 보장

## final
- 더 이상 재정의 또는 상속을 금지
- 클래스, 가상함수는 가능하나 일반 함수에는 사용 X
```c++
// [클래스]
class A final {
};

class B : public A { }; // ❌ 컴파일 에러

// [가상 함수]
class Base {
public:
    virtual void foo() final;
};

class Derived : public Base {
public:
    void foo() override; // 컴파일 에러
};
```

