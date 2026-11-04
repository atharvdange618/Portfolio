import { describe, expect, it } from "vitest";
import { getAllPosts, getPostBySlug } from "./mdx";

describe("blog diagrams", () => {
  it("keeps spread and rest diagram borders and columns aligned in the source", () => {
    const source = getPostBySlug("spread-vs-rest-operators-in-javascript").content;
    const blocks = [...source.matchAll(/^```ascii\r?\n([\s\S]*?)^```/gm)];
    expect(blocks).toHaveLength(3);
    for (const block of blocks) {
      const lines = block[1].trimEnd().split(/\r?\n/);
      expect(new Set(lines.map((line) => line.length)).size).toBe(1);
      const junction = lines.find((line) => line.includes("┼"));
      if (junction) {
        const column = junction.indexOf("┼");
        for (const line of lines.filter((line) => line.split("│").length === 4)) {
          expect(line.indexOf("│", 1)).toBe(column);
        }
      }
    }
  });

  it("aligns the borders of rectangular diagram boxes", () => {
    const errors: string[] = [];
    for (const post of getAllPosts()) {
      const source = getPostBySlug(post.slug).content;
      for (const block of source.matchAll(/^```ascii\r?\n([\s\S]*?)^```/gm)) {
        const lines = block[1].split(/\r?\n/);
        for (let index = 0; index < lines.length; index++) {
          const top = /^(\s*)┌([─┬]+)┐\s*$/.exec(lines[index]);
          if (!top) continue;
          const rightColumn = top[1].length + top[2].length + 1;
          for (let row = index + 1; row < lines.length; row++) {
            if (lines[row].startsWith(`${top[1]}└`)) break;
            const side = /^(\s*)│([^│]*)│([^│]*)$/.exec(lines[row]);
            if (!side || side[1] !== top[1]) continue;
            const actual = side[1].length + side[2].length + 1;
            if (actual !== rightColumn) {
              errors.push(`${post.slug}: ${lines[row].trim()} (column ${actual}, expected ${rightColumn})`);
            }
          }
        }
      }
    }
    expect(errors).toEqual([]);
  });
});
