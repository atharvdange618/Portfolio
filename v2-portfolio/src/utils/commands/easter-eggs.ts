import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";

const COWS: { [key: string]: string } = {
  default: `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
  dead: `
        \\   ^__^
         \\  (xx)\\_______
            (__)\\       )\\/\\
             U  ||----w |
                ||     ||`,
  greedy: `
        \\   ^__^
         \\  ($$)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
  paranoid: `
        \\   ^__^
         \\  (@@)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
  stoned: `
        \\   ^__^
         \\  (**)\\_______
            (__)\\       )\\/\\
             U  ||----w |
                ||     ||`,
  tired: `
        \\   ^__^
         \\  (--)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
  wired: `
        \\   ^__^
         \\  (OO)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
  young: `
        \\   ^__^
         \\  (..)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
};

export const cowsayCommand: CommandDefinition = {
  name: "cowsay",
  description: "Make a cow say something",
  usage: "cowsay [message] or cowsay [type] [message]",
  execute: async (context: CommandContext): Promise<CommandResponse> => {
    let cowType = "default";
    let messageParts = context.args;

    // 1. Check for -f flag
    if (messageParts[0] === "-f" && messageParts[1]) {
      cowType = messageParts[1];
      messageParts = messageParts.slice(2);
    }
    // 2. Smart Detection: Check if first arg is a valid cow name
    else if (messageParts.length > 0 && COWS[messageParts[0]]) {
      cowType = messageParts[0];
      messageParts = messageParts.slice(1);
    }

    const message =
      messageParts.join(" ") || "Moo! (Type 'cowsay help' for usage)";
    const bubble = createSpeechBubble(message);
    const cow = COWS[cowType] || COWS.default;

    return {
      output: `${bubble}\n${cow}\n`,
    };
  },
};

// sl command - Steam locomotive animation (typo for ls)
export const slCommand: CommandDefinition = {
  name: "sl",
  description: "A steam locomotive runs across your terminal",
  usage: "sl",
  execute: async (): Promise<CommandResponse> => {
    const frames = [
      `
      (  ) (@@) ( )  (@)  ()    @@    O     @     O     @
     (@@@)
 (    )
  (@@@@)

(   )
====        ________                ___________
_D _|  |_______/        \\__I_I_____===__|_________|
 |(_)---  |   H\\________/ |   |        =|___ ___|      _________________
 /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____
|      |  |   H  |__--------------------| [___] |   =|                        |
| ________|___H__/__|_____/[][]~\\_______|       |   -|                        |
|/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
 |/-=|___|=    ||    ||    ||    |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
  \\_/      \\O=====O=====O=====O_/      \\_/               \\_/   \\_/    \\_/   \\_/
`,
      `
     (  ) (@@) ( )  (@)  ()    @@    O     @     O     @
    (@@@)
(    )
 (@@@@)

(   )
====        ________                ___________
_D _|  |_______/        \\__I_I_____===__|_________|
|(_)---  |   H\\________/ |   |        =|___ ___|      _________________
/     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____
|      |  |   H  |__--------------------| [___] |   =|                        |
| ________|___H__/__|_____/[][]~\\_______|       |   -|                        |
|/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_
|/-=|___|=O=====O=====O=====O   |_____/~\\___/          |_D__D__D_|  |_D__D__D_|
 \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/
`,
    ];

    let output = "\x1b[1;33m";
    output += frames[0];
    output += "\x1b[0m\n";
    output += "\x1b[2m(Type 'ls' next time!)\x1b[0m\n";

    return { output };
  },
};

// matrix command - Matrix-style falling characters
export const matrixCommand: CommandDefinition = {
  name: "matrix",
  description: "Enter the Matrix",
  usage: "matrix",
  execute: async (): Promise<CommandResponse> => {
    const chars = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ0123456789:・.=*+-<>";
    const width = 180;
    const height = 40;
    let output = "\n";

    // Generate random vertical "streams" of rain
    // For each column, pick a 'head' position and a 'length'
    const streams: { head: number; len: number; speed: number }[] = [];
    for (let x = 0; x < width; x++) {
      if (Math.random() > 0.1) {
        // 90% chance to have a stream in this column
        streams.push({
          head: Math.floor(Math.random() * height * 1.5), // Allow starting off-screen
          len: Math.floor(Math.random() * 15 + 5),
          speed: Math.random(),
        });
      } else {
        streams.push({ head: -1, len: 0, speed: 0 }); // Empty column
      }
    }

    // Render the grid based on the streams
    for (let y = 0; y < height; y++) {
      let line = "";
      for (let x = 0; x < width; x++) {
        const stream = streams[x];
        const distance = stream.head - y;

        if (distance >= 0 && distance < stream.len) {
          // Pick a random matrix char
          const char = chars[Math.floor(Math.random() * chars.length)];

          if (distance === 0) {
            // The "Head" of the stream is bright white/bold
            line += `\x1b[1;37m${char}\x1b[0m`;
          } else if (distance < 5) {
            // Top part of tail is bright green
            line += `\x1b[1;32m${char}\x1b[0m`;
          } else {
            // End of tail is dim green
            line += `\x1b[2;32m${char}\x1b[0m`;
          }
        } else {
          line += " ";
        }
      }
      output += line + "\n";
    }

    output += "\n\x1b[1;32mWake up, Neo...\x1b[0m\n";
    return { output };
  },
};

