import { useEffect, useRef, useState } from "react";
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
  FileText,
} from "lucide-react";
import ResumeModal from "./ResumeModal";

const roles = [
  "Full Stack Engineer",
  "Node.js Enthusiast",
  "React Native Developer",
  "Open Source Contributor",
  "Deep-Dive Experimenter",
];

export default function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

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
              <div className="inline-flex items-center gap-2 px-3 mt-4 sm:px-4 py-2 bg-[#E0FFF1] border-2 border-black dark:border-white shadow-brutal-sm font-mono text-xs sm:text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-black dark:text-black">
                  Available for collaborations
                </span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black dark:text-white leading-[1.1] tracking-tight">
                Hey, I'm{" "}
                <span
                  className="relative inline-block glitch"
                  data-text="Atharv"
                >
                  <span className="relative z-10">Atharv</span>
                  <span className="absolute bottom-[-8px] left-0 w-full h-3 sm:h-4 bg-[#60B5FF] z-0 -rotate-1" />
                </span>
                <motion.span
                  className="text-[#FF9149] bottom-[-8px] sm:bottom-[-14px] left-1 relative inline-block"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  .
                </motion.span>
              </h1>

              <div className="font-mono text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 h-7 sm:h-8 flex items-center">
                <span className="text-[#60B5FF] mr-2">&gt;</span>
                <span ref={typedRef}></span>
                <span className="animate-pulse ml-0.5 text-[#FF9149] font-bold">
                  |
                </span>
              </div>

              <p className="font-body text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                {personalInfo.tagline} Previously built scalable web apps and
                explored the depths of JavaScript at SmartScripts.{" "}
                <span className="font-semibold text-[#60B5FF]">
                  Now open to exciting opportunities!
                </span>
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
                <motion.button
                  onClick={() => setIsResumeModalOpen(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95, x: 2, y: 2 }}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#FFB494] text-black font-body font-semibold text-sm sm:text-base border-3 border-black dark:border-white shadow-brutal hover:shadow-brutal-lg transition-colors duration-200"
                  style={{ borderWidth: "3px" }}
                >
                  <FileText size={16} /> View Resume
                </motion.button>
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
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="border-3 border-black dark:border-white shadow-brutal-colored overflow-hidden"
                style={{ borderWidth: "3px", boxShadow: "8px 8px 0px #FF9149" }}
              >
                <img
                  src="/superman.jpeg"
                  alt="Spread love"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
            <div
              className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-4 "
              style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #60B5FF" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap size={18} className="text-[#60B5FF]" />
                <h3 className="font-heading text-sm font-bold text-black dark:text-white">
                  Connect
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#60B5FF] hover:text-white transition-all duration-200"
                  style={{ boxShadow: "2px 2px 0px black" }}
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#60B5FF] hover:text-white transition-all duration-200"
                  style={{ boxShadow: "2px 2px 0px black" }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.social.email}
                  className="p-1.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#60B5FF] hover:text-white transition-all duration-200"
                  style={{ boxShadow: "2px 2px 0px black" }}
                  aria-label="Email"
                >
                  <Mail size={16} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.social.twitter}
                  className="p-1.5 border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#60B5FF] hover:text-white transition-all duration-200"
                  style={{ boxShadow: "2px 2px 0px black" }}
                  aria-label="Twitter"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-black dark:text-white sm:w-3.5 sm:h-3.5"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </motion.a>
              </div>
            </div>

            <div
              className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-4 "
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
              className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-4 "
              style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #22c55e" }}
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

            <a
              href={personalInfo.social.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFECDB] dark:bg-[#27272a] border-3 border-black dark:border-white p-4 transition-colors duration-200 group "
              style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #FF9149" }}
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
            </a>
          </div>
        </div>
      </div>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
}
