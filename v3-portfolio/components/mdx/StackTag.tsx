import { cn } from "@/lib/utils";

type Props = {
  tag: string;
  className?: string;
};

export function StackTag({ tag, className }: Props) {
  return (
    <span
      className={cn(
        "text-sm text-cyan border border-border px-2 py-0.5 font-mono rounded-sm",
        className,
      )}
    >
      {tag}
    </span>
  );
}
