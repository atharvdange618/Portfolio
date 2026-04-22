import { personalInfo, techStack } from "../data/mock";
import { Briefcase, Code2, Lightbulb, MessageCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { useTheme } from "@/hooks/useTheme";

const formatName = (name: string) => {
  const cleanName = name.replace(/\.(svg|png)$/i, "").replace(/-icon$/i, "");
  return cleanName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const SkillIconsGrid = ({
  icons,
  theme,
}: {
  icons: string[];
  theme?: string;
}) => {
  if (!icons || icons.length === 0) return null;
  return (
    <>
      {icons.map((icon) => (
        <div
          key={icon}
          className="relative group flex items-center justify-center"
        >
          <img
            src={`https://skillicons.dev/icons?i=${icon}${theme ? `&theme=${theme}` : ""}`}
            alt={icon}
            className="w-12 h-12 hover:-translate-y-1 hover:scale-105 transition-all duration-200 cursor-pointer"
            loading="lazy"
          />
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 flex flex-col items-center">
            <span className="whitespace-nowrap bg-black dark:bg-white text-white dark:text-black font-mono text-xs px-2 py-1 rounded-md">
              {formatName(icon)}
            </span>
            <div className="w-2 h-2 bg-black dark:bg-white rotate-45 -mt-1"></div>
          </div>
        </div>
      ))}
    </>
  );
};

const LocalIconsGrid = ({ icons }: { icons: string[] }) => {
  if (!icons || icons.length === 0) return null;
  return (
    <>
      {icons.map((icon) => (
        <div
          key={icon}
          className="relative group flex items-center justify-center"
        >
          <div className="w-12 h-12 bg-[#f5f5f5] dark:bg-[#242938] rounded-xl flex items-center justify-center p-[6px] hover:-translate-y-1 hover:scale-105 transition-all duration-200 cursor-pointer">
            <img
              src={`/icons/${icon}`}
              alt={icon.replace(".svg", "")}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 flex flex-col items-center">
            <span className="whitespace-nowrap bg-black dark:bg-white text-white dark:text-black font-mono text-xs px-2 py-1 rounded-md">
              {formatName(icon)}
            </span>
            <div className="w-2 h-2 bg-black dark:bg-white rotate-45 -mt-1"></div>
          </div>
        </div>
      ))}
    </>
  );
};

const TextBadges = ({
  items,
  colorClass,
}: {
  items: string[];
  colorClass: string;
}) => {
  if (!items || items.length === 0) return null;
  return (
    <>
      {items.map((item) => (
        <Badge
          key={item}
          className={`border-2 border-black dark:border-white ${colorClass} font-mono text-sm px-4 py-2 hover:-translate-y-1 hover:scale-105 transition-all duration-200 cursor-pointer`}
        >
          {item}
        </Badge>
      ))}
    </>
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
                  Current Status
                </h3>
              </div>
              <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed">
                <span className="font-semibold text-[#60B5FF]">
                  Open to exciting opportunities!
                </span>{" "}
                Previously built production applications and mobile apps at
                SmartScripts. Focused on MERN/PERN stack and React Native.
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
          </div>

          <div>
            <div
              className="bg-white dark:bg-[#09090b] p-6 border-3 border-black dark:border-white h-fit mb-6"
              style={{ borderWidth: "3px", boxShadow: "6px 6px 0px #000" }}
            >
              <h3 className="font-heading text-2xl font-bold text-black dark:text-white mb-6">
                Tech Stack & Tools
              </h3>

              <div className="flex flex-wrap gap-3 items-center">
                <SkillIconsGrid icons={techStack.icons} theme={theme} />
                <LocalIconsGrid icons={techStack.localIcons} />
                <TextBadges
                  items={techStack.text}
                  colorClass="bg-[#60B5FF] hover:bg-[#4a9ee6] text-black dark:text-black"
                />
              </div>
            </div>

            <div
              className="bg-white dark:bg-[#09090b] p-6 border-3 border-black dark:border-white"
              style={{ borderWidth: "3px", boxShadow: "6px 6px 0px #FDE047" }}
            >
              <div className="flex flex-col xl:flex-row xl:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FDE047] border-2 border-black shrink-0">
                    <MessageCircle size={20} className="text-black" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-black dark:text-white whitespace-nowrap">
                    Ask me about
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 xl:ml-auto">
                  {personalInfo.askMeAbout.map((topic) => (
                    <Badge
                      key={topic}
                      variant="outline"
                      className="border-2 border-black dark:border-white bg-white dark:bg-[#27272a] text-black dark:text-white font-mono text-sm px-4 py-2 hover:bg-[#FDE047] hover:text-black hover:border-black hover:-translate-y-1 hover:scale-105 transition-all duration-200 cursor-pointer"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
