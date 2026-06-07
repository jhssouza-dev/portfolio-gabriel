"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/hooks/useLenis";
import { getLenis } from "@/store/lenis";
import AnimationRuntime from "./AnimationRuntime";
import AnchorTransitionOverlay from "./AnchorTransitionOverlay";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis(); // registra seus efeitos primeiro (inclusive o scrollTo(0) no [pathname])

  const pathname = usePathname();

  // Declarado após useLenis() → React o executa DEPOIS do scrollTo(0) do useLenis.
  // Quando a rota inclui um hash (ex: /#projects), restaura o scroll para o alvo
  // que o scrollTo(0) do useLenis teria sobrescrito.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    const lenis = getLenis();
    requestAnimationFrame(() => {
      // Usa o scroll-margin-top definido no CSS para cada seção — mesmo valor
      // que pinElement usa — assim os dois sistemas sempre concordam.
      const scrollMargin = parseFloat(getComputedStyle(el).scrollMarginTop) || 72;
      if (lenis) lenis.scrollTo(el, { offset: -scrollMargin, immediate: true });
      else el.scrollIntoView();
    });
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.add("js-ready");
  }, []);

  return (
    <>
      <AnimationRuntime />
      <AnchorTransitionOverlay />
      {children}
    </>
  );
}
