import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const shared = {
  title: z.string(),
  description: z.string(),
  cardPoints: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  source: z.string().optional(),
  importedAt: z.coerce.date().optional()
};

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    ...shared,
    period: z.string(),
    categories: z.array(z.enum(["Embedded", "Linux", "AI"])).min(1),
    role: z.string(),
    featured: z.boolean().default(false),
    repository: z.url().optional(),
    demo: z.url().optional(),
    outcomes: z.array(z.string()).default([]),
    relatedNotes: z.array(z.string()).default([])
  })
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    ...shared,
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    series: z.string().optional()
  })
});

const topics = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/topics" }),
  schema: z.object({
    ...shared,
    period: z.string(),
    status: z.enum(["완료", "진행 중", "중단", "예정"]),
    order: z.number(),
    noteIds: z.array(z.string()).default([]),
    repository: z.url().optional()
  })
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    ...shared,
    publishedAt: z.coerce.date(),
    repository: z.url().optional(),
    relatedProjects: z.array(z.string()).default([])
  })
});

export const collections = { projects, posts, topics, notes };
