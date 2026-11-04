import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MdxRenderer } from "./MdxRenderer";
import { getPostBySlug } from "../../lib/mdx";

describe("ASCII diagram rendering", () => {
  it("keeps diagram whitespace and attaches the diagram language for styling", async () => {
    const source = "```ascii\n┌──────────┐\n│  Server  │\n└──────────┘\n```";
    const html = renderToStaticMarkup(await MdxRenderer({ source }));
    expect(html).toContain('data-language="ascii"');
    expect(html).toContain("│  Server  │");
    expect(html).toContain("data-rehype-pretty-code-figure");
  });

  it("styles each diagram in an imported post", async () => {
    const source = getPostBySlug("array-flatten-in-javascript").content;
    const html = renderToStaticMarkup(await MdxRenderer({ source }));
    const diagrams = [...source.matchAll(/^```ascii\r?$/gm)].length;
    expect([...html.matchAll(/<pre[^>]*data-language="ascii"/g)]).toHaveLength(diagrams);
  });
});
