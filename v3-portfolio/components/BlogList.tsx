"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogMeta } from "@/lib/types";
import { formatDate, cn } from "@/lib/utils";

type Props = {
  posts: BlogMeta[];
  tags: string[];
};

export function BlogList({ posts, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.tags.includes(activeTag))
    : posts;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag(null)}
          className={cn(
            "text-sm px-2 py-1 border transition-colors duration-200",
            activeTag === null
              ? "border-purple text-purple"
              : "border-border text-comment hover:text-fg hover:border-fg",
          )}
        >
          all
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={cn(
              "text-sm px-2 py-1 border transition-colors duration-200",
              activeTag === tag
                ? "border-purple text-purple"
                : "border-border text-comment hover:text-fg hover:border-fg",
            )}
          >
            #{tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-comment text-lg">No posts with this tag.</p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((post) => (
            <div
              key={post.slug}
              className="flex flex-col gap-2 py-6 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3 text-sm text-comment">
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>

              <Link
                href={`/blog/${post.slug}`}
                className="text-blue hover:text-purple transition-colors duration-200 font-medium text-xl"
              >
                {post.title}
              </Link>

              <p className="text-fg/80 text-base leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-1">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className="text-sm text-purple hover:text-fg transition-colors duration-200"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
