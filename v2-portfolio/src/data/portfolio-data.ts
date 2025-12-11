import { Project, Experience, Skill } from "@/types/terminal";

export const projects: Project[] = [
  {
    id: "reiatsu",
    name: "reiatsu.service",
    description:
      "A minimal, type-safe HTTP server framework built from first principles using only Node.js core modules. Zero dependencies, fully typed, and production-ready with advanced routing, middleware, CORS, rate limiting, and comprehensive error handling.",
    tech: ["TypeScript", "Node.js", "HTTP Module"],
    github: "https://github.com/atharvdange618/reiatsu",
    live: "https://www.npmjs.com/package/reiatsu",
    npm: "reiatsu",
    status: "stable",
    uptime: 203,
    metrics: {
      downloads: 0, // Will be fetched from API
      stars: 0, // Will be fetched from API
    },
  },
  {
    id: "telemetry",
    name: "telemetry.service",
    description:
      "Privacy-first, cookieless analytics platform. Gain genuine insights without compromising visitor privacy. Features real-time dashboards, multi-site management, goal tracking, UTM campaign tracking, and world map visualizations with GitHub authentication.",
    tech: ["Fastify", "React", "TypeScript", "Prisma", "PostgreSQL"],
    github: "https://github.com/atharvdange618/Telemetry",
    live: "https://usetelemetry.vercel.app",
    status: "running",
    metrics: {
      responseTime: 43,
    },
  },
  {
    id: "archive",
    name: "archive.service",
    description:
      "Your personal digital sanctuary for thoughts, links, and code. Multi-platform app with intelligent content processing, automated screenshot generation using Puppeteer, NLP-based tagging, full-text search, and cross-platform mobile apps for iOS & Android.",
    tech: [
      "Hono",
      "Bun",
      "MongoDB",
      "Expo",
      "React Native",
      "Puppeteer",
      "Cloudinary",
      "BullMQ",
      "Redis",
    ],
    github: "https://github.com/atharvdange618/ArcHive",
    status: "running",
  },
  {
    id: "minty",
    name: "minty.service",
    description:
      "Smart expense tracking made simple. Privacy-focused Android app that automatically reads and categorizes transaction SMS from 50+ banks and UPI apps. Features advanced analytics with donut charts, spending velocity gauge, and heatmap calendar. 100% offline with local SQLite storage.",
    tech: ["React Native", "TypeScript", "SQLite", "Android"],
    github: "https://github.com/atharvdange618/Minty",
    status: "running",
  },
  {
    id: "recon",
    name: "recon.service",
    description:
      "Tactical bug tracking intelligence system for QA professionals. Features interactive visual timelines with Skia graphics, real-time dashboard, deadline intelligence with smart notifications, comprehensive metadata tracking, and offline-first SQLite architecture. Built for precision and accountability.",
    tech: ["React Native", "Expo", "TypeScript", "SQLite", "Skia"],
    github: "https://github.com/atharvdange618/Recon",
    status: "running",
  },
  {
    id: "xml-sitemap",
    name: "xml-sitemap-generator.service",
    description:
      "Generate comprehensive, SEO-optimized XML sitemaps for any website. Intelligent crawling with hybrid SSR/CSR support using Puppeteer, real-time progress tracking via SSE, robots.txt compliance, and priority-based sitemap generation. Modern web app with beautiful UI.",
    tech: ["Next.js", "TypeScript", "Puppeteer", "SSE"],
    github: "https://github.com/atharvdange618/xml-sitemap-generator",
    status: "running",
  },
];

