import {
  getAllPosts,
  getAllProjects,
  getPostBySlug,
  getProjectBySlug,
} from "@/lib/mdx";

export const dynamic = "force-static";

const baseUrl = "https://www.atharvdange.com";

export function GET() {
  const projects = getAllProjects().map(
    (p) =>
      `## ${p.title}\n\nURL: ${baseUrl}/projects/${p.slug}\nStack: ${p.stack.join(", ")}\n\n${getProjectBySlug(p.slug).content.trim()}`,
  );

  const posts = getAllPosts().map(
    (p) =>
      `## ${p.title}\n\nURL: ${baseUrl}/blog/${p.slug}\nPublished: ${p.publishedAt}\n\n${getPostBySlug(p.slug).content.trim()}`,
  );

  const body = `# Atharv Dange

> Full Stack Engineer and Co-Founder of SpaceBuilder. Building production systems end-to-end, from auth protocols and API design to polished user interfaces.

# Projects

${projects.join("\n\n---\n\n")}

# Blog

${posts.join("\n\n---\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
