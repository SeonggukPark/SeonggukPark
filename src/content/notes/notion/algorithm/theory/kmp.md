---
title: "KMP"
description: "LPS 배열을 이용해 문자열 패턴을 O(N+M)에 검색하는 KMP 알고리즘을 정리합니다."
publishedAt: 2026-07-26
tags: ["Algorithm", "String", "KMP"]
draft: true
source: "https://app.notion.com/p/24e6b9674ad880e685abc32a378a5f9e"
importedAt: 2026-07-26
---

> Notion Study 페이지의 Algorithm 학습 기록에서 가져온 콘텐츠입니다.

- 설명 in 문제: [백준 1786 - 찾기](https://www.acmicpc.net/problem/1786)
  - 본문 `S` 길이 `N`, 패턴 `P` 길이 `M`에 대해 **O(N+M)** 시간에 `P`가 `S`에 등장하는 모든 위치를 찾아내는 **문자열 검색 알고리즘**
  - 이미 일치했던 접두사 정보를 활용해서 불필요한 돌아가기 없애기

\[아이디어\]
  - **LPS(Longest Proper Prefix which is also Suffix) 배열**
    - `lps[i]` = `P[0..i]`의 접두사이면서 접미사인 부분 문자열의 최대 길이.
    - 예) `P = "ababaca"`라면 `lps = [0,0,1,2,3,0,1]`.
  - **검색 단계**
    - 본문을 좌→우로 한 번만 훑으면서, 불일치가 발생하면 `lps`를 이용해 **패턴의 이동량**을 즉시 결정 (본문 인덱스는 뒤로 안 감).

\[구현\]
<details>
<summary>1. LPS 전처리</summary>
```cpp
vector<int> build_lps(const string& P) {
    int m = (int)P.size();
    vector<int> lps(m, 0);
    int len = 0; // 지금까지 일치한 접두사 길이
    
    for (int i = 1; i < m; ++i) {
        // 불일치 시, 더 짧은 후보 접두사로 점프해서 재비교
        while (len > 0 && P[i] != P[len]) len = lps[len - 1];
        // 일치면 길이 1 증가
        if (P[i] == P[len]) ++len;
        lps[i] = len;
    }
    return lps;
}

```
</details>
<details>
<summary>2. 검색</summary>
```cpp
vector<int> kmp_search(const string& S, const string& P) {
    vector<int> res;
    int n = (int)S.size(), m = (int)P.size();
    if (m == 0 || n < m) return res;      // 빈 패턴/길이 부족 처리

    vector<int> lps = build_lps(P);       // 전처리 O(M)
    int j = 0;                            // 패턴 인덱스(= 현재까지 맞춘 접두사 길이)

    for (int i = 0; i < n; ++i) {         // 본문을 0..n-1 한 번만 훑음
        // 불일치: 패턴만 점프. 본문 i는 그대로 유지!
        while (j > 0 && S[i] != P[j]) j = lps[j - 1];

        // 일치: 접두사 길이 1 증가(패턴 포인터 전진)
        if (S[i] == P[j]) ++j;

        // 패턴 전체 일치
        if (j == m) {
            res.push_back(i - m + 1);     // 매치 시작 위치 기록
            j = lps[j - 1];               // 겹치는 매치 허용(패턴 점프)
        }
    }
    return res;                            // 총 시간 O(N+M)
}
```

</details>
