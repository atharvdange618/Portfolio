import { getFeaturedProjects, getRecentPosts } from "@/lib/mdx";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Stack } from "@/components/Stack";
import { Projects } from "@/components/Projects";
import { Blogs } from "@/components/Blogs";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const recentPosts = getRecentPosts(3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Atharv Dange",
    url: "https://tty.atharvdangedev.in",
    sameAs: [
      "https://github.com/atharvdange618",
      "https://linkedin.com/in/atharv-dange",
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
      "Full Stack Developer based in Pune, India. Building production systems end-to-end - from auth protocols and API design to polished user interfaces.",
  };

  return (
    <div className="flex flex-col gap-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <About />
      <Experience />
      <Stack />
      <Projects projects={featuredProjects} />
      <Blogs posts={recentPosts} />
    </div>
  );
}
