"use client";
import Header from "../components/Header";
import { createContext, useState } from "react";

interface IRegisterContext {
  image?: any | null;
  setImage: (image: any) => void;
  modalIsOpened: boolean;
  setModalIsOpened: (value: boolean) => void;
}

export const RegisterContext = createContext({} as IRegisterContext);

const RegisterCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState(null);
  const [modalIsOpened, setModalIsOpened] = useState(false);

  return (
    <RegisterContext.Provider
      value={{ image, setImage, modalIsOpened, setModalIsOpened }}
    >
      {children}
    </RegisterContext.Provider>
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
      <RegisterCtxProvider>
        <section className="flex w-full min-h-full flex-col px-6">
          {children}
        </section>
      </RegisterCtxProvider>
    </>
  );
}
