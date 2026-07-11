import { StackTag } from "./mdx/StackTag";
import { TerminalLabel } from "./mdx/TerminalLabel";

const stackGroups = [
  {
    label: "Languages",
    items: ["TypeScript"],
  },
  {
    label: "Frontend",
    items: ["React", "Next.js", "React Native", "Expo"],
  },
  {
    label: "Backend",
    items: ["Node.js", "PostgreSQL", "MongoDB", "Prisma"],
  },
  {
    label: "Tooling",
    items: ["React Query", "Zustand", "Zod", "Turborepo", "Oxc", "Vitest"],
  },
  {
    label: "Protocols",
    items: ["OAuth 2.0", "OIDC", "REST", "SSE"],
  },
  { label: "Infra", items: ["Vercel", "Git", "Render", "Hostinger"] },
];

export function Stack() {
  return (
    <section id="stack">
      <TerminalLabel command="cat stack.md" />
      <div className="flex flex-col gap-3">
        {stackGroups.map(({ label, items }) => (
          <div key={label} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="text-comment text-base w-20 shrink-0">
              {label}
            </span>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <StackTag key={item} tag={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
