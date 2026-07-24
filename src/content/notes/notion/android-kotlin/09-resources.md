---
title: "9) 리소스 활용하기"
description: "Notion에서 가져온 9) 리소스 활용하기 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2fe6b9674ad880b5ba5fc301b10865a2"
importedAt: 2026-07-24
---

> 이 문서는 Notion MCP 원본에서 직접 가져온 학습 기록입니다.

# <span color="gray_bg">(1) 리소스의 종류와 특징</span>
- 앱에서 사용하는 리소스는 앱 리소스와 플랫폼 리소스로 구분
## 앱 리소스
- 개발자가 직접 추가한 리소스
- res 디렉토리 아래에 리소스 파일을 각각 만듦
### 안드로이드 앱 리소스 종류
![09-resources 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-1.png)

- 리소스는 R 파일에서 식별자로 등록해서 사용하므로, 몇 가지 규칙 존재
→ 해당 디렉터리명은 고정이며, res 디렉터리 아래에 개발자 임의로 이름을 붙인 디렉터리 못만듦
→ 하위 디렉터리 역시 추가 안됨
→ 리소스 파일명은 `values`에 추가하는 파일 제외하면 모두 자바의 이름 작성 규칙을 따라야 함
→ 리소스 파일명은 알파벳 대문자 사용 안됨

### layout 디렉터리 - 레이아웃 리소스
- 화면을 구성하는 layout xml 파일을 저장하는 디렉터리

### drawable 디렉터리 - 이미지 리소스
- PNG, JPG, GIF, WEBP 파일 저장 가능
- XML로 작성한 이미지도 저장 가능

### mipmap 디렉터리 - 실행 아이콘 리소스
- 앱을 기기에 설치하면 나타나는 실행 아이콘의 이미지 리소스 저장

### values 디렉터리 - 값 저장
- 문자열, 색상, 크기, 배열 등의 값을 xml로 저장 가능
- 해당 디렉터리의 리소스 파일은 R 파일에 식별자로 등록되지 않고 리소스 파일에 값을 지정한 태그의 name 속성값이 등록
	→ 파일명 개발자가 자유롭게 설정 가능, 알파벳 대문자도 가능
Q. 왜 values 디렉터리의 리소스만 파일이 아닌 태그를 R 파일에 등록하나?
A. 값 하나가 파일 하나로 등록되어야 하기 때문 아닐까?

### color 디렉터리 - 색상 리소스
- values의 \<color\> 태그로 등록한 리소스는 색상 하나를 리소스에 등록하겠다는 의미
	→ color 디렉터리의 리소스는 특정 뷰의 상태 표현, 그 상태에 적용 되는 색상 등록
	
### font 디렉터리 - 글꼴 리소스
- TTF, OTF 파일 저장후 글꼴 저장할 뷰에서 사용 가능

## 플랫폼 리소스
- 안드로이드 OS(프레임워크)가 기본 제공하는 리소스
- 안드로이드 스튜디오의 프로젝트 탐색 창의 \[package → libraries\] 항목 참조
- 앱의 R 파일이 아니라 android.R이라는 플랫폼 라이브러리의 R 파일에 등록되어 있음
- 플랫폼의 drawable 디렉터리의 save.png 파일을 쓴다면 `@android:drawable/save`로 이용

# <span color="gray_bg">(2) 리소스 조건 설정</span>
- 특정 리소스를 특정 환경에서만 적용되도록 설정하는 것
- 보통 앱 개발시 아이콘이 선명하게 출력되도록 기기 크기별로 이미지를 5개씩 준비
	→ 문제는 어떤 이미지를 어떤 크기에 적용해야 하는지 어떻게 결정?
	→ 이때 코드에서 기기의 크기를 얻어서 할 수도 있지만, 이는 리소스의 목적과 맞지 않음
	→ 이럴 때 리소스 조건 활용
	
- 이름이 같은 파일을 조건이 다른 폴더에 여러 개 둠
![09-resources 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-2.png)
→ (-) 뒤의 단어가 리소스 조건
→ land의 경우 landscape(가로 모드)일 때 자동 적용

- 하나의 디렉터리에 여러 조건을 지정할 때는, 조건의 순서를 반드시 지켜야 함
	→ 언어 조건, 밀도 조건 함께 지정 시 언어 다음 밀도가 와야
