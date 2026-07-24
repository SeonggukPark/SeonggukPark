---
title: "C++ 07. 객체지향 프로그래밍 특징"
description: "Notion MCP에서 직접 가져온 C++ 07. 객체지향 프로그래밍 특징 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2a86b9674ad880d182f5e0a20c8cb881"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

# (1) 추상화와 캡슐화
## 추상화 (Abstraction)
- 복잡한 자료, 모듈, 시스템 등으로부터 핵심 개념이나 기능을 간추리는 것
- 공통된 특징은 추출하고 불필요한 부분은 제거 → 코드를 간결하고 이해하기 쉽게 만드는 것
- 클래스를 만드는 과정과 밀접한 관계
- 공통 특징 추출 + 불필요한 요소 제거

## 캡슐화 (Encapsulation)
- 변수와 함수를 클래스로 감싸서 외부의 개별 접근을 차단 (은닉화; Hiding)
- 속성과 행위를 하나로 묶어 관리 → 복잡도 ↓, 재사용성 ↑

### **은닉화와 접근 지정자**
- 은닉화는 객체의 내부 구현을 숨겨 외부로부터 잘못된 접근을 막고 안정적이고 일관된 사용을 보장하기 위함
- C++에서는 은닉화를 위해 접근 지정자(aaccess specifier) 제공
- 접근 지정자는 컴파일 단계에서 접근 권한을 통제할 수 있게 해줌
<table>
<colgroup>
<col>
<col>
</colgroup>
<tr>
<td>접근 지정자</td>
<td>설명</td>
</tr>
<tr>
<td>private</td>
<td>클래스 내의 멤버 함수에서만 접근 가능</td>
</tr>
<tr>
<td>public</td>
<td>다른 클래스 어디서든 접근 가능</td>
</tr>
<tr>
<td>protected</td>
<td>클래스 내의 멤버 함수나 상속 관계의 클래스에서 접근 가능</td>
</tr>
</table>
→ 클래스의 멤버는 접근 지정자 생략 시 private으로 선언
→ 구조체에서는 클래스와 달리 public

### 접근 지정자 적용
- 클래스 다이어그램에서 멤버 앞 ‘-’ 기호는 private, ‘+’ 기호는 public을 의미
```c++
[은행 예시]
// 금고는 private 멤버 변수, 은행원은 public 멤버 함수
// -> 은행원 통해서만 금고 접근 가능

#include <iostream>
using namespace std;

class bank {
private:
    int safe;    // 금고

public:
    bank();      // 기본 생성자
    void use_counter(int _in, int _out);   // 입출금 창구 함수
};

bank::bank() {
    safe = 1000;    // 은행 금고 초기 금액 설정
    cout << "최초 금고 : " << safe << endl;
    cout << endl;
}

void bank::use_counter(int _in, int _out) {
    safe += _in;     // 입금
    safe -= _out;    // 출금

    cout << "입금 : " << _in << endl;
    cout << "출금 : " << _out << endl;
    cout << "금고 : " << safe << endl;
    cout << endl;
}

int main() {
    bank my_bank; // my_bank 인스턴스 생성

    my_bank.use_counter(0, 20);     // 출금 20
    my_bank.use_counter(50, 0);     // 입금 50
    my_bank.use_counter(100, 50);   // 입금 100, 출금 50

    return 0;
}

```

- 클래스(class): 객체를 구현하기 위한 설계도
- 객체(object): **논리적 개념**으로 클래스로 구현하고자 하는 대상, 또는 인스턴스를 달리 부를 때 사용
- 인스턴스(instance): 클래스 정의에 따라 **메모리에 실체화된** 객체의 형태

# (2) 상속성과 다형성
## 상속성(Inheritance)
- 클래스를 만들 때 다른 클래스의 멤버를 물려받는 것
- 상속 받은 클래스: **자식 클래스, 파생 클래스, 하위 클래스** 라고 함
- 상속해 주는 클래스: **부모 클래스, 기본 클래스, 슈퍼 클래스 **라고 함
- 자식 클래스는 부모 클래스를 대체할 수 있음
→ 부모 클래스를 자식 클래스로 치환(substitution)할 수 있어야 함 (리스코프 치환 원칙)
→ 부모가 외부로 노출한 함수의 시그니처를 그대로 상속해야 함
*\* 함수 시그니쳐(signature): 함수의 이름, 매개 변수 구성, 반환 형식을 아우르는 말*

