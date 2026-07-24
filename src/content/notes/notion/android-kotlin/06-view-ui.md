---
title: "06) 뷰를 이용한 화면 구성"
description: "Notion에서 가져온 06) 뷰를 이용한 화면 구성 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2fe6b9674ad88146b8d5e05459d0596c"
importedAt: 2026-07-24
---

> 이 문서는 Notion MCP 원본에서 직접 가져온 학습 기록입니다.

# <span color="gray_bg">(1) 화면을 구성하는 방법</span>
## 액티비티-뷰 구조
- 안드로이드 앱은 컴포넌트를 적절하게 조합해서 만듦
- 화면 출력하는 건 **액티비티**가 유일
- 액티비티는 컴포넌트일 뿐이지 그 자체가 화면은 아님
	→ **뷰 클래스**를 이용해 화면에 내용 표시 (e.g. TextView 클래스로 화면에 문자열 출력)
- 액티비티에서 뷰로 화면 구성하려면 액티비티 코드 or 레이아웃 XML 파일로 작성 가능
	- 레이아웃 XML 이용할 경우, 액티비티 코드에서는 setContentView() 함수로 xml만 전달

Q. 액티비티를 무조건 만들어야 하는지?
A. 화면 없이 백그라운드 실행되도록 만드려면 없어도 됨.. 실제 안드로이드폰에는 화면 제공 안하는 앱도 많음

Q. 화면이 10개라면 액티비티도 10개 만들어야 하는지?
A. Fragment나 Compose 이용하면 액티비티 1개로도 가능

Q. 액티비티 코드와 XML 파일, 화면 구성하는 두 방법 중 어떤게 더 좋나?
A. 개발자가 선택하면 되는데, 보통 효율성 고려하면 XML이 더 좋음. 화면 구현은 XML로 분리하고, 액티비티에서는 네트워킹, 데이터 핸들링, 사용자 이벤트 처리 등의 코드만 처리하면 좋음. 특히 데이터 서비스가 주 목적이라면, 대부분 화면 구성은 XML로 함

# <span color="gray_bg">(2) 뷰 클래스</span>
- 액티비티가 이용하는 클래스
- 안드로이드는 TextView, ImageView 등 여러 뷰 클래스 제공

### 뷰 객체의 계층 구조
- 액티비티 화면을 구성할 때 사용하는 클래스는 모두 View의 하위 클래스
	→ 그래서 뷰 클래스라 함
	
![06-view-ui 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-1.png)
- View
	- 모든 뷰 클래스의 최상위 클래스
	- 액티비티는 View의 sub class만 화면에 출력
- ViewGroup
	- 자체 UI가 없어서 화면에 출력해도 아무것도 안나옴
	- 다른 뷰 여러 개를 묶어서 제어할 목적으로 사용 (컨테이너 기능)
		→ ViewGroup으로 직접하지 않고, 서브 클래스인 레이아웃 클래스 사용
		→ 객체의 계충 구조에서 중요한 것이 **레이아웃 **클래스
- TextView
	- 특정 UI 출력 목적
	- 문자열 출력하는 뷰

### 레이아웃 중첩
- 뷰의 계층 구조는 레이아웃 객체를 중첩해서 복잡하게 구성 가능
- 객체를 계층 구조로 만들어 쓰는 패턴을 컴포지트 패턴(composite pattern) or 문서 객체 모델 (document object model)이라 함

## 레이아웃 XML의 뷰를 코드에서 사용
- 화면 구성을 레이아웃 XML에 작성 후 액티비티에서 setContentView() 함수로 XML 파일을 지정하면 출력

