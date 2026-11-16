import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BlogList } from "./BlogList";
import { Blogs } from "./Blogs";
import { formatDate } from "../lib/utils";

const publishedAt = "2025-12-30T13:29:25.193Z";
const updatedAt = "2026-02-21T23:07:49.701Z";

function render(
  Component: typeof BlogList | typeof Blogs,
  updated: string | undefined,
) {
  const post = {
    slug: "example-post",
    title: "Example post",
    description: "An example post.",
    publishedAt,
    updatedAt: updated,
    featured: false,
    readingTime: 5,
  };
  return renderToStaticMarkup(Component({ posts: [post] }));
}

describe("blog list dates", () => {
  for (const Component of [BlogList, Blogs]) {
    describe(Component.name, () => {
      it("shows the publish date when the post was never updated", () => {
        const html = render(Component, undefined);
        expect(html).toContain(`Published ${formatDate(publishedAt)}`);
        expect(html).not.toContain("Updated ");
      });

      it("shows only the update date when the post was updated", () => {
        const html = render(Component, updatedAt);
        expect(html).toContain(`Updated ${formatDate(updatedAt)}`);
        expect(html).not.toContain("Published ");
        expect(html).not.toContain(formatDate(publishedAt));
      });
    });
  }
});
