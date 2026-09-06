---
title: "Docker & Kubernetes 3. 쿠버네티스 개요"
description: "클러스터와 kubectl, 파드·배포·볼륨·서비스를 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["Docker", "Kubernetes", "Container"]
draft: true
source: "https://app.notion.com/p/3966b9674ad88046a8d2e7a615ff95a2"
importedAt: 2026-09-06
---

# <span color="gray_bg">(1) 쿠버네티스 특징</span>
## 1) 파일을 사용한 선언적 관리
- 애플리케이션을 쿠버네티스로 배포시, 애플리케이션 및 그를 구성하는 컨테이너는 어떤 상태가 이상적인 상태인지 YAML or JSON 형식의 **매니페스트 **설정 파일로 선언
	→ 해당 상태를 실현 및 유지하는 작업을 쿠버네티스가 알아서 수행
![](/SeonggukPark/images/notion/notes/kubernetes-overview-01.png)
## 2) 광범위한 배포 형식 지원
- 컨테이너 관련 다양한 배포 형식 지원
- 일반적으로 컨테이너는 종료와 동시에 폐기하는 스테이트리스 방식
	→  state-less: 영구적인 데이터나 장기적인 상태 유지 X
- 사용 사례에 따라 스테이트풀 방식도 가능 e.g.) DB
- 이 외에도 감시용 프로세스, 배치 작업 처럼 한 번 or 특정 시간 간격으로 처리하는 식으로도 가능
- 쿠버네티스는 컨테이너 자동 복구, 스케일링, 업데이트 같은 관리 작업도 일부 대행
![](/SeonggukPark/images/notion/notes/kubernetes-overview-02.png)
## 3) 확장성이 뛰어난 아키텍처와 활발한 개발자 커뮤니티
- 쿠버네티스는 관리 정보를 HTTP API로 공개
	→ 사용자는 API로 조작해서 이상적인 상태 선언 및 애플리케이션 관련 상태 확인 가능
![](/SeonggukPark/images/notion/notes/kubernetes-overview-03.png)
→ 컨트롤러
	- API를 참조하고 조작해서 사용자가 정의한 이상적인 상태를 유지하도록 함
	- 컨테이너 실행 개수 유지 등 구체적인 관리 작업 수행
	- 기본 제공 컨트롤러 외에 서드파티 or 직접 구현한 컨트롤러를 플러그인해서 기능 확장 가능
- 쿠버네티스에는 API 자체를 확장해서 기본 쿠버네티스에 없는 새로운 관리 대상을 정의 하는 **커스텀 리소스 **기능도 존재
- 쿠버네티스는 클라이언트 명령어, 네트워크 및 스토리지 관련 컴포넌트, 노드에서 컨테이너 작성 담당하는 컨테이너 런타임 등 다양한 부분이 교체 가능
# <span color="gray_bg">(2) 쿠버네티스 클러스터와 kubectl</span>
![](/SeonggukPark/images/notion/notes/kubernetes-overview-04.png)
→ 클러스터: 컨테이너 그룹을 실행하는 머신
→ 노드: 각 컨테이너가 실행되는 머신
→ 컨트롤 플레인: 쿠버네티스 클러스터 전체의 관리를 담당하는 컴포넌트
	- 컨트롤러, 스케줄러 같은 컴포넌트 포함
	- 클러스터 전체 관리 정보를 공개하고 관리 정보 및 변경 요청을 HTTP API로 받는 API 서버도 포함
- API 조작을 쉽게 명령어로 정리한 kubectl 명령어 사용하면 편리
- kubectl 명령어를 통해 쿠버네티스 클러스터에서 컨테이너 실행 및 상태 확인 하는 등 쿠버네티스 대상으로 조작 가능
- 애플리케이션 배포시, kubectl 명령어 말고 YAML or JSON 형식의 설정 파일로 작성해서 쿠버네티스 클러스터에 선언도 가능
# <span color="gray_bg">(3) 쿠버네티스의 기본 배포 단위: 파드</span>
- 도커는 컨테이너 1개가 기본 단위, 쿠버네티스는 하나 이상의 컨테이너 그룹을 묶은 파드(pod)
## 1) 파드와 컨테이너
![](/SeonggukPark/images/notion/notes/kubernetes-overview-05.png)
- 파드: 하나 이상의 컨테이너를 한번에 묶어서 관리할 수 있는 배포 단위
- 하나의 파드에 속한 컨테이너 그룹은 동일한 노드에 배포, 네트워크 인터페이스와 스토리지 할당 등을 공유
- 쿠버네티스는 IP 주소를 파드마다 할당
	→ 파드끼리 서로 다른 IP 주소를 사용해 통신 가능
	→ 파드 내부의 컨테이너는 localhost로 서로 통신 가능
