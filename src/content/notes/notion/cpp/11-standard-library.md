---
title: "C++ 11. 표준 라이브러리"
description: "C++ 표준 라이브러리의 구성과 문자열 처리 기능을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2ca6b9674ad880c9a617f180446c3cfd"
importedAt: 2026-07-24
---

# (1) 표준 라이브러리 구성과 사용법
## 표준 라이브러리 구성
- C++ 표준 라이브러리는 100여 개가 넘는 헤더 파일로 구성
- 다 외울 필요는 없고, 필요할 때 참고하면 됨
- [https://en.cppreference.com/w/cpp/header](https://en.cppreference.com/w/cpp/header.html)
- 표준 라이브러리 말고도 개인, 조직이 개발한 라이브러리를 **‘서드 파티 라이브러리’** 라고 함
- ex) OpenCV, TensorFlow
- 일반적으로 헤더 파일에는 함수, 변수가 선언만 되어있고, 내용은 표준 런타임 라이브러리에 정의

### 주요 기능
- **입출력**: 입출력 스트림 → 파일, 키보드, 화면과의 상호 작용 지원
- **문자열 처리**: 문자열 조작, 검색, 대/소문자 변환 등
- **컨테이너**: 벡터, 리스트, 큐, 스택 등 자료구조 → 데이터 저장 및 관리
- **알고리즘**: 검색, 정렬, 변환 등
- **기타 유틸리티**

### 표준 라이브러리 사용 방법
```c++
#include <파일_이름>
```

# (2) 문자열 라이브러리
## std::string
- 표준 문자열 라이브러리
```c++
// [객체 초기화 방법]
string str1("Hello"); // 생성자 호출로 초기화
string str = "Hello"; // 대입 연산으로 초기화
```

### 문자열 길이 구하기 - length, size
```c++
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str1("Hello");
    cout << str1 << endl;

    cout << str1.length() << endl;
    cout << str1.size() << endl;

    return 0;
}
```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-1.png)
→ length: 문자열 길이 반환
→ size: 해당 객체가 차지하는 메모리의 크기 반환
→ 결과 같더라도, 길이 구할때는 length 함수 사용할 것

### 빈 문자열 검사 - empty
```c++
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str1("");

    cout << std::boolalpha;
    cout << str1.empty() << endl;    // true 또는 false 출력

    return 0;
}
```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-2.png)
→ **std::boolalpha**: cout에서 논리형 값을 true, false로 출력 (cout \<\< noboolalpha로 원래대로)

### 문자열 추가 - append
```c++
// [append 사용법]
문자열.append("추가할_문자열")
문자열.append("추가할_문자열", 문자열_시작_인덱스, 문자_개수)

// [append 예제]
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str1("Hello");
    str1.append(" World!");
    cout << str1 << endl;

    string str2("Hello");
    str2.append(" World!", 6, 1); // " World!"에서 6번 인덱스부터 1개 문자(!) 추가
    cout << str2 << endl;

    return 0;
}

```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-3.png)

### 문자열 찾기 - find
```c++
// [find 사용법]
문자열.find(찾을_문자열);
문자열.find(찾을_문자);
문자열.find(찾을_문자열, 시작_위치);
```
- 문자열 찾기 성공시: 해당 문자열의 시작 위치 반환
- 문자열 찾기 실패시: 정수 타입의 **string::npos** 상수 반환

```c++
#include <iostream>
#include <string>
using namespace std;

void check_found(string::size_type n) {
    if (n == string::npos) {
        cout << "not found" << endl;
    }
    else {
        cout << "found index: " << n << endl;
    }
}

int main() {
    string::size_type n;
    string str = "This is an example of a standard string.";

    // 문자열 시작 지점부터 "example" 탐색
    n = str.find("example");
    check_found(n);

    // 문자열 내 index 위치 4부터 "is" 탐색
    n = str.find("is", 4);
    check_found(n);

    // 문자열 시작 지점부터 'x' 탐색
    n = str.find('k');
    check_found(n);

    return 0;
}

```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-4.png)

### 문자열 비교 - compare
```c++
// [compare 사용법]
대상_문자열.compare(비교할_문자열);
```
→ 리턴 값 0: 두 문자열이 완전히 일치
→ 리턴 값 양수: 대상 문자열이 더 길거나 일치하지 않는 첫 번째 문자가 더 큼
→ 리턴 값 음수: 대상 문자열이 더 짧거나 일치하지 않는 첫 번째 문자가 더 작음

