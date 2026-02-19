import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Code2, Github, Linkedin } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { personalInfo } from "@/data/mock";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme() as {
    isDark: boolean;
    toggleTheme: () => void;
  };
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b-3 border-black dark:border-white transition-colors duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-sm"
          : "bg-white dark:bg-[#1a1a1a]"
      }`}
      style={{ borderBottomWidth: "3px" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 group"
          >
            <div className="p-1.5 bg-[#60B5FF] border-2 border-black dark:border-white group-hover:rotate-12 transition-transform duration-200">
              <Code2 size={16} className="text-white" />
            </div>
            <span className="font-heading text-lg sm:text-xl font-bold text-black dark:text-white group-hover:text-[#60B5FF] transition-colors duration-200 tracking-tight">
              Atharv Dange
              <span className="text-[#FF9149]">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 lg:px-4 py-2 font-body text-sm font-medium text-black dark:text-white hover:bg-[#60B5FF] hover:text-white border-2 border-transparent hover:border-black dark:hover:border-white transition-all duration-200"
              >
                {link.label}
              </a>
            ))}

            <div className="hidden lg:flex items-center gap-1 ml-2 border-l-2 border-gray-300 dark:border-gray-700 pl-2">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-black dark:text-white hover:bg-[#60B5FF] hover:text-white border-2 border-transparent hover:border-black dark:hover:border-white transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={personalInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-black dark:text-white hover:bg-[#60B5FF] hover:text-white border-2 border-transparent hover:border-black dark:hover:border-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <button
              onClick={toggleTheme}
              className="ml-2 p-2 border-2 border-black dark:border-white bg-[#FFECDB] dark:bg-[#2a2a2a] hover:translate-y-[-2px] transition-all duration-200"
              aria-label="Toggle theme"
              style={{
                boxShadow: scrolled ? "none" : "2px 2px 0px rgba(0,0,0,0.2)",
              }}
            >
              {isDark ? (
                <Sun
                  size={18}
                  className="text-yellow-500 dark:text-yellow-300"
                />
              ) : (
                <Moon size={18} className="text-gray-800" />
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 border-2 border-black dark:border-white bg-[#FFECDB] dark:bg-[#2a2a2a]"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun
                  size={18}
                  className="text-yellow-500 dark:text-yellow-300"
                />
              ) : (
                <Moon size={18} className="text-gray-800" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 border-2 border-black dark:border-white bg-white dark:bg-[#1a1a1a]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={20} className="text-black dark:text-white" />
              ) : (
                <Menu size={20} className="text-black dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t-3 border-black dark:border-white bg-white dark:bg-[#1a1a1a]"
          style={{ borderTopWidth: "3px" }}
        >
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-4 py-3 font-body text-base font-medium text-black dark:text-white border-2 border-black dark:border-white hover:bg-[#60B5FF] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            {/* Mobile Social Links */}
            <div className="flex items-center gap-2 pt-2 border-t-2 border-gray-300 dark:border-gray-700 mt-2">
              <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                Connect:
              </span>
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-black dark:text-white border-2 border-black dark:border-white hover:bg-[#60B5FF] hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-black dark:text-white border-2 border-black dark:border-white hover:bg-[#60B5FF] hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
