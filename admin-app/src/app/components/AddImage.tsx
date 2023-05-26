"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import { AiOutlinePlus } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";

interface Props {
  registerField?: any;
  error?: string;
}

const AddImage = ({ registerField, error }: Props) => {
  const [hasImage, setHasImage] = useState(false);
  const imageRef = useRef({} as HTMLImageElement);
  const onAddImage = (event: any) => {
    console.dir(imageRef);
    console.log("arquivo: ");
    console.dir(event.target);
    setHasImage(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (!imageRef.current || !reader.result) return;
      imageRef.current.src = reader.result.toString();
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  return (
    <div
      className={`relative h-full w-full max-h-[240px] group ${
        !hasImage
          ? "max-w-[240px]"
          : "max-w-[300px] lg:max-w-full flex justify-center items-center overflow-hidden rounded-md"
      }`}
    >
      <img
        src=""
        ref={imageRef}
        className="transition group-hover:brightness-50 w-full h-auto"
        hidden={!hasImage}
      />
      {hasImage && (
        <label
          htmlFor="inputFile"
          className="font-semibold cursor-pointer opacity-0 transition absolute left-1/2 flex top-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 gap-1 hover:text-primary-500 text-white text-sm p-2"
        >
          <AiFillEdit size={20} />
          <span>Editar</span>
        </label>
      )}
      {!hasImage && (
        <label
          htmlFor="inputFile"
          className="cursor-pointer hover:border-primary-600 hover:text-primary-600 transition min-w-[120px] min-h-[120px] w-full h-full flex flex-col items-center justify-center rounded-md border-[1px] border-primary-500 text-primary-500 p-6 hover:shadow-md hover:-translate-y-2 duration-200"
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
