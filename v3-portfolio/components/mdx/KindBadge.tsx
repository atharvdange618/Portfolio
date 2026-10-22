import { cn } from "@/lib/utils";
import { ProjectKind } from "@/lib/types";

type Props = {
  kind: ProjectKind;
};

const kindConfig: Record<ProjectKind, { label: string; className: string }> = {
  product: {
    label: "product",
    className: "text-purple border-purple",
  },
  package: {
    label: "npm package",
    className: "text-blue border-blue",
  },
  learning: {
    label: "learning",
    className: "text-comment border-comment",
  },
};

export function KindBadge({ kind }: Props) {
  const { label, className } = kindConfig[kind];
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
