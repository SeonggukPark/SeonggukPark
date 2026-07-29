---
title: "Docker & Kubernetes 1. 컨테이너 기술 개요"
description: "컨테이너 격리, 이미지와 Build·Ship·Run 작업 흐름을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Docker", "Kubernetes", "Container"]
draft: true
source: "https://app.notion.com/p/3966b9674ad88022be77e6688c45d5a1"
importedAt: 2026-07-29
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

## 1) 가벼운 실행 환경

## 2) 높은 이식성

## 3) 거대한 생태계

# <span color="gray_bg">(3) 이 책에서 다루는 도커와 쿠버네티스</span>
