"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatCnpj } from "@/utils/formatCnpj";
import Image from "next/image";
import Link from "next/link";

import Input from "../../components/Input";
import Button from "../../components/Button";
import PropertySelector from "../../components/PropertySelector";

import { BiRename } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { GiWeightLiftingUp as GymIcon } from "react-icons/gi";
import { MdStoreMallDirectory as StoreIcon } from "react-icons/md";

export default function Home() {
  const [propertyType, setPropertyType] = useState("gym");

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm();

  const onRegister = (data: any) => console.log(data);

  return (
    <div className="md:flex md:flex-col md:items-center md:justify-center">
      <Image
        src="../../logo.svg"
        alt="Workout Logo"
        width={160}
        height={160}
        className="hidden md:block h-auto mb-2"
      />
      <form
        onSubmit={handleSubmit(onRegister, () => setTimeout(clearErrors, 5000))}
        className="p-4 max-w-[300px] mx-auto flex flex-col items-center gap-4 md:py-2"
      >
        <Input
          registerField={{ ...register("name", { required: true }) }}
          error={errors.name && "Nome é obrigatório!"}
          icon={BiRename}
          placeholder="Nome"
        />

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
          placeholder="Senha"
        />

        <Input
          registerField={{
            ...register("confirmPassword", { required: true }),
          }}
          error={errors.confirmPassword && "Este campo é obrigatório!"}
          icon={MdPassword}
          password
          placeholder="Confirmar senha"
        />
        <Input
          registerField={{ ...register("cnpj", { required: true }) }}
          error={errors.cnpj && "CNPJ é obrigatório!"}
          onChange={(e) =>
            formatCnpj(e.target.value, (field, value) => setValue(field, value))
          }
          icon={HiOutlineDocumentText}
          placeholder="CNPJ"
        />
        <div className="flex gap-2 justify-between w-full mb-2">
          <PropertySelector
            selected={propertyType === "gym"}
            onClick={() => setPropertyType("gym")}
            icon={GymIcon}
            text="Academia"
          />
          <PropertySelector
            selected={propertyType === "store"}
            onClick={() => setPropertyType("store")}
            icon={StoreIcon}
            text="Loja"
          />
        </div>

        <Button text="Criar conta" onClick={() => null} />
        <span className="font-light text-secondary-500 text-center">
          Já é parceiro?{" "}
          <Link
            href={"/auth/login"}
            className="text-primary-500 cursor-pointer underline transition hover:text-primary-600"
          >
            Clique aqui!
          </Link>
        </span>
      </form>
    </div>
  );
}