### 단일 상속 & 다중 상속
- 단일 상속(single inheritance): 클래스를 상속받을 때 부모 클래스를 하나만 지정
- 다중 상속(multiple inheritance): 다른 종류의 클래스를 둘 이상 상속 받는 것
```c++
[단일 상속]
class player : public character {
public:
player(){};
};

[다중 상속]
class monster_a : public monster, character { 
public:
~
};
```
→ 접근 지정자 생략 시 privated로 상속 
→ 위 코드에서 monster_a는 character 클래스를 private으로 상속 받음

## 다형성(Polymorphism)
- 상속받은 클래스들이 부모와 다른 다양한 특성을 가지는 것
- 하위 호완성 (backward compatibility) 처리할 때도 사용
- 팩토리 패턴 (factory pattern): 인스턴스를 생성하는 별도의 팩토리 클래스를 도입 → 인스턴스 생성을 캡슐화 하는 것

### 오버라이딩(overriding)
- 시그니처는 그대로 유지하면서 부모 클래스에 정의된 함수를 자식 클래스에서 재정의 하는 것
- 객체지향에서 다형성 구현을 위해 필요
- 네임스페이스를 통해 부모 클래스의 정의 사용 가능

### 가상함수를 통한 오버라이딩
```c++
#include <iostream>
using namespace std;

int main() {
    player player_1;
    monster_a forest_monster;

    monster& mon = forest_monster;
    monster_a& mon_a = forest_monster;

    cout << endl << "부모 클래스 레퍼런스로 공격" << endl;
    mon.attack_special(player_1);

    cout << endl << "자식 클래스 레퍼런스로 공격" << endl;
    mon_a.attack_special(player_1);

    return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-1.png)
→ 자식 클래스를 부모 클래스의 레퍼런스로 접근하면 부모 클래스에 정의된 함수가 호출 됨
→ 이를 해결하기 위해 **가상 함수(virtual function) **활용

- 멤버 함수 이름 앞에 virtual이라는 키워드로 선언하면 가상 함수가 됨
- 이후 자식 클래스에서 가상함수를 오버라이딩하면 런타임 때에 올바른 버전의 함수가 호출 됨
- 상위 클래스에 정의된 함수 호출할 때는 네임스페이스 활용

# (3) 생성자와 소멸자
## 생성자 (Constructor)
- 객체가 생성된 직후에 자동으로 호출되는 함수
```c++
[생성자 선언]
클래스_이름();

[생성자 정의]
#include <iostream>
using namespace std;

class character {
public:
    character() {
        cout << "character 클래스 생성자" << endl;
    };
};

int main() {
    character player;
    return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-2.png)

### 상속 클래스의 생성자
- 상속받은 모든 부모의 생성자 호출
- 상속받은 순서대로 부모 생성자 먼저 호출 → 자식 생성자 호출
```c++
#include <iostream>
using namespace std;

class character {
public:
    character() {
        cout << "character 클래스 생성자" << endl;
    };
};

class monster {
public:
    monster() {
        cout << "monster 클래스 생성자" << endl;
    };
};

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster, character { // monster 먼저 상속
public:
    monster_a() {
        cout << "monster_a 클래스 생성자" << endl;
    };
};

int main() {
    monster_a forest_monster;
    return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-3.png)
→ 상속 받은 순서대로 monster → character 호출 후 자식 생성자 monster_a 호출

### 값을 전달받는 생성자
```c++
#include <iostream>
using namespace std;

class character {
public:
    character() {
        cout << "character 클래스 생성자" << endl;
    };
};

class monster {
public:
    monster() {
        cout << "monster 클래스 생성자" << endl;
    };
};

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster, character {
public:
    monster_a() {
        cout << "monster_a 클래스 생성자" << endl;
    };

    monster_a(int x, int y) : location{ x, y }
        cout << "monster_a 클래스 생성자 (매개변수 추가)" << endl;
    };

    void show_location() {
        cout << "위치(" << location[0] << " , " << location[1] << ")" << endl;
    };

private:
    int location[2];
};

int main() {
    monster_a forest_monster;
    forest_monster.show_location();
    monster_a wood_monster(10, 25);
    wood_monster.show_location();

    return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-4.png)
→ 위 코드에서 **location\{ x, y \}**는 초기화 목록이라 하며, 매개변수로 전달 받은 값으로 멤버 변수 초기화
→ 객체 생성할 때 입력된 파라미터에 맞는 생성자만 호출됨

