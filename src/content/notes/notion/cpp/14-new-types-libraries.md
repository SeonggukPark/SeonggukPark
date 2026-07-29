---
title: "C++ 14. 새로운 데이터 형식과 라이브러리"
description: "형식 연역, 열거형, constexpr과 새로운 표준 기능을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2de6b9674ad880dd87dad30309f1d828"
importedAt: 2026-07-24
---

# (1) 형식 연역, 열거형, 수학 상수, 널 포인터, 2진수 표현
### auto
- 모던 C++에서 형식 추론은 **형식 연역**이라는 단어 사용
- auto는 placeholder 형식 지정자
- auto는 다른 언어의 형식 추론보다 제약 사항이 많음
1\] auto 변수는 반드시 선언과 함께 초기화 되어야 함
2\] 함수에서 매개변수의 형식 지정자로 사용 X
3\] 구조체나 클래스의 멤버로 사용 X
4\] auto 변수를 반환하는 함수 → dctltype 사용해야

Q. auto가 엄청 편리한데, 모두 auto로 선언하면 안되는지?
A. 자료형 추론 → 내부의 많은 연산 요구하므로 성능 저하가 필연적으로 발생 → 제한적으로 써야함

### decltype
- auto와 마찬가지로 형식 연역 가능
- auto는 주로 변수 선언 & 초기화, decltype은 변수 선언 뿐만 아니라 함스 템플릿, 클래스 템플릿에서 반환값의 형식을 연역할 때도 사용 가능
- 함수 반환값 형식 연역 시 반드시 후행 반환 형식으로 decltype을 지정해야 함
- **템플릿을 활용하는 모던 C++에서 많이 사용하므로, 템플릿 자유자재로 쓰려면 깊게 공부해야 함**
![C++ 14. 새로운 데이터 형식과 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/14-new-types-libraries-1.png)
```c++
// [decltype 기본 동작]
int x = 10;
decltype(x) a;     // int
decltype((x)) b = x; // int&

// [decltype 반환값 형식 영역]
template<typename T, typename TT>
auto mox_template(T t, TT tt) -> decltype(t + u){
return t * tt;
}
```

### 범위 지정 열거형 enum
- C++11에서 도입된 **`enum class`**** / ****`enum struct`**
- 사용시 선언된 범위를 반드시 지정해야
- 데이터 형식 생략할 경우 int로 자동 지정

```c++
// [문법 요약]
// 범위 지정 열거형 선언 ('0', 'b', 'c' 초기화)
enum class monster_enum : char
{ monster_a_type, monster_b_type = 'b', monster_c_type = 'c' };

// struct 활용한 범위 지정 열거 (0, 1, 2 초기화)
enum struct terrain_enum : int
{ forest_terrain_type, cyber_terrain_type, urban_terrain_type };

// 범위 미지정 열거형 (0, 1, 10 초기화) -> scope 명시 안해도 접근 가능
enum weapon_enum
{gun_type, machine_gun_type, arrow_type = 10};

class monster {
public:
  monster(monster_enum monster_type, terrain_enum terrain_type, weapon_enum weapon_type) 
  : monster_type_definition(monster_type), 
    main_field(terrain_type), 
    main_weapon(weapon_type)
  {};

private:
  monster_enum monster_type_definition;
  terrain_enum main_field;
  weapon_enum main_weapon;

  friend void print_monster_location(monster& mon) {
    switch (mon.main_field) {
    case terrain_enum::forest_terrain_type:
      cout << "숲 공간";
      break;
    case terrain_enum::cyber_terrain_type:
      cout << "사이버 공간";
      break;
    case terrain_enum::urban_terrain_type:
      cout << "도시 공간";
      break;
    }
  }

  friend void print_monster_weapon(monster& mon) {
    switch (mon.main_weapon) {
    case weapon_enum::gun_type:
      cout << "권총";
      break;
    case weapon_enum::machine_gun_type:
      cout << "기관총";
      break;
    case weapon_enum::arrow_type:
      cout << "화살";
      break;
    }
  }
};

int main()
{
  monster monster_in_forest = monster(
    monster_enum::monster_a_type,
    terrain_enum::forest_terrain_type,
    gun_type);

  monster monster_with_arrow = monster(
    monster_enum::monster_b_type,
    terrain_enum::cyber_terrain_type,
    arrow_type);

  cout << "첫번째 몬스터는 ";
  print_monster_location(monster_in_forest);
  cout << "(이)가 활동 지형이고, " << endl;
  print_monster_weapon(monster_in_forest);
  cout << " 무기를 주로 다룬다." << endl << endl;

  cout << "두번째 몬스터는 ";
  print_monster_location(monster_with_arrow);
  cout << "(이)가 활동 지형이고, " << endl;
  print_monster_weapon(monster_with_arrow);
  cout << " 무기를 주로 다룬다." << endl;
}

```

