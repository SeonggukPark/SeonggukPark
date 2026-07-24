---
title: "C++ 10. 템플릿"
description: "Notion MCP에서 직접 가져온 C++ 10. 템플릿 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2a86b9674ad8806c8182faf767c48d16"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

# (1) 함수 템플릿
- 자료형에 의존하지 않는 함수를 일반화해서 정의하는 문법
- 개방/폐쇄 원칙(OCP)을 지키면서 여러 용도로 활용 가능한 함수 만드는 방법
- 매개변수의 데이터 타입을 함수 작성 시점이 아닌, 호출 시점에 정할 수 있음

```c++
#include <iostream>
#include <string>

using namespace std;

template <typename T> // 템플릿 선언
T data_sum(T operand1, T operand2) { // 함수 템플릿 정의
    return operand1 + operand2;
}

int main() {
    int data1 = 3, data2 = 5;
    double data3 = 4.5, data4 = 8.9;
    string data5 = "Hello, ", data6 = "World!";
    char data7[] = "Hello, ", data8[] = "New World!";

    cout << "Sum of int data: " << data_sum(data1, data2) << endl;
    cout << "Sum of double data: " << data_sum(data3, data4) << endl;
    cout << "Sum of string data: " << data_sum(data5, data6) << endl;

    // 사용할 수 없는 인자 예제
    //cout << "Sum of char array" << data_sum(data7, data8) << endl;
    cout << "Sum of char array: " << data_sum<string>(data7, data8) << endl;

    return 0;
}

```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-1.png)

## 템플릿의 인스턴스화
- 스택 메모리의 크기는 컴파일 시점에 결정됨
→ 함수에서 사용한 템플릿 매개변수도 컴파일 과정에서 실제 데이터 형식으로 대체되어야 함
→ 컴파일러는 함수 템플릿 호출 구문을 만나면 템플릿 매개변수의 데이터 형식을 추론하고, 이 형식으로 완성된 함수를 오브젝트 코드로 만듦
→ 이 과정을 **템플릿의 인스턴스화(template Instantiation)** 라고 함
- 템플릿 함수는 컴파일 시점에 데이터 형식별로 템플릿이 인스턴스로 만들어 짐
→ **템플릿을 많이 쓰면 컴파일 시간이 길어지고, 실행 파일 크기가 커짐**

## 데이터 형식 추론과 명시적 호출
- 컴파일러는 함수 템플릿을 호출하는 구문에서 전달한 값을 바탕으로 템플릿 매개변수의 데이터 형식 추론
→ 해당 형식으로 인스턴스화 된 함수가 없다면 새로 인스턴스화 진행
→ 데이터 형식 추론이 어렵거나 잘못된 호출이면 컴파일 중단
- 형식 추론은 시간 많이 소요, 데이터 형식이 모호하면 추론 불가, 컴파일 에러 발생

```c++
// [모호한 데이터 형식 예시]
#include <iostream>
#include <string>

using namespace std;

template <typename T> // 템플릿 선언
T data_sum(T operand1, T operand2) { // 함수 템플릿 정의
    return operand1 + operand;
}

int main() {
    char data7[] = "Hello, ", data8[] = "New World!";
    cout << "Sum of char array: " << data_sum(data7, data8) << endl;
    return 0;
}
```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-2.png)
→ char 배열 시작 주소끼리의 덧셈은 불가 (컴파일 에러)
→ 변환의 기준이 명확하지 않아 char 배열을 string으로 자동 변환 X
→ 명시적 형 변환 이용해야 함

```c++
// [오류 개선 코드]
#include <iostream>
#include <string>

using namespace std;

template <typename T> // 템플릿 선언
T data_sum(T operand1, T operand2) { // 함수 템플릿 정의
    return operand1 + operand2;
}

int main() {
    char data7[] = "Hello, ", data8[] = "New World!";
    cout << "Sum of char array: " << data_sum<string>(data7, data8) << endl;
    return 0;
}
```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-3.png)
→ ‘\<\>’로 형식 명시해 함수 호출하면 컴파일러가 해당 형식으로 변환 후 바로 인스턴스화 (추론 X)

