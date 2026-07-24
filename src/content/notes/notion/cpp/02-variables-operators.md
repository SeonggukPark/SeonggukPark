---
title: "C++ 02. 변수와 연산자"
description: "Notion MCP에서 직접 가져온 C++ 02. 변수와 연산자 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2a86b9674ad880bd98fff76e3602039d"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

## (1) C++ 표준 입출력
<table>
<colgroup>
<col>
<col>
<col>
</colgroup>
<tr>
<td>구분</td>
<td>C</td>
<td>C++</td>
</tr>
<tr>
<td>헤더 파일</td>
<td>stdio.h</td>
<td>iostream</td>
</tr>
<tr>
<td>입력문</td>
<td>scanf</td>
<td>cin</td>
</tr>
<tr>
<td>출력문</td>
<td>printf</td>
<td>cout</td>
</tr>
</table>
```c++
#include <iostream>

int main() {
  int i, j;

  std::cout << "Enter num_1: ";   // 문자열 출력
  std::cin >> i;   // 사용자에게 정수를 입력받아 i에 저장

  std::cout << "Enter num_2: ";   // 문자열 출력
  std::cin >> j;   // 사용자에게 정수를 입력받아 j에 저장

  std::cout << "num_1 + num_2 = " << i + j << std::endl;   // 두 수의 합 출력
  return 0;
}
```
```c++
[실행 결과]
Enter num_1:2
Enter num_2:3
num_1 + num_2 = 5
```

### 네임스페이스
- 소속을 지정해 주는 역할
- std::는 std 네임스페이스에 접근할 때 쓰는 표현
- **std**: standard의 줄임말, C++ 표준 라이브러리에 정의된 네임스페이스로 cout, cin, string 등 자주 사용하는 함수와 객체가 포함됨
- identifier(내부 식별자)에 범위를 부여해 여러 라이브러리를 포함할 때 이름이 충돌하는 것을 방지하고자 사용
- using namespace std: cin, cout 등이 사용될 때 무조건 std에 속한 것을 호출한다는 의미
```c++
#include <iostream>
using namespace std;

int main() {
  int i, j;

  cout << "Enter num_1: ";   // 문자열 출력
  cin >> i;   // 사용자에게 정수를 입력받아 i에 저장

  cout << "Enter num_2: ";   // 문자열 출력
  cin >> j;   // 사용자에게 정수를 입력받아 j에 저장

  cout << "num_1 + num_2 = " << i + j << endl;   // 두 수의 합 출력
  return 0;
}
```
- 이 방법은 편리하기는 하지만, std:: 처럼 네임스페이스를 매번 표기하는 코드가 더 좋음
→ std 전체 네임스페이스 가져올 때 이름 선언이 충돌할 수 있기 때문
→ 상용 수준의 코드에서는 주의해서 사용해야 함

### **cout **: 출력
- **콘솔에 출력할 때 사용하는 표준 출력 스트림 객체**
- 스트림 객체 사용 → 형식 지정자 (C의 %d, %f 등) 사용하지 않고도 출력 가능
- ‘ \<\< ‘ 연산자로 출력 대상 전달
```c++
ex) std::cout << 출력 1 << 출력 2 << .. << std::endl;
```
**→ endl: 스트림을 비우고 줄을 바꾸는 manipulator(조작자)**

### cin : 입력
- **사용자의 입력을 읽을 때 사용하는 표준 입력 스트림**
- 스트림 객체 사용 → 형식 지정자 (C의 %d, %f 등) 사용하지 않고도 출력 가능
- scanf는 입력 데이터의 형식 확인 X, but cin은 확인 후 잘못되었으면 오류 발생
→ **cin이 scanf보다 데이터 형식에 안전**
- ‘ \>\> ‘ 연산자로 입력
```c++
ex) std::cin >> 저장할_변수;
```

## (2) 데이터 형식
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-1.png)
→ 데이터 형식 앞에 ‘_ _’ 가 붙은 건 MS에서 제공하는 확장형 (특정 환경에서만 지원)
→ C++ 표준은 아니므로, 표준 자료형을 사용하는 것이 좋음

### void
- 형식이 없음을 나타냄
- 다음 3가지 상황에서 사용
\[1\] 함수가 값을 리턴하지 않을 때
```c++
void print_func(){
~~~
}
```

\[2\] 함수의 매개변수가 없을 때
```c++
int input_func(void){
~~~
}
```

\[3\] generic pointer 만들 때 
- generic pointer : 어떤 변수라도 가리킬 수 있는 포인터
```c++
int int_val;
float float_val;
void *ptr_value;
ptr_value = &int_value;
ptr_value = &float_value;
```

