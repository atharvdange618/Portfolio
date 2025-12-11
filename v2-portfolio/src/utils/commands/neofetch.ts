import { CommandDefinition, CommandResponse } from "@/utils/command-registry";

// neofetch command - Display system information
export const neofetchCommand: CommandDefinition = {
  name: "neofetch",
  description: "Show system information",
  execute: (): CommandResponse => {
    return { output: formatNeofetch() };
  },
};

function formatNeofetch(): string {
  const c = {
    cyan: "\x1b[1;36m",
    yellow: "\x1b[1;33m",
    reset: "\x1b[0m",
    blue: "\x1b[1;34m",
    // Color Palette Blocks
    black: "\x1b[40m   \x1b[0m",
    red: "\x1b[41m   \x1b[0m",
    green: "\x1b[42m   \x1b[0m",
    yellowBg: "\x1b[43m   \x1b[0m",
    blueBg: "\x1b[44m   \x1b[0m",
    magenta: "\x1b[45m   \x1b[0m",
    cyanBg: "\x1b[46m   \x1b[0m",
    white: "\x1b[47m   \x1b[0m",
  };

  return `
    ${c.cyan}       ______       ${c.reset}   ${c.cyan}atharv${c.reset}@${c.cyan}portfolio${c.reset}
    ${c.cyan}      /  __  \\      ${c.reset}   ---------------------------
    ${c.cyan}     /  /  \\  \\     ${c.reset}   ${c.yellow}OS${c.reset}:        Portfolio v2.0
    ${c.cyan}    /  /____\\  \\    ${c.reset}   ${c.yellow}Host${c.reset}:      atharvdange.dev
    ${c.cyan}   /  ______    \\   ${c.reset}   ${c.yellow}Kernel${c.reset}:    Next.js 16.0.8
    ${c.cyan}  /__/      \\____\\  ${c.reset}   ${c.yellow}Uptime${c.reset}:    4 years (since Jan 2021)
    ${c.cyan}                    ${c.reset}   ${c.yellow}Packages${c.reset}:  6 projects, 24 skills
    ${c.cyan}                    ${c.reset}
    ${c.cyan}                    ${c.reset}   ${c.yellow}Shell${c.reset}:     xterm.js
    ${c.cyan}                    ${c.reset}   ${c.yellow}Terminal${c.reset}:  Web Terminal
    ${c.cyan}                    ${c.reset}   ${c.yellow}CPU${c.reset}:       Full Stack Engineer
    ${c.cyan}                    ${c.reset}   ${c.yellow}GPU${c.reset}:       TypeScript Enthusiast
    ${c.cyan}                    ${c.reset}   ${c.yellow}Memory${c.reset}:    MERN/PERN Stack
    ${c.cyan}                    ${c.reset}   ${c.yellow}Disk${c.reset}:      React Native, Expo

    ${c.cyan}                    ${c.reset}   ${c.black}${c.red}${c.green}${c.yellowBg}${c.blueBg}${c.magenta}${c.cyanBg}${c.white}
  `;
}