### 수학 상수
- 표준라이브러리에서 제공하는 수학 상수
```c++
#include <numbers>
using namespace std::numbers;
```
![C++ 14. 새로운 데이터 형식과 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/14-new-types-libraries-2.png)

### nullptr
- 포인터가 메모리에 할당되지 않았음을 나타내고, 빈 값을 나타내기도
- 모던 C++ 이전에는 컴파일러 마다 NULL - (void\*)0으로 정의된 경우가 많았음 
→ 정수 or 불리언으로 변환 가능해서 다양한 버그로 연결 가능
→ 반면 nullptr은 널 포인터 나타내는 리터럴이므로, 다른 데이터 형식으로 변환 X
→ 잠재적 오류 가능성 제거 가능

### 2진수 리터럴
- 모던 C++에서는 16진수와 유사하게 숫자 앞에 **0b or 0B**를 붙여서 2진수 표현 가능
```c++
int bit_variable = 0b0100; // int bit_variable = 4
```

# (2) 상수 지정자 constexpr
- 변수나 함수를 컴파일 시점에 상수 표현식으로 만들어줌

### constexpr 변수 선언
- 사용법 const와 매우 유사
- const 변수는 런타임에 값이 결정되지만, constexpr 변수는 컴파일 타임에 결정
- 컴파일 시점에 결정 = 프로그램이 메모리에 올라가지 않더라도 소스상에서 변수 초기값이 결정
- constexpr 변수 사용시, 초기값이 리터럴이어야 함.
![C++ 14. 새로운 데이터 형식과 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/14-new-types-libraries-3.png)
→ operand1, operand2는 함수가 call 되어야 (= 런타임에) 값이 결정
→ 리터럴 X
→ 즉, 컴파일 시점에 값이 결정되어야 하는 constexpr 변수를 런타임에 결정되는 값으로 초기화했기 때문에 에러

### constexpr 함수 선언
**const 함수** 
- 객체의 상태(멤버 변수)를 변경하지 않음을 컴파일러에 보장하는 함수
- 멤버 함수가 아닌 전역함수는 const 함수로 만들 수 없음
```c++
class A {
public:
    int get() const {      // const 멤버 함수
        return x;
    }

    void set(int v) {      // 비-const 멤버 함수
        x = v;
    }

private:
    int x;
};

```
→ ✅ 가능 : 멤버 변수 읽기, 다른 const 멤버 함수 호출
→ ❌ 불가능: 멤버 변수 수정, 비-const 멤버 함수 호출

**constexpr 함수** 
- 컴파일 타임에 실행될 수 있도록 정의된 함수
- 조건이 맞으면 **컴파일 타임에 계산**, 안 맞으면 **런타임 함수처럼 실행**
```c++
constexpr int a = square(5); // 컴파일 타임 계산
int b = square(n);           // 런타임 계산 (n이 런타임 값이면)
```
```c++
#include <iostream>
using namespace std;

int sum_int(int operand1, int operand2) {
    return operand1 + operand2;
}

constexpr int sum_int_constexpr(int operand1, int operand2) {
    return operand1 + operand2;
}

int main() {
    int var1 = sum_int(4, 5);
    int var2 = sum_int(var1, 10);
    int var3 = sum_int(var1, var2);

    constexpr int var11 = sum_int_constexpr(4, 5);
    constexpr int var12 = sum_int_constexpr(var11, 10);
    constexpr int var13 = sum_int_constexpr(var11, var12);

    return 0;
}

```
→ constexpr로 선언된 함수 호출 시 리터럴 전달하면 컴파일러가 상수 표현식으로 치환
→ 실행 시간 빨라짐

Q. constexpr 대신 const나 #define으로 정의 하는게 더 편하지 않나?
A. 셋은 사용 목적이 다름
![C++ 14. 새로운 데이터 형식과 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/14-new-types-libraries-4.png)

# (3) function 객체
- std 네임스페이스에 속한 함수 객체
→ 함수 객체: 함수는 아니지만 함수처럼 호출할 수 있도록 정의한 객체
```c++
struct Add {
    int operator()(int a, int b) const {
        return a + b;
    }
};

Add add;
int result = add(3, 4); // 함수처럼 호출
```

### 함수 포인터?
- 함수의 주소를 저장하고, 그 주소를 통해 함수를 호출하는 포인터
→ 함수 호출은 메모리에서 함수의 주소값을 찾아가는 명령 
→ 함수 포인터로 함수의 주소값을 찾아 가는 동작은 함수 호출과 동일한 결과
- 주로 콜백 (나중에 특정 시점에 호출될 함수를 미리 넘겨두는 것)을 구현할 때 주로 사용
- 남발하면 가독성 떨어지고 유지보수 어려워짐
```c++
void qsort (
void* base,
size_t num,
size_t size,
int (*compare)(const void*, const void*)
};
```

