import type { ThemeContextType } from "@/context/ThemeContext";
import { createContext } from "react";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
