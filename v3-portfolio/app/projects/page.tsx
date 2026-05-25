/* eslint-disable react/no-unescaped-entities */
import { getAllProjects } from "@/lib/mdx";
import { TerminalLabel } from "@/components/mdx/TerminalLabel";
import { ProjectsList } from "@/components/ProjectsList";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";

export const metadata = {
  title: "Projects - Atharv Dange",
  description: "Things I've built, shipped, and written about.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="flex flex-col gap-8">
      <Link
        href="/"
        className="flex items-center gap-2 text-comment hover:text-fg transition-colors duration-200 text-sm w-fit"
      >
        <FaArrowLeftLong className="w-3 h-3" />
        Back to home
      </Link>
      <h1 className="sr-only">
        | Atharv Dange's Projects - Full Stack Software Case Studies
      </h1>
      <div>
        <TerminalLabel command="ls projects/" />
        <p className="text-fg/80 leading-relaxed text-lg">
          Things I’ve built - the decisions, trade-offs, and lessons along the
          way.
        </p>
      </div>
      <ProjectsList projects={projects} />
    </div>
  );
}
