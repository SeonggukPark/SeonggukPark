---
title: "C++ 04. 실행 흐름 제어"
description: "조건문과 반복문, 표현식과 구문을 통한 실행 흐름 제어를 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2a86b9674ad880c4b6d5fdbcdb0e075d"
importedAt: 2026-07-24
---

## (1) 조건문
- 기본적으로 C와 동일
### if문
- 실행할 구문이 오직 하나라면, 블록 지정 중괄호 생략 가능, but 실수 여지 높으므로 지양

### switch문
![C++ 04. 실행 흐름 제어 이미지](/SeonggukPark/images/notion/notes/cpp/04-control-flow-1.png)
→ break 생략하면 일치하는 case부터 break 만날때까지 (없다면 끝까지) 모든 구문 실행

Q. if문과 switch의 성능 차이?
A. 최신 컴파일러에서는 무시 가능한 수준. 가독성과 쉬운 코드 작성을 고려해서 적절하게 사용

## (2) 반복문
- 기본적으로 C와 동일
### while문
- C와 동일
- while과 달리, do while은 조건식이 구문 마지막에 존재
→ 즉, while - do\~while은 조건 평가의 순서 차이
→ do while은 코드 블록 최소 1회 수행

### for문

## (3) 표현식 및 구문의 차이
### 표현식(expression)
- 값을 계산하는 코드 조각
- 결과값이 존재함
- 피연산자-연산자로 구성되는 식 or 함수 호출 등이 대표적인 예
```c++
[표현식 예]
3 + 4         // 7
a * b         // 곱셈 결과
func(5)       // 함수의 반환값
```

### 구문(statement)
- 명령을 수행하는 코드 단위
- 결과값이 없음
- 프로그램의 실행 흐름을 제어함
- 컴파일러가 이해하고 실행 가능한 최소한의 코드 단위
```c++
[구문 예]
int a = 3;      // 선언 구문
a = 5;          // 대입 구문
if (a > 0) {}   // 제어 구문
return 0;       // 반환 구문
```