### bool
- true & false 만 가질 수 있는 형식
- 조건문, 논리 연산에서 주로 사용
- ture: 1 / false : 0을 의미

### char
- C/C++에서 단일 문자를 표현할 때 사용
- 작은 따옴표로 문자를 감싸 표현
- 8bit 정수를 저장하는 역할
- 아스키 코드는 7bit 체계 + 1bit parity bit

### 정수 형식 (integer)
- int, short, long, long long 등
- C++ 언어 표준안은 정수형의 크기를 정확하게 명시 X
- 표준이 보장하는 관계
```c++
sizeof(char) <= sizeof(short) <= sizeof(int) <= sizeof(long) <= sizeof(long long)
```

### 부동 소수점 형식 
- 부동(floating): 떠다닌다 → 정수-소수부의 자릿수가 일정하지 않음
- cout은 부동 소수점 출력시 기본 정밀도 6
- IEEE754(부동 소수점 표준)
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-2.png)
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-3.png)

## (3) 변수의 유효 범위와 형식 변환
### 변수의 유효 범위
**구문 범위**
- if, for, while 등 구문 내에서만 유효
**지역 범위**
- 매개변수 이름 포함 함수 안에서 선언한 이름은 해당 함수 내에서만 유효
- 블록 범위(block scope)라고도 함
**전역 범위**
- 선언 지점부터 파일 끝까지 유효
**클래스 범위**
- 선언 지점 관계 없이 클래스 정의 전체에 걸쳐 확장
- 접근성은 접근 지정자(public, private 등)로 제어 가능
**네임스페이스 범위**
- 네임스페이스 내에서만 유효
- 네임스페이스는 서로 다른 파일들의 여러 블록에서 선언 가능

Q. 전역, 지역 범위에서 선언한 변수명이 같다면?

A. 지역 변수의 우선권이 더 높지만,** ‘::’ 연산자를 통해 전역 변수 접근 가능**
```c++
#include <iostream>
using namespace std;

int value = 1;   // 전역 변수

int main() {
  int value = -1;   // 지역 변수

  cout << value << endl;     // 지역 변수 출력
  cout << ::value << endl;   // 전역 변수 출력
  return 0;
}

```
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-4.png)
→ 하지만 의도치 않은 실수를 막기 위해 이런 정의는 지양해야 함  
→ 전역 변수에는 ‘g_’와 같은 접두사를 붙이는 식으로 반드시 구분할 것 (단일 정의 규칙)

### L-value & R-value
- C에서 L, R-value는 단순히 ‘=’ 기준 왼쪽, 오른쪽 값 → C++에서는 아님
**L-value**
- 주로 대입 연산자 왼쪽의 값
- 메모리 위치 or 수정할 수 있는 표현 식
- ex) 변수 이름, 배열 요소, 클래스 멤버
**R-value**
- 주로 대입 연산자 오른쪽의 값
- 임시 값 or 메모리 상에 위치가 없는 값
- ex) 임시 객체, literal

### 형식 변환 (type casting)
- **implicit **(암시적): 컴파일러가 자동으로 변경
```c++
#include <iostream>
using namespace std;

int main() {
    float float_value = 1.5f;   // 원본 데이터는 실수형 1.5

    double double_value = float_value;  // 숫자 승격: 데이터 유실 없음
    int int_value = float_value;        // 숫자 변환: 데이터 유실 발생

    cout << "float_value: " << float_value << endl;
    cout << "double_value: " << double_value << endl;
    cout << "int_value: " << int_value << endl;
    return 0;
}

```
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-5.png)
**numeric promotion:** float → double로 변환 (더 큰 자료로, 데이터 유지)
**numeric conversion:** float → int로 변환 (서로 다른 or 더 작은 자료로, 데이터 유실 가능)

- **explicit **(명시적): 개발자가 의도적으로 변경
→ 데이터 유형 간 호환성이나 연산 정확성을 유지하기 위해 사용
→ 남용하면 코드 해석이 어려워짐
```c++
#include <iostream>
using namespace std;

int main() {
    int int_a = 10;
    int int_b = 5;

    int int_avg = (int_a + int_b) / 2;
    float float_avg_1 = (int_a + int_b) / 2;        // 암시적 형변환: 데이터 유실
    float float_avg_2 = float(int_a + int_b) / 2;   // 명시적 형변환

    cout << "int_avg: " << int_avg << endl;
    cout << "float_avg_1: " << float_avg_1 << endl;
    cout << "float_avg_2: " << float_avg_2 << endl;
    return 0;
}

```
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-6.png)

