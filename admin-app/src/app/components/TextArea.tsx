"use client";

import { useState } from "react";
import { BsChatLeftText } from "react-icons/bs";

interface Props {
  registerField?: any;
  error?: string;
}

const TextArea = ({ error, registerField }: Props) => {
  const [focus, setFocus] = useState(false);
  return (
    <div className={`w-full max-w-[280px] flex flex-col`}>
      <div
        className={`flex max-w-[280px] w-full items-center gap-2 transition-all  px-3 py-2 border-[1px] rounded-sm shadow-md  ${
          focus ? "border-primary-500" : "border-gray-500"
        } ${error && "border-red-600"}`}
      >
        <BsChatLeftText size={16} className="text-primary-500" />
        <textarea
          {...registerField}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Descrição"
          className={`resize-none font-light w-full ${
            focus ? "h-[64px]" : "h-[28px]"
          } transition-all text-lg pr-1 outline-transparent text-zinc-600 placeholder:text-zinc-400`}
        />
      </div>
      <small className="text-red-600 text-xs">{error}</small>
    </div>
  );
};

export default TextArea;
