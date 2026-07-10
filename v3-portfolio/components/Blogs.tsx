import { getRecentPosts } from "@/lib/mdx";
import { TerminalLabel } from "./mdx/TerminalLabel";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export function Blogs({
  posts,
}: {
  posts: Awaited<ReturnType<typeof getRecentPosts>>;
}) {
  return (
    <section id="blog">
      <TerminalLabel command="ls blog/ --recent" />
      <div className="flex flex-col gap-6">
        {posts.length === 0 ? (
          <p className="text-comment text-sm">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.slug}
              className="flex flex-col gap-2 pb-6 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3 text-sm text-comment">
                <span>{formatDate(post.publishedAt)}</span>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue hover:text-purple transition-colors duration-200 text-lg font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple focus-visible:outline-offset-2"
              >
                {post.title}
              </Link>
              <p className="text-fg/80 text-base leading-relaxed">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {post.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-purple hover:text-blue transition-colors duration-200 cursor-default"
                  >
                    #{tag.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
        <Link
          href="/blog"
          className="text-base text-comment hover:text-purple transition-colors duration-200 flex items-center gap-1 w-fit group focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple focus-visible:outline-offset-2"
        >
          Read all posts{" "}
          <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
