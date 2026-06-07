import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-dark-border bg-dark">
      <div className="mx-auto max-w-5xl px-8 py-20 md:px-16 md:py-24">
        {/* Nome */}
        <p className="font-display text-[clamp(3rem,8vw,5.5rem)] font-black uppercase leading-none tracking-tight text-dark-fg">
          Gabriel Silva<span className="text-accent">.</span>
        </p>

        {/* Tagline */}
        <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-dark-fg/50 md:text-sm">
          Disponível para oportunidades, colaborações e conversas sobre arquitetura, projeto e representação visual.
        </p>

        {/* Grid de informações */}
        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-dark-border pt-10 md:grid-cols-3">
          <div>
            <p className="mb-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted md:text-[0.6rem] md:tracking-[0.2em]">
              Localização
            </p>
            <p className="font-sans text-base leading-relaxed text-dark-fg/60 md:text-sm">
              Aracaju, SE
              <br />
              Brasil
            </p>
          </div>

          <div>
            <p className="mb-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted md:text-[0.6rem] md:tracking-[0.2em]">
              Contato
            </p>
            <p className="font-sans text-base text-dark-fg/60 md:text-sm">
              gabrielsilva.arch@gmail.com
            </p>
            <p className="mt-1 font-sans text-base text-dark-fg/60 md:text-sm">
              @gabrielsilva.arq
            </p>
          </div>

          <div className="md:text-right">
            <p className="mb-3 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted md:text-[0.6rem] md:tracking-[0.2em]">
              Navegação
            </p>
            <div className="flex flex-col gap-2 md:items-end">
              <Link
                href="/#projects"
                className="font-sans text-base text-dark-fg/60 transition-colors hover:text-dark-fg md:text-sm"
              >
                Projetos
              </Link>
              <Link
                href="/#about"
                className="font-sans text-base text-dark-fg/60 transition-colors hover:text-dark-fg md:text-sm"
              >
                Sobre
              </Link>
              <Link
                href="/#experiencia"
                className="font-sans text-base text-dark-fg/60 transition-colors hover:text-dark-fg md:text-sm"
              >
                Experiência
              </Link>
              <a
                href="#"
                className="font-sans text-base text-dark-fg/60 transition-colors hover:text-dark-fg md:text-sm"
              >
                Voltar ao topo
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-10 flex items-center justify-between border-t border-dark-border pt-6">
          <p className="font-sans text-[0.72rem] text-dark-fg/35 md:text-[0.6rem]">
            © 2026 Gabriel Silva · Todos os direitos reservados
          </p>
            
        </div>
      </div>
    </footer>
  );
}
