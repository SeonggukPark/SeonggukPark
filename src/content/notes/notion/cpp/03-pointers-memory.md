---
title: "C++ 03. 포인터와 메모리 구조"
description: "포인터·배열·동적 메모리, 함수·구조체와 메모리 영역을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2a86b9674ad880808f7acd2b79481dc1"
importedAt: 2026-07-24
---

## (1) 포인터와 메모리
### 포인터와 연산자
**포인터(pointer)**
- 메모리 주소를 저장하는 변수
- 포인터의 크기는 64bit에서는 8byte, 32bit에서는 4byte

- 포인터 변수 선언
: 자료형 \*(포인터_변수_이름);
```c++
(ex) 
char *char_pt = &char_val;
int *int_pt = &int_val
```

- 포인터 변수가 가리키는 데이터 접근
: 역참조 연산자(\*) 사용
```c++
(ex)
int int_val = 123;
int *int_pt = &int_val;
cout << *int_p << endl;
```

### 다중 포인터
**다중 포인터 (multiple pointer)**
- 포인터를 가리키는 포인터 (pointer to pointer)
```c++
(ex)
int int_val = 123;
int *int_pt = &int_val;
int **int_pt_pt = &int_pt;
..
```

### 배열과 포인터
**배열**
- 같은 자료형의 변수를 연속으로 늘어놓은 형태

**Q. 물리적으로 실제 연속일까?**
**A. 아닐수도..**
![C++ 03. 포인터와 메모리 구조 이미지](/SeonggukPark/images/notion/notes/cpp/03-pointers-memory-1.png)

- 배열이름\[idx\] 처럼 index를 통해 특정 순서의 원소 접근

- 배열 선언
: 자료형 배열_이름\[크기\] = \{ 값1, 값2, .. , 값n \};

- &배열_변수\[index\] == 배열_변수 + index
- (ex) &lotto\[0\] == lotto + 0

**Q. 배열 == 포인터?**
**A. 엄연히 다름**
```c++
#include <iostream>
using namespace std;

int main() {
    int array[5] = { 1, 2, 3, 4, 5 };
    int* pointer_array = array;

    cout << "array: " << array << endl;
    cout << "pointer_array: " << pointer_array << endl << endl;

    cout << "sizeof(array): " << sizeof(array) << endl;
    cout << "sizeof(pointer_array): " << sizeof(pointer_array) << endl;

    return 0;
}
```
![C++ 03. 포인터와 메모리 구조 이미지](/SeonggukPark/images/notion/notes/cpp/03-pointers-memory-2.png)
→ array는 int\[5\] 형식, pointer_array는 int\*형
→ 각각의 사이즈는 배열의 크기인 20byte와 포인터의 크기인 8byte

### 동적 메모리 할당
- 배열은 크기 고정 → 원소 개수 모를때 비효율적

- 동적 메모리 할당 및 해제
```c++
- 할당 : 자료형 *변수_이름 = new 자료형;
- 해제 : delete 변수_이름;

(ex)
#include <iostream>
using namespace std;

int main() {
    int* pt_int_value = new int;    // 동적 메모리 할당

    *pt_int_value = 100;
    cout << *pt_int_value << endl;

    delete pt_int_value;    // 동적 메모리 해제

    return 0;
}
```

- 배열 형태 동적 메모리 할당 및 해제
```c++
- 할당 : 자료형 *변수_이름 = new 자료형[크기];
- 해제 : delete[] (변수_이름);

(ex)
#include <iostream>
using namespace std;

int main() {
    int* pt_int_array_value = new int[5];   // 동적 메모리 할당 (배열)

    // pt_int_array_value 활용~

    delete[] pt_int_array_value;   // 동적 메모리 해제(배열)

    return 0;
}
```
**→ 배열 형태로 메모리 해제 안하면 메모리 누수 발생**
→ 동적할당 변수는 heap에 존재 
→ 해당 영역 변수는 프로그램 종료시 까지 유지 
→ 적절하게 해제 안하면 프로그램 실행 중에 누수 발생!

