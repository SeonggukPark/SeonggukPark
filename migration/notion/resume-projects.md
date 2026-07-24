# 이력서와 프로젝트 정리

현재 `src/data/site.ts`와 `src/content/projects`를 최신 기준으로 두고, `prev_resume.zip`은 세부 근거를 보강하는 자료로 사용한다. 서로 충돌하는 정보는 자동 병합하지 않는다.

## 이력서 반영 후보

| target | status | 항목 | 정리할 내용 | source / checks |
| --- | --- | --- | --- | --- |
| resume | 바로 반영 | 연구 논문 | `Optimizing Vision Transformers via Post-Training Quantization for Edge Computing`, 제1저자 박성국·안상태, 경북대학교 | `prev_resume.zip > 논문(Abstract).pdf`; 공개용 링크 또는 PDF 배치 위치 결정 |
| resume | 바로 반영 | 2023 수상 | 스마트 해상물류 경진대회 금상, 해양수산부 장관상, 2023-11-29 | Awards CSV와 개별 수상 문서 |
| resume | 재작성 | 삼성전자 알고리즘 역량강화 | 2024.07~08 집중 교육, 멘토 피드백을 통한 알고리즘·코드 최적화 학습 | 이전 이력서와 `algorithms.zip > 교육`; 정확한 공식 과정명 확인 |
| resume | 재작성 | LG Aimers | 2024.01~02, MQL의 B2B 영업 기회 전환 여부를 예측하는 이진 분류 프로젝트 | 이전 이력서; 역할·평가지표가 있으면 보강 |
| resume | 재작성 | CJ Remote Internship | 2023.04~06, Python 기반 데이터 분석 및 스마트 헬스케어 데이터 분석 | 이전 이력서; 산출물·성과 확인 |
| resume | 재작성 | 알고리즘 동아리 Gori | 2024.03~10 알고리즘 학습 활동 | 이전 이력서; 실제 활동 범위와 공개 가치 확인 |
| resume | 보관 | 학생대표 | 2021.04~2022.03 | 기술 포트폴리오에서는 우선순위가 낮으나 리더십 섹션이 필요하면 사용 |
| resume | 확인 필요 | 2025 사내 아이디어 공모전 | 2025-11-28 은상/2위 | 생성형 AI 교통법규 안내와 특허 준비 내용은 회사 공개 가능 여부 확인 후 제목·세부 내용을 결정 |
| resume | 확인 필요 | OPIc | IM2, 2024-08-18 | 등급과 날짜만 공개하고 인증번호는 제외; 현재 유효성 표기 방식 확인 |

## 최신 정보와 충돌하는 항목

| 항목 | 현재 사이트 | Notion export | 처리 원칙 |
| --- | --- | --- | --- |
| 현대모비스 재직 기간 | 2025.01~2026.03 | 2025.01부터 재직으로만 표기 | 현재 사이트 유지 |
| Brain AI Lab 기간 | 2024.01~2025.01 | 2024.01~2024.12 | 사용자 확인 전 현재 사이트 유지 |
| 이메일 | Naver 주소 | 과거 Gmail 주소 | 현재 사이트 유지 |
| 에어컨 군집화 거리/유사도 | Cosine Similarity | DTW, Euclidean Distance, K-Means의 한계를 언급 | 실제 최종 모델과 실험 이력을 확인한 뒤 하나의 설명으로 정리 |
| 산학과제 기간 | 현재 프로젝트별 기간 | 이전 이력서에 일부 다른 종료 월 | 계약/발표 또는 최종 산출물 기준을 정해 통일 |

## 프로젝트별 보강안

### Vision Transformer 양자화

```text
target: project
status: 바로 반영 + 일부 확인 필요
slug: vision-transformer-quantization
tags: Python, PyTorch, Vision Transformer, INT8, PTQ, Edge AI
source: prev_resume.zip > 양자화를 통한 ViT 경량화 / 논문(Abstract).pdf
```

추가 가능한 근거:

- ViT, EfficientNet, LeViT를 `timm`의 ImageNet-1K 사전학습 모델로 비교했다.
- ImageNet validation set에서 무작위 5,000장을 사용했다.
- PyTorch Profiler와 Intel i7-10700K 3.80GHz CPU 환경에서 지연시간을 비교했다.
- Linear layer에 동적 Post-Training Quantization을 적용해 INT8 weight를 사용했다.
- 양자화된 LeViT가 EfficientNet보다 지연시간과 정확도 균형에서 유리하다는 결론을 기록했다.
- 2024-07-01 경북대학교 교내 학술대회 포스터 발표 자료가 있다.

확인할 사항:

