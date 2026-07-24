---
title: "04) 코틀린 객체지향 프로그래밍"
description: "Notion에서 가져온 04) 코틀린 객체지향 프로그래밍 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2ba6b9674ad880e698e7d769f26bd330"
importedAt: 2026-07-24
---

> 이 문서는 Notion MCP 원본에서 직접 가져온 학습 기록입니다.

# <span color="gray_bg">(1) 클래스와 생성자</span>
# 클래스
## 클래스 선언
```kotlin
class Person {
    var name: String = ""
    var age: Int = 0
}

class User { } // 클래스 본문 내용 없다면 중괄호 생략 가능
```
Q. 본문 없고 선언부만 있는 클래스는 의미가 있나?
A. 자바와 달리 코틀린은 생성자를 본문이 아닌 선언부에 작성 가능, 그래서 본문 없는 클래스도 많이 등장함

## 주 생성자
- 코틀린 클래스는 생성자를 주 생성자와 보조 생성자로 나눔
- 한 클래스에서 둘 중 하나, 혹은 둘 다 선언 가능
- constructor 키워드로 클래스 선언부에 선언
```kotlin
// 주 생성자 선언
class User constructor(){
}

// constructor 키워드 생략 예
class User(){
}

// 매개변수가 없는 주 생성자 자동 선언
class User{
}

// 주 생성자의 매개변수
class User(name: String, count: Int){
}

// 매개변수가 있는 생성자 호출
val user = User("kkang", 10)
```

### init 영역
- 주 생성자는 **본문을 가질 수 없음**
```kotlin
class User(name: String, count: Int) {
// 주 생성자 본문
} { // 오류..
// 클래스 본문
}
```

- init 키워드로 주 생성자의 본문 구현 가능
```kotlin
class User(name: String, count: Int) {
    init {
        println("name = $name, count = $count")
    }
}
```

### 생성자의 매개변수를 클래스의 멤버 변수로 선언
- 생성자 매개변수는 init 영역 외의 다른 함수(ex. 클래스 멤버함수)에서 사용 불가
```kotlin
class User(name: String, count: Int) {
    init{
        println("name : $name, count : $count")
    }

    fun someFun() {
        println("name : $name, count : $count") // Error!
    }
}
```

- 명시적으로 멤버 변수에 매개변수를 대입 가능하나, <span color="red">코틀린 스타일 아님 (권장 X)</span>
```kotlin
class User(name: String, count: Int) {
    val name: String
    var count: Int

    init {
        this.name = name
        this.count = count
    }
}
```

- 매개변수를 val, var로 선언
	- 주 생성자에서만 var, val 키워드로 매개변수 선언 가능하며, 이러면 클래스의 멤버 변수가 됨
```kotlin
class User(val name: String, var count: Int = 0)
```

## 보조 생성자
- 클래스의 본문에 constructor 키워드로 선언하는 함수
```kotlin
class User{
constructor(name: String){
	println("constructor(name: String) call...")
}
constructor(name: String, count: Int){
	println("constructor(name: String, count: Int) call...")
}
}

fun main(){
val user1 = User("u1")
val user2 = User("u2")
}
```
![04-kotlin-oop 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/04-kotlin-oop-1.png)

### 보조 생성자에 주 생성자 연결
- <span color="red">두 생성자 모두 선언할 경우, 반드시 생성자끼리 연결해줘야 함 (보조 생성자가 주 생성자 호출)</span>
```kotlin
// 오류 코드
class User(name: String){
    constructor(name: String, count: Int){ // Error!
        // ...
    }
}

// 정상 코드
class User(name: String){
    constructor(name: String, count: Int): this(name) { // 성공!
        // ...
    }
}
```

- 보조 생성자는 여러개도 가능하지만, \[보조 생성자 → 주 생성자 → init 블록 → 클래스 본문\] chaining은 항상 지켜야함
```kotlin
class User(name: String) {
    init{
        println("main const")
    }

    constructor(name: String, count: Int) : this(name) {
        println("first sub const")
    }

    constructor(name: String, count: Int, email: String) : this(name, count) {
        println("second sub const")
    }
}

val u = User("u", 0, ".com")
```
![04-kotlin-oop 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/04-kotlin-oop-2.png)

