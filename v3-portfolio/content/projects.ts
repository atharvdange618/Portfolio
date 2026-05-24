export interface Project {
  title: string;
  description: string | string[];
  tags: string[];
  liveLink: string; // deployed link
  devLink: string; // github link
  hidden?: boolean;
}

const projects: Project[] = [
  {
    title: "Kleis: Identity Provider (IdP) and Next.js SDK",
    description:
      "A from-scratch OpenID Connect Identity Provider and Next.js SDK built around secure OAuth 2.0 flows, PKCE, JWT signing, and standards-compliant discovery.",
    tags: ["Node.js", "TypeScript", "Express", "Prisma", "PostgreSQL"],
    liveLink: "https://kleis.atharvdangedev.in/",
    devLink: "https://github.com/atharvdange618/OIDC",
  },
  {
    title: "Tabi: Collaborative Trip Planner",
    description:
      "A collaborative trip planner that brings itineraries, budgets, roles, and real-time updates into one streamlined group travel workspace.",
    tags: ["Next.js", "TypeScript", "MongoDB", "Express", "Bun", "Clerk"],
    liveLink: "https://tabi.atharvdangedev.in",
    devLink: "https://github.com/atharvdange618/Tabi",
  },
  {
    title: "Shikai: GitHub Companion App",
    description:
      "A mobile-first GitHub companion app for tracking activity, exploring repositories, and managing authenticated developer workflows with a polished native feel.",
    tags: ["React Native", "Expo", "GitHub API", "TypeScript"],
    liveLink: "https://github.com/atharvdange618/Shikai/releases",
    devLink: "https://github.com/atharvdange618/Shikai",
  },
  {
    title: "XML Sitemap Generator",
    description:
      "An intelligent XML sitemap generator that crawls modern sites, respects robots rules, handles CSR pages, and streams real-time crawl progress.",
    tags: ["Next.js", "Node.js", "Puppeteer", "Axios", "Tailwind CSS"],
    liveLink: "https://xml-sitemap-generator.vercel.app",
    devLink: "https://github.com/atharvdange618/xml-sitemap-generator",
  },
];

export default projects;
