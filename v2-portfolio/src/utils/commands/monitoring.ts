import {
  CommandDefinition,
  CommandContext,
  CommandResponse,
} from "@/utils/command-registry";
import { projects as allProjects } from "@/data/portfolio-data";

// Helper function to create progress bar
function createProgressBar(percentage: number, width: number = 20): string {
  const filled = Math.round((percentage / 100) * width);
  const empty = width - filled;
  return `[${"█".repeat(filled)}${"░".repeat(empty)}]`;
}

// Helper to format uptime
function formatUptime(days: number): string {
  if (days < 1) return "< 1 day";
  if (days < 30) return `${days} days`;
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""}`;
  }
  const years = Math.floor(days / 365);
  const remainingDays = days % 365;
  return `${years}y ${remainingDays}d`;
}

function getProcessStats(projectName: string) {
  const baseStats: { [key: string]: { cpu: number; mem: number } } = {
    reiatsu: { cpu: 12.3, mem: 256 },
    telemetry: { cpu: 8.7, mem: 512 },
    archive: { cpu: 6.2, mem: 384 },
    minty: { cpu: 3.1, mem: 128 },
    recon: { cpu: 4.5, mem: 192 },
    "xml-sitemap-generator": { cpu: 2.4, mem: 64 },
  };

  const stats = baseStats[projectName.toLowerCase()] || { cpu: 5.0, mem: 128 };

  const cpuVariation = (Math.random() - 0.5) * 2;
  const memVariation = Math.floor((Math.random() - 0.5) * 20);

  return {
    cpu: Math.max(0, Math.min(100, stats.cpu + cpuVariation)),
    mem: Math.max(0, stats.mem + memVariation),
  };
}

// htop command - Interactive process viewer
export const htopCommand: CommandDefinition = {
  name: "htop",
  description: "Interactive process viewer",
  usage: "htop",
  execute: (): CommandResponse => {
    const projects = allProjects.filter((p) => p.status !== "development");

    let totalCpu = 0;
    let totalMem = 0;

    const processLines = projects.map((project, index) => {
      const pid = 1001 + index;
      const stats = getProcessStats(project.name);
      totalCpu += stats.cpu;
      totalMem += stats.mem;

      const statusIcon = project.status === "stable" ? "✓" : "◆";
      const statusColor =
        project.status === "stable" ? "\x1b[1;32m" : "\x1b[1;33m";

      return {
        pid,
        name: project.name,
        cpu: stats.cpu,
        mem: stats.mem,
        uptime: project.uptime || 0,
        status: `${statusColor}${statusIcon}\x1b[0m`,
      };
    });

    const load1 = (totalCpu / 100).toFixed(2);
    const load5 = (totalCpu / 100 + 0.05).toFixed(2);
    const load15 = (totalCpu / 100 + 0.03).toFixed(2);

    let output = "\n";
    output += "\x1b[1;36m  System Monitor - atharvdange.dev\x1b[0m\n\n";

    const cpuPercent = Math.min(100, totalCpu);
    const memPercent = Math.min(100, (totalMem / 2048) * 100);
    const networkPercent = 18;

    output += `  \x1b[1;33mCPU Usage\x1b[0m  ${createProgressBar(
      cpuPercent,
      20
    )} \x1b[1;32m${cpuPercent.toFixed(1)}%\x1b[0m  Backend Services\n`;
    output += `  \x1b[1;33mMemory   \x1b[0m  ${createProgressBar(
      memPercent,
      20
    )} \x1b[1;32m${memPercent.toFixed(1)}%\x1b[0m  Node.js Processes\n`;
    output += `  \x1b[1;33mNetwork  \x1b[0m  ${createProgressBar(
      networkPercent,
      20
    )} \x1b[1;32m${networkPercent}%\x1b[0m  Active Connections\n`;
    output += "\n";

    output += `  \x1b[1;36mPID   NAME                    CPU%   MEM    UPTIME       STATUS\x1b[0m\n`;
    output += `  \x1b[2m────  ──────────────────────  ─────  ─────  ───────────  ──────\x1b[0m\n`;

    processLines.forEach((proc) => {
      const pidStr = proc.pid.toString().padEnd(6);
      const nameStr = proc.name.padEnd(22);
      const cpuStr = proc.cpu.toFixed(1).padStart(5);
      const memStr = `${proc.mem}M`.padEnd(6);
      const uptimeStr = formatUptime(proc.uptime).padEnd(12);

      output += `  ${pidStr}${nameStr}${cpuStr}  ${memStr} ${uptimeStr} ${proc.status} Running\n`;
    });

    output += "\n";
    output += `  \x1b[1;33mTotal Processes:\x1b[0m ${projects.length} active`;
    output += ` | \x1b[1;33mLoad:\x1b[0m ${load1}, ${load5}, ${load15}`;
    output += ` | \x1b[1;33mUptime:\x1b[0m 99.98%\n`;

    output += "\n";
    output += `  \x1b[2mTip: Try 'systemctl status' for detailed project info\x1b[0m\n`;

    return { output };
  },
};

export const topCommand: CommandDefinition = {
  name: "top",
  description: "Display running processes",
  usage: "top",
  execute: (): CommandResponse => {
    const projects = allProjects.filter((p) => p.status !== "development");

    let output = "\n";
    output += "\x1b[1;36mtop - Process Monitor\x1b[0m\n\n";

    output += "Tasks: \x1b[1;32m6 active\x1b[0m, 0 sleeping, 0 stopped\n";
    output += "Load average: 0.45, 0.52, 0.48\n\n";

    output += "\x1b[1;33m  PID  USER     %CPU  %MEM  COMMAND\x1b[0m\n";

    projects.forEach((project, index) => {
      const pid = 1001 + index;
      const stats = getProcessStats(project.name);

      const pidStr = pid.toString().padEnd(5);
      const userStr = "atharv".padEnd(9);
      const cpuStr = stats.cpu.toFixed(1).padStart(5);
      const memStr = ((stats.mem / 2048) * 100).toFixed(1).padStart(5);

      output += `  ${pidStr}${userStr}${cpuStr} ${memStr}  ${project.name}\n`;
    });

    output += "\n\x1b[2mTip: Use 'htop' for a better view\x1b[0m\n";

    return { output };
  },
};

export const psCommand: CommandDefinition = {
  name: "ps",
  description: "Report process status",
  usage: "ps [aux]",
  execute: (context: CommandContext): CommandResponse => {
    const hasAux = context.args.includes("aux") || context.flags["a"];

    if (!hasAux) {
      return {
        output: `\x1b[2mTip: Use 'ps aux' to see all processes\x1b[0m\n`,
      };
    }

    const projects = allProjects;

    let output = "\n";
    output +=
      "\x1b[1;33mUSER       PID  %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\x1b[0m\n";

    projects.forEach((project, index) => {
      const pid = 1001 + index;
      const stats = getProcessStats(project.name);
      const vsz = stats.mem * 4;
      const rss = stats.mem;

      const statusChar = project.status === "stable" ? "S" : "R";
      const uptime = project.uptime || 0;
      const hours = Math.floor(uptime / 24);
      const mins = uptime % 24;
      const time = `${hours}:${mins.toString().padStart(2, "0")}`;

      const user = "atharv".padEnd(11);
      const pidStr = pid.toString().padEnd(5);
      const cpuStr = stats.cpu.toFixed(1).padStart(4);
      const memStr = ((stats.mem / 2048) * 100).toFixed(1).padStart(4);
      const vszStr = vsz.toString().padStart(6);
      const rssStr = rss.toString().padStart(5);
      const tty = "pts/0".padEnd(9);
      const stat = statusChar.padEnd(5);
      const start = "Jan01".padEnd(8);
      const timeStr = time.padEnd(5);

      output += `${user}${pidStr}${cpuStr} ${memStr} ${vszStr} ${rssStr} ${tty}${stat}${start}${timeStr}node ${project.name}\n`;
    });

    output += "\n";

    return { output };
  },
};

// free command - Display memory usage
export const freeCommand: CommandDefinition = {
  name: "free",
  description: "Display memory usage",
  usage: "free [-h]",
  execute: (context: CommandContext): CommandResponse => {
    const humanReadable = context.flags["h"];

    const totalMem = humanReadable ? "16Gi" : "16384";
    const usedMem = humanReadable ? "5.2Gi" : "5324";
    const freeMem = humanReadable ? "8.4Gi" : "8600";
    const sharedMem = humanReadable ? "2.4Gi" : "2460";
    const totalSwap = humanReadable ? "8.0Gi" : "8192";
    const usedSwap = humanReadable ? "0.0Gi" : "0";
    const freeSwap = humanReadable ? "8.0Gi" : "8192";

    let output = "\n";
    if (humanReadable) {
      output += "              total       used       free     shared\n";
      output += `Mem:  ${totalMem.padStart(10)} ${usedMem.padStart(
        10
      )} ${freeMem.padStart(10)} ${sharedMem.padStart(10)}\n`;
      output += `Swap: ${totalSwap.padStart(10)} ${usedSwap.padStart(
        10
      )} ${freeSwap.padStart(10)}\n`;
    } else {
      output +=
        "              total       used       free     shared (in MB)\n";
      output += `Mem:  ${totalMem.padStart(10)} ${usedMem.padStart(
        10
      )} ${freeMem.padStart(10)} ${sharedMem.padStart(10)}\n`;
      output += `Swap: ${totalSwap.padStart(10)} ${usedSwap.padStart(
        10
      )} ${freeSwap.padStart(10)}\n`;
    }
    output += "\n";

    return { output };
  },
};

// df command - Disk usage
export const dfCommand: CommandDefinition = {
  name: "df",
  description: "Report file system disk space usage",
  usage: "df [-h]",
  execute: (context: CommandContext): CommandResponse => {
    const humanReadable = context.flags["h"];

    let output = "\n";

    if (humanReadable) {
      output += "Filesystem       Size  Used Avail Use% Mounted on\n";
      output += "/dev/sda1         50G   32G   16G  67% /\n";
      output += "/dev/sda2        100G   45G   50G  47% /home\n";
      output += "tmpfs            8.0G  2.4G  5.6G  30% /tmp\n";
    } else {
      output += "/dev/sda1      52428800 33554432 16777216  67% /\n";
      output += "/dev/sda2     104857600 47185920 52428800  47% /home\n";
      output += "tmpfs           8388608  2516582  5872026  30% /tmp\n";
    }

    output += "\n";

    return { output };
  },
};

export const monitoringCommands = [
  htopCommand,
  topCommand,
  psCommand,
  freeCommand,
  dfCommand,
];
