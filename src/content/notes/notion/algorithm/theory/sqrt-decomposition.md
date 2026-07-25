---
title: "SQRT Decomposition"
description: "배열을 제곱근 크기 블록으로 나누어 질의와 갱신을 처리하는 기법을 정리합니다."
publishedAt: 2026-07-26
tags: ["Algorithm", "Data Structure", "Sqrt Decomposition"]
draft: true
source: "https://app.notion.com/p/24e6b9674ad880e685abc32a378a5f9e"
importedAt: 2026-07-26
---

> Notion Study 페이지의 Algorithm 학습 기록에서 가져온 콘텐츠입니다.

- 백준 문제 모음: [https://www.acmicpc.net/workbook/view/346](https://www.acmicpc.net/workbook/view/346)
  - 배열을 **√N 크기의 블록**으로 나누어서 각 블록에 대한 요약 정보(예: 합, 최댓값, 최솟값 등)를 저장해 두고, 쿼리를 처리할 때 **완전히 포함된 블록은 한 번에 처리**, 나머지만 개별 원소로 처리.
  - **시간복잡도**:
    - **쿼리**: `O(√N)`
    - **업데이트**: `O(√N)` (단순 버전 기준)
\[구현\]
<details>
<summary>**구간 합 - O(√N)**</summary>
```cpp
long long query(int lo, int hi) {
    long long ret = 0;
    // 구간이 딱 맞아떨어지지 않을 경우, 왼쪽에 걸쳐있는 유효의 원소들을 모두 더해준다
    while (lo % sz != 0 && lo <= hi) {
        ret += A[lo++];
    }
    // 오른쪽에 걸쳐있는 유효의 원소들을 모두 더해준다
    while ((hi + 1) % sz != 0 && lo <= hi) {
        ret += A[hi--];
    }
    // 구간이 딱 맞아떨어질 때
    while (lo <= hi) {
        ret += bucket[lo / sz];
        lo += sz;
    }
    return ret;
}
```
</details>
<details>
<summary>**업데이트 - O(1)**</summary>
```cpp
void update(int pos, long long val) {
    // 원래 원소의 값과 갱신해야 하는 값의 차이(diff)를 계산
    long long diff = val - A[pos];
    // 기존 원소를 새로운 값으로 대체
    A[pos] = val;
    // 기존 포지션 속해있는 유효의 원소군으로 인해 생기는 차이만큼의 값을 더해준다
    bucket[pos / sz] += diff;
}

```
</details>