```c++
#include <iostream>
#include <string>
using namespace std;

int main() {
    // 1. s1, s2 문자열이 같을 때
    string s1 = "Hello";
    string s2 = "Hello";
    cout << s1.compare(s2) << endl;

    // 2. s1 문자열의 길이가 더 짧을 때
    s1 = "Hello";
    s2 = "Hello World";
    cout << s1.compare(s2) << endl;

    // 3. s1 문자열의 첫 번째 문자가 알파벳 순서상 먼저 나올 때
    s1 = "cat";
    s2 = "dog";
    cout << s1.compare(s2) << endl;

    // 4. s1 문자열의 길이가 더 클 때
    s1 = "Hello World";
    s2 = "Hello";
    cout << s1.compare(s2) << endl;

    // 5. s1 문자열의 길이가 더 짧지만,
    //    일치하지 않는 첫 번째 문자가 알파벳 순서상 늦게 나올 때
    s1 = "cat";
    s2 = "apple";
    cout << s1.compare(s2) << endl;

    return 0;
}
```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-5.png)
→ 반환값의 부호만 의미가 있음

- 관계 연산자로도 string 비교 가능
```c++
#include <iostream>
#include <string>
using namespace std;

int main() {
    cout << std::boolalpha;

    string s1 = "Hello";
    string s2 = "Hello";
    cout << (s1 == s2) << endl;

    s1 = "Hello";
    s2 = "World";
    cout << (s1 != s2) << endl;

    return 0;
}
```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-6.png)

### 문자열 교체 - replace
**\[1\] string**
```c++
// 1. string
string& replace(size_t pos, size_t count, const string& str);

std::string s = "Hello World";
s.replace(6, 5, "C++");
cout << s << endl;  // Hello C++
```
→ `pos` : 시작 인덱스 / `count` : 제거할 문자 개수 / `str` : 대체할 문자열
→ “Hello World”에서 6번 인덱스에 있는 “W”부터 5개 문자를 “C++”로 교체

**\[2\] substring**
```c++
string& replace(size_t pos, size_t count, const string& str,size_t 
subpos, size_t sublen);

std::string s = "abcdef";
std::string t = "XYZ123";

s.replace(2, 3, t, 1, 2);
// 결과: abYZf
```
→ `subpos` : `str`에서 사용할 시작 위치 / `sublen` : `str`에서 사용할 문자 수
→ “abcdef”에서 2번 인덱스부터 3개 문자를(”cde”) t의 1번 인덱스부터 2개 문자(”YZ”)로 교체				
**\[3\] cstring**
```c++
string& replace(size_t pos, size_t count, const char* s);
```

- replace 함수는 보통 find 함수와 함께 사용
→ URL, 쿼리 등 다룰 때 특정 문자열 찾아 다른 문자열로 교체하는 등
```c++
#include <iostream>
#include <string>
using namespace std;

int main() {
    std::string s = "one two two three";
    size_t pos = 0;

    while ((pos = s.find("two", pos)) != string::npos) {
        s.replace(pos, 3, "2");
        pos += 1;
    }

    cout << s << endl;
}
```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-7.png)
→ 문자열에서 `"two"`를 모두 찾아 `"2"`로 치환

### 와이드 문자열 - wstring
- C++11부터 제공하는 와이드 문자열 형식
- 유니코드, 다국어 문자열 처리할 때 주로 필요

# (3) 파일 시스템
- 데이터를 저장하고 관리하는 체계
- C++17부터 파일 시스템 라이브러리 지원 (std::filesystem, \<filesystem\>)
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-8.png)

### 절대 경로 vs 상대 경로
**절대 경로**
- 루트에서 내가 원하는 파일까지의 전체 경로
- 윈도우는 주로 ‘C:\\’, ‘D:\\’이고, 리눅스는 ‘/’로 표기 가능

**상대 경로**
- 현재 위치를 기준으로 한 경로

### path 객체
- 파일, 디렉터리 다루는 모든 함수는 path 객체를 매개 변수로 받으므로, 보통 다음 순서로 작업
(1) 원하는 경로의 path 정의
(2) 해당 path로 파일/디렉터리 정보 수집
- path 객체 만으로는 파일 존재 여부 모르므로, exists 함수 사용해야 함

## 파일 시스템 활용하기
- 파일 시스템 라이브러리는 원래 boost의 filesystem을 C++17 표준에 병합한것

