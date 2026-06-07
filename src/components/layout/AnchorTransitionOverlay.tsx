"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getLenis } from "@/store/lenis";

const FADE_IN_MS = 220;
const SETTLE_MS = 20;
const FADE_OUT_MS = 400;
// Time after pathname change to wait before measuring + revealing.
// Must be > 1 rAF (≈16ms) so ClientProviders hash-scroll rAF has already fired.
const CROSS_PAGE_SETTLE_MS = 100;

// Scrolls to an absolute Y instantly, preferring Lenis to keep its internal
// state in sync with window.scrollY.
function snapRaw(y: number): void {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(y, { immediate: true });
  } else {
    window.scrollTo({ top: y, behavior: "instant" as ScrollBehavior });
  }
}

// Positions `target` so its top edge lands exactly at navbarHeight + 24px.
// Reads the actual rendered header height instead of relying on a constant,
// so it's correct even if the navbar changes size.
function pinElement(target: HTMLElement): void {
  const navbarHeight =
    document.querySelector("header")?.getBoundingClientRect().height ?? 72;
  const desiredTop = navbarHeight + 24; // 1.5rem gap = 24px
  const currentTop = target.getBoundingClientRect().top;
  const delta = currentTop - desiredTop;
  if (Math.abs(delta) <= 1) return; // already in position
  snapRaw(Math.max(0, window.scrollY + delta));
}

function closeMenuIfOpen(): void {
  document
    .querySelector<HTMLButtonElement>("button[aria-expanded='true']")
    ?.click();
}

export default function AnchorTransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  // true while a cross-page navigation triggered by us is in flight.
  const pendingCrossPageRef = useRef(false);
  // Hash to position after the cross-page navigation settles.
  const pendingHashRef = useRef<string>("");

  // ── Cross-page reveal ─────────────────────────────────────────────────────
  // Fires on every pathname change; only acts when we initiated the navigation.
  // Waits CROSS_PAGE_SETTLE_MS so ClientProviders' hash-scroll rAF has fired,
  // then measures real position with getBoundingClientRect and corrects if needed.
  useEffect(() => {
    if (!pendingCrossPageRef.current) return;

    const ov = overlayRef.current;
    if (!ov) return;

    let innerTimer: ReturnType<typeof setTimeout> | undefined;

    const outerTimer = setTimeout(() => {
      // Verify and correct the final scroll position before revealing.
      const hash = pendingHashRef.current;
      if (hash) {
        const target = document.getElementById(hash);
        if (target) pinElement(target);
      }

      requestAnimationFrame(() => {
        ov.style.transition = `opacity ${FADE_OUT_MS}ms ease`;
        ov.style.opacity = "0";
        innerTimer = setTimeout(() => {
          busyRef.current = false;
          pendingCrossPageRef.current = false;
          pendingHashRef.current = "";
        }, FADE_OUT_MS + 16);
      });
    }, CROSS_PAGE_SETTLE_MS);

    return () => {
      clearTimeout(outerTimer);
      if (innerTimer !== undefined) clearTimeout(innerTimer);
    };
  }, [pathname]);

  // ── Click interceptor ─────────────────────────────────────────────────────
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const overlay = overlayRef.current;
    if (!overlay) return;
    const ov = overlay;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function fadeOut(): void {
      ov.style.transition = `opacity ${FADE_OUT_MS}ms ease`;
      ov.style.opacity = "0";
      timers.push(
        setTimeout(() => {
          busyRef.current = false;
        }, FADE_OUT_MS + 16)
      );
    }

    function coverScreen(): void {
      ov.style.transition = `opacity ${FADE_IN_MS}ms ease-out`;
      ov.style.opacity = "0.92";
    }

    function handleClick(e: MouseEvent) {
      // Respect modifier keys — user wants open-in-new-tab, etc.
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;
      if (busyRef.current) return;

      const anchor = (e.target as Element).closest("a[href]");
      if (!anchor) return;
      if (anchor.getAttribute("target") === "_blank") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href") ?? "";
      if (
        rawHref.startsWith("mailto:") ||
        rawHref.startsWith("tel:") ||
        rawHref.startsWith("blob:")
      )
        return;

      let url: URL;
      try {
        url = new URL(rawHref, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;

      const samePath = url.pathname === window.location.pathname;

      // ── Scroll to top (href="#") ──────────────────────────────
      if (samePath && url.hash === "#") {
        if (window.scrollY === 0) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        closeMenuIfOpen();
        history.pushState(null, "", window.location.pathname);
        busyRef.current = true;
        coverScreen();
        timers.push(
          setTimeout(() => {
            snapRaw(0);
            requestAnimationFrame(() => fadeOut());
          }, FADE_IN_MS + SETTLE_MS)
        );
        return;
      }

      // ── Same-page hash anchor ─────────────────────────────────
      if (samePath && url.hash.length > 1) {
        const hash = url.hash.slice(1);
        const target = document.getElementById(hash);
        if (!target) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        closeMenuIfOpen();
        history.pushState(null, "", url.hash);
        busyRef.current = true;
        coverScreen();
        timers.push(
          setTimeout(() => {
            // pinElement reads the actual rendered position and scrolls to the
            // exact value — no hardcoded offset, no guesswork.
            pinElement(target);
            requestAnimationFrame(() => fadeOut());
          }, FADE_IN_MS + SETTLE_MS)
        );
        return;
      }

      // ── Cross-page navigation ─────────────────────────────────
      if (!samePath) {
        e.preventDefault();
        e.stopImmediatePropagation();
        closeMenuIfOpen();
        busyRef.current = true;
        pendingCrossPageRef.current = true;
        pendingHashRef.current = url.hash.length > 1 ? url.hash.slice(1) : "";
        coverScreen();
        timers.push(
          setTimeout(() => {
            router.push(url.pathname + url.search + url.hash);
          }, FADE_IN_MS + SETTLE_MS)
        );
      }
    }

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      timers.forEach(clearTimeout);
      ov.style.opacity = "0";
      busyRef.current = false;
    };
  }, [router]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--color-canvas, #f3efe7)",
        opacity: 0,
        pointerEvents: "none",
        willChange: "opacity",
      }}
    />
  );
}
