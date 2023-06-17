"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";

interface Props {
  menuOptions: Array<{ text: string; path: string; icon?: IconType }>;
}

const TabNavigator = ({ menuOptions }: Props) => {
  const pathName = usePathname();

  return (
    <nav className="fixed z-[15] border-t-[1px] border-zinc-400 md:hidden bottom-0 w-full left-0 py-2 px-8 drop-shadow-lg bg-white flex justify-between items-center">
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
        className={`flex flex-col gap-1 text-xs items-center justify-center ${
          pathName === "/home/perfil"
            ? "text-secondary-500 font-semibold"
            : "text-zinc-500"
        }`}
      >
        <AiOutlineUser
          className={pathName === "/home/perfil" ? "text-primary-500" : ""}
          size={16}
        />
        <span className=" text-xs">Perfil</span>
      </Link>
    </nav>
  );
};

export default TabNavigator;
