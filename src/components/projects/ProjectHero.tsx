import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section
      className="bg-canvas pb-8"
      style={{ paddingTop: "calc(var(--navbar-height) + 4rem)" }}
    >
      {/* Cabeçalho editorial — constrangido a max-w-7xl */}
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-secondary transition-colors hover:text-fg md:text-[0.65rem] md:tracking-[0.2em]"
        >
          ← Catálogo de projetos
        </Link>

        <div className="mt-10 border-t border-border pt-10">
          <p
            data-reveal="label"
            className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-accent md:text-[0.65rem] md:tracking-[0.2em]"
          >
            {project.type}&nbsp;·&nbsp;{project.location}&nbsp;·&nbsp;{project.year}
          </p>
          <h1
            data-reveal="title"
            className="mt-6 font-display text-[clamp(3.4rem,9vw,7rem)] font-black uppercase leading-none tracking-tight text-fg"
          >
            {project.title}
          </h1>
          {project.subtitle && (
            <p
              data-reveal="text"
              className="mt-4 max-w-2xl font-serif text-subtitle italic leading-relaxed text-secondary"
            >
              {project.subtitle}
            </p>
          )}
          <div data-reveal="line" className="mt-8 h-px w-16 bg-accent" />
        </div>
      </div>

      {/* Imagem principal — mais larga que o cabeçalho */}
      <div className="mx-auto mt-12 max-w-350 px-4 md:px-8">
        <div className="relative aspect-video overflow-hidden bg-surface">
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            priority
            sizes="(max-width: 768px) calc(100vw - 2rem), min(1400px, calc(100vw - 4rem))"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
