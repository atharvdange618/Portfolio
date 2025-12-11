import { CommandRegistry } from "./command-registry";

export interface CompletionResult {
  completions: string[];
  commonPrefix: string;
}

/**
 * Tab completion handler for terminal commands
 */
export class TabCompletion {
  private commandRegistry: CommandRegistry;
  private files = ["about.md", "contact.sh", "skills.json"];
  private directories = ["projects/", "experience/", ".github/"];

  constructor(commandRegistry: CommandRegistry) {
    this.commandRegistry = commandRegistry;
  }

  /**
   * Get completions for the current input
   */
  complete(input: string): CompletionResult {
    const trimmed = input.trim();

    // Empty input - show nothing
    if (!trimmed) {
      return { completions: [], commonPrefix: "" };
    }

    const parts = trimmed.split(/\s+/);
    const firstWord = parts[0];

    // If only one word, complete command names
    if (parts.length === 1) {
      return this.completeCommand(firstWord);
    }

    // Multi-word: complete arguments based on command
    return this.completeArgument(firstWord, parts.slice(1));
  }

  /**
   * Complete command names
   */
  private completeCommand(partial: string): CompletionResult {
    const commands = this.commandRegistry.getAll();
    const commandNames = commands.map((cmd) => cmd.name);

    const matches = commandNames.filter((name) =>
      name.startsWith(partial.toLowerCase())
    );

    if (matches.length === 0) {
      return { completions: [], commonPrefix: partial };
    }

    const commonPrefix = this.findCommonPrefix(matches);
    return { completions: matches, commonPrefix };
  }

  /**
   * Complete arguments based on command type
   */
  private completeArgument(command: string, args: string[]): CompletionResult {
    const cmd = command.toLowerCase();
    const lastArg = args[args.length - 1] || "";

    switch (cmd) {
      case "cat":
        return this.completeFiles(lastArg);

      case "systemctl":
        // systemctl status <service>
        if (args[0] === "status" || args[0] === "show") {
          return this.completeServices(lastArg);
        }
        // Complete subcommand (status, show)
        return this.completeSystemctlSubcommand(lastArg);

      case "npm":
        // npm info <skill>
        if (args[0] === "info") {
          return this.completeSkills(lastArg);
        }
        // Complete subcommand (list, info)
        return this.completeNpmSubcommand(lastArg);

      case "git":
        // Complete subcommand (log)
        return this.completeGitSubcommand(lastArg);

      case "ls":
      case "dir":
        // No argument completion for ls
        return { completions: [], commonPrefix: lastArg };

      default:
        return { completions: [], commonPrefix: lastArg };
    }
  }

  /**
   * Complete file names for cat command
   */
  private completeFiles(partial: string): CompletionResult {
    const allItems = [...this.files, ...this.directories];
    const matches = allItems.filter((file) =>
      file.toLowerCase().startsWith(partial.toLowerCase())
    );

    if (matches.length === 0) {
      return { completions: [], commonPrefix: partial };
    }

    const commonPrefix = this.findCommonPrefix(matches);
    return { completions: matches, commonPrefix };
  }

  /**
   * Complete service names for systemctl
   */
  private completeServices(partial: string): CompletionResult {
    const services = [
      "reiatsu",
      "telemetry",
      "archive",
      "minty",
      "recon",
      "xml-sitemap-generator",
    ];

    const matches = services.filter((service) =>
      service.startsWith(partial.toLowerCase())
    );

    if (matches.length === 0) {
      return { completions: [], commonPrefix: partial };
    }

    const commonPrefix = this.findCommonPrefix(matches);
    return { completions: matches, commonPrefix };
  }

  /**
   * Complete systemctl subcommands
   */
  private completeSystemctlSubcommand(partial: string): CompletionResult {
    const subcommands = ["status", "show"];
    const matches = subcommands.filter((sub) => sub.startsWith(partial));

    if (matches.length === 0) {
      return { completions: [], commonPrefix: partial };
    }

    const commonPrefix = this.findCommonPrefix(matches);
    return { completions: matches, commonPrefix };
  }

  /**
   * Complete npm subcommands
   */
  private completeNpmSubcommand(partial: string): CompletionResult {
    const subcommands = ["list", "info"];
    const matches = subcommands.filter((sub) => sub.startsWith(partial));

    if (matches.length === 0) {
      return { completions: [], commonPrefix: partial };
    }

    const commonPrefix = this.findCommonPrefix(matches);
    return { completions: matches, commonPrefix };
  }

  /**
   * Complete git subcommands
   */
  private completeGitSubcommand(partial: string): CompletionResult {
    const subcommands = ["log"];
    const matches = subcommands.filter((sub) => sub.startsWith(partial));

    if (matches.length === 0) {
      return { completions: [], commonPrefix: partial };
    }

    const commonPrefix = this.findCommonPrefix(matches);
    return { completions: matches, commonPrefix };
  }

  /**
   * Complete skill names for npm info
   */
  private completeSkills(partial: string): CompletionResult {
    const skills = [
      "typescript",
      "javascript",
      "nodejs",
      "react",
      "nextjs",
      "postgresql",
      "mongodb",
      "redis",
      "docker",
      "git",
      "linux",
      "fastify",
      "express",
      "prisma",
      "tailwindcss",
    ];

    const matches = skills.filter((skill) =>
      skill.startsWith(partial.toLowerCase())
    );

    if (matches.length === 0) {
      return { completions: [], commonPrefix: partial };
    }

    const commonPrefix = this.findCommonPrefix(matches);
    return { completions: matches, commonPrefix };
  }

  /**
   * Find the longest common prefix among strings
   */
  private findCommonPrefix(strings: string[]): string {
    if (strings.length === 0) return "";
    if (strings.length === 1) return strings[0];

    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (strings[i].indexOf(prefix) !== 0) {
        prefix = prefix.substring(0, prefix.length - 1);
        if (prefix === "") return "";
      }
    }
    return prefix;
  }

  /**
   * Format completions for display (when there are multiple matches)
   */
  formatCompletions(completions: string[]): string {
    if (completions.length === 0) return "";
    if (completions.length === 1) return "";

    // Display completions in columns
    const maxLength = Math.max(...completions.map((c) => c.length));
    const columns = Math.floor(80 / (maxLength + 2));
    const rows = Math.ceil(completions.length / columns);

    let output = "\n";
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const index = row + col * rows;
        if (index < completions.length) {
          const item = completions[index];
          output += item.padEnd(maxLength + 2);
        }
      }
      output += "\n";
    }

    return output;
  }
}