export const experiences: Experience[] = [
  {
    id: "1",
    hash: "a7f3c21",
    title: "Software Engineer",
    company: "SmartScripts Pvt. Ltd.",
    period: "March 2024 - Present",
    description:
      "Full-stack development with MERN/PERN stack, React Native/Expo mobile apps, production deployment, and client interactions",
    icon: "💼",
  },
  {
    id: "2",
    hash: "94bc8e2",
    title: "Released Reiatsu Framework v1.0",
    company: "Open Source",
    period: "May 2025",
    description:
      "Zero-dependency TypeScript web framework built from Node.js internals",
    icon: "🚀",
  },
  {
    id: "3",
    hash: "6d2a91f",
    title: "Built Telemetry Analytics Platform",
    company: "Personal Project",
    period: "July 2025",
    description:
      "Privacy-first, cookieless analytics with real-time dashboards",
    icon: "📊",
  },
  {
    id: "4",
    hash: "5c1e4d3",
    title: "Launched ArcHive Mobile Apps",
    company: "Personal Project",
    period: "Jun 2025",
    description: "Cross-platform digital sanctuary for Android",
    icon: "📱",
  },
  {
    id: "5",
    hash: "8a4b2c9",
    title: "Built Minty Expense Tracker",
    company: "Personal Project",
    period: "Nov 2025",
    description: "Smart SMS-based expense tracking for Android",
    icon: "💰",
  },
  {
    id: "6",
    hash: "3f8b4a0",
    title: "Campus Placement",
    company: "SmartScripts Pvt. Ltd.",
    period: "Mar 2024",
    description: "Secured first job through campus recruitment",
    icon: "🎯",
  },
  {
    id: "7",
    hash: "2a9c7e1",
    title: "Electronics & Telecommunication Engineering",
    company: "Savitribai Phule Pune University (SPPU)",
    period: "2020 - 2024",
    description: "Bachelor's Degree in Engineering",
    icon: "🎓",
  },
  {
    id: "8",
    hash: "1a2c3d4",
    title: "Started Coding Journey",
    company: "Self-taught",
    period: "Jan 2021",
    description:
      "Hello, World! Learned from YouTube, documentation, and programming books",
    icon: "🌱",
  },
];

export const skills: Skill[] = [
  // Frontend (Primary Expertise)
  {
    name: "react",
    level: "expert",
    category: "frontend",
    experience: "3+ years",
  },
  {
    name: "react-native",
    level: "expert",
    category: "frontend",
    experience: "2+ years",
  },
  {
    name: "expo",
    level: "expert",
    category: "frontend",
    experience: "2+ years",
  },
  {
    name: "nextjs",
    level: "expert",
    category: "frontend",
    experience: "2+ years",
  },
  {
    name: "typescript",
    level: "expert",
    category: "frontend",
    experience: "3+ years",
  },
  {
    name: "tailwindcss",
    level: "expert",
    category: "frontend",
    experience: "3+ years",
  },
  {
    name: "tanstack-query",
    level: "advanced",
    category: "frontend",
    experience: "2+ years",
  },
  {
    name: "zustand",
    level: "advanced",
    category: "frontend",
    experience: "2+ years",
  },
  {
    name: "axios",
    level: "advanced",
    category: "frontend",
    experience: "2+ years",
  },
  // Backend (MERN/PERN Stack)
  {
    name: "nodejs",
    level: "expert",
    category: "backend",
    experience: "3+ years",
  },
  {
    name: "express",
    level: "expert",
    category: "backend",
    experience: "3+ years",
  },
  {
    name: "mongodb",
    level: "expert",
    category: "backend",
    experience: "3+ years",
  },
  {
    name: "mongoose",
    level: "expert",
    category: "backend",
    experience: "3+ years",
  },
  {
    name: "postgresql",
    level: "expert",
    category: "backend",
    experience: "2+ years",
  },
  {
    name: "prisma",
    level: "expert",
    category: "backend",
    experience: "2+ years",
  },
  {
    name: "fastify",
    level: "beginner",
    category: "backend",
    experience: "< 1 year",
  },
  {
    name: "hono",
    level: "beginner",
    category: "backend",
    experience: "< 1 year",
  },
  {
    name: "redis",
    level: "beginner",
    category: "backend",
    experience: "< 1 year",
  },
  {
    name: "bullmq",
    level: "beginner",
    category: "backend",
    experience: "< 1 year",
  },
  // DevOps & Deployment
  {
    name: "hostinger-vps",
    level: "advanced",
    category: "devops",
    experience: "1+ years",
  },
  {
    name: "linux",
    level: "intermediate",
    category: "devops",
    experience: "2+ years",
  },
  // Tools
  {
    name: "git",
    level: "advanced",
    category: "tools",
    experience: "3+ years",
  },
  {
    name: "vscode",
    level: "expert",
    category: "tools",
    experience: "3+ years",
  },
];
