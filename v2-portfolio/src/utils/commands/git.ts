import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";
import { experiences } from "@/data/portfolio-data";
import { Experience } from "@/types/terminal";

// git command - Display experience timeline as git log
export const gitCommand: CommandDefinition = {
  name: "git",
  description: "View experience timeline",
  usage: "git log [--oneline]",
  execute: (context: CommandContext): CommandResponse => {
    const subcommand = context.args[0];

    if (subcommand !== "log") {
      return {
        output: `\x1b[1;31mError:\x1b[0m Unknown git command '${subcommand}'\nUsage: git log [--oneline]\n`,
        exitCode: 1,
      };
    }

    const oneline = context.flags.oneline || false;

    if (oneline) {
      return { output: formatGitLogOneline(experiences) };
    }

    return { output: formatGitLog(experiences) };
  },
};

function formatGitLogOneline(experienceList: Experience[]): string {
  let output = "";

  experienceList.forEach((exp: Experience) => {
    const hashColor = "\x1b[33m"; // Yellow for hash
    const iconColor = "\x1b[35m"; // Magenta for icon
    const titleColor = "\x1b[0m"; // Default for title

    output += `${hashColor}${exp.hash}${titleColor} ${iconColor}${exp.icon}${titleColor} ${exp.title}\n`;
  });

  return output;
}

function formatGitLog(experienceList: Experience[]): string {
  let output = "";

  experienceList.forEach((exp: Experience, index: number) => {
    // Commit hash line
    output += `\x1b[33mcommit ${exp.hash}\x1b[0m\n`;

    // Author line
    output += `Author: Atharv Dange <atharvdange618@gmail.com>\n`;

    // Date line
    output += `Date:   ${exp.period}\n\n`;

    // Commit message (title)
    output += `    ${exp.icon} ${exp.title}\n\n`;

    // Description with indentation
    output += `    ${exp.description}\n`;
    if (exp.company) {
      output += `    Company: ${exp.company}\n`;
    }

    // Add spacing between commits (except for the last one)
    if (index < experienceList.length - 1) {
      output += `\n`;
    }
  });

  return output;
}
