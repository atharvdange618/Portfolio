import { getAllProjects, getProjectBySlug } from "@/lib/mdx";
import { ProjectFrontmatter } from "@/lib/types";
import { StatusBadge } from "@/components/mdx/StatusBadge";
import { StackTag } from "@/components/mdx/StackTag";
import { formatDate, extractHeadings } from "@/lib/utils";
import { MdxRenderer } from "@/components/mdx/MdxRenderer";
import { TableOfContents } from "@/components/mdx/TableOfContents";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeftLong, FaGithub, FaClock } from "react-icons/fa6";
import { RiExternalLinkFill } from "react-icons/ri";
import markdownStyles from "../../markdown-styles.module.css";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const fm = project.data as ProjectFrontmatter;
  return {
    title: fm.title,
    description: fm.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `https://tty.atharvdangedev.in/projects/${slug}`,
      title: fm.title,
      description: fm.description,
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

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const fm = project.data as ProjectFrontmatter;
  const wordCount = project.content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 250);
  const headings = extractHeadings(project.content || "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: fm.title,
    description: fm.description,
    programmingLanguage: "TypeScript",
    codeRepository: fm.github || "",
    runtimePlatform: fm.stack.join(", "),
    url: `https://tty.atharvdangedev.in/projects/${slug}`,
    author: {
      "@type": "Person",
      name: "Atharv Dange",
      url: "https://tty.atharvdangedev.in",
    },
  };

  return (
    <article className="flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/projects"
        className="flex items-center gap-2 text-comment hover:text-fg transition-colors duration-200 text-sm w-fit"
      >
        <FaArrowLeftLong className="w-3 h-3" />
        Back to projects
      </Link>

      <div className="flex flex-col gap-4 pb-8 border-b border-border">
        <div className="flex items-center gap-3">
          <StatusBadge status={fm.status} />
          {readingTime && (
            <span className="text-comment text-sm flex items-center gap-1">
              <FaClock className="w-3 h-3" />
              {readingTime} min read
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-fg">{fm.title}</h1>

        <div className="flex items-center gap-3 text-sm text-comment">
          <span>Started {formatDate(fm.startedAt)}</span>
          {fm.updatedAt && (
            <>
              <span>·</span>
              <span>Updated {formatDate(fm.updatedAt)}</span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {fm.stack.map((s) => (
            <StackTag key={s} tag={s} />
          ))}
        </div>

        <div className="flex items-center gap-4">
          {fm.github && (
            <a
              href={fm.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-fg border border-border px-3 py-1.5 hover:border-purple hover:text-purple transition-colors duration-200"
            >
              <FaGithub className="w-3 h-3" />
              View on GitHub
            </a>
          )}
          {fm.live && (
            <a
              href={fm.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-fg border border-border px-3 py-1.5 hover:border-purple hover:text-purple transition-colors duration-200"
            >
              <RiExternalLinkFill className="w-3 h-3" />
              Live demo
            </a>
          )}
        </div>
      </div>

      <div className="flex gap-10">
        <div className="max-w-full w-full min-w-0 flex-1">
          <div className={markdownStyles["markdown"]}>
            <MdxRenderer source={project.content || ""} />
          </div>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block w-64 shrink-0">
            <TableOfContents items={headings} />
          </aside>
        )}
      </div>
    </article>
  );
}