Q. 생성자를 주 생성자와 보조 생성자로 구분하는 이유?
A. 초기화 규칙을 하나로 묶기 위해 주 생성자 도입. 객체를 여러가지 형태로 생성할 수 있도록 생성자의 매개변수를 다양하게 구성할 때, 생성자의 공통된 코드는 주 생성자에 작성해라.

# <span color="gray_bg">(2) 클래스를 재사용하는 상속</span>
## 상속과 생성자
- 코틀린에서 모든 클래스는 기본적으로 상속 불가(final)
- 상속 허용하려면 open 키워드 사용해야 함
```kotlin
open class Super{
}
class Sub: Super(){ // Super 클래스를 상속 받아 Sub 클래스 선언
}
```

- 부모 클래스에 주 생성자가 있다면, 자식 클래스에서 반드시 호출해야 함
```kotlin
open class Parent(val x: Int)

// 하위 클래스의 주 생성자에서 호출
class Child(x: Int, val y: Int) : Parent(x)

// 하위 클래스의 보조 생성자에서 호출
class Child : Parent {
constructor(x: Int) : Parent(x) 
}
```

## 오버라이딩
- 상속을 통해 상위 클래스의 멤버를 하위 클래스에서 자신의 멤버처럼 사용 가능
- 상위 클래스에 선언된 변수, 함수를 같은 이름을 하위 클래스에서 다시 선언하는 것이 **오버라이딩**
- 주로 함수를 재정의하는데 사용
```kotlin
// [오버라이딩 예시]
open class Super{
    open var someData = 10
    open fun someFun(){
        println("i am super class function : $someData")
    }
}

class Sub : Super(){
    override var someData = 20
    override fun someFun(){
        println("i am sub class function : $someData")
    }
}

val obj = Sub()
obj.someFun()
```
![04-kotlin-oop 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/04-kotlin-oop-3.png)

- <span color="red">코틀린에서는 상위 클래스에서 오버라이딩을 허용할 변수, 함수에 open 키워드로 선언하지 않으면 오버라이딩 불가</span>

## 접근 제한자
- 클래스의 멤버를 외부의 어느 범위까지 허용할 것인지를 결정하는 키워드
- 코틀린에서는 클래스로 묶지 않고 소스 파일의 최상단에서 선언한 함수, 변수에도 접근 제한자 사용 가능
<table>
<colgroup>
<col width="87.25">
<col width="193.4375">
<col width="227.546875">
</colgroup>
<tr>
<td>접근 제한자</td>
<td>최상위에서 이용</td>
<td>클래스 멤버에서 이용</td>
</tr>
<tr>
<td>public</td>
<td>모든 파일에서 가능</td>
<td>모든 클래스에서 가능</td>
</tr>
<tr>
<td>internal</td>
<td>같은 모듈 내에서 가능</td>
<td>같은 모듈내에서 가능</td>
</tr>
<tr>
<td>protected</td>
<td>사용 불가</td>
<td>상속 관계의 하위 클래스에서만 가능</td>
</tr>
<tr>
<td>private</td>
<td>파일 내부에서만 이용</td>
<td>클래스 내부에서만 가능</td>
</tr>
</table>
→ 코틀린에서는 접근 제한자를 생략하면 public이 기본

```kotlin
// [접근 제한자 사용 예시]
open class Super{
var public_Data = 10
protected var protected_Data = 20
private var private_Data = 30
}

class Sub: Super(){
fun subFun(){
	public_Data++
	protected_Data++
	private_Data++ // 에러
}
}

fun main(){
val obj = Super()
obj.public_Data++
obj.protected_Data++ // 에러
obj.private_Data++ // 에러
}
```

