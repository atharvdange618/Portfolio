"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaGithub } from "react-icons/fa6";
import { RiExternalLinkFill } from "react-icons/ri";
import { ProjectMeta, ProjectStatus } from "@/lib/types";
import { StatusBadge } from "@/components/mdx/StatusBadge";
import { StackTag } from "@/components/mdx/StackTag";
import { cn } from "@/lib/utils";

const filters: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

type Props = {
  projects: ProjectMeta[];
};

export function ProjectsList({ projects }: Props) {
  const [active, setActive] = useState<ProjectStatus | "all">("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.status === active);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-1 border-b border-border pb-4">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={cn(
              "px-3 py-1 text-sm active:scale-[0.98] transition-all duration-200",
              active === value
                ? "text-fg border-b-2 border-purple"
                : "text-comment hover:text-fg",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-comment text-lg">No projects in this category.</p>
      ) : (
        <div className="flex flex-col">
          {filtered.map((project) => (
            <div
              key={project.slug}
              className="flex flex-col gap-3 py-8 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <StatusBadge status={project.status} />
                {project.featured && (
                  <span className="text-yellow text-sm">★</span>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="text-blue hover:text-purple active:scale-[0.98] transition-all duration-200 text-xl font-medium"
              >
                {project.title}
              </Link>

              <p className="text-fg/80 text-base leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <StackTag key={s} tag={s} />
                ))}
              </div>

              <div className="flex items-center gap-4 mt-1 text-sm">
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-fg hover:text-purple active:scale-[0.98] transition-all duration-200 flex items-center gap-1 group"
                >
                  Read the story <FaArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-comment hover:text-fg active:scale-[0.98] transition-all duration-200 flex items-center gap-1"
                  >
                    <FaGithub className="w-3 h-3" /> Source
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-comment hover:text-fg active:scale-[0.98] transition-all duration-200 flex items-center gap-1"
                  >
                    <RiExternalLinkFill className="w-3 h-3" /> Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
