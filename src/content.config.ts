import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const shared = {
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false)
};

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    ...shared,
    period: z.string(),
    category: z.string(),
    role: z.string(),
    featured: z.boolean().default(false),
    repository: z.url().optional(),
    demo: z.url().optional(),
    outcomes: z.array(z.string()).default([])
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

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    ...shared,
    publishedAt: z.coerce.date(),
    repository: z.url().optional()
  })
});

export const collections = { projects, posts, notes };
