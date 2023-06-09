"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import Input from "../../components/Input";
import Button from "../../components/Button";
import PropertySelector from "../../components/PropertySelector";

import { formatCnpj } from "@/utils/formatCnpj";

import { BiRename } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { GiWeightLiftingUp as GymIcon } from "react-icons/gi";
import { MdStoreMallDirectory as StoreIcon } from "react-icons/md";
import { signup } from "@/services/auth/signup";
import { UserContext } from "@/contexts/User";

export default function Register() {
  const [propertyType, setPropertyType] = useState<"gym" | "store">("gym");
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm();

  const onRegister = async (data: any) => {
    delete data.confirmPassword;
    const formattedData = {
      ...data,
      cnpj: data.cnpj.replace(/\D/g, ""),
      ownType: propertyType,
    };

    try {
      const { token } = await signup(formattedData);
      setUser({ ownType: propertyType, token });
      router.push(`/register/${propertyType}`);
    } catch (error) {
      console.error(error);
    }
  };

  const passWatch = watch("password");

  useEffect(() => {
    sessionStorage.clear();
  }, []);

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
          registerField={{
            ...register("password", {
              required: {
                value: true,
                message: "A senha é obrigatória!",
              },
              minLength: {
                message: "A senha deve ter pelo menos 8 dígitos",
                value: 8,
              },
            }),
          }}
          error={errors.password && (errors.password.message as string)}
          icon={FaLock}
          password
          visibility
          placeholder="Senha"
        />

        <Input
          registerField={{
            ...register("confirmPassword", {
              required: "Este campo é obrigatório!",
              validate: (value) =>
                value === passWatch || "As senhas devem ser iguais!",
            }),
          }}
          error={
            errors.confirmPassword && (errors.confirmPassword.message as string)
          }
          icon={MdPassword}
          password
          placeholder="Confirme a senha"
        />
        <Input
          registerField={{
            ...register("cnpj", {
              required: {
                value: true,
                message: "O CNPJ é obrigatório!",
              },
              minLength: {
                value: 18,
                message: "O CNPJ deve ter pelo menos 14 dígitos",
              },
              maxLength: {
                value: 18,
                message: "O CNPJ deve ter no máximo 14 dígitos",
              },
            }),
          }}
          error={errors.cnpj && (errors.cnpj.message as string)}
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

        <Button
          text="Criar conta"
          onClick={() => null}
          isLoading={isSubmitting}
        />
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
