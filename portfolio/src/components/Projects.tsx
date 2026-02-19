import { mockProjects } from "../data/mock";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";

const shadowColors = ["#60B5FF", "#FF9149", "#E0FFF1"];

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-[#1a1a1a] relative"
      aria-labelledby="projects-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-black dark:bg-white" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2
              id="projects-heading"
              className="font-heading text-4xl sm:text-5xl font-bold text-black dark:text-white inline-block relative"
            >
              Featured Projects
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#60B5FF] -z-10 -rotate-1" />
            </h2>
            <p className="font-body text-gray-600 dark:text-gray-400 mt-4 max-w-lg">
              Things I've built to solve real problems and explore new ideas.
            </p>
          </div>
          <a
            href="https://blog.atharvdangedev.in/blogs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body font-semibold text-[#60B5FF] hover:text-[#FF9149] transition-colors duration-200"
          >
            View All <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project, i) => (
            <div
              key={project.id}
              className="bg-white dark:bg-[#222] border-3 border-black dark:border-white p-6 flex flex-col hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform duration-200 group"
              style={{
                borderWidth: "3px",
                boxShadow: `6px 6px 0px ${shadowColors[i % shadowColors.length]}`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-heading text-xl font-bold text-black dark:text-white group-hover:text-[#60B5FF] transition-colors duration-200">
                  {project.name}
                </h3>
                <Badge
                  className={`font-mono text-xs px-2 py-0.5 border-2 border-black shrink-0 ${
                    project.status === "Active"
                      ? "bg-[#E0FFF1] text-green-800"
                      : "bg-[#FFECDB] text-orange-800"
                  }`}
                >
                  {project.status}
                </Badge>
              </div>

              <p className="font-body text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-2 py-1 bg-[#AFDDFF] dark:bg-[#2a4a6a] text-black dark:text-[#AFDDFF] border border-black dark:border-[#AFDDFF]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-2 border-t-2 border-black dark:border-gray-600">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-black dark:text-white hover:text-[#60B5FF] transition-colors duration-200"
                  >
                    <Github size={16} /> Source
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-black dark:text-white hover:text-[#FF9149] transition-colors duration-200"
                  >
                    <ExternalLink size={16} /> Live
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
