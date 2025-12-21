import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";
import { useThemeStore, ThemeName, themes } from "@/store/theme-store";

export const themeCommand: CommandDefinition = {
  name: "theme",
  description: "Manage terminal themes",
  usage: "theme [list|set <name>]",
  execute: async (context: CommandContext): Promise<CommandResponse> => {
    const subcommand = context.args[0];

    // No arguments - show current theme
    if (!subcommand) {
      const { currentTheme } = useThemeStore.getState();
      const theme = themes[currentTheme];
      return {
        output: `\x1b[1;36mCurrent theme:\x1b[0m ${theme.displayName}\n${theme.description}\n\nUse \x1b[1;33m'theme list'\x1b[0m to see all themes or \x1b[1;33m'theme set <name>'\x1b[0m to change.\n`,
      };
    }

    // List all themes
    if (subcommand === "list" || subcommand === "ls") {
      const { currentTheme } = useThemeStore.getState();
      let output =
        "\x1b[1;36m╔════════════════════════════════════════════════════════════╗\x1b[0m\n";
      output +=
        "\x1b[1;36m║\x1b[0m                  \x1b[1;33mAvailable Themes\x1b[0m                          \x1b[1;36m║\x1b[0m\n";
      output +=
        "\x1b[1;36m╠════════════════════════════════════════════════════════════╣\x1b[0m\n";

      Object.values(themes).forEach((theme) => {
        const isActive = theme.name === currentTheme;
        const marker = isActive ? "\x1b[1;32m●\x1b[0m" : " ";
        const nameColor = isActive ? "\x1b[1;32m" : "\x1b[1;37m";
        const descColor = "\x1b[0;90m";

        // Calculate padding properly
        const namePadded = theme.displayName.padEnd(16);
        const descPadded = theme.description.padEnd(40);

        output += `\x1b[1;36m║\x1b[0m ${marker} ${nameColor}${namePadded}\x1b[0m ${descColor}${descPadded}\x1b[0m\x1b[1;36m║\x1b[0m\n`;
      });

      output +=
        "\x1b[1;36m╚════════════════════════════════════════════════════════════╝\x1b[0m\n\n";
      output += "Usage: \x1b[1;33mtheme set <name>\x1b[0m\n";
      output += "Example: \x1b[1;33mtheme set dracula\x1b[0m\n";

      return { output };
    }

    // Set theme
    if (subcommand === "set") {
      const themeName = context.args[1]?.toLowerCase();

      if (!themeName) {
        return {
          output:
            "\x1b[1;31mError:\x1b[0m Please specify a theme name\nUsage: theme set <name>\n",
          exitCode: 1,
        };
      }

      // Check if theme exists
      const themeExists = Object.keys(themes).includes(themeName as ThemeName);

      if (!themeExists) {
        let output = `\x1b[1;31mError:\x1b[0m Theme '${themeName}' not found\n\n`;
        output += "Available themes:\n";
        Object.values(themes).forEach((theme) => {
          output += `  • ${theme.displayName.toLowerCase()}\n`;
        });
        return {
          output,
          exitCode: 1,
        };
      }

      // Set the theme
      const { setTheme } = useThemeStore.getState();
      setTheme(themeName as ThemeName);

      const theme = themes[themeName as ThemeName];

      // Fun messages for specific themes
      let themeMessage = `\x1b[1;32m✓\x1b[0m Theme changed to \x1b[1;36m${theme.displayName}\x1b[0m\n${theme.description}\n`;

      if (themeName === "matrix") {
        themeMessage += "\n\x1b[1;32mWake up, Neo...\x1b[0m\n";
      } else if (themeName === "cyberpunk") {
        themeMessage += "\n\x1b[1;35mWelcome to Night City, choom.\x1b[0m\n";
      } else if (themeName === "dracula") {
        themeMessage += "\n\x1b[1;35mI vant to... code!\x1b[0m 🧛\n";
      }

      return {
        output: themeMessage,
      };
    }

    // Unknown subcommand
    return {
      output: `\x1b[1;31mError:\x1b[0m Unknown subcommand '${subcommand}'\nUsage: theme [list|set <name>]\n`,
      exitCode: 1,
    };
  },
};