```xml
<TextView
android:id="@+id/text1"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:text="hello" />
```
<table header-row="true">
<tr>
<td>속성</td>
<td>의미</td>
</tr>
<tr>
<td>`id="@+id/text1”`</td>
<td>`text1`이라는 **고유 ID를 생성 <br>**(앱에서 유일해야 함)</td>
</tr>
<tr>
<td>`layout_width="wrap_content"`</td>
<td>텍스트 길이만큼 가로 크기</td>
</tr>
<tr>
<td>`layout_height="wrap_content"`</td>
<td>텍스트 높이만큼 세로 크기</td>
</tr>
<tr>
<td>`text="hello"`</td>
<td>화면에 표시할 문자열</td>
</tr>
</table>
→ XML 속성값이 `@` 로 시작하면 리소스를 참조한다는 의미

+) res 폴더에 정의된 리소스는 R에 자동 등록 (단순 값 X)
<table header-row="true">
<tr>
<td>상황</td>
<td>R에 생성?</td>
</tr>
<tr>
<td>res 폴더에 정의</td>
<td>✅</td>
</tr>
<tr>
<td>@+id 사용</td>
<td>✅</td>
</tr>
<tr>
<td>@string 참조</td>
<td>✅</td>
</tr>
<tr>
<td>단순 문자열 값</td>
<td>❌</td>
</tr>
<tr>
<td>코드 변수</td>
<td>❌</td>
</tr>
</table>
- 코드에서 XML에 입력한 객체 사용하려면 `setContentView()`로 뷰 객체 생성 후, `findViewById(R.id.text1)`  형태로 가져오면 됨
```kotlin
setContentView(R.layout.activity_main)

val tv: TextView = findViewById(R.id.text1) // 과저 java style
val tv_gen = findViewById<TextView>(R.id.text1) // 타입을 제네릭으로 명시 (kotlin style)
```

Q. 레이아웃 XML에 구현한 대로 뷰가 화면에 나온다면, 굳이 코드에서 객체를 가져와야 하나?
A. 코드에서 화면 출력 문자열을 바꾸거나 특정 뷰 객체 이벤트를 추가할 때 등등 필요한 상황 있음

## 뷰의 크기 설정
- 뷰를 레이아웃 XML에 등록하여 화면 구성시 <span color="red">생략할 수 없는 속성</span>
```kotlin
android:layout_width="..."
android:layout_height="..."
```
→ 속성 값에 총 3가지가 올 수 있음
	- wrap_content: 내용(content) 크기 만큼 차지
	- match_parent: 부모 뷰 크기만큼 채우기
	- 고정 크기(값): 지정 크기만큼 고정
		<table header-row="true">
<tr>
<td>단위</td>
<td>의미</td>
</tr>
<tr>
<td>dp</td>
<td>화면 밀도 독립 단위 (권장)</td>
</tr>
<tr>
<td>sp</td>
<td>글자 크기 전용</td>
</tr>
<tr>
<td>px</td>
<td>실제 픽셀 (비권장)</td>
</tr>
		</table>
Q. 굳이 왜 크기를 수치로 안하고 wrap_content, match_parent로 하는지?
A. 기기 호환성 고려

## 뷰의 간격 설정
- layout_margin, padding 속성으로 설정
![06-view-ui 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-2.png)

- 디폴트 값 존재하며, 바꾸고 싶을 때 사용
- 기본적으로 간격이 네 방향 모두 같은 크기로 설정 되며, 특정 간격만 설정하려면 별도 속성 이용
- 간격은 dp 사용
```kotlin
<TextView
    ~
   android:layout_margin="16dp"
   android:padding="16dp"/>
```

## 뷰의 표시 여부 설정
- visibility 속성으로 설정
- 뷰가 화면에 출력되어야 하는지 결정
- 값은 visible, invisible, gone으로 설정, default는 visible
	→ invisible은 화면에 보이지 않지만 자리는 차지, gone은 자리조차 차지 X
```kotlin
<TextView
    ~
    android:visibility="visible"/>
```

- XML이 아닌 코드에서 뷰의 visibility 속성 조정하려면 visibility의 속성 값을 `View.INVISIBLE`, `View.INVISIBLE`, `View.GONE`로 설정하면 됨
```kotlin
view.visibility = View.VISIBLE
```

