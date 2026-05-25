import { getFeaturedProjects } from "@/lib/mdx";
import { TerminalLabel } from "./mdx/TerminalLabel";
import { StatusBadge } from "./mdx/StatusBadge";
import Link from "next/link";
import { StackTag } from "./mdx/StackTag";
import { FaArrowRight, FaGithub } from "react-icons/fa6";
import { RiExternalLinkFill } from "react-icons/ri";

export function Projects({
  projects,
}: {
  projects: Awaited<ReturnType<typeof getFeaturedProjects>>;
}) {
  return (
    <section id="projects">
      <TerminalLabel command="ls projects/ --featured" />
      <div className="flex flex-col gap-8">
        {projects.length === 0 ? (
          <p className="text-comment text-sm">No featured projects yet.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.slug}
              className="flex flex-col gap-3 pb-8 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <StatusBadge status={project.status} />
                {project.featured && (
                  <span className="text-yellow text-xs">★</span>
                )}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="text-blue hover:text-purple transition-colors duration-200 text-lg font-medium"
              >
                {project.title}
              </Link>
              <p className="text-fg/80 text-lg leading-relaxed line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.stack.slice(0, 3).map((s) => (
                  <StackTag key={s} tag={s} />
                ))}
              </div>
              <div className="flex items-center gap-4 mt-1">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm text-fg hover:text-purple transition-colors duration-200 flex items-center gap-1 group"
                >
                  Read the story{" "}
                  <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-comment hover:text-fg transition-colors duration-200 flex items-center gap-1"
                  >
                    <FaGithub className="w-4 h-4" />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-comment hover:text-fg transition-colors duration-200 flex items-center gap-1"
                  >
                    <RiExternalLinkFill className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))
        )}
        <Link
          href="/projects"
          className="text-base text-comment hover:text-purple transition-colors duration-200 flex items-center gap-1 w-fit group"
        >
          View all projects{" "}
          <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
