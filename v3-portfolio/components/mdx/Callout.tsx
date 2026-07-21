import React from "react";
import { FaCircleInfo, FaTriangleExclamation, FaCircleXmark } from "react-icons/fa6";

interface CalloutProps {
  type?: "info" | "warning" | "error";
  children: React.ReactNode;
}

const styles = {
  info: {
    bg: "bg-blue/10",
    border: "border-blue",
    text: "text-blue",
    icon: FaCircleInfo,
  },
  warning: {
    bg: "bg-yellow/10",
    border: "border-yellow",
    text: "text-yellow",
    icon: FaTriangleExclamation,
  },
  error: {
    bg: "bg-red/10",
    border: "border-red",
    text: "text-red",
    icon: FaCircleXmark,
  },
};

export function Callout({ type = "info", children }: CalloutProps) {
  const currentStyle = styles[type] || styles.info;
  const Icon = currentStyle.icon;

  return (
    <div className={`my-6 flex gap-4 border-l-4 p-4 rounded-r-sm ${currentStyle.bg} ${currentStyle.border}`}>
      <div className={`mt-0.5 shrink-0 ${currentStyle.text}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 text-fg leading-relaxed prose-p:m-0">
        {children}
      </div>
    </div>
  );
}
