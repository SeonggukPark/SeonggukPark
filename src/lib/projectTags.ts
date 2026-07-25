import { skills } from "../data/site";

const resumeSkillTags = new Set<string>(skills.flatMap((group) => [...group.items]));

export function getProjectSkillTags(tags: readonly string[]) {
  return tags.filter((tag) => resumeSkillTags.has(tag));
}
