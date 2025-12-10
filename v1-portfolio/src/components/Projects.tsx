import { Github, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const Projects = () => {
  type Project = {
    title: string;
    description: string;
    tech: string[];
    github: string;
    live?: string;
    featured?: boolean;
    stats?: string;
  };

  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.npmjs.org/downloads/point/last-week/reiatsu")
      .then((res) => res.json())
      .then((data) => setDownloads(data.downloads))
      .catch(() => setDownloads(null));
  }, []);

  const projects: Project[] = [
    {
      title: "Reiatsu Framework",
      description:
        "Production-ready TypeScript web framework built with Node.js core modules. Features zero-dependency architecture, built-in routing, middleware support, and comprehensive TypeScript integration. Demonstrates deep understanding of Node.js internals and framework architecture.",
      tech: ["TypeScript", "Node.js", "Zero Dependencies"],
      github: "https://github.com/atharvdange618/reiatsu",
      live: "https://www.npmjs.com/package/reiatsu",
      featured: true,
      stats: `${
        downloads ? `${downloads}+ weekly downloads` : "Loading downloads..."
      }`,
    },
    {
      title: "Telemetry",
      description:
        "Privacy-first, cookieless analytics platform with real-time dashboards, multi-site management, goal tracking, and world map visualizations. Built with modern backend technologies and beautiful React frontend.",
      tech: ["Fastify", "React", "Prisma", "PostgreSQL", "BullMQ", "Redis"],
      github: "https://github.com/atharvdange618/Telemetry",
      live: "https://usetelemetry.vercel.app",
      featured: true,
    },
    {
      title: "ArcHive",
      description:
        "Personal digital sanctuary for thoughts, links, and code snippets. Features intelligent content processing, automated screenshot generation, NLP-based tagging, and full-text search. Cross-platform with mobile apps for iOS & Android.",
      tech: ["Hono", "Bun", "MongoDB", "Expo", "Puppeteer", "Cloudinary"],
      github: "https://github.com/atharvdange618/ArcHive",
      featured: true,
    },
    {
      title: "Minty",
      description:
        "Smart expense tracking mobile app with automatic SMS parsing from 50+ banks and UPI apps. Features intelligent transaction detection, category auto-classification, advanced analytics with charts, and 100% offline-first architecture.",
      tech: ["React Native", "TypeScript", "SQLite", "Expo"],
      github: "https://github.com/atharvdange618/Minty",
    },
    {
      title: "Recon",
      description:
        "Tactical bug tracking intelligence system with stunning visual timelines rendered using Skia graphics. Features real-time dashboard, deadline intelligence, comprehensive metadata capture, and offline-first SQLite architecture.",
      tech: ["React Native", "TypeScript", "SQLite", "React Native Skia"],
      github: "https://github.com/atharvdange618/Recon",
    },
    {
      title: "XML Sitemap Generator",
      description:
        "Modern web application that intelligently crawls websites to generate SEO-optimized XML sitemaps. Handles both SSR and CSR pages, respects robots.txt, and provides real-time progress tracking via Server-Sent Events.",
      tech: ["Next.js", "Puppeteer", "Web Crawling", "SSE"],
      github: "https://github.com/atharvdange618/xml-sitemap-generator",
      live: "https://xml-sitemap-generator.vercel.app",
    },
  ];

  const ProjectCard = ({
    project,
    className = "",
  }: {
    project: Project;
    className?: string;
  }) => (
    <div
      className={`rounded-xl p-6 backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] shadow-lg ${
        project.featured
          ? "bg-white/80 border-blue-200 pastel-glow"
          : "bg-white/70 border-purple-200 hover:border-blue-300"
      } ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
        {project.featured && (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full border border-blue-200">
            Featured
          </span>
        )}
        {project.stats && (
          <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full border border-green-200">
            {project.stats}
          </span>
        )}
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed text-sm">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, idx) => (
          <span
            key={idx}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full border border-blue-200"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 text-sm"
        >
          <Github size={16} />
          <span>Code</span>
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm"
          >
            <ExternalLink size={16} />
            <span>Live</span>
          </a>
        )}
      </div>
    </div>
  );

  return (
    <section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-300 to-purple-300 mx-auto rounded mb-8"></div>
        </div>

        {/* Render Active Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-fr">
          {projects.map((project, index) => {
            const spans = project.featured
              ? "md:col-span-2 lg:col-span-3"
              : index % 3 === 0
              ? "md:col-span-2 lg:col-span-2"
              : "md:col-span-1 lg:col-span-2";

            return (
              <ProjectCard key={index} project={project} className={spans} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
