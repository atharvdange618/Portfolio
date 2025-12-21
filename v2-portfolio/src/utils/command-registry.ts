export interface CommandContext {
  args: string[];
  flags: Record<string, boolean | string>;
  rawInput: string;
}

export interface CommandResponse {
  output: string;
  exitCode?: number;
  metadata?: {
    interactive?: boolean;
    mode?: string;
    items?: unknown[];
    [key: string]: unknown;
  };
}

export type CommandExecutor = (
  context: CommandContext
) => Promise<CommandResponse> | CommandResponse;

export interface CommandDefinition {
  name: string;
  description: string;
  usage?: string;
  aliases?: string[];
  execute: CommandExecutor;
}

export class CommandRegistry {
  private commands: Map<string, CommandDefinition> = new Map();

  register(command: CommandDefinition): void {
    this.commands.set(command.name, command);

    // Register aliases
    if (command.aliases) {
      command.aliases.forEach((alias) => {
        this.commands.set(alias, command);
      });
    }
  }

  get(name: string): CommandDefinition | undefined {
    return this.commands.get(name.toLowerCase());
  }

  getAll(): CommandDefinition[] {
    const uniqueCommands = new Map<string, CommandDefinition>();

    this.commands.forEach((cmd) => {
      if (!uniqueCommands.has(cmd.name)) {
        uniqueCommands.set(cmd.name, cmd);
      }
    });

    return Array.from(uniqueCommands.values());
  }
}

export function parseCommand(input: string): CommandContext {
  const trimmed = input.trim();
  const parts = trimmed.split(/\s+/);

  const args: string[] = [];
  const flags: Record<string, boolean | string> = {};

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];

    if (part.startsWith("--")) {
      // Long flag: --flag or --flag=value
      const [flagName, flagValue] = part.slice(2).split("=");
      flags[flagName] = flagValue || true;
    } else if (part.startsWith("-") && part.length > 1) {
      // Short flag: -f or -abc (multiple flags)
      const flagChars = part.slice(1);
      for (const char of flagChars) {
        flags[char] = true;
      }
    } else {
      args.push(part);
    }
  }

  return {
    args,
    flags,
    rawInput: trimmed,
  };
}
