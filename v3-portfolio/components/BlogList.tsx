import Link from "next/link";
import { BlogMeta } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { ShareButtons } from "./ShareButtons";

type Props = {
  posts: BlogMeta[];
};

export function BlogList({ posts }: Props) {
  return (
    <div className="flex flex-col">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="flex flex-col gap-2 py-6 border-b border-border last:border-0"
        >
          <div className="flex items-center gap-3 text-sm text-comment">
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue hover:text-purple transition-colors duration-200 font-medium text-xl"
            >
              {post.title}
            </Link>
            <ShareButtons
              title={post.title}
              description={post.description}
              slug={post.slug}
            />
          </div>

          <p className="text-fg/80 text-base leading-relaxed">
            {post.description}
          </p>
        </div>
      ))}
    </div>
  );
}
