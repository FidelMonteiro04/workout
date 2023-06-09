import { createContext, useState } from "react";

interface IImageContext {
  image: string | null;
  setImage: (image: string | null) => void;
}

export const ImageContext = createContext({} as IImageContext);

export const ImageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};
