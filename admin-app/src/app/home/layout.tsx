"use client";
import { ModalContextProvider } from "@/contexts/Modal";
import { usePathname, useRouter } from "next/navigation";

import Header from "../components/Header";
import { GiWeightLiftingUp } from "react-icons/gi";
import { MdStoreMallDirectory as StoreIcon } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { UserContextProvider } from "@/contexts/User";
import { useEffect, useState } from "react";

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
  const router = useRouter();
  const [ownType, setOwnType] = useState<"gym" | "store" | null>(null);

  useEffect(() => {
    const currentPlaceType = JSON.parse(sessionStorage.getItem("user") || "{}")[
      "ownType"
    ];

    if (!currentPlaceType) {
      router.push("/auth/register");
    } else {
      setOwnType(currentPlaceType);
    }
  }, [router]);

  return (
    <ModalContextProvider>
      <UserContextProvider>
        <main className="max-w-[800px] h-full min-h-screen rounded-md shadow-lg mx-auto p-4 overflow-y-auto pb-10 md:pb-4 max-h-screen lg:max-h-full md:border-[1px] md:border-zinc-200 md:my-2">
          <div className="-mx-4 -mt-4 mb-6 md:mb-8 transition duration-400 hover:drop-shadow-md border-b-[1px] border-zinc-300 bg-white">
            <Header
              menuOptions={ownType === "gym" ? GymNavRoutes : StoreNavRoutes}
            />
          </div>
          {children}
        </main>
      </UserContextProvider>
    </ModalContextProvider>
  );
}
