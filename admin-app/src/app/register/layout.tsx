"use client";
import Header from "../components/Header";
import { createContext, useState } from "react";

type Modals = "location" | "plan" | null;
interface IRegisterContext {
  image?: any | null;
  setImage: (image: any) => void;
  modalOpened: Modals;
  setModalOpened: (value: Modals) => void;
  editData: any;
  setEditData: (value: any) => void;
}

export const RegisterContext = createContext({} as IRegisterContext);

const RegisterCtxProvider = ({ children }: { children: React.ReactNode }) => {
  const [image, setImage] = useState(null);
  const [modalOpened, setModalOpened] = useState<Modals>(null);
  const [editData, setEditData] = useState<any>(null);

  return (
    <RegisterContext.Provider
      value={{
        image,
        setImage,
        modalOpened,
        setModalOpened,
        editData,
        setEditData,
      }}
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
      <Header withMenu={false} />
      <RegisterCtxProvider>
        <section className="flex w-full min-h-full flex-col px-6">
          {children}
        </section>
      </RegisterCtxProvider>
    </>
  );
}
