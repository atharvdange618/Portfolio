import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";
import { neofetchCommand } from "./neofetch";

// Help command
export const helpCommand: CommandDefinition = {
  name: "help",
  description: "Show available commands",
  aliases: ["?", "commands"],
  execute: (): CommandResponse => {
    const output = `\x1b[1;36mAvailable Commands:\x1b[0m

  \x1b[1;33m◆ Navigation & Files:\x1b[0m
  \x1b[1;32mls\x1b[0m                List directory contents
  \x1b[1;32mcat\x1b[0m <file>        View file content (about.md, contact.sh, readme.md)
  \x1b[1;32mpwd\x1b[0m               Print current directory

  \x1b[1;33m◆ System Info:\x1b[0m
  \x1b[1;32mwhoami\x1b[0m            Display user information
  \x1b[1;32mneofetch\x1b[0m          Show system information
  \x1b[1;32mdate\x1b[0m              Display current date and time
  \x1b[1;32mtime\x1b[0m              Display current time
  \x1b[1;32muptime\x1b[0m            Show system uptime and stats

  \x1b[1;33m◆ Monitoring:\x1b[0m
  \x1b[1;32mhtop\x1b[0m              Interactive process viewer
  \x1b[1;32mtop\x1b[0m               Display running processes
  \x1b[1;32mps aux\x1b[0m            List all processes
  \x1b[1;32mfree -h\x1b[0m           Display memory usage
  \x1b[1;32mdf -h\x1b[0m             Show disk usage

  \x1b[1;33m◆ Projects & Experience:\x1b[0m
  \x1b[1;32msystemctl\x1b[0m status  View running projects/services
  \x1b[1;32mgit\x1b[0m log           View experience timeline
  \x1b[1;32mnpm\x1b[0m list          View skills and packages
  \x1b[1;32mgh\x1b[0m [user|repos|repo <name>|stats]  GitHub profile & stats

  \x1b[1;33m◆ Utility:\x1b[0m
  \x1b[1;32mclear\x1b[0m             Clear the terminal screen
  \x1b[1;32mecho\x1b[0m <text>       Display a line of text
  \x1b[1;32mhistory\x1b[0m           Show command history tip
  \x1b[1;32mmotd\x1b[0m              Show welcome message again
  \x1b[1;32mexit\x1b[0m              Exit terminal (goodbye message)
  \x1b[1;32mhelp\x1b[0m              Show this help message

  \x1b[1;33m◆ Easter Eggs:\x1b[0m
  \x1b[1;32mcowsay\x1b[0m, \x1b[1;32msl\x1b[0m, \x1b[1;32mmatrix\x1b[0m, \x1b[1;32mfortune\x1b[0m, \x1b[1;32mplease\x1b[0m, \x1b[1;32masciiquote\x1b[0m

\x1b[2mTip: Press Tab for auto-completion. Use ↑/↓ arrows for command history.\x1b[0m
`;
    return { output };
  },
};

// whoami command
export const whoamiCommand: CommandDefinition = {
  name: "whoami",
  description: "Display current user",
  execute: (): CommandResponse => {
    const output = `
\x1b[1;36mAtharv\x1b[0m

Full Stack Engineer specializing in MERN/PERN stack and React Native.
Passionate about backend development and building meaningful projects.

Based in Pune, Maharashtra 🇮🇳
`;
    return { output };
  },
};

