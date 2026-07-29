---
title: "08) 사용자 이벤트 처리하기"
description: "터치·키·뷰 이벤트의 발생 과정과 처리 방법을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2fe6b9674ad88012a5b7f8338973f475"
importedAt: 2026-07-24
---

# <span color="gray_bg">(1) 터치와 키 이벤트</span>
## 터치 이벤트
- 사용자의 입력(터치, 키 입력 등)을 시스템이 감지하고 해당 View나 Activity로 전달하는 메커니즘
- 터치 이벤트 처리를 위해서는 activity class에 터치 이벤트의 콜백 함수인 onTouchEvent() 선언
```kotlin
class MainActivity : AppCompatActivity() {
(...)
override fun onTouchEvent(event: MotionEvent?): Boolean {
	return super.onTouchEvent(event)
}
}
```
→ Activity에 `onTouchEvent()` 함수를 override 하면 사용자가 이 activity 화면 터치하는 순간 자동으로 호출
→ `onTouchEvent()`의 파라미터인 `MotionEvent` 객체는 터치의 종류와 발생 지점이 담김

### 이벤트 종류
- `ACTION_DOWN` : 손가락이 화면에 닿음
- `ACTION_MOVE` : 손가락이 이동 중
- `ACTION_UP` : 손가락이 떨어짐
- `ACTION_CANCEL` : 이벤트 취소됨

### 이벤트 처리 메서드
```kotlin
override fun onTouchEvent(event: MotionEvent): Boolean {
    when (event.action) {
        MotionEvent.ACTION_DOWN -> {
            // 터치 시작
        }
        MotionEvent.ACTION_MOVE -> {
            // 이동 중
        }
        MotionEvent.ACTION_UP -> {
            // 터치 종료
        }
    }
    return true
}
```

### 터치 이벤트 발생 좌표 얻기
- `x` , `y` : 이벤트 발생한 뷰의 X, Y 좌표
- `rawX` , `rawY` : 화면의 X, Y 좌표
```kotlin
override fun onTouchEvent(event: MotionEvent?): Boolean {
    when (event?.action) {
        MotionEvent.ACTION_DOWN -> {
        Log.d("kkang",
			        "Touch down event x: ${event.x}, rawX: ${event.rawX}")
        }
    }
    return super.onTouchEvent(event)
}
```
![08-user-events 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/08-user-events-1.png)

Q. 앱에서 모두 화면 터치를 하니까 터치 이벤트는 무조건 많이 쓰이나?
A. 서버, 네트워킹으로 데이터를 입력, 출력하는 앱에서는 그다지 많이 안씀.
## 키 이벤트
- 물리 키보드, 뒤로가기 버튼, 볼륨 버튼 등에서 발생

### 이벤트 종류
- `onKeyDown` : 키를 누른 순간의 이벤트
- `onKeyUp` : 키를 떼는 순간의 이벤트
- `onKeyLongPress` : 키를 오래 누르는 순간의 이벤트

### 이벤트 처리
<synced_block url="https://app.notion.com/p/2fe6b9674ad88012a5b7f8338973f475#3156b9674ad880d88dacdd56d18aae84">
	```kotlin
class MainActivity2 : AppCompatAcitivity(){
	(...)
	override fun onKeyDown(keyCode: Int, event: KeyEvent): Boolean {
	    return super.onKeyDown(keyCode, event)
	}
	
	override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
	    return super.onKeyUp(keyCode, event)
	}
}
	```
</synced_block>
→ 키 이벤트 함수의 첫 번째 매개변수는 **키의 코드**로, 사용자가 어떤 키를 눌렀는지 식별 가능

![08-user-events 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/08-user-events-2.png)
→ 내비게이션 바는 실행 앱과 관계없이 안드로이드 자체에서 제공하는 시스템
→ 뒤로 가기 버튼, 볼륨 조절 버튼은 키로 취급해 키 이벤트로 처리 가능
→ 전원, 홈, 오버뷰 버튼은 Activity에 `onKeyDown()` 함수를 선언해 둬도 호출 X
	→ <span color="red">즉, 앱에서 이벤트를 처리 못하는 버튼</span>
→ API Level 33에서 뒤로 가기 버튼 이벤트 처리함수는 `androidx.activity.OnBackPressedCallback()` 함수로 권장 (기존 onBackPressed()는 deprecated)

Q. 뒤로 가기, 볼륨 조절 같은 시스템 버튼의 이벤트를 앱에서 처리 가능하다고 했는데, 실제 앱 개발시 자주 사용하는 지?
A. 뒤로 가기는 자주 사용. 대표적으로 지도 앱에서 뒤로 가기 버튼 눌렀을 때 앱 종료 안되고 한 번더 누르라는 메세지 출력하거나 앱을 종료할 건지 묻는 알림창 출력하는 건 activity에서 뒤로 가기 버튼 이벤트로 구현

