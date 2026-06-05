import type { Metadata } from "next";
import { projects } from "@/data/projects";
import FeaturedProjects from "@/components/sections/FeaturedProjects";

export const metadata: Metadata = {
  title: "Ana Lima Arquitetura — Portfólio",
  description:
    "Projetos residenciais, comerciais e institucionais. São Paulo, Brasil.",
};

export default function Home() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex h-svh flex-col justify-end bg-surface">
        {/* Placeholder visual — substituir por next/image quando houver fotos */}
        <div className="absolute inset-0 bg-linear-to-br from-canvas via-elevated to-surface" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 65% 35%, rgba(176,138,90,0.08) 0%, transparent 65%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-linear-to-t from-canvas to-transparent" />

        <div className="relative z-10 px-8 pb-16 md:px-16 md:pb-20">
          <p
            data-reveal="label"
            className="mb-4 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-secondary"
          >
            São Paulo, Brasil · Escritório de Arquitetura
          </p>
          <h1
            data-reveal="title"
            className="font-display text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none tracking-tight text-fg"
          >
            Ana Lima
            <br />
            Arquitetura
          </h1>
          <p
            data-reveal="text"
            className="mt-6 max-w-sm font-serif text-[clamp(1rem,1.8vw,1.35rem)] italic leading-relaxed text-secondary"
          >
            Arquitetura contemporânea com identidade própria.
          </p>
          <div data-reveal="line" className="mt-8 h-px w-16 bg-accent" />
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-8 py-32 md:px-16 md:py-44">
        <p
          data-reveal="label"
          className="mb-10 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent"
        >
          Manifesto
        </p>
        <blockquote
          data-reveal="title"
          className="font-serif text-[clamp(1.5rem,3.5vw,2.8rem)] italic leading-[1.35] text-fg"
        >
          &ldquo;O espaço não se projeta — se descobre.
          <br />O arquiteto é apenas quem ouve com mais atenção
          <br />o que o lugar já quer dizer.&rdquo;
        </blockquote>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section id="about" className="mx-auto max-w-4xl px-8 py-32 md:px-16 md:py-44">
        <p
          data-reveal="label"
          className="mb-10 font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent"
        >
          Sobre o escritório
        </p>
        <p
          data-reveal="text"
          className="font-serif text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.75] text-fg"
        >
          Fundado em São Paulo, o escritório Ana Lima Arquitetura desenvolve
          projetos residenciais, comerciais e institucionais com foco na
          relação entre espaço, materialidade e experiência humana.
        </p>
        <p
          data-reveal="text"
          className="mt-6 font-serif text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.75] text-secondary"
        >
          Acreditamos que a arquitetura começa pela escuta. Cada projeto parte
          da compreensão profunda do lugar, do programa e das pessoas que
          habitarão aquele espaço — antes de qualquer forma ser desenhada.
        </p>
      </section>

      {/* ── PROJETOS ─────────────────────────────────────────── */}
      <FeaturedProjects projects={projects} />

    </main>
  );
}
