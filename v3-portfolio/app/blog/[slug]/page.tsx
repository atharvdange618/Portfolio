import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Callout, SystemsDiagram } from "@/components/mdx-components";
import { Metadata } from "next";
import markdownStyles from "../../markdown-styles.module.css";
import { TagPill } from "@/components/ui/tag-pill";

const mdxComponents = {
  Callout,
  SystemsDiagram,
};

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = getPostBySlug(params.slug);
  let title = "Not found";
  if (post) {
    title = post.title;
  }

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.id,
  }));
}

export default async function Post(props: Params) {
  const params = await props.params;
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-gray-white px-4 py-8 md:px-8 md:py-16 font-sans">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          <Link
            href="/blog"
            className="inline-flex text-purple-blue items-center gap-2 font-mono text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to blog
          </Link>
          <h1 className="text-purple-blue text-3xl font-bold mb-8 text-center tracking-tight">
            Post not found
          </h1>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background text-gray-white px-4 py-8 md:px-8 md:py-16 font-sans">
      <div className="max-w-4xl mx-auto w-full">
        <Link
          href="/blog"
          className="inline-flex text-purple-blue items-center gap-2 mb-8 font-mono text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <div className="rounded-xl p-6 md:p-8 bg-card border border-card-border">
          <article className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-purple-blue mb-3 tracking-tight">
              {post.title}
            </h1>
            <time className="text-xs font-mono text-muted mb-6 block">
              {post.date}
            </time>
            <div className="flex flex-wrap gap-2 mb-8 font-mono">
              {post.tags.map((tag) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
            <div className={markdownStyles["markdown"]}>
              <MDXRemote
                source={post.content || ""}
                components={mdxComponents}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