### 생성자에서 다른 생성자 호출
```c++
[잘못된 예시]
#include <iostream>
using namespace std;

// ... (생략) ...

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster, character {
public:
    monster_a() {
        cout << "monster_a 클래스 생성자" << endl;
        monster_a(10, 10); // 의미 없는 호출
    };

    monster_a(int x, int y) : location{ x, y } {
        cout << "monster_a 클래스 생성자 (매개변수 추가)" << endl;
    };
    void show_location() {
        cout << "위치(" << location[0] << " , " << location[1] << ")" << endl;
    };

private:
    int location[2];
};

int main() {
    monster_a forest_monster;
    forest_monster.show_location();

    return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-5.png)
→ monster_a() 내부에서 monster_a(10, 10) call 하면 이름 없는 객체라서 의미 X

```c++
[올바른 예시]
#include <iostream>
using namespace std;
 
// ... (생략) ...
 
//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_a : public monster, character {
public:
    monster_a() : monster_a(10, 10) { // 초기화 목록으로 다른 생성자 호출 (C++11부터 지원)
        cout << "monster_a 클래스 생성자" << endl;
    };

    monster_a(int x, int y) : location{ x, y } {
        cout << "monster_a 클래스 생성자 (매개변수 추가)" << endl;
    };

    void show_location() {
        cout << "위치(" << location[0] << " , " << location[1] << ")" << endl;
    };

private:
    int location[2];
};

int main() {
    monster_a forest_monster;
    forest_monster.show_location();

    return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-6.png)

### 복사 생성자
- 객체가 복사될 때 자동으로 호출되는 함수

**얕은 복사 (Shallow Copy)**
- 정적 멤버 변수의 값만 그대로 복사하는 방식
- 동적 할당된 멤버 변수가 있을 경우 포인터 주소만 복사되고, 동적 메모리 자체는 공유

**깊은 복사 (Deep Copy)**
- 포인터나 동적 자원을 포함한 객체 자체의 실제 데이터까지 새로 복사하는 방식
- 즉, 새로운 메모리를 할당하고, 그 안에 값을 복사
```c++
[복사 생성자 선언]
// 클래스_이름::클래스이름(const 클래스_이름 &레퍼런스 변수)
monster_b::monster_b(const monster_b& ref) : unique_id(++total_count), target(ref.target);

```

Q. 다음 코드의 결과가 이상한 이유?
```c++
[잘못된 코드]
#include <iostream>
#include <string>
#include <cstring>
using namespace std;

// ... (생략) ...

int main() {
  player first_player;
  monster_b first_mon(first_player);
  first_mon.set_quiz("아침에 네발, 점심에는 두발, 저녁에는 두발인 것은?");
  first_mon.set_difficult_level(100);
  first_mon.set_type("수수께끼 몬스터");
  first_mon.set_location(30, 30);

  monster_b second_mon = first_mon;
  second_mon.set_quiz("문이 뒤집어 지면 무엇이 될까?");
  second_mon.set_location(45, 50);

  cout << "[" << first_mon.get_x_location() << " , " << first_mon.get_y_location()
    << "] 첫번째 몬스터(" << first_mon.get_type() << " - "
    << first_mon.get_difficult_level()
    << ")가 내는 수수께끼 : " << first_mon.get_quiz() << endl;
  cout << "[" << second_mon.get_x_location() << " , " << second_mon.get_y_location()
    << "] 두번째 몬스터(" << second_mon.get_type() << " - "
    << second_mon.get_difficult_level()
    << ")가 내는 수수께끼 : " << second_mon.get_quiz() << endl;

  return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-7.png)
<br>A. 얕은 복사로 인해 두 몬스터가 같은 quiz 버퍼를 공유하기 때문
→ second_mon을 first_mon의 얕은 복사로 생성
→ 기존 “아침에 네발, \~” 이었던 quiz 버퍼를 “문이 뒤집어 지면 \~”으로 변경
→ main 종료 후 second_mon 소멸 하며 quiz 버퍼 해제
→ 이후 first_mon 소멸하며 이미 소멸 된 quiz 버퍼를 다시 해제하면서 에러 발생
→ 깊은 복사로 해결해야 함

```c++
[수정 코드]
#include <iostream>
#include <string>
#include <cstring>
using namespace std;

// .. (생략) ..

