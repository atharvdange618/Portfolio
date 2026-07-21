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

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractHeadings(markdown: string): TocItem[] {
  const headings: TocItem[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)/);
    if (match) {
      const level = match[1].length as 2 | 3;
      const text = match[2]
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .trim();
      headings.push({ id: slugify(text), text, level });
    }
  }

  return headings;
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

async function markdownToHtml(markdown: string) {
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
            child.children[0].properties.className.some(
              (cls) => cls === "language-mermaid",
            )
          ) {
            const codeNode = child.children[0];
            const rawText = (codeNode.children || [])
              .reduce<string>((acc, c) => {
                if (c.type === "text") acc += c.value || "";
                return acc;
              }, "")
              .trim();

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
          } else if (child.type === "element" && child.tagName === "a") {
            if (!child.properties) {
              child.properties = {};
            }
            const href = child.properties.href;
            if (typeof href === "string" && !href.startsWith("#")) {
              child.properties.target = "_blank";
              child.properties.rel = "noopener noreferrer";
            }
            walk(child);
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
