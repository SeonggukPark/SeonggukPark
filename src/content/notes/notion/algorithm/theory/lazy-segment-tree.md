---
title: "Lazy Propagation Segment Tree"
description: "구간 갱신을 효율적으로 처리하는 느리게 갱신되는 세그먼트 트리를 정리합니다."
publishedAt: 2026-07-26
tags: ["Algorithm", "Data Structure", "Segment Tree"]
draft: true
source: "https://app.notion.com/p/24e6b9674ad880e685abc32a378a5f9e"
importedAt: 2026-07-26
---

> Notion Study 페이지의 Algorithm 학습 기록에서 가져온 콘텐츠입니다.

- 기존 세그먼트 트리 → 구간 합이 O(N)까지 커짐
  - lazy 배열 → 아직 자식에게 전달하지 않은 업데이트 값 저장
  - query & update 시 → lazy 먼저 처리

**\[세그먼트 트리 with lazy propagation 구현 - 구간합 ver\]**
<details>
<summary>** Build(초기화) - O(N)**</summary>
```cpp
#include <iostream>
#include <vector>
#define ll long long
using namespace std;

vector<ll> arr, tree, lazy;

ll build(int n, int s, int e){
if(s == e) return tree[n] = arr[s];
int m = s + (e - s) / 2;
return tree[n] = build(n*2, s, m) + build(n*2+1, m+1, e);	
}
```
</details>
<details>
<summary>**Push down(lazy 값 실제 반영) - O(1)**</summary>
```cpp
void push_down(int n, int s, int e){
if(lazy[n] != 0){
tree[n] += (e - s + 1) * lazy[n];
if(s != e){ // leaf node 아니면 자식한테 prop
lazy[node*2] += lazy[node];
lazy[node*2 + 1] += lazy[node];
}
lazy[node] = 0; // 현재 lazy 값 초기화
}
}
```
</details>
<details>
<summary>** update - O(log N)**</summary>
```cpp
void update(int n, int s, int e, int l, int r, ll dif){
push_down(node, s, e); // 현재 lazy 부터 처리
if(s > r || e < l) return; // 1. 완전 불일치
if(l <= s && e <= r){ // 2. 트리가 쿼리 범위에 완전 포함
lazy[node] += diff;
push_down(node, s, e);
return;
}
// 3. 일부 포함
int m = s + (e - s) / 2;
update(n*2, s, m, l, r, dif);
update(n*2 + 1, m + 1, e, l, r, dif);
tree[n] = tree[n*2] + tree[n*2+1];
}
```
</details>
<details>
<summary>** query - O(log N)**</summary>
<details>
<summary>사용 예제</summary>
```cpp
int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int N, M; // N=배열 크기, M=연산 수
    cin >> N >> M;
    arr.resize(N);
    tree.resize(4*N);
    lazy.resize(4*N);
    for (int i = 0; i < N; i++) cin >> arr[i];

    build(1, 0, N-1);

    while (M--) {
        int op; cin >> op;
        if (op == 1) { // 구간 업데이트
            int l, r, diff;
            cin >> l >> r >> diff;
            update(1, 0, N-1, l, r, diff);
        } else { // 구간 합 쿼리
            int l, r;
            cin >> l >> r;
            cout << query(1, 0, N-1, l, r) << '\n';
        }
    }
}
```
</details>
</details>
```cpp
ll query(int n, int s, int e, int l, int r){
push_down(n, s, e);
if(r < s || e < l) return 0; // 1. 완전 불일치
if(l <= s && e <= r) return tree[n];
int m = s + (e - s) / 2;
return query(n*2, s, m, l, r) + query(n*2+1, m+1, e, l, r);
}
```
