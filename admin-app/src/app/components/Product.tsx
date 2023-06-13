"use client";
import "../../styles/scroll.css";

import Image from "next/image";

import { MdAttachMoney } from "react-icons/md";

interface Props {
  id?: string;
  img: string;
  name: string;
  category: string;
  distributor?: string;
  price: string;
  onClick: () => void;
}

const Product = ({
  id,
  img,
  name,
  price,
  category,
  distributor,
  onClick,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col p-2 shrink-0 w-[120px] rounded-md shadow-md cursor-pointer transition hover:shadow-lg"
    >
      <div className="flex w-full items-center justify-center mb-2">
        <Image
          src={img}
          alt={`Imagem de ${name}`}
          height={80}
          width={80}
          className="w-auto h-full max-h-[80px]"
        />
        {/* <img
          src={img}
          alt={`Imagem de ${name}`}
          className="w-auto h-full max-h-[80px]"
        /> */}
      </div>
      <div className="little-scroll transition-all overflow-hidden hover:max-w-full hover:overflow-x-auto hover:text-clip no-scroll text-ellipsis mb-2 max-w-[100px]">
        <span className=" font-semibold w-full  whitespace-nowrap  hover:max-w-full transition-all text-ellipsis text-secondary-500 text-sm mb-1 ">
          {name}
        </span>
      </div>
      <div className="flex justify-between -mt-1 items-center w-full relative">
        <div className="hover:bg-white z-[5] max-w-[50%] hover:max-w-full w-full text-ellipsis transition-all overflow-x-hidden overflow-hidden">
          <span className="font-semibold text-zinc-600 text-xs whitespace-nowrap ">
            {distributor}
          </span>
        </div>
        <div className="absolute w-1/2 flex items-center justify-center text-primary-500 right-[2px]">
          <MdAttachMoney size={16} className="" />
          <span className="font-bold text-xs">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
