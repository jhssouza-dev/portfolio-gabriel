"use client";

import { useEffect } from "react";
import { useLenis } from "@/hooks/useLenis";
import AnimationRuntime from "./AnimationRuntime";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenis();

  useEffect(() => {
    document.documentElement.classList.add("js-ready");
  }, []);

  return (
    <>
      <AnimationRuntime />
      {children}
    </>
  );
}
