"use client";

import { IconType } from "react-icons";

interface Props {
  icon?: IconType;
  placeholder: string;
  password?: boolean;
  registerField?: any;
}

const Input = ({ placeholder, registerField, password, icon: Icon }: Props) => {
  return (
    <div className="flex w-full max-w-[280px] items-center px-3 py-2 border-[1px] border-gray-500 rounded-sm shadow-md">
      {Icon && <Icon size={20} className="mr-2 text-primary-500  " />}
      <input
        {...registerField}
        placeholder={placeholder}
        type={password ? "password" : "text"}
        className="w-full text-zinc-500 placeholder:text-zinc-400 text-lg outline-none font-light"
      />
    </div>
  );
};

export default Input;
