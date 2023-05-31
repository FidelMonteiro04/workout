"use client";

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
    <div className="flex flex-col p-2 shrink-0 min-w-[120px] rounded-md shadow-md cursor-pointer transition hover:shadow-lg">
      <div className="flex w-full items-center justify-center mb-2">
        <img
          src={img}
          alt={`Imagem de ${name}`}
          className="w-auto h-full max-h-[80px]"
        />
      </div>
      <span className="font-semibold text-secondary-500 text-sm mb-1">
        {name}
      </span>
      <span className="font-semibold text-zinc-600 text-xs">{distributor}</span>
    </div>
  );
};

export default Product;
