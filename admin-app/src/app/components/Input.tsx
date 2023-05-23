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
}

const Input = ({
  placeholder,
  registerField,
  password,
  visibility,
  icon: Icon,
}: Props) => {
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={`flex transition w-full max-w-[280px] items-center px-3 py-2 border-[1px]  rounded-sm shadow-md ${
        focus ? "border-primary-500 shadow-md" : "border-gray-500"
      }`}
    >
      {Icon && <Icon size={20} className="mr-2 text-primary-500  " />}
      <input
        {...registerField}
        placeholder={placeholder}
        type={password && !visible ? "password" : "text"}
        className="w-full text-zinc-500 placeholder:text-zinc-400 text-lg outline-transparent font-light"
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
  );
};

export default Input;
