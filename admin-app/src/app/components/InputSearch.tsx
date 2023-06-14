"use client";
import { InputHTMLAttributes, useState, useRef } from "react";
import { BiSearch } from "react-icons/bi";

interface Props {
  disableSearch: boolean;
  onSearch: (search: string) => void;
}

const InputSearch = ({
  disableSearch,
  onSearch,
  ...rest
}: Props & InputHTMLAttributes<HTMLInputElement>) => {
  const [focus, setFocus] = useState(false);
  const searchRef = useRef({} as HTMLInputElement);

  return (
    <div
      className={`flex gap-2 px-2 transition border-[1px] ${
        focus ? "border-zinc-600" : "border-transparent hover:border-zinc-400"
      }  items-center py-3 rounded-lg bg-zinc-100 text-zinc-400`}
    >
      <input
        {...rest}
        placeholder="Pesquise por produtos..."
        className="outline-none bg-transparent placeholder:text-zinc-400 text-zinc-600"
        onFocus={() => setFocus(true)}
        ref={searchRef}
        onBlur={() => setFocus(false)}
        onKeyUp={
          !disableSearch
            ? (event) => {
                if (event.key === "Enter")
                  (() => onSearch(searchRef.current.value))();
              }
            : () => null
        }
      />
      <BiSearch
        size={20}
        className="cursor-pointer"
        onClick={() => onSearch(searchRef.current.value)}
      />
    </div>
  );
};

export default InputSearch;
