import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";
import { useFileSystemStore } from "@/store/filesystem-store";

// cd command - Change directory
export const cdCommand: CommandDefinition = {
  name: "cd",
  description: "Change directory",
  usage: "cd <directory>",
  execute: async (context: CommandContext): Promise<CommandResponse> => {
    const target = context.args[0] || "~";
    const { navigateTo } = useFileSystemStore.getState();

    const success = navigateTo(target);

    if (!success) {
      return {
        output: `\x1b[1;31mcd:\x1b[0m ${target}: No such file or directory\n`,
        exitCode: 1,
      };
    }

    return {
      output: "",
    };
  },
};

// pwd command - Print working directory
export const pwdCommand: CommandDefinition = {
  name: "pwd",
  description: "Print working directory",
  execute: async (): Promise<CommandResponse> => {
    const { getAbsolutePath } = useFileSystemStore.getState();
    const path = getAbsolutePath();
    return {
      output: `/home/atharv/portfolio${path === "/" ? "" : path}\n`,
    };
  },
};

// ls command - List directory contents
export const lsCommand: CommandDefinition = {
  name: "ls",
  description: "List directory contents",
  aliases: ["dir"],
  execute: async (context: CommandContext): Promise<CommandResponse> => {
    const { getCurrentDirectory } = useFileSystemStore.getState();
    const currentDir = getCurrentDirectory();

    if (!currentDir || !currentDir.children) {
      return {
        output: "\x1b[1;31mError:\x1b[0m Cannot read directory\n",
        exitCode: 1,
      };
    }

    const detailed = context.flags.l || context.flags.la || context.flags.all;

    if (detailed) {
      let output = `\x1b[1;36mtotal ${currentDir.children.length}\x1b[0m\n`;

      currentDir.children.forEach((item) => {
        const type = item.type === "directory" ? "d" : "-";
        const color = item.type === "directory" ? "\x1b[1;34m" : "\x1b[0m";
        const suffix = item.type === "directory" ? "/" : "";
        output += `${type}rwxr-xr-x  atharv  staff    4096  Dec 11 00:00  ${color}${item.name}${suffix}\x1b[0m\n`;
      });

      return { output };
    }

    // Simple listing
    const files = currentDir.children
      .map((item) => {
        const color = item.type === "directory" ? "\x1b[1;34m" : "\x1b[0m";
        const suffix = item.type === "directory" ? "/" : "";
        return `${color}${item.name}${suffix}\x1b[0m`;
      })
      .join("    ");

    return {
      output: `\n${files}\n`,
    };
  },
};
