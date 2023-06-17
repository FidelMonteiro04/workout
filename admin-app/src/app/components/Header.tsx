"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "../../../public/logo.svg";

import { usePathname } from "next/navigation";

import { IconType } from "react-icons";

import { AiOutlineUser } from "react-icons/ai";

interface Props {
  withMenu?: boolean;
  divisor?: boolean;
  menuOptions?: Array<{ text: string; path: string; icon?: IconType }>;
}

const Header = ({ withMenu = true, divisor = false, menuOptions }: Props) => {
  const pathName = usePathname();

  return (
    <>
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
          </>
        )}
      </header>
    </>
  );
};

export default Header;
