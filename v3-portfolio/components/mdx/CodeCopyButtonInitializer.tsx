"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function CodeCopyButtonInitializer() {
  const pathname = usePathname();

  useEffect(() => {
    const codeBlocks = document.querySelectorAll(
      "[data-rehype-pretty-code-figure], .markdown pre",
    );

    let liveRegion = document.getElementById("copy-announcer");
    let createdLiveRegion = false;
    if (!liveRegion) {
      liveRegion = document.createElement("div");
      liveRegion.id = "copy-announcer";
      liveRegion.setAttribute("aria-live", "polite");
      liveRegion.setAttribute("aria-atomic", "true");
      liveRegion.className = "sr-only";
      document.body.appendChild(liveRegion);
      createdLiveRegion = true;
    }

    const createdButtons: HTMLButtonElement[] = [];
    const controller = new AbortController();

    codeBlocks.forEach((block) => {
      const pre = block.tagName === "PRE" ? block : block.querySelector("pre");
      if (!pre) return;

      const container =
        block.tagName === "PRE" ? block.parentElement || block : block;
      if (container.querySelector(".copy-code-button")) return;

      const code = pre.querySelector("code");
      const isAscii =
        pre.getAttribute("data-language") === "ascii" ||
        code?.getAttribute("data-language") === "ascii" ||
        code?.className
          .split(/\s+/)
          .some((cls) => cls === "language-ascii" || cls === "ascii");
      if (isAscii) return;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "copy-code-button";
      button.setAttribute("aria-label", "Copy code to clipboard");

      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="copy-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="check-icon hidden"><path d="M20 6 9 17l-5-5"/></svg>
      `;

      if (container instanceof HTMLElement) {
        if (window.getComputedStyle(container).position === "static") {
          container.style.position = "relative";
        }
        container.appendChild(button);
        createdButtons.push(button);
      }

      button.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        if (!code) return;

        const codeText = code.textContent || code.innerText || "";

        try {
          await navigator.clipboard.writeText(codeText);

          const copyIcon = button.querySelector(".copy-icon");
          const checkIcon = button.querySelector(".check-icon");
          copyIcon?.classList.add("hidden");
          checkIcon?.classList.remove("hidden");
          button.classList.add("copied");

          if (liveRegion) {
            liveRegion.textContent = "Code copied to clipboard";
          }

          setTimeout(() => {
            copyIcon?.classList.remove("hidden");
            checkIcon?.classList.add("hidden");
            button.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Failed to copy code to clipboard: ", err);
        }
      }, { signal: controller.signal });
    });

    return () => {
      controller.abort();
      for (const btn of createdButtons) {
        btn.remove();
      }
      if (createdLiveRegion && liveRegion?.parentElement) {
        liveRegion.remove();
      }
    };
  }, [pathname]);

  return null;
}
