export function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-2.5 py-1 text-xs font-mono bg-tag-background text-purple rounded-md">
      {children}
    </span>
  );
}
