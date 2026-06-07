import type { Project } from "@/types/project";

export default function ProjectMeta({ project }: { project: Project }) {
  return (
    <aside
      data-reveal="text"
      className="grid grid-cols-2 gap-x-5 gap-y-0 md:gap-x-8"
    >
      <MetaGroup label="Localização">
        <p className="font-sans text-[0.92rem] leading-snug text-secondary md:text-sm md:leading-normal">{project.location}</p>
      </MetaGroup>

      <MetaGroup label="Área">
        <p className="font-sans text-[0.92rem] leading-snug text-secondary md:text-sm md:leading-normal">
          {project.area.toLocaleString("pt-BR")}&nbsp;m²
        </p>
      </MetaGroup>

      <MetaGroup label="Ano">
        <p className="font-sans text-[0.92rem] leading-snug text-secondary md:text-sm md:leading-normal">{project.year}</p>
      </MetaGroup>

      <MetaGroup label="Status">
        <p className="font-sans text-[0.92rem] leading-snug text-secondary md:text-sm md:leading-normal">{project.status}</p>
      </MetaGroup>

      {project.architects && project.architects.length > 0 && (
        <MetaGroup label="Arquitetos" fullWidth>
          {project.architects.map((name) => (
            <p key={name} className="font-sans text-[0.92rem] leading-snug text-secondary md:text-sm md:leading-normal">
              {name}
            </p>
          ))}
        </MetaGroup>
      )}

      {project.services && project.services.length > 0 && (
        <MetaGroup label="Serviços" fullWidth>
          <ul className="grid grid-cols-1 gap-x-4 gap-y-0.5 min-[390px]:grid-cols-2 md:block md:space-y-0.5">
            {project.services.map((s) => (
              <li key={s} className="font-sans text-[0.92rem] leading-snug text-secondary md:text-sm md:leading-normal">
                {s}
              </li>
            ))}
          </ul>
        </MetaGroup>
      )}

      {project.awards && project.awards.length > 0 && (
        <MetaGroup label="Prêmios" fullWidth>
          <ul className="space-y-1">
            {project.awards.map((award) => (
              <li key={award} className="font-sans text-[0.92rem] italic leading-snug text-accent md:text-sm md:leading-normal">
                {award}
              </li>
            ))}
          </ul>
        </MetaGroup>
      )}
    </aside>
  );
}

function MetaGroup({
  label,
  children,
  fullWidth,
}: {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={`border-t border-border pb-2.5 pt-2.5 md:pb-3 md:pt-3 ${fullWidth ? "col-span-2" : ""}`}
    >
      <p className="mb-1 font-sans text-[0.58rem] font-medium uppercase tracking-[0.16em] text-muted md:text-[0.6rem] md:tracking-[0.2em]">
        {label}
      </p>
      {children}
    </div>
  );
}
