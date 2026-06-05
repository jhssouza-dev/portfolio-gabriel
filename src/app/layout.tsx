import type { Metadata } from "next";
import {
  Barlow_Condensed,
  Instrument_Serif,
  Inter_Tight,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/layout/ClientProviders";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s — Gabriel Silva",
    default: "Gabriel Silva",
  },
  description:
    "Portfólio de arquitetura com estudos, projetos e representação visual.",
  openGraph: {
    siteName: "Gabriel Silva",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${interTight.variable} ${barlowCondensed.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased">
        <Navbar />
        <ClientProviders>{children}</ClientProviders>
        <Footer />
      </body>
    </html>
  );
}
