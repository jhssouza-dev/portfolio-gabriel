import Link from "next/link";
import type { Project } from "@/types/project";

export default function FeaturedProjects({ projects }: { projects: Project[] }) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects">
      {/* ── DESKTOP: stacked catalog panels ───────────────────── */}
      <div
        data-stacked-catalog
        className="relative hidden h-svh overflow-hidden bg-canvas lg:block"
      >
        {sorted.map((project, i) => (
          <div
            key={project.id}
            data-catalog-panel
            className="absolute inset-0 bg-surface"
            style={{
              zIndex: i + 1,
              transform: i > 0 ? "translateY(100%)" : undefined,
            }}
          >
            {/* Gradient background layer */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(135deg, var(--color-canvas) 0%, var(--color-elevated) 100%)"
                    : "linear-gradient(135deg, var(--color-elevated) 0%, var(--color-surface) 100%)",
              }}
            />

            {/* Accent radial glow */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(176,138,90,0.07) 0%, transparent 65%)",
              }}
            />

            {/* Decorative project number */}
            <div
              className="absolute right-16 top-1/2 -translate-y-1/2 select-none font-display font-black uppercase leading-none tracking-tight text-fg"
              style={{
                fontSize: "clamp(10rem, 22vw, 20rem)",
                opacity: 0.035,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-linear-to-t from-canvas to-transparent" />

            {/* Panel content */}
            <div className="absolute bottom-0 left-0 right-0 px-16 pb-20">
              <p className="mb-4 font-sans text-[0.6rem] font-medium uppercase tracking-[0.2em] text-accent">
                {project.type}&nbsp;·&nbsp;{project.year}
              </p>
              <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] font-black uppercase leading-none tracking-tight text-fg">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="mt-3 max-w-md font-serif text-[clamp(1rem,1.5vw,1.2rem)] italic leading-relaxed text-secondary">
                  {project.subtitle}
                </p>
              )}
              <div className="mt-6 flex items-center gap-8">
                <span className="font-sans text-xs text-muted">
                  {project.location}&nbsp;·&nbsp;{project.area.toLocaleString("pt-BR")}&nbsp;m²
                </span>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex items-center gap-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em] text-secondary transition-colors hover:text-fg"
                >
                  Ver projeto
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MOBILE: plain card list ────────────────────────────── */}
      <div className="px-8 pb-40 lg:hidden md:px-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex items-baseline justify-between border-t border-border pt-8">
            <p className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent">
              Projetos
            </p>
            <p className="font-sans text-[0.65rem] text-muted">
              {projects.length}&nbsp;obras
            </p>
          </div>

          <div>
            {sorted.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group grid grid-cols-1 gap-6 border-b border-border py-9 transition-colors hover:border-border md:grid-cols-[1fr_220px] md:gap-4"
              >
                <div className="flex gap-6">
                  <span className="w-6 shrink-0 pt-0.75 font-sans text-[0.65rem] tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-serif text-xl italic leading-snug text-fg transition-colors group-hover:text-accent md:text-2xl">
                      {project.title}
                    </h2>
                    {project.subtitle !== undefined && (
                      <p className="mt-1 font-sans text-sm leading-relaxed text-secondary">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="ml-12 flex flex-col gap-1.25 md:ml-0 md:items-end">
                  <span className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.12em] text-muted">
                    {project.type}
                  </span>
                  <span className="font-sans text-xs text-secondary">
                    {project.location}
                  </span>
                  <span className="font-sans text-xs text-muted">
                    {project.year}&nbsp;·&nbsp;{project.area}&nbsp;m²
                  </span>
                  {project.status === "Em andamento" && (
                    <span className="mt-1 font-sans text-[0.6rem] font-medium uppercase tracking-[0.12em] text-accent">
                      Em andamento
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
