import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atharvdangedev.in"),
  title: "Atharv Dange - Full Stack Developer & Software Engineer",
  description:
    "Portfolio of Atharv Dange (@atharvdange618) - Full Stack Developer specializing in TypeScript, React, Next.js, and Node.js. Creator of Reiatsu framework, Telemetry analytics, and innovative web applications.",
  keywords: [
    "Atharv Dange",
    "Full Stack Developer",
    "Software Engineer",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Web Development",
    "Reiatsu",
    "Telemetry",
    "Portfolio",
    "atharvdange618",
  ],
  authors: [{ name: "Atharv Dange", url: "https://github.com/atharvdange618" }],
  creator: "Atharv Dange",
  publisher: "Atharv Dange",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://atharvdangedev.in",
    title: "Atharv Dange - Full Stack Developer & Software Engineer",
    description:
      "Full Stack Developer specializing in TypeScript, React, Next.js, and Node.js. Building innovative web applications and open-source frameworks.",
    siteName: "Atharv Dange Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Atharv Dange - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv Dange - Full Stack Developer & Software Engineer",
    description:
      "Full Stack Developer specializing in TypeScript, React, Next.js, and Node.js. Building innovative web applications and open-source frameworks.",
    creator: "@atharvdange618",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: "https://atharvdangedev.in",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://atharvdangedev.in" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Atharv Dange",
              url: "https://atharvdangedev.in",
              sameAs: [
                "https://github.com/atharvdange618",
                "https://linkedin.com/in/atharvdange",
              ],
              jobTitle: "Full Stack Developer",
              description:
                "Full Stack Developer specializing in TypeScript, React, Next.js, and Node.js",
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