```c++
#include <iostream>
#include <string>
#include <filesystem> // 파일 시스템 헤더 파일
#include <fstream>    // 파일 입출력 헤더 파일

using namespace std;

namespace fs = filesystem;

int main() {
  // 1. 디렉터리 생성 (이미 존재하면 아무 작업 X)
  fs::create_directories("MyDirectory");

  // 2. 파일 생성 및 쓰기
  ofstream outFile("MyDirectory/myFile.txt");
  outFile << "Hello, FileSystem Library!" << endl;
  outFile.close();

  // 3. 디렉터리 내의 파일 확인
  cout << "Files in MyDirectory:\n";
  for (const fs::directory_entry& entry : fs::directory_iterator("MyDirectory")) {
    if (entry.is_regular_file()) {
      cout << entry.path().filename() << endl;
    }
  }

  // 4. 파일 읽기
  ifstream inFile("MyDirectory/myFile.txt");
  string line;
  while (getline(inFile, line)) {
    cout << line << endl;
  }
  inFile.close();

  // 5. 파일 및 디렉터리 삭제
  fs::remove_all("MyDirectory");

  return 0;
}

```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-9.png)

# (4) 기타 유용한 함수
## 난수 생성
- 기존 C/C++에도 rand/srand 함수 존재
→ rand는 난수 생성 패턴 1개, srand는 여러개
→ but, 난수의 범위가 생각보다 넓지 않아 균등하게 분포되지 않을 수 있음
→ C++11부터 고품질의 난수 생성기와 분포 클래스 제공 (random 헤더 파일의 std::mt19937)

```c++
#include <iostream>
#include <random>
using namespace std;

int main() {
    mt19937_64 mt_rand;

    for (int i = 0; i < 10; i++) {
        cout << mt_rand() << endl;
    }

    return 0;
}
```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-10.png)
→ 시드를 사용하지 않아 실행 할때마다 같은 결과 출력
→ 시드 값으로 시간도 가능하지만, **하드웨어 엔트로피(시스템에서 발생하는 무작위성) 활용 가능**
→ random_device 클래스

```c++
#include <iostream>
#include <random>
#include <ctime>
using namespace std;

int main() {
    random_device rng;
    time_t now = time(nullptr);
    cout << ctime(&now);

    for (int i = 0; i < 10; i++) {
        auto result = rng();
        cout << result << endl;
    }

    return 0;
}
```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-11.png)
→ 다른 결과 출력

- **random_device는 mt19937 엔진 보다 느리므로, 생성할 난수가 많을 때는 mt19937 엔진을 사용하고, random_device는 엔진의 시드값 생성하는 데만 사용**
```c++
#include <iostream>
#include <random>

using namespace std;

int main() {
    random_device rng;
    mt19937_64 mt_rand(rng());  // 시드는 한 번만

    for (int i = 0; i < 10; i++) {
        cout << mt_rand() << endl;
    }

    return 0;
}

```

## 수학 함수
- \<cmath\> 헤더 파일 통해 사용 가능
- 원주율 파이(pi)를 나타내는 상수 numbers::pi는 C++20부터 사용 가능
```c++
#include <iostream>
#include <cmath>
#include <numbers>

using namespace std;

int main() {
    double x = 2;
    double y = 3;
    cout << "x = " << x << ", " << "y = " << y << endl;
    cout << "pow(x, y) = " << pow(x, y) << endl;
    cout << "sqrt(x) = " << sqrt(x) << endl;
    cout << "log(x) = " << log(x) << endl;
    cout << endl;

    x = 2.847;
    y = -3.234;
    cout << "x = " << x << ", " << "y = " << y << endl;
    cout << "ceil(x) = " << ceil(x) << ", ceil(y) = " << ceil(y) << endl;
    cout << "floor(x) = " << floor(x) << ", floor(y) = " << floor(y) << endl;
    cout << "round(x) = " << round(x) << ", round(y) = " << round(y) << endl;
    cout << "abs(x) = " << abs(x) << ", abs(y) = " << abs(y) << endl;
    cout << endl;

    cout << "PI = " << numbers::pi << endl;
    cout << "sin(PI/3) = " << sin(numbers::pi / 3) << endl;
    cout << "cos(PI/3) = " << cos(numbers::pi / 3) << endl;
    cout << "tan(PI/3) = " << tan(numbers::pi / 3) << endl;

    return 0;
}
```
![C++ 11. 표준 라이브러리 이미지](/SeonggukPark/images/notion/notes/cpp/11-standard-library-12.png)

## 복사 함수
- 복사를 반복문으로 구현하면 코드도 길고, 시간도 오래 걸릴 수 있음 → copy 함수 제공
- ***단, 컨테이너 요소가 포인터일 경우 얕은 복사로 됨***

```c++
#include <vector>
#include <algorithm>

std::vector<int> src = {1, 2, 3};
std::vector<int> dst;

// std::copy(src.begin(), src.end(), dst.begin()); // ❌ UB
std::copy(src.begin(), src.end(), std::back_inserter(dst));
```
→ `std::back_inserter`:  컨테이너의 `push_back()`을 출력 반복자 형태로 감싸는 어댑터
