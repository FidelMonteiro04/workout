import "./globals.css";
import { Montserrat } from "next/font/google";

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
    </html>
  );
}
