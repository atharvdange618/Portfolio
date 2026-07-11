import { TerminalLabel } from "./mdx/TerminalLabel";

export function About() {
  return (
    <section id="about">
      <TerminalLabel command="cat about.md" />
      <div className="flex flex-col gap-3 text-fg leading-relaxed text-lg">
        <p>
          I&apos;m a Full Stack Engineer based in Pune, India. I build production
          systems end-to-end - from auth protocols and API design to the
          interfaces people actually use.
        </p>
        <p>
          When I want to understand how something works, I rebuild it from first
          principles. I&apos;ve built HTTP frameworks, client-side routers, CSS
          engines, OIDC providers, and web rendering pipelines - not to replace
          existing tools, but to understand the problems they solve at the
          protocol level.
        </p>
        <p>
          Outside of code I write about what I find at{" "}
          <a
            href="https://blog.atharvdangedev.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue hover:text-purple transition-colors duration-200 underline decoration-dotted underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple focus-visible:outline-offset-2"
          >
            blog.atharvdangedev.in
          </a>{" "}
          and watch way too many films.
        </p>
      </div>
    </section>
  );
}
