"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { MdOutlineAttachEmail } from "react-icons/md";
import { LuBookOpenText, LuGitBranch } from "react-icons/lu";

type Mode = "NORMAL" | "LINKEDIN" | "GITHUB" | "EMAIL" | "TWITTER" | "BLOG";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/atharvdange618",
    icon: FaGithub,
    modeHover: "GITHUB" as Mode,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/atharvdange",
    icon: FaLinkedinIn,
    modeHover: "LINKEDIN" as Mode,
  },
  {
    label: "Twitter",
    href: "https://x.com/atharvdangedev",
    icon: FaXTwitter,
    modeHover: "TWITTER" as Mode,
  },
  {
    label: "Email",
    href: "mailto:atharvdange.dev@gmail.com",
    icon: MdOutlineAttachEmail,
    modeHover: "EMAIL" as Mode,
  },
  {
    label: "Blog",
    href: "https://blog.atharvdangedev.in",
    icon: LuBookOpenText,
    modeHover: "BLOG" as Mode,
  },
];

export function Footer() {
  const pathname = usePathname() || "";
  const [mode, setMode] = useState<Mode>("NORMAL");
  const [timeString, setTimeString] = useState("");

  const formattedPath = pathname === "/" ? "~" : `~${pathname}`;

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const tz =
        now
          .toLocaleTimeString([], { timeZoneName: "short" })
          .split(" ")
          .pop() || "UTC";
      setTimeString(`${time} ${tz}`);
    };

    const timeoutId = setTimeout(updateClock, 0);
    const intervalId = setInterval(updateClock, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, []);

  const modeColors: Record<Mode, string> = {
    NORMAL: "bg-green text-bg",
    LINKEDIN: "bg-blue text-bg",
    GITHUB: "bg-purple text-bg",
    EMAIL: "bg-yellow text-bg",
    TWITTER: "bg-red text-bg",
    BLOG: "bg-green text-bg",
  };

  const modeTextColors: Record<Mode, string> = {
    NORMAL: "text-green",
    LINKEDIN: "text-blue",
    GITHUB: "text-purple",
    EMAIL: "text-yellow",
    TWITTER: "text-red",
    BLOG: "text-green",
  };

  return (
    <footer className="border-t border-border mt-24 py-8 w-full bg-bg font-mono selection:bg-surface selection:text-fg">
      <div className="max-w-5xl mx-auto px-4 flex flex-col gap-4">
        <div className="w-full bg-surface/10 border border-border flex flex-col md:flex-row md:h-9 text-xs select-none overflow-hidden rounded-sm shadow-md divide-y md:divide-y-0 divide-border">
          <div className="flex items-stretch justify-between md:justify-start h-9 md:h-full bg-surface/5 md:bg-transparent">
            <div
              className={`px-4 flex items-center font-black tracking-wide transition-colors duration-150 uppercase ${modeColors[mode]}`}
            >
              {mode}
            </div>

            <div className="px-3 border-r border-border text-fg items-center gap-1.5 hidden lg:flex max-w-xs min-w-0">
              <span className="text-comment text-[10px] uppercase tracking-wider shrink-0">
                path:
              </span>
              <span className="truncate font-medium text-cyan">
                {formattedPath}
              </span>
            </div>

            <div className="px-3 border-r md:border-r border-border text-comment flex items-center gap-2">
              <LuGitBranch
                className={`w-3.5 h-3.5 transition-colors duration-150 ${modeTextColors[mode]}`}
              />
              <span className="text-fg/80 font-medium">main</span>
            </div>

            <div className="px-4 text-fg flex md:hidden items-center gap-2 font-bold tabular-nums ml-auto">
              <span
                className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse ${modeTextColors[mode]}`}
              />
              <span>{timeString ? timeString.split(" ")[0] : "--:--:--"}</span>
            </div>
          </div>

          <div className="w-full md:flex-1 flex items-stretch min-w-0 bg-surface/10 md:bg-transparent h-9 md:h-full">
            <div className="flex items-stretch w-full justify-start md:justify-center">
              {links.map(({ label, href, icon: Icon, modeHover }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setMode(modeHover)}
                  onMouseLeave={() => setMode("NORMAL")}
                  className="flex-1 md:flex-none px-2 sm:px-3 flex items-center justify-center gap-1.5 border-r last:border-r-0 md:last:border-r border-border/40 hover:bg-surface/30 transition-all duration-100 group text-[11px] sm:text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple focus-visible:outline-offset-[-2px]"
                  aria-label={label}
                >
                  <Icon className="w-3.5 h-3.5 text-comment group-hover:text-fg transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center shrink-0">
            <div className="px-3 border-l border-border text-fg/70 font-medium hidden lg:flex items-center gap-1.5 text-[11px]">
              <span>Next.js</span>
              <span className="text-border/70">•</span>
              <span>Mdx</span>
            </div>

            <div className="px-4 bg-surface/20 border-l border-border text-fg flex items-center gap-2 font-bold tabular-nums">
              <span
                className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse ${modeTextColors[mode]}`}
              />
              <span className="text-fg/90 tracking-wide">
                {timeString || "--:--:--"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
