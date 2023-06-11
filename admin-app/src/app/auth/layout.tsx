"use client";
import { UserContextProvider } from "@/contexts/User";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContextProvider>
      <header className="w-full flex items-center justify-center py-8 md:hidden">
        <Image
          src="../../logo.svg"
          alt="Workout Logo"
          width={160}
          height={160}
          className="h-auto"
        />
      </header>
      <section className="w-full grid grid-cols-1 p-4 md:grid-cols-2 md:self-center md:justify-self-center md:min-h-screen">
        <div className="md:flex md:flex-col md:items-center md:justify-center ">
          <Image
            src="../../partner.svg"
            width={540}
            height={540}
            alt="Seja nosso parceiro!"
            className="hidden h-auto w-full max-w-[540px] md:block mb-4"
            priority
          />
          <div className="w-full md:px-5">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary-500 mb-1 md:mb-3">
              Seja nosso <span className="text-primary-500">parceiro!</span>
            </h2>
            <p className="font-medium text-gray-500 text-1xl md:text-2xl max-w-[320px]">
              Um jeito muito mais fácil de crescer seu negócio!
            </p>
          </div>
        </div>
        {children}
      </section>
    </UserContextProvider>
  );
}
