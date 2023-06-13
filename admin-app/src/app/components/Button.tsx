"use client";

import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { IconType } from "react-icons";

import Loading from "./Loading";

interface Props {
  icon?: IconType;
  outline?: boolean;
  halfWidth?: boolean;
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
}

const Button = ({
  icon: Icon,
  onClick,
  text,
  halfWidth,
  outline,
  isLoading,
  ...rest
}: Props & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`flex gap-2 items-center justify-center disabled:cursor-default font-bold rounded-sm transition py-2 ${
        halfWidth ? "w-1/2" : "w-full"
      } ${
        outline
          ? "disabled:hover:border-primary-500 disabled:hover:shadow-none border-[1px] border-primary-500 text-primary-500 hover:border-primary-600 hover:text-primary-600 hover:shadow-md"
          : "disabled:bg-primary-600 disabled:hover:bg-primary-600 bg-primary-500 text-white hover:bg-primary-400"
      }`}
      onClick={onClick}
      {...rest}
    >
      {isLoading && (
        <Loading alternative={outline ? "primaryBg" : undefined} size={20} />
      )}
      {!isLoading && Icon && <Icon size={20} />}
      {!isLoading && text}
    </button>
  );
};

export default Button;
