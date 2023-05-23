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
      className={`flex items-center justify-center font-semibold rounded-sm transition hover:bg-primary-400 py-2 ${
        halfWidth ? "w-1/2" : "w-full"
      } ${
        outline
          ? "border-[1px] border-primary-500 text-primary-500"
          : "bg-primary-500 text-white"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon size={20} />}
      {text}
    </button>
  );
};

export default Button;
