import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";
import { skills } from "@/data/portfolio-data";
import { Skill } from "@/types/terminal";

// npm command - Display skills as npm packages
export const npmCommand: CommandDefinition = {
  name: "npm",
  description: "View skills and packages",
  usage: "npm list [--depth=0]",
  execute: (context: CommandContext): CommandResponse => {
    const subcommand = context.args[0];

    if (subcommand !== "list" && subcommand !== "ls") {
      return {
        output: `\x1b[1;31mError:\x1b[0m Unknown npm command '${subcommand}'\nUsage: npm list\n`,
        exitCode: 1,
      };
    }

    return { output: formatNpmList(skills) };
  },
};

function formatNpmList(skillList: Skill[]): string {
  // Group skills by category
  const grouped: Record<string, Skill[]> = {
    backend: [],
    frontend: [],
    devops: [],
    tools: [],
  };

  skillList.forEach((skill: Skill) => {
    grouped[skill.category].push(skill);
  });

  let output = `\x1b[1;36matharv@portfolio\x1b[0m@\x1b[1;36m1.0.0\x1b[0m /home/atharv/portfolio\n`;

  // Backend
  if (grouped.backend.length > 0) {
    output += `\n\x1b[1;33m├──\x1b[0m \x1b[1mbackend-stack\x1b[0m\n`;
    grouped.backend.forEach((skill: Skill, index: number) => {
      const isLast = index === grouped.backend.length - 1;
      const connector = isLast ? "└──" : "├──";
      const version = getLevelVersion(skill.level);
      const experience = skill.experience
        ? ` \x1b[2m(${skill.experience})\x1b[0m`
        : "";

      output += `\x1b[1;33m│   ${connector}\x1b[0m ${skill.name}@\x1b[32m${version}\x1b[0m${experience}\n`;
    });
  }

  // Frontend
  if (grouped.frontend.length > 0) {
    output += `\n\x1b[1;33m├──\x1b[0m \x1b[1mfrontend-stack\x1b[0m\n`;
    grouped.frontend.forEach((skill: Skill, index: number) => {
      const isLast = index === grouped.frontend.length - 1;
      const connector = isLast ? "└──" : "├──";
      const version = getLevelVersion(skill.level);
      const experience = skill.experience
        ? ` \x1b[2m(${skill.experience})\x1b[0m`
        : "";

      output += `\x1b[1;33m│   ${connector}\x1b[0m ${skill.name}@\x1b[32m${version}\x1b[0m${experience}\n`;
    });
  }

  // DevOps
  if (grouped.devops.length > 0) {
    output += `\n\x1b[1;33m├──\x1b[0m \x1b[1mdevops-tools\x1b[0m\n`;
    grouped.devops.forEach((skill: Skill, index: number) => {
      const isLast = index === grouped.devops.length - 1;
      const connector = isLast ? "└──" : "├──";
      const version = getLevelVersion(skill.level);
      const experience = skill.experience
        ? ` \x1b[2m(${skill.experience})\x1b[0m`
        : "";

      output += `\x1b[1;33m│   ${connector}\x1b[0m ${skill.name}@\x1b[32m${version}\x1b[0m${experience}\n`;
    });
  }

  // Tools
  if (grouped.tools.length > 0) {
    output += `\n\x1b[1;33m└──\x1b[0m \x1b[1mdevelopment-tools\x1b[0m\n`;
    grouped.tools.forEach((skill: Skill, index: number) => {
      const isLast = index === grouped.tools.length - 1;
      const connector = isLast ? "└──" : "├──";
      const version = getLevelVersion(skill.level);
      const experience = skill.experience
        ? ` \x1b[2m(${skill.experience})\x1b[0m`
        : "";

      output += `\x1b[1;33m    ${connector}\x1b[0m ${skill.name}@\x1b[32m${version}\x1b[0m${experience}\n`;
    });
  }

  return output;
}

function getLevelVersion(level: Skill["level"]): string {
  switch (level) {
    case "expert":
      return "^5.0.0";
    case "advanced":
      return "^4.0.0";
    case "intermediate":
      return "^3.0.0";
    case "beginner":
      return "^1.0.0";
    default:
      return "^1.0.0";
  }
}
