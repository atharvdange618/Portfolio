import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Atharv Dange - Portfolio",
    short_name: "Atharv Dange",
    description:
      "Full Stack Developer specializing in TypeScript, React, Next.js, and Node.js",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#00ff00",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
