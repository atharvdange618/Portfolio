import { create } from "zustand";
import { TerminalState } from "@/types/terminal";

export const useTerminalStore = create<TerminalState>((set) => ({
  history: [],
  currentPath: "~",
  isLoading: false,

  addToHistory: (command: string, output: string) =>
    set((state) => ({
      history: [
        ...state.history,
        {
          command,
          output,
          timestamp: new Date(),
        },
      ],
    })),

  clearHistory: () => set({ history: [] }),

  setPath: (path: string) => set({ currentPath: path }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
