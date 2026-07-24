---
title: "02) 안드로이드 앱의 기본 구조"
description: "Notion에서 가져온 02) 안드로이드 앱의 기본 구조 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2ba6b9674ad880a8b9affb82d6fa4c4a"
importedAt: 2026-07-24
---

> 이 문서는 Notion MCP 원본에서 직접 가져온 학습 기록입니다.

# <span color="gray_bg">(1) 안드로이드 소개</span>
- 리눅스 커널을 기반으로 구글에서 제작한 모바일 OS
- 2008년 출시 이후 전 세계 모바일 플랫폼 시장의 70\~80% 차지
## 안드로이드 특징
- 리눅스 기반
- 자바, 코틀린 활용 앱 개발
- OS의 주요 부분, 라이브러리, 구글 제작 앱 등의 코드는 대부분 공개
- 안드로이드 스마트폰은 구글 외 여러 제조업체에서 제작 가능
- 다양한 방법으로 어플 배포 가능 (플레이스토어, ..)
- 모든 응용 프로그램은 평등하는 사상을 바탕으로, 기본 탑재 앱과 개발자가 만든 앱이 동일 환경, 동일 API 이용

### 안드로이드 OS 구조
![02-app-structure 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-1.png)

-  하드웨어 추상화 레이어 (Hardware Abstraction Layer, HAL)
	- 상위의 자바 API 프레임워크에서 HW 기능을 이용할 수 있게 표준 Interface 제공
- 안드로이드 런타임 (Android runtime, ART)
	- 앱을 실행하는 역할 (안드로이드 5.0 버전 이전: Dalvik, 이후 ART)
		![02-app-structure 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-2.png)
		→ Dalvik은 실행 중 컴파일(JIT) 위주의 가상머신이고, ART는 설치 시 컴파일(AOT)과 프로파일 기반 JIT를 결합한 고성능 런타임
		
	- DEX(=안드로이드 앱 빌드 포맷) 파일을 해석해서 실행하는 주체
		![02-app-structure 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-3.png)
		→ 안드로이드는 자바 클래스를 런타임때 그대로 실행하지 않고, DEX 파일로 컴파일 후 이를 해석하는 ART에서 실행
		→ DEX 파일은 안드로이드 스튜디오에서 앱 빌드시 자동 생성
- 네이티브 C/C++ 라이브러리
	- 안드로이드 앱 대부분은 자바 프레임워크로 개발, but 네이티브 C/C++ 라이브러리 활용도 가능
	- 안드로이드 NDK(Native Development Kit)이라 함
- 자바 API 프레임워크
	- 앱 개발할 때 사용하는 자바 API

### 앱 개발 언어
- 안드로이드 첫 출시부터 오랫동안 자바로 개발
- 2017 구글 IO 행사에서 코틀린을 안드로이드 공식 언어로 지정
	→ 이제 자바, 코틀린 두 가지 사용
	
### 다양한 디바이스
- 다양한 제조업체에서 제작 가능
	→ 다양한 폰에서의 호완성 고려해야 함

### 앱 배포
- 플레이스토어 뿐만 아니라 통신사 앱 마켓을 통해 배포하거나 사용자에게 직접 전달도 가능

### 버전
- API 레벨
	- 개발자 관점에서 사용하는 버전
	- 안드로이드 SDK에서 제공하는 기능 집합 (운영체제 버전 - API 레벨 1:1 대응)
- 운영체제 버전별로 API 레벨 지정
	→ 소스 코드에서는 대부분 API 레벨 이용
- 개발자는 운영체제 버전 + API 레벨 함께 알아야
- 코드명
	- 안드로이드 버전의 별칭
	- EX) 안드로이드 15 버전 → VanillaIceCream

Q. 새 버전 나와도 이전 버전과 호환될 텐데, 굳이 새로운 내용을 앱에 적용해야 하는지?
A. 새 버전 나오면 이전 버전의 API가 제거/변경 되기도 해서 민감하게 대처해야

# <span color="gray_bg">(2) 안드로이드 앱 개발의 특징</span>
- 안드로이드 앱 개발의 핵심은 컴포넌트
# 컴포넌트
- 어플리케이션의 구성 요소
- 하나의 앱은 여러 컴포넌트로 구성
- 안드로이드에서는 클래스로 컴포넌트 개발
- 앱 만들 때 컴포넌트 구성은 설계에 따라 달라지며, 정해진 규칙이 없음
	→ 심지어 액티비티 없는, 즉 사용자에게 화면을 제공하지 않는 앱도 개발 가능
	
# 컴포넌트의 종류
## \[1\] 액티비티
- 화면을 구성하는 컴포넌트
- 앱이 실행되면 액티비티에서 출력한 내용이 안드로이드 폰에서 나옴
## \[2\] 서비스
- 백그라운드 작업을 하는 컴포넌트
- 화면과 상관없이 백그라운드에서 장시간 실행해야 할 업무 담당
## \[3\] 콘텐츠 프로바이더
- 앱의 데이터를 공유하는 컴포넌트
- EX) 카카오톡에서 프로필 변경할 때 갤러리 앱의 사진 이용
## \[4\] 브로드캐스트 리시버
- 시스템 이벤트 (EX. 부팅 완료, 배터리 방전)가 발생할 때 실행되는 컴포넌트
- <span color="red">사용자 이벤트 X</span>

