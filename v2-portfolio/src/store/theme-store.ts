import { create } from "zustand";
import { ITheme } from "@xterm/xterm";

export type ThemeName =
  | "default"
  | "dracula"
  | "monokai"
  | "matrix"
  | "cyberpunk"
  | "nord"
  | "solarized";

export interface ThemeDefinition {
  name: ThemeName;
  displayName: string;
  description: string;
  theme: ITheme;
}

// Theme definitions
export const themes: Record<ThemeName, ThemeDefinition> = {
  default: {
    name: "default",
    displayName: "Default",
    description: "GitHub Dark theme",
    theme: {
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
    },
  },
  dracula: {
    name: "dracula",
    displayName: "Dracula",
    description: "Dark theme with vibrant purple accents",
    theme: {
      background: "#282a36",
      foreground: "#f8f8f2",
      cursor: "#f8f8f2",
      cursorAccent: "#282a36",
      black: "#21222c",
      red: "#ff5555",
      green: "#50fa7b",
      yellow: "#f1fa8c",
      blue: "#bd93f9",
      magenta: "#ff79c6",
      cyan: "#8be9fd",
      white: "#f8f8f2",
      brightBlack: "#6272a4",
      brightRed: "#ff6e6e",
      brightGreen: "#69ff94",
      brightYellow: "#ffffa5",
      brightBlue: "#d6acff",
      brightMagenta: "#ff92df",
      brightCyan: "#a4ffff",
      brightWhite: "#ffffff",
      selectionBackground: "#44475a",
      selectionForeground: "#f8f8f2",
    },
  },
  monokai: {
    name: "monokai",
    displayName: "Monokai",
    description: "Classic dark theme with warm colors",
    theme: {
      background: "#272822",
      foreground: "#f8f8f2",
      cursor: "#f8f8f0",
      cursorAccent: "#272822",
      black: "#272822",
      red: "#f92672",
      green: "#a6e22e",
      yellow: "#f4bf75",
      blue: "#66d9ef",
      magenta: "#ae81ff",
      cyan: "#a1efe4",
      white: "#f8f8f2",
      brightBlack: "#75715e",
      brightRed: "#f92672",
      brightGreen: "#a6e22e",
      brightYellow: "#f4bf75",
      brightBlue: "#66d9ef",
      brightMagenta: "#ae81ff",
      brightCyan: "#a1efe4",
      brightWhite: "#f9f8f5",
      selectionBackground: "#49483e",
      selectionForeground: "#f8f8f2",
    },
  },
  matrix: {
    name: "matrix",
    displayName: "Matrix",
    description: "Green-on-black hacker aesthetic",
    theme: {
      background: "#000000",
      foreground: "#00ff00",
      cursor: "#00ff00",
      cursorAccent: "#000000",
      black: "#000000",
      red: "#008800",
      green: "#00ff00",
      yellow: "#88ff00",
      blue: "#00ff88",
      magenta: "#00ff88",
      cyan: "#00ffff",
      white: "#00ff00",
      brightBlack: "#005500",
      brightRed: "#00aa00",
      brightGreen: "#00ff00",
      brightYellow: "#aaffaa",
      brightBlue: "#00ffaa",
      brightMagenta: "#00ffaa",
      brightCyan: "#aaffff",
      brightWhite: "#aaffaa",
      selectionBackground: "#003300",
      selectionForeground: "#00ff00",
    },
  },
  cyberpunk: {
    name: "cyberpunk",
    displayName: "Cyberpunk",
    description: "Neon pink and blue cyberpunk vibes",
    theme: {
      background: "#0a0e27",
      foreground: "#e0e0ff",
      cursor: "#ff2a6d",
      cursorAccent: "#0a0e27",
      black: "#0a0e27",
      red: "#ff2a6d",
      green: "#05d9e8",
      yellow: "#ffe61b",
      blue: "#00bfff",
      magenta: "#d238ff",
      cyan: "#01cdfe",
      white: "#e0e0ff",
      brightBlack: "#4a4a6a",
      brightRed: "#ff4f81",
      brightGreen: "#39e5f1",
      brightYellow: "#fff44f",
      brightBlue: "#4dd2ff",
      brightMagenta: "#e866ff",
      brightCyan: "#4dffff",
      brightWhite: "#ffffff",
      selectionBackground: "#2a2550",
      selectionForeground: "#ffffff",
    },
  },
  nord: {
    name: "nord",
    displayName: "Nord",
    description: "Arctic, north-bluish color palette",
    theme: {
      background: "#2e3440",
      foreground: "#d8dee9",
      cursor: "#d8dee9",
      cursorAccent: "#2e3440",
      black: "#3b4252",
      red: "#bf616a",
      green: "#a3be8c",
      yellow: "#ebcb8b",
      blue: "#81a1c1",
      magenta: "#b48ead",
      cyan: "#88c0d0",
      white: "#e5e9f0",
      brightBlack: "#4c566a",
      brightRed: "#bf616a",
      brightGreen: "#a3be8c",
      brightYellow: "#ebcb8b",
      brightBlue: "#81a1c1",
      brightMagenta: "#b48ead",
      brightCyan: "#8fbcbb",
      brightWhite: "#eceff4",
      selectionBackground: "#434c5e",
      selectionForeground: "#eceff4",
    },
  },
  solarized: {
    name: "solarized",
    displayName: "Solarized Dark",
    description: "Precision colors for machines and people",
    theme: {
      background: "#002b36",
      foreground: "#839496",
      cursor: "#839496",
      cursorAccent: "#002b36",
      black: "#073642",
      red: "#dc322f",
      green: "#859900",
      yellow: "#b58900",
      blue: "#268bd2",
      magenta: "#d33682",
      cyan: "#2aa198",
      white: "#eee8d5",
      brightBlack: "#002b36",
      brightRed: "#cb4b16",
      brightGreen: "#586e75",
      brightYellow: "#657b83",
      brightBlue: "#839496",
      brightMagenta: "#6c71c4",
      brightCyan: "#93a1a1",
      brightWhite: "#fdf6e3",
      selectionBackground: "#073642",
      selectionForeground: "#93a1a1",
    },
  },
};

export interface ThemeState {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  getTheme: () => ThemeDefinition;
  getAllThemes: () => ThemeDefinition[];
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentTheme: "default",

  setTheme: (theme: ThemeName) => {
    set({ currentTheme: theme });
  },

  getTheme: () => {
    const { currentTheme } = get();
    return themes[currentTheme];
  },

  getAllThemes: () => {
    return Object.values(themes);
  },
}));
