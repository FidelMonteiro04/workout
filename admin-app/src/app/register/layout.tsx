"use client";
import { ModalContextProvider } from "@/contexts/Modal";
import Header from "../components/Header";
import { ImageContextProvider } from "@/contexts/Image";
import { UserContextProvider } from "@/contexts/User";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header withMenu={false} />
      <ModalContextProvider>
        <UserContextProvider>
          <ImageContextProvider>
            <section className="flex w-full min-h-full flex-col px-6">
              {children}
            </section>
          </ImageContextProvider>
        </UserContextProvider>
      </ModalContextProvider>
    </>
  );
}
