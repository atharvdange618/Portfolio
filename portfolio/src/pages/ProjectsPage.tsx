import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useGithubProjects } from "../hooks/useGithubProjects";
import type { GithubRepo } from "../hooks/useGithubProjects";

const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
};

const getLanguageColor = (language: string | null) => {
  if (!language) return "#8b949e";
  return languageColors[language] || "#8b949e";
};

const ProjectCard = ({ project }: { project: GithubRepo }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: 2, x: 2 }}
      className="group relative flex flex-col justify-between p-6 h-full bg-white dark:bg-[#09090b] border-[3px] border-black dark:border-white transition-all duration-200 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#60B5FF] hover:shadow-[4px_4px_0px_#000] dark:hover:shadow-[4px_4px_0px_#60B5FF]"
    >
      <div>
        <h3 className="text-xl font-bold font-heading text-black dark:text-white mb-3">
          {project.name}
        </h3>
        <p className="text-sm font-body text-gray-700 dark:text-gray-300 mb-6 line-clamp-3">
          {project.description || "No description provided."}
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        <div className="flex items-center gap-4 text-xs font-body font-bold">
          {project.language && (
            <div className="flex items-center gap-1.5 border-2 border-black dark:border-white px-2 py-1 dark:bg-[#27272a] text-black dark:text-white">
              <span
                className="w-2.5 h-2.5 rounded-full border border-black dark:border-white"
                style={{ backgroundColor: getLanguageColor(project.language) }}
              />
              <span>{project.language}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4 mt-2 border-t-[3px] border-black dark:border-white">
          <a
            href={project.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#60B5FF] dark:hover:bg-[#60B5FF] hover:text-white transition-colors duration-200 bg-white dark:bg-[#27272a]"
            aria-label="GitHub Repository"
          >
            <Github size={18} />
          </a>
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#FF9149] dark:hover:bg-[#FF9149] hover:text-white transition-colors duration-200 bg-white dark:bg-[#27272a]"
              aria-label="Live Demo"
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const { data: projects, isLoading, isError } = useGithubProjects();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-16">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-heading font-bold text-black dark:text-white mb-4"
        >
          Featured <span className="text-[#60B5FF]">Projects</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg font-body text-gray-600 dark:text-gray-400 max-w-2xl"
        >
          An archive of things I've built, open-source contributions, and side
          projects I've starred to showcase.
        </motion.p>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[#60B5FF] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {isError && (
        <div className="text-center py-20 text-red-500 font-body">
          Failed to load projects. Please try again later.
        </div>
      )}

      {projects && projects.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      )}

      {projects && projects.length === 0 && (
        <div className="text-center py-20 text-gray-500 font-body">
          No featured projects found. Star some of your repositories on GitHub
          to see them here!
        </div>
      )}
    </section>
  );
}
