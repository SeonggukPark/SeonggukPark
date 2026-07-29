---
title: "모던 리눅스 5. 파일시스템"
description: "드라이브·파티션·볼륨, 아이노드와 링크 등 파일시스템 구조를 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Linux", "System Software"]
draft: true
source: "https://app.notion.com/p/33a6b9674ad880c68aadfcd387118a3b"
importedAt: 2026-07-24
---

# (1) 기본 개요
- 일부 예외를 제외하면 오늘날 대부분의 파일시스템은 계층 구조
- 보통 root(/)로 시작하는 단일 파일시스템 트리
- 파일 시스템 트리 → 디렉터리 / 파일이라는 두 유형의 객체 존재
- 디렉터리 : 파일을 그룹화할 수 있는 조직의 단위
- 디렉터리는 트리의 노드, 파일/디렉터리는 리프
- 소유권 → 할당된 권한을 통해 파일 / 디렉터리에 대한 접근 제어
- 일반적으로 파일 시스템은 커널에서 구현됨
### 드라이브
- HDD, SDD 같은 블록 디바이스
- 가상 머신의 경우, 에뮬레이션 가능
- 에뮬레이션: 호스트 PC의 실제 드라이브를 보여주지 않고 하이퍼바이저가 “가짜 디스크 장치”를 만들어서 게스트 OS에게 보여주는 것
- e.g.) /dev/sda, /dev/sdb, /dev/hda
### 파티션
- 드라이브를 스토리지 섹터의 집합으로 논리적 분할 한것
- e.g.) HDD에 두 개의 파티션 생성 → /dev/sdb1, /dev/sdb2로 표시
### 볼륨
- 파티션과 유사하지만 더 유연, 특정 파일 시스템용으로 포맷도 가능
### 슈퍼 블록
- 시스템 포맷시 파일시스템 시작 부분에 생성되어 파일시스템의 메타데이터를 캡쳐하는 영역
### 아이노드
- 파일 하나의 메타데이터를 저장하는 구조체
- 파일명, 실제 데이터는 저장 X

## 링크
- 파일에 접근할 수 있는 또 다른 이름 또는 경로를 만드는 기능
### 하드 링크
- 기존 파일과 **같은 inode를 가리키는 또 다른 파일 이름**을 만드는 방식
- 정확히는 inode를 참조, 디렉터리는 참조 못함
- 파일시스템이 서로 다르면 동작 X
- `ln 원본파일 링크파일`
### 심볼링 링크(symlink)
- 원본 파일의 **경로를 가리키는 바로가기 파일**
- `ln -s 원본파일 링크파일`

## 실습
<table>
<tr>
<td>명령</td>
<td>보는 대상</td>
<td>핵심 목적</td>
</tr>
<tr>
<td>`lsblk`</td>
<td>블록 장치</td>
<td>디스크/파티션 구조 확인</td>
</tr>
<tr>
<td>`fdisk -l`</td>
<td>파티션 테이블</td>
<td>파티션 시작/끝/타입 확인</td>
</tr>
<tr>
<td>`parted -l`</td>
<td>파티션 테이블</td>
<td>GPT/대용량 디스크 정보 확인</td>
</tr>
<tr>
<td>`blkid`</td>
<td>파일시스템 식별 정보</td>
<td>UUID, TYPE 확인</td>
</tr>
<tr>
<td>`hwinfo --disk`</td>
<td>하드웨어 정보</td>
<td>디스크 모델/장치 상세 확인</td>
</tr>
<tr>
<td>`file -s`</td>
<td>장치 내부 시그니처</td>
<td>파일시스템 타입 직접 추정</td>
</tr>
<tr>
<td>`stat`</td>
<td>파일 1개</td>
<td>inode 기반 메타데이터 확인</td>
</tr>
<tr>
<td>`df -i`</td>
<td>파일시스템 전체</td>
<td>inode 사용량 확인</td>
</tr>
<tr>
<td>`ls -i`</td>
<td>디렉터리 내 파일</td>
<td>파일별 inode 번호 확인</td>
</tr>
</table>

![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-1.png)
- `lsblk --exclude 7` : 의사(loop) 디바이스 제외한 모든 블록 디바이스 나열
![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-2.png)
- 즉, 40GB 디스크 하나(sda)안에 파티션 3개 존재

