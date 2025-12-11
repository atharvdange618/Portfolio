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
import { useTerminalStore } from "@/store/terminal-store";

const PROMPT = "\x1b[1;32matharv@portfolio\x1b[0m:\x1b[1;34m~\x1b[0m$ ";

function displayWelcomeMessage(term: XTerm) {
  // The top border determines the width (60 dashes = 60 chars inner width)
  const TOP_BORDER =
    "┌────────────────────────────────────────────────────────────┐";
  const BOTTOM_BORDER =
    "└────────────────────────────────────────────────────────────┘";
  const INNER_WIDTH = 60;

  // Helper to pad text with spaces to match the inner width
  // It strips ANSI codes to calculate the *visual* length correctly
  const createLine = (content: string) => {
    // Regex to strip ANSI codes (\x1b...) to get the real visual length
    const visualLength = content.replace(/\x1b\[[0-9;]*m/g, "").length;
    const padding = Math.max(0, INNER_WIDTH - visualLength);
    return `\x1b[1;36m│\x1b[0m${content}${" ".repeat(
      padding
    )}\x1b[1;36m│\x1b[0m`;
  };

  term.writeln(`\x1b[1;36m${TOP_BORDER}\x1b[0m`);

  term.writeln(createLine("  Welcome to \x1b[1;32matharvdange.dev\x1b[0m"));
  term.writeln(createLine("  Last login: Wed Dec 11 2025 from 203.x.x.x"));
  term.writeln(createLine("")); // Empty line
  term.writeln(createLine("  \x1b[1;33m[Portfolio Server]\x1b[0m"));
  term.writeln(createLine("  System Uptime: 99.98%"));
  term.writeln(createLine("  Active Projects: \x1b[1;32m6 running\x1b[0m"));
  term.writeln(createLine("")); // Empty line
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
  const currentLineRef = useRef<string>("");
  const cursorPositionRef = useRef<number>(0);
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);

  const [isReady, setIsReady] = useState(false);
  const { addToHistory } = useTerminalStore();

  useEffect(() => {
    if (!terminalRef.current || xtermRef.current) return;

    // Initialize command registry
    const registry = new CommandRegistry();
    basicCommands.forEach((cmd) => registry.register(cmd));
    registry.register(systemctlCommand);
    registry.register(gitCommand);
    registry.register(npmCommand);
    commandRegistryRef.current = registry;

    // Initialize tab completion
    tabCompletionRef.current = new TabCompletion(registry);

    // Initialize terminal
    const term = new XTerm(terminalConfig);
    const fitAddon = new FitAddon();
    const webLinksAddon = new WebLinksAddon();

    term.loadAddon(fitAddon);
    term.loadAddon(webLinksAddon);
    term.open(terminalRef.current);

    // Wait for the next frame before fitting
    requestAnimationFrame(() => {
      fitAddon.fit();
      fitAddonRef.current = fitAddon;
      xtermRef.current = term;

      // Display welcome message
      displayWelcomeMessage(term);
      term.write(PROMPT);
      setIsReady(true);
    });

    // Handle input
    term.onData((data) => {
      handleTerminalInput(term, data);
    });

    // Handle resize
    const handleResize = () => {
      if (fitAddonRef.current && xtermRef.current) {
        try {
          fitAddonRef.current.fit();
        } catch (e) {
          console.error("Error fitting terminal:", e);
        }
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      term.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTerminalInput = (term: XTerm, data: string) => {
    const code = data.charCodeAt(0);

    // Enter key
    if (code === 13) {
      term.write("\r\n");
      const command = currentLineRef.current.trim();

      if (command) {
        const isClearing =
          command.toLowerCase() === "clear" || command.toLowerCase() === "cls";
        executeCommand(term, command);
        commandHistoryRef.current.push(command);
        historyIndexRef.current = commandHistoryRef.current.length;

        // Don't write prompt if clearing - clear command handles it
        if (!isClearing) {
          currentLineRef.current = "";
          cursorPositionRef.current = 0;
          term.write(PROMPT);
        } else {
          currentLineRef.current = "";
          cursorPositionRef.current = 0;
        }
      } else {
        currentLineRef.current = "";
        cursorPositionRef.current = 0;
        term.write(PROMPT);
      }
      return;
    }

    // Backspace
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

    // Ctrl+C
    if (code === 3) {
      term.write("^C\r\n");
      currentLineRef.current = "";
      cursorPositionRef.current = 0;
      term.write(PROMPT);
      return;
    }

    // Ctrl+L (clear)
    if (code === 12) {
      term.clear();
      displayWelcomeMessage(term);
      term.write(PROMPT + currentLineRef.current);
      return;
    }

    // Tab key (completion)
    if (code === 9) {
      if (!tabCompletionRef.current) return;

      const result = tabCompletionRef.current.complete(currentLineRef.current);

      if (result.completions.length === 0) {
        // No completions - do nothing
        return;
      }

      if (result.completions.length === 1) {
        // Single completion - apply it
        const completion = result.completions[0];
        const parts = currentLineRef.current.split(/\s+/);
        parts[parts.length - 1] = completion;
        const newLine =
          parts.join(" ") + (currentLineRef.current.endsWith(" ") ? "" : " ");
        replaceCurrentLine(term, newLine);
      } else {
        // Multiple completions - show common prefix or list
        const lastPart = currentLineRef.current.split(/\s+/).pop() || "";
        if (result.commonPrefix.length > lastPart.length) {
          // Apply common prefix
          const parts = currentLineRef.current.split(/\s+/);
          parts[parts.length - 1] = result.commonPrefix;
          replaceCurrentLine(term, parts.join(" "));
        } else {
          // Show completions
          const formatted = tabCompletionRef.current.formatCompletions(
            result.completions
          );
          term.write(formatted);
          term.write(PROMPT + currentLineRef.current);
        }
      }
      return;
    }

    // Arrow up (history)
    if (data === "\x1b[A") {
      if (historyIndexRef.current > 0) {
        historyIndexRef.current--;
        const cmd = commandHistoryRef.current[historyIndexRef.current];
        replaceCurrentLine(term, cmd);
      }
      return;
    }

    // Arrow down (history)
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

    // Regular character
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
    // Clear current line
    const clearLength = PROMPT.length + currentLineRef.current.length + 10;
    term.write("\r" + " ".repeat(clearLength) + "\r");
    term.write(PROMPT);

    currentLineRef.current = newLine;
    cursorPositionRef.current = newLine.length;
    term.write(newLine);
  };

  const executeCommand = async (term: XTerm, input: string) => {
    const context = parseCommand(input);
    const commandName = input.trim().split(/\s+/)[0].toLowerCase();

    // Store in history
    addToHistory(input, "");

    // Special case: clear command
    if (commandName === "clear" || commandName === "cls") {
      term.clear();
      displayWelcomeMessage(term);
      term.write(PROMPT);
      return;
    }

    const command = commandRegistryRef.current?.get(commandName);

    if (!command) {
      term.writeln(`\x1b[1;31mCommand not found:\x1b[0m ${commandName}`);
      term.writeln(`Type \x1b[1;33m'help'\x1b[0m to see available commands.`);
      term.write(PROMPT);
      return;
    }

    try {
      const result = await command.execute(context);
      if (result.output) {
        term.writeln(result.output);
      }
      term.write(PROMPT);
      // Scroll to bottom to ensure prompt is visible
      setTimeout(() => term.scrollToBottom(), 0);
    } catch (error) {
      term.writeln(
        `\x1b[1;31mError:\x1b[0m ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      term.write(PROMPT);
      setTimeout(() => term.scrollToBottom(), 0);
    }
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
