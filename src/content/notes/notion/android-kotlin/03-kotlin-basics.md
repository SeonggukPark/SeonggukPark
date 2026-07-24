---
title: "3) 코틀린 시작하기"
description: "Notion에서 가져온 3) 코틀린 시작하기 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2ba6b9674ad8804aa4ebdcc29d628e02"
importedAt: 2026-07-24
---

> 이 문서는 Notion MCP 원본에서 직접 가져온 학습 기록입니다.

# <span color="gray_bg">(1) 코틀린 언어 소개</span>
## 코틀린 등장 배경
- JetBrains에서 개발한 프로그래밍 언어
- 2011년 처음 공개, 2017년 구글에서 안드로이드 공식 언어로 지정
- 코틀린 컴파일러가 .kt 파일을 컴파일 하면 자바 바이트 코드 생성
	→ 결국 코틀린을 컴파일 하면 자바 클래스 생성, 이를 JVM이 실행
	→ 코틀린은 자바를 대체할 목적

### 코틀린 장점
- 표현력과 간결함(expressive and concise)
- 안전한 코드(safer code)
	- 널 안정성 지원 → 컴파일 시점에 NullPointerException(NPE)을 최대한 방지
	- nullable 타입과 non-nullable 타입을 명확히 구분
- 상호 운용성(interoperable)
	- 코틀린은 자바와 100% 호환
- 구조화 동시성(structured concurrency)
	- coroutines 기법 활용하면 비동기 프로그래밍 간소화 가능

Q. 코틀린은 안드로이드 앱을 개발할 때만 이용 가능?
A. IOS 앱, 서버 쪽 애플리케이션도 가능

## 코틀린 파일 구성
- 코틀린 확장자는 ‘.kt’
![03-kotlin-basics 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/03-kotlin-basics-1.png)
→ 패키지: 컴파일 했을 때 만들어지는 클래스 파일의 위치를 나타냄
→ 어떤 파일에 선언한 멤버를 다른 코틀린 파일에서 참조할 때 같은 package로 선언했다면 import 없이 사용 가능

Q. 코틀린 파일명을 클래스명과 다르게 선언 가능?
A. ㅇㅇ 

Q. 코틀린의 함수, 변수를 클래스로 묶지 않고 선언하면 자바에서 문제가 되지 않는지?
A. ㄴㄴ, 코틀린 소스 파일의 최상위에 선언된 변수, 함수는 자동으로 ‘파일명 + Kt’라는 이름의 클래스에 포함 → 자바에서는 이 클래스를 이용해 변수, 함수에 접근하면 됨

## 코틀린 소스 테스트
- 프로젝트 탐색창에서 java 디렉토리 아래 패키지 명 경로에 File 추가 후 Run

# <span color="gray_bg">(2) 변수와 함수</span>
## 변수 선언
- val: value의 줄임말로 초깃값이 할당되면 <span color="red">바꿀 수 없는 </span>변수
- var: variable의 줄임말로 초깃값이 할당된 후에도 <span color="green">값을 바꿀 수 있는</span> 변수
```kotlin
val x = 5
// x = 6  // 컴파일 에러

var y = 5
y = 6      // 정상
```

### 타입 지정과 타입 추론
- 변수명 뒤 콜론(:)을 추가해 타입 명시
- 타입 추론이 가능할 경우 생략 가능
```kotlin
// 자동 추론
val num = 10        // Int
val pi = 3.14       // Double
val name = "Kotlin" // String

// 명시 표기
val age: Int = 25
var score: Double = 90.5
```

### 초깃값 할당
- 최상위에 선언한 변수, 클래스의 멤버 함수는 선언과 동시에 초깃값을 할당 해야 함
- 함수 내부에서 선언한 변수는 불필요 (변수 이용하기 전에만 할당하면 됨)
```kotlin
val data1: Int // 에러
val data2: Int = 10

fun someFun(){
val data3: Int
println("data3 : $data3") // 에러
data3 = 10
println("data3 : $data3")
}

class User{
val data4: Int
val data5: Int = 10
}
```

### 초기화 미루기
- lateinit, lazy 키워드 통해 컴파일러에게 값을 이후에 할당할 것이라고 알려줄 수 있음

**lateinit**
- 이후에 값을 할당할 것을 명시적으로 선언
- 다음 2가지 규칙을 따라야 함
	- var 키워드로 선언한 변수에만 사용 가능
	- Int, Long, Short, Double, Float, Boolean, Byte 타입에는 사용 불가
**lazy**
- 변수 선언문 뒤에 by lazy\{ \} 형식으로 선언
- 소스에서 변수가 최초로 사용되는 순간 중괄호 부분이 자동 실행 
	→ 그 결과값이 변수의 초기값으로 할당
```kotlin
val config: String by lazy {
    println("init config")
    "CONFIG_VALUE"
}

fun main() {
    println("before")
    println(config) // 여기서 최초 1회 실행
    println(config) // 이후 캐시된 값 사용
}
```
![03-kotlin-basics 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/03-kotlin-basics-2.png)

