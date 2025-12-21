import { ITheme } from "@xterm/xterm";
import { themes } from "@/store/theme-store";

// Use default theme from theme store
export const terminalTheme: ITheme = themes.default.theme;

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
