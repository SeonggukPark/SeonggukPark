---
title: "Euler Tour Technique"
description: "트리의 서브트리를 연속 구간으로 변환하는 오일러 투어 테크닉을 정리합니다."
publishedAt: 2026-07-26
tags: ["Algorithm", "Tree", "Euler Tour"]
draft: true
source: "https://app.notion.com/p/24e6b9674ad880e685abc32a378a5f9e"
importedAt: 2026-07-26
---

> Notion Study 페이지의 Algorithm 학습 기록에서 가져온 콘텐츠입니다.

- 트리나 그래프의 탐색 순서를 배열에 기록한 뒤, 이를 기반으로 구간 쿼리 or 서브트리 연산을 쉽게 처리하는 기법
  - 보통 세그먼트 트리/펜웍 트리/sparse table 같은 애랑 같이 씀
  - 백준에 [회사 문화 시리즈](https://www.acmicpc.net/search#q=%ED%9A%8C%EC%82%AC%20%EB%AC%B8%ED%99%94&c=Problems)가 바이블 문제들

**\[아이디어\]**
  - DFS 순으로 노드 방문하며 각 노드가 **시작점**에 진입한 시간과 **종료점**에 나간 시간 기록
  - 트리는 계층 구조 → 한 노드의 서브 트리 노드들이 DFS 배열에서 연속한 구간에 모임
  - 이를 통해 서브트리에 대한 쿼리 → 배열에서의 연속 구간 질의로 변환 가능

\[구현\]
<details>
<summary>**Ver. 1) 단순 진입 기록**</summary>
    - 노드 방문 시점만 기록
```cpp
vector<int> in, out, euler;
int timer = 0;

void dfs(int u, int p) {
    in[u] = ++timer;      // 들어올 때 기록
    euler.push_back(u);   // 오일러 경로에 추가
    for (auto v : adj[u]) {
        if (v == p) continue;
        dfs(v, u);
    }
    out[u] = timer;       // 나올 때 기록
}
```
</details>
<details>
<summary>**Ver. 2) 진입·퇴장 모두 기록**</summary>
    - 간선 기반 쿼리, LCA, 경로 문제 등에서 자주 사용
```cpp
void dfs(int u, int p) {
    euler.push_back(u); // 진입
    for (auto v : adj[u]) {
        if (v == p) continue;
        dfs(v, u);
        euler.push_back(u); // 자식에서 돌아올 때 재방문
    }
}
```
</details>