## (2) 함수와 구조체
- 함수(function): 특정 작업을 수행하는 코드 집합
### 배열을 배개변수로 사용
```c++
#include <iostream>
using namespace std;

int average(int _array[], int _count) {
    int sum = 0;
    for (int i = 0; i < _count; i++) {
        sum += _array[i];
    }

    return (sum / _count);
}

int main() {
    int score[5] = { 90, 75, 80, 100, 65 };
    cout << "평균점수 : " << average(score, 5) << endl;
    return 0;
}

```
→ average 파라미터로 _array\[ \] 대신 int \*_array 처럼 포인터로 바꿔도 문제 X
→ 즉, 배열로 매개변수를 사용하면 주솟값을 전달 받는다는 의미

### 구조체
- 여러 종류의 데이터를 하나로 묶어 새로운 자료형을 정의하는 사용자 정의 타입
- 구조체 변수의 개별 멤버에 접근하려면 멤버 선택 연산자(member selection operator)인 점( . )을 사용해야 함
```c++
(ex) 구조체 배열

struct Person{
std::string name;
int age;
float height, weight;
};

Person adult[3];

adult[0].name = "Brain";
adult[0].age = 24;
..
```

- 초기화
- 하나씩 멤버에 접근해서 할 수 있찌만, 중괄호로 간편하게도 가능
```c++
(ex) 구조체 초기화

[단일 구조체]
Person adult = {"Brain", 24, 180, 70};

[구조체 배열]
Person adult[3] = 
{
{"Brain", 24, 180, 170 },
{"Brain", 24, 180, 170 },
{"Brain", 24, 180, 170 },
};

```
→ 배열 초기화 시 마지막 원소 뒤 쉼표는 선택 사항 (관용 문법)

## (3) 정적 변수와 상수 변수
- 지역 변수(local variable)
- 함수 내부에 선언된 변수
- 해당 블록 내에서만 효력
- 선언된 지점에서 생성, 해당 블록이 끝나면 소멸** (자동 지속; auto duration)**

- 전역 변수(global variable)
- 전역 범위에 선언된 변수
- 해당 파일 전체에서 효력
### Static
**지역변수**
- 자동 지속 → 정적 지속 (즉, 정적 변수로 바꿈)
ex) 
```c++
#include <iostream>
using namespace std;

void func() {
    int a = 10;
    static int b = 10;
    a++;
    b++;
    cout << "a : " << a << " , b : " << b << endl;
}

int main() {
    func();
    func();
    func();
    return 0;
}

```
![C++ 03. 포인터와 메모리 구조 이미지](/SeonggukPark/images/notion/notes/cpp/03-pointers-memory-3.png)
→ **정적 변수는 해당 함수 호출될 때 한 번만 초기화**
→ 선언시 초기화 안하면 컴파일러가 0으로 초기화

- static으로 선언된 정적 변수는 데이터 영역에 저장

**Q. static은 주로 언제 사용?**
**A. 클래스나 함수의 모든 인스턴스 간에 공유되는 변수를 선언하고 싶지만, 해당 클래스나 함수 외부에서 보이지 않게 하고 싶을 때 주로 사용**

<callout>
+) GPT 추가 설명
**전역 변수**
```c++
static int g_value = 10;
static void helper() { ... }
```
- 내부 연결(linkage)를 가짐 → 정의된 소스 파일 안에서만 접근
- C++17 이후 익명 네임스페이스 ( namespace \{ \} )가 같은 효과를 냄

**클래스 멤버 (static member)**
```c++
class Counter {
public:
    static int total;
    void inc() { total++; }
};
int Counter::total = 0;

```
- 객체 간 공유되는 변수 or 함수
- 인스턴스가 아닌, 클래스 단위로 하나만 존재
- 객체 없이도 사용 가능
- static 멤버 함수는 this 포인터가 없음 → 비정적 멤버 변수에 접근 불가
</callout>

### Const
- 변수를 상수화
```c++
const int a = 1; // recommended
int const b = 1;
```
→ 둘 중 가독성을 위해 위의 형태 권장

