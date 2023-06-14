"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/logo.svg";

import { usePathname } from "next/navigation";

import { IconType } from "react-icons";

import { MdStoreMallDirectory } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";

interface Props {
  withMenu?: boolean;
  divisor?: boolean;
  menuOptions?: Array<{ text: string; path: string; icon?: IconType }>;
}

const Header = ({ withMenu = true, divisor = false, menuOptions }: Props) => {
  const pathName = usePathname();

  return (
    <header
      className={`w-full flex justify-between py-4 px-6 ${
        divisor && "border-b-[1px] border-zinc-600 shadow-md"
      }`}
    >
      <Image src={logo} width={140} height={40} alt="Workout logo" />
      {withMenu && (
        <>
          <nav className="hidden md:flex gap-4 items-center">
            {menuOptions?.map((option, index) => (
              <Link
                key={index}
                href={option.path}
                className={`${
                  pathName === option.path
                    ? "text-primary-500 font-semibold"
                    : "hover:text-primary-400"
                } transition`}
              >
                {option.text}
              </Link>
            ))}
            <Link
              href="/home/perfil"
              className={`p-2 rounded-full transition ${
                pathName === "/home/perfil"
                  ? "shadow-md text-primary-500"
                  : "hover:shadow-md hover:text-primary-500"
              }`}
            >
              <AiOutlineUser size={20} />
            </Link>
          </nav>
          <nav
            hidden={!withMenu}
            className="absolute z-20 border-t-[1px] border-zinc-400 md:hidden bottom-0 right-0 left-0 py-2 px-8 drop-shadow-lg bg-white flex justify-between items-center"
          >
            {menuOptions?.map(({ text, path, icon: Icon }, index) => (
              <Link
                key={index}
                className={`flex flex-col gap-1 text-xs items-center justify-center ${
                  pathName === path
                    ? "text-secondary-500 font-semibold"
                    : "text-zinc-500"
                }`}
                href={path}
              >
                {Icon && (
                  <Icon
                    size={20}
                    className={pathName === path ? "text-primary-500" : ""}
                  />
                )}
                {text}
              </Link>
            ))}

            <Link
              href="/home/perfil"
              className="flex flex-col gap-1 text-zinc-500 items-center justify-center"
            >
              <AiOutlineUser size={16} />
              <span className=" text-xs">Perfil</span>
            </Link>
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
