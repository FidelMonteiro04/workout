"use client";

import { InputHTMLAttributes, useState } from "react";
import { IconType } from "react-icons";

import { AiOutlineEyeInvisible as InvisibleIcon } from "react-icons/ai";
import { AiOutlineEye as VisibleIcon } from "react-icons/ai";

interface Props {
  icon?: IconType;

  password?: boolean;
  registerField?: any;
  visibility?: boolean;
  error?: string;
  forget?: boolean;
  customStyles?: string;
  containerStyles?: string;
}

const Input = ({
  registerField,
  password,
  visibility,
  error,
  forget,
  icon: Icon,
  customStyles,
  containerStyles,
  ...rest
}: Props & InputHTMLAttributes<HTMLInputElement>) => {
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  return (
    <div className={`w-full max-w-[280px] flex flex-col ${containerStyles}`}>
      <div
        className={`flex transition items-center px-3 py-2 border-[1px]  rounded-sm shadow-md ${
          focus ? "border-primary-500 shadow-lg" : "border-gray-500"
        } ${error ? "border-red-600" : ""} ${customStyles}`}
      >
        {Icon && <Icon size={20} className="mr-2 text-primary-500  " />}
        <input
          {...registerField}
          {...rest}
          type={
            rest.type ? rest.type : password && !visible ? "password" : "text"
          }
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
      {!error && forget && (
        <span className="text-zinc-600 transition hover:text-primary-500 text-xs cursor-pointer mt-1">
          Esqueci a senha
        </span>
      )}
      <small className="text-red-600 text-xs">{error}</small>
    </div>
  );
};

export default Input;
