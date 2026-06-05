import type { Project } from "@/types/project";

export default function ProjectGallery({ project }: { project: Project }) {
  const items = [project.coverImage, ...project.gallery];

  return (
    <section className="mt-24">
      <div className="mb-8 border-t border-border pt-8">
        <p
          data-reveal="label"
          className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent"
        >
          Galeria&nbsp;·&nbsp;{items.length}{" "}
          {items.length === 1 ? "imagem" : "imagens"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((img, i) => {
          const isPortrait = img.width / img.height < 1;
          const ratio = i === 0 ? "16/9" : isPortrait ? "2/3" : "3/2";

          return (
            <div
              key={i}
              data-reveal="card"
              className={`relative overflow-hidden bg-elevated ${
                i === 0 ? "md:col-span-2" : ""
              }`}
              style={{ aspectRatio: ratio }}
            >
              {/* Placeholder — substituir por next/image quando houver fotos reais */}
              <div className="absolute inset-0 flex items-end p-6">
                <p className="font-sans text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                  {img.alt}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
