---
title: "10) 다이얼로그와 알림 이용하기"
description: "Notion에서 가져온 10) 다이얼로그와 알림 이용하기 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Android", "Kotlin"]
draft: true
source: "https://app.notion.com/p/2fe6b9674ad8804ab187d8b0bb5ab2bd"
importedAt: 2026-07-24
---

> 이 문서는 Notion MCP 원본에서 직접 가져온 학습 기록입니다.

# <span color="gray_bg">(1) API 레벨 호환성 고려하기</span>
- 앱 개발시 minSDK 설정값보다 상위 버전에서 제공하는 API를 사용한다면 호환성을 고려해야 함

![10-dialogs-notifications 이미지 1](/SeonggukPark/images/notion/notes/android-kotlin/10-dialogs-notifications-1.png)
![10-dialogs-notifications 이미지 2](/SeonggukPark/images/notion/notes/android-kotlin/10-dialogs-notifications-2.png)
→ 예를 들어 `Notification` 클래스는 API 레벨 1에 추가되었지만, `Notification.CallStyle` 클래스는 31 버전에서 추가됨 → 31 버전 하위 기기에서 오류가 발생

- API 레벨 호환성에 문제가 있는 API를 사용한 함수, 클래스 선언부 위에 `@RequiresApi` 나 `@TargetApi` annotation 추가하면 안드로이드 스튜디오에서 오류 발생 X
	→ 단순히 스튜디오에서 오류 무시하는 설정이라 코드에서 직접 처리해줘야 해결 가능
# <span color="gray_bg">(2) 퍼미션 설정하기</span>
- permission : 앱 특정 기능에 부여하는 접근 권한
- 내가 개발하는 앱이 다른 앱이나 안드로이드 시스템에서 보호하는 특정 기능 사용 시 퍼미션 사용을 설정해야 함
- 또는 내가 만든 기능을 다른 앱애서 사용할 수 없도록 보호하고 권한 얻은 앱애서만 허용 원할 시 설정

## 퍼미션 설정 & 사용 설정
![10-dialogs-notifications 이미지 3](/SeonggukPark/images/notion/notes/android-kotlin/10-dialogs-notifications-3.png)
→ `<permission>` : 기능을 보호하려는 앱의 매니페스트 파일에 설정
```kotlin
<permission
    android:name="com.example.myapp.permission.MY_PERMISSION"
    android:label="Test Permission"
    android:description="@string/permission_desc"
    android:protectionLevel="dangerous"/>
```
→ name: 퍼미션의 이름, 퍼미션을 구별하는 식별자 역할
→ label, description: 퍼미션 설명
→ protectionLevel = 보호 수준
	- normal: 낮은 수준의 보호, 사용자에게 권한 허용 요청 필요 X
	- dangerous: 높은 수준의 보호, 사용자에게 권한 허용 요쳥 필요
	- signature: 같은 키로 인증한 앱만 실행
	- signatureOrSystem: 안드로이드 시스템 앱이거나 같은 키로 인증한 앱만 실행
→`<uses-permission>` : 퍼미션으로 보호된 기능을 사용하려는 앱의 매니페스트 파일에 설정
```kotlin
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
```

- `<permission>` 을 설정한 다음 보호하려는 컴포넌트에 적용해야 함
	- `android:permission` 속성 이용
	```kotlin
<activity
    android:name=".OneAcitivity"
    android:permission="com.example.TEST_PERMISSION">
    <intent-filter>
        <action android:name="android.intent.action.PICK"/>
    </intent-filter>
</activity>
	```

## 퍼미션 허용 확인
- 퍼미션은 API 레벨 23 버전부터 정책 변경
	- 23 이전에는 `<uses-permission>`  으로 선언만 하면 보호받는 기능을 앱애서 이용 가능 (신고제)
	- 23 이후에는 사용자가 권한 화면에서 거부 가능 (허가제)
- 사용자가 앱을 처음 설치하면 퍼미션은 기본으로 모두 거부 상태

