"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className={`
        fixed bottom-8 right-8 z-50
        w-10 h-10 flex items-center justify-center
        bg-surface border border-border rounded-lg
        text-comment hover:text-purple hover:border-purple active:scale-95
        transition-all duration-200 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"}
      `}
    >
      <FaArrowUp className="w-4 h-4" />
    </button>
  );
}