---
- 개발자가 컴포넌트 클래스를 만들 때는 지정 클래스를 상속받아야 함
- 이 상위 클래스를 보고 컴포넌트 구분 가능
	→ 액티비티: Activity, 서비스 : Service, 콘텐츠 프로바이더 : ContentProvider, 브로드캐스트 리시버: BroadcastReceiver 클래스 상속받아 만듦

Q. 안드로이드 앱을 구성하는 클래스는 모두 컴포넌트 인가?
A. X, 앱은 크게 컴포넌트 클래스와 일반 클래스로 구분됨.
	- 생명주기를 개발자 코드에서 관리 → 일반 클래스
	- 생명주기를 안드로이드 시스템에서 관리 → 컴포넌트 클래스

Q. 안드로이드 시스템이 컴포넌트의 생명 주기를 관리해도 개발자가 만든 클래스인데, 코드에서 직접 생성해서 쓰면 안되는지?
A. 그건 일반 클래스로 이용하겠다는 것과 같음. 시스템에서 컴포넌트 클래스는 특별하게 관리함

# 컴포넌트 : 앱 안의 독립된 실행 단위
- 코드 결합이 발생 X
### \[카카오톡 예시\]
- 채팅방 목록 화면 → ListActivity(LA) / 채팅 화면 → ChatActivity(CA)라는 클래스 명 가정
- LA에서 CA 실행해 화면 전환
- 컴포넌트의 생명 주기는 시스템에서 관리 → LA에서 CA 객체 실행하는 건 불가능
- LA가 시스템에 의뢰 → CA 실행해야 함
- 즉, 두 클래스가 서로 종속되지 않음

# 다양한 앱 실행 시점
### \[카카오톡 예시\]
- 사용자가 알림 창에서 메세지 수신 알림 터치 → 바로 채팅화면 열림
- 즉, LA가 아닌 CA가 바로 실행 가능
	→ 안드로이드에는 메인 함수 개념이 없음
	
# 애플리케이션 라이브러리
- 다른 애플리케이션을 라이브러리처럼 이용
### \[카카오톡 예시\]
- 채팅창에서 카메라 앱 실행해서 사진 데이터 반환 받기

# 리소스 활용 개발
- 리소스: 코드에서 정적인 값을 분리한 것
- 즉, 항상 똑같은 값은 코드에 담지 않고 분리해서 개발
	→ 코드 길이 ↓ & 개발 생산성 ↑ & 유지 보수성 ↑
- 문자열, 색상, 크기, 레이아웃, 이미지, 메뉴 등 많은 요소를 리소스로 활용 가능
- 대부분의 리소스는 XML 파일로 작성

# <span color="gray_bg">(3) 앱 구성 파일 분석</span>
# 프로젝트 폴더 구성
- 안드로이드 앱 프로젝트 만들 때 생성되는 대부분 파일은 빌드 도구 관련
- 개발자는 \[모듈명 → src → main\]에 관심 가져야
- 프로젝트 생성 시 ‘app’ 모듈이 자동 생성
	→ 모듈 하나가 곧 앱 하나 (즉, 모듈 추가 = 신규 앱 개발)
	**→ 프로젝트는 여러 모듈을 묶어서 관리하는 개념**

# 모듈의 폴더 구성
<columns>
	<column ratio="43.75">
		![02-app-structure 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-4.png)
	</column>
	<column ratio="56.25">
		<table>
<tr>
<td>**이름**</td>
<td>**설명**</td>
</tr>
<tr>
<td>build.gradle.kts</td>
<td>빌드 설정 파일</td>
</tr>
<tr>
<td>AndroidManifest.xml</td>
<td>앱의 메인 환경 파일</td>
</tr>
<tr>
<td>res</td>
<td>리소스 폴더</td>
</tr>
<tr>
<td>activity_main.xml</td>
<td>레이아웃 XML 파일</td>
</tr>
<tr>
<td>MainActivity.kt</td>
<td>메인 액티비티 파일</td>
</tr>
		</table>
		
	</column>
</columns>

## 그래들 빌드 설정 파일
- 그래들(gradle): 안드로이드 앱의 빌드 도구
- build.gradle.kts(그래들 파일): 그래들 설정 파일, 앱 빌드시 필요한 설정을 여기 등록
- 안드로이드 스튜디오의 \[Gradle Scripts\]에 존재
	![02-app-structure 이미지 5](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-5.png)
	→ build.gradle.kts (Project \~) : 프로젝트 수준의 파일
	→ build.gradle.kts (Module : app) : 모듈 수준의 파일
	- 대부분의 빌드 설정은 <span color="red">모듈 수준의 그래들 파일에 작성</span>
	
![02-app-structure 이미지 6](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-6.png)
→ 플러그인 설정
	- 플러그인 선언, 필요시 추가 가능
→ 컴파일 버전 설정
	- 앱 컴파일 or 빌드할 때 적용할 SDK 버전
