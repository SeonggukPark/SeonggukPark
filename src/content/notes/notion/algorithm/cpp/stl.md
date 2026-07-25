---
title: "STL"
description: "알고리즘 문제 해결에 자주 사용하는 C++ STL 컨테이너의 활용 차이를 정리합니다."
publishedAt: 2026-07-26
tags: ["Algorithm", "C++", "STL"]
draft: true
source: "https://app.notion.com/p/3a86b9674ad8803dba41c73c63294d00"
importedAt: 2026-07-26
---

> Notion Study 페이지의 Algorithm 학습 기록에서 가져온 콘텐츠입니다.

<details>
<summary>**\[vector\] **emplace_back vs push_back</summary>
![](/SeonggukPark/images/notion/notes/algorithm-1.png)
- **이미 있는 객체**를 넣을 땐 `push_back`.
- **컨테이너 내부에서 직접 만들고** 복사/이동을 줄이고 싶으면 `emplace_back`.
- 둘 다 **시간 복잡도는 amortized O(1)** 이나, `emplace_back`이 불필요한 이동/복사를 없애 잠재적 성능 이점을 제공.
</details>
<details>
<summary>**\[array\]** C-스타일 배열 vs array</summary>
![](/SeonggukPark/images/notion/notes/algorithm-2.png)
- 메모리·성능은 같고, `std::array`가 **사이즈·복사·STL 호환·타입 안전** 면에서 훨씬 편하다. 특별한 이유(레거시 인터페이스, C API 협업)가 없다면 `std::array`를 사용하는 편이 실수를 줄이고 코드 품질을 높인다.<br><br>
</details>
