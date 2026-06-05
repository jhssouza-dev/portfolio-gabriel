import type { Project } from "@/types/project";

export default function ProjectMeta({ project }: { project: Project }) {
  return (
    <aside data-reveal="text" className="space-y-8">
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
        <MetaGroup label="Arquitetos">
          {project.architects.map((name) => (
            <p key={name} className="font-sans text-sm text-secondary">
              {name}
            </p>
          ))}
        </MetaGroup>
      )}

      {project.services && project.services.length > 0 && (
        <MetaGroup label="Serviços">
          <ul className="space-y-1">
            {project.services.map((s) => (
              <li key={s} className="font-sans text-sm text-secondary">
                {s}
              </li>
            ))}
          </ul>
        </MetaGroup>
      )}

      {project.awards && project.awards.length > 0 && (
        <MetaGroup label="Prêmios">
          <ul className="space-y-2">
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
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-border pt-4">
      <p className="mb-2 font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}
