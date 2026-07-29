---
title: "07) 뷰를 배치하는 레이아웃"
description: "Linear·Relative·Frame·Grid·ConstraintLayout 배치 방식을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2fe6b9674ad88031a9e1c1923c2abd1d"
importedAt: 2026-07-24
---

- 레이아웃 클래스는 다른 뷰 객체를 포함하는 일종의 그릇 역할
- 안드로이드가 제공하는 레이아웃 클래스는 저마다 뷰를 배치하는 규칙이 존재
# <span color="gray_bg">(1) LinearLayout - 선형 배치</span>
- View들을 한 방향(세로 or 가로)으로 순서대로 배치하는 layout
- 단순하지만, **중첩하면 복잡한 화면도 만들 수 있음.**
## 배치 규칙
- `orientation` 속성으로 방향 지정
	- `orientation="vertical"` : 위 → 아래 (세로)
	- `orientation="horizontal"` : 왼쪽 → 오른쪽 (가로)
```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="첫 번째" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="두 번째" />

</LinearLayout>
```

## layout_weight 속성
- 남은 공간을 비율로 나누는 속성
- LinearLayout에서만 사용

### 뷰 1개로 전체 여백 채우기
```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="A"/>

    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:text="B"/>

</LinearLayout>
```
### 뷰 여러 개로 전체 여백 채우기
```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:orientation="horizontal">

    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:text="A"/>

    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="2"
        android:text="B"/>

</LinearLayout>
```
→ 1:2 비율 예제

Q. 뷰의 크기를 퍼센트(%)로 지정 가능?
A. 불가능. 크기를 0으로 설정하고 layout_weight 값으로 설정하면 퍼센트 지정 효과를 볼수 있음

## gravity, layout_gravity 속성
- 뷰를 정렬할 때 사용하는 속성
- default: left/top (좌상단 기준 정렬)
- 둘은 정렬 대상이 다름.
<table header-row="true">
<tr>
<td>속성</td>
<td>정렬 대상</td>
<td>적용 위치</td>
</tr>
<tr>
<td>`android:gravity`</td>
<td>내부 콘텐츠</td>
<td>View 내부</td>
</tr>
<tr>
<td>`android:layout_gravity`</td>
<td>View 자체</td>
<td>부모 Layout 안에서</td>
</tr>
</table>
![07-layouts 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-1.png)
```xml
<!-- 부모: LinearLayout (세로) -->
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:gravity="center_horizontal">

    <!-- View 자체를 부모 안에서 오른쪽으로 붙임(layout_gravity=end)
         View 내부 텍스트는 가운데 정렬(gravity=center) -->
    <Button
        android:layout_width="220dp"
        android:layout_height="80dp"
        android:layout_marginTop="24dp"
        android:layout_gravity="end"
        android:gravity="center"
        android:text="layout_gravity=end\ngravity=center" />

    <!-- View 자체를 부모 안에서 가운데로 배치(layout_gravity=center_horizontal)
         TextView 내부 텍스트는 오른쪽 정렬(gravity=end) -->
    <TextView
        android:layout_width="260dp"
        android:layout_height="80dp"
        android:layout_marginTop="24dp"
        android:layout_gravity="center_horizontal"
        android:gravity="end|center_vertical"
        android:padding="12dp"
        android:text="layout_gravity=center_horizontal\ngravity=end|center_vertical" />

</LinearLayout>
```
![07-layouts 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-2.png)
→ Button: **버튼(뷰) 자체는 오른쪽**에 위치하고, **버튼 안 글자는 가운데**에 위치
→ TextView: **텍스트뷰(뷰) 자체는 가운데**에 위치하고, **텍스트는 오른쪽 + 세로 가운데**에 위치

### Layout에 gravity 속성 적용
- LinearLayout에서는 orientation 방향으로는 `layout_gravity`가 적용되지 않음
	→ LinearLayout 자체가 방향으로 뷰를 배치하는 레이아웃 이라서
	→ orientation과 “반대 축”에서만 의미가 있음
- <span color="green">**view의 **</span><span color="green">**`layout_gravity=”center”`**</span><span color="green">** 대신 layout에 **</span><span color="green">**`gravity=”center”`**</span><span color="green">**로 설정하면 됨**</span>

# <span color="gray_bg">(2) RelativeLayout - 상대 위치로 배치</span>
- 다른 View 또는 부모를 기준으로 위치를 정하는 Layout
	→ 즉, 이미 출력된 특정 뷰를 기준으로 방향을 지정하여 배치

## 배치 규칙
- 속성에 입력되는 값은 기준이 되는 뷰의 id
### 속성
- `android: layout_above`: 기준 뷰의 위쪽에 배치
- `android: layout_below`: 기준 뷰의 아래쪽에 배치
- `android: layout_toLeftOf`: 기준 뷰의 왼쪽에 배치
- `android: layout_toRightOf`: 기준 뷰의 오른쪽에 배치

