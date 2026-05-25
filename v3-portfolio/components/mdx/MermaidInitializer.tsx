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
          background: "#1e1e2e",
          primaryColor: "#f5c2e7",
          lineColor: "#cdd6f4",
          textColor: "#cdd6f4",
          nodeBorder: "#cdd6f4",
          mainBkg: "#1e1e2e",
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
