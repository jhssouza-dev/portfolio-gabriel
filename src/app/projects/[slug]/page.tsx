import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/data/projects";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectMeta from "@/components/projects/ProjectMeta";
import ProjectGallery from "@/components/projects/ProjectGallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const sorted = [...projects].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <ProjectHero project={project} />

      {/* ── DESCRIÇÃO + META ─────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-8 md:px-16">
        <div className="grid grid-cols-1 gap-8 border-y border-border py-10 md:grid-cols-[1.3fr_1fr] md:gap-12">
          {/* Texto principal */}
          <div>
            <p
              data-reveal="text"
              className="font-serif text-[clamp(1.05rem,1.8vw,1.4rem)] leading-[1.75] text-fg"
            >
              {project.description}
            </p>

            {project.concept && (
              <blockquote
                data-reveal="text"
                className="mt-6 border-l-2 border-accent pl-6"
              >
                <p className="font-serif text-[clamp(1rem,1.5vw,1.2rem)] italic leading-[1.65] text-secondary">
                  &ldquo;{project.concept}&rdquo;
                </p>
              </blockquote>
            )}
          </div>

          {/* Metadados laterais */}
          <ProjectMeta project={project} />
        </div>
      </div>

      {/* ── GALERIA — container próprio mais largo ───────────── */}
      <ProjectGallery project={project} />

      {/* ── NAVEGAÇÃO: ANTERIOR / LISTAGEM / PRÓXIMO ────────── */}
      <div className="mx-auto max-w-6xl px-8 pb-12 md:px-16">
        <div className="grid grid-cols-3 items-start gap-4 border-t border-border pt-8">
          {/* Anterior */}
          <div>
            {prev && (
              <Link href={`/projects/${prev.slug}`} className="group">
                <span className="block font-sans text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                  ← Anterior
                </span>
                <span className="font-serif text-base italic text-secondary transition-colors group-hover:text-fg">
                  {prev.title}
                </span>
              </Link>
            )}
          </div>

          {/* Centro */}
          <div className="flex justify-center">
            <Link href="/#projects" className="group text-center">
              <span className="block font-sans text-[0.6rem] uppercase tracking-[0.15em] text-muted transition-colors group-hover:text-fg">
                Catálogo
              </span>
              <span className="font-serif text-sm italic text-secondary transition-colors group-hover:text-fg">
                Ver catálogo →
              </span>
            </Link>
          </div>

          {/* Próximo */}
          <div className="text-right">
            {next && (
              <Link href={`/projects/${next.slug}`} className="group">
                <span className="block font-sans text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                  Próximo →
                </span>
                <span className="font-serif text-base italic text-secondary transition-colors group-hover:text-fg">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
