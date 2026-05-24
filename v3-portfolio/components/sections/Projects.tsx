import projects from "@/content/projects";
import ProjectCard from "../ProjectCard";

export default function Projects() {
  return (
    <div className="space-y-3" id="#projects">
      <h2 className="text-gray-white text-2xl font-semibold tracking-tight">
        Projects
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects
          .filter((project) => !project.hidden)
          .map((project, i) => (
            <ProjectCard key={i} {...project} />
          ))}
      </div>
    </div>
  );
}
