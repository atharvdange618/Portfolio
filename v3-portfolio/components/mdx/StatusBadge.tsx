import { cn } from "@/lib/utils";
import { ProjectStatus } from "@/lib/types";

type Props = {
  status: ProjectStatus;
};

const statusConfig: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  active: {
    label: "active",
    className: "text-yellow border-yellow",
  },
  completed: {
    label: "completed",
    className: "text-green border-green",
  },
  archived: {
    label: "archived",
    className: "text-red border-red",
  },
};

export function StatusBadge({ status }: Props) {
  const { label, className } = statusConfig[status];
  return (
    <span
      className={cn(
        "text-xs border px-2 py-0.5 font-mono tracking-wider rounded-sm",
        className,
      )}
    >
      [{label}]
    </span>
  );
}
