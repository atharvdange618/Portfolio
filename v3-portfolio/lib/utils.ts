import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

interface MdxNode {
  type: string;
  tagName?: string;
  properties?: {
    className?: string[];
    [key: string]: unknown;
  };
  children?: MdxNode[];
  value?: string;
}

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(() => (tree: MdxNode) => {
      function walk(node: MdxNode) {
        if (!node.children) return;
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];
          if (
            child.type === "element" &&
            child.tagName === "pre" &&
            child.children &&
            child.children.length === 1 &&
            child.children[0].tagName === "code" &&
            child.children[0].properties &&
            Array.isArray(child.children[0].properties.className) &&
            child.children[0].properties.className.includes("language-mermaid")
          ) {
            const codeNode = child.children[0];
            const rawText = (codeNode.children || [])
              .filter((c) => c.type === "text")
              .map((c) => c.value || "")
              .join("");

            node.children[i] = {
              type: "element",
              tagName: "div",
              properties: {
                className: ["mermaid"],
              },
              children: [
                {
                  type: "text",
                  value: rawText.trim(),
                },
              ],
            };
          } else {
            walk(child);
          }
        }
      }
      walk(tree);
    })
    .use(rehypePrettyCode, {
      theme: "tokyo-night",
      keepBackground: true,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);
  return result.toString();
}
