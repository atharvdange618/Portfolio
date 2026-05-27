import { TerminalLabel } from "./mdx/TerminalLabel";

export function Experience() {
  return (
    <section id="experience">
      <TerminalLabel command="cat experience.md" />
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-blue font-medium text-lg">
              Smartscripts Pvt. Ltd
            </span>
            <span className="text-comment text-sm">2024–2026</span>
          </div>
          <span className="text-green text-sm">
            Jr Software Engineer → Software Development Team Lead
          </span>
          <ul className="border-l-2 border-border pl-4 flex flex-col gap-2 text-fg text-lg leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-purple shrink-0 mt-[0.35em]">▸</span>
              Built and shipped production products end-to-end across the full
              stack
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple shrink-0 mt-[0.35em]">▸</span>
              Took ownership of the IT department - architecture decisions,
              client-facing project scoping, quotations, and on-time delivery
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple shrink-0 mt-[0.35em]">▸</span>
              Mentored interns and junior developers
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple shrink-0 mt-[0.35em]">▸</span>
              Conducted technical interviews for new hires
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple shrink-0 mt-[0.35em]">▸</span>
              Entered a profit-share agreement reflecting expanded ownership and
              responsibility over the firm's technical direction
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
