import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects">
      {/* ── DESKTOP: stacked catalog panels ───────────────────── */}
      {/*
       *  data-stacked-catalog  → raiz do efeito (useStackedPanels)
       *  data-catalog-panel    → cada painel (alvo do pin + scrub)
       *  data-panel-*          → reservado para animações internas futuras
       *  Sem data-reveal aqui → evita conflito com useGsapReveal
       */}
      <div
        data-stacked-catalog
        className="relative hidden overflow-hidden bg-canvas lg:block"
        style={{ height: "calc(100svh - var(--navbar-height))" }}
      >
        {sorted.map((project, i) => (
          <article
            key={project.slug}
            data-catalog-panel
            className="absolute inset-0 w-full bg-surface"
            style={{ height: "calc(100svh - var(--navbar-height))" }}
          >
            {/* Cover photo */}
            <div data-panel-image className="absolute inset-0">
              <Image
                src={project.coverImage.src}
                alt={project.coverImage.alt}
                fill
                unoptimized
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>

            {/* Subtle scrim */}
            <div className="absolute inset-0 bg-canvas/25" />

            {/* Accent radial glow */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(176,138,90,0.07) 0%, transparent 65%)",
              }}
            />

            {/* Decorative watermark — sem data-panel (decorativo, não anima) */}
            <div
              className="absolute right-16 top-1/2 -translate-y-1/2 select-none font-display font-black uppercase leading-none tracking-tight text-fg"
              style={{ fontSize: "clamp(10rem, 22vw, 20rem)", opacity: 0.035 }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Strong bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-linear-to-t from-canvas to-transparent" />

            {/* Panel counter — data-panel-counter */}
            <div data-panel-counter className="absolute left-16 top-12">
              <span className="font-sans text-[0.55rem] font-medium uppercase tracking-[0.3em] text-muted/60">
                {String(i + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(sorted.length).padStart(2, "0")}
              </span>
            </div>

            {/* Panel content — bottom */}
            <div className="absolute bottom-0 left-0 right-0 px-16 pb-20">
              {/* Category · Location · Year — data-panel-kicker */}
              <div
                data-panel-kicker
                className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-1"
              >
                <span className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.22em] text-accent">
                  {project.type}
                </span>
                <span className="font-sans text-[0.6rem] uppercase tracking-[0.15em] text-secondary">
                  {project.location}
                </span>
                <span className="font-sans text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                  {project.year}
                </span>
              </div>

              {/* Title — data-panel-title */}
              <h2
                data-panel-title
                className="font-display text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-none tracking-tight text-fg"
              >
                {project.title}
              </h2>

              {/* Subtitle — data-panel-subtitle */}
              {project.subtitle && (
                <p
                  data-panel-subtitle
                  className="mt-4 max-w-lg font-serif text-[clamp(1rem,1.5vw,1.2rem)] italic leading-relaxed text-secondary"
                >
                  {project.subtitle}
                </p>
              )}

              {/* Bottom row: meta + CTA */}
              <div className="mt-8 flex items-end gap-10">
                {/* Area + Status juntos — data-panel-meta */}
                <div data-panel-meta className="flex items-end gap-10">
                  <div>
                    <p className="font-sans text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                      Área
                    </p>
                    <p className="mt-0.5 font-sans text-sm font-medium text-fg">
                      {project.area.toLocaleString("pt-BR")}&nbsp;m²
                    </p>
                  </div>
                  <div>
                    <p className="font-sans text-[0.55rem] uppercase tracking-[0.18em] text-muted">
                      Status
                    </p>
                    <p className="mt-0.5 font-sans text-sm font-medium text-fg">
                      {project.status}
                    </p>
                  </div>
                </div>

                <div className="flex-1" />

                {/* CTA — data-panel-cta */}
                <Link
                  href={`/projects/${project.slug}`}
                  data-panel-cta
                  className="group inline-flex items-center gap-3 border border-fg/20 px-5 py-2.5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.22em] text-fg transition-all hover:border-fg hover:bg-fg hover:text-canvas"
                >
                  Ver projeto
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ── MOBILE: editorial card list ───────────────────────── */}
      {/* Mobile não usa stacked panels nem data-panel-* */}
      <div className="px-8 pb-40 lg:hidden md:px-16">
        <div className="mx-auto max-w-5xl">
          {/* Section header */}
          <div className="mb-8 flex items-baseline justify-between border-t border-border pt-8">
            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent">
              Estudos e projetos
            </p>
            <p className="font-sans text-[0.65rem] text-muted">
              {sorted.length}&nbsp;{sorted.length === 1 ? "projeto" : "projetos"}
            </p>
          </div>

          {/* Cards */}
          <div>
            {sorted.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group block border-b border-border py-8"
              >
                {/* Cover image */}
                <div
                  className="relative mb-6 overflow-hidden bg-elevated"
                  style={{ aspectRatio: "3/2" }}
                >
                  <Image
                    src={project.coverImage.src}
                    alt={project.coverImage.alt}
                    fill
                    sizes="(max-width: 768px) calc(100vw - 64px), calc(100vw - 128px)"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Card content */}
                <div className="flex items-start gap-5">
                  <span className="w-5 shrink-0 pt-1 font-sans text-[0.6rem] tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-xl italic leading-snug text-fg transition-colors group-hover:text-accent">
                      {project.title}
                    </h2>
                    {project.subtitle && (
                      <p className="mt-1.5 font-sans text-sm leading-relaxed text-secondary">
                        {project.subtitle}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="font-sans text-[0.6rem] font-medium uppercase tracking-[0.12em] text-muted">
                        {project.type}
                      </span>
                      <span aria-hidden className="font-sans text-xs text-muted/40">
                        ·
                      </span>
                      <span className="font-sans text-xs text-secondary">
                        {project.location}
                      </span>
                      <span aria-hidden className="font-sans text-xs text-muted/40">
                        ·
                      </span>
                      <span className="font-sans text-xs text-muted">
                        {project.year}&nbsp;·&nbsp;{project.area.toLocaleString("pt-BR")}&nbsp;m²
                      </span>
                    </div>
                    {project.status === "Em andamento" && (
                      <span className="mt-2 inline-block font-sans text-[0.6rem] font-medium uppercase tracking-[0.12em] text-accent">
                        Em andamento
                      </span>
                    )}
                    <p className="mt-5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.22em] text-secondary transition-colors group-hover:text-fg">
                      Ver projeto →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
