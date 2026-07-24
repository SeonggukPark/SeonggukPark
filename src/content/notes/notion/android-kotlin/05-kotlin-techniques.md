---
title: "5) 코틀린의 유용한 기법"
description: "Notion에서 가져온 5) 코틀린의 유용한 기법 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2ba6b9674ad88081be36ff2b18503dfd"
importedAt: 2026-07-24
---

> 이 문서는 Notion MCP 원본에서 직접 가져온 학습 기록입니다.

# <span color="gray_bg">(1) 람다 함수</span>
## 람다 함수
- 익명 함수 정의 기법
- 함수를 간단하게 정의해서 이용

### 람다 함수 선언 및 호출
- fun 키워드 사용하지 않고 중괄호로 표현
- 함수 본문의 마지막 표현식 리턴
```kotlin
// [람다 함수 선언 형식]
{ 매개변수 -> 실행할 코드 }

// [람다 함수 예시]
val sum = { a: Int, b: Int -> a + b }
println(sum(3, 5)) // 8

// [선언 동시에 호출]
{ a: Int, b: Int -> a + b } (10, 20)
```
→ 람다 함수는 함수명이 없으므로 보통 변수에 대입해서 사용

### 매개변수 없는 람다 함수
```kotlin
{-> println("function call")}
{println("function call")} // 화살표 생략 가능
```

### 매개변수가 1개인 람다 함수
- 매개변수가 하나면 `it`으로 생략 가능
```kotlin
val some = {no: Int -> println(no)}
val some: (Int) -> Unit = {println(it)} // 동치
```

### 람다 함수의 반환
- 람다 함수에서는 return 문 사용 불가
- 람다 함수의 반환값은 본문의 마지막 줄의 실행 결과
```kotlin
fun main(){
val some = {no1: Int, no2: Int ->
	println("in lambda function")
	no1 * no2
}
println("result: ${some(10, 20)}")
}
```
![05-kotlin-techniques 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/05-kotlin-techniques-1.png)

## 함수 타입과 고차 함수
- 변수에 함수 대입하려면 변수를 함수 타입으로 선언해야 함

### 함수 타입 선언
- 함수 타입: 함수 선언시 나타내는 매개변수와 반환 타입
```kotlin
// [함수 타입 문법]
(매개변수 타입들) -> 반환 타입

// [함수 타입 예시]
val some: (Int, Int) -> Int = {no1: Int, no2: Int -> no1 + no2}
```
→ (Int, Int) → Int : 함수 타입
→ \{no1: Int, no2: Int → no1 + no2\} : 함수 내용

### typealias
- 타입의 별칭의 선언하는 키워드로, 함수 타입 뿐만 아니라 데이터 타입을 선언할 때도 사용
```kotlin
// [함수 타입 별칭]
typealias MyFunType = (Int, Int) -> Boolean

fun main(){
val someFun: MyFunType = {no1: Int, no2: Int ->
	no1 > no2
}
println(someFun(10, 20))
println(someFun(20, 10))
}
```

### 타입 생략
- 매개변수의 타입을 유추할 수 있따면 타입 선언 생략 가능
```kotlin
// [타입 별칭으로 인한 생략]
typealias MyFunType = (Int, Int) -> Boolean
val someFun: MyFunType = {no1, no2 ->
no1 > no2
}

// [매개변수 타입 선언 생략]
val someFun: (Int, Int) -> Boolean = {no1, no2 ->
no1 > no2
}

// [람다 에서의 생략]
val someFun = {no1: Int, no2: Int ->
no1 > no2
} 
```

### 고차 함수
- 함수를 매개변수로 전달받거나 반환하는 함수
- 함수를 변수에 대입할 수 있기 때문에 가능
```kotlin
fun hofFun(arg: (Int) -> Boolean): () -> String {
    val result = if (arg(10)) {
        "valid"
    } else {
        "invalid"
    }
    return { "hofFun result : $result" }
}

fun main() {
    val result = hofFun { no -> no > 0 }
    println(result())
}
```
![05-kotlin-techniques 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/05-kotlin-techniques-2.png)
→ hofFun()은 고차함수

# <span color="gray_bg">(2) 널 안정성</span>
## 널 안정성
- 널(null): 객체가 선언되었지만 초기화되지 않은 상태
- 널인 상태의 객체를 이용하면 널 포인트 예외 (NullPointException; NPE) 발생
- **NPE가 발생하지 않도록 코드를 작성하는 것이 널 안정성**
```kotlin
val len = s?.length ?: 0
```
→ s가 null이면 0을 반환하고 null이 아니면 length를 이용해 문자열의 개수 반환

## 널 안정성 연산자
### `?` 연산자
- null 가능성 선언
```kotlin
var s: String? = null
```

### `?.` 연산자
- 안전 호출 연산자
- 널 허용으로 선언한 변수의 멤버에 접근할 때는 반드시 `?.` 연산자 사용
- 변수가 `null`이면 멤버 접근 안하고 `null` 반환, `null`이 아니면 멤버 접근
```kotlin
val len = s?.length
```
→ `s == null` → 결과 `null` 
→ `s != null` → `length` 호출

### `?:` 연산자
- Elvis 연산자
- 변수가 `null` 일 때 실행해야 하는 구문 있을 경우 사용
```kotlin
fun main(){
var data: String? = "kim"
println("data = $data : ${data?.length ?: -1}")
data = null
println("data = $data : ${data?.length ?: -1}")
}
```
![05-kotlin-techniques 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/05-kotlin-techniques-3.png)

### `!!` 연산자
- 객체가 null일 때 예외를 일으키는 연산자
- 널 포인트 예외를 의도적으로 발생 시킬 때 사용
```kotlin
fun some(data: String?): Int {
return data!!.length
}

fun main(){
println(some("kim"))
println(some(null))
}
```
![05-kotlin-techniques 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/05-kotlin-techniques-4.png)

