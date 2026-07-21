import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { Callout } from "./Callout";
import { StatusBadge } from "./StatusBadge";
import { StackTag } from "./StackTag";
import { TerminalLabel } from "./TerminalLabel";
import Link from "next/link";
import React from "react";

interface MdxRendererProps {
  source: string;
}

interface MdxNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: MdxNode[];
  value?: string;
}

const customMermaidPlugin = () => (tree: MdxNode) => {
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
        Array.isArray(
          (child.children[0].properties as { className?: string[] }).className,
        ) &&
        (
          (child.children[0].properties as { className?: string[] })
            .className || []
        ).includes("language-mermaid")
      ) {
        const codeNode = child.children[0];
        const rawText = (codeNode.children || [])
          .filter((c: MdxNode) => c.type === "text")
          .map((c: MdxNode) => c.value || "")
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
  StatusBadge,
  StackTag,
  TerminalLabel,
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href?: string }) => {
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
        <Link href={href!} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        <span className="sr-only"> (opens in new tab)</span>
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
          rehypeSlug,
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
