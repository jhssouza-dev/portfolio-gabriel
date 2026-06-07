"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Projetos", href: "/#projects" },
  { label: "Sobre", href: "/#about" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Contato", href: "/#contact" },
] as const;

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  // Fecha com Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Bloqueia scroll nativo no mobile enquanto o menu está aberto
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Botão hamburger / fechar — apenas mobile */}
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="relative flex h-9 w-9 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
      >
        <span className="sr-only">{isOpen ? "Fechar" : "Menu"}</span>
        {/* Barra superior — vira diagonal ascendente quando aberto */}
        <span
          aria-hidden="true"
          className={`absolute block h-px w-5 bg-fg transition-transform duration-200 ${
            isOpen ? "rotate-45" : "-translate-y-1.5"
          }`}
        />
        {/* Barra inferior — vira diagonal descendente quando aberto */}
        <span
          aria-hidden="true"
          className={`absolute block h-px w-5 bg-fg transition-transform duration-200 ${
            isOpen ? "-rotate-45" : "translate-y-1.5"
          }`}
        />
      </button>

      {/* Painel fullscreen — z-40 para ficar abaixo do header (z-50) */}
      {isOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navegação principal"
          className="fixed inset-0 z-40 flex flex-col bg-canvas"
        >
          {/* Espaçador para não sobrestar a Navbar fixa (py-5 × 2 + conteúdo ≈ 72px) */}
          <div className="h-[72px] shrink-0 border-b border-border" />

          {/* Links de navegação */}
          <nav
            aria-label="Mobile"
            className="flex flex-1 flex-col justify-center overflow-y-auto px-8"
          >
            <ul className="border-t border-border">
              {NAV_LINKS.map(({ label, href }, i) => (
                <li key={href} className="border-b border-border">
                  <Link
                    href={href}
                    onClick={close}
                    className="group flex items-center gap-5 py-6 transition-colors"
                  >
                    <span className="w-5 shrink-0 font-sans text-[0.6rem] tabular-nums text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-[clamp(1.8rem,7vw,2.8rem)] font-black uppercase leading-none tracking-tight text-fg transition-colors group-hover:text-accent">
                      {label}
                    </span>
                    <span className="text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href="/#contact"
              onClick={close}
              className="mt-8 flex items-center justify-between bg-fg px-6 py-4 font-sans text-[0.65rem] font-medium uppercase tracking-[0.22em] text-canvas transition-opacity hover:opacity-75"
            >
              Entrar em contato
              <span className="ml-3">↗</span>
            </Link>
          </nav>

          {/* Rodapé informativo */}
          <div className="px-8 pb-10 pt-6">
            <p className="font-sans text-[0.6rem] text-muted">
              Gabriel Silva · Portfólio de arquitetura
            </p>
          </div>
        </div>
      )}
    </>
  );
}
