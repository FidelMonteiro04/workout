"use client";
import { ModalContextProvider } from "@/contexts/Modal";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ModalContextProvider>{children}</ModalContextProvider>;
}
