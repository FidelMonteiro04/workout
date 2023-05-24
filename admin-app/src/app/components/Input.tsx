"use client";

import { useState } from "react";
import { IconType } from "react-icons";

import { AiOutlineEyeInvisible as InvisibleIcon } from "react-icons/ai";
import { AiOutlineEye as VisibleIcon } from "react-icons/ai";

interface Props {
  icon?: IconType;
  placeholder: string;
  password?: boolean;
  registerField?: any;
  visibility?: boolean;
  error?: string;
}

const Input = ({
  placeholder,
  registerField,
  password,
  visibility,
  error,
  icon: Icon,
}: Props) => {
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <div className="w-full max-w-[280px] flex flex-col">
      <div
        className={`flex transition items-center px-3 py-2 border-[1px]  rounded-sm shadow-md ${
          focus ? "border-primary-500 shadow-lg" : "border-gray-500"
        } ${error ? "border-red-600" : ""}`}
      >
        {Icon && <Icon size={20} className="mr-2 text-primary-500  " />}
        <input
          {...registerField}
          placeholder={placeholder}
          type={password && !visible ? "password" : "text"}
          className="w-full bg-transparent text-zinc-500 placeholder:text-zinc-400 text-lg outline-transparent font-light"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        {visibility && (
          <div
            onClick={() => setVisible((prev) => !prev)}
            className="text-zinc-600 transition hover:text-primary-500 cursor-pointer"
          >
            {!visible ? <VisibleIcon size={20} /> : <InvisibleIcon size={20} />}
          </div>
        )}
      </div>
      <small className="text-red-600 text-xs">{error}</small>
    </div>
  );
};

export default Input;