## 템플릿 특수화
- 특수 상황에서 별도의 함수 템플릿으로 만들어 처리하는 법
- 특정 데이터 형식만 다르게 동작하도록 가능

**명시적 특수화(Explicit Specialization)**
- 모든 템플릿 매개변수를 특정 데이터 형식으로 지정
**부분 특수화(Partial Specialization)**
- 일부 템플릿 매개변수만 특정 데이터 형식으로 지정

→ 함수 템플릿에서는 명시적 특수화만 사용 가능

- 함수템플릿의 명시적 특수화
- 템플릿 매개변수를 사용하지 않고, 함수에 데이터 형식을 모두 지정
- 함수 이름, 매개변수 개수는 변경 X
- 멤버 함수의 오버라이딩과 유사한 개념
```c++
// [함수템플릿의 명시적 특수화]
#include <iostream>
#include <string>

using namespace std;

template <typename T>
T data_sum(T operand1, T operand2) {
    return operand1 + operand2;
}

template <>
double data_sum(double operand1, double operand2) {
    return  (int)operand1 + (int)operand2;
}

int main() {
    int data1 = 3, data2 = 5;
    double data3 = 4.5, data4 = 8.9;
    string data5 = "Hello, ", data6 = "World!";

    cout << "Sum of int data: " << data_sum(data1, data2) << endl;
    cout << "Sum of double data: " << data_sum(data3, data4) << endl;
    cout << "Sum of string data: " << data_sum(data5, data6) << endl;

    return 0;
}
```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-4.png)
→ 실수가 입력될 경우 정수로 변환 후 덧셈

Q. 템플릿 특수화 사용하지 말고 함수를 따로 만들면 안되는지?
A.  사용할지 말지 판단은 개발자의 몫. 템플릿을 사용하는 소스 코드에서 특정 데이터만 다르게 처리할 경우, 템플릿 특수화를 쓰는게 좋음. 목적이 같은 코드를 일관되게 작성하면 가독성 높이는데 도움.

# (2) 클래스 템플릿
## 템플릿으로 범용 클래스 만들기
- 보통 클래스 템플릿을 직접 선언하기 보다는, 라이브러리에서 이미 선언된 클래스 템플릿을 이용할 때가 더 많음.

```c++
// [템플릿 선언 및 클래스 정의]
template <typename Type1, typename Type2>
class data_package{
public:
data_package(Type1 first, Type2 second) : first(first), second(second){}
private:
Type1 first;
Type2 second;
};

// [클래스 템플릿의 객체 생성]
int main(){
data_package<int, double> template_inst1(5, 10.5);
data_package<string, int> template_inst2("string", 10);
// .. (생략) ..
}
```
```c++
#include <iostream>

using namespace std;

template <typename Type1, typename Type2>
class data_package {
public:
    data_package(Type1 first, Type2 second) : first(first), second(second) {}
    void print_out_element() {
        cout << "first element: " << first << ", second element: " << second << endl;
    }
private:
    Type1 first;
    Type2 second;
};

int main() {
    data_package<int, double> template_inst1(5, 10.5);
    data_package<string, int> template_inst2("string", 10);

    template_inst1.print_out_element();
    template_inst2.print_out_element();
}
```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-5.png)

Q. 클래스는 이미 범용성 가진 문법 아닌가? 왜 템플릿을 사용해야 하는지?
A. 클래스가 가진 범용성은 기능을 묶어서 추상화한 것. **템플릿을 사용하면 데이터 형식까지 범용으로 만들 수 있음.**

