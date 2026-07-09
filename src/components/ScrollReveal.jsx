"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Reveal-on-scroll: fades/slides in any element with the `reveal` class as it
// enters the viewport (Metis-site-style motion). Handles dynamically added
// nodes (e.g. filtered cards) via a MutationObserver, and re-scans on route
// change. Falls back to visible when IntersectionObserver is unavailable or the
// user prefers reduced motion.
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const observeAll = () =>
      document.querySelectorAll(".reveal:not(.in-view)").forEach((el) => io.observe(el));
    observeAll();

    // Catch nodes added after mount (filtering, client-rendered pages).
    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
