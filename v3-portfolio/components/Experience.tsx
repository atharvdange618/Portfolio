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
          <div className="border-l-2 border-border pl-4 flex flex-col gap-3 text-fg text-lg leading-relaxed">
            <p>
              Built and shipped production products end-to-end across the full
              stack. Took ownership of the IT department - from architecture
              decisions to client-facing project scoping, quotations, and
              on-time delivery.
            </p>
            <p>
              Mentored interns and junior developers, conducted technical
              interviews for new hires, and entered a profit-share agreement
              reflecting expanded ownership and responsibility over the firm’s
              technical direction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
