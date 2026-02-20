import { useState, useEffect } from "react";
import { personalInfo } from "../data/mock";
import {
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowRight,
  Share2,
} from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner";

interface BlogPost {
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  category: string;
  tags: string[];
  bannerImage: string;
  readingTime: string;
  url: string;
}

const categoryColors = {
  "JavaScript & Web APIs": {
    bg: "bg-[#60B5FF]",
    text: "text-black",
    border: "border-black",
  },
  "Git & Version Control": {
    bg: "bg-[#FF9149]",
    text: "text-black",
    border: "border-black",
  },
  "Web Development": {
    bg: "bg-[#AFDDFF]",
    text: "text-black",
    border: "border-black",
  },
  "Frameworks & Tools": {
    bg: "bg-[#E0FFF1]",
    text: "text-black",
    border: "border-black",
  },
  "Software Engineering": {
    bg: "bg-[#FFECDB]",
    text: "text-black",
    border: "border-black",
  },
  "Project Logs": {
    bg: "bg-[#60B5FF]",
    text: "text-black",
    border: "border-black",
  },
};

const defaultCategoryColor = {
  bg: "bg-gray-200",
  text: "text-black",
  border: "border-black",
};

export default function BlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://blog.atharvdangedev.in/api/posts/latest")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setPosts(data.data);
        } else {
          setError("Failed to load blog posts");
        }
      })
      .catch(() => {
        setError("Failed to fetch blog posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleShare = (platform: string, post: BlogPost) => {
    const url = post.url;
    const text = `Check out: ${post.title}`;
    const urls = {
      twitter: `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url,
    };

    if (platform === "copy") {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          toast.success("Link copied!", {
            description: "Blog post link copied to clipboard",
          });
        })
        .catch(() => {
          toast.error("Failed to copy", {
            description: "Could not copy link to clipboard",
          });
        });
      return;
    }
    window.open(
      urls[platform as keyof typeof urls],
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      id="blog"
      className="py-20 bg-[#FFECDB] dark:bg-[#09090b] relative"
      aria-labelledby="blog-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-black dark:bg-white" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2
              id="blog-heading"
              className="font-heading text-4xl sm:text-5xl font-bold text-black dark:text-white inline-block relative"
            >
              Recent Blog Posts
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#FF9149] -z-10 -rotate-1" />
            </h2>
            <p className="font-body text-gray-700 dark:text-gray-300 mt-4 max-w-lg">
              Deep dives into JavaScript, web development, and the things I
              learn along the way.
            </p>
          </div>
          <a
            href={personalInfo.social.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body font-semibold text-[#FF9149] hover:text-[#60B5FF] transition-colors duration-200"
          >
            All Posts <ArrowRight size={16} />
          </a>
        </div>

        {loading && (
          <div className="text-center py-12">
            <p className="font-mono text-gray-600 dark:text-gray-400">
              Loading posts...
            </p>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="font-mono text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="font-mono text-gray-600 dark:text-gray-400">
              No posts available
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.slice(0, 4).map((post, i) => {
              const colors =
                categoryColors[post.category as keyof typeof categoryColors] ||
                defaultCategoryColor;
              return (
                <article
                  key={post.slug}
                  className="bg-white dark:bg-[#09090b] border-3 border-black dark:border-white flex flex-col hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform duration-200 group"
                  style={{
                    borderWidth: "3px",
                    boxShadow:
                      i % 2 === 0
                        ? "6px 6px 0px #FF9149"
                        : "6px 6px 0px #60B5FF",
                  }}
                >
                  {post.bannerImage && (
                    <div
                      className="w-full h-40 sm:h-48 overflow-hidden border-b-3 border-black dark:border-white"
                      style={{ borderBottomWidth: "3px" }}
                    >
                      <img
                        src={post.bannerImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-6 flex flex-col grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${colors.bg} ${colors.text} border-2 ${colors.border} font-mono text-xs px-2 py-0.5`}
                        >
                          {post.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={10} className="sm:w-3 sm:h-3" />{" "}
                          {formatDate(post.publishedDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} className="sm:w-3 sm:h-3" />{" "}
                          {post.readingTime}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3 group-hover:text-[#60B5FF] transition-colors duration-200 leading-tight">
                      {post.title}
                    </h3>

                    <p className="font-body text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
                      {post.summary}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t-2 border-black dark:border-gray-600">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 sm:gap-1.5 font-body text-xs sm:text-sm font-semibold text-[#60B5FF] hover:text-[#FF9149] transition-colors duration-200"
                      >
                        Read More{" "}
                        <ArrowUpRight size={12} className="sm:w-3.5 sm:h-3.5" />
                      </a>

                      <TooltipProvider>
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleShare("twitter", post)}
                                className="p-1 sm:p-1.5 hover:bg-[#AFDDFF] border border-transparent hover:border-black transition-colors duration-200"
                                aria-label="Share on X"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="text-gray-500 dark:text-gray-400 sm:w-3.5 sm:h-3.5"
                                >
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Share on X</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleShare("linkedin", post)}
                                className="p-1 sm:p-1.5 hover:bg-[#AFDDFF] border border-transparent hover:border-black transition-colors duration-200"
                                aria-label="Share on LinkedIn"
                              >
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="text-gray-500 dark:text-gray-400 sm:w-3.5 sm:h-3.5"
                                >
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Share on LinkedIn</p>
                            </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleShare("copy", post)}
                                className="p-1 sm:p-1.5 hover:bg-[#AFDDFF] border border-transparent hover:border-black transition-colors duration-200"
                                aria-label="Copy link"
                              >
                                <Share2
                                  size={12}
                                  className="text-gray-500 dark:text-gray-400 sm:w-3.5 sm:h-3.5"
                                />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">Copy link</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