- `checkSelfPermission()` : 앱이 특정 permission을 이미 가지고 있는지 확인하는 함수
	- 리턴값 
		- `PackageManager.PERMISSION_GRANTED` : 권한 허용한 경우
		- `PackageManager.PERMISSION_DENIED` : 권한 거부한 경우
	```kotlin
val status = ContextCompat.checkSelfPermission(
        this,
        Manifest.permission.CAMERA)
        
if (status  == PackageManager.PERMISSION_GRANTED) {
    // 퍼미션 허용됨
} else {
    // 퍼미션 허용 안됨
}
	```
	→ 카메라 permission 확인 함수
	
### ActivityResultLauncher 객체
- 다른 Activity 실행 후 결과를 안전하게 받아오기 위한 API 객체
- 퍼미션 허용 요청할 때 사용
- `registerForActivityResult()` 함수 호출해서 생성
	```kotlin
val requestPermissionLauncher = registerForActivityResult(
    ActivityResultContracts.RequestPermission()
) { isGranted ->

    if (isGranted) {
        Log.d("kkang", "callback, granted..")
    } else {
        Log.d("kkang", "callback, denied..")
    }
}
	```
	→ 퍼미션 요청 결과를 받아 처리하는 객체를 미리 등록
	
	```kotlin
requestPermissionLauncher.launch(Manifest.permission.CAMERA)
	```
	→ 요청 실행
	→ 결과는 `registerForActivityResult()` 함수의 두 번째 파라미터로 등록한 콜백으로 전달
	
