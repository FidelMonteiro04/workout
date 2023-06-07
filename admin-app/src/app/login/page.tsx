"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import Input from "../components/Input";
import Button from "../components/Button";

import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

export default function Home() {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onLogin = (data: any) => console.log(data);

  return (
    <div className="md:flex md:flex-col md:items-center md:justify-center">
      <Image
        src="./logo.svg"
        alt="Workout Logo"
        width={160}
        height={160}
        className="hidden md:block mb-2 h-auto"
      />
      <form
        onSubmit={handleSubmit(onLogin, () => setTimeout(clearErrors, 5000))}
        className="p-4 max-w-[300px] mx-auto flex flex-col items-center gap-4 md:py-2"
      >
        <Input
          registerField={{ ...register("email", { required: true }) }}
          error={errors.email && "Email é obrigatório!"}
          icon={MdAlternateEmail}
          placeholder="Email"
          type="email"
        />
        <Input
          registerField={{ ...register("password", { required: true }) }}
          error={errors.password && "Senha é obrigatória!"}
          icon={FaLock}
          password
          visibility
          forget
          placeholder="Senha"
        />

        <Button text="Entrar" onClick={() => null} />
        <span className="font-light text-secondary-500 text-center">
          Ainda não é nosso parceiro?{" "}
          <Link
            href={"/"}
            className="text-primary-500 cursor-pointer underline transition hover:text-primary-600"
          >
            Clique aqui!
          </Link>
        </span>
      </form>
    </div>
  );
}
