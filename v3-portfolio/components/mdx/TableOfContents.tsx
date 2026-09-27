"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { TocItem } from "@/lib/utils";

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-80px 0px -80% 0px",
      threshold: 0,
    });

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [items, handleIntersection]);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLAnchorElement>(
      `a[href="#${CSS.escape(activeId)}"]`,
    );
    if (!nav || !link) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    nav.scrollTo({
      top: link.offsetTop - nav.clientHeight / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeId]);

  if (items.length === 0) return null;

  return (
    <nav
      ref={navRef}
      aria-label="Table of contents"
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      <h2 className="flex items-center gap-2 mb-4 text-base font-normal font-mono">
        <span className="text-green">$</span>
        <span className="text-comment">cat toc.md</span>
      </h2>
      <ul className="flex flex-col gap-1 border-l border-border">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`
                block leading-relaxed border-l -ml-px transition-colors duration-200
                ${item.level === 3 ? "pl-8 text-xs" : "pl-4 text-sm"}
                ${
                  activeId === item.id
                    ? "border-green text-green"
                    : "border-transparent text-comment hover:text-fg hover:border-border"
                }
              `}
            >
              {item.level === 2 && (
                <span className="text-purple mr-1.5">▸</span>
              )}
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
