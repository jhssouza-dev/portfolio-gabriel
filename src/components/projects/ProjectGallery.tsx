import Image from "next/image";
import type { Project } from "@/types/project";

export default function ProjectGallery({ project }: { project: Project }) {
  const items = project.gallery;
  if (items.length === 0) return null;

  return (
    <section className="pb-16">
      {/* Label */}
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="mb-8 border-t border-border pt-8">
          <p
            data-reveal="label"
            className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.2em] text-accent"
          >
            Galeria&nbsp;·&nbsp;{items.length}{" "}
            {items.length === 1 ? "imagem" : "imagens"}
          </p>
        </div>
      </div>

      {/* Grid — alinhado com o label */}
      <div className="mx-auto max-w-7xl px-8 md:px-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((img, i) => {
            const naturalRatio = img.width / img.height;
            // Somente a primeira imagem ocupa largura total
            const spanFull = i === 0;

            // Full-width: mínimo 1.6 evita que imagens quadradas/retrato
            // virem containers imensos; máximo 2.6 para panoramas extremos
            // Meia-largura: mínimo 0.75 para retratos, máximo 2.0
            const containerRatio = spanFull
              ? Math.min(Math.max(naturalRatio, 1.6), 2.6)
              : Math.min(Math.max(naturalRatio, 0.75), 2.0);

            // Se o clamp desviou >15% da razão natural → object-contain (sem corte)
            const isClamped =
              Math.abs(naturalRatio - containerRatio) / naturalRatio > 0.15;
            const imgClass = isClamped ? "object-contain" : "object-cover";

            const sizes = spanFull
              ? "(max-width: 768px) calc(100vw - 4rem), min(1280px, calc(100vw - 8rem))"
              : "(max-width: 768px) calc(100vw - 4rem), min(620px, calc(50vw - 3rem))";

            return (
              <div
                key={i}
                data-reveal="card"
                className={`relative overflow-hidden bg-elevated ${spanFull ? "md:col-span-2 md:max-h-[72vh]" : "max-h-[60vh]"}`}
                style={{ aspectRatio: containerRatio }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={sizes}
                  className={imgClass}
                />
                {img.caption && (
                  <p className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-canvas/80 to-transparent px-6 pb-3 pt-8 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                    {img.caption}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
