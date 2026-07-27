export type ResumeDocument = {
  id: string;
  title: string;
  description: string;
  fileName: string;
  kind: "pdf" | "image";
};

export const resumeDocuments: readonly ResumeDocument[] = [
  {
    id: "samsung-algorithm-certificate",
    title: "삼성전자 알고리즘 교육 이수증",
    description: "삼성전자 DX부문 알고리즘 역량강화 과정 교육 이수증입니다.",
    fileName: "교육이수증_(1) 삼성전자 DX부문 알고리즘 특강.pdf",
    kind: "pdf",
  },
  {
    id: "lg-aimers-certificate",
    title: "LG Aimers 4기 교육 이수증",
    description: "LG Aimers 4기 교육 과정 이수증입니다.",
    fileName: "교육이수증_(2) LG Aimers 4기.pdf",
    kind: "pdf",
  },
  {
    id: "cj-remote-internship-certificate",
    title: "CJ Remote Internship 교육 이수증",
    description: "CJ Remote Internship 교육 과정 이수증입니다.",
    fileName: "교육이수증_(3) CJ Remote Internship.pdf",
    kind: "pdf",
  },
  {
    id: "mobis-idea-award",
    title: "현대모비스 사내 아이디어 공모전 수상 자료",
    description: "현대모비스 사내 아이디어 공모전 은상 수상 자료입니다.",
    fileName: "mobis_award.png",
    kind: "image",
  },
  {
    id: "smart-maritime-award",
    title: "스마트 해상물류 경진대회 수상 자료",
    description: "스마트 해상물류 경진대회 해양수산부 장관상 수상 자료입니다.",
    fileName: "수상_해상물류공모전.pdf",
    kind: "pdf",
  },
  {
    id: "gori-activity-certificate",
    title: "알고리즘 동아리 Gori 활동 증명서",
    description: "알고리즘 동아리 Gori 활동 증명서입니다.",
    fileName: "알고리즘 동아리 Gori 활동 증명서.pdf",
    kind: "pdf",
  },
];