# <span color="gray_bg">(3) 다양한 다이얼로그</span>
- 다이얼로그: 사용자와 상호 작용하는 대화상자
## 토스트 메세지
- 화면 아래쪽에 잠깐 보였다가 사라지는 문자열
- 사용자에게 간단한 메세지로 특정 상황 알릴 때 사용
- `Toast`의 `makeText()` 함수로 만듬
	```kotlin
Toast.makeText(this, text, Toast.LENGTH_SHORT).show()
	```
	→ `this`: 현재 context
	→ `text`: 표시할 메세지
	→ `Toast.LENGTH_SHORT`: 화면에 표시되는 시간 (
	→ `show()`: 실제 출력 실행
	
- `makeText` 함수 말고 세터함수로도 만들수 있음
	```kotlin
val toast = Toast(this)
toast.setText("저장되었습니다")
toast.duration = Toast.LENGTH_SHORT
toast.setGravity(Gravity.CENTER, 0, 0)
toast.show()
	```
	→ 위치 변경, 커스텀 view 사용 등 상황에서 유용

- 토스트가 화면에 보이거나 사라지는 순간을 콜백으로 감지해 특정 로직 수행하게도 가능 (API 레벨 30부터)
	```kotlin
val toast = Toast.makeText(this, "저장되었습니다", Toast.LENGTH_SHORT)

toast.addCallback(object : Toast.Callback() {

    override fun onToastShown() {
        super.onToastShown()
        // 토스트가 화면에 나타났을 때 실행
    }

    override fun onToastHidden() {
        super.onToastHidden()
        // 토스트가 사라졌을 때 실행
    }
})

toast.show()
	```

## 날짜 or 시간 입력 받기
- Picker 다이얼로그: 사용자가 날짜·시간·숫자 등 특정 값을 선택하도록 하는 선택형 팝업 UI
	![10-dialogs-notifications 이미지 4](/SeonggukPark/images/notion/notes/android-kotlin/10-dialogs-notifications-4.png)
	- DatePickerDialog (날짜 선택)
		```kotlin
val listener = DatePickerDialog.OnDateSetListener { _, year, month, dayOfMonth ->
    binding.textView.text = "${year}년 ${month + 1}월 ${dayOfMonth}일"
}

val dialog = DatePickerDialog(
    this,
    listener,
    2026,
    2,
    30
)

dialog.show()
		```
		→ Android 날짜 관련 API에서는 월이 보통 0부터 시작 (0 → 1월, 1 → 2월, ..)
		→ 화면에 표시할 때는 month + 1을 해줌
		
	- TimePickerDialog (시간 선택)
		```kotlin
val listener = TimePickerDialog.OnTimeSetListener { _, hourOfDay, minute ->
    binding.textView.text = "${hourOfDay}시 ${minute}분"
}

val dialog = TimePickerDialog(
    this,
    listener,
    14,
    30,
    true
)

dialog.show()
		```
		→ 처음에 14시 30분이 선택된 상태로 다이얼로그를 띄움
		
## 알림 창 띄우기
	- 안드로이드 다이얼로그의 기본은 AlertDialog(알림 창)
	- 단순히 메세지를 출력하거나 다양한 화면 출력 가능
	- Datepicker, Timepicker도 AlertDialog의 하위 클래스
	- 크게 제목, 내용, 버튼 영역으로 나뉨
		- 설정 한 내용의 영역만 나타남
	- 알림창 생성자는 protected로 선언
		→ 객체 직접 생성 X
		→ 대신 AlertDialog.Builder를 제공하므로 이걸 이용해서 만듦
		→ AlertDialog.Builder를 생성하고 빌더의 세터 함수로 알림 창의 정보를 지정
	```kotlin
AlertDialog.Builder(this).run {
    setTitle("알림")
    setMessage("정말 삭제하시겠습니까?")
    setPositiveButton("확인", null)
    show()
}
	```
	→ 버튼 함수는 setPositiveButton(), setNegativeButton(), setNeutralButton()로 구분
		→ 의미 구분: 실행 / 취소 / 보류 역할 분리
		→ 위치 자동 결정: 플랫폼 UX 규칙 적용
		→ 접근성 지원: 버튼 역할 전달
		→ 코드 가독성: 함수 이름만 봐도 의도 파악 가능
		→ Android UI 표준 유지: 앱 전체 일관성 확보

	- 알림 창 내용 영역은 setItems(), setMultiChoiceItems(), setSingleChoiceItems() 등 함수 이용해서 만들 수 있다

# <span color="gray_bg">(4) 소리와 진동 알림</span>
## 소리 알림
### 안드로이드 시스템
- RingtonManager로 얻을 수 있다
```kotlin
val uri = RingtoneManager.getDefaultUri(
    RingtoneManager.TYPE_NOTIFICATION
)

val ringtone = RingtoneManager.getRingtone(this, uri)

ringtone.play()
```
→ getDefaultUri 함수로 소리 식별값 얻기
→ getRingtone 함수의 두번째 파라미터로 uri 객체를 전달해서 소리를 재생하는 ringtone 객체 얻기
→ Ringtone 객체의 play 함수 호출해서 소리 재생

### 자체 음원
- res/raw 디렉토리가 음원 리소스 디렉토리
- MediaPlayer 클래스로 음원 재생
```kotlin
val mediaPlayer = MediaPlayer.create(this, R.raw.sound)
mediaPlayer.start()
```

## 진동 알림
- 매니페스트 파일에 \<uses-permission\>으로 퍼미션을 얻어야 함
- Vibrator 클래스 이용
- Vibrator 객체를 얻는 방법이 API 레벨 31부터 변경
	- 31 이전: VIBRATOR_SERVICE로 식별되는 시스템 서비스 이용
	- 31 이후: VIBRATOR_MANAGER_SERVICE로 식별되는 VibratorManger 시스템 서비스를 얻고 이 서비스에서 Vibrator 이용
	```kotlin
val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
    val vibratorManager =
        this.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager

    vibratorManager.defaultVibrator
} else {
    getSystemService(VIBRATOR_SERVICE) as Vibrator
}
	```

### 시간, 패턴 지정해 진동 울리기
- API 레벨 1부터 제공된 진동 알림 함수가 26 버전에서 deprecated
```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    vibrator.vibrate(
        VibrationEffect.createOneShot(
            500,
            VibrationEffect.DEFAULT_AMPLITUDE
        )
    )
} else {
    vibrator.vibrate(500)
}
```
→ 기본 세기로 0.5초 진동

```kotlin
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    vibrator.vibrate(
        VibrationEffect.createWaveform(
            longArrayOf(500, 1000, 500, 2000),
            intArrayOf(0, 50, 0, 200),
            -1
        )
    )
} else {
    vibrator.vibrate(longArrayOf(500, 1000, 500, 2000), -1)
}
```
→ API 26 이상에서는 진동 강도까지 제어 (대기 0.5초 - 약한 진동 1초 - 대기 0.5초 - 강한 진동 2초)
→ API 26 미만에서는 시간 패턴만 제어 (대기 0.5초 - 진동 1초 - 대기 0.5초 - 진동 2초)

# <span color="gray_bg">(5) 알림 띄우기</span>
# <span color="gray_bg">(6) 카카오톡 알림 만들기</span>

