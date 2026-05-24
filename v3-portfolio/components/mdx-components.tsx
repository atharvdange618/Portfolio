"use client";

import React, { useState } from "react";
import {
  Cpu,
  Database,
  HardDrive,
  Terminal,
  Settings,
  Play,
  RefreshCw,
  Info,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "note";
}

export function Callout({ children, type = "note" }: CalloutProps) {
  const styles = {
    note: {
      border: "border-l-4 border-purple",
      bg: "bg-tag-background/40",
      text: "text-purple",
      icon: Info,
    },
    info: {
      border: "border-l-4 border-blue",
      bg: "bg-blue/5",
      text: "text-blue",
      icon: Info,
    },
    warning: {
      border: "border-l-4 border-purple-blue",
      bg: "bg-purple-blue/5",
      text: "text-purple-blue",
      icon: AlertTriangle,
    },
    success: {
      border: "border-l-4 border-green",
      bg: "bg-green/5",
      text: "text-green",
      icon: CheckCircle,
    },
  };

  const current = styles[type];
  const Icon = current.icon;

  return (
    <div
      className={`p-4 rounded-r-lg my-6 ${current.border} ${current.bg} flex items-start gap-3`}
    >
      <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${current.text}`} />
      <div className="text-gray-white/90 text-sm leading-relaxed font-sans">
        {children}
      </div>
    </div>
  );
}

type FlowType = "read" | "cpu" | "malloc";

interface FlowStep {
  title: string;
  desc: string;
  activeNodes: string[];
  packetPosition: { x: string; y: string };
}

export function SystemsDiagram() {
  const [activeFlow, setActiveFlow] = useState<FlowType | null>(null);
  const [stepIndex, setStepIndex] = useState<number>(0);

  const flows: Record<FlowType, { title: string; steps: FlowStep[] }> = {
    read: {
      title: "File Read (sys_read)",
      steps: [
        {
          title: "1. User Space Request",
          desc: "Application calls read(fd, buf, count), transitioning execution into the OS Kernel via a System Call.",
          activeNodes: ["user"],
          packetPosition: { x: "20%", y: "25%" },
        },
        {
          title: "2. OS VFS / Page Cache Lookup",
          desc: "The OS kernel intercepts the syscall. It checks the Page Cache in RAM to see if the file blocks are already loaded.",
          activeNodes: ["kernel", "ram"],
          packetPosition: { x: "50%", y: "45%" },
        },
        {
          title: "3. Disk I/O (Cache Miss)",
          desc: "On a cache miss, the Virtual File System requests the device driver to issue direct disk I/O to read sectors.",
          activeNodes: ["kernel", "disk"],
          packetPosition: { x: "80%", y: "75%" },
        },
        {
          title: "4. DMA transfer to RAM",
          desc: "Direct Memory Access (DMA) controller transfers file contents directly from Disk into the kernel's RAM Page Cache, bypassing the CPU.",
          activeNodes: ["disk", "ram"],
          packetPosition: { x: "50%", y: "75%" },
        },
        {
          title: "5. Copy to User Space",
          desc: "The kernel copies the requested bytes from Page Cache in RAM to the application buffer in User Space. The syscall returns.",
          activeNodes: ["ram", "user"],
          packetPosition: { x: "20%", y: "25%" },
        },
      ],
    },
    cpu: {
      title: "CPU Execution Loop",
      steps: [
        {
          title: "1. Fetch Instruction",
          desc: "CPU Program Counter (PC) contains the memory address of the next instruction. The instruction is fetched from RAM L1/L2/L3 cache.",
          activeNodes: ["cpu", "ram"],
          packetPosition: { x: "50%", y: "75%" },
        },
        {
          title: "2. Decode Instruction",
          desc: "The Control Unit inside the CPU decodes the instruction bits to determine the opcode, source, and destination registers.",
          activeNodes: ["cpu"],
          packetPosition: { x: "20%", y: "75%" },
        },
        {
          title: "3. Execute / ALU",
          desc: "Arithmetic Logic Unit (ALU) performs operations (add, sub, shift, load, etc.) and updates internal CPU Registers.",
          activeNodes: ["cpu"],
          packetPosition: { x: "20%", y: "75%" },
        },
      ],
    },
    malloc: {
      title: "Memory Allocation (malloc)",
      steps: [
        {
          title: "1. Heap Request",
          desc: "Application calls malloc(size). The memory allocator (e.g., glibc ptmalloc) looks in its user-space free list.",
          activeNodes: ["user"],
          packetPosition: { x: "20%", y: "25%" },
        },
        {
          title: "2. Syscall (brk / mmap)",
          desc: "If no free chunks fit, allocator invokes sys_brk or sys_mmap to request the kernel to grow the process's heap space.",
          activeNodes: ["user", "kernel"],
          packetPosition: { x: "50%", y: "45%" },
        },
        {
          title: "3. Page Table & Physical RAM Allocation",
          desc: "The OS kernel updates the process's page table. Physical RAM pages are allocated and mapped into the process virtual address space.",
          activeNodes: ["kernel", "ram"],
          packetPosition: { x: "50%", y: "75%" },
        },
      ],
    },
  };

  const handleStartFlow = (flow: FlowType) => {
    setActiveFlow(flow);
    setStepIndex(0);
  };

  const handleNextStep = () => {
    if (!activeFlow) return;
    const maxSteps = flows[activeFlow].steps.length;
    if (stepIndex < maxSteps - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setStepIndex(0);
    }
  };

  const currentFlowData = activeFlow ? flows[activeFlow] : null;
  const currentStepData = currentFlowData
    ? currentFlowData.steps[stepIndex]
    : null;
  const activeNodes = currentStepData ? currentStepData.activeNodes : [];

  return (
    <div className="bg-[#16161e] border border-card-border rounded-xl p-6 my-8 font-mono text-xs">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-card-border pb-4">
        <div>
          <h4 className="text-sm font-bold text-purple-blue flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-purple" />
            Interactive Systems Architecture Simulation
          </h4>
          <p className="text-muted text-[11px] mt-1 font-sans">
            Choose a system flow below to visualize how user applications,
            operating system kernels, and hardware devices interact.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["read", "cpu", "malloc"] as FlowType[]).map((flow) => (
            <button
              key={flow}
              onClick={() => handleStartFlow(flow)}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold cursor-pointer ${
                activeFlow === flow
                  ? "bg-purple-blue text-background"
                  : "bg-tag-background text-gray-white"
              }`}
            >
              {flow === "read" && "File Read"}
              {flow === "cpu" && "CPU Exec"}
              {flow === "malloc" && "Malloc"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 border border-card-border/60 bg-background/50 rounded-lg p-6 relative min-h-[300px] flex flex-col justify-between overflow-hidden">
          {activeFlow && currentStepData && (
            <div
              className="absolute w-3.5 h-3.5 rounded-full bg-blue border-2 border-background z-20 -translate-x-1/2 -translate-y-1/2"
              style={{
                left: currentStepData.packetPosition.x,
                top: currentStepData.packetPosition.y,
              }}
            />
          )}

          <div className="w-full flex justify-center">
            <div
              className={`w-4/5 max-w-[280px] p-3 rounded-md border text-center ${
                activeNodes.includes("user")
                  ? "border-purple bg-purple/10 text-purple"
                  : "border-card-border bg-[#1a1b26]/50 text-gray-white/60"
              }`}
            >
              <div className="font-bold flex items-center justify-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" />
                User Space (Ring 3)
              </div>
              <p className="text-[9px] mt-1 opacity-80 font-sans">
                User Code, Memory Allocators, Buffers
              </p>
            </div>
          </div>

          <div className="w-full flex justify-center my-4">
            <div
              className={`w-11/12 max-w-[340px] p-3 rounded-md border text-center relative ${
                activeNodes.includes("kernel")
                  ? "border-blue bg-blue/10 text-blue"
                  : "border-card-border bg-[#1a1b26]/50 text-gray-white/60"
              }`}
            >
              <div className="absolute -top-2.5 left-4 px-2 bg-background border border-card-border rounded text-[9px] text-muted">
                System Call Interface
              </div>
              <div className="font-bold flex items-center justify-center gap-1.5">
                <Settings className="w-3.5 h-3.5" />
                OS Kernel Space (Ring 0)
              </div>
              <p className="text-[9px] mt-1 opacity-80 font-sans">
                VFS, Page Cache, Schedulers, Page Tables
              </p>
            </div>
          </div>

          <div className="w-full flex justify-between gap-2 mt-2">
            <div
              className={`flex-1 p-2 rounded-md border text-center ${
                activeNodes.includes("cpu")
                  ? "border-purple-blue bg-purple-blue/10 text-purple-blue"
                  : "border-card-border bg-[#1a1b26]/50 text-gray-white/60"
              }`}
            >
              <Cpu className="w-4 h-4 mx-auto mb-1" />
              <div className="font-bold text-[10px]">CPU</div>
              <p className="text-[8px] opacity-75 hidden sm:block font-sans">
                ALU, Regs
              </p>
            </div>

            <div
              className={`flex-1 p-2 rounded-md border text-center ${
                activeNodes.includes("ram")
                  ? "border-green bg-green/10 text-green"
                  : "border-card-border bg-[#1a1b26]/50 text-gray-white/60"
              }`}
            >
              <Database className="w-4 h-4 mx-auto mb-1" />
              <div className="font-bold text-[10px]">Physical RAM</div>
              <p className="text-[8px] opacity-75 hidden sm:block font-sans">
                Pages, Cache
              </p>
            </div>

            <div
              className={`flex-1 p-2 rounded-md border text-center ${
                activeNodes.includes("disk")
                  ? "border-muted bg-muted/10 text-muted-foreground"
                  : "border-card-border bg-[#1a1b26]/50 text-gray-white/60"
              }`}
            >
              <HardDrive className="w-4 h-4 mx-auto mb-1" />
              <div className="font-bold text-[10px] text-gray-white">
                Storage Disk
              </div>
              <p className="text-[8px] opacity-75 hidden sm:block font-sans">
                Sectors, Blocks
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 border border-card-border bg-background rounded-lg p-5 flex flex-col justify-between">
          {activeFlow && currentStepData ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-tag-background text-purple font-bold">
                    {flows[activeFlow].title}
                  </span>
                  <span className="text-[10px] text-muted">
                    Step {stepIndex + 1} of {flows[activeFlow].steps.length}
                  </span>
                </div>
                <h5 className="text-purple-blue font-bold text-sm mb-2">
                  {currentStepData.title}
                </h5>
                <p className="text-gray-white/80 leading-relaxed text-[11px] font-sans">
                  {currentStepData.desc}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-card-border/60 flex items-center justify-between">
                <button
                  onClick={() => handleStartFlow(activeFlow)}
                  className="p-2 rounded-md text-muted cursor-pointer"
                  title="Restart Flow"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex items-center gap-1 px-3 py-1.5 rounded bg-green text-background font-bold cursor-pointer"
                >
                  Next Step
                  <Play className="w-3 h-3 fill-current" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <HelpCircle className="w-8 h-8 text-muted mb-3" />
              <h5 className="text-gray-white font-bold text-sm mb-1">
                No Active Simulation
              </h5>
              <p className="text-muted text-[10px] max-w-[200px] leading-normal font-sans">
                Select one of the system flows above to run an interactive
                visualization.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const mdxComponents = {
  Callout,
  SystemsDiagram,
};
