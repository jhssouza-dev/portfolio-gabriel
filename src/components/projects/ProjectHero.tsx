import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section
      className="bg-canvas pb-16"
      style={{ paddingTop: "calc(var(--navbar-height) + 4rem)" }}
    >
      <div className="mx-auto max-w-7xl px-8 md:px-16">

        {/* Back link — visível imediatamente, sem data-reveal */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-secondary transition-colors hover:text-fg"
        >
          ← Catálogo de projetos
        </Link>

        {/* Cabeçalho editorial */}
        <div className="mt-10 border-t border-border pt-10">
          <p
            data-reveal="label"
            className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent"
          >
            {project.type}&nbsp;·&nbsp;{project.location}&nbsp;·&nbsp;{project.year}
          </p>
          <h1
            data-reveal="title"
            className="mt-6 font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-none tracking-tight text-fg"
          >
            {project.title}
          </h1>
          {project.subtitle && (
            <p
              data-reveal="text"
              className="mt-4 max-w-2xl font-serif text-[clamp(1rem,1.8vw,1.35rem)] italic leading-relaxed text-secondary"
            >
              {project.subtitle}
            </p>
          )}
          <div data-reveal="line" className="mt-8 h-px w-16 bg-accent" />
        </div>

        {/* Imagem principal — contida, não full-screen */}
        <div className="relative mt-14 aspect-video overflow-hidden bg-surface">
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            fill
            priority
            sizes="(max-width: 768px) calc(100vw - 4rem), (max-width: 1280px) calc(100vw - 8rem), 1216px"
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}
