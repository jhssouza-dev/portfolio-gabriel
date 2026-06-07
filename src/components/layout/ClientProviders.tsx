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
      // offset -96 = --navbar-height (72px) + 1.5rem gap (24px), espelhando scroll-margin-top do CSS
      if (lenis) lenis.scrollTo(el, { offset: -96, immediate: true });
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
