import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Fira_Code } from "next/font/google";
import { Footer } from "@/components/Footer";
import { CodeCopyButtonInitializer } from "@/components/mdx/CodeCopyButtonInitializer";
import { MermaidInitializer } from "@/components/mdx/MermaidInitializer";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geist = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tty.atharvdangedev.in"),
  title: {
    default: "Atharv Dange - Full Stack Engineer",
    template: "%s | Atharv Dange",
  },
  description:
    "Full Stack Engineer based in Pune, India. Building production systems end-to-end - from auth protocols and API design to polished user interfaces.",
  keywords: [
    "Atharv Dange",
    "Full Stack Engineer",
    "Software Engineer",
    "Software Development Team Lead",
    "Pune",
    "Next.js Developer",
    "TypeScript Developer",
    "React Native Developer",
    "API Designer",
  ],
  authors: [{ name: "Atharv Dange", url: "https://tty.atharvdangedev.in" }],
  creator: "Atharv Dange",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tty.atharvdangedev.in",
    siteName: "Atharv Dange Portfolio",
    title: "Atharv Dange - Full Stack Engineer",
    description:
      "Full Stack Engineer based in Pune, India. Building production systems end-to-end - from auth protocols and API design to polished user interfaces.",
    images: [
      {
        url: "/og-image.png",
        width: 1914,
        height: 964,
        alt: "Atharv Dange - Full Stack Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv Dange - Full Stack Engineer",
    description:
      "Full Stack Engineer based in Pune, India. Building production systems end-to-end - from auth protocols and API design to polished user interfaces.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="f3a4ea92-8d39-423d-ae69-deb762fd3b13"
        />
        <Script
          async
          defer
          src="https://usetelemetry.hogyoku.cloud/analytics.js"
          data-tenant-id="cmqtvwrh10000fmgp1ckimoal"
          data-api-key="tlv_1_8O_3O7srBQ84NJC76yg9ORbm59V_F1hP3__rdg0xPRM"
        />
      </head>
      <body
        className={`${firaCode.variable} ${geist.variable} antialiased min-h-screen flex flex-col`}
      >
        <CodeCopyButtonInitializer />
        <MermaidInitializer />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:border focus:border-purple focus:text-purple focus:text-sm focus:font-mono focus:rounded"
        >
          Skip to content
        </a>
        <main
          id="main-content"
          className="max-w-5xl w-full mx-auto px-6 py-16 flex-1"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
