"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal as XTerm } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { WebLinksAddon } from "@xterm/addon-web-links";
import { terminalConfig } from "@/utils/terminal-config";
import { CommandRegistry, parseCommand } from "@/utils/command-registry";
import { TabCompletion } from "@/utils/tab-completion";
import { basicCommands } from "@/utils/commands/basic";
import { systemctlCommand } from "@/utils/commands/systemctl";
import { gitCommand } from "@/utils/commands/git";
import { npmCommand } from "@/utils/commands/npm";
import { ghCommand } from "@/utils/commands/gh";
import {
  cowsayCommand,
  slCommand,
  matrixCommand,
  fortuneCommand,
  sudoCommand,
  vimCommand,
  rmCommand,
  pleaseCommand,
  asciiquoteCommand,
} from "@/utils/commands/easter-eggs";
import { useTerminalStore } from "@/store/terminal-store";
import { useFileSystemStore } from "@/store/filesystem-store";
import { useThemeStore } from "@/store/theme-store";
import { cdCommand, lsCommand, pwdCommand } from "@/utils/commands/navigation";
import { themeCommand } from "@/utils/commands/theme";
import { monitoringCommands } from "@/utils/commands/monitoring";
import { analyticsCommand } from "@/utils/commands/analytics";
import {
  projectsCommand,
  ProjectTUIState,
  renderProjectTUI,
  handleProjectSelection,
} from "@/utils/commands/interactive-projects";
import { useAnalytics } from "@/hooks/useAnalytics";

const getPrompt = () => {
  const { getAbsolutePath } = useFileSystemStore.getState();
  const path = getAbsolutePath();
  const displayPath = path === "/" ? "~" : `~${path}`;
  return `\x1b[1;32matharv@portfolio\x1b[0m:\x1b[1;34m${displayPath}\x1b[0m$ `;
};

async function displayWelcomeMessage(term: XTerm) {
  const TOP_BORDER =
    "┌────────────────────────────────────────────────────────────┐";
  const BOTTOM_BORDER =
    "└────────────────────────────────────────────────────────────┘";
  const INNER_WIDTH = 60;

  const createLine = (content: string) => {
    const visualLength = content.replace(/\x1b\[[0-9;]*m/g, "").length;
    const padding = Math.max(0, INNER_WIDTH - visualLength);
    return `\x1b[1;36m│\x1b[0m${content}${" ".repeat(
      padding
    )}\x1b[1;36m│\x1b[0m`;
  };

  const today = new Date();
  const todayStr = today.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  let lastLoginText = todayStr;

  try {
    const response = await fetch("/api/analytics/last-session");
    if (response.ok) {
      const data = await response.json();
      if (data.lastSession) {
        const date = new Date(data.lastSession.lastActivity);
        const dateStr = date.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        });
        const location = data.lastSession.location
          ? `${data.lastSession.location.cityName}, ${data.lastSession.location.countryCode}`
          : data.lastSession.ipHash.substring(0, 8);
        lastLoginText = `${dateStr} from ${location}`;
      }
    }
  } catch (error) {
    console.error("Failed to fetch last login:", error);
  }

  term.writeln(`\x1b[1;36m${TOP_BORDER}\x1b[0m`);

  term.writeln(createLine("  Welcome to \x1b[1;32matharvdange.dev\x1b[0m"));
  term.writeln(createLine(`  Last login: ${lastLoginText}`));
  term.writeln(createLine(""));
  term.writeln(createLine("  \x1b[1;33m[Portfolio Server]\x1b[0m"));
  term.writeln(createLine("  System Uptime: 99.98%"));
  term.writeln(createLine("  Active Projects: \x1b[1;32m6 running\x1b[0m"));
  term.writeln(createLine(""));
  term.writeln(
    createLine(
      "  Type \x1b[1;33m'help'\x1b[0m or \x1b[1;33m'?'\x1b[0m for available commands"
    )
  );

  term.writeln(`\x1b[1;36m${BOTTOM_BORDER}\x1b[0m`);
  term.writeln("");
}

