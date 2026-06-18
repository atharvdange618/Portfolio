import { getAllPosts, getPostBySlug } from "@/lib/mdx";
import { BlogFrontmatter } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaClock, FaArrowLeftLong, FaBookmark } from "react-icons/fa6";
import { ShareButtons } from "@/components/ShareButtons";
import markdownStyles from "../../markdown-styles.module.css";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const fm = post.data as BlogFrontmatter;
  return {
    title: fm.title,
    description: fm.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `https://tty.atharvdangedev.in/blog/${slug}`,
      title: fm.title,
      description: fm.description,
      publishedTime: fm.publishedAt,
      authors: ["Atharv Dange"],
      tags: fm.tags,
      images: [
        {
          url: "/og-image.png",
          width: 1914,
          height: 964,
          alt: fm.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fm.title,
      description: fm.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const fm = post.data as BlogFrontmatter;
  const wordCount = post.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 250);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: fm.title,
    description: fm.description,
    datePublished: fm.publishedAt,
    url: `https://tty.atharvdangedev.in/blog/${slug}`,
    author: {
      "@type": "Person",
      name: "Atharv Dange",
      url: "https://tty.atharvdangedev.in",
    },
    publisher: {
      "@type": "Person",
      name: "Atharv Dange",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tty.atharvdangedev.in/blog/${slug}`,
    },
  };

  return (
    <article className="flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="flex items-center gap-2 text-comment hover:text-fg transition-colors duration-200 text-sm w-fit"
      >
        <FaArrowLeftLong className="w-3 h-3" />
        Back to blog
      </Link>

      <div className="flex flex-col gap-4 pb-8 border-b border-border">
        <div className="flex items-center gap-3 text-sm text-comment">
          <span>{formatDate(fm.publishedAt)}</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            {readingTime} min read
          </span>
        </div>

        <h1 className="text-3xl font-bold text-fg">{fm.title}</h1>

        <p className="text-fg/80 text-lg leading-relaxed">{fm.description}</p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {fm.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${tag}`}
                className="text-sm text-purple hover:text-fg transition-colors duration-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
          <ShareButtons title={fm.title} description={fm.description} slug={slug} />
        </div>
      </div>

      {fm.summary && (
        <div className="bg-surface/50 border border-border rounded-lg p-5 my-2">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple mb-3">
            <FaBookmark className="w-4 h-4" />
            Summary
          </div>
          <p className="text-fg/80 text-base leading-relaxed m-0">{fm.summary}</p>
        </div>
      )}

      <div className="max-w-full w-full min-w-0">
        <div className={markdownStyles["markdown"]}>
          <MdxRenderer source={post.content || ""} />
        </div>
      </div>
    </article>
  );
}
