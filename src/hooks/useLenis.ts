"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setLenis, getLenis, clearLenis } from "@/store/lenis";

gsap.registerPlugin(ScrollTrigger);

export function useLenis(): void {
  const pathname = usePathname();

  // Inicializa Lenis e o conecta ao GSAP ticker (uma única vez)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 768;

    if (prefersReducedMotion || isMobile) return;

    const lenis = new Lenis({
      duration: 1.8,
      easing: (t: number) => t < 0.75 ? 1 - Math.pow(1 - t / 0.75, 5) : 1,
      wheelMultiplier: 0.7,
      smoothWheel: true,
      syncTouch: false,
      overscroll: false,
      autoRaf: false,
    });

    setLenis(lenis);

    // Mantém ScrollTrigger sincronizado com a posição real do scroll do Lenis
    lenis.on("scroll", () => ScrollTrigger.update());

    // GSAP ticker drive o loop do Lenis (preparação para ScrollTrigger + scrub)
    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy(); // remove todos os listeners internos do Lenis
      clearLenis();
    };
  }, []);

  // Volta ao topo sem animação em cada troca de rota
  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);
}
