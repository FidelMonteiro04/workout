import { createContext, useState } from "react";

interface IModalContext {
  modalOpened: string | null;
  setModalOpened: (modal: string | null) => void;
  editData: any;
  setEditData: (editData: any) => void;
}

export const ModalContext = createContext({} as IModalContext);

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modalOpened, setModalOpened] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);

  return (
    <ModalContext.Provider
      value={{ modalOpened, setModalOpened, editData, setEditData }}
    >
      {children}
    </ModalContext.Provider>
  );
};
