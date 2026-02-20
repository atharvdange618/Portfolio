import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/mock";
import Typed from "typed.js";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Coffee,
  Code2,
  Zap,
} from "lucide-react";

const roles = [
  "Full Stack Engineer",
  "Node.js Enthusiast",
  "React Native Developer",
  "Open Source Contributor",
  "Deep-Dive Experimenter",
];

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: roles,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2000,
      loop: true,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center pt-16 pb-12 sm:pb-20 bg-white dark:bg-[#09090b] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="space-y-8">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#E0FFF1] border-2 border-black dark:border-white shadow-brutal-sm font-mono text-xs sm:text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-black dark:text-black">
                  Available for collaborations
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black dark:text-white leading-[1.1] tracking-tight">
                Hey, I'm{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Atharv</span>
                  <span className="absolute bottom-[-8px] left-0 w-full h-3 sm:h-4 bg-[#60B5FF] z-0 -rotate-1" />
                </span>
                <span className="text-[#FF9149] bottom-[-8px] sm:bottom-[-14px] left-1 relative">
                  .
                </span>
              </h1>

              <div className="font-mono text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 h-7 sm:h-8 flex items-center">
                <span className="text-[#60B5FF] mr-2">&gt;</span>
                <span ref={typedRef}></span>
                <span className="animate-pulse ml-0.5 text-[#FF9149] font-bold">
                  |
                </span>
              </div>

              <p className="font-body text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                {personalInfo.tagline} Building scalable web apps and exploring
                the depths of JavaScript at{" "}
                <span className="font-semibold text-black dark:text-white">
                  {personalInfo.company}
                </span>
                .
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#projects")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95, x: 2, y: 2 }}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#60B5FF] text-black font-body font-semibold text-sm sm:text-base border-3 border-black dark:border-white shadow-brutal hover:shadow-brutal-lg transition-colors duration-200"
                  style={{ borderWidth: "3px" }}
                >
                  View My Work <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95, x: 2, y: 2 }}
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white dark:bg-[#27272a] text-black dark:text-white font-body font-semibold text-sm sm:text-base border-3 border-black dark:border-white shadow-brutal hover:shadow-brutal-lg hover:bg-[#FF9149] hover:text-black transition-colors duration-200"
                  style={{ borderWidth: "3px" }}
                >
                  Get In Touch
                </motion.a>
              </div>
            </div>

            <div className="lg:col-span-2 hidden lg:block">
              <div
                className="bg-[#1a1a1a] border-3 border-black dark:border-white shadow-brutal-colored p-0 rotate-1 hover:rotate-0 transition-transform duration-300"
                style={{ borderWidth: "3px", boxShadow: "8px 8px 0px #60B5FF" }}
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-gray-700">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 font-mono text-xs text-gray-400">
                    atharvdange@dev ~
                  </span>
                </div>
                <div className="p-4 font-mono text-sm space-y-2">
                  <div className="text-gray-400">
                    <span className="text-[#60B5FF]">const</span>{" "}
                    <span className="text-[#FF9149]">atharv</span>{" "}
                    <span className="text-white">=</span> {"{"}
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-[#E0FFF1]">role</span>:{" "}
                    <span className="text-yellow-300">
                      "Full Stack Engineer"
                    </span>
                    ,
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-[#E0FFF1]">core</span>:{" "}
                    <span className="text-yellow-300">"Node.js / Express"</span>
                    ,
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-[#E0FFF1]">exploring</span>:{" "}
                    <span className="text-yellow-300">
                      "Bun, Hono, Fastify"
                    </span>
                    ,
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-[#E0FFF1]">motto</span>:{" "}
                    <span className="text-yellow-300">
                      "Dig deep, build bold"
                    </span>
                    ,
                  </div>
                  <div className="text-gray-400">{"}"}</div>
                  <div className="mt-3 flex items-center gap-1">
                    <span className="text-[#60B5FF]">$</span>
                    <span className="text-white animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
            <div
              className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-4"
              style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #60B5FF" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap size={18} className="text-[#60B5FF]" />
                <h3 className="font-heading text-sm font-bold text-black dark:text-white">
                  Connect
                </h3>
              </div>
              <div className="flex gap-2">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#60B5FF] hover:text-white transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#60B5FF] hover:text-white transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href={personalInfo.social.email}
                  className="p-1.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#60B5FF] hover:text-white transition-colors duration-200"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>

            <div
              className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-4"
              style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #FF9149" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Code2 size={18} className="text-[#FF9149]" />
                <h3 className="font-heading text-sm font-bold text-black dark:text-white">
                  Stack
                </h3>
              </div>
              <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                MERN・PERN・React Native
              </p>
            </div>

            <div
              className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-4"
              style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #E0FFF1" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Coffee size={18} className="text-green-600" />
                <h3 className="font-heading text-sm font-bold text-black dark:text-white">
                  Powered By
                </h3>
              </div>
              <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                Music・Code・Curiosity
              </p>
            </div>

            <motion.a
              href={personalInfo.social.blog}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95, x: 2, y: 2 }}
              className="bg-[#FFECDB] dark:bg-[#27272a] border-3 border-black dark:border-white p-4 transition-colors duration-200 group"
              style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #FFECDB" }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-sm font-bold text-black dark:text-white">
                  Blog
                </h3>
                <ArrowRight
                  size={16}
                  className="text-[#FF9149] group-hover:translate-x-1 transition-transform"
                />
              </div>
              <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                Deep dives & learnings
              </p>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
