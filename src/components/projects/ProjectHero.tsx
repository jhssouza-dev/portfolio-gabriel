import type { Project } from "@/types/project";

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative flex h-svh flex-col justify-end bg-surface">
      <div className="absolute inset-0 bg-linear-to-br from-canvas via-elevated to-surface" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 35% 45%, rgba(176,138,90,0.08) 0%, transparent 65%)",
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-linear-to-t from-canvas to-transparent" />

      <div className="relative z-10 px-8 pb-16 md:px-16 md:pb-20">
        <p
          data-reveal="label"
          className="mb-4 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-secondary"
        >
          {project.type}&nbsp;·&nbsp;{project.year}
        </p>
        <h1
          data-reveal="title"
          className="font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-none tracking-tight text-fg"
        >
          {project.title}
        </h1>
        {project.subtitle && (
          <p
            data-reveal="text"
            className="mt-4 max-w-lg font-serif text-[clamp(1rem,1.8vw,1.35rem)] italic leading-relaxed text-secondary"
          >
            {project.subtitle}
          </p>
        )}
        <div data-reveal="line" className="mt-8 h-px w-16 bg-accent" />
      </div>
    </section>
  );
}
