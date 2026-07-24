---
title: "C++ 15. 새로운 구문 1"
description: "Notion MCP에서 직접 가져온 C++ 15. 새로운 구문 1 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2de6b9674ad8808cb863e589e4a34e8e"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

# (1) 튜플과 구조적 바인딩
## 튜플
- C++14에서 표준으로 제정된 컨테이너의 한 종류
- 다른 종류의 데이터 형식을 한 집합으로 묶을 수 있음

### 튜플 생성 및 활용
```c++
// [튜플 선언]
#include <tuple>
std::tuple<int, double, char> t;

// [생성 방법]
// (1) 직접 생성
std::tuple<int, double, char> t(1, 3.14, 'a');

// (2) std::make_tuple
auto t = std::make_tuple(1, 3.14, 'a');

// (3) 구조적 바인딩 (C++17 ~)
auto [i, d, c] = t;

// [활용]
// (1) 복사 생성자
std::tuple<int, double> t2 = t1;

// (2) 유니폼 초기화
std::tuple<int, double, char> t{1, 2.5, 'a'};

// (3) 원솟값 교환
std::tuple<int, int> a{1, 2};
std::tuple<int, int> b{3, 4};
std::swap(a, b);

// (4) 튜플 합치기
auto t1 = std::make_tuple(1, 2.0);
auto t2 = std::make_tuple('a', true);
auto t3 = std::tuple_cat(t1, t2);

// [원소 가져오기] - get
std::tuple<int, double, char> t{1, 3.14, 'a'};

int    a = std::get<0>(t); // 1
double b = std::get<1>(t); // 3.14
char   c = std::get<2>(t); // 'a'
```

### 원소 → 변수 매핑
```c++
#include <tuple>

std::tuple<int, double, char> t{1, 3.14, 'a'};

int i;
double d;
char c;

std::tie(i, d, c) = t;

// std::ignore 활용
int i;
char c;

std::tie(i, std::ignore, c) = t; // 필요 없는 값 때문에 변수를 억지로 만들 필요 X
```

Q. 구조체 vs 튜플
A. tuple은 “값 묶음”, struct는 “개념 묶음”, 튜플은 내부적으로 익명의 struct

## 구조적 바인딩(unpack, decomposition)
- 특정 구조의 데이터 형식을 해체하여 각 변수에 저장하는 기능
- 해체한 원소는  auto\[\], const auto\[\]와 같이 대괄호로 둘러 쌓인 변수 집합에 저장
- tie 함수 처럼 std::ignore 사용 못함
```c++
auto[monster_type, monster_name, hp, power] = get_monster_status(monster_a_inst);
```

# (2) 범위 기반 for 문
- 대상 데이터 집합의 크기 만큼만 순회
- 배열, begin-end 함수를 제공하는 컨테이너 클래스는 사용 가능
- 순회할 수 있는 데이터 형식이 제한적 
→ 배열, 리스트를 모두 순회하는 경우가 아니라면 기본 for문이 나음
```c++
#include <vector>
#include <iostream>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4};

    for (int x : v) {
        cout << x << ' ';
    }
}
```

+) R-value 참조
- for(auto&& val : vec) \{ \}

# (3) 제어문의 초기화 구문
- 분기문-초기화 구문의 관계를 분명히 할 수 있음
- 해당 변수의 범위도 분기문으로 한정 가능

```c++
#include <iostream>
#include <array>
#include <algorithm>
using namespace std;
constexpr int even = 0;
constexpr int odd = 1;

int main() {
    array<int, 5> data_array{47, 23, 58, 10, 36};

    // if 문에 초기화 구문 사용
    if (auto element = data_array[3]; element > 20 ) {
        cout << "4th element is bigger than 20" << endl;
    }
    else {
        cout << "4th element is smaller or equal with 20" << endl;
    }

    // switch 문에 초기화 구문 사용
    switch (auto element = data_array[4] % 2 ; element) {
        case odd:
            cout << "5th number is odd number" << endl;
            break;
        case even:
            cout << "5th number is even number" << endl;
            break;
    }

    // 범위 기반 for 문에 초기화 구문 사용
    for (sort(data_array.begin(), data_array.end()); auto&& element : data_array) {
        cout << element << ", ";
    }
    cout << endl;
    return 0;
}
```

# (4) 람다 표현식
- 이름 없는 함수(익명 함수)를 간결하게 표현하는 문법
- 주로 짧은 동작을 일회성으로 전달할 때 사용
```c++
// [기본 형태]
[캡처](매개변수) -> 반환형 {
    함수 본문
};
```
→ 캡처: 람다 안에서 외부 변수를 쓰기 위한 연결 방식

### 캡쳐 종류
**\[1\] 값 캡처 ****`[x]`**
```c++
int x =10;
auto f = [x]() {
return x;
};
x =20;
f();// 10
```
- 람다 생성 시점의 값이 복사됨
- 이후 원본 변경과 무관
- 기본적으로 `const`

**\[2\] 참조 캡처 ****`[&x]`**
```c++
int x =10;
auto f = [&x]() {
    x++;
};
f();
cout << x;// 11
```
- 실제 변수에 대한 참조
- 외부 상태 변경 가능
- 수명 관리 주의 필요

**\[3\] 전체 값 캡처 ****`[=]`**
```c++
int a =1, b =2;
auto f = [=]() {
return a + b;
};
```
- 사용된 모든 외부 변수를 값으로 캡처

**\[4\] 전체 참조 캡처 ****`[&]`**
```c++
int a =1, b =2;
auto f = [&]() {
    a++;
    b++;
};

```
- 사용된 모든 외부 변수를 참조로 캡처

**\[5\] 혼합 캡처**
```c++
int a =1, b =2;
auto f = [a, &b]() {
return a + b;
};

```

## 함수 객체로 사용
```c++
class vending_machine {
public:
    vending_machine() : price{ 450, 390, 11340, 900, 150 } {};
    void stack_drink() {};

    void sale_sale_using_lambda_function_object(int payments[], int changes[]) {
        auto calcu_changes = [&changes](int payment, int price)->int {
            int change = payment - price;
            changes[0] = change / 1000;
            change %= 1000;
            changes[1] = change / 500;
            change %= 500;
            changes[2] = change / 100;
            change %= 100;
            changes[3] = change / 50;
            change %= 50;
            changes[4] = change / 10;
            return payment - price;
        };

...
```

## this 포인터 사용
```c++
class vending_machine {
public:
  vending_machine() : price{ 450, 390, 11340, 900, 150 } {};
  void stack_drink() {};

  void sale_using_lambda_with_this(int payments[], int changes[]) {
    for (int i = 0; i < loop_count; ++i) {
      cout << payments[i] << "원을 내고 " << price[i] << "원 짜리 음료를 선택했습니다." << endl;
      cout << "거슬러 받을 돈은 " << [&](int payment)->int {
        int change = payment - this->price[i];
        changes[0] = change / 1000;
        change %= 1000;
        
        ...
```

## mutable
- 외부 변수를 람다 표현식 내에서만 변경해서 사용하고 외부에는 영향 안주려면, mutable 키워드 사용
```c++
int x = 10;

auto f = [x]() mutable {
    x += 5;          // 람다 내부 복사본만 변경
    cout << x << endl;
};

f();
cout << x << endl;   // 여전히 10

```