```c++
#include <iostream>
using namespace std;

int main() {
    const int a = 1;
    a = 2;
    return 0;
}
```
![C++ 03. 포인터와 메모리 구조 이미지](/SeonggukPark/images/notion/notes/cpp/03-pointers-memory-4.png)

**포인터 변수의 상수화**
<table>
<colgroup>
<col>
<col>
</colgroup>
<tr>
<td>포인터 변수와 const 위치</td>
<td> 요약</td>
</tr>
<tr>
<td>const int \*ptr = &a</td>
<td>\*ptr 상수화 : 포인터 변수가 가리키는 값을 상수화</td>
</tr>
<tr>
<td>int \*const ptr = &a</td>
<td>ptr 상수화 : 포인터 변수 자체를 상수화</td>
</tr>
</table>
```c++
[1. *ptr 상수화]
#include <iostream>
using namespace std;

int main() {
    int a = 0;
    const int *ptr = &a; // *ptr 변수화
    a = 1; // ok
    *ptr = 2; // compile error
    return 0;
}
```
```c++
[2. ptr 상수화]
#include <iostream>
using namespace std;

int main() {
    int a = 0, b = 1;
    int *const ptr = &a;
    a = 1; // ok
    ptr = &b; // compile error
    return 0;
}

```

**Q. const는 주로 언제 사용?**
**A. 초기화 후 값을 변경해서는 안 되는 변수를 선언하고 싶을 때**

## (4) 레퍼런스 변수
C++에서 제공하는 3가지 변수 형식은 다음과 같다.
- 일반 변수: 값을 저장하는 변수
- 포인터 변수: 메모리 주소를 저장하는 변수
- **레퍼런스**: 변수에 또 다른 이름, 별칭(별명)을 부여

```c++
[레퍼런스 변수 선언]
자료형 &레퍼런스_변수_이름 = 대상_변수_이름;
ex) int &ref_a = a;
```
```c++
#include <iostream>
using namespace std;

void swap_call_by_val(int a, int b) {
    cout << "[swap func] before swap, a: " << a << "  b: " << b << endl;
    int temp = a;
    a = b, b = temp;
    cout << "[swap func] after swap, a: " << a << "  b: " << b << endl;
}

void swap_call_by_ref(int& ref_a, int& ref_b) {
    cout << "[swap func] before swap, ref_a: " << ref_a << "  ref_b : " << ref_b << endl;
    int temp = ref_a;
    ref_a = ref_b, ref_b = temp;
    cout << "[swap func] after swap, ref_a: " << ref_a << "  ref_b : " << ref_b << endl;
}

int main() {
    int a = 5, b = 10;
    // call by value
    cout << "-------------[call by value]-------------" << endl;
    cout << "[main] before swap, a: " << a << "  b: " << b << endl << endl;
    swap_call_by_val(a, b);
    cout << endl << "[main] after swap, a: " << a << "  b: " << b << endl;

    // call by reference
    cout << endl << "-------------[call by reference]-------------" << endl;
    cout << "[main] before swap, a: " << a << "  b: " << b << endl << endl;
    swap_call_by_ref(a, b);
    cout << endl << "[main] after swap, a: " << a << "  b: " << b << endl;
    return 0;
}

```
![C++ 03. 포인터와 메모리 구조 이미지](/SeonggukPark/images/notion/notes/cpp/03-pointers-memory-5.png)

**레퍼런스 사용 시 룰**
- 레퍼런스 변수는 선언 후 반드시 참조할 원본 변수를 지정할 것
```c++
int val = 10;
int &ref_val = val;
```
- 참조 대상 지정된 레퍼런스는 다른 변수를 참조할 수 없음
- 레퍼런스 변수는 상수를 참조할 수 없음

**함수 호출 방식**
![C++ 03. 포인터와 메모리 구조 이미지](/SeonggukPark/images/notion/notes/cpp/03-pointers-memory-6.png)

Q. 레퍼런스와 포인터의 차이점?
![C++ 03. 포인터와 메모리 구조 이미지](/SeonggukPark/images/notion/notes/cpp/03-pointers-memory-7.png)
