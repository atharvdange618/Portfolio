import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getAllPosts } from "@/lib/api";
import { BlogCard } from "@/components/BlogCard";

export default async function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="min-h-screen bg-background text-gray-white p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-purple-blue text-3xl font-bold mb-8 flex flex-row w-full justify-between">
          <Link href="/" className="font-mono">
            <ChevronLeft className="w-8 h-8 text-gray-white" />
          </Link>
          <span className="font-mono">~/blog</span>
        </h1>
        <div className="h-full flex flex-col gap-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
