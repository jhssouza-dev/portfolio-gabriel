import Link from "next/link";
import MobileNav from "./MobileNav";

export default function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-canvas px-8 py-5 md:px-16">
      <Link
        href="/"
        className="font-display text-lg font-black uppercase tracking-tight text-fg transition-opacity hover:opacity-60"
      >
        Gabriel Silva<span className="text-accent">.</span>
      </Link>

      {/* Desktop navigation — oculto abaixo de md */}
      <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
        <Link
          href="/#projects"
          className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-secondary transition-colors hover:text-fg"
        >
          Projetos
        </Link>
        <Link
          href="/#about"
          className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-secondary transition-colors hover:text-fg"
        >
          Sobre
        </Link>
        <Link
          href="/#experiencia"
          className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-secondary transition-colors hover:text-fg"
        >
          Experiência
        </Link>
        <Link
          href="/#contact"
          className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-secondary transition-colors hover:text-fg"
        >
          Contato
        </Link>
      </nav>

      {/* Mobile hamburger — Client Component, oculto em md+ */}
      <MobileNav />
    </header>
  );
}
