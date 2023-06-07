"use client";

import { MutableRefObject } from "react";
import Image from "next/image";

import { AiOutlinePlus } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

interface Props {
  registerField?: any;
  error?: string;
  proportions?: {
    defaultHeight?: number;
    defaultWidth?: number;
    imageWidth?: number;
    imageHeight?: number;
  };
  noAnimation?: boolean;
  imageRef: MutableRefObject<HTMLImageElement>;
  callback: (newState: any) => void;
  imageState: any;
  alt: string;
}

const AddImage = ({
  registerField,
  error,
  proportions,
  noAnimation,
  imageRef,
  alt,
  callback,
  imageState: image,
}: Props) => {
  const onAddImage = (event: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (!imageRef.current || !reader.result) return;
      callback(reader.result.toString());
      imageRef.current.src = reader.result.toString();
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  console.log("Addimage imageState: ", image);

  return (
    <div
      className={`relative h-full w-full group flex flex-col max-h-[300px] max-w-[300px] lg:max-w-full justify-center items-center ${
        image && "rounded-md overflow-hidden"
      }`}
    >
      <img
        src={image}
        ref={imageRef}
        className="transition group-hover:brightness-50 w-full h-auto"
        hidden={!image}
        alt={alt}
      />
      {image && (
        <label
          htmlFor="inputFile"
          className="font-semibold cursor-pointer opacity-0 transition absolute left-1/2 flex top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 gap-1 hover:text-primary-500 text-white text-sm p-2"
        >
          <AiFillEdit size={20} />
          <span>Editar</span>
        </label>
      )}
      {!image && (
        <label
          htmlFor="inputFile"
          className={`cursor-pointer hover:border-primary-600 hover:text-primary-600 transition max-w-[300px] max-h-[120px] w-full h-full flex flex-col items-center justify-center rounded-md border-[1px] border-primary-500 text-primary-500 p-6 hover:shadow-md duration-200 ${
            !noAnimation && "hover:-translate-y-2"
          }`}
        >
          <AiOutlinePlus size={32} />
          <span className="font-light text-lg text-primary-500">Imagem</span>
        </label>
      )}
      <input
        {...registerField}
        accept=".jpg, .png, .jpeg"
        hidden
        id="inputFile"
        type="file"
        onChange={(event) => onAddImage(event)}
      />
      <small className="text-red-600">{error}</small>
    </div>
  );
};

export default AddImage;
