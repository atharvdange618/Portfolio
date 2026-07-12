import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  ProjectFrontmatter,
  BlogFrontmatter,
  ProjectMeta,
  BlogMeta,
} from "./types";

const contentRoot = path.join(process.cwd(), "content");

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 250;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function getFileSlugs(dir: string): string[] {
  const fullPath = path.join(contentRoot, dir);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllProjects(): ProjectMeta[] {
  const slugs = getFileSlugs("projects");

  return slugs
    .map((slug) => {
      const { data, content } = readMdxFile("projects", slug);
      const frontmatter = data as ProjectFrontmatter;
      return {
        ...frontmatter,
        slug,
        readingTime: calculateReadingTime(content),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    );
}

export function getFeaturedProjects(): ProjectMeta[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string) {
  return readMdxFile("projects", slug);
}

export function getAllPosts(): BlogMeta[] {
  const slugs = getFileSlugs("blog");

  return slugs
    .map((slug) => {
      const { data, content } = readMdxFile("blog", slug);
      const frontmatter = data as BlogFrontmatter;
      return {
        ...frontmatter,
        slug,
        readingTime: calculateReadingTime(content),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getRecentPosts(count: number = 3): BlogMeta[] {
  return getAllPosts().slice(0, count);
}

export function getPostBySlug(slug: string) {
  return readMdxFile("blog", slug);
}

function readMdxFile(dir: string, slug: string) {
  const filePath = path.join(contentRoot, dir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return { data, content, slug };
}
