"use client";
import dynamic from "next/dynamic";

const Terminal = dynamic(() => import("@/components/terminal/Terminal"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
      <div className="text-[#50fa7b] text-lg animate-pulse">
        Initializing terminal...
      </div>
    </div>
  ),
});

export default function Home() {
  return <Terminal />;
}