### 함자(functor)
- 함수 객체의 줄임말
- 함수 포인터는 포인터로만 전달할 수 있지만, 함자는 객체이므로 객체, 포인터, 참조자 등 다양ㅇ한 형태로 저장, 복사, 호출 가능
```c++
#include <iostream>
using namespace std;

struct bomb {
    void operator()() {
        cout << "Bomb!" << endl;
    }

    void operator()(int range) {
        cout << "Player within range " << range << "m has attacked!" << endl;
    }
};

int main() {
    bomb mine;

    mine();
    mine(30);

    return 0;
}
```
![C++ 14. 새로운 데이터 형식과 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/14-new-types-libraries-5.png)
→ operator() 오버로딩
→ 구조체 객체를 선언 후 객체 자체를 함수처럼 쓸수 있음\\

### function 클래스
- 호출 가능한 모든 것(callable)을 하나의 타입으로 감싸는 타입 소거(type-erasure) 클래스
- 함수 포인터 · 함수 객체 · 람다를 전부 담을 수 있는 공통 래퍼
```c++
#include <iostream>
#include <functional>
#include <string>
using namespace std;

void function_pointer(int input) {
    cout << "함수 포인터 대상 함수 : " << input << endl;
}

struct functor {
    void operator()(char functor_prefix) {
        cout << "함자 : " << functor_prefix << endl;
    }
};

class class_object {
public:
    class_object(string init_string) : class_object_name(init_string) {}

    void std_function_call_member(string contents) {
        cout << "클래스 멤버 함수 객체화 (" << class_object_name << ") : " << contents << endl;
    }

private:
    string class_object_name;
};

int main() {
    class_object class_obj("호출 객체를 가지고 있는 클래스");
    functor functor_obj;

    function<void(int)> func_pointer = function_pointer;
    function<void(functor&, char)> functor_func = &functor::operator();
    function<void(double)> lambda_func =
            [](double input) { cout << "람다 함수 : " << input << endl; };
    function<void(class_object&, string)> member_func = &class_object::std_function_call_member;

    func_pointer(10);
    functor_func(functor_obj, 'A');
    lambda_func(0xa8);
    member_func(class_obj, "출력");

    return 0;
}
```

# (4) 스마트 포인터
- C++은 메모리 관리를 지원하기 위해 auto_ptr을 제공했지만, 여러 문제로 C++17에서 제외
- 대신 unique_ptr, shared_ptr, weak_ptr 등 다양한 **스마트 포인터** 제공

### RAII 디자인 패턴
- Resource acquisition is initialization
→ 자원 획득은 초기화(객체가 유효한 상태로 태어나는 것)다
→ **자원 획득은 객체 생성 시점에 완료되어야 한다**
- C++에서 **자원 관리의 핵심 원칙**
- 객체의 생성자에서 자원을 획득하고, 소멸자에서 자원을 해제한다
→ 자원의 생명주기를 **객체의 생명주기와 완전히 묶는 방식**

### 스마트 포인터 unique_ptr
- 메모리 관리 객체 or 래퍼라고 불림
- 이중 참조 허용 X, 하나의 포인터 변수만 허용
- 메모리 사용 벗어나면 자동으로 해제
```c++
// [메모리 누수 코드]
#include <iostream>
using namespace std;

class class_object {
public:
    class_object() {
        cout << "Memory Allocate." << endl;
    };
    ~class_object() {
        cout << "Memory Free." << endl;
    }
};

int main() {
    // 메모리 누수 발생
    class_object* normal_pointer = new class_object();

    return 0;
}
```
![C++ 14. 새로운 데이터 형식과 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/14-new-types-libraries-6.png)
→ 메모리 해제 진행 X, 소멸자 호출 X 프로그램 종료
→ 메모리 회수 X

```c++
// [unique_ptr 사용]
#include <iostream>
#include <memory>
using namespace std;

class class_object {
public:
    class_object() {
        cout << "Memory Allocate." << endl;
    };
    ~class_object() {
        cout << "Memory Free." << endl;
    }
    void print_out() {
        cout << "Call function of object" << endl;
    };
};

int main() {
    // 스마트 포인터로 메모리 누수 방지
    unique_ptr<class_object> unique_pointer(new class_object());
    // auto unique_pointer = std::make_unique<class_object>(); //C++14 이후 권장 
    unique_pointer->print_out();
    return 0;
}
```
![C++ 14. 새로운 데이터 형식과 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/14-new-types-libraries-7.png)
→ C++14 이후로는 make_unique 함수 사용하면 편리하게 사용 가능
