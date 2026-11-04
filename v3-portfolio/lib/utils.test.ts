import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { extractHeadings } from "./utils";
import { MdxRenderer } from "../components/mdx/MdxRenderer";

describe("table of contents heading IDs", () => {
  it("matches rendered anchors for repeated headings and suffix collisions", async () => {
    const source = [
      "## Step-by-Step Internal Process",
      "### Step-by-Step Internal Process",
      "## Step-by-Step Internal Process-1",
      "## Step-by-Step Internal Process",
    ].join("\n\n");
    const items = extractHeadings(source);
    const html = renderToStaticMarkup(await MdxRenderer({ source }));
    const renderedIds = [...html.matchAll(/<h[23] id="([^"]+)"/g)]
      .map((match) => match[1]);

    expect(items.map((item) => item.id)).toEqual(renderedIds);
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    expect(items.map((item) => item.level)).toEqual([2, 3, 2, 2]);
  });

  it("resets IDs for each document", () => {
    const source = "## Overview\n\n## Overview";
    extractHeadings(source);
    expect(extractHeadings(source).map((item) => item.id)).toEqual([
      "overview", "overview-1",
    ]);
  });
});
