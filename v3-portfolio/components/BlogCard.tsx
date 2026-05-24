import { BlogPost } from "@/content/blogposts";
import Link from "next/link";
import { Card } from "./ui/card";
import { TagPill } from "./ui/tag-pill";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.id}`}>
      <Card className="p-6 bg-card border-card-border">
        <article className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-purple-blue">
              {post.title}
            </h2>
            <time className="text-xs text-muted">{post.date}</time>
          </div>
          <p className="text-sm text-gray-white">{post.description}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        </article>
      </Card>
    </Link>
  );
}
