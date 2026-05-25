import { cn } from "@/lib/utils";

type Props = {
  command: string;
  className?: string;
};

export function TerminalLabel({ command, className }: Props) {
  return (
    <h2
      className={cn(
        "flex items-center gap-2 mb-6 text-lg font-normal font-mono",
        className,
      )}
    >
      <span className="text-green">$</span>
      <span className="text-comment">{command}</span>
    </h2>
  );
}