```xml
<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Title" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Button" />

</RelativeLayout>
```
![07-layouts 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-3.png)
→ 텍스트뷰 위에 겹쳐서 버튼이 나옴

```xml
<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Title" />

    <Button
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_below="@id/title"
        android:text="Button" />

</RelativeLayout>
```
![07-layouts 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-4.png)
→ `layout_below` 통해 Button이 TextView 아래에 위치

## align 속성
- `android:layout_alignTop`: 기준 뷰와 위쪽을 맞춤
- `android:layout_alignBottom`: 기준 뷰와 아래쪽을 맞춤
- `android:layout_alignLeft`: 기준 뷰와 왼쪽을 맞춤
- `android:layout_alignRight`: 기준 뷰와 오른쪽을 맞춤
- `android:layout_alignBaseline`: 기준 뷰와 텍스트 기준선을 맞춤
```xml
<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Button" />

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_toRightOf="@id/button"
        android:layout_alignBottom="@id/button"
        android:text="Title" />

</RelativeLayout>
```
![07-layouts 이미지 5](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-5.png)
→ `@id/button` 의 아래쪽에 맞춘 모습

### 부모 기준 align
- `android:layout_alignParentTop`: 부모의 위쪽에 맞춤
- `android:layout_alignParentBottom`: 부모의 아래쪽에 맞춤
- `android:layout_alignParentLeft`: 부모의 왼쪽에 맞춤
- `android:layout_alignParentRight`: 부모의 오른쪽에 맞춤
- `android:layout_centerHorizontal`: 부모의 가로 방향 중앙에 맞춤
- `android:layout_centerVertical`: 부모의 세로 방향 중앙에 맞춤
- `android:layout_centerInParent`: 부모의 가로/세로 중앙에 맞춤
```xml
<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Button" />

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_toRightOf="@id/button"
        android:layout_alignParentRight="true"
        android:text="Title" />

</RelativeLayout>
```
![07-layouts 이미지 6](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-6.png)
→ 부모의 오른쪽에 맞춰 정렬

Q. 화면을 구성할 때 어떤 layout class를 이용해야 하나? 판단 기준은?
A. Linear ↔ Relative 둘은 서로 대체 가능해서 그냥 개발자가 선택하면 됨

# <span color="gray_bg">(3) FrameLayout - 겹쳐서 배치</span>
- 자식 View들을 **겹쳐서(Stack)** 배치하는 Layout 클래스
- 같은 위치에 여러 뷰를 겹처 놓고, 특정 순간에 하나의 뷰만 출력할 때 사용
	→ 대부분 뷰의 표시 여부를 결정하는 visibility 속성을 함께 사용
```xml
<RelativeLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Button" />

    <TextView
        android:id="@+id/title"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Title" />

</RelativeLayout>
```
![07-layouts 이미지 7](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-7.png)

Q. 사용할 일이 잘 없을 것 같은데, 언제 쓰는지?
A. 여러 뷰를 같은 위치에 겹쳐 놓고 어떤 순간에 하나의 뷰만 보여줄 때 사용. 대표적으로 탭 화면

# <span color="gray_bg">(4) GridLayout - 표 형태로 배치</span>
- 행, 열로 구성된 테이블 화면 만드는 layout 클래스

## 배치 규칙
```xml
<?xml version="1.0" encoding="utf-8"?>
<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:columnCount="3">
    <Button android:text="A"/>
    <Button android:text="B"/>
    <Button android:text="C"/>
    <Button android:text="D"/>
    <Button android:text="E"/>
</GridLayout>
```
![07-layouts 이미지 8](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-8.png)

## 속성
### 부모(GridLayout) 속성
- `orientation` : 배치 순서 결정 (vertical / horizontal)
- `rowCount` : 세로로 나열할 뷰 개수
- `columnCount` : 가로로 나열할 뷰 개수

### 자식(View) 속성
- `layout_row` : 뷰가 위치하는 세로 인덱스
- `layout_col` : 뷰가 위치하는 가로 인덱스
```xml
<?xml version="1.0" encoding="utf-8"?>
<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:columnCount="3">
    <Button android:text="A"/>
    <Button android:text="B"/>
    <Button android:text="C"
        android:layout_row="1"
        android:layout_column="1"/>
    <Button android:text="D"/>
    <Button android:text="E"/>
</GridLayout>
```
![07-layouts 이미지 9](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-9.png)
→ 위치 지정한 뷰 다음부터 뷰들이 나옴 (D, E)

- `layout_gravity` : 셀 내부 정렬
```xml
<?xml version="1.0" encoding="utf-8"?>
<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:columnCount="3">
    <Button android:text="A"/>
    <Button android:text="LAYOUT_GRAVITY TEST"/>
    <Button android:text="C"/>
    <Button android:text="D"/>
    <Button android:text="E"/>
    <Button android:text="F"/>
</GridLayout>
```
![07-layouts 이미지 10](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-10.png)
→ 두 번째 뷰가 크게 출력되어 E 버튼 칸의 여백 발생