//몬스터 A는 기본 Monster 클래스로부터 상속
class monster_b : public monster, character {
public:
    monster_b(player& attach_target)
            : monster_type("일반"),       // 직접 초기화
              location{ 0,0 },              // 유니폼 초기화
              unique_id(++total_count),     // 상수 변수 초기화
              target(attach_target) {       // 레버런스 변수 초기화
        difficult_level = 10;         // 복사초기화
        quiz = new char[1024];        // 동적 메모리 할당
    };

    ~monster_b() {
        delete[]quiz;
        total_count--;
    };

    monster_b(const monster_b& ref);

    // .. (생략) ..
};

int monster_b::total_count = 0; // 정적 변수 초기화

monster_b::monster_b(const monster_b& ref) : unique_id(++total_count), target(ref.target) {
    quiz = new char[1024];
    strcpy_s(quiz, strlen(ref.quiz) + 1, ref.quiz);
    monster_type = ref.monster_type;
    difficult_level = ref.difficult_level;
    location[0] = ref.location[0];
    location[1] = ref.location[1];
}

int main() {
  // ... (생략) ...
    return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-8.png)
→ 복사 생성자를 오버로딩해서 수수께끼를 저장할 멤버 변수를 동작할당

## 멤버 변수 초기화
- 클래스의 멤버 변수는 멤버 함수의 실행 중 값이 정해지더라도 초기값을 설정하는 것이 오류 방지에 도움이 됨

### 일반 멤버 변수 초기화
- 일반 대입 연산(=)과, 생성자 선언 뒤 초기화 목록을 이용하는 방법 존재
→ 초기화 목록은 대입 연산이 아닌 직접 초기화 구문 사용
```c++
monster_b() : monster_type("일반"){
difficult_level = 10;
};
```
- 클래스 변수는 직접 초기화(초기화 목록)와 복사 초기화(대입 연산) 사이의 성능 차이 존재

### 레퍼런스 멤버 변수와 상수(const) 멤버 변수 초기화
- 레퍼런스 변수와 상수 변수는 선언과 동시에 값이 정해져야 함
- 두 변수는 객체 생성 시 반드시 초기화 해야함

### 정적(static) 멤버 변수 초기화
- 클래스 멤버 변수를 static으로 선언하면 해당 클래스로 생성되는 모든 객체에서 참조 가능
→ 객체가 어디서 생성될 지 사전에 모르기 때문에, 프로그램 실행 시점에 값이 정해져야 함
→ **즉, 클래스에 선언한 정적 변수는 전역 범위에서 초기화해야 함**

- 전역 범위에서 초기화 하므로, 어떤 클래스에 속한 멤버인지 알기 위해 네임스페이스 추가
```c++
[정적 멤버 변수 초기화]
int A::count = 0; // 클래스_이름::정적_멤버_변수 = 값;
```

## 소멸자 (Destructor)
- 객체가 소멸할 때 필요한 메모리 해제나 외부 환경을 객체 생성 이전 상태로 변경하는 등의 역할

### 기본 소멸자
```c++
[소멸자 선언]
// ~클래스_이름()
~monster_a() {
    cout << "monster_a 클래스 소멸자" << endl;
};
```

### 가상 소멸자
- 리스코프 치환 원칙에 따르면, 자식 클래스는 언제든지 부모 클래스를 대신할 수 있어야 함
→ 부모 클래스의 포인터에 자식 클래스의 객체를 생성하면, 자식 클래스의 소멸자 호출 X
→ 자식 클래스의 소멸자를 호출하려면, 부모 클래스의 소멸자를 가상함수로 만들어야 함

# (4) 자신을 가리키는 this 포인터
- this: 객체 내부에서 객체 자신을 가리키는 키워드
## 객체의 메모리 할당
- 멤버 함수는 메모리에 한 번만 적재 → 같은 클래스의 객체가 추가되더라도 똑같은 함수 참조

## this 포인터
- 멤버 함수 내에서 자동으로 생성되어 해당 함수가 속한 객체의 주소를 가리킴
- 멤버 함수를 호출하는 코드에서는 객체의 주소를 첫 번째 인자로 전달하고, 이에 맞춰서 멤버 함수에서는 this 포인터로 주소를 전달 받아서 멤버 변수에 접근할 때 사용
→ 메모리 효율적으로 활용하기 위한 방법, 개발자가 직접 작성은 X

