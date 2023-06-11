import { createContext, useState } from "react";

interface IImageContext {
  image: string;
  setImage: (image: string) => void;
}

export const ImageContext = createContext({} as IImageContext);

export const ImageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [image, setImage] = useState<string>("");

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};
