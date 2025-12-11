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

  \x1b[1;32mhelp\x1b[0m              Show this help message
  \x1b[1;32mls\x1b[0m                List available sections
  \x1b[1;32mcat\x1b[0m <file>        View section content
  \x1b[1;32mpwd\x1b[0m               Print current directory
  \x1b[1;32mclear\x1b[0m             Clear the terminal screen
  \x1b[1;32mecho\x1b[0m <text>       Display a line of text
  \x1b[1;32mhistory\x1b[0m           Show command history tip

  \x1b[1;32msystemctl\x1b[0m status  View running projects/services
  \x1b[1;32mgit\x1b[0m log           View experience timeline
  \x1b[1;32mnpm\x1b[0m list          View skills and packages

  \x1b[1;32mwhoami\x1b[0m            Display user information
  \x1b[1;32mneofetch\x1b[0m          Show system information

\x1b[2mTip: Press Tab for auto-completion. Use ↑/↓ arrows for command history.\x1b[0m
`;
    return { output };
  },
};

// ls command
export const lsCommand: CommandDefinition = {
  name: "ls",
  description: "List available sections",
  aliases: ["dir"],
  execute: (context: CommandContext): CommandResponse => {
    const detailed = context.flags.l || context.flags.la || context.flags.all;

    if (detailed) {
      const output = `
\x1b[1;36mtotal 6\x1b[0m
drwxr-xr-x  atharv  staff    4096  Dec 11 00:00  \x1b[1;34m.\x1b[0m
drwxr-xr-x  atharv  staff    4096  Dec 11 00:00  \x1b[1;34m..\x1b[0m
-rw-r--r--  atharv  staff    2048  Dec 11 00:00  \x1b[0mabout.md\x1b[0m
drwxr-xr-x  atharv  staff    4096  Dec 11 00:00  \x1b[1;34mprojects\x1b[0m
drwxr-xr-x  atharv  staff    4096  Dec 11 00:00  \x1b[1;34mexperience\x1b[0m
-rw-r--r--  atharv  staff    1024  Dec 11 00:00  \x1b[0mskills.json\x1b[0m
-rwxr-xr-x  atharv  staff    512   Dec 11 00:00  \x1b[1;32mcontact.sh\x1b[0m
drwxr-xr-x  atharv  staff    4096  Dec 11 00:00  \x1b[1;34m.github\x1b[0m
`;
      return { output };
    }

    const output = `
\x1b[1;34mabout.md\x1b[0m       \x1b[1;34mprojects/\x1b[0m      \x1b[1;34mexperience/\x1b[0m    
\x1b[1;34mskills.json\x1b[0m    \x1b[1;32mcontact.sh\x1b[0m     \x1b[1;34m.github/\x1b[0m
`;
    return { output };
  },
};

// pwd command
export const pwdCommand: CommandDefinition = {
  name: "pwd",
  description: "Print working directory",
  execute: (): CommandResponse => {
    return { output: "/home/atharv/portfolio\n" };
  },
};

// whoami command
export const whoamiCommand: CommandDefinition = {
  name: "whoami",
  description: "Display current user",
  execute: (): CommandResponse => {
    const output = `
\x1b[1;36matharv\x1b[0m

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

      default:
        return {
          output: `\x1b[1;31mError:\x1b[0m cat: ${filename}: No such file or directory\n\x1b[2mAvailable files: about.md, contact.sh, skills.json\x1b[0m\n`,
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

export const basicCommands = [
  helpCommand,
  lsCommand,
  pwdCommand,
  whoamiCommand,
  catCommand,
  echoCommand,
  historyCommand,
  neofetchCommand,
];
