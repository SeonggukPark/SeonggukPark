---
title: "모던 리눅스 7. 네트워킹"
description: "Notion MCP에서 직접 가져온 모던 리눅스 7. 네트워킹 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Linux", "System Software"]
draft: true
source: "https://app.notion.com/p/33a6b9674ad880e782b8c7622082cff4"
importedAt: 2026-07-24
---

> 이 문서는 ZIP export가 아닌 Notion MCP 원본에서 직접 가져온 초안입니다.

# (1) 기본 개요
- 네트워크에는 변화하는 분야, 계층이 많아 문제 발생 시 HW/SW 문제 파악 힘듦
- 추상화
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-1.png)

# (2) TCP/IP 스택
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-2.png)
## 링크 계층
- 바이트, 유선, 전자기파, 디바이스 드라이버, 네트워크 인터페이스 같은 HW와 밀접한 항목
### ethernet
- 유선을 통해 기기를 연결하는 네트워크 기술
- 근거리 통신망(LAN)에서 자주 사용
### 무선(wireless)
- 유선을 사용하지 않고 전자기파를 사용해 데이터 전송
### MAC 주소
- MAC: 각 하드웨어 마다 고유한 48비트 식별자
- 각 기기 식별하는 데 사용
- 일반적으로 첫 24비트를 조직 고유 식별자(OUI)로 사용해 제조업체 정보 인코딩
### 인터페이스
- 네트워크 연결
- 물리적 or 가상 인터페이스도 가능
### 네트워크 인터페이스 컨트롤러(NIC)
- 유선 표준, 무선 표준 중 하나를 통해 네트워크에 물리적 연결 제공
- 수신하는 모든 물리적 신호를 sw가 처리할 수 있는 비트, 바이트로 변환
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-3.png)
### 주소 결정 프로토콜(ARP)
- MAC-IP 매핑
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-4.png)

## 인터넷 계층
- 최선의 전달을 제공, 모든 패킷을 독립적으로 취급
- 패킷의 순서, 재시도, 배달 보장 같은 신뢰성 문제는 상위 계층(e.g. 전송 계층)에서 처리함
- 이 계층에서 기기 고유 식별을 위해 IP 프로토콜 사용
### IPv4
- TCP/IP 통신에서 엔드포인트 역할을 하는 호스트, 프로세스를 고유하게 식별하는 32bit 숫자 정의
- 마침표로 구분된 4개의 8비트 조각으로 분할
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-5.png)
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-6.png)
→ 모든 인터페이스의 주소 나열
#### CIDR
- IP 주소 범위를 표한하는 방식
- e.g.) 192.168.0.10/24 → 앞의 24비트는 네트워크 주소, 뒤의 8비트는 호스트 주소
### IPv6
- TCP/IP 통신에서 엔드포인트 식별용으로 쓰이는 128비트 숫자
- 개별 기기를 10\^38개까지 할당 가능
- 16비트로 구성된 8개 그룹을 콜론으로 구분하는 16진수 표현식 사용
- IPv4와 호환 불가능 →  모든 네트워크 참여 디바이스가 IPv6를 지원해야 함=
### 인터넷 제어 메세지 프로토콜
- IP 통신 중 발생하는 오류나 상태를 알려주는 인터넷 계층 프로토콜
- ping, gping 등
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-7.png)
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-8.png)
### 라우팅
- IP 패킷을 목적지까지 보내기 위해 “어느 경로로 내보낼지 결정하는 과정
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-9.png)
→ 라우팅 테이블 : 리눅스가 목적지 IP별로 패킷을 어디로 보낼지 정해둔 표
→ 첫 줄 : 목적지가 어디인지 특별히 정해진 경로가 없으면 `192.168.149.2 `게이트웨이로 보내라.
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-10.png)
→ 더 현대적인 방식으로 라우팅 테이블 조회

## 전송 계층
- 본 계층은 전부; 엔드포인트 간의 통신 특성에 관한 것
### 포트
- IP 주소에서 사용 가능한 서비스를 식별하는 고유한 16비트 숫자
- 0 \~ 1023번 : SSH 서버나 웹 서버 같은 데몬용, 이들 중 하나를 사용하려면 높은 권한 필요
- 1024 \~ 49151번 : 인터넷 할당 번호 관리기관이 공개적으로 문서화된 프로세스를 통해 관리
- 49152\~65535번 : 등록할 수 없는 포트, 한시적 포트를 자동 할당하는데 쓰거나 개인 서비스에서 활용
- /etc/services에서 포트와 매핑 볼 수 있음
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-11.png)
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-12.png)
→ 로컬 머신의 포트 스캔하여, 열린 포트 22, 631 발견