// cat command
export const catCommand: CommandDefinition = {
  name: "cat",
  description: "Display file contents",
  usage: "cat <filename>",
  execute: (context: CommandContext): CommandResponse => {
    if (context.args.length === 0) {
      return {
        output:
          "\x1b[1;31mError:\x1b[0m cat: missing file operand\nUsage: cat <filename>\n",
        exitCode: 1,
      };
    }

    const filename = context.args[0].toLowerCase();

    switch (filename) {
      case "about.md":
      case "about":
        return {
          output: `
\x1b[1;36m# Atharv Dange\x1b[0m

\x1b[1;33m## Software Engineer & Self-Taught Developer\x1b[0m

Full Stack Engineer with expertise in MERN/PERN stack and React Native development.
Currently working at \x1b[1;32mSmartScripts Pvt. Ltd.\x1b[0m building production applications,
mobile apps, and managing client interactions.

\x1b[1;34m→\x1b[0m 📍 Based in Pune, Maharashtra
\x1b[1;34m→\x1b[0m 🚀 Started coding journey in January 2021
\x1b[1;34m→\x1b[0m 💼 Software Engineer since March 2024
\x1b[1;34m→\x1b[0m 🎓 Electronics & Telecommunication Engineering, SPPU (2020-2024)
\x1b[1;34m→\x1b[0m 🎯 Passionate about backend development

\x1b[1;32mCreator of:\x1b[0m
  • Reiatsu - Zero-dependency TypeScript web framework
  • Telemetry - Privacy-first analytics platform
  • ArcHive - Personal digital sanctuary
  • Minty - Smart expense tracker
  • Recon - Bug tracking intelligence system

\x1b[2mType 'systemctl status' to view projects\x1b[0m
\x1b[2mType 'git log' to view my journey\x1b[0m
`,
        };

      case "contact.sh":
      case "contact":
        return {
          output: `
\x1b[1;36m#!/bin/bash\x1b[0m
\x1b[1;32m#\x1b[0m
\x1b[1;32m# Contact Information - Atharv Dange\x1b[0m
\x1b[1;32m#\x1b[0m

\x1b[1;33mecho\x1b[0m "📬 Get in Touch"
\x1b[1;33mecho\x1b[0m "================================"
\x1b[1;33mecho\x1b[0m ""

\x1b[1;32m# Professional Links\x1b[0m
\x1b[1;33mecho\x1b[0m "🐙 GitHub:   \x1b[4mhttps://github.com/atharvdange618\x1b[0m"
\x1b[1;33mecho\x1b[0m "💼 LinkedIn: \x1b[4mhttps://linkedin.com/in/atharvdange\x1b[0m"
\x1b[1;33mecho\x1b[0m "📧 Email:    \x1b[4matharvdange.dev@gmail.com\x1b[0m"
\x1b[1;33mecho\x1b[0m ""

\x1b[1;32m# Availability\x1b[0m
\x1b[1;33mecho\x1b[0m "💡 Available for:"
\x1b[1;33mecho\x1b[0m "  • Full Stack Development Roles"
\x1b[1;33mecho\x1b[0m "  • Backend Engineering Opportunities"
\x1b[1;33mecho\x1b[0m "  • Open Source Collaborations"
\x1b[1;33mecho\x1b[0m ""

\x1b[1;32m# Location & Status\x1b[0m
\x1b[1;33mecho\x1b[0m "📍 Location: Pune, Maharashtra, India"
\x1b[1;33mecho\x1b[0m "⚡ Status:   \x1b[1;32mOpen to opportunities\x1b[0m"
\x1b[1;33mecho\x1b[0m ""

\x1b[2m# Feel free to reach out for collaborations or opportunities!\x1b[0m
`,
        };

      case "skills.json":
      case "skills":
        return {
          output: `\x1b[2mTip: Use '\x1b[0mnpm list\x1b[2m' for a better formatted skills view\x1b[0m\n`,
        };

      case "readme.md":
      case "readme":
        return {
          output: `
\x1b[1;36m# Portfolio Terminal v2.0\x1b[0m

\x1b[1;33m## Interactive Terminal-Based Portfolio\x1b[0m

Welcome to my terminal-based portfolio! This is a fully interactive command-line
interface where you can explore my projects, experience, and skills.

\x1b[1;32m### Quick Start Commands:\x1b[0m

  \x1b[1;34m→\x1b[0m \x1b[1;32mcat about.md\x1b[0m       Learn about me and my journey
  \x1b[1;34m→\x1b[0m \x1b[1;32msystemctl status\x1b[0m  View all my active projects
  \x1b[1;34m→\x1b[0m \x1b[1;32mgit log\x1b[0m           See my experience timeline
  \x1b[1;34m→\x1b[0m \x1b[1;32mnpm list\x1b[0m          Browse my technical skills
  \x1b[1;34m→\x1b[0m \x1b[1;32mcat contact.sh\x1b[0m    Get in touch with me

\x1b[1;32m### Features:\x1b[0m

  ✓ Real command-line interface with xterm.js
  ✓ Tab completion for commands (try pressing Tab)
  ✓ Command history with arrow keys (↑/↓)
  ✓ Keyboard shortcuts (Ctrl+C, Ctrl+L)
  ✓ Live GitHub and NPM stats integration
  ✓ Easter eggs (try \x1b[1;33mcowsay\x1b[0m, \x1b[1;33mfortune\x1b[0m, \x1b[1;33mmatrix\x1b[0m)
  ✓ Multiple themes (try \x1b[1;33mtheme list\x1b[0m)

\x1b[1;32m### Tech Stack:\x1b[0m

  • Next.js 14+ with App Router
  • TypeScript for type safety
  • xterm.js for terminal emulation
  • Tailwind CSS v4 for styling
  • Zustand for state management
  • Framer Motion for animations

\x1b[1;32m### Tips:\x1b[0m

  • Press \x1b[1;33mTab\x1b[0m to autocomplete commands
  • Use \x1b[1;33m↑\x1b[0m and \x1b[1;33m↓\x1b[0m arrows for command history
  • Type \x1b[1;33mhelp\x1b[0m to see all available commands
  • Try \x1b[1;33mexit\x1b[0m to see a farewell message
  • Type \x1b[1;33mmotd\x1b[0m to see the welcome screen again

\x1b[2mBuilt with ❤️  by Atharv Dange | January 2026\x1b[0m
`,
        };

      default:
        return {
          output: `\x1b[1;31mError:\x1b[0m cat: ${filename}: No such file or directory\n\x1b[2mAvailable files: about.md, contact.sh, readme.md, skills.json\x1b[0m\n`,
          exitCode: 1,
        };
    }
  },
};

