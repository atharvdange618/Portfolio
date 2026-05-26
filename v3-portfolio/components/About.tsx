import { TerminalLabel } from "./mdx/TerminalLabel";

export function About() {
  return (
    <section id="about">
      <TerminalLabel command="cat about.md" />
      <div className="flex flex-col gap-3 text-fg leading-relaxed text-lg">
        <p>
          I’m a Full Stack Engineer based in Pune, India. I build production
          systems end-to-end - from auth protocols and API design to the
          interfaces people actually use.
        </p>
        <p>
          My focus is on writing software that’s correct, maintainable, and
          worth explaining. I care about how systems work under the hood, which
          is why I tend to build things from scratch when I want to understand
          them properly.
        </p>
        <p>
          Outside of code I write about Web fundamentals, Frameworks, Tools and
          Software Engineering at{" "}
          <a
            href="https://blog.atharvdangedev.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue hover:text-purple transition-colors duration-200"
          >
            blog.atharvdangedev.in
          </a>{" "}
          and watch way too many films.
        </p>
      </div>
    </section>
  );
}
