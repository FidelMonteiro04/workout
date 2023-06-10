"use client";
import { ModalContextProvider } from "@/contexts/Modal";
import { usePathname } from "next/navigation";

import Header from "../components/Header";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdStoreMallDirectory as StoreIcon } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";

const GymNavRoutes = [
  {
    text: "Minha academia",
    path: "/home/my-gym",
    icon: GiWeightLiftingUp,
  },
];

const StoreNavRoutes = [
  {
    text: "Minha loja",
    path: "/home/my-store",
    icon: StoreIcon,
  },
  {
    text: "Produtos",
    path: "/home/my-store/products",
    icon: BsBoxSeam,
  },
];

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const currentPath = pathName.split("/");
  return (
    <ModalContextProvider>
      <main className="max-w-[800px] h-full rounded-md shadow-lg mx-auto p-4 overflow-y-auto pb-10 md:pb-4 max-h-screen lg:max-h-full md:border-[1px] md:border-zinc-200 md:my-2">
        <div className="-mx-4 -mt-4 mb-6 md:mb-8 transition duration-400 hover:drop-shadow-md border-b-[1px] border-zinc-300 bg-white">
          <Header
            menuOptions={
              currentPath.includes("my-gym") ? GymNavRoutes : StoreNavRoutes
            }
          />
        </div>
        {children}
      </main>
    </ModalContextProvider>
  );
}