- 현재 사이트의 `속도 약 43% 개선`, `정확도 저하 1% 이내`를 논문의 어떤 모델·조건에서 산출했는지 표로 복원한다.
- PDF를 공개 다운로드로 제공할 권한과 공저자 동의를 확인한다.
- GPU가 아닌 CPU 동적 양자화를 사용한 이유를 정확히 설명한다.

### 항만 컨테이너 크레인 자동화

```text
target: project
status: 바로 반영 + 재작성
slug: container-crane-automation
tags: C, C++, Python, Embedded Linux, Flask, BLE, CoreXY, Multi-thread
source: prev_resume.zip > 24시간 자동화 키 크레인 제작 / 발표자료.pptx
```

추가 가능한 내용:

- 팀 리더로 일정·예산·통합을 관리하고 펌웨어, 회로, 제어 애플리케이션을 담당했다.
- CoreXY 방식 XY 플로터, Z축 리니어 액추에이터, 전자석 스프레더를 제어했다.
- Raspberry Pi에서 Flask 기반 관리 시스템을 실행하고 QR 인식 결과와 컨테이너 DB를 대조했다.
- 무게와 도착 국가 우선순위로 적재 순서를 계산하고, 선적 상태를 웹에 갱신했다.
- 프로토타입은 2×3×3 적재 공간과 컨테이너 18개로 구성했다.
- 시연 영상: <https://youtu.be/P9J5YVBiWrk?si=ZFAFCixaW8i_-APe>

확인할 사항:

- 현재 사이트의 `운송 시간 약 10% 단축` 측정 방법과 비교 기준을 명시한다.
- 발표자료에 포함된 팀원 정보와 로고의 공개 범위를 검토한다.
- HWP 결과보고서는 별도 도구로 열어 회로도·실험 수치·역할 분담 근거만 선별한다.

### 에어컨 실내기 분류 모델

```text
target: project
status: 확인 필요
slug: air-conditioner-clustering
tags: C++, Python, Embedded Linux, Time Series, Clustering
source: prev_resume.zip > 시스템에어컨 인공지능 자율운전제어
```

유지할 핵심:

- Python 모델을 C++로 변환하고 Embedded Linux 추론 엔진에 이식했다.
- 위치 정보 없이 온·습도 시계열을 이용해 같은 공간의 실내기를 묶는 문제를 다뤘다.
- 제한된 제품 환경에서 실시간 실행 가능성을 검토했다.

확인할 사항:

- 최종 방식이 Cosine Similarity인지, DTW/Euclidean/K-Means 비교 후 다른 방식을 채택했는지 실험 노트로 확인한다.
- `약 90%`의 분모, 데이터셋, 현장 수, 평가 기준을 공개 가능한 범위에서 명시한다.
- 고객사명, 장비명, 내부 추론 엔진 구조의 공개 가능 범위를 확인한다.

### PCB 이미지 기반 불량 검출

```text
target: project
status: 재작성 + 확인 필요
slug: pcb-defect-detection
tags: Python, PyTorch, Computer Vision, Jetson, Edge AI
source: prev_resume.zip > PCB 코팅 자동화
```

추가 가능한 내용:

- PCB UV 코팅 상태를 이진 분류하고 생산 공정을 분석했다.
- 부족한 불량 데이터를 augmentation으로 보완하고 Jetson 환경에서 실시간 추론을 검증했다.

확인할 사항:

- 현재 페이지의 `Detection 모델`과 이전 자료의 `binary classifier` 중 실제 최종 태스크를 확정한다.
- `약 85%`가 accuracy, recall, F1 중 무엇인지 확인한다.
- 불량 이미지 원본은 기업 데이터일 가능성이 높으므로 공개하지 않는다.

### MCU 환경 사람 검출

```text
target: project
status: 확인 필요
slug: mcu-human-detection
tags: TensorFlow, MobileNet, MCU, Quantization, Edge AI
source: 현재 사이트와 이전 이력서의 개인 연구 요약
```

이 프로젝트는 export에 구체적인 실험표가 거의 없다. 현재 페이지의 `약 75% 정확도`, MCU 모델명, quantization 방식, 모델 크기와 latency를 실험 로그나 GitHub 코드에서 다시 확인한 뒤 보강한다.

## 공개 범위에서 제외

- 전화번호, 상세 주소, OPIc 인증번호
- 과거 Gmail 주소처럼 현재 사용하지 않는 연락처
- 회사 내부 아이디어 공모전의 구현안 및 특허 청구와 연결될 수 있는 상세 설명
- 산학과제의 원본 이미지, 고객 데이터, 내부 시스템 구조
- 팀원 이름이 포함된 원본 PPTX/HWP의 무검토 배포