## 클래스 템플릿에서의 형식 추론
- C++17 표준 이후부터 클래스 템플릿에서도 형식 추론 가능
```c++
#include <iostream>
using namespace std;

template <typename Type1, typename Type2>
class data_package {
public:
    data_package(Type1 first, Type2 second) : first(first), second(second) {}
    void print_out_element() {
        cout << "first element: " << first << ", second element: " << second << endl;
    }
private:
    Type1 first;
    Type2 second;
};

int main() {
    data_package template_inst1(5, 10.5);
    data_package template_inst2("string", 10);

    template_inst1.print_out_element();
    template_inst2.print_out_element();
}

```
→ 객체 생성 시 템플릿 매개변수의 데이터 형식 생략

![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-6.png)
→ **C++14**로 실행 결과 (에러 발생)

![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-7.png)
→ **C++17**로 실행 결과 (정상 동작)

**Q. 무조건 최신 버전의 컴파일러 쓰면 되지않나?**
**A. 프로그램 처음 개발할 때는 그렇게 하면 되지만, 이미 개발된 프로그램을 수정하거나 개방 도중 새 버전의 컴파일러가 배포되면 변경이 쉽지 않음. 또한 버전이 올라가면서 변경되거나 삭제되는 기능도 있으므로, 무조건 최신 버전 사용하면 오동작 가능.**

## 부분 특수화
```c++
#include <iostream>
using namespace std;

template <typename Type1, typename Type2>
class data_package {
public:
    data_package(Type1 first, Type2 second) : first(first), second(second) {}
    void print_out_element() {
        cout << "first element: " << first << ", second element: " << second << endl;
    }
private:
    Type1 first;
    Type2 second;
};

template <typename T>
class data_package<string, T> {
public:
    data_package(string first, T second) : first(first), second(second) {}
    void print_out_element() {
        cout << "element: " << first << " with another element: " << second << endl;
    }
private:
    string first;
    T second;
};
int main() {
    data_package<int, double> template_inst1(5, 10.5);
    data_package<string, int> template_inst2("STRING", 10);

    template_inst1.print_out_element();
    template_inst2.print_out_element();
    return 0;
}
```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-8.png)
→ 클래스 템플릿의 객체 생성 시, 첫 번째 인자가 string이면 부분 특수화가 적용된 class data_package\<string, T\> 가 인스턴스화 됨

- **클래스 템플릿은 선언과 정의가 같이 있어야 함**

## 중첩 클래스 템플릿
: 사용 방법은 크게 2가지

\[1\] 안쪽 클래스를 멤버 변수처럼 사용
- 클래스 템플릿을 사용하는 멤버 변수 사용 가능

\[2\] 안쪽 클래스를 독립된 객체로 선언해서 사용

```c++
#include <iostream>
using namespace std;

template <typename Type1, typename Type2>
class data_package {
public:
    template <typename Type3>            // 바깥쪽 템플릿 매개변수 사용
    class nested_class_data_package {    // 안쪽 클래스
    public:
        nested_class_data_package(Type3 data) : nested_class_data(data) {}
        Type3 get_element() { return nested_class_data; }
        Type3 nested_class_data;
    };

    template <typename Type4>    // 새 템플릿 매개변수 사용
    class nested_class {         // 안쪽 클래스
    public:
        nested_class(Type4 data) : nested_class_data(data) {}
        void print_out_element() {
            cout << "nested class data: " << nested_class_data << endl;
        }
    private:
        Type4 nested_class_data;
    };

    data_package(Type1 first, Type2 second) : first(first), second(second),
                                              internal_data(second) {}

    void print_out_element() {
        cout << "first element: " << first << ", second element: " << second << endl;
        cout << "nested class element: " << internal_data.get_element() << endl;
    }

private:
    Type1 first;
    Type2 second;
    nested_class_data_package<Type2> internal_data;   // [1] 멤버 변수로 선언

};
int main() {
    data_package<string, int> template_inst1("STRING", 10);
    data_package<string, int>::nested_class<int> template_inst2(500);   // [2] 객체로 선언

    cout << "nested class first caption" << endl;
    template_inst1.print_out_element();

    cout << endl << "nested class second caption" << endl;
    template_inst2.print_out_element();
}
```

