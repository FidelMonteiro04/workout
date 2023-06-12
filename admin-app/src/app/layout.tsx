"use client";
import "./globals.css";
import { Montserrat } from "next/font/google";
import Script from "next/script";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Workout | Parceiro",
  description:
    "Nossa plataforma para parceiros, cadastre sua academia ou loja e comece de forma fácil e rápida!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} min-h-full`}>{children}</body>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      />
    </html>
  );
}
