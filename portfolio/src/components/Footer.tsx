import { personalInfo } from "../data/mock";
import { Github, Linkedin, Mail, ArrowUp, Code2, Heart } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="bg-[#AFDCFD] dark:bg-[#09090b] border-t-3 border-black dark:border-white relative"
      style={{ borderTopWidth: "3px" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className="bg-[#FF9149] dark:bg-[#FF9149] border-3 border-black p-6 sm:p-8 mb-10"
          style={{ borderWidth: "3px", boxShadow: "8px 8px 0px #000" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-black mb-2">
                Let's Build Something Together!
              </h3>
              <p className="font-body text-black/80 text-sm">
                Got an idea? Let's turn it into reality. Always open to
                interesting projects.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="px-5 sm:px-6 py-2.5 sm:py-3 font-heading font-bold text-sm sm:text-base text-white bg-black border-3 border-black hover:translate-x-[-4px] hover:translate-y-[-4px] transition-transform duration-200 whitespace-nowrap"
              style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #fff" }}
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-5"
            style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #60B5FF" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Code2 size={20} className="text-[#60B5FF]" />
              <h4 className="font-heading text-lg font-bold text-black dark:text-white">
                Atharv Dange
              </h4>
            </div>
            <p className="font-body text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
              Full Stack Engineer building things that matter. Deep-dive
              experimenter at heart.
            </p>
          </div>

          <div
            className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-5"
            style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #FF9149" }}
          >
            <h4 className="font-mono text-sm font-bold text-[#60B5FF] uppercase tracking-wider mb-3">
              Navigate
            </h4>
            <div className="space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block font-body text-sm text-gray-700 dark:text-gray-400 hover:text-[#FF9149] hover:translate-x-1 transition-all duration-200"
                >
                  → {link.label}
                </a>
              ))}
            </div>
          </div>

          <div
            className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-5"
            style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #22c55e" }}
          >
            <h4 className="font-mono text-sm font-bold text-[#FF9149] uppercase tracking-wider mb-3">
              Connect
            </h4>
            <div className="space-y-2">
              {[
                {
                  icon: <Github size={16} />,
                  href: personalInfo.social.github,
                  label: "GitHub",
                },
                {
                  icon: <Linkedin size={16} />,
                  href: personalInfo.social.linkedin,
                  label: "LinkedIn",
                },
                {
                  icon: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                  href: personalInfo.social.twitter,
                  label: "X / Twitter",
                },
                {
                  icon: <Mail size={16} />,
                  href: personalInfo.social.email,
                  label: "Email",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-gray-700 dark:text-gray-400 hover:text-[#60B5FF] hover:translate-x-1 transition-all duration-200"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div
            className="bg-white dark:bg-[#18181b] border-3 border-black dark:border-white p-5"
            style={{ borderWidth: "3px", boxShadow: "4px 4px 0px #a855f7" }}
          >
            <h4 className="font-mono text-sm font-bold text-green-600 uppercase tracking-wider mb-3">
              Status
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-body text-sm text-gray-700 dark:text-gray-400">
                  Available for work
                </span>
              </div>
              <div className="font-body text-sm text-gray-700 dark:text-gray-400">
                <span className="font-semibold text-black dark:text-white">
                  Location:
                </span>
                <br />
                Pune, India
              </div>
              <div className="font-body text-sm text-gray-700 dark:text-gray-400">
                <span className="font-semibold text-black dark:text-white">
                  Response:
                </span>
                <br />
                Usually within 24h
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-black dark:border-white">
          <p className="font-mono text-xs sm:text-sm text-gray-700 dark:text-gray-400 flex items-center gap-1 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} • Atharv Dange</span>
            <span className="flex items-center gap-1">
              • Built with{" "}
              <Heart size={12} className="text-red-500 fill-red-500" /> and
              curiosity
            </span>
          </p>
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.social.blog}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs sm:text-sm px-3 py-1.5 bg-[#FF9149] text-black border-2 border-black dark:border-white hover:translate-y-[-2px] transition-transform duration-200"
            >
              Blog
            </a>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 font-mono text-xs sm:text-sm px-3 py-1.5 bg-black dark:bg-white text-white dark:text-black border-2 border-black dark:border-white hover:translate-y-[-2px] transition-transform duration-200"
            >
              <ArrowUp size={12} /> Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
