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
    // Efeito apenas em desktop — mobile usa lista normal
    const isSmall = window.innerWidth < 1024;

    if (prefersReducedMotion || isSmall) return;

    const catalog = document.querySelector<HTMLElement>("[data-stacked-catalog]");
    // Sem catálogo na rota atual (ex: páginas de projeto)
    if (!catalog || catalog.offsetParent === null) return;

    const panels = gsap.utils.toArray<HTMLElement>("[data-catalog-panel]", catalog);
    if (panels.length < 2) return;

    const ctx = gsap.context(() => {
      // ── Estado inicial de todos os painéis (exceto o primeiro) ───────
      // gsap.set() DENTRO do context garante que o GSAP toma ownership
      // do transform antes do timeline — sem conflito com o inline style
      // do JSX. Ao ctx.revert(), o inline style volta a valer.
      panels.forEach((panel, i) => {
        if (i === 0) return;

        gsap.set(panel, { yPercent: 100 });

        const img = panel.querySelector<HTMLElement>("[data-panel-image]");
        if (img) gsap.set(img, { scale: 1.04, opacity: 0.85 });

        const els = [
          panel.querySelector<HTMLElement>("[data-panel-counter]"),
          panel.querySelector<HTMLElement>("[data-panel-kicker]"),
          panel.querySelector<HTMLElement>("[data-panel-title]"),
          panel.querySelector<HTMLElement>("[data-panel-subtitle]"),
          panel.querySelector<HTMLElement>("[data-panel-meta]"),
          panel.querySelector<HTMLElement>("[data-panel-cta]"),
        ].filter((el): el is HTMLElement => el !== null);
        if (els.length > 0) gsap.set(els, { opacity: 0, y: 24 });
      });

      // ── Timeline: to() — estados iniciais já estabelecidos acima ─────
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;

        const next = panels[i + 1];
        const pos = i;

        // 1. Painel atual recua
        tl.to(
          panel,
          { scale: 0.94, opacity: 0.4, filter: "blur(2px)", ease: "none", duration: 1 },
          pos
        );

        // 2. Próximo painel sobe
        tl.to(next, { yPercent: 0, ease: "none", duration: 1 }, pos);

        // 3. Imagem zoom-out
        const img = next.querySelector<HTMLElement>("[data-panel-image]");
        if (img) {
          tl.to(
            img,
            { scale: 1, opacity: 1, ease: "power2.out", duration: 0.6 },
            pos + 0.4
          );
        }

        // 4. Textos em cascata
        const textEls = [
          next.querySelector<HTMLElement>("[data-panel-counter]"),
          next.querySelector<HTMLElement>("[data-panel-kicker]"),
          next.querySelector<HTMLElement>("[data-panel-title]"),
          next.querySelector<HTMLElement>("[data-panel-subtitle]"),
          next.querySelector<HTMLElement>("[data-panel-meta]"),
          next.querySelector<HTMLElement>("[data-panel-cta]"),
        ].filter((el): el is HTMLElement => el !== null);

        if (textEls.length > 0) {
          tl.to(
            textEls,
            { opacity: 1, y: 0, stagger: 0.05, ease: "power2.out", duration: 0.45 },
            pos + 0.52
          );
        }
      });

      // ── ScrollTrigger único para toda a timeline ──────────────────
      ScrollTrigger.create({
        trigger: catalog,
        start: "top top",
        // Espaço de scroll proporcional: (N-1) alturas de viewport
        end: `+=${(panels.length - 1) * window.innerHeight}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        animation: tl,
      });
    });

    return () => ctx.revert();
  }, [pathname]);
}
