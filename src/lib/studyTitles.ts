const contentPrefixPattern = /^.*?\d{1,2}\s*[.)]\s*/u;

export function studyContentTitle(title: string) {
  const normalized = title.trim();
  const withoutBookAndIndex = normalized.replace(contentPrefixPattern, "").trim();
  return withoutBookAndIndex || normalized;
}

export function studySubheading(title: string, index: number) {
  return `${String(index + 1).padStart(2, "0")}. ${studyContentTitle(title)}`;
}
