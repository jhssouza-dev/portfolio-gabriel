import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gabriel Silva — Portfólio",
    short_name: "Gabriel Silva",
    description: "Portfólio de arquitetura com estudos, representações visuais e projetos.",
    icons: [
      { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    theme_color: "#f3efe7",
    background_color: "#f3efe7",
    display: "standalone",
  };
}