### 전송 제어 프로토콜(TCP)
- HTTP, SSH를 포함한 여러 고수준 프로토콜에서 사용되는 연결 지향 전송 계층 프로토콜
- 패킷 순서 보장, 오류 발생 시 재전송 지원하는 세션 기반 프로토콜
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-13.png)
- 보안 관점에서 TCP는 방어 메커니즘이 없음 → 메세지 암호화 활성화 위해 TLS 프로토콜 사용

### 사용자 데이터그램 프로토콜(UDP)
- 통신 설정(e.g. TCP의 핸드셰이크) 없이 데이터그램이라 부르는 메세지를 보내는 비연결형 전송 계층 프로토콜
- 무결성 보장 위해 데이터그램 체크섬 지원
- NTP, DHCP, DNS 등의 애플리케이션 수준 프로토콜에서 활용
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-14.png)
- 오버헤드가 거의 없고 높은 처리량 달성 가능

## 소켓
- 리눅스에서 제공하는 고수준의 통신 인터페이스
- TCP나 UDP 포트와 IP 주소로 구성된 튜플이라는 고유한 ID를 가진 통신의 엔드포인트
- 네트워크 관련 프로그램 개발이 아닐지라도, 최소 쿼리하는 법은 알아야 함
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-15.png)
→ 포트 쿼리, 총 5개의 소켓 사용 중