// fortune command - Random developer quotes
export const fortuneCommand: CommandDefinition = {
  name: "fortune",
  description: "Get a random fortune or developer wisdom",
  usage: "fortune",
  execute: async (): Promise<CommandResponse> => {
    const fortunes = [
      "There are only two hard things in Computer Science: cache invalidation and naming things.",
      "The best error message is the one that never shows up.",
      "Code is like humor. When you have to explain it, it's bad.",
      "First, solve the problem. Then, write the code.",
      "Programming isn't about what you know; it's about what you can figure out.",
      "It's not a bug – it's an undocumented feature.",
      "Simplicity is the soul of efficiency.",
      "Make it work, make it right, make it fast.",
      "Deleted code is debugged code.",
      "One man's crappy software is another man's full time job.",
      "Software and cathedrals are much the same – first we build them, then we pray.",
      "Experience is the name everyone gives to their mistakes.",
      "Java is to JavaScript what car is to Carpet.",
      "Ruby is rubbish! PHP is phantastic!",
      "Talk is cheap. Show me the code.",
    ];

    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

    const output = `\n  \x1b[1;36m"${fortune}"\x1b[0m\n`;

    return { output };
  },
};

// sudo command - Permission denied easter egg
// Note: This is actually handled in Terminal.tsx to re-execute commands
export const sudoCommand: CommandDefinition = {
  name: "sudo",
  description: "Execute a command as superuser",
  usage: "sudo <command>",
  execute: async (): Promise<CommandResponse> => {
    // This is intercepted in Terminal.tsx before it reaches here
    return { output: "" };
  },
};

// vim/vi command - Trap users in vim
// Note: This command is handled directly in Terminal.tsx for viewport control
export const vimCommand: CommandDefinition = {
  name: "vim",
  description: "Vi IMproved - enhanced vi editor",
  aliases: ["vi"],
  execute: async (): Promise<CommandResponse> => {
    // This is intercepted in Terminal.tsx before it reaches here
    return { output: "" };
  },
};

// rm command - Fake deletion
export const rmCommand: CommandDefinition = {
  name: "rm",
  description: "Remove files or directories",
  usage: "rm [options] <file>",
  execute: async (context: CommandContext): Promise<CommandResponse> => {
    const rawInput = context.rawInput.toLowerCase();
    const hasRFlag = context.flags["r"] || context.flags["rf"];
    const hasFFlag = context.flags["f"];
    const hasRecursive = hasRFlag || rawInput.includes("-r");
    const hasForce = hasFFlag || rawInput.includes("-f");
    const hasRoot = context.args.some(
      (arg) => arg === "/" || arg === "/*" || arg === "~" || arg === "~/*"
    );
    const hasNoPreserve = rawInput.includes("--no-preserve-root");

    // Check for dangerous commands
    if ((hasRecursive && hasForce && hasRoot) || hasNoPreserve) {
      let output = "\x1b[1;31m";
      output += "⚠️  WARNING: Deleting system files...\n\n";
      output += "Deleting: /bin\n";
      output += "Deleting: /etc\n";
      output += "Deleting: /home\n";
      output += "Deleting: /usr\n";
      output += "Deleting: /var\n";
      output += "Deleting: /sys\n";
      output += "Deleting: /proc\n";
      output += "Deleting: /dev\n";
      output +=
        "\n[\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588] 100%\n\n";
      output += "\x1b[0m";
      output += "\x1b[1;32mJust kidding! 😄\x1b[0m\n";
      output += "I'm not letting you delete my portfolio that easily!\n";
      output += "This is a safe space. Try 'help' for actual commands.\n";
      return { output };
    }

    // For any other rm command
    const target = context.args.join(" ") || "(no file specified)";
    return {
      output: `\x1b[1;31mrm:\x1b[0m cannot remove '${target}': Permission denied (this is a portfolio, not a real filesystem!)\n`,
      exitCode: 1,
    };
  },
};

// Helper function to create speech bubble
function createSpeechBubble(message: string): string {
  const maxBubbleWidth = 40;
  const words = message.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if ((currentLine + word).length > maxBubbleWidth) {
      lines.push(currentLine.trim());
      currentLine = word + " ";
    } else {
      currentLine += word + " ";
    }
  }
  if (currentLine.trim()) lines.push(currentLine.trim());

  const longestLine = Math.max(...lines.map((l) => l.length));

  // Top border
  let bubble = ` ${"_".repeat(longestLine + 2)}\n`;

  // Content
  if (lines.length === 1) {
    bubble += `< ${lines[0]} >\n`;
  } else {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const padding = " ".repeat(longestLine - line.length);
      if (i === 0) {
        bubble += `/ ${line}${padding} \\\n`;
      } else if (i === lines.length - 1) {
        bubble += `\\ ${line}${padding} /\n`;
      } else {
        bubble += `| ${line}${padding} |\n`;
      }
    }
  }

  // Bottom border
  bubble += ` ${"-".repeat(longestLine + 2)}`;
  return bubble;
}
