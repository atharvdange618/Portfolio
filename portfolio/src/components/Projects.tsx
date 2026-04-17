import { motion } from "framer-motion";
import { mockProjects } from "../data/mock";
import { ExternalLink, Github, ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { usePinnedRepos } from "@/hooks/usePinnedRepos";

const shadowColors = ["#60B5FF", "#FF9149", "#E0FFF1"];

export default function Projects() {
  const { projects: pinnedProjects, loading, error } = usePinnedRepos();

  const projects = pinnedProjects.length > 0 ? pinnedProjects : mockProjects;
  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-[#09090b] relative"
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
            href="https://blog.atharvdangedev.in/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body font-semibold text-[#60B5FF] hover:text-[#FF9149] transition-colors duration-200"
          >
            View All <ArrowRight size={16} />
          </a>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-500 text-red-800 dark:text-red-300 font-body">
            <p>{error} - Showing cached projects</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#60B5FF]" />
            <span className="ml-3 font-body text-gray-600 dark:text-gray-400">
              Loading projects from GitHub...
            </span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  rotateX: 5,
                  rotateY: 5,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                  },
                }}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-6 flex flex-col group cursor-pointer relative overflow-hidden"
                style={{
                  borderWidth: "3px",
                  boxShadow: `6px 6px 0px ${shadowColors[i % shadowColors.length]}`,
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${shadowColors[i % shadowColors.length]} 0%, transparent 100%)`,
                  }}
                />

                <div className="flex items-start justify-between mb-3 relative z-10">
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

                <p className="font-body text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-xs px-2 py-1 bg-[#AFDDFF] dark:bg-[#27272a] text-black dark:text-[#AFDDFF] border border-black dark:border-[#AFDDFF]"
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