**명시적 형 변환 방법**
<table>
<colgroup>
<col>
<col>
</colgroup>
<tr>
<td>C++ 명시적 형 변환 방법</td>
<td>특징</td>
</tr>
<tr>
<td>static_cast \<변환_형식\>(변환_대상)</td>
<td>- 논리적으로 변경 가능한 형 변환 모두 가능<br>- 상속 관계에 있는 포인터간 변환도 지원</td>
</tr>
<tr>
<td>const_cast \<변환_형식\>(변환_대상)</td>
<td>- 포인터 및 레퍼런스 형식에서만 사용 가능<br>- const, volatile 제거할 때 사용</td>
</tr>
<tr>
<td>reinterpret_cast \<변환_형식\>(변환_대상)</td>
<td>- 일반적인 명시적 형 변환과 동일<br>- const를 사용하는 변환 대상은 사용할 수 없음</td>
</tr>
<tr>
<td>dynamic_cast \<변환_형식\>(변환_대상)</td>
<td>- 클래스의 포인터 및 레퍼런스 변수 간 형 변환시 사용<br>- 안전한 다운 캐스팅을 위해 사용</td>
</tr>
</table>
→ C 스타일 casting도 가능함

## (4) 키워드와 리터럴
### **식별자(Identifier)**
: 변수, 함수, 타입 또는 다른 종류의 객체(other kind of object)의 이름으로, 다음 규칙을 따름
- 키워드는 식별자가 될 수 없다.
- 대소문자, 숫자 및 문자로만 구성될 수 있다.
- 대소문자 또는 _ 문자로만 시작해야 한다. (숫자로 시작할 수 없다.)
- 대문자와 소문자를 구별한다. 

### 키워드(keyword)
- 프로그래밍 언어에서** 특별한 의미로 미리 정의해둔 식별자**
- C++20 기준으로 97개 단어가 등록
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-7.png)

### 리터럴(literal) 
- 코드에 직접 표현된 변하지 않는 값 그 자체

**기본 리터럴**
```c++
int val = 5;
double val = 0.5;
char val = 'A';
```

**접미사가 붙는 리터럴**
```c++
float val = 0.5f;
unsigned int val = 5u;
long val = 5L;
```
+) 리터럴 접미사
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-8.png)

### 문자열
**C 스타일**
```c++
char *str = "Hello";
char str[] = "Hello";
```
→ 배열 맨 마지막에 문자열의 끝을 알리는 널 문자(\\0)를 저장
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-9.png)

**String 클래스**
- 문자열 데이터 자유롭게 넣을 수 있음
- \<string\> 헤더 선언해서 사용 → **\<iostream\>쓰면 \<string\>도 함께 포함**

### 문자 리터럴
- ‘a’, ‘\\’ 처럼 작은따옴표로 묶인 단일 문자

### 사용자 정의 리터럴 (User Defined Literals; UDL)
- 기본 제공 리터럴 외에 개발자가 직접 정의
```c++
반환 타입 operator"" 리터럴_접미사(매개변수_구성)
```
```c++
(ex)

#include <iostream>
using namespace std;

const long double km_per_mile = 1.609344L;

// _km 사용자 리터럴 정의
long double operator"" _km(long double val) {
    return val; // km 리터럴: 아무 작업 없이  그대로 반환
}

// _mi 사용자 리터럴 정의
long double operator"" _mi(long double val) {
    return val * km_per_mile; // mi 리터럴: mile을 km로 변환하여 반환
}

int main() {
    long double distance_1 = 1.0_km;    // km는 그대로 저장
    long double distance_2 = 1.0_mi;    // mile은 km 단위로 변환되어 저장

    cout << distance_1 + distance_2 << " km" << endl;   // km값으로 출력
    return 0;
}

```

+) #define vs UDL

## (5) 표현식과 연산자
**표현식(expression)**
- 프로그래밍에서 계산할 때 사용하는 식
- 연산자(operator)와 피연산자(operand)로 구성

### 상수 표현식(constant expressions)
- 상수로만 이루어진 단순 표현식

### 단항 연산자 표현식(unary operator expression)
- 연산자와 피연산자가 일대일로 매칭되는 표현식
- 증감연산자(++a), 논리 NOT(!a), 비트 반전(\~a) 등

### 이항 연산자 표현식(binary operator expression)
- 연산에 참여하는 피연산자가 2개
- 대부분의 산술 연산자 및 관계 연산자

참고) XOR
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-10.png)

### 삼항 연산자 표현식 (ternary operator expression)
- 피연산자 3개
```c++
ex) 조건식 ? 참일때_표현식 : 거짓일때_표현식
```

### 연산자 우선순위
- 헷갈릴 때는 괄호()로 우선순위 정할 것
![C++ 02. 변수와 연산자 이미지](/SeonggukPark/images/notion/notes/cpp/02-variables-operators-11.png)

