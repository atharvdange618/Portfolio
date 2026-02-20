import { personalInfo, techStack } from "../data/mock";
import { Briefcase, Code2, Lightbulb, MessageCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTheme } from "@/hooks/useTheme";

const SkillIconsGrid = ({
  icons,
  theme,
}: {
  icons: string[];
  theme?: string;
}) => {
  if (icons.length === 0) return null;
  return (
    <img
      src={`https://skillicons.dev/icons?i=${icons.join(",")}${theme ? `&theme=${theme}` : ""}&perline=9`}
      alt="Tech stack icons"
      className="max-w-full"
      loading="lazy"
    />
  );
};

const TextBadges = ({
  items,
  colorClass,
}: {
  items: string[];
  colorClass: string;
}) => {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Badge
          key={item}
          className={`border-2 border-black dark:border-white ${colorClass} font-mono text-xs px-3 py-1`}
        >
          {item}
        </Badge>
      ))}
    </div>
  );
};

export default function About() {
  const { isDark } = useTheme();

  const theme = isDark ? "dark" : "light";

  return (
    <section
      id="about"
      className="py-20 bg-[#E0FFF1] dark:bg-[#09090b] relative"
      aria-labelledby="about-heading"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-black dark:bg-white" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2
            id="about-heading"
            className="font-heading text-4xl sm:text-5xl font-bold text-black dark:text-white inline-block relative"
          >
            About Me
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#FF9149] -z-10 -rotate-1" />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div
              className="bg-white dark:bg-[#09090b] p-6 border-3 border-black dark:border-white shadow-brutal"
              style={{ borderWidth: "3px", boxShadow: "6px 6px 0px #000" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#60B5FF] border-2 border-black">
                  <Code2 size={20} className="text-black" />
                </div>
                <h3 className="font-heading text-xl font-bold text-black dark:text-white">
                  Who I Am
                </h3>
              </div>
              <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>

            <div
              className="bg-white dark:bg-[#09090b] p-6 border-3 border-black dark:border-white"
              style={{ borderWidth: "3px", boxShadow: "6px 6px 0px #FF9149" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#FF9149] border-2 border-black">
                  <Briefcase size={20} className="text-black" />
                </div>
                <h3 className="font-heading text-xl font-bold text-black dark:text-white">
                  Current Role
                </h3>
              </div>
              <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed">
                Working at{" "}
                <span className="font-semibold text-black dark:text-white">
                  {personalInfo.company}
                </span>{" "}
                building production applications and mobile apps. Focused on
                MERN/PERN stack and React Native.
              </p>
            </div>

            <div
              className="bg-white dark:bg-[#09090b] p-6 border-3 border-black dark:border-white"
              style={{ borderWidth: "3px", boxShadow: "6px 6px 0px #60B5FF" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#E0FFF1] border-2 border-black">
                  <Lightbulb size={20} className="text-black" />
                </div>
                <h3 className="font-heading text-xl font-bold text-black dark:text-white">
                  Fun Fact
                </h3>
              </div>
              <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed">
                {personalInfo.funFact}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="font-mono text-sm text-gray-500 dark:text-gray-400 mr-2 flex items-center gap-1">
                <MessageCircle size={14} /> Ask me about:
              </span>
              {personalInfo.askMeAbout.map((topic) => (
                <Badge
                  key={topic}
                  variant="outline"
                  className="border-2 border-black dark:border-white bg-white dark:bg-[#27272a] text-black dark:text-white font-mono text-xs px-3 py-1 hover:bg-[#60B5FF] hover:text-white hover:border-black transition-colors duration-200"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div
              className="bg-white dark:bg-[#09090b] p-6 border-3 border-black dark:border-white"
              style={{ borderWidth: "3px", boxShadow: "6px 6px 0px #000" }}
            >
              <h3 className="font-heading text-2xl font-bold text-black dark:text-white mb-6">
                Tech Stack & Tools
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-sm font-bold text-[#60B5FF] uppercase tracking-wider mb-3">
                    // The Core
                  </h4>
                  <div className="space-y-3">
                    <SkillIconsGrid icons={techStack.core} theme={theme} />
                    <TextBadges
                      items={techStack.coreText}
                      colorClass="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-sm font-bold text-[#FF9149] uppercase tracking-wider mb-3">
                    // Exploratory
                  </h4>
                  <div className="space-y-3">
                    <SkillIconsGrid
                      icons={techStack.exploratory}
                      theme={theme}
                    />
                    <TextBadges
                      items={techStack.exploratoryText}
                      colorClass="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-sm font-bold text-green-600 uppercase tracking-wider mb-3">
                    // Frontend
                  </h4>
                  <div className="space-y-3">
                    <SkillIconsGrid icons={techStack.frontend} theme={theme} />
                    <TextBadges
                      items={techStack.frontendText}
                      colorClass="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-sm font-bold text-purple-600 uppercase tracking-wider mb-3">
                    // State & Data
                  </h4>
                  <div className="space-y-3">
                    <SkillIconsGrid
                      icons={techStack.stateAndData}
                      theme={theme}
                    />
                    <TextBadges
                      items={techStack.stateAndDataText}
                      colorClass="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-mono text-sm font-bold text-gray-600 uppercase tracking-wider mb-3">
                    // Tools & Platforms
                  </h4>
                  <div className="space-y-3">
                    <SkillIconsGrid icons={techStack.tools} theme={theme} />
                    <TextBadges
                      items={techStack.toolsText}
                      colorClass="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