### 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-06.png)
→ 파드 예제
→ 하나의 Pod 안에 nginx 컨테이너와 alpine 컨테이너를 같이 같이 실행
→ emptyDir 볼륨 공유
![](/SeonggukPark/images/notion/notes/kubernetes-overview-07.png)
→ 컨테이너끼리 공유되는 localhost에 접속
![](/SeonggukPark/images/notion/notes/kubernetes-overview-08.png)
→ 파드 삭제
- 1개의 파드에 컨테이너를 배치하는 방법(=디자인 패턴)은 다양
	- 사이드카 컨테이너 패턴
		- 메인 컨테이너의 기능을 확장하는 컨테이너를 동일한 파드에 함께 배치
		- e.g.) 메인 애플리케이션 컨테이너 로그를 수집하는 경우 등
	- 앰배서더 패턴
		- 메인 컨테이너에 프록시 기능을 제공
	- 어댑터 패턴
		- 서로 다른 컨테이너에서 통일된 데이터를 파드 외부에 제공
		- e.g.) 모니터링 데이터를 공개
## 2) 레이블과 애너테이션
![](/SeonggukPark/images/notion/notes/kubernetes-overview-09.png)
- Label
	- 리소스에 붙이는 식별용 태그
- Annotation
	- 리소스에 붙이는 부가 설명/메타데이터
	- 주로 쿠버네티스를 구성하는 컴포넌트와 주변 도구용 추가 정보를 부여하는 데 사용
- Selector
	- Label을 기준으로 원하는 리소스를 선택하는 조건
# <span color="gray_bg">(4) 애플리케이션 배포</span>
## 1) 디플로이먼트
- Pod를 직접 관리하는 대신, 원하는 개수와 상태로 계속 유지해주는 상위 리소스
- 파드 스케일링, 자동 복구, 업데이트 관련 기능 제공
- 노드 장애 발생하거나 파드 불량으로 클러스터 전체의 파드 가동 개수가 지정 숫자보다 줄어들면 자동으로 새로운 파드를 실행해서 복구 시도하는 **셀프 힐링** 존재
### 스케일 아웃 실습
- 스케일 아웃: 컨테이너, 파드 같은 자원을 추가해서 시스템을 확장하는 작업
![](/SeonggukPark/images/notion/notes/kubernetes-overview-10.png)
![](/SeonggukPark/images/notion/notes/kubernetes-overview-11.png)
![](/SeonggukPark/images/notion/notes/kubernetes-overview-12.png)
→ 파드 개수를 변경한 매니페스트 선언 후 가동 중인 파드가 3개로 늘어난 모습
### 셀프 힐링 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-13.png)
![](/SeonggukPark/images/notion/notes/kubernetes-overview-14.png)
→ 파드를 삭제했는데도, 새로운 파드가 실행돼서 전체 실행 파드 개수가 3을 유지
- 디플로이먼트는 업데이트와 롤백할 때도 편리
	→ **롤링 업데이트**(일정 개수 파드가 클러스터에서 언제나 가동 중인 상태를 유지하면서 파드 그룹을 점진적으로 업데이트/롤백하는 방식)도 지원
	→ 서비스 중단 없이 디플로이먼트 업데이트 가능
### 롤링 업데이트 → nginx 파드 이미지를 알파인 리눅스 기반 nginx:1.25-alpine으로 변경 해서 매니페스트 작성
![](/SeonggukPark/images/notion/notes/kubernetes-overview-15.png)
![](/SeonggukPark/images/notion/notes/kubernetes-overview-16.png)
![](/SeonggukPark/images/notion/notes/kubernetes-overview-17.png)
→ 디플로이먼트의 이미지 변경 후 파드 업데이트 작업 시작
![](/SeonggukPark/images/notion/notes/kubernetes-overview-18.png)
→ 디플로이먼트로 파드가 롤링 업데이트되는 모습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-19.png)
→ 디플로이먼트의 이미지가 교체된 모습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-20.png)
→ 디플로이먼트 삭제
## 2) 스테이트풀셋
- 일반적으로 파드와 컨테이너는 스테이트리스 or 일시적 실행 단위
- DB 처럼 장기적인 상태 저장을 필요로 하는 어플을 위해 Stateful 컨테이너도 지원
- 스테이트풀셋은 각 파드의 정체성과 데이터를 유지하면서 여러 파드를 관리하기 위한 리소스
- 스케일링을 통한 파드 작성, 삭제는 인덱스 순으로 진행
![](/SeonggukPark/images/notion/notes/kubernetes-overview-21.png)
→ statefulset을 스케일인 후 다시 스케일아웃 했을때, 파드는 없어져도 각 파드가 사용하던 볼륨 유지
### 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-22.png)
![](/SeonggukPark/images/notion/notes/kubernetes-overview-23.png)
→ statefulset을 활용해서 nginx pod 3개를 클러스터에 배포
→ 마지막에 headless-service
	→ 각 파드에 ip가 아닌 파드명을 사용해서 통신할 수 있도록 해줌
