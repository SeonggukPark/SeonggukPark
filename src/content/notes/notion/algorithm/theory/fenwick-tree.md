---
title: "Fenwick Tree"
description: "누적 합 질의와 값 갱신을 O(log N)에 처리하는 펜윅 트리를 정리합니다."
publishedAt: 2026-07-26
tags: ["Algorithm", "Data Structure", "Fenwick Tree"]
draft: true
source: "https://app.notion.com/p/24e6b9674ad880e685abc32a378a5f9e"
importedAt: 2026-07-26
---

> Notion Study 페이지의 Algorithm 학습 기록에서 가져온 콘텐츠입니다.

- [https://www.acmicpc.net/blog/view/21](https://www.acmicpc.net/blog/view/21)
  - **누적 합(prefix sum)** 을 효율적으로 계산하고, 배열 값의 변경(업데이트)도 빠르게 처리하기 위해 고안된 자료구조

\[구현\]
<details>
<summary>**구간 합 - O(log N)**</summary>
```cpp
int sum(int idx) {
    int result = 0;
    while (idx > 0) {
        result += tree[idx];
        idx -= (idx & -idx);
    }
    return result;
}
```
</details>
<details>
<summary>**업데이트 - O(log N)**</summary>
```cpp
void update(int idx, int val) {
    while (idx <= N) {
        tree[idx] += val;
        idx += (idx & -idx);
    }
}
```
</details>
