import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "1",
    slug: "residencia-aquino",
    title: "Residência Aquino",
    subtitle: "Casa de verão no litoral norte",
    year: 2024,
    location: "Ilhabela, SP",
    area: 420,
    status: "Concluído",
    type: "Residencial",
    description:
      "Inserida entre a mata atlântica e o mar, a Residência Aquino parte do desejo de dissolução entre interior e exterior. Volumes em concreto aparente articulam-se em diferentes cotas de terreno, criando uma sequência de espaços que amadurecem conforme o usuário desce em direção à praia.",
    concept:
      "O projeto nasce do silêncio entre as árvores. Não se impõe à paisagem — pergunta a ela onde pode pousar.",
    coverImage: {
      src: "/projects/residencia-aquino/cover.webp",
      alt: "Vista externa da Residência Aquino ao entardecer",
      width: 1920,
      height: 1080,
    },
    gallery: [
      {
        src: "/projects/residencia-aquino/01.webp",
        alt: "Sala de estar com vista para o mar",
        width: 1600,
        height: 1067,
      },
      {
        src: "/projects/residencia-aquino/02.webp",
        alt: "Detalhe da fachada em concreto aparente",
        width: 1600,
        height: 2400,
      },
    ],
    featured: true,
    order: 1,
    architects: ["Gabriel Silva"],
    services: ["Projeto arquitetônico", "Projeto executivo", "Interiores"],
    awards: [],
    tags: ["concreto aparente", "litoral", "mata atlântica"],
  },
  {
    id: "2",
    slug: "edificio-mineral",
    title: "Edifício Mineral",
    subtitle: "Escritórios corporativos em São Paulo",
    year: 2023,
    location: "Itaim Bibi, São Paulo, SP",
    area: 8400,
    status: "Concluído",
    type: "Comercial",
    description:
      "O Edifício Mineral explora a tensão entre a escala da cidade e a experiência humana. A fachada em pedra natural extraída de Minas Gerais responde à luz ao longo do dia, transformando o edifício num elemento vivo dentro do tecido urbano do Itaim.",
    concept:
      "Pedra que respira. Uma estrutura que não nega o tempo — abraça-o.",
    coverImage: {
      src: "/projects/edificio-mineral/cover.webp",
      alt: "Fachada do Edifício Mineral ao meio-dia",
      width: 1920,
      height: 2560,
    },
    gallery: [
      {
        src: "/projects/edificio-mineral/01.webp",
        alt: "Lobby de entrada em granito e aço escovado",
        width: 1600,
        height: 1067,
      },
      {
        src: "/projects/edificio-mineral/02.webp",
        alt: "Detalhe da composição de pedras na fachada",
        width: 1600,
        height: 1067,
      },
    ],
    featured: true,
    order: 2,
    architects: ["Gabriel Silva"],
    services: [
      "Projeto arquitetônico",
      "Projeto executivo",
      "Coordenação de obras",
    ],
    awards: [],
    tags: ["pedra natural", "corporativo", "fachada"],
  },
  {
    id: "3",
    slug: "casa-suspensa",
    title: "Casa Suspensa",
    subtitle: "Residência unifamiliar sobre pilotis",
    year: 2022,
    location: "Serra Gaúcha, RS",
    area: 280,
    status: "Concluído",
    type: "Residencial",
    description:
      "Suspensa sobre um terreno de acentuada inclinação na serra gaúcha, a Casa Suspensa libera o solo e cria um plano horizontal que flutua sobre a topografia. A madeira de reflorestamento dialoga com o pinheiro nativo da região em volumes simples e de forte presença.",
    concept:
      "A casa não domestica a montanha. Convive com ela.",
    coverImage: {
      src: "/projects/casa-suspensa/cover.webp",
      alt: "Casa Suspensa vista da encosta inferior",
      width: 1920,
      height: 1280,
    },
    gallery: [
      {
        src: "/projects/casa-suspensa/01.webp",
        alt: "Interior com estrutura em madeira aparente",
        width: 1600,
        height: 1067,
      },
    ],
    featured: false,
    order: 3,
    architects: ["Gabriel Silva"],
    services: ["Projeto arquitetônico", "Interiores"],
    awards: [],
    tags: ["madeira", "pilotis", "topografia"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => a.order - b.order);
}
