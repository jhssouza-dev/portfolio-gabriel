const experiences = [
  {
    number: "01",
    institution: "Prefeitura de Aracaju / SEMFAS",
    role: "Estagiário de Arquitetura e Urbanismo",
    period: "2023 — 2025",
    text: "Desenvolvimento e acompanhamento de reformas em equipamentos públicos, com atuação em levantamentos cadastrais, registros técnicos, visitas de campo, acompanhamento de obras e apoio em projetos executivos.",
    tags: [
      "Levantamentos cadastrais",
      "Reformas",
      "Projetos executivos",
      "Visitas técnicas",
      "Documentação de obra",
      "Laudos de vistoria",
    ],
  },
  {
    number: "02",
    institution: "Escritório Modelo — Estácio",
    role: "Estagiário / Assistente de Projetos",
    period: "2022 — 2023",
    text: "Participação em estudos de reforma, propostas arquitetônicas, reuniões de projeto, apresentações de pesquisa e suporte acadêmico.",
    tags: [
      "Estudos de reforma",
      "Propostas arquitetônicas",
      "Pesquisa",
      "Suporte acadêmico",
      "Reuniões de projeto",
    ],
  },
] as const;

export default function ExperienceSection() {
  return (
    <section id="experiencia" className="mx-auto max-w-6xl px-8 py-16 md:px-16 md:py-24">

      {/* ── Cabeçalho compacto ──────────────────────── */}
      <div className="mb-10 md:mb-12">
        <p
          data-reveal="label"
          className="mb-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-accent md:text-[0.65rem] md:tracking-[0.2em]"
        >
          Experiência
        </p>
        <h2
          data-reveal="title"
          className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-black uppercase leading-none tracking-tight text-fg"
        >
          Prática em arquitetura, obra e documentação.
        </h2>
      </div>

      {/* ── Entradas — 2 colunas no desktop ─────────── */}
      <div className="grid grid-cols-1 divide-y divide-border border-y border-border md:grid-cols-2 md:divide-x md:divide-y-0">
        {experiences.map((exp, i) => (
          <article
            key={exp.number}
            data-reveal="card"
            className={`py-8 md:py-10 ${i === 0 ? "md:pr-10" : "md:pl-10"}`}
          >
            {/* Número + período */}
            <div className="mb-4 flex items-baseline justify-between">
              <span className="font-display text-[clamp(2rem,3vw,2.5rem)] font-black leading-none text-accent opacity-25">
                {exp.number}
              </span>
              <span className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted md:text-[0.6rem] md:tracking-[0.15em]">
                {exp.period}
              </span>
            </div>

            {/* Instituição + cargo */}
            <h3 className="font-display text-[clamp(1.25rem,1.7vw,1.35rem)] font-bold uppercase leading-tight tracking-tight text-fg">
              {exp.institution}
            </h3>
            <p className="mb-4 mt-1 font-serif text-[1.08rem] italic leading-snug text-secondary md:text-[clamp(0.9rem,1.3vw,1.05rem)]">
              {exp.role}
            </p>

            {/* Texto */}
            <p className="font-serif text-body-sm leading-[1.8] text-secondary">
              {exp.text}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-2.5 py-1 font-sans text-[0.62rem] font-medium uppercase tracking-[0.1em] text-muted md:px-2 md:py-0.5 md:text-[0.55rem] md:tracking-[0.12em]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      {/* ── Rodapé editorial — faixa geral da seção ─── */}
      {[
        { label: "Formação",     value: "Arquitetura e Urbanismo — Universidade Tiradentes / Unit · 2021–2026" },
        { label: "Ferramentas",  value: "AutoCAD · Archicad · Revit · SketchUp · D5 Render · V-Ray" },
      ].map(({ label, value }) => (
        <div
          key={label}
          data-reveal="text"
          className="grid grid-cols-[5.5rem_1fr] items-baseline gap-6 border-b border-border py-4 md:grid-cols-[8rem_1fr] md:gap-10 md:py-5"
        >
          <span className="font-sans text-[0.64rem] font-medium uppercase tracking-[0.16em] text-secondary md:text-[0.58rem] md:tracking-[0.2em]">
            {label}
          </span>
          <p className="font-sans text-[0.82rem] leading-relaxed tracking-[0.02em] text-muted md:text-[0.68rem] md:tracking-[0.04em]">
            {value}
          </p>
        </div>
      ))}

    </section>
  );
}