![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-3.png)
- `findmnt -D -t nosquashfs` : 현재 마운트 되어 실제 사용 중인 파일시스템 목록
→ `-D` : df처럼 용량 정보까지 표시
→ `-t` : squashfs 타입은 제외
![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-4.png)
- `/dev/sda3 ext4 /` 가 가장 중요
→ /dev/sda3 파티션에 ext4 파일시스템 존재
→ 그 파일시스템이 루트 디렉터리 / 에 마운트 됨
→ 전체 38.6GB 중 11.3GB 사용 중<br>
# (2) 가상 파일시스템(VFS)
- 여러 파일시스템을 하나의 공통 인터페이스로 다루게 해주는 커널의 추상화 계층
### 리눅스 VFS 개요
![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-5.png)
- 로컬 파일시스템
- 드라이버를 사용하여 HDD, SSD 같은 로컬 블록 디바이스에 접근
- e.g.) ext3, XFS, FAT, NTFS
- 인메모리 파일시스템
- 디스크가 아니라 메모리를 기반으로 동작하는 파일시스템
- 의사파일 시스템
- 커널 내부 정보나 시스템 상태를 파일처럼 보여주는 파일시스템
- 네트워트 파일시스템
- 네트워크 너머의 원격 저장장치를 파일처럼 사용하는 방식
### VFS 데이터 구조
- inode
- 핵심 파일시스템 객체, 캡쳐 유형, 소유권, 권한, 링크, 파일 데이터를 포함하는 블록에 대한 포인터, 생성 및 접근 통계 등
- file
- 열려 있는 파일을 나타냄 (path, 현재 위치 & inode 포함)
- dentry(디렉터리 항목)
- 부모 와 자식 연결
- super_block
- 마운트 정보를 포함한 파일시스템
- 그 외의 vfsmount, file_system_type 등
## 논리 볼륨 관리자 (LVM)
- 일반 파티션 방식은 한 번 크기를 정하면 나중에 변경하기 번거로움
→ 파티션 재조정 or 디스크 다시 구성
- LVM을 쓰면 여러 디스크나 파티션을 하나의 저장 공간처럼 묶고, 그 안에서 필요한 만큼 논리 볼륨을 나눠쓸 수 있음
### LVM 구조
![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-6.png)
- PV: Physical Volume
- LVM이 사용할 수 있게 등록한 실제 디스크나 파티션
- 관리도구:  lvmdiskscan, pvdisplay, pvcreate 등
- VG: Volume Group
- PV, LV 사이의 중개자
- 여러 PV를 묶은 공간 pool
- 관리도구: vgs, vgdisplay, vgcreate 등
- LV: Logical Volume
- VG에서 필요한 만큼 잘라 만든 논리적인 볼륨
- 관리도구 : lvs, lvscan, lvcreate
## 파일시스템 작업
### \[1\] 파일시스템 생성
- 파티션, 볼륨을 입력 받아 파일시스템 구성을 위한 관리적 부분 설정 
### \[2\] 파일시스템 마운트
- 마운트: 파일시스템 트리에 연결한다는 의미
- mount 명령으로 파일시스템 연결
## 범용 파일시스템 레이아웃
- 파일시스템이 디스크나 파티션 안에서의 데이터 구성
# (3) 의사 파일시스템
- 커널 정보/프로세스 정보/장치 정보 등을 파일처럼 보여주는 가짜 파일시스템
## procfs
- 유닉스로부터 물려 받은 파일 시스템
![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-7.png)
→ 현재 실행 중인 프로세스의 상태 정보를 `/proc` 에서 읽어 앞의 10줄만 출력
![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-8.png)
→ 현재 프로세스가 속한 네트워크 네임스페이스의 ARP 캐시를 보여주는 것
## sysfs
- 커널이 인식한 장치, 드라이버, 버스 정보를 계층 구조로 보여주는 의사 파일시스템
![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-9.png)
→ sysfs에서 sda 블록 장치의 커널 정보를 확인한 것
## devfs
- `/dev` 디렉터리의 장치 파일을 자동으로 생성·관리하기 위해 사용하던 장치 파일
- 현대 리눅스에서는 사용 X
- 대신 다음 구조 사용
```kotlin
/dev
→ devtmpfs + udev
```
![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-10.png)
→ “something”이라는 문자열을 /dev/tty 장치 파일로 직접 작성

# (4) 일반 파일
- 오피스 문서, YAML, JSON 구성 파일, 이미지 등
## 범용 파일시스템
- HDD, SSD 같은 저장장치에 일반 파일과 디렉터리를 저장하기 위한 기본적인 파일시스템
### 예시
<table>
<colgroup>
<col>
<col>
</colgroup>
<tr>
<td>파일시스템</td>
<td>설명</td>
</tr>
<tr>
<td>`ext4`</td>
<td>리눅스에서 가장 흔한 범용 파일시스템</td>
</tr>
<tr>
<td>`xfs`</td>
<td>대용량 파일, 서버 환경에서 많이 사용</td>
</tr>
<tr>
<td>`btrfs`</td>
<td>스냅샷, 압축, CoW 기능 지원</td>
</tr>
<tr>
<td>`f2fs`</td>
<td>플래시 저장장치에 최적화된 파일시스템</td>
</tr>
<tr>
<td>`ntfs`</td>
<td>Windows 기본 파일시스템, 리눅스에서도 접근 가능</td>
</tr>
<tr>
<td>`exfat`</td>
<td>USB, 외장 저장장치에서 자주 사용</td>
</tr>
</table>
## 인메모리 파일시스템
- 디스크가 아니라 RAM을 기반으로 동작하는 파일시스템
### 예시
<table>
<colgroup>
<col>
<col>
</colgroup>
<tr>
<td>파일시스템</td>
<td>설명</td>
</tr>
<tr>
<td>`tmpfs`</td>
<td>메모리 기반 임시 파일시스템</td>
</tr>
<tr>
<td>`ramfs`</td>
<td>메모리 기반 파일시스템, 크기 제한이 약함</td>
</tr>
</table>
## 쓰기 시 복사(CoW) 파일시스템
- 일반 파일시스템에서는 기존 데이터를 수정할 때 기존 위치를 바로 덮어쓸 수 있음
- CoW 파일시스템은 기존 데이터를 바로 덮어쓰지 않고, **새 위치에 변경된 데이터를 쓴 뒤 메타데이터를 새 데이터 쪽으로 바꿈**
![모던 리눅스 5. 파일시스템 이미지](/SeonggukPark/images/notion/notes/modern-linux/05-filesystem-11.png)
### 예시
<table>
<colgroup>
<col>
<col>
</colgroup>
<tr>
<td>파일시스템</td>
<td>설명</td>
</tr>
<tr>
<td>`btrfs`</td>
<td>리눅스의 대표적인 CoW 파일시스템</td>
</tr>
<tr>
<td>`ZFS`</td>
<td>강력한 무결성, 스냅샷, RAID 기능 제공</td>
</tr>
<tr>
<td>`APFS`</td>
<td>macOS의 기본 CoW 파일시스템</td>
</tr>
</table>
# (5) 정리
