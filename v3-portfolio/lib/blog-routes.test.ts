import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import config from "../next.config";
import aliases from "../content/blog-redirects.json";
import { getAllPosts, getPostBySlug } from "./mdx";
import sitemap from "../app/sitemap";
import { GET as feed } from "../app/feed.xml/route";
import { GET as llms } from "../app/llms.txt/route";
import { GET as fullText } from "../app/llms-full.txt/route";

describe("blog content", () => {
  it("contains no emoji in post bodies or frontmatter", () => {
    const emoji = new RegExp("\\p{RGI_Emoji}", "v");
    for (const post of getAllPosts()) {
      const source = readFileSync(`content/blog/${post.slug}.mdx`, "utf8");
      expect(emoji.test(source), post.slug).toBe(false);
    }
  });
});

describe("blog URL migration", () => {
  it("redirects the old index and post URLs permanently", async () => {
    const redirects = await config.redirects?.();
    expect(redirects).toContainEqual({
      source: "/blog/:path*", destination: "/blogs/:path*", permanent: true,
    });
    for (const [oldSlug, slug] of Object.entries(aliases)) {
      expect(getPostBySlug(slug).content.length).toBeGreaterThan(0);
      for (const prefix of ["/blog", "/blogs"]) {
        expect(redirects).toContainEqual({
          source: `${prefix}/${oldSlug}`, destination: `/blogs/${slug}`, permanent: true,
        });
      }
      expect(getAllPosts().some((post) => post.slug === oldSlug)).toBe(false);
    }
  });

  it("publishes every canonical post through the sitemap, RSS, and text indexes", async () => {
    const urls = sitemap().map((entry) => entry.url);
    const rss = await feed().text();
    const index = await llms().text();
    const text = await fullText().text();
    for (const post of getAllPosts()) {
      const url = `https://www.atharvdange.com/blogs/${post.slug}`;
      expect(urls).toContain(url);
      expect(rss).toContain(`<link>${url}</link>`);
      expect(index).toContain(url);
      expect(text).toContain(url);
    }
    expect(/\.com\/blog(?:\/|<|\s)/.test([urls.join("\n"), rss, index].join("\n"))).toBe(false);
  });
});