## 템플릿 매개변수 기본값
- 템플릿 매개변수는 데이터의 형식 → 클래스 템플릿 객체 생성시, 기본 설정한 데이터 형식 지정 가능
```c++
#include <iostream>
using namespace std;

template <typename T = int>   // 기본 형식 설정
class data_package {
public:
    data_package(T first) : first(first) {}
    void print_out_element() {
        cout << "Class Template format parameter: " << first << endl;
    }
private:
    T first;
};

int main() {
    data_package<> template_inst1(5);   // 기본 형식(여기서는 int)으로 지정
    data_package<string> template_inst2("String data, not class template default");

    template_inst1.print_out_element();
    template_inst2.print_out_element();
}

```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-9.png)
→ 클래스 템플릿의 객체 생성시 형식 지정 안하거나 전체(\<\>)로 지정하면 int로 됨

## 클래스 템플릿 friend
```c++
// [클래스 템플릿을 friend로 선언]
#include <iostream>
using namespace std;

template <typename U>
class caller {
public:
    caller() : object(nullptr) {};
    void set_object(U* obj_pointer) { object = obj_pointer; }
    void printout_friend_object() {
        cout << "(friend class template call) template format parameter value: "
             << object->first << endl;
    }
private:
    U* object;
};

template <typename T = int>
class data_package {
public:
    data_package(T first) : first(first) {}
    friend caller<data_package>;
private:
    T first;
};

int main() {
    caller<data_package<>> caller_int_obj;
    caller<data_package<string>> caller_string_obj;
    data_package<> template_inst1(5);
    data_package<string> template_inst2("String data, not class template default");
    caller_int_obj.set_object(&template_inst1);
    caller_string_obj.set_object(&template_inst2);

    caller_int_obj.printout_friend_object();
    caller_string_obj.printout_friend_object();
}
```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-10.png)
→ friend 클래스는 반드시 friend로 지정되기 전에 선언, 정의가 있어야 함

```c++
// [클래스 템플릿 내부에 friend 함수 정의]
#include <iostream>
using namespace std;

template <typename T = int>
class data_package {
public:
    data_package(T first) : first(first) {}

    friend void printout_friend_element(data_package<T>& data_object) {
        cout << "(friend fucntion) Template parameter value : "
             << data_object.first << endl;
    }

private:
    T first;
};

int main() {
    data_package<> template_inst1(5);
    data_package<string> template_inst2("String data, not class template default");

    printout_friend_element(template_inst1);
    printout_friend_element(template_inst2);
}
```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-11.png)
→ 클래스 템플릿 내에서 friend 함수 선언 + 정의 동시
→ 가독성 떨어지므로, 선언만 하고 정의는 밖에서 하는게 좋음

```c++
#include <iostream>
using namespace std;

template <typename T = int>
class data_package {
public:
    data_package(T first) : first(first) {}
    template <typename C>
    friend void printout_friend_element(C& data_object);  // 프렌드 함수 선언
private:
    T first;
};

template <typename C>
void printout_friend_element(C& data_object) {    // 프렌드 함수 정의
    cout << "(friend fucntion) Template parameter value : "
         << data_object.first << endl;
}

int main() {
    data_package<> template_inst1(5);
    data_package<string> template_inst2("String data, not class template default");

    printout_friend_element(template_inst1);
    printout_friend_element(template_inst2);
}
```
![C++ 10. 템플릿 이미지](/SeonggukPark/images/notion/notes/cpp/10-templates-12.png)
→ 전역 범위에서 함수 정의시, data_package에서 선언한 템플릿 매개변수(T)는 사용 불가
→ printout_friend_element 함수를 위한 템플릿 매개변수(C)를 별도 선언

