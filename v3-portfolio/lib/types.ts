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
};

export type BlogFrontmatter = {
  title: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
  description: string;
};

export type ProjectMeta = ProjectFrontmatter & {
  slug: string;
  readingTime: number;
};

export type BlogMeta = BlogFrontmatter & {
  slug: string;
  readingTime: number;
};
