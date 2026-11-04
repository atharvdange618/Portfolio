import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BlogList } from "./BlogList";
import { Blogs } from "./Blogs";
import { formatDate } from "../lib/utils";

describe("blog list publication dates", () => {
  for (const Component of [BlogList, Blogs]) {
    describe(Component.name, () => {
      it.each([undefined, "2026-02-21T23:07:49.701Z"])(
        "shows the publish date when updatedAt is %s",
        (updatedAt) => {
          const post = {
            slug: "example-post",
            title: "Example post",
            description: "An example post.",
            publishedAt: "2025-12-30T13:29:25.193Z",
            updatedAt,
            featured: false,
            readingTime: 5,
          };
          const html = renderToStaticMarkup(Component({ posts: [post] }));
          expect(html).toContain(`Published ${formatDate(post.publishedAt)}`);
          expect(html).not.toContain("Updated ");
          if (updatedAt) expect(html).not.toContain(formatDate(updatedAt));
        },
      );
    });
  }
});
