import "./globals.css";
import { Montserrat } from "next/font/google";
import Image from "next/image";

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
      <body className={`${montserrat.className} min-h-full`}>
        <header className="w-full flex items-center justify-center py-8 lg:hidden">
          <Image src="./logo.svg" alt="Workout Logo" width={160} height={160} />
        </header>
        <section className="w-full grid grid-cols-1 p-4 lg:grid-cols-2 lg:self-center lg:justify-self-center lg:min-h-screen">
          <div className="lg:flex lg:flex-col lg:items-center lg:justify-center ">
            <Image
              src="./partner.svg"
              width={540}
              height={540}
              alt="Seja nosso parceiro!"
              className="hidden h-auto lg:block mb-4"
              priority
            />
            <div className="w-full lg:px-5">
              <h2 className="text-4xl font-bold text-secondary-500  mb-3">
                Seja nosso <span className="text-primary-500">parceiro!</span>
              </h2>
              <p className="font-medium text-gray-500 text-2xl max-w-[320px]">
                Um jeito muito mais fácil de crescer seu negócio!
              </p>
            </div>
          </div>
          {children}
        </section>
      </body>
    </html>
  );
}
