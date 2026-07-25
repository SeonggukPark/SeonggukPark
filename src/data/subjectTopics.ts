export type SubjectTopicItem = {
  id: string;
  slug: string;
  label?: string;
};

export type SubjectTopicSection = {
  id: string;
  title: string;
  description: string;
  items: SubjectTopicItem[];
};

type SubjectTopicBase = {
  id: string;
  order: number;
  title: string;
  description: string;
  status: "준비 중" | "작성 중" | "공개";
  tags: string[];
};

export type SubjectTopic = SubjectTopicBase & (
  | { mode: "flat"; items: SubjectTopicItem[] }
  | { mode: "grouped"; sections: SubjectTopicSection[] }
);

export const getSubjectTopicItemCount = (topic: SubjectTopic) =>
  topic.mode === "flat"
    ? topic.items.length
    : topic.sections.reduce((count, section) => count + section.items.length, 0);

export const subjectTopics: SubjectTopic[] = [
  {
    id: "algorithm",
    order: 1,
    title: "Algorithm",
    description: "Algorithm을 공부하며 정리하는 공간입니다.",
    status: "공개",
    tags: ["Algorithm", "C++", "Data Structure", "Problem Solving"],
    mode: "grouped",
    sections: [
      {
        id: "cpp",
        title: "C++",
        description: "문제 해결에 필요한 C++ 관련 내용을 정리합니다.",
        items: [
          { id: "notion/algorithm/cpp/iterator-invalidation", slug: "iterator-invalidation" },
          { id: "notion/algorithm/cpp/stl", slug: "stl" },
          { id: "notion/algorithm/cpp/bbst", slug: "bbst" },
          { id: "notion/algorithm/cpp/floating-point", slug: "floating-point" }
        ]
      },
      {
        id: "theory",
        title: "Algorithm 이론",
        description: "개인적으로 어려워하는 알고리즘 이론을 정리합니다.",
        items: [
          { id: "notion/algorithm/theory/segment-tree", slug: "segment-tree" },
          { id: "notion/algorithm/theory/lazy-segment-tree", slug: "lazy-segment-tree" },
          { id: "notion/algorithm/theory/euler-tour-technique", slug: "euler-tour-technique" },
          { id: "notion/algorithm/theory/fenwick-tree", slug: "fenwick-tree" },
          { id: "notion/algorithm/theory/trie", slug: "trie" },
          { id: "notion/algorithm/theory/kmp", slug: "kmp" },
          { id: "notion/algorithm/theory/sqrt-decomposition", slug: "sqrt-decomposition" }
        ]
      }
    ]
  },
  {
    id: "ai",
    order: 2,
    title: "AI",
    description: "AI와 관련해 얻은 지식을 정리하는 공간입니다.",
    status: "준비 중",
    tags: ["AI"],
    mode: "flat",
    items: []
  }
];
