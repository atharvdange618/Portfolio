import matter from "gray-matter";

interface ImportedPost {
  slug: string;
  mdx: string;
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing or invalid ${field}`);
  }
  return value;
}

function dateString(value: unknown, field: string): string {
  const date = value instanceof Date ? value : new Date(requiredText(value, field));
  if (!Number.isFinite(date.getTime())) throw new Error(`Invalid ${field}`);
  return date.toISOString();
}

export function convertPost(value: unknown): ImportedPost | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Expected a post object");
  }
  const post = value as Record<string, unknown>;
  if (post.isPublished === false) return null;
  if (post.isPublished !== true) throw new Error("Missing publication status");

  const slug = requiredText(post.slug, "slug");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Invalid slug");

  const title = requiredText(post.title, "title");
  const content = requiredText(post.content, "content");
  const summary = requiredText(post.summary, "summary");
  const frontmatter: Record<string, unknown> = {
    title,
    publishedAt: dateString(post.publishedDate, "publishedDate"),
    featured: false,
    description: post.seoDescription
      ? requiredText(post.seoDescription, "seoDescription")
      : summary,
    summary,
  };
  if (post.updatedAt) frontmatter.updatedAt = dateString(post.updatedAt, "updatedAt");
  for (const field of ["category", "seoTitle"] as const) {
    if (post[field]) frontmatter[field] = requiredText(post[field], field);
  }
  for (const field of ["tags", "seoKeywords"] as const) {
    if (post[field] !== undefined) {
      const items = post[field];
      if (!Array.isArray(items) || !items.every((item: unknown) => typeof item === "string")) {
        throw new Error(`Invalid ${field}`);
      }
      frontmatter[field] = items;
    }
  }
  if (post.bannerImage) {
    const cover = requiredText(post.bannerImage, "bannerImage");
    if (!URL.canParse(cover) || new URL(cover).protocol !== "https:") {
      throw new Error("bannerImage must use HTTPS");
    }
    frontmatter.cover = cover;
  }

  // Keep Markdown and fenced code intact; every result is compiled before any writes.
  const body = frontmatter.cover
    ? `![${title.replace(/[\[\]\\]/g, "\\$&")}](${frontmatter.cover})\n\n${content}`
    : content;
  return { slug, mdx: matter.stringify(body, frontmatter) };
}

export function planImport(
  posts: unknown,
  existing: ReadonlyMap<string, string>,
  aliases: Readonly<Record<string, string>>,
): ImportedPost[] {
  if (!Array.isArray(posts)) throw new Error("Expected an array of posts");
  const seen = new Set<string>();
  const result: ImportedPost[] = [];
  for (const value of posts) {
    const post = convertPost(value);
    if (!post) continue;
    if (seen.has(post.slug)) throw new Error(`Duplicate source slug: ${post.slug}`);
    seen.add(post.slug);
    const target = Object.hasOwn(aliases, post.slug) ? aliases[post.slug] : undefined;
    if (target) {
      if (!existing.has(target)) throw new Error(`Missing alias target: ${target}`);
      continue;
    }
    const current = existing.get(post.slug);
    if (current !== undefined && current !== post.mdx) {
      throw new Error(`Refusing to overwrite existing post: ${post.slug}`);
    }
    if (current === undefined) result.push(post);
  }
  return result;
}
