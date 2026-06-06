import Image from "next/image";
import type { Project } from "@/types/project";

export default function ProjectGallery({ project }: { project: Project }) {
  const items = project.gallery;
  if (items.length === 0) return null;

  // Item ímpar depois do primeiro (índice > 0) deve span 2 colunas se estiver sozinho
  const trailingOdd = items.length > 1 && (items.length - 1) % 2 !== 0;

  return (
    <section className="pb-16">
      {/* Label — alinhado ao max-w-7xl do restante da página */}
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

      {/* Grid — mais largo que o conteúdo principal */}
      <div className="mx-auto max-w-350 px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((img, i) => {
            const isPortrait = img.width / img.height < 1;
            const isLastAlone = trailingOdd && i === items.length - 1;
            const spanFull = i === 0 || isLastAlone;

            const ratio =
              i === 0
                ? "16/9"
                : isLastAlone
                  ? "16/9"
                  : isPortrait
                    ? "2/3"
                    : "3/2";

            const sizes = spanFull
              ? "(max-width: 768px) calc(100vw - 2rem), min(1400px, calc(100vw - 4rem))"
              : "(max-width: 768px) calc(100vw - 2rem), min(700px, calc(50vw - 2.5rem))";

            return (
              <div
                key={i}
                data-reveal="card"
                className={`relative overflow-hidden bg-elevated ${spanFull ? "md:col-span-2" : ""}`}
                style={{ aspectRatio: ratio }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={sizes}
                  className="object-cover"
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
