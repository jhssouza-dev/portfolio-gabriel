import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-dark-border bg-dark">
      <div className="mx-auto max-w-5xl px-8 py-20 md:px-16 md:py-24">
        {/* Nome do escritório */}
        <p className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-none tracking-tight text-dark-fg">
          Ana Lima<span className="text-accent">.</span>
        </p>

        {/* Grid de informações */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-dark-border pt-10 md:grid-cols-3">
          <div>
            <p className="mb-3 font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted">
              Localização
            </p>
            <p className="font-sans text-sm leading-relaxed text-dark-fg/60">
              São Paulo, SP
              <br />
              Brasil
            </p>
          </div>

          <div>
            <p className="mb-3 font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted">
              Contato
            </p>
            <p className="font-sans text-sm text-dark-fg/60">
              contato@analima.arq.br
            </p>
            <p className="mt-1 font-sans text-sm text-dark-fg/60">
              @analima.arq
            </p>
          </div>

          <div className="md:text-right">
            <p className="mb-3 font-sans text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted">
              Navegação
            </p>
            <div className="flex flex-col gap-2 md:items-end">
              <Link
                href="/#projects"
                className="font-sans text-sm text-dark-fg/60 transition-colors hover:text-dark-fg"
              >
                Projetos
              </Link>
              <Link
                href="/#about"
                className="font-sans text-sm text-dark-fg/60 transition-colors hover:text-dark-fg"
              >
                Sobre
              </Link>
              <a
                href="#"
                className="font-sans text-sm text-dark-fg/60 transition-colors hover:text-dark-fg"
              >
                Voltar ao topo
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-10 flex items-center justify-between border-t border-dark-border pt-6">
          <p className="font-sans text-[0.6rem] text-dark-fg/35">
            © 2024 Ana Lima Arquitetura · Todos os direitos reservados
          </p>
          <p className="font-sans text-[0.6rem] text-dark-fg/35">
            São Paulo · Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
