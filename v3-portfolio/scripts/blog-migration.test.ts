import { describe, expect, it } from "vitest";
import matter from "gray-matter";
import { convertPost, planImport } from "./blog-migration.mts";

const post = {
  title: 'A title: with "quotes"',
  slug: "example-post",
  summary: "A summary\nwith two lines.",
  content: "## Example\n\n```ts\nconst value = { count: 1 };\n```\n",
  publishedDate: "2026-01-01T12:30:00.000Z",
  updatedAt: new Date("2026-02-01T12:30:00.000Z"),
  isPublished: true,
  bannerImage: "https://res.cloudinary.com/example/image.png",
  seoTitle: "SEO title",
  seoDescription: "SEO description",
  seoKeywords: ["TypeScript"],
  category: "JavaScript",
  tags: ["Node.js"],
};

describe("MongoDB post conversion", () => {
  it("preserves metadata, dates, banner, and the Markdown body", () => {
    const converted = convertPost(post);
    expect(converted?.slug).toBe(post.slug);
    const parsed = matter(converted?.mdx ?? "");
    expect(parsed.data).toMatchObject({
      title: post.title,
      summary: post.summary,
      publishedAt: post.publishedDate,
      updatedAt: post.updatedAt.toISOString(),
      description: post.seoDescription,
      cover: post.bannerImage,
      seoTitle: post.seoTitle,
      seoKeywords: post.seoKeywords,
      category: post.category,
      tags: post.tags,
      featured: false,
    });
    expect(parsed.content).toBe(`![${post.title}](${post.bannerImage})\n\n${post.content}`);
  });

  it("uses the summary when no SEO description exists", () => {
    const converted = convertPost({ ...post, seoDescription: "", bannerImage: "" });
    expect(matter(converted?.mdx ?? "").data.description).toBe(post.summary);
    expect(matter(converted?.mdx ?? "").content).toBe(post.content);
  });

  it("skips unpublished posts and rejects unknown publication status", () => {
    expect(convertPost({ ...post, isPublished: false })).toBeNull();
    expect(() => convertPost({ ...post, isPublished: undefined })).toThrow("publication status");
  });

  it.each([
    { slug: "../../outside" }, { content: "" }, { title: "" },
    { publishedDate: "invalid" }, { updatedAt: "invalid" },
    { tags: [123] }, { seoKeywords: "keywords" },
    { bannerImage: "javascript:alert(1)" },
  ])("rejects malformed source fields: %j", (invalid) => {
    expect(() => convertPost({ ...post, ...invalid })).toThrow();
  });

  it.each([null, "not a post", []])("rejects a non-object: %j", (value) => {
    expect(() => convertPost(value)).toThrow("post object");
  });
});

describe("import plan", () => {
  it("plans new posts and skips identical files on a second run", () => {
    const planned = planImport([post], new Map(), {});
    expect(planned).toHaveLength(1);
    const existing = new Map(planned.map((item) => [item.slug, item.mdx]));
    expect(planImport([post], existing, {})).toEqual([]);
  });

  it("preserves local versions of aliased posts", () => {
    expect(planImport([post], new Map([["local-post", "Local MDX"]]), {
      "example-post": "local-post",
    })).toEqual([]);
    expect(() => planImport([post], new Map(), { "example-post": "missing" }))
      .toThrow("Missing alias target");
  });

  it("refuses collisions, duplicate source slugs, and invalid snapshots", () => {
    expect(() => planImport([post], new Map([[post.slug, "Local MDX"]]), {}))
      .toThrow("Refusing to overwrite");
    expect(() => planImport([post, post], new Map(), {})).toThrow("Duplicate source slug");
    expect(() => planImport({}, new Map(), {})).toThrow("array of posts");
  });
});