![](/SeonggukPark/images/notion/notes/kubernetes-overview-24.png)
→ 스테이트풀셋에 포함된 각 파드에 기록된 타임 스탬프
![](/SeonggukPark/images/notion/notes/kubernetes-overview-25.png)
→ 스테이트풀셋 스케일 인 & 스케일 아웃
![](/SeonggukPark/images/notion/notes/kubernetes-overview-26.png)
→ 타임 스탬프 재확인
→ 결과 동일, 이전 상태 유지
![](/SeonggukPark/images/notion/notes/kubernetes-overview-27.png)
→ 스테이트풀셋 및 볼륨 삭제
## 3) 데몬셋
- 노드마다 특정 pod를 하나씩 실행하도록 보장하는 리소스
- 보통 로그 수집기 등에 활용
![](/SeonggukPark/images/notion/notes/kubernetes-overview-28.png)
![](/SeonggukPark/images/notion/notes/kubernetes-overview-29.png)
→ 우분투 파드를 클러스터의 각 노드에 배포
![](/SeonggukPark/images/notion/notes/kubernetes-overview-30.png)
→ 데몬셋 배포 예시 (현재 클러스터의 노드가 minikube 하나라서 Pod 하나 배치)
## 4) 잡과 크론잡
- 잡: 특정 작업을 수행하고 끝내는 Pod를 관리하는 리소스 (일회성 배치 작업)
- 크론잡: 잡을 정해진 시간마다 반복 실행
![](/SeonggukPark/images/notion/notes/kubernetes-overview-31.png)
### 예제
![](/SeonggukPark/images/notion/notes/kubernetes-overview-32.png)
→ 잡 예제
→ Pod 실행을 3번 완료하면 Job을 성공처리
![](/SeonggukPark/images/notion/notes/kubernetes-overview-33.png)
→ 잡 실행
![](/SeonggukPark/images/notion/notes/kubernetes-overview-34.png)
→ 잡에 포함된 파드 완료 확인
![](/SeonggukPark/images/notion/notes/kubernetes-overview-35.png)
→ 각 파드 로그 확인
![](/SeonggukPark/images/notion/notes/kubernetes-overview-36.png)
→ 잡 삭제
# <span color="gray_bg">(5) 설정 항목과 볼륨</span>
## 1) 컨피그맵과 시크릿을 활용한 애플리케이션 설정 관리
- 컨피그맵: 컨테이너 내부의 애플리케이션이 실행될 때 참조하는 설정파일 등
- 시크릿: 인증 정보 등 보안 데이터를 이미지에 포함하지 않고 독립적으로 관리하는데 사용
![](/SeonggukPark/images/notion/notes/kubernetes-overview-37.png)
### 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-38.png)
→ 컨피그맵과 시크릿을 사용하는 파드
![](/SeonggukPark/images/notion/notes/kubernetes-overview-39.png)
→ 컨피그맵과 시크릿을 작성 및 사용하는 파드 작성
![](/SeonggukPark/images/notion/notes/kubernetes-overview-40.png)
→ 컨피그맵과 시크릿이 주어진 파드 출력 확인
![](/SeonggukPark/images/notion/notes/kubernetes-overview-41.png)
→ 파드, 컨피그맵, 시크릿 삭제
## 2) 볼륨을 사용한 스토리지 관리
- 컨테이너 내부 파일에 기록된 내용은 컨테이너 종료와 함께 폐기
- 더 긴 수명을 제공하는 추가 데이터 저장 영역으로 볼륨 기능 제공
## 3) 퍼시스턴트 볼륨 (PV)
- 파드와 독립적인 수명을 가지고 데이터가 영구 유지되는 볼륨
![](/SeonggukPark/images/notion/notes/kubernetes-overview-42.png)
- 파드에서 PV 사용을 위해서는 조건을 명시한 PV클레임(PVC)를 별도 작성해야
- 파드 매니페스트에 PVC 이름과 해당 볼륨을 마운트할 컨테이너 내부 위치 지정하면 컨테이너에서 볼륨 사용 가능
### 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-43.png)
→ 스토리지를 클러스터에서 사용할 수 있도록 PV, PVC를 작성한 매니페스트
- 동적 프로비저닝: PVC 생성 시 조건에 맞는 PV가 없더라도 쿠버네티스가 필요한 저장 공간과 PV를 자동으로 만들어 주는 방식
## 4) 임시 볼륨
- 파드와 똑같은 수명을 가지고 파드를 재시작하면 데이터가 유지되지 않는 임시 볼륨
### 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-44.png)
→ 빈 디렉터리를 파드에서 사용하는 볼륨인 emptyDir 예제
![](/SeonggukPark/images/notion/notes/kubernetes-overview-45.png)
→ emptyDir을 사용하는 파드 실행
# <span color="gray_bg">(6) 서비스 공개</span>
## 1) 서비스를 사용해서 파드에 접속하기
- 서비스: 여러 Pod 앞에 두는 **고정된 네트워크 진입점**
- 쿠버네티스는 Pod 자체에도 IP가 할당 되지만, 파드의 IP 주소가 자주 변경 가능 하므로 실제 파드 접속과 로드밸런싱 처리를 위한 서비스 사용
- 접속시 이름 사용 가능
![](/SeonggukPark/images/notion/notes/kubernetes-overview-46.png)
### 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-47.png)
→ 서비스를 선언하는 매니페스트
## 2) 외부에 서비스 공개하기
- 서비스에 부여된 IP 주소는 쿠버네티스 클러스터 내부에서만 유효 (외부 접근 X)
- 쿠버네티스는 파드 그룹을 클러스터 외부에 공개하는 데 유용한 여러 서비스, 기능 제공
### NodePort 서비스
- 서비스의 일종, 각 노드의 고정 포트를 클러스터 외부에 공개
- 해당 포트를 통한 통신을 서비스를 구성하는 파드 중 하나에 로드밸런싱
- 노드 자체의 클러스터 외부 공개가 여러개거나 노드가 여러 개라면 노드 그룹의 노드밸런서 설정은 사용자가 직접 해야 함
![](/SeonggukPark/images/notion/notes/kubernetes-overview-48.png)
#### 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-49.png)
→ NodePort 서비스를 작성한 매니페스트
### 로드밸런서 서비스
- 서비스의 일종
- 클라우드 업체처럼 쿠버네티스용 로드밸런서 기능을 제공하는 플랫폼에서 사용 가능
- 각 서비스를 클러스터 외부에 공개 가능
![](/SeonggukPark/images/notion/notes/kubernetes-overview-50.png)
#### 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-51.png)
→ 로드밸런서 서비스를 작성한 매니페스트
### 인그레스
- 다수의 서비스 접속을 관리할 수 있는 기능
- 쿠버네티스 자체는 인그레스를 관리하는 컴포넌트가 포함 X
	→ 사용자가 직접 도입하거나 클라우드 제공업체의 쿠버네티스 운영 플랫폼에서 제공하는 것을 써야 함
