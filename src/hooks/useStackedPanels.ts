"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useStackedPanels(): void {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isSmall = window.innerWidth < 1024;

    if (prefersReducedMotion || isSmall) return;

    const catalog = document.querySelector<HTMLElement>("[data-stacked-catalog]");
    if (!catalog || catalog.offsetParent === null) return;

    const panels = Array.from(
      catalog.querySelectorAll<HTMLElement>("[data-catalog-panel]")
    );
    if (panels.length < 2) return;

    const navbarHeight =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--navbar-height")
      ) || 72;

    const ctx = gsap.context(() => {
      const transitionCount = panels.length - 1;

      panels.forEach((panel, index) => {
        gsap.set(panel, { clearProps: "transform" });
        gsap.set(panel, {
          yPercent: index === 0 ? 0 : 100,
          zIndex: index + 1,
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });
      });

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      for (let i = 0; i < transitionCount; i++) {
        const current = panels[i];
        const next = panels[i + 1];

        tl.to(
          current,
          {
            scale: 0.96,
            opacity: 0.55,
            filter: "blur(1.5px)",
            duration: 1,
          },
          i
        );

        tl.to(
          next,
          {
            yPercent: 0,
            duration: 1,
          },
          i
        );
      }

      ScrollTrigger.create({
        trigger: catalog,
        start: `top top+=${navbarHeight}`,
        end: () => `+=${transitionCount * catalog.getBoundingClientRect().height * 1.15}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        animation: tl,
        invalidateOnRefresh: true,
      });
    }, catalog);

    return () => ctx.revert();
  }, [pathname]);
}
