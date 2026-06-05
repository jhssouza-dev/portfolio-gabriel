import { getLenis } from "@/store/lenis";

type Options = {
  offset?: number;
  immediate?: boolean;
};

export function scrollToSection(
  target: string | HTMLElement,
  options: Options = {}
): void {
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(target, {
      offset: options.offset ?? 0,
      immediate: options.immediate ?? false,
    });
    return;
  }

  // Fallback nativo para mobile / reduced-motion
  if (typeof window === "undefined") return;
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  el?.scrollIntoView({ behavior: "smooth" });
}
