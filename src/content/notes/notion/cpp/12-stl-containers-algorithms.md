---
title: "C++ 12. STL 컨테이너와 알고리즘"
description: "순차·연관·어댑터 컨테이너, 반복자와 STL 알고리즘을 정리한 학습 기록입니다."
publishedAt: 2026-07-24
tags: ["C++", "Programming"]
draft: true
source: "https://app.notion.com/p/2cb6b9674ad88079978df5115f69e3e2"
importedAt: 2026-07-24
---

# (1) 컨테이너와 반복자
## 컨테이너
- 실제 개발 현장에서 많이 사용
- 같은 타입의 여러 객체를 저장할 수 있는 묶음 단위의 데이터 구조
- 데이터를 저장하고 관리, 저장된 원소에 접근할 수 있는 멤버 함수 제공
- 한 가지 타입의 객체들만 보관 가능

## 순차 컨테이너
```c++
// [컨테이너 공용 함수]
// 반복자
iterator begin();
iterator end();
const_iterator begin() const;
const_iterator end() const;

const_iterator cbegin() const;
const_iterator cend() const;

reverse_iterator rbegin();
reverse_iterator rend();
const_reverse_iterator rbegin() const;
const_reverse_iterator rend() const;

const_reverse_iterator crbegin() const;
const_reverse_iterator crend() const;

// 용량/상태
bool empty() const;
size_type size() const;
size_type max_size() const;

// 수정
void clear();

// 기타
void swap(Container& other) noexcept;   // 멤버 swap
```
- 데이터가 순서대로 삽입되는 컨테이너

### **배열(std::array)**
- 고정된 크기의 배열을 담는 컨테이너
- \<array\> 헤더의 std 네임스페이스에 정의
- 주로 크기가 고정된 배열 다룰 때 사용, 인덱스 통해 원소에 빠르게 접근 가능

```c++
// [배열 컨테이너 선언]
#include <array>
using namespace std;

array<데이터_형식, 크기> 객체_이름;

// [예시]
array<int, 5> myArray{1, 2, 3, 4, 5};
```
- 인덱스 접근 시, \[ \] 보다 at 함수 사용할 것
→ 배열 유효 범위 밖의 인덱스 접근 시, \[ \]는 런타임 에러 발생하지만 at은 예외 처리

### **벡터(std::vector)**
- 동적 길이의 배열 컨테이너
- 임의의 위치에 저장된 원소에 빠르게 접근 가능
- 표준 컨테이너 가운데 가장 많이 활용
- \<vector\> 헤더의 std 네임스페이스에 정의
```c++
// [벡터 컨테이너 선언]
#include <vector>
using namespace std;

vector<데이터_형식> 객체_이름;
vector<데이터_형식> 객체_이름(크기);
vector<데이터_형식> 객체_이름(크기, 초깃값);
vector<데이터_형식> 객체_이름 = {값1, 값2, ... };

// [예시]
vector<int> vec1; // 크기 미지정
vector<int> vec2(5); // 크기가 5인 벡터 선언
vector<int> vec3(5, 1); // 크기가 5인 벡터를 1로 초기화
vector<int> vec4 = {1, 2, 3, 4, 5}; // 유니폼 초기화

// [vector 함수]
// 용량 관리
size_type capacity() const;
void reserve(size_type new_cap);
void shrink_to_fit();

// 연속 메모리 직접 접근(vector 핵심)
T* data() noexcept;
const T* data() const noexcept;
```
→ insert, erase 함수는 벡터의 앞부분에서 발생한다면 거의 \~O(N)의 시간이 걸림
→ 원소 삽입, 제거가 빈번하다면 다른 컨테이너를 사용할 것

**함수 템플릿 활용**
```c++
template <typename T>
void print_vector_all(vector<T> &vec)
```
→ 템플릿 매개변수 T를 활용해 다양한 형식을 전달 받아 출력 가능

**정적 반복자**
- const_iterator: 컨테이너 요소를 read-only로 순회하기 위한 반복자
```c++
vector<int>::const_iterator const_it_begin = vec.cbegin();
vector<int>::const_iterator const_it_end = vec.cend();
```

**리버스 반복자**
- 컨테이너 **끝에서 시작해서 앞쪽으로 역방향 순회**하기 위한 반복자
```c++
for (vector<int>::reverse_iterator it = vec.rbegin(); it != vec.rend(); it++){
cout << *it << endl;
}
```

### **리스트(std::list)**
- linked list를 구현한 컨테이너
- 삽입과 삭제가 빈번할 때 유용
```c++
// [list 함수]
void splice(const_iterator pos, list& other);
void splice(const_iterator pos, list& other, const_iterator it);
void splice(const_iterator pos, list& other,
            const_iterator first, const_iterator last);
            
void sort();
template<class Compare> void sort(Compare comp);

void merge(list& other);
template<class Compare> void merge(list& other, Compare comp);

void reverse();

void unique();
template<class BinaryPredicate> void unique(BinaryPredicate p);

void remove(const T& value);
template<class UnaryPredicate> void remove_if(UnaryPredicate p);
```

