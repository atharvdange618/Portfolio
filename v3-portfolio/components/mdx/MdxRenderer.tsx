import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import { Callout } from "./Callout";
import Link from "next/link";
import React from "react";

interface MdxRendererProps {
  source: string;
}

// Custom rehype plugin to transform mermaid blocks
const customMermaidPlugin = () => (tree: any) => {
  function walk(node: any) {
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
          .filter((c: any) => c.type === "text")
          .map((c: any) => c.value || "")
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
};

const components = {
  Callout,
  a: ({ href, children, ...props }: any) => {
    const isAnchor = href?.startsWith("#");
    const isRelative = href?.startsWith("/");
    if (isAnchor) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      );
    }
    if (isRelative) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};

export async function MdxRenderer({ source }: MdxRendererProps) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          customMermaidPlugin,
          [
            rehypePrettyCode,
            {
              theme: "tokyo-night",
              keepBackground: true,
            },
          ],
        ],
      },
    },
    components,
  });

  return <>{content}</>;
}