Q. visibility 설정할 때 세터 함수 호출 안하나?
A. 해도 되는데, 코틀린 변수는 자바와 달리 field가 아니라 property임. 즉, 변수에 세터와 게터가 내장되어 있음. 그래서 사실 변수처럼 이용해도 내부적으로 세터/게터 함수가 호출됨

# <span color="gray_bg">(3) 기본적인 뷰 살펴보기</span>
## TextView
- 문자열을 화면에 출력하기 위한 View 클래스

### 속성
```xml
<TextView
    android:id="@+id/tvTitle"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Hello Android"
    android:textColor="@color/black"
    android:textSize="20sp"
    android:textStyle="bold" />
```
<table header-row="true">
<tr>
<td>속성</td>
<td>설명</td>
</tr>
<tr>
<td>`android:text`</td>
<td>표시할 문자열</td>
</tr>
<tr>
<td>`android:textSize`</td>
<td>글자 크기 (sp 사용)</td>
</tr>
<tr>
<td>`android:textColor`</td>
<td>글자 색상</td>
</tr>
<tr>
<td>`android:gravity`</td>
<td>텍스트 정렬</td>
</tr>
<tr>
<td>`android:maxLines`</td>
<td>최대 줄 수</td>
</tr>
<tr>
<td>`android:ellipsize`</td>
<td>말줄임 처리</td>
</tr>
</table>
- `android:autoLink` 
	- TextView에 출력할 문자열을 분석해 특정 형태의 문자열에 자동 링크를 추가
	- 사용자가 링크 클릭 가능한 링크로 변환
	- 속성 값으로 web, phone, email 등 사용 가능 → 여러개 쓸 경우 `|` 기호로 구분

- `android:maxLines`  
	- 표시할 수 있는 최대 줄 수 제한

- `android:ellipsize` 
	- TextView에서 텍스트가 영역을 초과할 경우 어떻게 줄일지 지정
	- 주로 maxLines, singleLine과 함께 사용
	<table header-row="true">
<tr>
<td>값</td>
<td>설명</td>
</tr>
<tr>
<td>`none`</td>
<td>말줄임 없음 (기본값)</td>
</tr>
<tr>
<td>`start`</td>
<td>앞부분을 `...` 처리</td>
</tr>
<tr>
<td>`middle`</td>
<td>중간을 `...` 처리</td>
</tr>
<tr>
<td>`end`</td>
<td>끝부분을 `...` 처리</td>
</tr>
<tr>
<td>`marquee`</td>
<td>흐르는 텍스트(스크롤)</td>
</tr>
	</table>
## ImageView
- 이미지 리소스를 화면에 출력하기 위한 View 클래스

### 속성
- `android:src` 
	- 표시할 이미지 지정
	- 속성값: `@drawable/파일명` 형태

- `android:maxWidth`, `android:maxHeight`
	- `ImageView`의 **최대 크기 제한 값**
	- `layout_width`, `layout_height`가 이 값을 초과하더라도, 실제 측정 크기는 max까지만 허용

- `android:adjustViewBound`
	- 이미지의 **원본 비율을 유지하면서 View 크기를 자동 조정**하도록 허용하는 속성
	- 속성값: `true / false` ,  default: false

Q. layout_width, layout_height 속성에 숫자로 지정하면 원하는 크기 출력이 가능하지 않나?
A. 그건 기본 크기 규칙을 정하는 거고, 원본 이미지가 너무 크면 화면 벗어날 수도 있고 가로/세로 따로 고정하고 비율 맞추려면 layout_width/height 만으로는 안됨

## 버튼, 체크박스, 라디오 버튼
### Button
- 사용자 입력을 처리하는 클릭 컴포넌트
- TextView를 상속받음
```xml
<Button
    android:id="@+id/btnSubmit"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="확인"/>
```

### CheckBox
- 여러 개 중 **복수 선택 가능**한 선택 컴포넌트
```xml
<CheckBox
    android:id="@+id/check1"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="이용약관 동의"/>
```
![06-view-ui 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-3.png)