# <span color="gray_bg">(2) 뷰 이벤트</span>
- Activity의 화면은 TextView, Button 등의 뷰로 화면 구성, 구현
- 이런 뷰를 터치했을 때 터치 이벤트가 아닌 각 뷰에서 이벤트를 별도 제공
Q. 뷰 이벤트도 결국 터치인데, 왜 뷰에서 별도로 이벤트 제공하는지?
A. 터치 이벤트로 처리하면 개발이 복잡해짐

## 뷰 이벤트 처리 구조
- 앞선 터치 이벤트, 키 이벤트는 콜백 함수인 `onTouchEvent()`, `onKeyDown()`만 Activity에 선언해 놓으면 이벤트 처리 가능
	→ <span color="red">그러나 뷰 이벤트는 이렇게 못함</span>
	
- 뷰 이벤트 처리는 **이벤트 소스**, **이벤트 핸들러**로 역할이 나뉘며 이 둘을 **리스너**로 연결해야 이벤트 처리 가능
	- 이벤트 소스: 이벤트가 발생한 객체
	- 이벤트 핸들러: 이벤트 발생 시 실행할 로직이 구현된 객체
	- 리스너: 이벤트 소스와 이벤트 핸들러를 연결해 주는 함수
![08-user-events 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/08-user-events-3.png)

- checkbox 예제
```kotlin
binding.checkbox.setOnCheckedChangeListener(object: CompoundButton.OnChecked-
ChangeListener {
	override fun onCheckedChanged(p0: CompoundButton?, p1: Boolean) {
			Log.d("kkang", "체크박스 클릭")
	}
})
```
→ `checkbox`: 이벤트 소스
→ `setOnCheckedChangeListener`: 리스너(이벤트 핸들러 등록)
→ `object`: 이벤트 핸들러
![08-user-events 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/08-user-events-4.png)

- 대부분 이벤트 핸들러는 `ONXXXListener` 의 이름 형태로 인터페이스 구현해서 만듦
	→ e.g.) OnClickListener, OnLongClickListener
- 액티비티 자체에서 인터페이스 구현도 가능하며, 이벤트 핸들러를 별도 클래스로 만들어 처리하거나 코틀린 SAM 기법도 활용 가능
	→ `SAM(Single Abstract Method)`: 코틀린 코드에서 자바 인터페이스를 간단하게 사용하기 위해 제공하는 기법
## 클릭, 롱클릭 이벤트 처리
- 이벤트 소스와 이벤트 핸들러를 리스너로 연결하는 구조만 이해하면, 어떤 뷰 이벤트라도 어렵지 않게 처리 가능
- 대표적인 예시로 `CliekEvent` , `LongClickEvent` 살펴보면,
	- 이 두 뷰는 뷰의 최상위 클래스인 View에 정의된 이벤트
	```kotlin
val button = findViewById<Button>(R.id.myButton)

button.setOnClickListener {
    println("클릭됨")
}

button.setOnLongClickListener {
    println("롱클릭됨")
    true   // 반드시 true 또는 false 반환
}
	```
	→ `setOnLongClickListener`는 **Boolean을 반환해야 함**

# <span color="gray_bg">(3) 시계 앱의 스톱워치 기능 만들기</span>
## \[1\] 새 모듈 생성
- Ch8_Event 이름으로 “Empty Views Activity” 선택

## \[2\] 그래들 설정
- ViewBinding 활용 위해 추가
![08-user-events 이미지 5](/SeonggukPark/images/notion/notes/android-kotlin/08-user-events-5.png)
→ 수정 후 우상단 sync now 눌러 프로젝트를 그래들과 동기화

## \[3\] 앱 화면 구성
- activity_main.xml 작성
![08-user-events 이미지 6](/SeonggukPark/images/notion/notes/android-kotlin/08-user-events-6.png)

## \[4\] 메인 액티비티 작성
- MainActivity.kt 파일에서 이벤트 처리 작성
![08-user-events 이미지 7](/SeonggukPark/images/notion/notes/android-kotlin/08-user-events-7.png)
![08-user-events 이미지 8](/SeonggukPark/images/notion/notes/android-kotlin/08-user-events-8.png)
→ Unresolved reference 오류 발생 시 file → Settings에서 Auto Import 설정

## \[5\] 앱 실행
![08-user-events 이미지 9](/SeonggukPark/images/notion/notes/android-kotlin/08-user-events-9.png)
