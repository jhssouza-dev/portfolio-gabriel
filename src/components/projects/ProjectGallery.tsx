import Image from "next/image";
import type { Project } from "@/types/project";

export default function ProjectGallery({ project }: { project: Project }) {
  const items = project.gallery;
  if (items.length === 0) return null;

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
          // First item spans both columns on desktop (wider), others are ~half
          const sizes =
            i === 0
              ? "(max-width: 768px) 100vw, calc(100vw - 128px)"
              : "(max-width: 768px) 100vw, calc(50vw - 80px)";

          return (
            <div
              key={i}
              data-reveal="card"
              className={`relative overflow-hidden bg-elevated ${
                i === 0 ? "md:col-span-2" : ""
              }`}
              style={{ aspectRatio: ratio }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={sizes}
                className="object-cover"
              />
              {/* Caption overlay — only if caption exists */}
              {img.caption && (
                <p className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-canvas/80 to-transparent px-6 pb-3 pt-8 font-sans text-[0.6rem] uppercase tracking-[0.15em] text-muted">
                  {img.caption}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