## 데이터 타입
- **코틀린의 모든 변수는 객체**
	→ 정수를 다루는 Int 타입은 primitive type이 아니라 **클래스**임
	→ Int 타입 변수에 정수뿐만 아니라 **null 대입 가능 (null: 객체 선언만 되고 메모리 할당 X)**
	→ 객체의 **메소드 호출**도 가능
	```kotlin
fun someFun(){
var data1: Int = 10
var data2: Int? = null // null 대입 가능
data1 = data1.plus(10) // 객체 메서드 활용 가능
	```

### 기초 타입 객체
**정수형**
<table header-row="true">
<tr>
<td>타입</td>
<td>크기</td>
</tr>
<tr>
<td>`Byte`</td>
<td>8-bit</td>
</tr>
<tr>
<td>`Short`</td>
<td>16-bit</td>
</tr>
<tr>
<td>`Int`</td>
<td>32-bit (기본)</td>
</tr>
<tr>
<td>`Long`</td>
<td>64-bit</td>
</tr>
</table>
**실수형**
<table header-row="true">
<tr>
<td>타입</td>
<td>크기</td>
</tr>
<tr>
<td>`Float`</td>
<td>32-bit</td>
</tr>
<tr>
<td>`Double`</td>
<td>64-bit (기본)</td>
</tr>
</table>
**논리형**
- true / false만 허용 → Java처럼 0, 1 사용 불가

### 문자와 문자열
```kotlin
val ch: Char = 'A'
val str: String = "Hello"
val str2 : String = """
Hello
	World!
"""
```
→ String은 줄바꿈이나 들여쓰기 등을 유지하려면 역슬래시로 시작하는 escape sequence 입력하거나, 삼중 따옴표로 표시 가능

```kotlin
val name = "Kotlin"
println("Hello $name")
println("Length = ${name.length}")
```
→ String 타입의 데이터에 변수값이나 연산 결과값 포함할 때는 \$ 기호 (=문자열 템플릿) 사용

### Any
- 모든 타입의 최상위 부모
	→ Any 타입으로 선언한 변수에는 모든 타입의 데이터 할당 가능
	
### Unit
- “의미 있는 값이 없음”
- Java의 `void`와 유사하지만 **타입으로 존재**
- 주로 함수 리턴 타입으로 사용
- 함수 선언시, 반환 타입 생략하면 자동으로 Unit 적용

### Nothing
- 값이 존재할 수 없는 타입
- 이 타입으로 끝나는 코드는 절대 정상적으로 다음 줄로 돌아오지 않음
	= 이후의 실행 흐름이 존재하지 않음
- 예외를 던지는 함수의 반환 타입
```kotlin
fun fail(): Nothing {
    throw IllegalStateException("실패")
}
```

### 널 허용과 불허용
- 코틀린에서는 변수를 선언할 때 null을 대입할 수 <span underline="true">있는지</span>(=nullable, 널 허용)* *<span underline="true">없는지</span>(=not null, 널 불허용)를 명확하게 구분해서 선언해야 함
- **타입 뒤에 물음표를 추가하면 널 허용**, 아니면 불 허용

## 함수 선언
- fun 키워드 활용 선언
```kotlin
fun add(a: Int, b: Int): Int {
    return a + b
}
```
→  구성 요소
	- `fun` : 함수 선언 키워드
	- `a: Int, b: Int` : 매개변수
	- `: Int` : 반환 타입 (생략 시, 자동으로 Unit 타입 적용)
	- `{}` : 함수 본문

### 매개변수 규칙
- var, val 키워드 사용 불가 → val이 자동 적용
- 읽기 전용 → 함수 안에서 값 변경 불가능
- default value 선언 가능
- 여러개 일 경우 호출할 때 전달한 인자가 순서대로 할당 됨

### 이름 있는 인자 (Named Argument)
```kotlin
fun info(name: String, age: Int) {
    println("$name $age")
}

info(age = 30, name = "Lee")
```
→ 함수 선언문의 매개변수 순서에 맞추지 않아도 됨

## Array
- 코틀린의 배열
<table header-row="true">
<tr>
<td>구분</td>
<td>타입</td>
<td>생성 방법</td>
<td>특징</td>
</tr>
<tr>
<td>Array</td>
<td>Array\<T\></td>
<td>`arrayOf()`</td>
<td>고정 크기, 객체 배열</td>
</tr>
<tr>
<td>Array</td>
<td>Array\<T\></td>
<td>`Array(size) {}`</td>
<td>초기화 람다</td>
</tr>
<tr>
<td>Primitive Array</td>
<td>IntArray</td>
<td>`IntArray(size)`</td>
<td>primitive, 고성능</td>
</tr>
<tr>
<td>Primitive Array</td>
<td>LongArray</td>
<td>`LongArray(size)`</td>
<td>primitive</td>
</tr>
</table>
```kotlin
val data1: Array<Int> = Array(3, { 0 })
```
- 데이터 접근시, 대괄호나 set(), get() 함수 이용도 가능

