export const personalInfo = {
  name: "Atharv Dange",
  role: "Full Stack Engineer",
  tagline: "I don't just use things, I dig into how they work.",
  bio: "A deep-dive experimenter at heart. My core strength is in the Node.js/Express ecosystem, but I'm constantly pushing boundaries with Bun, Hono, and Fastify. Previously built production applications and mobile apps at SmartScripts. Now open to exciting opportunities.",
  company: "Open to Opportunities",
  funFact:
    "When I'm not coding, you can find me watching movies, diving into a new anime series, or exploring the world around me with my girlfriend.",
  characterEssence: {
    identity: [
      {
        label: "Anime",
        description: "Stories of will, sacrifice, and becoming",
        icon: "Swords",
      },
      {
        label: "Dark Academia",
        description: "The romance of knowledge and old libraries",
        icon: "BookOpen",
      },
      {
        label: "Stoicism",
        description: "Control what you can. Accept what you can't.",
        icon: "Mountain",
      },
    ],
    anime: {
      favourites: ["Vagabond", "Vinland Saga", "Bleach"],
      spiritCharacter: {
        name: "Jiraiya",
        from: "Naruto",
      },
    },
    music: {
      bands: ["The 1975", "Radiohead", "Cigarettes After Sex", "Coldplay"],
      favouriteArtist: "Darshan Raval",
      instrumentalLove: ["Violin", "Piano", "Sarangi"],
    },
    movies: {
      genres: ["Mystery", "Thriller", "Sci-Fi", "Romance", "Drama"],
    },
    interests: ["Music", "Movies", "Skies & Sunsets"],
    philosophy: "Empathy over indifference",
    quote: {
      text: "A man who has not passed through the inferno of his passions has never overcome them.",
      author: "Carl Jung",
    },
  },
  askMeAbout: [
    "Backend Architecture",
    "TypeScript",
    "React Native",
    "Full Stack Development",
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/atharvdange",
    twitter: "https://x.com/atharvdangedev",
    github: "https://github.com/atharvdange618",
    email: "mailto:atharvdange.dev@gmail.com",
    portfolio: "https://atharvdangedev.in",
    blog: "https://blog.atharvdangedev.in",
  },
};

export const techStack = {
  core: ["nodejs", "express", "postgres", "react", "nextjs", "ts", "mongodb"],
  coreText: [] as string[],

  exploratory: ["bun", "sqlite", "go"],
  exploratoryText: ["Hono", "React Native/Expo", "Fastify"],

  frontend: ["react", "nextjs", "ts", "tailwind", "vite"],
  frontendText: [] as string[],

  stateAndData: ["prisma"],
  stateAndDataText: ["TanStack Query", "Zustand", "Mongoose"],

  tools: [
    "git",
    "github",
    "neovim",
    "vscode",
    "vercel",
    "linux",
    "obsidian",
    "pnpm",
  ],
  toolsText: [] as string[],

  other: ["prisma", "pnpm", "npm", "md"],
};

export const mockProjects = [
  {
    id: "1",
    name: "ArcHive",
    status: "Active",
    description:
      "Your personal digital sanctuary for thoughts, links, and code. Multi-platform capture tool with automatic link parsing, screenshot generation, intelligent tagging, and full-text search. Released v1.0.0 Android APK.",
    techStack: [
      "TypeScript",
      "Expo",
      "Bun",
      "Hono",
      "MongoDB",
      "Puppeteer",
      "Cloudinary",
      "TanStack Query",
    ],
    github: "https://github.com/atharvdange618/ArcHive",
    live: "https://github.com/atharvdange618/ArcHive/releases/tag/v1.0.0",
  },
  {
    id: "2",
    name: "Reiatsu",
    status: "Active",
    description:
      "Minimal, type-safe HTTP framework for Node.js built from first principles with zero dependencies. Production-ready with comprehensive security, performance optimizations, and modern developer experience. Published on npm.",
    techStack: ["TypeScript", "Node.js"],
    github: "https://github.com/atharvdange618/reiatsu",
    live: "https://www.npmjs.com/package/reiatsu",
  },
  {
    id: "3",
    name: "Recon",
    status: "Active",
    description:
      "Tactical bug tracking intelligence system with visual timeline. Your single source of truth a private, undeniable log of every bug, conversation, and decision. Features sacred timeline with Skia graphics, real-time dashboard, and offline-first architecture.",
    techStack: ["TypeScript", "SQLite", "Expo", "Skia"],
    github: "https://github.com/atharvdange618/Recon",
    live: null,
  },
  {
    id: "4",
    name: "Relay",
    status: "Completed",
    description:
      "Real-time TCP message relay engine built to deeply understand Node.js at the systems level. Binary frame-based protocol with room-based routing, backpressure handling, and event-driven architecture.",
    techStack: ["Node.js", "TypeScript"],
    github: "https://github.com/atharvdange618/Relay",
    live: null,
  },
  {
    id: "5",
    name: "Minty",
    status: "Completed",
    description:
      "Smart expense tracking with automatic SMS parsing from 50+ banks and UPI apps. Features real-time analytics, spending velocity gauge, heatmap calendar, and 100% offline processing with local SQLite storage.",
    techStack: ["React Native", "TypeScript", "SQLite"],
    github: "https://github.com/atharvdange618/Minty",
    live: null,
  },
  {
    id: "6",
    name: "XML Sitemap Generator",
    status: "Completed",
    description:
      "Generate comprehensive, SEO-optimized XML sitemaps with real-time progress tracking. Intelligently handles SSR/CSR pages, respects robots.txt, and supports up to 1000 pages with concurrent processing.",
    techStack: ["Next.js", "JavaScript", "Puppeteer", "SSE"],
    github: "https://github.com/atharvdange618/xml-sitemap-generator",
    live: null,
  },
];
