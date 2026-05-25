import type { Metadata } from "next";
import { Geist, Fira_Code } from "next/font/google";
import { Footer } from "@/components/Footer";
import { CodeCopyButtonInitializer } from "@/components/mdx/CodeCopyButtonInitializer";
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
    default: "Atharv Dange - Full Stack Developer",
    template: "%s | Atharv Dange",
  },
  description:
    "Full Stack Developer based in Pune, India. Building production systems end-to-end - from auth protocols and API design to polished user interfaces.",
  keywords: [
    "Atharv Dange",
    "Full Stack Developer",
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
    title: "Atharv Dange - Full Stack Developer",
    description:
      "Full Stack Developer based in Pune, India. Building production systems end-to-end - from auth protocols and API design to polished user interfaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv Dange - Full Stack Developer",
    description:
      "Full Stack Developer based in Pune, India. Building production systems end-to-end - from auth protocols and API design to polished user interfaces.",
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
    <html lang="en">
      <body
        className={`${firaCode.variable} ${geist.variable} antialiased min-h-screen flex flex-col`}
      >
        <CodeCopyButtonInitializer />
        <main className="max-w-5xl w-full mx-auto px-6 py-16 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
