import { getFeaturedProjects, getRecentPosts } from "@/lib/mdx";
import { safeJsonLd } from "@/lib/json-ld";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Stack } from "@/components/Stack";
import { Projects } from "@/components/Projects";
import { Blogs } from "@/components/Blogs";
import { FadeIn } from "@/components/FadeIn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Atharv Dange",
  url: "https://tty.atharvdangedev.in",
  jobTitle: "Full Stack Engineer & Co-Founder at SpaceBuilder",
  knowsAbout: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "React Native",
    "OAuth 2.0",
    "OIDC",
    "PostgreSQL",
    "REST APIs",
  ],
  sameAs: [
    "https://github.com/atharvdange618",
    "https://linkedin.com/in/atharvdange",
    "https://blog.atharvdangedev.in",
    "https://x.com/atharvdangedev",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    addressCountry: "India",
  },
  description:
    "Full Stack Engineer and Co-Founder of SpaceBuilder. Building production systems end-to-end - from auth protocols and API design to polished user interfaces.",
};

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const recentPosts = getRecentPosts(4);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <Hero />
      <div className="h-16" />
      <FadeIn>
        <About />
      </FadeIn>
      <div className="h-20" />
      <FadeIn delay={50}>
        <Experience />
      </FadeIn>
      <div className="h-20" />
      <FadeIn delay={50}>
        <Projects projects={featuredProjects} />
      </FadeIn>
      <div className="h-16" />
      <FadeIn delay={50}>
        <Stack />
      </FadeIn>
      <div className="h-20" />
      <FadeIn delay={50}>
        <Blogs posts={recentPosts} />
      </FadeIn>
    </div>
  );
}