### 기초 타입 배열
- 배열 데이터가 기초 타입이라면, 기초 타입의 배열을 나타내는 클래스 이용 가능
```kotlin
val data1: IntArray = IntArray(3, { 0 })
val data2: BooleanArray = BooleanArray(3, { false })
val data3 = arrayOf<Int>(10, 20, 30)
val data4 = intArrayOf(10, 20, 30)
```
→ arrayOf() 함수 이용하면 배열 선언시 값 할당 가능

## 컬렉션 타입 클래스
- Collection 인터페이스를 타입으로 표현한 클래스
- List, Set, Map 존재
- 가변(=mutable) 클래스와 불변(immutable) 클래스로 나뉨
	→ 불변 클래스: 초기에 데이터를 대입하면 더 이상 변경할 수 없는 타입

```plain text
Collection
 ├─ List
 │   └─ MutableList
 ├─ Set
 │   └─ MutableSet
 └─ Map
     └─ MutableMap
```
<table header-row="true">
<tr>
<td>구분</td>
<td>타입</td>
<td>생성 함수</td>
<td>특징</td>
</tr>
<tr>
<td>List</td>
<td>List</td>
<td>`listOf()`</td>
<td>불변</td>
</tr>
<tr>
<td>List</td>
<td>MutableList</td>
<td>`mutableListOf()`</td>
<td>가변</td>
</tr>
<tr>
<td>Set</td>
<td>Set</td>
<td>`setOf()`</td>
<td>불변</td>
</tr>
<tr>
<td>Set</td>
<td>MutableSet</td>
<td>`mutableSetOf()`</td>
<td>가변</td>
</tr>
<tr>
<td>Map</td>
<td>Map</td>
<td>`mapOf()`</td>
<td>불변</td>
</tr>
<tr>
<td>Map</td>
<td>MutableMap</td>
<td>`mutableMapOf()`</td>
<td>가변</td>
</tr>
</table>
# <span color="gray_bg">(3) 조건문과 반복문</span>
## 조건문
### if-else
```kotlin
fun main(){
var data = 10
if (data > 10) {
	println("data > 10")
} else if (data > 0 && data <= 10) {
	println("data > 0 && data <= 10")
} else {
	println("data <= 0")
}
}
```
![03-kotlin-basics 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/03-kotlin-basics-3.png)

- 코틀린의 if\~else는 표현식(expression)으로 사용 가능 → 즉, 값 반환 가능
	→ 표현식으로 쓰려면 else 생략 불가능
```kotlin
fun main(){
    val a = 10
    val b = 20
    
    val result = if (a > b) {
        println("a가 큼")
        a
    } else {
        println("b가 큼")
        b
    }
    println(result)
}
```
![03-kotlin-basics 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/03-kotlin-basics-4.png)

### when
- `switch`의 상위 호환 개념이며, **값 / 범위 / 타입 / 조건식** 모두 가능

**기본 형태**
```kotlin
when (x) {
1 -> println("1")
2,3 -> println("2 또는 3")
else -> println("기타")
}
```

**값 반환**
```kotlin
val result =when (x) {
	1 ->"one"
	2 ->"two"
	else ->"unknown"
}
```

**범위 사용**
```kotlin
when (score) {
in90..100 ->"A"
in80..89  ->"B"
else      ->"F"
}
```

**조건식 (인자 없는 when)**
```kotlin
when {
  x >0 -> println("양수")
  x <0 -> println("음수")
else -> println("0")
}
```

- if와 마찬가지로 표현식으로 사용 가능
```kotlin
fun main() {
var data = 10
val result = when {
	data <= 0 -> "data is <= 0"
	data > 100 -> "data is > 100"
	else -> "data is valid"
}
println(result)
}
```
![03-kotlin-basics 이미지 5](/SeonggukPark/images/notion/notes/android-kotlin/03-kotlin-basics-5.png)

## 반복문
### for문
- 코틀린에는 **전통적인 for(초기;조건;증감)** 문이 없음
- 주로 범위 연산자인 in 사용

**범위 반복**
```kotlin
for (i in 1..5) {
    // 1,2,3,4,5
}
```

**until (끝 포함 안 함)**
```kotlin
for (i in 1 until 5) {
// 1,2,3,4
}
```

**step**
```kotlin
for (i in 0..10 step 2) {
    // 0,2,4,6,8,10
}
```

**감소**
```kotlin
for (i in 10 downTo 1) {
    //10,9,8,..,1
}
```

**컬렉션 반복**
```kotlin
val list = listOf("a","b","c")

for (item in list) {
    println(item)
}
```

**index 포함**
```kotlin
val list = listOf("a","b","c")

for ((index, value)in list.withIndex()) {
    println("$index :$value")
}
```
![03-kotlin-basics 이미지 6](/SeonggukPark/images/notion/notes/android-kotlin/03-kotlin-basics-6.png)

### while / do-while
- Java와 동일
```kotlin
var i = 0
while (i < 5) {
    println(i)
    i++
}

do {
    println(i)
    i++
} while (i < 5)

```

