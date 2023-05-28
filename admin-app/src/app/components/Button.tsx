"use client";

import { MouseEventHandler } from "react";
import { IconType } from "react-icons";

interface Props {
  icon?: IconType;
  outline?: boolean;
  halfWidth?: boolean;
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ icon: Icon, onClick, text, halfWidth, outline }: Props) => {
  return (
    <button
      className={`flex gap-2 items-center justify-center font-bold rounded-sm transition py-2 ${
        halfWidth ? "w-1/2" : "w-full"
      } ${
        outline
          ? "border-[1px] border-primary-500 text-primary-500 hover:border-primary-600 hover:text-primary-600 hover:shadow-md"
          : "bg-primary-500 text-white hover:bg-primary-400"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      {text}
    </button>
  );
};

export default Button;
