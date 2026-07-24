---
title: "01) 개발 환경 준비하기"
description: "Notion에서 가져온 01) 개발 환경 준비하기 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2ba6b9674ad88056b200d5f88594fbed"
importedAt: 2026-07-24
---

> 이 문서는 Notion MCP 원본에서 직접 가져온 학습 기록입니다.

# (01-1) 안드로이드 스튜디오 설치하기
## Android Studio
- 안드로이드 전용 앱을 개발하는 도구
- 구글이 2013년 처음 발표

[Android Mobile App Developer Tools – Android Developers](http://developer.android.com/) 
→ 위 링크에서 설치
→ 설치 폴더에 실행파일 존재 (studio64.exe or studio.exe)
# (01-2) 첫 번째 앱 만들기
## 프로젝트 생성
- \[New Project\] → 플랫폼 & 템플릿 선택 (이번에는 \[Phone and Table\] → \[Empty Views Activity\])
	- \[Empty Views Activity\] 템플릿 : 뷰를 이용해 프로그램 작성 (안드로이드 초창기 부터 지원)
	- \[Empty Activity\] 템플릿 : 컴포즈를 이용해 프로그램 작성 (Jetpack에서 제공)

![01-development-environment 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-1.png)
- **Package name**
	- 앱의 식별 값 → 안드로이드 앱은 개발자가 작성한 패키지 명으로 식별
	- <span color="red">패키지 명이 같으면 스토어에 등록 못하고 기기에 설치도 못함 → </span><span color="red">**반드시 고유해야**</span>
- **Save location**
	- 프로젝트 파일들이 저장되는 루트 디렉토리
	- 앱 개발 과정에서 추가하는 소스, 이미지 등이 여기 저장
	- <span color="red">C:\\ 에는 쓰기 권한 없을 수 있으므로 C:\\ 아래 디렉터리 하나 만들어서 쓰는걸 권장</span>
- **Language**
	- 개발 언어 설정
	- 안드로이드 스튜디오는 Kotlin, Java 2가지 지원
	- 선택한 언어로 프로젝트 기본 소스파일과 설정이 추가되는 것이라서, Kotlin으로 지정했어도 Java 파일 언제든 추가 가능
- **Minimum SDK**
	- 앱이 설치되는 최소 SDK 버전
	- 해당 버전 이상의 장치에서만 실행됨
	- 이 앱을 실행할 수 있는 기기의 점유율이 나타남 (Google Play 통계 기반)
- **Build configuration language**
	- build.gradle 파일 타입 선택 → 안드로이드 앱은 Gradle 툴에 의해 빌드됨
	- build.gradle: 전통적으로 오래쓰던 파일
	- build.gradle.kts: 코틀린 DSL 형태, 최근 프로젝트에서 많이 사용

![01-development-environment 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-2.png)
→ Logcat: 앱 실행 중일때 발생하는 로그 출력

## Android SDK (Software Development Kit)
- 안드로이드 앱 개발 위한 Toolkit 
- 개발 환경에서 중요한 부분
- \[File  → Settings → Languages & Framework → Android SDK\] 에서 확인 가능
![01-development-environment 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-3.png)

Q. 최신 버전 아닌 SDK 설치할 필요가 있는지?
A. 보통 최신 버전의 SDK로 개발하지만 더 낮은 버전에서 테스트 가능. 즉, 호환성 테스트 위해 설치할 때도 있음

- SDK 필수 도구
![01-development-environment 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-4.png)
<span color="red">→ AMD 하이퍼바이저나 HAXM 설치하려면 CPU 가상화 활성화 해야함 (BIOS 설정)</span>
![01-development-environment 이미지 5](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-5.png)

## 기타 설정
![01-development-environment 이미지 6](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-6.png)
- \[File → Settings → Editor → General → Auto Import → Add unambiguous imports on the fly & Optimize imports on the fly\] 체크 후 apply 
	→ 클래스명만 입력해도 해당 패키지 포함하는 import 구문 자동으로 작성해줌
	
# (01-3) 앱 실행하기
- 앱 테스트는 가상 기기, 실제 스마트폰 이용 가능

## 가상 기기에서 실행
- 안드로이드 가상 기기는 AVD(Android virtual device)라 하며, 흔히 에뮬레이터(Emulator)라 함

![01-development-environment 이미지 7](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-7.png)
![01-development-environment 이미지 8](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-8.png)

### 하드웨어 선택
![01-development-environment 이미지 9](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-9.png)
→ 이번 과정에서는 Pixel 3a로 진행

### 시스템 이미지 선택
![01-development-environment 이미지 10](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-10.png)

### 제스처 네비게이션
![01-development-environment 이미지 11](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-11.png)
→ AVD \[환경설정 → System → Navigation mode\]에서 네비게이션 설정 가능

### 에뮬레이터에서 앱 실행
![01-development-environment 이미지 12](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-12.png)

## 실제 스마트폰에서 실행
- 최종 배포 전이나 에뮬레이터 실행하기 어려운 환경, 성능이 까다로운 앱일 경우 실제 기기에서 테스트 해봐야 함

### 윈도우용 USB 드라이버 설치
- [https://developer.android.com/studio/run/oem-usb?hi=ko&hl=ko](https://developer.android.com/studio/run/oem-usb?hi=ko&hl=ko)

### 스마트폰에 USB 디버깅 허용
- 개발자 모드 켜기: \[설정 → 휴대전화 정보 → 소프트웨어 정보 → 빌드번호 7번 터치\]
- \[설정 → 개발자 옵션 → USB 디버깅 켜기\]

### 앱 실행
![01-development-environment 이미지 13](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-13.png)
![01-development-environment 이미지 14](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-14.png)

# (01-4) 앱 출시하기
## 배포 파일
- 안드로이드 앱의 배포 파일은 APK, AAB가 존재
	- **APK(Android application PacKage)**
		- 안드로이드의 전통적인 배포 파일
		- 컴파일된 코드와 리소스를 묶어서 키로 서명한 것
		- 어떤 기기든 이 APK 하나로 설치할 수 있도록 “모든 것”이 들어가 있음
			→ 필요없는 리소스도 받게 됨
			→ 용량 커짐
	- **AAB(Android App Bundle)**
		- 2018년 구글 IO에서 발표한 새로운 안드로이드 앱 배포 파일
		- Play Store에 올리면 사용자의 기기 환경에 필요한 조각(split apk)만 다운로드
		- 개발자가 직접 apk 파일을 만들지 않음
		
- 안드로이드 스튜디오는 APK, AAB로 앱 빌드 가능

Q. 개발자가 앱 만들때 포함한 파일이 사용자가 내려받는 앱에 모두 담기지 않아도 괜찮나?\\
A. 앱 실행할 때 포함된 모든 파일이 실행되지 않음. 예를 들어 여러기기에서 실행될 수 있도록 이미지 리소스를 크기별로 준비하지만, 기기에서는 1가지 이미지만 이용

## 앱 서명
- 안드로이드 배포 파일 만드려면 키를 만들어서 앱에 서명해야 함
- 서명 키를 개발자가 직접 만들어 관리하는 것과 구글 Play에서 관리하는 걸로 나뉨
- 앱 업데이트 위해서는 이전 버전과 동일한 키로 서명해야 함

### 개발자가 관리
![01-development-environment 이미지 15](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-15.png)
- 개발자가 만든 서명키 1개로 앱 관리
- 개발자가 키를 분실하거나 도용될 때 대처 불가

### 구글 Play에서 관리 (Play App 서명)
![01-development-environment 이미지 16](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-16.png)
- 개발자가 관리하는 **업로드 키**(기존 서명키)와 구글 Play가 만드는 **앱 서명 키**로 나뉨
- 개발자는 업로드 키로 구글 Play에 등록 → 구글 Play는 앱 서명 키로 서명해서 사용자에게 전달
- 개발자가 키 분실하거나 도용되더라도 다시 만들어서 Play Store에 등록하면 됨

## Play Store 게시
- 배포는 Play Store 이용, 통신사 마켓 이용, APK 파일을 사용자에게 직접 전달하는 방법 존재
	→ 대부분 Play Store로 배포
	
### Play Store 배포 준비물
- **AAB 파일**: 완성 앱을 서명한 배포 파일 
- **앱 아이콘 이미지**: Play Store에 표시할 앱 이미지
- **그래픽 이미지**: Play Store에서 앱 프로모션 할 이미지
- **휴대전화 스크린샷**: 스마트폰에서 앱 실행한 스크린 샷
- **7/10인치 태블릿 스크린샷**: 7인치 or 10인치 태블릿에서 앱을 실행한 스크린 샷

- Play Store의 앱 배포 정책은 수시로 바뀜 → 구글 Play 콘솔의 안내사항 잘 보고 진행

### <span color="blue_bg">\[실습\] AAB 배포 파일 만들기 </span>
**\[1\] 고유 패키지명으로 변경**
![01-development-environment 이미지 17](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-17.png)
→ \[Gradle Scripts → build.gradle.kts (Module :app)\]에서 applicationId 부분 수정

![01-development-environment 이미지 18](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-18.png)
<span color="red">**→ 그래들 파일은 수정후 반드시 Sync 해주기**</span>

**\[2\] AAB 파일 생성 **
![01-development-environment 이미지 19](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-19.png)
![01-development-environment 이미지 20](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-20.png)


**\[3\] 키 저장소, 서명 키(업로드 키) 만들기**
- 키 저장소(Key Store): 일종의 인증서
![01-development-environment 이미지 21](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-21.png)
→ 이전에 만든 저장소 있다면 \[Choose existing..\], 새로 만드려면 \[Create new..\]

![01-development-environment 이미지 22](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-22.png)

**\[4\] 앱 서명**
![01-development-environment 이미지 23](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-23.png)

**\[5\] 릴리즈용 빌드**
![01-development-environment 이미지 24](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-24.png)

**\[6\] 빌드된 AAB 파일 확인**
![01-development-environment 이미지 25](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-25.png)
→ 프로젝트 루트 디렉토리에 “app\\release\\app-release.aab” 파일 생성


### <span color="blue_bg">\[실습\] 구글 Play에 앱 등록</span>
**\[1\] 개발자 계정으로 등록**
- 자신의 구글 계정을 개발자 계정으로 등록해야함 → <span color="red">최초 1회 25달러 결제 필요</span>
- [https://play.google.com/console/about/](https://play.google.com/console/about/) → \[Play Console로 이동\]

![01-development-environment 이미지 26](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-26.png)
![01-development-environment 이미지 27](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-27.png)
![01-development-environment 이미지 28](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-28.png)

**\[2\] Play 콘솔에서 앱 만들기**
![01-development-environment 이미지 29](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-29.png)
![01-development-environment 이미지 30](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-30.png)

**\[3\] Play 콘솔에서 앱 설정**
![01-development-environment 이미지 31](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-31.png)
→ 대시보드에서 \[할 일 보기\] → 요구하는 정보 기입

**\[4\] 테스트 및 새 버전 만들기**
- 앱 출시 위해 새 버전 만들기 위해서는 앱의 테스트 방법 먼저 지정해야 함

![01-development-environment 이미지 32](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-32.png)
→ 내부용 테스트 버전 만들어 최대 10명의 테스터에게 앱을 빠르게 배포하여 테스트하는 방법

![01-development-environment 이미지 33](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-33.png)
→ 내부 테스터 보다 더 광범위한 테스터를 대상으로 앱 테스트

![01-development-environment 이미지 34](/SeonggukPark/images/notion/notes/android-kotlin/01-development-environment-34.png)
→ 이후 \[새 버전 만들기\] 해서 세부 정보 입력