### \[1\] 지역변수와 구별할 때
```c++
// .. (생략) ..
void bank::transfer_account(int safe) {
    this->safe = safe;
    cout << bank_name << "으로 계좌 이동: " << safe << endl;
}

// .. (생략) ..
int main() {
    bank rich_bank("부유한 은행"), global_bank("세계적 은행");
    rich_bank.use_counter(50, 10);

    global_bank.transfer_account(rich_bank.get_safe());
    rich_bank.reset_account();

    return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-9.png)
→ 협업시 멤버 변수나 매개변수 이름이 겹칠 수 있는데, 이럴 때 this 활용 가능

### \[2\] 멤버 함수 체이닝 구현
- 함수 체이닝(chaining): 여러 함수를 연이어 호출하는 방식 → 코드 간결 & 호출 순서 직관적
```c++
#include <iostream>
#include <string>
using namespace std;

class bank {
private:
    int safe; //금고
    string bank_name;

public:
    bank& deposit_interest(int interest); // 이자 입금
    bank& withdraw_utility(int utility);  // 공과금 출금
    bank& withdraw_tax(int tax);          // 세금 출금
};

// .. (생략) ..

bank& bank::deposit_interest(int interest) {
    safe += interest;
    cout << bank_name << " 이자 지급: " << interest << endl;
    return *this;
}

bank& bank::withdraw_utility(int utility) {
    safe -= utility;
    cout << bank_name << " 공과금 납부: " << utility << endl;
    return *this;
}

bank& bank::withdraw_tax(int tax) {
    safe -= tax;
    cout << bank_name << " 세금 납부: " << tax << endl;
    return *this;
}

int main() {
// .. (생략) ..

    // 함수 체이닝 호출(함수가 차례로 호출됨)
    global_bank.deposit_interest(10).withdraw_utility(1).withdraw_tax(2);

return 0;
}
```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-10.png)
→ 멤버 함수의 반환 형식을 레퍼런스로 지정하고 return문에 this 활용
→ 만약 리턴 타입을 포인터로 지정한다면, chaining 호출은 func1().func2().func3()이 아닌,  func1()→func2()→func3() 으로 작성해야 함

# (5) 함수와 연산자 오버로딩
- 오버라이딩: 어떤 규칙이나 권력에 앞서거나 무시하는 것 → 부모의 정의를 무시하거나 자식 클래스에 정의된 함수를 우선시
- **오버로딩**: 과부하 or 과적 → 이미 정의된 함수와 같은 이름을 사용하지만, 매개변수 구성을 변경해 가면서 새로운 정의를 쌓는 것
## 함수 오버로딩
```c++
#include <iostream>
using namespace std;

class character {
public:
    character() : location{ 0,0 } {
    };
    // x, y 좌표를 매개변수로 같는 함수
    void move(int x, int y) {
        location[0] = x;
        location[1] = y;
        cout << location[0] << ", " << location[1] << "로 이동" << endl;
    };
    // x, y 배열과 배열 크기를 매개변수로 가지는 함수
    void move(int x[], int y[], int spot_count) {
        for (int i = 0; i < spot_count; ++i) {
            location[0] = x[i];
            location[1] = y[i];
            cout << i + 1 <<  "번째:" << location[0] << ", " << location[1] << "로 이동" << endl;
        }
    }

protected:
    int location[2];
};

int main(void) {
    character character_obj;
    int x_list[3] = { 10, 15, 20 };
    int y_list[3] = { 10, 15, 20 };

    // x, y 좌표를 매개변수로 가지는 함수 호출
    character_obj.move(10, 10);
    cout << endl;
    // x, y 배열과 배열 크기를 매개변수로 가지는 함수 호출
    character_obj.move(x_list, y_list, 3);
}

```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-11.png)

## 연산자 오버로딩
```c++
[연산자 오버로딩]
반환_형식 operator연산자_기호(매개변수)

[예제]
// .. (생략) .. 
//몬스터 C는 기본 Monster 클래스로부터 상속
class monster_c : public monster, public character {
public:
    //상속받은 함수 오버라이딩
    void attack_special(player target_player) override;
    monster_c operator+(monster_c& operand);
    void set_level(int level_value) { level = level_value; };
    void set_hp(int hp_value) { hp = hp_value; };
};

// 덧셈 연산자 오버로딩 구현
monster_c monster_c::operator+(monster_c& operand) {
    monster_c result_monster;
    result_monster.set_level(level + operand.get_level());
    return result_monster;
}

// .. (생략) .. 

