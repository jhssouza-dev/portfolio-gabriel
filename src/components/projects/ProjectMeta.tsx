import type { Project } from "@/types/project";

export default function ProjectMeta({ project }: { project: Project }) {
  return (
    <aside
      data-reveal="text"
      className="grid grid-cols-1 gap-y-0 sm:grid-cols-2 sm:gap-x-8"
    >
      <MetaGroup label="Localização">
        <p className="font-sans text-sm text-secondary">{project.location}</p>
      </MetaGroup>

      <MetaGroup label="Área">
        <p className="font-sans text-sm text-secondary">
          {project.area.toLocaleString("pt-BR")}&nbsp;m²
        </p>
      </MetaGroup>

      <MetaGroup label="Ano">
        <p className="font-sans text-sm text-secondary">{project.year}</p>
      </MetaGroup>

      <MetaGroup label="Status">
        <p className="font-sans text-sm text-secondary">{project.status}</p>
      </MetaGroup>

      {project.architects && project.architects.length > 0 && (
        <MetaGroup label="Arquitetos" fullWidth>
          {project.architects.map((name) => (
            <p key={name} className="font-sans text-sm text-secondary">
              {name}
            </p>
          ))}
        </MetaGroup>
      )}

      {project.services && project.services.length > 0 && (
        <MetaGroup label="Serviços" fullWidth>
          <ul className="space-y-0.5">
            {project.services.map((s) => (
              <li key={s} className="font-sans text-sm text-secondary">
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
              <li key={award} className="font-sans text-sm italic text-accent">
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
      className={`border-t border-border pb-3 pt-3 ${fullWidth ? "sm:col-span-2" : ""}`}
    >
      <p className="mb-1 font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}
