"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function MermaidInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const mermaidElements = document.querySelectorAll<HTMLElement>(".mermaid");
    if (mermaidElements.length === 0) return;

    import("mermaid").then((mermaidModule) => {
      const mermaid = mermaidModule.default;

      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "loose",
        themeVariables: {
          background: "#1a1b26",
          primaryColor: "#24283b",
          lineColor: "#7aa2f7",
          textColor: "#c0caf5",
          nodeBorder: "#bb9af7",
          mainBkg: "#24283b",
        },
      });

      const nodesToRender = Array.from(mermaidElements).filter(
        (el) => !el.hasAttribute("data-processed"),
      );

      if (nodesToRender.length > 0) {
        mermaid
          .run({
            nodes: nodesToRender,
          })
          .catch((err) => {
            console.error("Mermaid client-side rendering error:", err);
          });
      }
    });
  }, [pathname]);

  return null;
}
