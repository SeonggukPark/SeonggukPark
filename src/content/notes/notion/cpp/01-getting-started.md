---
title: "C++ 01. 프로그래밍 시작하기"
description: "C++의 발전 과정, 빌드 단계, 언어 특징과 개발 환경을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2a86b9674ad88095818fed099c93b738"
importedAt: 2026-07-24
---

## (1) C++ 언어 알아보기
### C++ 발전 과정
- **C with Classes** (C++ 초기 언어 규약)
- 클래스 도입

- **The C++ Programming** (추가된 언어 규약)
- new, delete 키워드를 통해 자동으로 메모리 할당 & 해제 가능
- 레퍼런스 개념 도입 → 포인터를 더욱 편리하게 다룰수 있게 됨
- 가상 함수 & 연산자 오버로딩 지원 → 다형성 완전 지원

- **C++98** (C++의 첫 번째 국제 표준)
- 템플릿 → 메타 프로그래밍 → STL

![C++ 01. 프로그래밍 시작하기 이미지](/SeonggukPark/images/notion/notes/cpp/01-getting-started-1.png)
→ C++98까지 발전 & C 표준과의 관계

### C++ 프로그램 빌드 과정
<callout color="gray_bg">
**전처리 → 컴파일 → 링크**
</callout>

- 전처리(pre-processing)
- 컴파일 전 소스 코드 변경 및 확장 등 작업
- 컴파일러가 전처리기에 지시하는 형태로 수행
- ‘#’ 기호로 시작하는 지시문 해석 & 소스 코드 변경하여 컴파일러에 전달

- 컴파일(compile)
- 소스 코드 → object 코드(.o, .obj)

- 링크(link)
- 각 종 library + object 코드를 연결

- 여러 소스 & 라이브러리 사용하는 경우
![C++ 01. 프로그래밍 시작하기 이미지](/SeonggukPark/images/notion/notes/cpp/01-getting-started-2.png)

### C++ 언어 특징
- 저수준 언어
- 객체지향 언어
- 객체(object): 속성(데이터)과 동작(함수)를 논리 단위로 모두 포함하는 것

<callout color="gray_bg">
💡 UML (Unified Modeling Language)
- 프로그램 설계 구조와 의도를 쉽게 전달하기 위한 언어
- 그림으로 표현 → ‘그래픽 언어’라고도 함
- app.diagrams.net에서 무료 도구 사용 가능
</callout>
<callout color="gray_bg">
💡 Class diagram
- 객체지향 시스템의 정적 구조를 표현하는 UML 다이어그램
</callout>

### C++ 활용 분야
- native application 개발
- 과학 기술 계산
- 임베디드 프로그래밍

### C++ 개발 생태계
- C++11부터 3년마다 새로운 표준안이 나옴 
![C++ 01. 프로그래밍 시작하기 이미지](/SeonggukPark/images/notion/notes/cpp/01-getting-started-3.png)
- C++11부터를 ‘Modern C++’이라 함
- CppCon이 유명한 C++ 커뮤니티

**IDE(통합개발환경, Integrated Development Environment)**
- Visual Studio, VSCode, xcode, eclipse 등

**컴파일러 및 디버거**
- GCC & GDB: GNU의 컴파일러 모음 프로젝트 및 GDB 디버거
- Clang & LLDB
- DPC++/C++

## (2) 개발 환경 준비하기
- int main() 처럼 리턴값 있는 함수는 return 포함해야 하지만, main()은 특별한 함수이므로 생략해도 return 0를 반환