## 화면 회전 대응
- 동일한 xml 파일을 layout, layout-land 디렉터리에 저장하면 각각 세로, 가로 방향일 때 적용

Q. 화면 회전을 막아버리면 되는거 아닌지?
A. 게임 같이 화면 회전시 문제가 생기는 서비스면 막는게 맞지만, 데이터 위주의 서비스 앱은 사용자 편의를 위해 선택할 수 있도록 하는게 맞음. 특히 태블릿 사용자까지 고려하면 더더욱

## 국제 언어 대응
- 글로벌 서비스를 제공하는 앱이라면 리소스 문자열을 각 언어로 제공해야 함
![09-resources 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-3.png)

# <span color="gray_bg">(3) 폰 크기의 호환성</span>
## 논리적 단위
- 안드로이드 시스템은 기기 크기를 다음과 같이 구분
![09-resources 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-4.png)
→ dpi: dot per inch의 줄임말, 1인치 안에 있는 도트 개수

- 안드로이드 앱 개발시 사용 가능한 단위는 다음과 같음
![09-resources 이미지 5](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-5.png)
→ 안드로이드에서는 논리적 단위인 dp, sp로 크기를 지정하길 권장 (dp: 일반 크기, sp: 글꼴 크기)
→ 픽셀 같은 경우, 작은 화면에서는 너무 크게 보이고 큰 화면에서는 너무 작게 보임
	→ 즉, 기기별 UI 일관성이 깨짐
```kotlin
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="HelloWorld"
    android:textSize="12px" />
    
<TextView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="HelloWorld"
    android:textSize="12dp" />
```

## 화면 정보 가져오기
- 개발자가 직접 코드에서 크기 호완성을 조정할 경우 기기 크기 정보를 가져와야 함
- API 레벨 30 이전, 이후로 나뉨
```kotlin
/* 
Android 11(API 30, R) 이상에서는 WindowMetrics 사용
그 이하 버전에서는 DisplayMetrics 사용 
*/

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R){
val windowMetrics: WindowMetrics = windowManager.currentWindowMetrics
binding.textView.text = "width : ${windowMetrics.bounds.width()}, height :
${windowMetrics.bounds.height()}"
} else {
val display = windowManager.defaultDisplay
val displayMetrics = DisplayMetrics()
display?.getRealMetrics(displayMetrics)
binding.textView.text =
	"width : ${displayMetrics.widthPixels}, height : ${displayMetrics.heightPixels}"
}
```

# <span color="gray_bg">(4) 메신저 앱의 인트로 화면 만들기</span>
## \[1\] 새 모듈 생성
- Ch9_Resource 이름으로 “Empty Views Activity” 선택

## \[2\] 리소스 파일 준비
- intro.png 파일 → drawable

## \[3\] 언어별 문자열 리소스 작성
- string.xml → res/values (영어 사용자 위한 문자열)
### 한국어 사용자 위한 리소스 만들기
![09-resources 이미지 6](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-6.png)
→ 책대로 하면 다르게 나와서 따로 알아봐야 함

## \[4\] 세로 방향 화면 구성
- activity_main.xml 작성
![09-resources 이미지 7](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-7.png)

## \[5\] 가로 방향 화면 구성
![09-resources 이미지 8](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-8.png)
![09-resources 이미지 9](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-9.png)

- 가로 화면일 때 사용할 코드 작성
![09-resources 이미지 10](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-10.png)

## \[6\] 앱 실행
![09-resources 이미지 11](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-11.png)
→ 처음에는 세로 방향 영어 화면 출력

## \[7\] 화면 회전 테스트
![09-resources 이미지 12](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-12.png)
→ 우선 자동 회전모드 켜기

![09-resources 이미지 13](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-13.png)
→ Rotate right/left 눌러서 가로로 바뀌는지 확인

![09-resources 이미지 14](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-14.png)

## \[8\] 기기 언어 한국어로 변경
- 안드로이드 설정에서 한국어 추가
![09-resources 이미지 15](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-15.png)
![09-resources 이미지 16](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-16.png)
→ 이후 시스템 언어 한국어로 변경되면 앱 다시 실행

![09-resources 이미지 17](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-17.png)
![09-resources 이미지 18](/SeonggukPark/images/notion/notes/android-kotlin/09-resources-18.png)

