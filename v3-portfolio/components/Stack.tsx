import { StackTag } from "./mdx/StackTag";
import { TerminalLabel } from "./mdx/TerminalLabel";

const stackGroups = [
  {
    label: "Core",
    items: [
      "TypeScript",
      "Node.js",
      "React",
      "Next.js",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  { label: "Mobile", items: ["React Native", "Expo"] },
  {
    label: "Tooling",
    items: ["TanStack Query", "Zustand", "Zod", "Prisma", "Mongoose", "Axios"],
  },
  { label: "Infra", items: ["Vercel", "Git", "Hostinger"] },
  { label: "Learning", items: ["Go"] },
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
