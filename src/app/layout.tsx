import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BEWEAR - Moda e Estilo",
    template: "%s | BEWEAR",
  },
  description: "Sua loja de moda online com as melhores tendências e estilos. Compre roupas, acessórios e muito mais com entrega rápida.",
  keywords: ["moda", "roupas", "acessórios", "e-commerce", "loja online", "compras"],
  authors: [{ name: "BEWEAR" }],
  creator: "BEWEAR",
  publisher: "BEWEAR",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://bewear.com.br",
    siteName: "BEWEAR",
    title: "BEWEAR - Moda e Estilo",
    description: "Sua loja de moda online com as melhores tendências e estilos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BEWEAR - Moda e Estilo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BEWEAR - Moda e Estilo",
    description: "Sua loja de moda online com as melhores tendências e estilos.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          {children}
          <Toaster position="top-center" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

