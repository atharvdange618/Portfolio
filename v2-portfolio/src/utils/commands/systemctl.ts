import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";
import { projects } from "@/data/portfolio-data";
import { Project } from "@/types/terminal";

// systemctl command - Display projects as running services
export const systemctlCommand: CommandDefinition = {
  name: "systemctl",
  description: "View running projects/services",
  usage: "systemctl status [service-name]",
  execute: (context: CommandContext): CommandResponse => {
    const subcommand = context.args[0];
    const serviceName = context.args[1];

    if (!subcommand || (subcommand !== "status" && subcommand !== "show")) {
      return {
        output: `\x1b[1;31mError:\x1b[0m Unknown operation '${
          subcommand || "(none)"
        }'\nUsage: systemctl status [service-name]\n       systemctl show <service-name>\n`,
        exitCode: 1,
      };
    }

    // Handle 'show' command (alias for detailed status)
    if (subcommand === "show") {
      if (!serviceName) {
        return {
          output: `\x1b[1;31mError:\x1b[0m Missing service name\nUsage: systemctl show <service-name>\n`,
          exitCode: 1,
        };
      }

      const project = projects.find(
        (p: Project) =>
          p.id === serviceName.toLowerCase().replace(".service", "") ||
          p.name.toLowerCase().includes(serviceName.toLowerCase())
      );

      if (!project) {
        return {
          output: `\x1b[1;31mError:\x1b[0m Unit ${serviceName} not found.\n`,
          exitCode: 1,
        };
      }

      return {
        output: formatServiceDetail(project),
      };
    }

    // If specific service requested
    if (serviceName) {
      const project = projects.find(
        (p: Project) =>
          p.id === serviceName.toLowerCase() ||
          p.name.toLowerCase().includes(serviceName.toLowerCase())
      );

      if (!project) {
        return {
          output: `\x1b[1;31mError:\x1b[0m Unit ${serviceName}.service not found.\n`,
          exitCode: 1,
        };
      }

      return {
        output: formatServiceDetail(project),
      };
    }

    // List all services
    const output = formatServiceList(projects);
    return { output };
  },
};

function formatServiceList(projectsList: Project[]): string {
  let output = `\x1b[1;32m●\x1b[0m \x1b[1mSystem Status\x1b[0m - \x1b[1;32m${projectsList.length} services running\x1b[0m\n\n`;

  output += `\x1b[1m  UNIT                          LOAD   ACTIVE       SUB     DESCRIPTION\x1b[0m\n`;

  projectsList.forEach((project: Project) => {
    const unit = project.name.padEnd(28);
    const status = project.status || "running";
    const statusColor =
      status === "stable" || status === "running" ? "\x1b[1;32m" : "\x1b[1;33m";
    const desc = project.description.substring(0, 40);

    output += `\x1b[1;32m●\x1b[0m ${unit} loaded ${statusColor}${status.padEnd(
      11
    )}\x1b[0m running ${desc}...\n`;
  });

  output += `\n\x1b[1;32mLOAD\x1b[0m   = Reflects whether the unit definition was properly loaded.\n`;
  output += `\x1b[1;32mACTIVE\x1b[0m = The high-level unit activation state, i.e. generalization of SUB.\n`;
  output += `\x1b[1;32mSUB\x1b[0m    = The low-level unit activation state, values depend on unit type.\n`;
  output += `\n\x1b[2mType 'systemctl status <service-id>' for details (e.g., systemctl status reiatsu)\x1b[0m\n`;

  return output;
}

function formatServiceDetail(project: Project): string {
  const status = project.status || "running";
  const statusColor =
    status === "stable" || status === "running" ? "\x1b[1;32m" : "\x1b[1;33m";
  const uptime = project.uptime ? `${project.uptime} days` : "unknown";

  let output = `${statusColor}●\x1b[0m \x1b[1m${project.name}\x1b[0m - ${project.id}\n`;
  output += `   Loaded: loaded (/usr/lib/systemd/services/${project.id}.service; enabled)\n`;
  output += `   Active: ${statusColor}${status}\x1b[0m (running)\n`;
  if (project.uptime) {
    output += `   Uptime: ${uptime}\n`;
  }
  output += `     Docs: ${project.live || project.github}\n`;
  output += `  Process: PID=${Math.floor(Math.random() * 10000)} (node)\n`;
  output += `    Tasks: ${project.tech.length} (limit: 4096)\n`;
  output += `   Memory: ${Math.floor(Math.random() * 100 + 50)}.0M\n`;
  output += `      CPU: ${(Math.random() * 5).toFixed(1)}s\n\n`;

  // Wrap description at 80 characters
  const wrappedDesc = wrapText(project.description, 150);
  output += `\x1b[1mDescription:\x1b[0m\n${wrappedDesc}\n\n`;

  output += `\x1b[1mTech Stack:\x1b[0m\n`;
  project.tech.forEach((tech: string) => {
    output += `  \x1b[1;34m•\x1b[0m ${tech}\n`;
  });
  output += `\n`;

  if (project.metrics) {
    output += `\x1b[1mMetrics:\x1b[0m\n`;
    if (project.metrics.downloads !== undefined) {
      output += `  NPM Downloads: ${project.metrics.downloads.toLocaleString()}\n`;
    }
    if (project.metrics.stars !== undefined) {
      output += `  GitHub Stars:  ${project.metrics.stars}\n`;
    }
    if (project.metrics.activeUsers !== undefined) {
      output += `  Active Users:  ${project.metrics.activeUsers.toLocaleString()}\n`;
    }
    if (project.metrics.responseTime !== undefined) {
      output += `  Response Time: ${project.metrics.responseTime}ms\n`;
    }
    if (project.metrics.coverage !== undefined) {
      output += `  Test Coverage: ${project.metrics.coverage}%\n`;
    }
    output += `\n`;
  }

  output += `\x1b[1mLinks:\x1b[0m\n`;
  output += `  GitHub: \x1b[4m${project.github}\x1b[0m\n`;
  if (project.live) {
    output += `  Live:   \x1b[4m${project.live}\x1b[0m\n`;
  }
  if (project.npm) {
    output += `  NPM:    \x1b[4mhttps://www.npmjs.com/package/${project.npm}\x1b[0m\n`;
  }

  return output;
}

function wrapText(text: string, maxWidth: number): string {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + word).length > maxWidth) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  });

  if (currentLine) lines.push(currentLine.trim());
  return lines.join("\n");
}
