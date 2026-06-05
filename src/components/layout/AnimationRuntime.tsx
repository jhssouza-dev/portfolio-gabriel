"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { useStackedPanels } from "@/hooks/useStackedPanels";

gsap.registerPlugin(ScrollTrigger);

export default function AnimationRuntime() {
  const pathname = usePathname();

  useStackedPanels();
  useGsapReveal();

  // Após cada troca de rota, aguarda dois frames para o DOM se estabilizar
  // antes de recalcular as posições do ScrollTrigger
  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }, [pathname]);

  return null;
}
