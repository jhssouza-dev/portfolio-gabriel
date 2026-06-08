import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/data/projects";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import ExperienceSection from "@/components/sections/ExperienceSection";
import HeroVideo from "@/components/hero/HeroVideo";

export const metadata: Metadata = {
  title: "Gabriel Silva — Portfólio",
  description:
    "Portfólio de arquitetura com estudos, representações visuais e projetos.",
};

export default function Home() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative flex h-svh flex-col justify-end bg-canvas">
        {/* Fallback background — visible on mobile / no-WebGL / reduced-motion */}
        <div className="absolute inset-0 bg-linear-to-br from-canvas via-elevated to-surface" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 65% 35%, rgba(176,138,90,0.08) 0%, transparent 65%)",
          }}
        />
        <HeroVideo />
        <div className="absolute inset-0 bg-canvas/20 motion-reduce:bg-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_68%_32%,transparent_0%,rgba(245,240,231,0.35)_40%,rgba(245,240,231,0.7)_100%)]" />

        {/* Bottom gradient — readability layer, always above the canvas */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-linear-to-t from-canvas to-transparent" />

        <div className="relative z-10 px-8 pb-16 md:px-16 md:pb-20">
          <p
            data-reveal="label"
            className="mb-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-secondary md:text-[0.65rem] md:tracking-[0.2em]"
          >
            Portfólio de arquitetura
          </p>
          <h1
            data-reveal="title"
            className="font-display text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-none tracking-tight text-fg"
          >
            Gabriel Silva
          </h1>
          <p
            data-reveal="text"
            className="mt-6 max-w-sm font-serif text-subtitle italic leading-relaxed text-secondary"
          >
            Arquitetura, projeto e representação visual.
          </p>
          <div data-reveal="line" className="mt-8 h-px w-16 bg-accent" />
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-8 py-28 md:px-16 md:py-40">
        <div>
          
            <blockquote
              data-reveal="title"
              className="font-serif text-[clamp(2.25rem,4.5vw,3.8rem)] italic leading-[1.25] text-fg md:leading-[1.3]"
            >
              Projetar também é organizar ideias, usos e possibilidades.
            </blockquote>
            <p
              data-reveal="text"
              className="mt-8 font-serif text-body-xl leading-[1.65] text-secondary md:mt-10 md:leading-[1.75]"
            >
              Cada proposta começa pela leitura do espaço, das necessidades do projeto e da forma como as pessoas vão se relacionar com o ambiente. A partir disso, o desenho, a técnica e a representação ajudam a transformar uma intenção em algo claro e comunicável.
            </p>
          </div>
      </section>

      {/* ── SOBRE ────────────────────────────────────────────── */}
      <section id="about" className="mx-auto max-w-6xl px-8 py-24 md:px-16 md:py-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">

          {/* Coluna de texto */}
          <div>
            <p
              data-reveal="label"
              className="mb-8 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-accent md:mb-10 md:text-[0.65rem] md:tracking-[0.2em]"
            >
              Sobre
            </p>
            <p
              data-reveal="text"
              className="font-serif text-body-xl leading-[1.65] text-fg md:leading-[1.75]"
            >
              Gabriel Silva atua na área de arquitetura com foco em desenvolvimento
              de projeto, representação visual e estudos espaciais. Seu trabalho
              busca unir clareza técnica, sensibilidade estética e uma apresentação
              objetiva das ideias.
            </p>
            <p
              data-reveal="text"
              className="mt-6 font-serif text-body-xl leading-[1.65] text-secondary md:leading-[1.75]"
            >
              Este portfólio reúne estudos, propostas e experimentações que mostram
              diferentes formas de pensar o espaço, organizar soluções e comunicar
              projetos arquitetônicos.
            </p>
          </div>

          {/* Coluna de imagem */}
          <div className="relative h-[58svh] overflow-hidden border border-border lg:h-[68svh]">
            <Image
              src="/about/img-about.webp"
              alt="Gabriel Silva"
              fill
              sizes="(max-width: 1024px) calc(100vw - 4rem), calc(50vw - 6rem)"
              className="object-cover opacity-90  "
            />
            {/* Vinheta editorial — funde bordas ao canvas sem afetar o centro */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 88% 82% at 52% 46%, transparent 12%, rgba(243,239,231,0.82) 100%)",
              }}
            />
          </div>

        </div>
      </section>

      {/* ── EXPERIÊNCIA ──────────────────────────────────────── */}
      <ExperienceSection />

      {/* ── PROJETOS ─────────────────────────────────────────── */}
      <FeaturedProjects projects={projects} />

    </main>
  );
}
