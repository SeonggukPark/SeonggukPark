---
title: "C++ 05. 예외 처리"
description: "try·catch·throw, assert, noexcept와 예외 실패 대응을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2a66b9674ad880c6887ff930d33dca49"
importedAt: 2026-07-24
---

## (1) 예외 처리 구문
- **예외처리: 프로그램 실행 중 발생할 수 있는 비정상적인 상황을 감지하고, 그에 적절히 대응하여 프로그램의 비정상 종료를 막는 과정**
- C에서는 일반적으로 조건문과 return을 활용해서 예외 처리
### try, catch, throw 문
- try: 예외가 발생할 수 있는 코드 블록을 중괄호 \{ \} 로 감싼다
- throw: 예외를 catch 블록으로 던진다
- catch: throw로 던진 예외를 받아서 처리한다
```c++
try {
// 예외를 던질 수 있는 코드
throw 예외_값
}

catch (예외_형식 예외_이름) {
// 예외 처리 코드
}
```
```c++
int main() {
  try {
    int divisor = 0;
    // 0으로 나누려는 경우 예외 발생
    if (divisor == 0) {
      throw std::runtime_error("0으로 나눌 수 없습니다!");
    }
    int result = 10 / divisor;
    std::cout << "결과: " << result << std::endl;
  }
  catch (const std::runtime_error& e) {
    // 예외 발생 시 처리
    std::cout << "예외 발생: " << e.what() << std::endl;
  }
  return 0;
}
```
→ std:\:runtime_error\: 런타임 오류를 나타내는 예외 클래스
-  상속구조
![C++ 05. 예외 처리 이미지](/SeonggukPark/images/notion/notes/cpp/05-exceptions-1.png)

→ e.what(): 예외 메시지를 출력

- throw를 받아주는 catch문이 없으면 에러 발생
→ catch(…) 문으로 명시하지 않은 나머지 모든 예외를 받아서 처리
→ 남용하면 예외 원인 파악 힘듦

- 스택 풀기 (stack unwinding)
- `try-catch`에서 예외가 발생했을 때, 예외가 **전달되는 과정에서 스택 프레임이 하나씩 해제되는 과정**
```c++
#include <iostream>
using namespace std;

void funcC() {
    cout << "funcC 시작\n";
    throw runtime_error("에러 발생!");  // 예외 발생
    cout << "funcC 끝\n"; // 실행 안됨
}

void funcB() {
    cout << "funcB 시작\n";
    funcC();  // 예외 발생 지점
    cout << "funcB 끝\n"; // 실행 안됨
}

void funcA() {
    cout << "funcA 시작\n";
    try {
        funcB();
    }
    catch (const exception& e) {
        cout << "funcA에서 예외 처리: " << e.what() << endl;
    }
    cout << "funcA 끝\n";
}

int main() {
    funcA();
}

```
![C++ 05. 예외 처리 이미지](/SeonggukPark/images/notion/notes/cpp/05-exceptions-2.png)

### assert
- 예상치 못한 상황에서 프로그램 동작을 중단
- 디버그 모드에서 오류 가능 부분 검사 가능한 매크로
- \<cassert\> 헤더에 정의된 assert 매크로를 통해 처리 가능

### 디버그-릴리즈 모드
![C++ 05. 예외 처리 이미지](/SeonggukPark/images/notion/notes/cpp/05-exceptions-3.png)
![C++ 05. 예외 처리 이미지](/SeonggukPark/images/notion/notes/cpp/05-exceptions-4.png)
→ cerr은 C++ 표준 라이브러리에서 제공하는 표준 에러 출력 스트림<br>→ cerr은 cout과 달리, 버퍼링되지 않으므로 오류 메시지가 발생한 시점에 즉시 출력되어 프로그램이 비정상적으로 종료되었을 때 사용자에게 빠르게 정보를 제공 가능
→ 일반적으로 프로그램에서 오류 메시지를 출력할 때 cerr을 사용하는 것이 좋음
## (2) 예외 처리 생략 및 실패 대응
### noexcept
- 예외 처리 생략
```c++
[1. 함수가 예외를 던지지 않음을 명시]
int func() noexcept {
~~
}

[2. 함수가 예외를 던지는지 확인]
bool does_not_throw = noexcept(my_func());
```

Q. noexcept 명시된 함수에서 throw를 하면?
A. 컴파일은 되는데 실행하면 런타임 오류 발생

### set_terminate
- 예외 처리 실패 대응
- 프로그램 종료 직전 호출되는 마지막 예외 처리기
```c++
#include <exception>
#include <iostream>
using namespace std;

void customTerminate() {
    cerr << "error can't be recovered happened.." << endl;
    abort();  // 강제 종료
}

int main() {
    set_terminate(customTerminate);  // 사용자 정의 종료 함수 등록
    throw 42;  // 어떤 catch에도 잡히지 않음 → terminate() 호출
}
```
![C++ 05. 예외 처리 이미지](/SeonggukPark/images/notion/notes/cpp/05-exceptions-5.png)
→ cerr은 C++ 표준 라이브러리에서 제공하는 표준 에러 출력 스트림
→ cerr은 버퍼링되지 않으므로 오류 메시지가 발생한 시점에 즉시 출력되어 프로그램이 비정상적으로 종료되었을 때 사용자에게 빠르게 정보를 제공 가능
→ 일반적으로 프로그램에서 오류 메시지를 출력할 때 cerr을 사용하는 것이 좋음