### RadioButton
- 여러 개 중 하나만 선택 가능한 선택 컴포넌트
- `RadioGroup` 안에 넣어야 단일 선택 보장됨
```xml
<RadioGroup
    android:id="@+id/radioGroup"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <RadioButton
        android:id="@+id/radio1"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="남자"/>

    <RadioButton
        android:id="@+id/radio2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="여자"/>

</RadioGroup>
```
![06-view-ui 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-4.png)

## EditText
- 사용자가 **텍스트를 입력할 수 있는 View 컴포넌트** 

### 속성
- `android:lines` 
	- 고정 줄 수 지정 속성
	- 항상 설정한 줄 수만큼의 높이를 갖도록 강제, 줄이 넘치면 스크롤 됨
- `android:maxLines`
	- 내용이 늘어나도 3줄까지만 확장, 줄이 넘치면 스크롤
- `android:inputType`
	- EditText에 글을 입력할 때 올라오는 키보드를 지정하는 속성
	- 키보드 한 줄 입력 강제, 전화번호 입력 모드 지정 등 가능
	<details>
	<summary>키보드 보이지 않는 경우</summary>
		- 왼쪽 메뉴 마지막의 삼지창 아이콘 터치
		- 두 번째 아래의 \[Show on-screen keyboard\] 선택
		- 키보드 고정하고 싶다면 \[Settings → Use stylus to write \~\] 비활성화
	</details>
# <span color="gray_bg">(4) 뷰 바인딩</span>
- XML 레이아웃에 있는 View를 `findViewById()` 없이 타입 안전하게 참조할 수 있게 해주는 기능
- 일일이 `findViewById()` 호출하는게 귀찮아서 한 때 `butterknife` 같은 라이브러리 많이 쓰기도
- 뷰 바인딩 사용하면 더욱 간단하게 가능

- 우선 그래들 파일에 뷰 바인딩 설정 해야함
```kotlin
android {
    buildFeatures {
        viewBinding = true
    }
}
```
→ 레이아웃 XML 파일에 등록된 뷰 객체를 포함하는 클래스가 자동 생성됨
→ 이 클래스를 이용해 뷰를 만들면 됨
→ 클래스 이름은 레이아웃 XML 파일명 따름
	- e.g.) activity_main.xml → ActivityMainBinding(PascalCase + 뒤 `Binding`)

### Activity에서 사용법
**\[1\] 선언**
```kotlin
privatelateinitvar binding: ActivityMainBinding
```

**\[2\] onCreate에서 초기화**
```kotlin
binding = ActivityMainBinding.inflate(layoutInflater)
setContentView(binding.root)
```

**\[3\] View 접근**
```kotlin
binding.textView.text ="Hello"
binding.button.setOnClickListener { }
```

- 특정 XML 파일을 바인딩 클래스로 만들 필요가 없다면, `tools:viewBindingIgnore="true"` 속성 사용
```kotlin
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    tools:viewBindingIgnore="true"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

</LinearLayout>
```

# <span color="gray_bg">(5) 카카오톡 비밀번호 화면 만들기</span>
- 이벤트 처리 없이 화면 구현만 해보기
## \[1\] 새 모듈 만들기
![06-view-ui 이미지 5](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-5.png)
![06-view-ui 이미지 6](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-6.png)
→ 예제 소스 활용하려면 이름 맞춰야 함

![06-view-ui 이미지 7](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-7.png)
![06-view-ui 이미지 8](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-8.png)
→ 이름은 디폴트 그대로

## \[2\] 문자열 리소스 등록
![06-view-ui 이미지 9](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-9.png)

## \[3\] 레이아웃 XML 작성
![06-view-ui 이미지 10](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-10.png)
→ 우상단에서 디자인 모드 → \<Code\>로 변경

![06-view-ui 이미지 11](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-11.png)

## \[4\] 앱 실행
![06-view-ui 이미지 12](/SeonggukPark/images/notion/notes/android-kotlin/06-view-ui-12.png)

