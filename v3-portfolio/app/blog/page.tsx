/* eslint-disable react/no-unescaped-entities */
import { getAllPosts } from "@/lib/mdx";
import { TerminalLabel } from "@/components/mdx/TerminalLabel";
import { BlogList } from "@/components/BlogList";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export const metadata = {
  title: "Blog - Atharv Dange",
  description:
    "Writing on JavaScript & Web fundamentals, frameworks, tools and software engineering",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/"
        className="flex items-center gap-2 text-comment hover:text-fg transition-colors duration-200 text-sm w-fit"
      >
        <FaArrowLeftLong className="w-3 h-3" />
        Back to home
      </Link>
      <h1 className="sr-only">
        Atharv Dange's Blog - Articles on JavaScript, Web Fundamentals, and
        Systems Engineering
      </h1>
      <div>
        <TerminalLabel command="ls blog/" />
        <p className="text-fg/80 leading-relaxed text-lg">
          Writing on JavaScript & Web fundamentals, frameworks, tools and
          software engineering and things I figure out while building.
        </p>
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
