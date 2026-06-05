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
    // Efeito apenas em telas largas — mobile usa lista normal
    const isSmall = window.innerWidth < 1024;

    if (prefersReducedMotion || isSmall) return;

    const catalog = document.querySelector<HTMLElement>(
      "[data-stacked-catalog]"
    );
    // Sem catálogo na página atual (ex: páginas de projeto)
    if (!catalog || catalog.offsetParent === null) return;

    const panels = gsap.utils.toArray<HTMLElement>(
      "[data-catalog-panel]",
      catalog
    );
    if (panels.length < 2) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return; // último painel não sai

        const next = panels[i + 1];

        // Painel atual recua: escala, desfoca, diminui opacidade
        tl.to(
          panel,
          {
            scale: 0.94,
            opacity: 0.35,
            filter: "blur(2px)",
            ease: "none",
            duration: 1,
          },
          i
        );

        // Próximo painel sobe de baixo para cima
        tl.fromTo(
          next,
          { yPercent: 100 },
          { yPercent: 0, ease: "none", duration: 1 },
          i
        );
      });

      ScrollTrigger.create({
        trigger: catalog,
        start: "top top",
        // Espaço de scroll = (N-1) alturas de viewport
        end: `+=${(panels.length - 1) * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, [pathname]);
}
