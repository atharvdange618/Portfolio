export type ProjectStatus = "active" | "completed" | "archived";

export type ProjectFrontmatter = {
  title: string;
  status: ProjectStatus;
  featured: boolean;
  stack: string[];
  startedAt: string;
  updatedAt: string;
  github: string;
  live: string;
  description: string;
  // Path under /public, 16:9 screenshot of the running product
  cover?: string;
};

export type BlogFrontmatter = {
  title: string;
  publishedAt: string;
  updatedAt?: string;
  featured: boolean;
  description: string;
  summary?: string;
};

export type ProjectMeta = ProjectFrontmatter & {
  slug: string;
  readingTime: number;
};

export type BlogMeta = BlogFrontmatter & {
  slug: string;
  readingTime: number;
};