![](/SeonggukPark/images/notion/notes/kubernetes-overview-52.png)
#### 실습
![](/SeonggukPark/images/notion/notes/kubernetes-overview-53.png)
→ 서비스와 인그레스를 같이 정의해서 외부 HTTP 요청을 nginx Pod까지 연결하려는 구성
# <span color="gray_bg">(7) 쿠버네티스의 파드와 CRI 컨테이너 런타임</span>
## 1) kubelet으로 파드 관리
![](/SeonggukPark/images/notion/notes/kubernetes-overview-54.png)
→ 사용자가 작성을 지시한 파드가 노드에서 실행되는 흐름
## 2) CRI 런타임
- 각 노드에서 실행되는 소프트웨어
-  쿠버네티스가 컨테이너를 실행할 때 사용하는 **컨테이너 런타임 계층**
- kubelet에서 파드 조작 관련 지시를 받아 그에 따라 이미지를 레지스트리에서 가져오가나, 컨테이너 그룹을 파드로 작성하는 등의 작업 수행
## 3) CNI 플러그인
- Pod의 네트워크를 실제로 구성해주는 플러그인
- flannel, Calico 등
## 4) kube-proxy
- Service로 들어온 트래픽을 실제 Pod로 전달되게 하는 네트워크 구성 요소
- 리눅스 노드라면 iptables, ipvs 기능을 사용해 구현
![](/SeonggukPark/images/notion/notes/kubernetes-overview-55.png)
## 5) 노드 컴포넌트의 관계
![](/SeonggukPark/images/notion/notes/kubernetes-overview-56.png)
- kubelet
	- 노드의 파드 관리
- kube-proxy
	- 서비스를 향한 통신을 해당하는 파드에 전달하여 서비스 통신 실현
	- 리눅스에서는 iptables 기능 등을 사용해 구현
- CRI 런타임
	- kubelet에서 지시를 받아 컨테이너 그룹을 파드로 관리하거나 이미지를 관리
	- 규격은 쿠버네티스의 Container Runtime Interface로 정하고 gRPC API 공개
- CNI 플러그인
	- 파드에 네트워크 인터페이스를 부여
	- 파드 간의 통신을 관리하도록 CRI 런타임에서 사용
- OCI 런타임
	- CRI 런타임에서 사용하는 호스트와 격리된 실행 환경을 컨테이너로 작성, 직접 조작하는 수단 제공
	- 규격은 OCI가 OCI Runtime Specification으로 정함
