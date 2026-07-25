---
title: "Segment Tree"
description: "구간 질의와 점 갱신을 O(log N)에 처리하는 세그먼트 트리의 원리와 구현을 정리합니다."
publishedAt: 2026-07-26
tags: ["Algorithm", "Data Structure", "Segment Tree"]
draft: true
source: "https://app.notion.com/p/24e6b9674ad880e685abc32a378a5f9e"
importedAt: 2026-07-26
---

> Notion Study 페이지의 Algorithm 학습 기록에서 가져온 콘텐츠입니다.

- 구간 정보(합, 최소/최대 값 등)를 빠르게 갱신 및 조회 가능한 자료구조
  - 배열 크기 N에 대해 O(log N) 안에 update & query 가능

**\[세그먼트 트리 구현 - 구간합 ver\]**
<details>
<summary>** 초기화 Build - O(N)**</summary>
```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> arr, tree;

int build(int n, int s, int e) {
    if (s == e) return tree[n] = arr[s]; // leaf
    int m = (s + e) / 2;
    int l = build(n*2, s, m), r = build(n*2+1, m+1, e);
    return tree[n] = l + r; 
}
```
</details>
<details>
<summary>** query - O(log N)**</summary>
```cpp
int query(int n, int s, int e, int l, int r) {
    if (r < s || e < l) return 0; // 불포함
    if (l <= s && e <= r) return tree[node]; // 완전 포함
    int m = (s + e) / 2;
    return query(n*2, s, m, l, r) + query(n*2 + 1, m + 1, e, l, r);
}
```
</details>
<details>
<summary>** update - O(log N)**</summary>
```cpp
void update(int n, int s, int e, int idx, int val) {
    if (idx < s || idx > e) return; // 범위 밖
    if (s == e) { // leaf
        tree[n] = val;
        return;
    }
    int m = (s + e) / 2;
    update(n*2, s, m, idx, val);
    update(n*2+1, m+1, e, idx, val);
    tree[n] = tree[n*2] + tree[n*2+1];
}
```
</details>
<details>
<summary>사용 예제</summary>
```cpp
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N; cin >> N;
    arr.resize(N);
    tree.resize(4*N);
    for (int i = 0; i < N; i++) cin >> arr[i];

    build(1, 0, N-1);

    cout << "구간 합 [1, 3]: " << query(1, 0, N-1, 1, 3) << '\n';

    update(1, 0, N-1, 2, 10);
    cout << "갱신 후 구간 합 [1, 3]: " << query(1, 0, N-1, 1, 3) << '\n';
}

```
</details>
