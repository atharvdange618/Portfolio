import { getAllPosts, getAllProjects } from "@/lib/mdx";

export const dynamic = "force-static";

const baseUrl = "https://www.atharvdange.com";

export function GET() {
  const projects = getAllProjects()
    .map((p) => `- [${p.title}](${baseUrl}/projects/${p.slug}): ${p.description}`)
    .join("\n");

  const posts = getAllPosts()
    .map((p) => `- [${p.title}](${baseUrl}/blog/${p.slug}): ${p.description}`)
    .join("\n");

  const body = `# Atharv Dange

> Full Stack Engineer and Co-Founder of SpaceBuilder. Building production systems end-to-end, from auth protocols and API design to polished user interfaces.

The full text of every project and post is at ${baseUrl}/llms-full.txt

## Projects

${projects}

## Blog

${posts}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
