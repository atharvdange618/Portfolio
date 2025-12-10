export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => Promise<string> | string;
  aliases?: string[];
  usage?: string;
}

export interface CommandHistory {
  command: string;
  timestamp: Date;
  output: string;
}

export interface TerminalState {
  history: CommandHistory[];
  currentPath: string;
  isLoading: boolean;
  addToHistory: (command: string, output: string) => void;
  clearHistory: () => void;
  setPath: (path: string) => void;
  setLoading: (loading: boolean) => void;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  npm?: string;
  status: "running" | "development" | "stable";
  uptime?: number;
  metrics?: {
    downloads?: number;
    stars?: number;
    coverage?: number;
    activeUsers?: number;
    responseTime?: number;
  };
}

export interface Experience {
  id: string;
  hash: string;
  title: string;
  company: string;
  period: string;
  description: string;
  icon: string;
}

export interface Skill {
  name: string;
  level: "expert" | "advanced" | "intermediate" | "beginner";
  category: "backend" | "frontend" | "devops" | "tools";
  experience?: string;
}
