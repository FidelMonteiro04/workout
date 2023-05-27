"use client";
import Header from "../components/Header";
import { createContext, useState } from "react";

export const ImageContext = createContext({});

const ImageCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState<any>(null);

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ImageCtxProvider>
        <section className="flex w-full min-h-full flex-col px-6">
          {children}
        </section>
      </ImageCtxProvider>
    </>
  );
}
