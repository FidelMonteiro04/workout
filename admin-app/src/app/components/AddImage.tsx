"use client";

import { AiOutlinePlus } from "react-icons/ai";

const AddImage = () => {
  return (
    <div className="max-w-[240px] max-h-[240px] h-full">
      <label
        htmlFor="inputFile"
        className="cursor-pointer hover:border-primary-600 hover:text-primary-600 transition min-w-[120px] min-h-[120px] w-full h-full flex flex-col items-center justify-center rounded-md border-[1px] border-primary-500 text-primary-500 p-6 hover:shadow-md hover:-translate-y-2 duration-200"
      >
        <AiOutlinePlus size={32} />
        <span className="font-light group-hover:bg-primary-600 text-lg text-primary-500">
          Imagem
        </span>
      </label>
      <input hidden id="inputFile" type="file" />
    </div>
  );
};

export default AddImage;