const Terminal = () => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<XTerm | null>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);
  const commandRegistryRef = useRef<CommandRegistry | null>(null);
  const tabCompletionRef = useRef<TabCompletion | null>(null);

  // Analytics hook
  const { trackCommand } = useAnalytics();

  // State Refs
  const currentLineRef = useRef<string>("");
  const cursorPositionRef = useRef<number>(0);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);

  // Vim Mode Refs
  const vimModeRef = useRef<boolean>(false);
  const vimBufferRef = useRef<string>("");

  // Password Input Mode Refs
  const passwordModeRef = useRef<boolean>(false);
  const passwordBufferRef = useRef<string>("");
  const passwordCommandRef = useRef<string>("");

  // Interactive TUI Mode Refs
  const tuiModeRef = useRef<boolean>(false);
  const tuiStateRef = useRef<ProjectTUIState | null>(null);

  const [isReady, setIsReady] = useState(false);
  const { addToHistory } = useTerminalStore();
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const getTheme = useThemeStore((state) => state.getTheme);

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    // 1. Initialize Registry
    const registry = new CommandRegistry();
    basicCommands.forEach((cmd) => registry.register(cmd));

    // Register Navigation
    registry.register(cdCommand);
    registry.register(lsCommand);
    registry.register(pwdCommand);

    // Register Tools
    registry.register(systemctlCommand);
    registry.register(gitCommand);
    registry.register(npmCommand);
    registry.register(ghCommand);

    // Register Easter Eggs
    registry.register(cowsayCommand);
    registry.register(slCommand);
    registry.register(matrixCommand);
    registry.register(fortuneCommand);
    registry.register(sudoCommand);
    registry.register(rmCommand);
    registry.register(vimCommand);
    registry.register(pleaseCommand);
    registry.register(asciiquoteCommand);

    // Register Theme Command
    registry.register(themeCommand);

    // Register Monitoring Commands
    monitoringCommands.forEach((cmd) => registry.register(cmd));

    // Register Analytics Command
    registry.register(analyticsCommand);

    // Register Interactive Commands
    registry.register(projectsCommand);

    commandRegistryRef.current = registry;
    tabCompletionRef.current = new TabCompletion(registry);

    // 2. Initialize XTerm
    const term = new XTerm(terminalConfig);
    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.open(terminalRef.current);

    requestAnimationFrame(async () => {
      fitAddon.fit();
      fitAddonRef.current = fitAddon;
      xtermRef.current = term;

      // Display welcome message
      await displayWelcomeMessage(term);
      term.write(getPrompt());
      setIsReady(true);

      // Auto-type neofetch command after a delay
      setTimeout(() => {
        autoTypeCommand(term, "neofetch");
      }, 1000);
    });

    // Handle input
    term.onData((data) => {
      if (vimModeRef.current) {
        handleVimInput(term, data);
      } else if (passwordModeRef.current) {
        handlePasswordInput(term, data);
      } else if (tuiModeRef.current) {
        handleTUIInput(term, data);
      } else {
        handleTerminalInput(term, data);
      }
    });

    const handleResize = () => {
      try {
        fitAddonRef.current?.fit();
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!xtermRef.current) return;

    const theme = getTheme();
    xtermRef.current.options.theme = theme.theme;
  }, [currentTheme, getTheme]);

  const handlePasswordInput = (term: XTerm, data: string) => {
    const code = data.charCodeAt(0);

    if (code === 13) {
      const password = passwordBufferRef.current;
      const command = passwordCommandRef.current;

      passwordModeRef.current = false;
      passwordBufferRef.current = "";
      passwordCommandRef.current = "";

      term.write("\r\n");

      if (command === "analytics") {
        executeAnalytics(term, password);
      }

      return;
    }

    if (code === 127) {
      if (passwordBufferRef.current.length > 0) {
        passwordBufferRef.current = passwordBufferRef.current.slice(0, -1);
        term.write("\b \b");
      }
      return;
    }

    if (code === 3) {
      passwordModeRef.current = false;
      passwordBufferRef.current = "";
      passwordCommandRef.current = "";
      term.write("^C\r\n");
      (async () => {
        await displayWelcomeMessage(term);
        term.write(getPrompt());
      })();
      return;
    }

    if (code >= 32 && code <= 126) {
      passwordBufferRef.current += data;
      term.write("*");
    }
  };

  const handleVimInput = (term: XTerm, data: string) => {
    const code = data.charCodeAt(0);

    if (code === 13) {
      const buffer = vimBufferRef.current.trim();
      if ([":q", ":q!", ":wq", ":x"].includes(buffer)) {
        vimModeRef.current = false;
        vimBufferRef.current = "";
        term.write("\r\n");
        term.clear();
        (async () => {
          await displayWelcomeMessage(term);
          term.write(getPrompt());
        })();
        return;
      }

      if (buffer.startsWith(":")) {
        term.write(
          `\r\n\x1b[31mE492: Not an editor command: ${buffer.substring(
            1
          )}\x1b[0m\r\n`
        );
      } else {
        term.write("\r\n");
      }

      vimBufferRef.current = "";
      term.write("\r\n");
      return;
    }

    if (code === 127) {
      if (vimBufferRef.current.length > 0) {
        vimBufferRef.current = vimBufferRef.current.slice(0, -1);
        term.write("\b \b");
      }
      return;
    }

    if (code === 3) {
      return;
    }

    if (code >= 32 && code <= 126) {
      vimBufferRef.current += data;
      term.write(data);
    }
  };

  const handleTUIInput = (term: XTerm, data: string) => {
    if (!tuiStateRef.current) return;

    const code = data.charCodeAt(0);

    if (data === "\x1b[A" || data === "k") {
      if (tuiStateRef.current.selectedIndex > 0) {
        tuiStateRef.current.selectedIndex--;
        term.clear();
        term.write(renderProjectTUI(tuiStateRef.current));
      }
      return;
    }

    if (data === "\x1b[B" || data === "j") {
      if (
        tuiStateRef.current.selectedIndex <
        tuiStateRef.current.items.length - 1
      ) {
        tuiStateRef.current.selectedIndex++;
        term.clear();
        term.write(renderProjectTUI(tuiStateRef.current));
      }
      return;
    }

    if (data === "\x1b" && data.length === 1) {
      tuiModeRef.current = false;
      tuiStateRef.current = null;
      term.write("\r\n\x1b[2mExited project browser\x1b[0m\r\n");
      term.write(getPrompt());
      return;
    }

    if (data === "q" || data === "Q") {
      tuiModeRef.current = false;
      tuiStateRef.current = null;
      term.write("\r\n\x1b[2mExited project browser\x1b[0m\r\n");
      term.write(getPrompt());
      return;
    }

    if (code === 13) {
      const output = handleProjectSelection(tuiStateRef.current);
      tuiModeRef.current = false;
      tuiStateRef.current = null;
      term.write("\r\n");
      if (output) {
        term.write(output);
      }
      term.write("\r\n");
      term.write(getPrompt());
      return;
    }
  };

  const handleTerminalInput = (term: XTerm, data: string) => {
    const code = data.charCodeAt(0);

    if (code === 13) {
      term.write("\r\n");
      const command = currentLineRef.current.trim();

      if (command) {
        executeCommand(term, command);
        commandHistoryRef.current.push(command);
        historyIndexRef.current = commandHistoryRef.current.length;
        currentLineRef.current = "";
        cursorPositionRef.current = 0;
      } else {
        currentLineRef.current = "";
        cursorPositionRef.current = 0;
        term.write(getPrompt());
      }
      return;
    }

    if (code === 127) {
      if (cursorPositionRef.current > 0) {
        currentLineRef.current =
          currentLineRef.current.slice(0, cursorPositionRef.current - 1) +
          currentLineRef.current.slice(cursorPositionRef.current);
        cursorPositionRef.current--;
        term.write("\b \b");
      }
      return;
    }

    if (code === 3) {
      term.write("^C\r\n");
      currentLineRef.current = "";
      cursorPositionRef.current = 0;
      term.write(getPrompt());
      return;
    }

    if (code === 12) {
      term.clear();
      (async () => {
        await displayWelcomeMessage(term);
        term.write(getPrompt() + currentLineRef.current);
      })();
      return;
    }

    if (code === 9) {
      if (!tabCompletionRef.current) return;

      const result = tabCompletionRef.current.complete(currentLineRef.current);

      if (result.completions.length === 0) {
        return;
      }

      if (result.completions.length === 1) {
        const completion = result.completions[0];
        const parts = currentLineRef.current.split(/\s+/);
        parts[parts.length - 1] = completion;
        const newLine =
          parts.join(" ") + (currentLineRef.current.endsWith(" ") ? "" : " ");
        replaceCurrentLine(term, newLine);
      } else {
        const lastPart = currentLineRef.current.split(/\s+/).pop() || "";
        if (result.commonPrefix.length > lastPart.length) {
          const parts = currentLineRef.current.split(/\s+/);
          parts[parts.length - 1] = result.commonPrefix;
          replaceCurrentLine(term, parts.join(" "));
        } else {
          const formatted = tabCompletionRef.current.formatCompletions(
            result.completions
          );
          term.write(formatted);
          term.write(getPrompt() + currentLineRef.current);
        }
      }
      return;
    }

    if (data === "\x1b[A") {
      if (historyIndexRef.current > 0) {
        historyIndexRef.current--;
        const cmd = commandHistoryRef.current[historyIndexRef.current];
        replaceCurrentLine(term, cmd);
      }
      return;
    }

    if (data === "\x1b[B") {
      if (historyIndexRef.current < commandHistoryRef.current.length - 1) {
        historyIndexRef.current++;
        const cmd = commandHistoryRef.current[historyIndexRef.current];
        replaceCurrentLine(term, cmd);
      } else {
        historyIndexRef.current = commandHistoryRef.current.length;
        replaceCurrentLine(term, "");
      }
      return;
    }

    if (code >= 32 && code <= 126) {
      currentLineRef.current =
        currentLineRef.current.slice(0, cursorPositionRef.current) +
        data +
        currentLineRef.current.slice(cursorPositionRef.current);
      cursorPositionRef.current++;
      term.write(data);
    }
  };

  const replaceCurrentLine = (term: XTerm, newLine: string) => {
    const clearLength =
      getPrompt().replace(/\x1b\[[0-9;]*m/g, "").length +
      currentLineRef.current.length +
      10;
    term.write("\r" + " ".repeat(clearLength) + "\r");
    term.write(getPrompt());

    currentLineRef.current = newLine;
    cursorPositionRef.current = newLine.length;
    term.write(newLine);
  };

  const executeAnalytics = async (term: XTerm, password: string) => {
    try {
      const response = await fetch("/api/analytics/stats", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (response.status === 401) {
        term.writeln("\x1b[1;31mSorry, try again.\x1b[0m");
        term.write(getPrompt());
        return;
      }

      if (!response.ok) {
        term.writeln("\x1b[1;31mError fetching analytics data\x1b[0m");
        term.write(getPrompt());
        return;
      }

      const stats = await response.json();

      const { formatAnalyticsOutput } = await import(
        "@/utils/commands/analytics"
      );
      const output = formatAnalyticsOutput(stats);

      term.write(output);
      term.write(getPrompt());
      setTimeout(() => term.scrollToBottom(), 0);
    } catch (error) {
      term.writeln(
        `\x1b[1;31mError:\x1b[0m ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      term.write(getPrompt());
    }
  };

  const executeCommand = async (term: XTerm, input: string) => {
    const context = parseCommand(input);
    const commandName = input.trim().split(/\s+/)[0].toLowerCase();

    addToHistory(input, "");

    if (commandName === "clear" || commandName === "c") {
      trackCommand(commandName, context.args);
      term.clear();
      await displayWelcomeMessage(term);
      term.write(getPrompt());
      return;
    }

    if (commandName === "sudo") {
      trackCommand(commandName, context.args);
      const commandWithoutSudo = input.replace(/^sudo\s+/, "").trim();
      if (commandWithoutSudo) {
        term.writeln("\x1b[2m[sudo] password for atharv: ********\x1b[0m");
        await executeCommand(term, commandWithoutSudo);
      } else {
        term.writeln("\x1b[1;31musage: sudo <command>\x1b[0m");
        term.write(getPrompt());
      }
      return;
    }

    if (commandName === "rm") {
      const rawInput = input.toLowerCase();
      const hasR = rawInput.match(/-[a-z]*r/);
      const hasF = rawInput.match(/-[a-z]*f/);
      const wordCount = rawInput.trim().split(/\s+/).length;
      const hasRoot =
        rawInput.includes(" /") ||
        rawInput.includes("/*") ||
        rawInput.includes(" ~") ||
        rawInput.endsWith("/") ||
        rawInput.endsWith("~") ||
        rawInput.endsWith("-rf") ||
        rawInput.endsWith("-fr") ||
        rawInput.endsWith("-r") ||
        rawInput.endsWith("-f");
      const hasNoPreserve = rawInput.includes("--no-preserve-root");

      if (
        (hasR && hasF && hasRoot) ||
        hasNoPreserve ||
        (hasR && hasF && wordCount <= 3)
      ) {
        term.writeln(
          "\x1b[1;31m⚠️  WARNING: Attempting to delete system files...\x1b[0m"
        );
        term.writeln("");
        await new Promise((resolve) => setTimeout(resolve, 800));

        const files = [
          "/bin",
          "/boot",
          "/dev",
          "/etc",
          "/home",
          "/lib",
          "/lib64",
          "/media",
          "/mnt",
          "/opt",
          "/proc",
          "/root",
          "/run",
          "/sbin",
          "/srv",
          "/sys",
          "/tmp",
          "/usr",
          "/var",
        ];

        for (const file of files) {
          term.write(`\x1b[1;31mDeleting: \x1b[0m${file}`);
          await new Promise((resolve) => setTimeout(resolve, 150));
          term.writeln(` \x1b[1;32m✓\x1b[0m`);
        }

        term.writeln("");
        await new Promise((resolve) => setTimeout(resolve, 300));

        term.write("\x1b[1;33mProgress: \x1b[0m[");
        const barLength = 40;
        for (let i = 0; i <= barLength; i++) {
          const filled = "█".repeat(i);
          const empty = "░".repeat(barLength - i);
          const percent = Math.floor((i / barLength) * 100);
          term.write(
            `\r\x1b[1;33mProgress: \x1b[0m[\x1b[1;31m${filled}\x1b[2;31m${empty}\x1b[0m] ${percent}%`
          );
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        term.writeln("");
        term.writeln("");

        await new Promise((resolve) => setTimeout(resolve, 500));

        term.writeln(
          "\x1b[1;31m╔════════════════════════════════════════════════════════╗\x1b[0m"
        );
        term.writeln(
          "\x1b[1;31m║                                                        ║\x1b[0m"
        );
        term.writeln(
          "\x1b[1;31m║\x1b[0m  \x1b[1;37mSystem destruction complete!\x1b[0m                         \x1b[1;31m║\x1b[0m"
        );
        term.writeln(
          "\x1b[1;31m║                                                        ║\x1b[0m"
        );
        term.writeln(
          "\x1b[1;31m╚════════════════════════════════════════════════════════╝\x1b[0m"
        );
        term.writeln("");
        await new Promise((resolve) => setTimeout(resolve, 1200));

        term.writeln("\x1b[1;32m😄 Just kidding!\x1b[0m");
        term.writeln(
          "\x1b[1;36mDid I scare you? This is a portfolio, not a real system!\x1b[0m"
        );
        term.writeln(
          "\x1b[2mYour files are safe... because they don't exist here. 😉\x1b[0m"
        );
        term.writeln("");
        trackCommand(commandName, context.args);
        term.write(getPrompt());
        return;
      }
    }

    if (commandName === "vim" || commandName === "vi") {
      trackCommand(commandName, context.args);
      const rows = term.rows;
      const cols = term.cols;

      let vimScreen = "\x1b[2J\x1b[H";

      const titleRow = Math.floor(rows / 2) - 3;

      for (let i = 0; i < rows - 1; i++) {
        if (i === titleRow) {
          const title = "VIM - Vi IMproved";
          const padding = Math.floor((cols - title.length) / 2);
          vimScreen +=
            "\x1b[40m\x1b[1;32m~" +
            " ".repeat(Math.max(0, padding - 1)) +
            "\x1b[1;37m" +
            title +
            "\x1b[0m\x1b[40m\x1b[1;32m" +
            " ".repeat(Math.max(0, cols - padding - title.length - 1)) +
            "\x1b[0m\r\n";
        } else if (i === titleRow + 2) {
          const version = "version 9.0.1234";
          const padding = Math.floor((cols - version.length) / 2);
          vimScreen +=
            "\x1b[40m\x1b[1;32m~" +
            " ".repeat(Math.max(0, padding - 1)) +
            "\x1b[1;33m" +
            version +
            "\x1b[0m\x1b[40m\x1b[1;32m" +
            " ".repeat(Math.max(0, cols - padding - version.length - 1)) +
            "\x1b[0m\r\n";
        } else if (i === titleRow + 3) {
          const author = "by Bram Moolenaar et al.";
          const padding = Math.floor((cols - author.length) / 2);
          vimScreen +=
            "\x1b[40m\x1b[1;32m~" +
            " ".repeat(Math.max(0, padding - 1)) +
            "\x1b[0;37m" +
            author +
            "\x1b[0m\x1b[40m\x1b[1;32m" +
            " ".repeat(Math.max(0, cols - padding - author.length - 1)) +
            "\x1b[0m\r\n";
        } else if (i === titleRow + 5) {
          const msg = "Vim is open source and freely distributable";
          const padding = Math.floor((cols - msg.length) / 2);
          vimScreen +=
            "\x1b[40m\x1b[1;32m~" +
            " ".repeat(Math.max(0, padding - 1)) +
            "\x1b[1;32m" +
            msg +
            "\x1b[0m\x1b[40m\x1b[1;32m" +
            " ".repeat(Math.max(0, cols - padding - msg.length - 1)) +
            "\x1b[0m\r\n";
        } else {
          vimScreen +=
            "\x1b[40m\x1b[1;32m~" +
            " ".repeat(Math.max(0, cols - 1)) +
            "\x1b[0m\r\n";
        }
      }

      const statusText = ` portfolio.txt [New File]${" ".repeat(
        Math.max(0, cols - 70)
      )}0,0-1${" ".repeat(10)}All `;
      vimScreen += "\x1b[7m" + statusText.slice(0, cols) + "\x1b[0m";

      vimScreen += "\x1b[" + rows + ";1H";

      term.write(vimScreen);
      vimModeRef.current = true;
      vimBufferRef.current = "";
      return;
    }

    const command = commandRegistryRef.current?.get(commandName);

    if (!command) {
      console.log("Command not found:", commandName);
      console.log(
        "Available commands:",
        Array.from(
          commandRegistryRef.current?.getAll().map((c) => c.name) || []
        )
      );
      term.writeln(`\x1b[1;31mCommand not found:\x1b[0m ${commandName}`);
      term.writeln(`Type \x1b[1;33m'help'\x1b[0m to see available commands.`);
      term.write(getPrompt());
      return;
    }

    if (commandName === "analytics" || commandName === "stats") {
      trackCommand(commandName, context.args);
      term.writeln("\x1b[1;33m[sudo] password for analytics:\x1b[0m ");
      passwordModeRef.current = true;
      passwordBufferRef.current = "";
      passwordCommandRef.current = "analytics";
      return;
    }

    try {
      const asyncCommands = ["gh", "curl"];
      if (asyncCommands.includes(commandName)) {
        term.writeln("\x1b[1;36mFetching data...\x1b[0m");
      }

      const result = await command.execute(context);

      trackCommand(commandName, context.args);

      if (
        result.metadata?.interactive &&
        result.metadata?.mode === "projects"
      ) {
        tuiModeRef.current = true;
        tuiStateRef.current = {
          selectedIndex: 0,
          items: (result.metadata.items || []) as ProjectTUIState["items"],
        };
        term.clear();
        if (tuiStateRef.current) {
          term.write(renderProjectTUI(tuiStateRef.current));
        }
        return;
      }

      if (result.output && result.output.trim()) {
        term.write(result.output);
      }
      term.write(getPrompt());
      setTimeout(() => term.scrollToBottom(), 0);
    } catch (error) {
      console.error("Command execution error:", error);
      term.writeln(
        `\x1b[1;31mError:\x1b[0m ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      term.write(getPrompt());
      setTimeout(() => term.scrollToBottom(), 0);
    }
  };

  const autoTypeCommand = async (term: XTerm, command: string) => {
    const chars = command.split("");

    for (let i = 0; i < chars.length; i++) {
      const char = chars[i];
      term.write(char);
      currentLineRef.current += char;
      cursorPositionRef.current++;

      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 100 + 50)
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    term.write("\r\n");
    executeCommand(term, command);
    commandHistoryRef.current.push(command);
    historyIndexRef.current = commandHistoryRef.current.length;
    currentLineRef.current = "";
    cursorPositionRef.current = 0;
    term.write(getPrompt());
  };

  return (
    <div className="fixed inset-0 bg-[#0d1117]">
      <div className="h-full w-full p-4 pb-10">
        <div ref={terminalRef} className="h-full w-full overflow-hidden" />
      </div>

      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[#50fa7b] text-lg animate-pulse">
            Initializing terminal...
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminal;