// Echo command
export const echoCommand: CommandDefinition = {
  name: "echo",
  description: "Display a line of text",
  usage: "echo <text>",
  execute: (context: CommandContext): CommandResponse => {
    if (context.args.length === 0) {
      return { output: "\n" };
    }
    return { output: context.args.join(" ") + "\n" };
  },
};

// History command
export const historyCommand: CommandDefinition = {
  name: "history",
  description: "Show command history",
  execute: (): CommandResponse => {
    return {
      output:
        "\x1b[1;33mNote:\x1b[0m Use ↑/↓ arrow keys to navigate command history\n",
    };
  },
};

// Date command
export const dateCommand: CommandDefinition = {
  name: "date",
  description: "Display current date and time",
  execute: (): CommandResponse => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    const dateStr = now.toLocaleString("en-US", options);
    return { output: `${dateStr}\n` };
  },
};

// Time command
export const timeCommand: CommandDefinition = {
  name: "time",
  description: "Display current time",
  execute: (): CommandResponse => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    return { output: `${timeStr}\n` };
  },
};

// Uptime command
export const uptimeCommand: CommandDefinition = {
  name: "uptime",
  description: "Show system uptime",
  execute: (): CommandResponse => {
    const codingStartDate = new Date("2021-01-01");
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - codingStartDate.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;

    // Calculate hours, minutes for current session
    const sessionStart = new Date();
    sessionStart.setHours(sessionStart.getHours() - 2);
    const sessionDiff = Math.abs(now.getTime() - sessionStart.getTime());
    const hours = Math.floor(sessionDiff / (1000 * 60 * 60));
    const minutes = Math.floor((sessionDiff % (1000 * 60 * 60)) / (1000 * 60));

    const currentTime = now.toTimeString().split(" ")[0];
    const loadAvg = "0.45, 0.52, 0.48";

    const output = `
 ${currentTime} up ${diffDays} days (${years} years, ${remainingDays} days since coding journey began)
 Session: ${hours}:${minutes
      .toString()
      .padStart(2, "0")} | Load average: ${loadAvg}
 
 \x1b[1;36mCoding Journey Stats:\x1b[0m
 \x1b[1;32m→\x1b[0m Started: January 2021
 \x1b[1;32m→\x1b[0m Days coding: ${diffDays} days
 \x1b[1;32m→\x1b[0m Projects built: 80+
 \x1b[1;32m→\x1b[0m Status: \x1b[1;32m✓ All systems operational\x1b[0m
`;
    return { output };
  },
};

// Exit command
export const exitCommand: CommandDefinition = {
  name: "exit",
  description: "Exit the terminal (show goodbye message)",
  aliases: ["logout", "quit"],
  execute: (): CommandResponse => {
    const output = `
\x1b[1;36m╔════════════════════════════════════════════════╗\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mThanks for visiting atharvdange.dev!\x1b[0m          \x1b[1;36m║\x1b[0m
\x1b[1;36m╚════════════════════════════════════════════════╝\x1b[0m

\x1b[1;32m→\x1b[0m Portfolio terminal session ended
\x1b[1;32m→\x1b[0m Feel free to explore more or reach out!

\x1b[2mType 'motd' to see the welcome screen again\x1b[0m
\x1b[2mType 'help' to view all available commands\x1b[0m

\x1b[1;33mConnection to atharvdange.dev closed.\x1b[0m
`;
    return { output };
  },
};

// MOTD command (re-show welcome message)
export const motdCommand: CommandDefinition = {
  name: "motd",
  description: "Display Message of the Day",
  aliases: ["welcome"],
  execute: (): CommandResponse => {
    const now = new Date();
    const dateStr = now.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    const output = `
\x1b[1;36m╔════════════════════════════════════════════════════╗\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;33mWelcome to atharvdange.dev\x1b[0m                        \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  Last login: ${dateStr.padEnd(30)}        \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m                                                    \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  \x1b[1;32m[Portfolio Server v2.0]\x1b[0m                           \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  System Uptime: \x1b[1;32m99.98%\x1b[0m                             \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  Active Projects: \x1b[1;32m6 running\x1b[0m                        \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  Coding Since: \x1b[1;33mJanuary 2021\x1b[0m                        \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m                                                    \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  Type '\x1b[1;32mhelp\x1b[0m' to see available commands             \x1b[1;36m║\x1b[0m
\x1b[1;36m║\x1b[0m  Press \x1b[1;33mTab\x1b[0m for auto-completion                     \x1b[1;36m║\x1b[0m
\x1b[1;36m╚════════════════════════════════════════════════════╝\x1b[0m

\x1b[1;36mQuick Start:\x1b[0m
  \x1b[1;32mcat about.md\x1b[0m       - Learn about me
  \x1b[1;32msystemctl status\x1b[0m  - View my projects
  \x1b[1;32mgit log\x1b[0m           - See my journey
  \x1b[1;32mcat contact.sh\x1b[0m    - Get in touch
`;
    return { output };
  },
};

export const basicCommands = [
  helpCommand,
  whoamiCommand,
  catCommand,
  echoCommand,
  historyCommand,
  dateCommand,
  timeCommand,
  uptimeCommand,
  exitCommand,
  motdCommand,
  neofetchCommand,
];
