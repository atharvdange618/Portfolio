"use client";

import { FaXTwitter, FaLinkedinIn, FaLink, FaCheck } from "react-icons/fa6";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  description: string;
  slug: string;
}

export function ShareButtons({ title, description, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const url = `https://tty.atharvdangedev.in/blog/${slug}`;
  const shareText = `${title} - ${description}`;

  const shareLinks = [
    {
      name: "X",
      icon: FaXTwitter,
      href: `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: FaLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-2">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.name}`}
          className="flex items-center justify-center w-7 h-7 rounded-md border border-border bg-surface/50 text-comment hover:text-fg hover:border-purple hover:bg-surface transition-all duration-200"
        >
          <link.icon className="w-3 h-3" />
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label={copied ? "Copied!" : "Copy link"}
        className="flex items-center justify-center w-7 h-7 rounded-md border border-border bg-surface/50 text-comment hover:text-fg hover:border-purple hover:bg-surface transition-all duration-200"
      >
        {copied ? (
          <FaCheck className="w-3 h-3 text-green" />
        ) : (
          <FaLink className="w-3 h-3" />
        )}
      </button>
    </div>
  );
}
