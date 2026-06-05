export type ProjectStatus = "Concluído" | "Em andamento" | "Conceito";

export type ProjectType =
  | "Residencial"
  | "Comercial"
  | "Institucional"
  | "Cultural"
  | "Paisagismo"
  | "Reforma"
  | "Interiores"
  | "Urbanismo";

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  year: number;
  location: string;
  area: number;
  status: ProjectStatus;
  type: ProjectType;
  description: string;
  concept?: string;
  coverImage: ProjectImage;
  gallery: ProjectImage[];
  featured: boolean;
  order: number;
  architects?: string[];
  services?: string[];
  awards?: string[];
  tags?: string[];
}