```xml
<?xml version="1.0" encoding="utf-8"?>
<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:columnCount="3">
    <Button android:text="A"/>
    <Button android:text="LAYOUT_GRAVITY TEST"/>
    <Button android:text="C"/>
    <Button android:text="D"/>
    <Button android:text="E"
        android:layout_gravity="fill_horizontal"/>
    <Button android:text="F"/>
</GridLayout>
```
![07-layouts 이미지 11](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-11.png)
→ E 뷰를 확장해서 출력

```xml
<?xml version="1.0" encoding="utf-8"?>
<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:columnCount="3">
    <Button android:text="A"/>
    <Button android:text="LAYOUT_GRAVITY TEST"/>
    <Button android:text="C"/>
    <Button android:text="D"/>
    <Button android:text="E"/>
    <Button android:text="F"
        android:layout_row="1"
        android:layout_column="1"
        android:layout_gravity="right"/>
</GridLayout>
```
![07-layouts 이미지 12](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-12.png)
→ 공간 충분하다면 여백 다음에 뷰를 넣어 한칸에 뷰 2개도 가능

- `layout_rowSpan` : 여러 열 차지
- `layout_columnSpan` : 여러 열 차지
```xml
<?xml version="1.0" encoding="utf-8"?>
<GridLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal"
    android:columnCount="3">
    <Button android:text="A"
        android:layout_columnSpan="2"
        android:layout_rowSpan="2"
        android:layout_gravity="fill"/>
    <Button android:text="B"/>
    <Button android:text="C"/>
    <Button android:text="D"/>
    <Button android:text="E"/>
    <Button android:text="F"/>
</GridLayout>
```
![07-layouts 이미지 13](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-13.png)

Q. TableLayout도 있던데?
A. 행을 일일이 계산해서 TableRow를 지정해줘야 함.. 그래서 불편해서 잘 안씀
# <span color="gray_bg">(5) ConstraintLayout - 계층 구조로 배치</span>
- 안드로이드 플랫폼이 아닌 androidx에서 제공하는 라이브러리
- `build.gradle.kts` 파일의 dependencies에 implementation 선언해야 함
```kotlin
implementation(libs.androidx.constraintlayout)
```
- 프로젝트 생성 시 자동으로 만들어 지는 layout xml 파일 보면 기본 layout이 `ConstraintLayout`

## Layout 편집기에서 Layout 구성하기
- `ConstraintLayout` 은 속성이 많아서 XML 파일에 직접 작성하기 부담
	→ 안드로이드 스튜디오는 마우스 클릭으로 레이아웃 구성 가능한 **레이아웃 편집기** 제공
![07-layouts 이미지 14](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-14.png)

### 이미지 추가
![07-layouts 이미지 15](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-15.png)
![07-layouts 이미지 16](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-16.png)
![07-layouts 이미지 17](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-17.png)
![07-layouts 이미지 18](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-18.png)
→ 부모 영역, 또는 다른 뷰를 기준으로 상대 위치 설정 (제약 조건)


### 제목 추가
![07-layouts 이미지 19](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-19.png)
![07-layouts 이미지 20](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-20.png)
![07-layouts 이미지 21](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-21.png)
→ 동그라미 잡고 끌어서 제약 지정 가능

![07-layouts 이미지 22](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-22.png)

### 메세지 추가, 날짜 추가
- 위와 똑같이
![07-layouts 이미지 23](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-23.png)

## XML 코드로 확인
![07-layouts 이미지 24](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-24.png)
→ 우측 상단 \[View mode\]에서 \<Code\>로 변경하면 코드로 확인 가능
![07-layouts 이미지 25](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-25.png)

Q. ConstraintLayout이 아닌 다른 레이아웃도 레이아웃 편집기로 구성 가능?
A. 불가능하지는 않지만, 굳이.. 다른 레이아웃은 도구가 많이 지원을 안해줌

# <span color="gray_bg">(6) 전화 앱의 키패드 화면 만들기</span>
- 단순 화면만 만들고, 이벤트 처리는 별도로 X

## \[1\] 새로운 모듈 생성
- CH6 실습과 동일, “Empty Views Activity” 선택
## \[2\] 실습 파일 복사
- res/drawable 디렉토리에 png 파일들 복사
![07-layouts 이미지 26](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-26.png)

## \[3\] main activity 작성
- 샘플 소스 해당 위치에 복사
![07-layouts 이미지 27](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-27.png)

## \[4\] 앱 실행
![07-layouts 이미지 28](/SeonggukPark/images/notion/notes/android-kotlin/07-layouts-28.png)