→ 앱의 식별자 지정
	- 앱의 식별자는 고유한 문자열로 지정해야
	- 플레이 스토어에 동일한 식별자의 앱이 있다면 등록 안됨
	- 스마트폰에 동일한 식별자의 앱이 설치되어 있다면 설치 안됨
→ SDK 버전 지정
	- minSdk: 앱 설치 가능한 기기의 최소 SDK 버전
	- targetSdk: 개발 시 적용되는 SDK 버전
	Q. minSdk 설정값을 1로 하면 모든 스마트폰에 설치 가능하지 아ㅓㄶ나?
	A. 그렇긴 한데, 하위 호완성을 고려하면 개발이 어려워짐
→ 앱의 버전 설정
	- 코드 앱의 버전 설정
→ 컴파일 옵션
	- 개발 언어의 버전 설정 (Java는 1.6이 디폴트)
→ 라이브러리 설정
	- SDK가 아닌 라이브러리는 모두 dependencies에 선언
	- 실제 개발할 때 SDK 외의 많은 라이브러리 활용

## 메인 환경 파일
- AndroidsManifest.xml(메니페스트 파일)
- 안드로이드 앱의 메인 환경 파일
- 컴포넌트는 메니페스트 파일에 등록해야 시스템이 인지

![02-app-structure 이미지 7](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-7.png)
→ \<manifest\>: 메니페스트 파일의 루트 태그
→ xmlns: XML의 네임스페이스 선언

![02-app-structure 이미지 8](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-8.png)
→ \<application\>: 앱 전체 대상 설정 태그
→ icon 속성 : 앱 실행 아이콘 (@으로 시작 : 리소스 의미)
→ theme 속성 : 앱 적용 테마

![02-app-structure 이미지 9](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-9.png)
→ activity 등록시 name은 필수 속성
→ 클래스 이름 앞 점(.): 해당 클래스가 \<manifest\> 태그에 등록한 package에 존재
→ \<intent-filter\>: 해당 부분 생략시 앱은 설치되지만 앱 아이콘이 안나와서 사용자가 직접 실행 불가

+) 참고
<table>
<tr>
<td>**클래스**</td>
<td>**태그**</td>
</tr>
<tr>
<td>액티비티</td>
<td>\<activity\></td>
</tr>
<tr>
<td>서비스</td>
<td>\<service\></td>
</tr>
<tr>
<td>브로드캐스트 리시버</td>
<td>\<receiver\></td>
</tr>
<tr>
<td>콘텐츠 프로바이더</td>
<td>\<provider\></td>
</tr>
</table>
## 리소스 폴더
- 앱의 리소스를 등록하는 목적
- 모듈 생성시 다름 폴더가 기본으로 생성
	<table>
<tr>
<td>**폴더명**</td>
<td>**설명**</td>
</tr>
<tr>
<td>drawable</td>
<td>이미지 리소스</td>
</tr>
<tr>
<td>layout</td>
<td>UI 구성에 필요한 XML 리소스</td>
</tr>
<tr>
<td>mipmap</td>
<td>앱 아이콘 이미지</td>
</tr>
<tr>
<td>Values</td>
<td>문자열 등의 값으로 이용되는 리소스</td>
</tr>
	</table>
- res 폴더 아레에 리소스를 만들면 자동으로 [R.java](http://R.java) 파일에 상수 변수로 리소스 등록
	→ 코드에서는 이 상수 변수로 리소스 이용
	→ 개발자가 만드는 파일 X → 안스에서 안보여줌
- 안드로이드 리소스 파일이 [R.java](http://R.java) 파일에 상수 변수로 등록되어 이용되면서 다음 규칙을 만족해야
	- res 하위의 폴더명은 지정된 폴더명을 사용해야
	- 각 리소스 폴더에 다시 하위 폴더를 정의할 수 없음
	- 리소스 파일명은 자바의 이름 규칙을 위배할 수 없음
	- 리소스 파일명에는 알파벳 대문자를 이용할 수 없음
	
## 레이아웃 XML 파일
- 화면을 구성하는 레이아웃 XML 파일
![02-app-structure 이미지 10](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-10.png)
→ \<TextView\> 태그: 화면에 문자열을 출력하는 역할, 여기서는 “Hello World!”

## 메인 액티비티 파일
- 폰에 앱 설치 후 앱 아이콘을 터치하면 MainActivity.kt 파일이 실행
![02-app-structure 이미지 11](/SeonggukPark/images/notion/notes/android-kotlin/02-app-structure-11.png)
→ MainActivity는 Activity의 하위 클래스인 AppCompatActivity를 상속 받으므로, 액티비티 컴포넌트 클래스임. 즉, 화면 출력을 목적으로 하는 액티비티 클래스
→ 클래스 실행 시 onCreate() 함수 자동 호출
→ enableEdgeToEdge() : Status Bar(상단 배터리 표시가 있는 영역) \~ Navigation Bar(하단 안드로이드 버튼이 있는 영역)까지 액티비티 화면이 나오도록 설정\\
→ setOnApply\~(): 액티비티 출력 내용이 Navigation Bar 등과 겹치지 않도록 하기 위한 설정

