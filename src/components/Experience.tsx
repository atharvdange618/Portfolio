import { ExternalLink, Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const Experience = () => {
  const [downloads, setDownloads] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.npmjs.org/downloads/point/last-week/reiatsu")
      .then((res) => res.json())
      .then((data) => setDownloads(data.downloads))
      .catch(() => setDownloads(null));
  }, []);

  const experiences = [
    {
      title: "Junior Software Engineer",
      company: "Smartscripts Private Limited",
      location: "Pune, India",
      period: "March 2024 – Present",
      type: "Professional",
      highlights: [
        "Lead architectural decisions in a 10-person company",
        "Mentor interns in React Native, Node.js, and React.js/Next.js development",
        "Smart Booking System - Led frontend development for vendor booking platform",
        "mCards.in - Architected frontend for 2.5K+ monthly active users",
        "Smart Meta Tools - Developed utility platform for 1-2K+ daily active users",
      ],
      projects: [
        {
          name: "Smart Booking System",
          description:
            "Comprehensive vendor booking platform with dual interfaces",
          link: "https://smart-booking-system.vercel.app",
        },
        {
          name: "mCards.in",
          description: "Digital cards platform serving 2.5K+ monthly users",
          link: "https://mcards.in",
        },
        {
          name: "Smart Meta Tools",
          description:
            "Developed a comprehensive utility platform for 1-2K+ daily active users",
          link: "https://smartmeta.net/smart-tools",
        },
      ],
    },
    {
      title: "Reiatsu Framework",
      company: "Open Source Project",
      location: "Creator & Maintainer",
      period: "May 2025 – Present",
      type: "Open Source",
      highlights: [
        "Built production-ready web framework from scratch using Node.js core modules",
        "Zero-dependency architecture for optimal performance",
        `${
          downloads
            ? `${downloads}+ weekly npm downloads and growing adoption`
            : "Loading downloads..."
        }`,
        "Comprehensive TypeScript support with built-in routing and middleware",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-800">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-300 to-purple-300 mx-auto rounded"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white/70 rounded-xl p-8 backdrop-blur-sm border border-purple-200 hover:border-blue-300 transition-all duration-300 shadow-lg pastel-glow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {exp.title}
                  </h3>
                  <div className="text-blue-600 font-medium mb-2">
                    {exp.company}
                  </div>
                  <div className="text-gray-600 text-sm mb-2">
                    {exp.location}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-blue-100 px-3 py-1 rounded-lg border border-blue-200">
                  <Calendar size={16} />
                  <span className="text-sm">{exp.period}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-700 mb-3">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {exp.projects && (
                  <div>
                    <h4 className="text-lg font-medium text-gray-700 mb-3">
                      Notable Projects
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {exp.projects.map((project, idx) => (
                        <div
                          key={idx}
                          className="bg-blue-100 rounded-lg p-4 border border-blue-200"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-medium text-blue-700">
                              {project.name}
                            </h5>
                            <ExternalLink
                              size={16}
                              onClick={() =>
                                window.open(project.link, "_blank")
                              }
                              aria-label={`Visit ${project.name}`}
                              className="text-gray-500 hover:text-blue-600 cursor-pointer"
                            />
                          </div>
                          <p className="text-gray-700 text-sm">
                            {project.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
