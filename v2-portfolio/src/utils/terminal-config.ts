import { ITheme } from "@xterm/xterm";

export const terminalTheme: ITheme = {
  background: "#0d1117",
  foreground: "#c9d1d9",
  cursor: "#50fa7b",
  cursorAccent: "#0d1117",

  black: "#1a1d29",
  red: "#ff5555",
  green: "#50fa7b",
  yellow: "#f1fa8c",
  blue: "#8be9fd",
  magenta: "#ff79c6",
  cyan: "#78dce8",
  white: "#c9d1d9",

  brightBlack: "#6272a4",
  brightRed: "#ff6e6e",
  brightGreen: "#69ff94",
  brightYellow: "#ffffa5",
  brightBlue: "#a4ffff",
  brightMagenta: "#ff92df",
  brightCyan: "#a4ffff",
  brightWhite: "#ffffff",

  selectionBackground: "#44475a",
  selectionForeground: "#f8f8f2",
};

export const terminalConfig = {
  fontFamily: '"JetBrains Mono", "Fira Code", Monaco, Consolas, monospace',
  fontSize: 14,
  lineHeight: 1.6,

  letterSpacing: 0,

  cursorBlink: true,
  cursorStyle: "block" as const,
  cursorWidth: 1,
  scrollback: 1000,
  scrollOnUserInput: true,
  tabStopWidth: 4,
  allowProposedApi: true,
  theme: terminalTheme,
  fontWeight: 400,
  fontWeightBold: 700,

  convertEol: true,
};
