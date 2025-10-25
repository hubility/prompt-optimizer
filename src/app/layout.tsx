import type { Metadata } from "next";
import { Oxanium, Fira_Code } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const oxanium = Oxanium({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hubility Agents - Plataforma de Gestión de Agentes IA",
  description: "Gestiona y consulta información de tus agentes inteligentes en una plataforma centralizada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${oxanium.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
