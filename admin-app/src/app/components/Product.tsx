"use client";

import { MdAttachMoney } from "react-icons/md";

interface Props {
  id?: string;
  img: string;
  name: string;
  distributor?: string;
  price: string;
  onClick: () => void;
}

const Product = ({ img, name, price, distributor }: Props) => {
  return (
    <div className="flex flex-col p-2 shrink-0 w-[120px] rounded-md shadow-md cursor-pointer transition hover:shadow-lg">
      <div className="flex w-full items-center justify-center mb-2">
        <img
          src={img}
          alt={`Imagem de ${name}`}
          className="w-auto h-full max-h-[80px]"
        />
      </div>
      <span className="font-semibold text-secondary-500 text-sm mb-1 ">
        {name}
      </span>
      <div className="flex justify-between -mt-1 items-center w-full relative">
        <div className="hover:bg-white z-[5] max-w-[50%] hover:max-w-full w-full text-ellipsis transition-all overflow-x-hidden overflow-hidden">
          <span className="font-semibold text-zinc-600 text-xs  ">
            {distributor}
          </span>
        </div>
        <div className="absolute w-1/2 flex items-center justify-center text-primary-500 right-0">
          <MdAttachMoney size={16} />
          <span className="font-bold text-xs">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