# (3) DNS
- 사람이 읽기 쉬운 도메인 이름을 IP 주소로 바꿔주는 시스템
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-16.png)
→ 리졸버: 클라이언트 요청에 대한 응답으로 네임 서버에서 정보를 추출하는 프로그램
### DNS 이름 계층
- 루트 : DNS 계층의 최상위, e.g.) .
- 루트 바로 아래에 최상위 도메인(TLD) 존재
<table>
<colgroup>
<col>
<col>
<col>
<col>
</colgroup>
<tr>
<td>구분</td>
<td>이름</td>
<td>예시</td>
<td>의미</td>
</tr>
<tr>
<td>gTLD</td>
<td>generic TLD</td>
<td>`.com`, `.net`, `.org`</td>
<td>일반 최상위 도메인</td>
</tr>
<tr>
<td>ccTLD</td>
<td>country code TLD</td>
<td>`.kr`, `.jp`, `.us`, `.uk`</td>
<td>국가 코드 최상위 도메인</td>
</tr>
<tr>
<td>sTLD</td>
<td>sponsored TLD</td>
<td>`.edu`, `.gov`, `.mil`, `.museum`</td>
<td>특정 기관/분야가 관리</td>
</tr>
<tr>
<td>infrastructure TLD</td>
<td>인프라용 TLD</td>
<td>`.arpa`</td>
<td>인터넷 인프라 전용</td>
</tr>
</table>
## DNS 레코드
-  DNS 서버가 가지고 있는 **도메인 관련 정보**
<table>
<tr>
<td>레코드</td>
<td>의미</td>
<td>예시</td>
</tr>
<tr>
<td>`A`</td>
<td>도메인을 IPv4 주소로 매핑</td>
<td>`example.com → 93.184.216.34`</td>
</tr>
<tr>
<td>`AAAA`</td>
<td>도메인을 IPv6 주소로 매핑</td>
<td>`example.com → 2606:...`</td>
</tr>
<tr>
<td>`CNAME`</td>
<td>다른 도메인의 별칭</td>
<td>`www.example.com → example.com`</td>
</tr>
<tr>
<td>`MX`</td>
<td>메일 서버 지정</td>
<td>`example.com → mail.example.com`</td>
</tr>
<tr>
<td>`NS`</td>
<td>해당 도메인의 네임 서버 지정</td>
<td>`example.com → ns1.example.com`</td>
</tr>
<tr>
<td>`TXT`</td>
<td>텍스트 정보 저장</td>
<td>SPF, DKIM, 인증값</td>
</tr>
<tr>
<td>`SOA`</td>
<td>zone의 기본 관리 정보</td>
<td>관리자, serial, 갱신 주기</td>
</tr>
<tr>
<td>`PTR`</td>
<td>IP 주소를 도메인으로 역조회</td>
<td>`1.2.3.4 → host.example.com`</td>
</tr>
<tr>
<td>`SRV`</td>
<td>특정 서비스의 위치 지정</td>
<td>`_sip._tcp.example.com`</td>
</tr>
<tr>
<td>`CAA`</td>
<td>인증서 발급 가능한 CA 제한</td>
<td>`letsencrypt.org` 허용</td>
</tr>
</table>
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-17.png)
→ demo를 만들 때 Zone에 대한 DNS 설정만 변경하면 됨 → 탈 중앙화 특성
<details>
<summary>예제 (www.example.com을 찾는다면?)</summary>
1. Root 서버
→ .com은 저 TLD 서버에게 물어봐
2. .com TLD 서버
→ example.com은 저 네임 서버에게 물어봐
3. example.com 네임 서버
→ www.example.com의 IP는 93.184.216.34
</details>
## DNS 조회
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-18.png)
→ 1. [localhost](http://localhost) 조회
→ 2. naver.com에 대한 정방향 DNS 조회
→ 3. [naver.com](http://naver.com) IP에 대한 역방향 DNS 조회 (네이버의 역뱡향 DNS PTR 레코드 조회 불가)

![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-19.png)
→ dig 명령어로 더 강력하게 조회 가능

# (4) 애플리케이션 계층 네트워킹
## 웹
- 오늘날 웹은 동적 클라이언트 콘텐츠를 위한 자바스크립트, 스타일링 위한 CSS가 추가되며 단일 페이지 웹 앱이 탄생
### URL
- 웹에서 리소스의 ID와 위치 양쪽을 정의
- 리소스는 정적 페이지일 수도, 콘텐츠를 동적으로 생성하는 프로세스일 수도
### HTTP
- URL을 통해 사용 가능한 콘텐츠, 상호 작용하는 법 정의
- HTTP 메소드: 읽기 작업을 위한 GET, 쓰기 작업을 위한 POST를 포함해 CRUD와 유사한 인터페이스 정의
- 리소스 네이밍: URL을 어떻게 구성해야 하는지 지시
- HTTP 상태 코드 : 성공한 경우 2XX, 재지정의 경우 3XX, 클라이언트 오류의 경우 4XX, 서버 오류의 경우 5XX 사용
### HTML
- 헤더, 입력 같은 페이지 요소 정의 가능

## 시큐어 셸(SSH)
- 보안이 취약한 네트워크에서 서비스를 안젆라게 제공하기 위한 암호화 네트워크 프로토콜

## 파일 전송
- 원격 시스템 간의 복사를 위해 기본 도구인 scp(secure copy)를 SSH 위에서 사용 가능
- FTP는 안전하지도 않고 더 나은 대안도 많으므로 사용하지 말 것

## 네트워크 파일시스템(NTP)
- 네트워크를 통해 다른 컴퓨터의 디렉터리를 내 컴퓨터의 로컬 디렉터리처럼 마운트해서 사용하는 파일 시스템
- AWS, Azure 등 많은 클라우드 공급사들이 NFS를 서비스로 제공 → 클라이언트 설치만 하면 됨

## 윈도우와의 공유
- SMB, CIFS, Samba 사용

# (5) 고급 네트워크
## whois
- 도메인이나 IP 주소의 등록 정보를 조회하는 도구
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-20.png)
→ 도메인 등록 정보 조회

## 동적 호스트 구성 프로토콜(DHCP)
- 네트워크에 접속한 장비에게 IP 설정을 자동으로 할당해주는 프로토콜→
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-21.png)
→ `dhcpdump`를 통해 DHCP 패킷 스캔 가능

## 네트워크 타임 프로토콜(NTP)
- 네트워크를 통해 컴퓨터의 시간을 동기화 하기 위한 것
- 일반적으로 백그라운드에서 동작, systemd와 기타 데몬에 의해 자동으로 관리 됨
![모던 리눅스 7. 네트워킹 이미지](/SeonggukPark/images/notion/notes/modern-linux/07-networking-22.png)
→ 표준 NTP 쿼리 프로그램인 ntpq 명령을 통해 명시적 타임 서버 쿼리 전송

## wireshark와 tshark
- 저수준의 네트워크 트래픽 분석, 즉 스택 전체의 패킷을 정확히 볼 때는 tshark(CLI) or wireshark(tshark의 GUI 버전) 사용

## 그 밖의 고급 도구
- socat: 2개의 양방향 바이트 스트림 설정, 엔드포인트 간에 데이터 전송이 가능케 함
- geoiplookup: IP를 지리적 영역에 매핑 가능
- 터널: VPN과 기타 사이트 간 네트워킹 솔루션의 대안, inlets 같은 도구로 활성화
- 비트토렌트: 파일을 토렌트라는 패키지로 그룹화하는 P2P 시스템