int main() {
    monster_c monster_c_obj1, monster_c_obj2;
    monster_c_obj2.set_level(2);
    monster_c new_monster_c_obj = monster_c_obj1 + monster_c_obj2;

    cout << "합체전 몬스터C #1 Level[" << monster_c_obj1.get_level()
         << "], 몬스터C #2 Level[" << monster_c_obj2.get_level()
         << "]" << endl;

    cout << "합체 후 몬스터C Level[" << new_monster_c_obj.get_level()
         << "]" << endl;

    return 0;
}

```
![C++ 07. 객체지향 프로그래밍 특징 이미지](/SeonggukPark/images/notion/notes/cpp/07-oop-features-12.png)
→ monster_c_obj1 + monster_c_obj2; 에서 obj1는 더하기 연산 주체, obj2는 피연산자
→ `monster_c_obj1.operator+(monster_c_obj2);` 로 해도 동일하게 동작

Q. 함수 오버로딩과 연산자 오버로딩은 같은 건가?
A. 개념과 동작은 동일. 다만 연산자는 ‘operator+’와 같은 이름으로 선언하고, 사용할 때는 ‘+’만 사용하는 특수한 함수
# (6) 접근 지정자와 프렌드
## 접근 지정자
- 객체지향 프로그래밍에서 캡슐화를 구현하는 수단
- 클래스 외부 (ex. main 함수)의 접근과 상속받은 자식 클래스에서 접근을 제어
<table>
<colgroup>
<col>
<col>
<col>
</colgroup>
<tr>
<td>접근 지정자</td>
<td>설명</td>
<td>우선순위</td>
</tr>
<tr>
<td>private</td>
<td>- 클래스 내의 멤버 함수에서만 접근 가능<br>- 상속받은 클래스에서 접근 불가능</td>
<td>높음</td>
</tr>
<tr>
<td>public</td>
<td>- 다른 클래스 어디서든 접근 가능<br>- 상속받은 클래스에서 접근 가능</td>
<td>낮음</td>
</tr>
<tr>
<td>protected</td>
<td>- 클래스 내의 멤버 함수에서 접근 가능<br>- 상속받은 클래스에서도 접근 가능</td>
<td>중간</td>
</tr>
</table>
→ 우선순위: 상속에서 접근 지정자가 적용되는 우선순위
- C++의 기본 접근 지정자는 private (struct는 public)
- 멤버 변수를 public으로 공개하면 멤버 변수의 값이 의도치 않게 설정되어 오류 발생 가능
→ 클래스의 멤버 변수는 특별한 이유가 없다면 private이나 protected로 지정 후 멤버 함수를 통해 값을 설정하거나 얻어야 한다.

### 상속 접근 지정자
- `public` 상속: 부모의 접근 권한을 그대로 유지
- 가장 자연스러운 상속 방식이며, **IS-A 관계**를 명확히 표현<br>
```c++
class Child : public Parent {};
```

- `protected` 상속: 부모의 public 멤버까지도 자식에서는 protected로 내려감
- 라이브러리 내부 구현을 감싸야 할 때 가끔 사용
```c++
class Child : protected Parent {};
```

- `private` 상속: 부모의 모든 public/protected 멤버가 자식에서는 private로 내려감
- Child는 Parent의 기능을 내부적으로 “사용”하지만 외부에는 Parent라는 사실이 드러나지 않음
```c++
class Child : private Parent {};
```

## friend
### freind 클래스
- 특정 클래스에게 자신의 private/protected 멤버에 접근할 수 있는 권한을 부여하는 기능
- 다른 클래스 내부 구현을 그대로 볼 수 있음
- freind 선언 위치는 클래스 내부 어디서든 가능
```c++
class A {
private:
    int secret = 10;

    friend class B;   // B는 A의 private 멤버에 접근 가능
};

class B {
public:
    void show(A& a) {
        cout << a.secret << endl;   // private에 직접 접근 가능
    }
};
```
→ 외부에서 접근 불가능한 secret에 b class는 접근 가능

### freind 함수
- 외부의 특정 함수가 내부의 모든 멤버에 접근할 수 있게 허용하는 것
```c++
class A {
private:
    int secret = 42;
    friend void B::debug(const A&);   // B 클래스의 멤버 함수만 friend
};

class B {
public:
    void debug(const A& a) {
        cout << a.secret << endl;     // private 접근 가능
    }
};
```

- 접근 지정자는 객체지향에서 추상화와 은닉화를 구현하기 위한 수단
→ 은닉화를 깨트리는 friend를 남용하는 것은 매우 나쁜 습관
→ 꼭 필요한 지, 구조 변경으로 대체 가능한지 다시 한번 확인해 볼것

