"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(): void {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── label ─────────────────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>('[data-reveal="label"]')
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1.4,
              ease: "sine.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });

      // ── title ─────────────────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>('[data-reveal="title"]')
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1.6,
              ease: "sine.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });

      // ── text ──────────────────────────────────────────────
      gsap.utils
        .toArray<HTMLElement>('[data-reveal="text"]')
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 1.5,
              ease: "sine.out",
              scrollTrigger: { trigger: el, start: "top 88%", once: true },
            }
          );
        });

      // ── card (stagger por container pai) ──────────────────
      const allCards = gsap.utils.toArray<HTMLElement>('[data-reveal="card"]');
      const byParent = new Map<HTMLElement, HTMLElement[]>();
      allCards.forEach((card) => {
        const parent = (card.parentElement ?? document.body) as HTMLElement;
        if (!byParent.has(parent)) byParent.set(parent, []);
        byParent.get(parent)!.push(card);
      });
      byParent.forEach((cards, parent) => {
        gsap.fromTo(
          cards,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.4,
            ease: "sine.out",
            stagger: 0.1,
            scrollTrigger: { trigger: parent, start: "top 85%", once: true },
          }
        );
      });

      // ── line (scaleX 0 → 1, da esquerda) ─────────────────
      gsap.utils
        .toArray<HTMLElement>('[data-reveal="line"]')
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, scaleX: 0, transformOrigin: "left center" },
            {
              opacity: 1,
              scaleX: 1,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }
          );
        });
    });

    return () => ctx.revert();
  }, [pathname]);
}
