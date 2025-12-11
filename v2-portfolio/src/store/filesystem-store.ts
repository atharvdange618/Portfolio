import { create } from "zustand";

export interface FileSystemNode {
  name: string;
  type: "file" | "directory";
  content?: string;
  children?: FileSystemNode[];
}

export interface FileSystemState {
  currentPath: string[];
  fileSystem: FileSystemNode;
  setCurrentPath: (path: string[]) => void;
  navigateTo: (target: string) => boolean;
  getCurrentDirectory: () => FileSystemNode | null;
  getAbsolutePath: () => string;
}

// Define the virtual file system structure
const rootFileSystem: FileSystemNode = {
  name: "/",
  type: "directory",
  children: [
    {
      name: "about.md",
      type: "file",
      content: "about",
    },
    {
      name: "skills.json",
      type: "file",
      content: "skills",
    },
    {
      name: "contact.sh",
      type: "file",
      content: "contact",
    },
    {
      name: "projects",
      type: "directory",
      children: [
        { name: "reiatsu.md", type: "file", content: "reiatsu-project" },
        { name: "telemetry.md", type: "file", content: "telemetry-project" },
        { name: "minty.md", type: "file", content: "minty-project" },
        { name: "recon.md", type: "file", content: "recon-project" },
        { name: "archive.md", type: "file", content: "archive-project" },
        {
          name: "xml-sitemap-generator.md",
          type: "file",
          content: "sitemap-project",
        },
      ],
    },
    {
      name: "experience",
      type: "directory",
      children: [
        {
          name: "smartscripts.md",
          type: "file",
          content: "smartscripts-experience",
        },
        { name: "journey.md", type: "file", content: "journey-experience" },
      ],
    },
    {
      name: ".github",
      type: "directory",
      children: [
        { name: "profile.md", type: "file", content: "github-profile" },
        { name: "repos.json", type: "file", content: "github-repos" },
      ],
    },
  ],
};

export const useFileSystemStore = create<FileSystemState>((set, get) => ({
  currentPath: [],
  fileSystem: rootFileSystem,

  setCurrentPath: (path: string[]) => set({ currentPath: path }),

  navigateTo: (target: string): boolean => {
    const { currentPath, fileSystem } = get();

    // Handle special cases
    if (target === "/" || target === "~") {
      set({ currentPath: [] });
      return true;
    }

    if (target === ".") {
      return true;
    }

    if (target === "..") {
      if (currentPath.length === 0) return true;
      set({ currentPath: currentPath.slice(0, -1) });
      return true;
    }

    // Navigate to absolute path (starts with /)
    if (target.startsWith("/")) {
      const parts = target.split("/").filter((p) => p);
      let current = fileSystem;

      for (const part of parts) {
        const found = current.children?.find(
          (child) => child.name === part && child.type === "directory"
        );
        if (!found) return false;
        current = found;
      }

      set({ currentPath: parts });
      return true;
    }

    // Navigate to relative path
    let current = get().getCurrentDirectory() || fileSystem;
    const parts = target.split("/").filter((p) => p);

    for (const part of parts) {
      if (part === "..") {
        if (currentPath.length === 0) return true;
        set({ currentPath: currentPath.slice(0, -1) });
        current = get().getCurrentDirectory() || fileSystem;
      } else {
        const found = current.children?.find(
          (child) => child.name === part && child.type === "directory"
        );
        if (!found) return false;
        set({ currentPath: [...get().currentPath, part] });
        current = found;
      }
    }

    return true;
  },

  getCurrentDirectory: (): FileSystemNode | null => {
    const { currentPath, fileSystem } = get();

    if (currentPath.length === 0) return fileSystem;

    let current = fileSystem;
    for (const part of currentPath) {
      const found = current.children?.find(
        (child) => child.name === part && child.type === "directory"
      );
      if (!found) return null;
      current = found;
    }

    return current;
  },

  getAbsolutePath: (): string => {
    const { currentPath } = get();
    return currentPath.length === 0 ? "/" : `/${currentPath.join("/")}`;
  },
}));
