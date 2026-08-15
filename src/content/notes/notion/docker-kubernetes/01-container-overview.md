---
title: "Docker & Kubernetes 1. 컨테이너 기술 개요"
description: "컨테이너 격리, 이미지와 Build·Ship·Run 작업 흐름을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Docker", "Kubernetes", "Container"]
draft: true
source: "https://app.notion.com/p/3966b9674ad88022be77e6688c45d5a1"
importedAt: 2026-08-15
---

# <span color="gray_bg">(1) 컨테이너 살펴 보기</span>
- 컨테이너: 호스트 OS에서 독립적인 애플리케이션 실행 환경을 작성하는 기술
- 하나의 호스트에서 여러 컨테이너 실행 가능

![](/SeonggukPark/images/notion/notes/docker-container-overview-01.png)

## 1) 컨테이너 실행

![](/SeonggukPark/images/notion/notes/docker-container-overview-02.png)

→ **Ubuntu 22.04 컨테이너를 실행하고, 컨테이너 내부에서 보이는 프로세스를 확인**

→ ps 명령어로 2개의 프로세스만 확인 가능한데, 실제 호스트 환경에서는 더 많은 프로세스 실행

**→ 컨테이너가 호스트와 격리된 독립적인 실행 환경임을 알 수 있음**

## 2) 컨테이너 이미지
- 컨테이너 이미지 : 실행할 애플리케이션과 실행에 필요한 의존 파일을 포함하는 데이터
- 이미지 개요

![](/SeonggukPark/images/notion/notes/docker-container-overview-03.png)

	- 컨테이너 기본적인 작업 흐름

![](/SeonggukPark/images/notion/notes/docker-container-overview-04.png)

→ **Build, Ship, Run**은 도커가 내세운 작업 흐름을 나타내는 상징적 문구

![](/SeonggukPark/images/notion/notes/docker-container-overview-05.png)

→ 이미지 생성 및 컨테이너 실행 예제

![](/SeonggukPark/images/notion/notes/docker-container-overview-06.png)

→ 레지스트리 서버를 사용해 다른 머신에도 이미지 공유 가능

![](/SeonggukPark/images/notion/notes/docker-container-overview-07.png)

→ docker pull 명령어로 이미지를 레지스트리 서비스 (도커 허브)에서 가져오는 예제

![](/SeonggukPark/images/notion/notes/docker-container-overview-08.png)

# <span color="gray_bg">(2) 기본적인 컨테이너 기술의 특징</span>

![](/SeonggukPark/images/notion/notes/docker-container-overview-09.png)

## 1) 가벼운 실행 환경

![](/SeonggukPark/images/notion/notes/docker-container-overview-10.png)

### 가상 머신
- 리눅스 KVM 등의 하이퍼바이저를 사용한 가상화 기술
- 인프라 분야에서 널리 사용
- AWS, MS Azure, Google Cloud 등 대표적인 클라우드 서비스도 가상머신을 주요 실행 환경으로 제공
- 가상머신 이미지는 보통 몇 기가바이트 이상

### 컨테이너 기술
- 호스트 OS 커널을 기반으로 커널이 제공하는 환경 격리 기능을 활용해서 독립적인 실행 환경 생성
- 컨테이너 자체에닌 OS 커널 미포함
- 사실, 컨테이너도 그 실체는 프로세스

→ 다만 OS 커널 기능을 활용해서 일반 프로세스에 비해 강력하게 환경 분리
- 컨테이너 이미지에는 하나의 애플리케이션과 최소의 컴포넌트만 포함해서 작게 만드는 것이 좋음
- 컨테이1너 이미지는 수십\~수백 메가바이트 정도로 작은 편

→ 컨테이너 이미지를 다른 머신 환경에서도 네트워크 통해 빠르게 공유 가능

![](/SeonggukPark/images/notion/notes/docker-container-overview-11.png)

## 2) 높은 이식성
- 컨테이너 이미지의 높은 동작 재현성
- 업계 표준 규격에 따른 컨테이너의 통일된 조작 방법

## 3) 거대한 생태계

### OCI(Open Container Initiative)
- 컨테이너 기술 관련 표준 규격을 정하고 참조 구현 개발 등을 담당하는 리눅스 재단 산하 프로젝트
- 컨테이너 이미지, 레지스트리, 런타임의 정해진 표준 규격은 OCI를 중심으로 정해짐

### CNCF(Cloud Native Computing Foundation
- 리눅스 재단 산하의 프로젝트 단체
- 쿠버네티스가 여기서 나온 프로젝트
- 성숙도에 따라 등급이 존재하며, Graduated, Incubating, Sandbox 존재

→ 쿠버네티스는 Graduated에 속함
- 쿠버네티스에서 사용 가능한 플러그인 인터페이스(CRI, CSI, CNI) 같은 몇 가지 규격을 정함

# <span color="gray_bg">(3) 이 책에서 다루는 도커와 쿠버네티스</span>

![](/SeonggukPark/images/notion/notes/docker-container-overview-12.png)

### 도커
- 하나의 머신에서 컨테이너 관리, 컨테이너 이미지 작성, 이미지를 팀과 조직에 공유하는 등의 컨테이너 관련 기본 작업 흐름 지원하는 도구

### 쿠버네티스
- 여러 대의 머신으로 구성된 환경에서 컨테이너를 관리하는데 사용하는 오케스트레이션 엔진
- 유연한 관리 자동화 기능 제공
- 선언적 관리 스타일 (매니페스트 설정 파일에 이상적인 배포 상태 정의, 이를 쿠버네티스에 전달하여 인프라를 조작하는 방식)
