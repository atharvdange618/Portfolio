import { CommandDefinition, CommandResponse } from "@/utils/command-registry";
import { projects } from "@/data/portfolio-data";

export const projectsCommand: CommandDefinition = {
  name: "projects",
  description: "Interactive project browser",
  usage: "projects",
  execute: async (): Promise<CommandResponse> => {
    return {
      output: "",
      metadata: {
        interactive: true,
        mode: "projects",
        items: projects.map((p) => ({
          id: p.id,
          name: p.name.replace(".service", ""),
          description: p.description,
          tech: p.tech,
          github: p.github,
          live: p.live,
          npm: p.npm,
        })),
      },
    };
  },
};

export interface ProjectTUIState {
  selectedIndex: number;
  items: Array<{
    id: string;
    name: string;
    description: string;
    tech: string[];
    github?: string;
    live?: string;
    npm?: string;
  }>;
}

export const renderProjectTUI = (state: ProjectTUIState): string => {
  const { selectedIndex, items } = state;
  let output = "";

  const CONTENT_WIDTH = 77;

  // Dynamic border generation guarantees exact alignment
  const HORIZONTAL_LINE = "═".repeat(CONTENT_WIDTH);

  // Helper to create centered text
  const centerText = (text: string, visualWidth: number) => {
    const padding = Math.floor((CONTENT_WIDTH - visualWidth) / 2);
    const rightPadding = CONTENT_WIDTH - visualWidth - padding;
    return " ".repeat(padding) + text + " ".repeat(rightPadding);
  };

  // --- HEADER SECTION ---
  output += `\x1b[1;36m╔${HORIZONTAL_LINE}╗\x1b[0m\n`;

  const title = "\x1b[1;33m🚀 Interactive Project Browser\x1b[0m";

  output += `\x1b[1;36m║\x1b[0m${centerText(title, 29)}\x1b[1;36m║\x1b[0m\n`;

  output += `\x1b[1;36m╠${HORIZONTAL_LINE}╣\x1b[0m\n`;

  const instructions =
    "\x1b[2mUse ↑/↓ arrows to navigate • Press Enter to open • Press q to exit\x1b[0m";
  const instructionVisualLen = 66;
  output += `\x1b[1;36m║\x1b[0m  ${instructions}${" ".repeat(
    CONTENT_WIDTH - 2 - instructionVisualLen
  )}\x1b[1;36m║\x1b[0m\n`;

  output += `\x1b[1;36m╠${HORIZONTAL_LINE}╣\x1b[0m\n`;

  // --- PROJECT LIST ---
  items.forEach((item, index) => {
    const isSelected = index === selectedIndex;
    const cursor = isSelected ? "▶" : " ";
    const nameColor = isSelected ? "\x1b[1;32m" : "\x1b[1;37m";
    const descColor = isSelected ? "\x1b[0;37m" : "\x1b[0;90m";
    const bgColor = isSelected ? "\x1b[48;5;236m" : "";
    const resetBg = isSelected ? "\x1b[0m" : "";

    // 1. NAME ROW
    const nameWidth = 73;
    const namePadded = item.name.padEnd(nameWidth).substring(0, nameWidth);
    output += `\x1b[1;36m║\x1b[0m${bgColor} ${nameColor}${cursor} ${namePadded} ${resetBg}\x1b[1;36m║\x1b[0m\n`;

    // 2. DESCRIPTION ROW
    const descWidth = 73;
    let desc = item.description;
    if (desc.length > descWidth) {
      desc = desc.substring(0, descWidth - 3) + "...";
    }
    const descPadded = desc.padEnd(descWidth);
    output += `\x1b[1;36m║\x1b[0m${bgColor}   ${descColor}${descPadded} ${resetBg}\x1b[1;36m║\x1b[0m\n`;

    // 3. TECH STACK ROW
    const techStr = item.tech.slice(0, 4).join(" • ");
    const techWidth = 73;
    const techDisplay =
      techStr.length > techWidth
        ? techStr.substring(0, techWidth - 3) + "..."
        : techStr;
    const techPadded = techDisplay.padEnd(techWidth);
    output += `\x1b[1;36m║\x1b[0m${bgColor}   \x1b[2;36m${techPadded}\x1b[0m ${resetBg}\x1b[1;36m║\x1b[0m\n`;

    // 4. LINKS ROW
    const links: string[] = [];
    if (item.github) links.push("[GitHub]");
    if (item.live) links.push("[Live]");
    if (item.npm) links.push("[npm]");
    const linksText = links.join(" ");

    const linksColored = links
      .map((link) => {
        if (link === "[GitHub]") return "\x1b[1;35m[GitHub]\x1b[0m";
        if (link === "[Live]") return "\x1b[1;34m[Live]\x1b[0m";
        if (link === "[npm]") return "\x1b[1;31m[npm]\x1b[0m";
        return link;
      })
      .join(" ");

    const linksTargetWidth = 73;
    const linksPadding = " ".repeat(
      Math.max(0, linksTargetWidth - linksText.length)
    );

    output += `\x1b[1;36m║\x1b[0m${bgColor}   ${linksColored}${linksPadding} ${resetBg}\x1b[1;36m║\x1b[0m\n`;

    // SEPARATOR (Blank line between items)
    if (index < items.length - 1) {
      output +=
        "\x1b[1;36m║\x1b[0m" +
        " ".repeat(CONTENT_WIDTH) +
        "\x1b[1;36m║\x1b[0m\n";
    }
  });

  // Footer
  output += `\x1b[1;36m╚${HORIZONTAL_LINE}╝\x1b[0m\n`;

  return output;
};

export const handleProjectSelection = (
  state: ProjectTUIState
): string | null => {
  const selected = state.items[state.selectedIndex];

  if (!selected) return null;

  let output =
    "\n\x1b[1;36m📂 Opening project:\x1b[0m \x1b[1;32m" +
    selected.name +
    "\x1b[0m\n\n";

  if (selected.github) {
    output += `  \x1b[1;35m→ GitHub:\x1b[0m ${selected.github}\n`;
  }
  if (selected.live) {
    output += `  \x1b[1;34m→ Live:\x1b[0m ${selected.live}\n`;
  }
  if (selected.npm) {
    output += `  \x1b[1;31m→ npm:\x1b[0m https://www.npmjs.com/package/${selected.npm}\n`;
  }

  output +=
    "\n\x1b[2mTip: Click on the links above to open them in your browser!\x1b[0m\n";

  return output;
};
