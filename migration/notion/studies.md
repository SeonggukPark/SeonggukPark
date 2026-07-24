# 공부 기록 정리

`Studies.zip`은 완성된 기술 글보다 강의·교재를 따라 정리한 개인 노트 성격이 강하다. 원문을 그대로 게시하기보다 직접 실행한 명령, 작은 재현 코드, 실수와 검증 결과를 추가해 새 글로 쓴다.

## 우선 공개할 Linux 시리즈

시리즈명 제안: `Linux Systems`

| 우선순위 | target | status | slug / 제목 | 핵심 범위 | source |
| --- | --- | --- | --- | --- | --- |
| P0 | post | 재작성 | `linux-filesystem-inodes-vfs` / inode에서 VFS까지: Linux 파일시스템을 따라가기 | inode, hard/symbolic link, mount, VFS, LVM, procfs, sysfs, devfs | 모던 리눅스 교과서 > 5) 파일시스템 |
| P0 | post | 재작성 | `linux-containers-under-the-hood` / 컨테이너를 이루는 Linux 기능 | namespace, cgroup, CoW, OCI, 이미지와 런타임 | 6) 애플리케이션, 패키지 관리, 컨테이너 |
| P0 | note | 재작성 | `linux-observability-first-response` / Linux 장애 대응 첫 10분 명령어 | logs/metrics/traces, `uptime`, `free`, `vmstat`, `iostat`, `ss`, `lsof`, `top` | 8) 관측가능성 |
| P1 | post | 재작성 | `linux-process-kernel-syscall` / 프로세스에서 시스템 콜까지 | process, thread, task, virtual memory, syscall, module, eBPF | 2) 리눅스 커널 |
| P1 | note | 재작성 | `shell-streams-jobs-tmux` / 셸의 스트림과 작업 제어 | FD, redirection, exit status, job control, `rg`, `jq`, `tmux`, portable Bash | 3) 쉘과 스크립팅 |
| P1 | post | 재작성 | `linux-networking-packet-path` / 한 패킷이 애플리케이션까지 오는 길 | ARP, IP, ICMP, routing, TCP/UDP, socket, DNS, Wireshark | 7) 네트워킹 |
| P2 | note | 재작성 | `linux-access-control-layers` / Linux 권한을 계층으로 이해하기 | DAC, MAC, capabilities, seccomp, ACL | 4) 접근 제어 |
| P2 | post | 재작성 | `linux-modern-runtime-landscape` / VM·MicroVM·immutable Linux 비교 | signals, Unix socket, KVM, Firecracker, immutable OS, embedded Linux | 9) 심화 주제 |

Linux 글마다 최소한 다음을 추가한다.

- 로컬 또는 VM에서 재현 가능한 명령과 예상 출력
- 어떤 문제에서 이 개념이 필요했는지에 대한 개인 사례
- 배포판과 커널 버전
- 명령 실행 전후 상태를 확인하는 방법
- 교재 그림 대신 직접 만든 도식 또는 공식 문서 링크

## 우선 공개할 C++ 시리즈

시리즈명 제안: `Practical C++`

| 우선순위 | target | status | slug / 제목 | 합칠 원문 | 보완할 실험 |
| --- | --- | --- | --- | --- | --- |
| P0 | post | 재작성 | `cpp-object-lifetime-virtual-destructor` / 객체 수명과 virtual destructor | 07) 객체지향 프로그래밍 특징, 08) 객체지향을 돕는 기능들 | base pointer 삭제, destructor 호출 순서, sanitizer 실행 |
| P0 | note | 재작성 | `cpp-iterator-invalidation` / 컨테이너별 iterator 무효화 규칙 | 12) STL의 컨테이너와 알고리즘, algorithms.zip의 이터레이터 무효화 | vector/set/unordered_map 비교와 C++20 `std::erase_if` 검증 |
| P1 | post | 재작성 | `cpp-pointers-references-value-categories` / 포인터·참조·값 범주를 메모리 관점에서 보기 | 02) 변수와 연산자, 03) 포인터와 메모리 구조 | 주소·수명·move 전후 상태를 작은 코드로 관찰 |
| P1 | post | 재작성 | `cpp-composition-dynamic-binding` / 상속보다 합성을 선택하는 기준 | 07), 08), 09) SOLID | 동일 기능을 inheritance와 strategy로 각각 구현해 결합도 비교 |
| P1 | note | 재작성 | `cpp-template-stl-toolbox` / 템플릿과 STL을 문제 해결 도구로 쓰기 | 10) 템플릿, 11) 표준 라이브러리, 12) STL | compile error 사례, iterator category와 algorithm 제약 |
| P2 | post | 재작성 | `modern-cpp-language-map` / Modern C++ 기능을 버전별로 정리하기 | 13)~16) 모던 C++ 및 새로운 구문 | C++11/14/17/20/23 표준별 컴파일 테스트 |
| P2 | note | 재작성 | `cpp-exceptions-noexcept` / 예외와 noexcept의 비용·계약 | 05) 예외 처리하기 | exception safety guarantee와 move 선택 차이 검증 |

알고리즘 ZIP의 iterator 문서에는 `std::erase_if`를 C++17 기능이자 컨테이너 멤버처럼 설명한 오류가 있다. 공개 글에서는 C++20 비멤버 알고리즘이라는 점을 공식 레퍼런스로 다시 확인해야 한다.

## 낮은 우선순위 또는 보관

| 자료 | status | 이유 / 활용 방법 |
| --- | --- | --- |
| Git & GitHub | 보관 | 일반 명령 모음 성격이 강함. `reset/revert/restore로 복구하는 법`처럼 실제 실수 사례 중심의 한 편으로 축약하면 유용 |
| 소프트웨어공학 & 시스템분석설계 61개 문서 | 보관 | 시험·교재 요약 비중이 높음. 개발 프로세스 선택, 테스트, 모듈 설계를 실제 프로젝트 회고와 연결할 때만 재작성 |
| Android App 개발 with Kotlin 16개 문서 | 보관 | 과정 자체가 `중단` 상태. 이력서 핵심 방향과 거리가 있어 대표 콘텐츠로 노출하지 않음 |
| Docker & Kubernetes | 제외 | `예정` 상태의 계획 문서로 실제 학습 결과가 없음 |
| OPIc | 제외 | 기술 콘텐츠가 아니며 개인 답변 스크립트가 포함될 수 있음 |
| 취업 준비·스터디 일정표 | 제외 | 공개 포트폴리오 가치가 낮고 개인 일정 정보가 중심 |
| 빈 페이지와 짧은 목차 | 제외 | 독립 콘텐츠로 사용할 본문이 없음 |

## 저작권과 품질 원칙

- 교재 목차와 문장을 그대로 옮기지 않는다.
- 책의 스크린샷은 게시하지 않고 직접 실행한 화면이나 자체 도식으로 교체한다.
- 공식 문서로 현재 동작과 버전을 다시 확인한다.
- 한 글에는 개인 실험이나 프로젝트 연결점을 최소 하나 포함한다.
- 출처가 된 책·강의는 글 하단의 참고자료로 명시한다.