### **덱(std::deque)**
- double-ended queue
- 벡터와 달리 여러 메모리 블록을 나눠서 저장 → 벡터에서 일어나는 복사 저장 발생 X
```c++
// [deque 함수]
void push_front(const T& value);
void pop_front();

template<class... Args>
reference emplace_front(Args&&... args);
```
![C++ 12. STL 컨테이너와 알고리즘 이미지](/SeonggukPark/images/notion/notes/cpp/12-stl-containers-algorithms-1.png)

## 연관 컨테이너
- 키(key)를 기준으로 원소를 저장·검색·정렬하는 컨테이너
- 내부 구조가 트리, 해시 테이블과 같은 자료 구조 → query 작업의 시복이 O(log n) or O(1)에 수렴
![C++ 12. STL 컨테이너와 알고리즘 이미지](/SeonggukPark/images/notion/notes/cpp/12-stl-containers-algorithms-2.png)

공용 멤버 함수
<table>
<tr>
<td>함수</td>
<td>설명</td>
</tr>
<tr>
<td>`insert()`</td>
<td>원소 삽입</td>
</tr>
<tr>
<td>`erase()`</td>
<td>원소 삭제</td>
</tr>
<tr>
<td>`find(key)`</td>
<td>key 검색 (없으면 `end()` 반환)</td>
</tr>
<tr>
<td>`count(key)`</td>
<td>key 개수 (`set/map`은 0 또는 1)</td>
</tr>
<tr>
<td>`clear()`</td>
<td>전체 삭제</td>
</tr>
<tr>
<td>`empty()`</td>
<td>비어있는지 확인</td>
</tr>
<tr>
<td>`size()`</td>
<td>원소 개수</td>
</tr>
<tr>
<td>`begin() / end()`</td>
<td>반복자</td>
</tr>
<tr>
<td>`cbegin() / cend()`</td>
<td>const 반복자</td>
</tr>
</table>
![C++ 12. STL 컨테이너와 알고리즘 이미지](/SeonggukPark/images/notion/notes/cpp/12-stl-containers-algorithms-3.png)

- multiset의 erase는 중복 값 모두 제거
- std::make_pair 함수 → 두 값을 묶어 std::pair 객체로 만드는 함수
- find 함수 사용 시, 찾는 값이 존재 안하면 end() 리턴

## 컨테이너 어댑터
- 기존 컨테이너를 내부적으로 사용하면서, 특정 자료구조의 인터페이스만 제한적으로 제공
![C++ 12. STL 컨테이너와 알고리즘 이미지](/SeonggukPark/images/notion/notes/cpp/12-stl-containers-algorithms-4.png)

## 반복자(이터레이터)
- 컨테이너의 내부 원소들을 순회하는 객체
- 포인터와 비슷한 동작
- 컨테이너 특성과 반복자의 제약을 고려해야 함

![C++ 12. STL 컨테이너와 알고리즘 이미지](/SeonggukPark/images/notion/notes/cpp/12-stl-containers-algorithms-5.png)
→ end 함수는 마지막 원소의 바로 다음 위치 반환

# (2) 알고리즘
- 주로 정렬, 검색, 변환, 반복자, 집계에서 사용
- 표준 라이브러리에서 일반 함수로 제공

## 정렬
### 퀵 정렬(std::sort)
- unstable sort
- Quick Sort + Heap Sort + Insertion Sort → 최악의 상황에서도 O(NlogN)
```c++
std::sort(begin, end);
std::sort(begin, end, comp);
```

### 안정 정렬(std::stable_sort)
- sort보다 약간 느림
- 정렬 키가 여러 개일때, 이전 정렬 결과를 유지
```c++
std::stable_sort(begin, end);
```

### 부분 정렬(std::partial_sort)
- 상위/하위 몇 개 추출에 적합
- 전체 정렬보다 훨씬 빠름
```c++
std::partial_sort(begin, middle, end);
```
→ \[begin, middle) 구간만 정렬 (나머지는 정렬 보장 X)

## 탐색
### 찾기(std::find)
- 선형 탐색 → O(N)
- 처음 발견한 원소의 iterator 리턴, 없으면 end( )
```c++
auto it = std::find(begin, end, value);
```

**+) std::distance 함수**
```c++
#include <iterator>
auto n = std::distance(first, last);

vector<int> v = {1, 2, 3, 4, 5};
auto d = std::distance(v.begin(), v.end()); // 5
```
→ first \~ last 사이의 거리(원소 개수) 반환

### 이진 탐색(std::binary_search)
- 정렬된 범위에서 특정 값 탐색 → O(log N)
- 존재 여부(true/false)만 리턴
```c++
bool exists = std::binary_search(begin, end, value);
```
