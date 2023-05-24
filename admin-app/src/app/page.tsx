"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";

import Input from "./components/Input";
import Button from "./components/Button";

import { BiRename } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { GiWeightLiftingUp as GymIcon } from "react-icons/gi";
import { MdStoreMallDirectory as StoreIcon } from "react-icons/md";
import PropertySelector from "./components/PropertySelector";

export default function Home() {
  const [propertyType, setPropertyType] = useState("gym");
  const [pageOption, setPageOption] = useState<"register" | "login">(
    "register"
  );

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onRegister = (data: any) => console.log(data);
  const onLogin = (data: any) => console.log(data);

  return (
    <>
      <header className="w-full flex items-center justify-center py-8 lg:hidden">
        <Image src="./logo.svg" alt="Workout Logo" width={160} height={160} />
      </header>
      <section className="w-full grid grid-cols-1 p-4 lg:grid-cols-2 lg:self-center lg:justify-self-center lg:min-h-screen">
        <div className="lg:flex lg:flex-col lg:items-center lg:justify-center ">
          <Image
            src="./partner.svg"
            width={540}
            height={540}
            alt="Seja nosso parceiro!"
            className="hidden lg:block mb-4"
          />
          <div className="w-full lg:px-5">
            <h2 className="text-4xl font-bold text-secondary-500  mb-3">
              Seja nosso <span className="text-primary-500">parceiro!</span>
            </h2>
            <p className="font-medium text-gray-500 text-2xl max-w-[300px]">
              {pageOption === "register"
                ? "Cadastre sua loja ou academia"
                : "Coloque seus dados para acessar sua conta"}
            </p>
          </div>
        </div>
        <div className="lg:flex lg:flex-col lg:items-center lg:justify-center">
          <Image
            src="./logo.svg"
            alt="Workout Logo"
            width={160}
            height={160}
            className="hidden lg:block mb-2"
          />
          <form
            onSubmit={handleSubmit(
              pageOption === "register" ? onRegister : onLogin,
              () => setTimeout(clearErrors, 5000)
            )}
            className="p-4 max-w-[300px] mx-auto flex flex-col items-center gap-4 lg:py-2"
          >
            {pageOption === "register" && (
              <Input
                registerField={{ ...register("name", { required: true }) }}
                error={errors.name && "Nome é obrigatório!"}
                icon={BiRename}
                placeholder="Nome"
              />
            )}
            <Input
              registerField={{ ...register("email", { required: true }) }}
              error={errors.email && "Email é obrigatório!"}
              icon={MdAlternateEmail}
              placeholder="Email"
            />
            <Input
              registerField={{ ...register("password", { required: true }) }}
              error={errors.password && "Senha é obrigatória!"}
              icon={FaLock}
              password
              visibility
              forget={pageOption === "login"}
              placeholder="Senha"
            />
            {pageOption === "register" && (
              <>
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
              </>
            )}

            <Button
              text={pageOption === "register" ? "Criar conta" : "Entrar"}
              onClick={() => null}
            />
            <span className="font-light text-secondary-500">
              {pageOption === "register"
                ? "Já é parceiro?"
                : "Ainda não é parceiro?"}{" "}
              <span
                onClick={() =>
                  setPageOption((prev) =>
                    prev === "register" ? "login" : "register"
                  )
                }
                className="text-primary-500 cursor-pointer underline transition hover:text-primary-600"
              >
                Clique aqui!
              </span>
            </span>
          </form>
        </div>
      </section>
    </>
  );
}
