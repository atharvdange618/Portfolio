export interface Experience {
  company: string;
  position: string;
  description: string | string[];
  startDate: string;
  endDate: string;
  tags?: string[];
}

const experiences: Experience[] = [
  {
    company: "Smartscripts Pvt. Ltd.",
    position: "Software Engineer",
    description: [
      "Led frontend architecture for production platforms including Smart Booking System and an in-house CRM, reducing platform load time by 40% and bundle size by 30%.",
      "Designed and implemented Node.js REST APIs for in-house CRM with scalable backend architecture, improving system throughput by 50%.",
      "Implemented performance optimizations using TanStack Query and Zustand for state management across multiple enterprise applications.",
      "Applied SEO best practices and web performance optimization techniques, improving organic search visibility by 25% across multiple platforms.",
      "Mentored junior developers and interns in React Native, Node.js, and Next.js development, facilitating faster onboarding.",
    ],
    startDate: "Mar 2024",
    endDate: "Mar 2026",
    tags: [
      "React Native",
      "Node.js",
      "Express.js",
      "Next.js",
      "React",
      "PostgreSQL",
      "MongoDB",
      "SEO",
    ],
  },
];

export default experiences;