# <span color="gray_bg">(3) 코틀린 클래스의 종류</span>
## 데이터 클래스
- 자주 사용하는 데이터를 객체로 묶어줌
- VO(value-object) 클래스를 편리하게 이용할 수 있도록 해줌
```kotlin
class NonDataClass(val name: String, val email: String, val age: Int)
data class DataClass(val name: String, val email: String, val age: Int)
```
- equals() 함수
	- 일반 클래스는 객체 자체만을 비교,** 데이터 클래스는 객체의 데이터를 비교**
	```kotlin
val non1 = NonDataClass("kim", "a@a.com", 10)
val non2 = NonDataClass("kim", "a@a.com", 10)

val data1 = DataClass("kim", "a@a.com", 10)
val data2 = DataClass("kim", "a@a.com", 10)

println("non data class equals : ${non1.equals(non2)}")
println("data class equals : ${data1.equals(data2)}")
	```
	![04-kotlin-oop 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/04-kotlin-oop-4.png)
	
	- <span color="red">주 생성자의 멤버 변수가 같은지 판단</span>
	```kotlin
data class DataClass(val name: String, val email: String, val age: Int){
lateinit var address: String
constructor(name: String, email: String, age: Int, address: String):
		this(name, email, age){
		this.address = address
	}
}

fun main(){
val obj1 = DataClass("kim", "a@a.com", 10, "Seoul")
val obj2 = DataClass("kim", "a@a.com", 10, "Busan")
println("obj1.equals(obj2) : ${obj1.equals(obj2)}")
}
	```
	![04-kotlin-oop 이미지 5](/SeonggukPark/images/notion/notes/android-kotlin/04-kotlin-oop-5.png)

- toString() 함수
	- 객체가 포함하는 멤버 변수의 데이터를 출력
	- <span color="red">eqauls()와 마찬가지로, 주 생성자의 매개변수에 선언된 데이터만 출력</span>
	```kotlin
fun main(){
class NonDataClass(val name: String, val email: String, val age: Int)
data class DataClass(val name: String, val email: String, val age: Int)

val non = NonDataClass("kim", "a@a.com", 10)
val data = DataClass("kim", "a@a.com", 10)

println("non data class toString : ${non.toString()}")
println("data class toString : ${data.toString()}") 
}
	```
	![04-kotlin-oop 이미지 6](/SeonggukPark/images/notion/notes/android-kotlin/04-kotlin-oop-6.png)

## 오브젝트 클래스
- 익명 클래스(anonymous class)를 만들 목적으로 사용
- 익명 클래스는 말 그대로 이름이 없으므로, 클래스를 선언하면서 동시에 객체를 생성해야 함
	→ 그렇지 않으면 이후 객체를 생성할 방법이 없음
```kotlin
val obj = object{
var data = 10
fun some(){
	println("data : $data")
}
}

fun main(){
obj.data = 20 // 에러
obj.some() // 에러
}
```

- 보통 타입까지 함께 선언
```kotlin
open class Super{
open var data = 10
open fun some(){
	println("i am super some(): $data")
}
}	

val obj = object: Super(){
override var data = 20
override fun some(){
	println("i am object some(): $data")
}
}

fun main(){
obj.data = 30
obj.some()
}
```
![04-kotlin-oop 이미지 7](/SeonggukPark/images/notion/notes/android-kotlin/04-kotlin-oop-7.png)

## 컴패니언 클래스
- 객체를 생성하지 않고도 클래스 이름으로 멤버 이용 가능
```kotlin
class MyClass{
companion object {
	var data = 10
	fun some(){
		println(data)
	}
}
}

fun main(){
MyClass.data = 20
MyClass.some()
}
```
![04-kotlin-oop 이미지 8](/SeonggukPark/images/notion/notes/android-kotlin/04-kotlin-oop-8.png)

Q. 컴패니언 클래스는 자바 static이랑 같은거 같은데, 코틀린에는 static 키워드가 없는지?
A. ㅇㅇ 코틀린은 static 키워드 지원 안됨. 그래서 컴패니언 클래스는 결과적으로 자바 static 대체한다고 할 수 있음. 사실 코틀린은 최상위에 함수, 변수 선언이 가능해서 객체 이용이 필요 없는 멤버를 굳이 class로 선언 안해도 됨. 근데 자바의 static 처럼 클래스 멤버를 쓸 때도 있긴 하니까 companion 클래스를 지원하는 것.

