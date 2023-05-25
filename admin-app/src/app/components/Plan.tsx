"use client";

import { MdAttachMoney } from "react-icons/md";

interface Props {
  days: string;
  value: string;
  span?: boolean;
}

const Plan = ({ days, value, span }: Props) => {
  return (
    <div
      className={`flex min-w-[120px] gap-3 rounded-md items-center border-[1px] text-zinc-600 border-zinc-600 shadow-sm px-1 ${
        span && "col-span-2"
      }`}
    >
      <MdAttachMoney size={24} />
      <div className="flex flex-col gap-1 w-full items-center justify-center">
        <span className="font-light">{days} dia(s)</span>
        <span className="font-semibold">R$ {value}</span>
      </div>
    </div>
  );
};

export default Plan;
