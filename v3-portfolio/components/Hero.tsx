export function Hero() {
  return (
    <section>
      <h1 className="sr-only">
        Atharv Dange - Full Stack Engineer & Cinephile
      </h1>
      <div className="flex flex-col items-start w-full">
        <div className="hidden sm:flex flex-row flex-wrap mb-8 gap-x-8 gap-y-4 overflow-x-auto w-full">
          <pre className="text-green text-xs md:text-sm lg:text-base whitespace-pre leading-tight">
            {`
 █████╗ ████████╗██╗  ██╗ █████╗ ██████╗ ██╗   ██╗
██╔══██╗╚══██╔══╝██║  ██║██╔══██╗██╔══██╗██║   ██║
███████║   ██║   ███████║███████║██████╔╝██║   ██║
██╔══██║   ██║   ██╔══██║██╔══██║██╔══██╗╚██╗ ██╔╝
██║  ██║   ██║   ██║  ██║██║  ██║██║  ██║ ╚████╔╝ 
╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  
`}
          </pre>
          <pre className="text-green text-xs md:text-sm lg:text-base whitespace-pre leading-tight">
            {`
██████╗  █████╗ ███╗   ██╗ ██████╗ ███████╗
██╔══██╗██╔══██╗████╗  ██║██╔════╝ ██╔════╝
██║  ██║███████║██╔██╗ ██║██║  ███╗█████╗  
██║  ██║██╔══██║██║╚██╗██║██║   ██║██╔══╝  
██████╔╝██║  ██║██║ ╚████║╚██████╔╝███████╗
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
`}
          </pre>
        </div>

        <p className="hidden sm:block text-comment text-lg mb-8 max-w-lg">
          Full Stack Engineer building production systems end-to-end, from auth
          protocols and API design to the interfaces people actually use.
        </p>

        <div className="flex sm:hidden flex-col mb-8 gap-2 font-mono text-base text-green w-full border border-border p-4 bg-surface/30 rounded">
          <div className="flex items-center gap-2">
            <span>atharv@dange:~$</span>
            <span className="text-fg animate-pulse">neofetch</span>
          </div>
          <div className="h-px bg-border my-1"></div>
          <div className="text-lg font-bold text-green tracking-wide">
            ATHARV DANGE
          </div>
          <div className="text-comment text-sm">
            Full Stack Engineer & Cinephile
          </div>
          <div className="text-fg/80 text-xs mt-1">OS: Node.js/Web Core</div>
          <div className="text-fg/80 text-xs">
            Host: Pune, Maharashtra, India
          </div>
          <div className="text-fg/80 text-xs">
            Shell: React/Node.js/TypeScript
          </div>
        </div>

        <nav className="flex flex-wrap w-full justify-between gap-y-2">
          {[
            { label: "~/about", href: "#about" },
            { label: "~/experience", href: "#experience" },
            { label: "~/projects", href: "#projects" },
            { label: "~/blog", href: "#blog" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={`Navigate to ${label.split("/")[1]} section`}
              className="text-comment hover:text-purple transition-colors duration-200 text-lg underline-offset-4 decoration-border/50 hover:decoration-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple focus-visible:outline-offset-2"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
