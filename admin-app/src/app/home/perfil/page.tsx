"use client";
import "@/styles/animations.css";

import { useContext, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { BiRename } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { BiExit } from "react-icons/bi";

import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import { UserContext } from "@/contexts/User";
import useKeepUser from "@/hooks/useKeepUser";
import { getOwner } from "@/services/owner/getOwner";
import { Owner } from "@/interfaces/Owner";
import { updateOwner } from "@/services/owner/updateOwner";
import { formatCnpj } from "@/utils/formatCnpj";
import Loading from "@/app/components/Loading";

const PerfilPage = () => {
  const [edit, setEdit] = useState(false);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loadingOwner, setLoadingOwner] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {
      name: owner?.name || "",
      email: owner?.email || "",
      cnpj: formatCnpj(owner?.cnpj || "", () => null) || "",
    },
  });
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);

  const buttonsDivRef = useRef({} as HTMLDivElement);

  const router = useRouter();

  useKeepUser(
    token,
    () => router.push("/auth/login"),
    (user) => {
      setUser(user);
      getUser(user.token);
    },
    (token) => getUser(token)
  );

  const getUser = async (token: string) => {
    setLoadingOwner(true);
    try {
      const { owner: resOwner } = await getOwner(token);
      setOwner(resOwner);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOwner(false);
    }
  };

  const handleUpdateUser = async (data: any) => {
    const formattedData = {
      ...data,
      cnpj: data.cnpj.replace(/\D/g, ""),
    };
    await updateOwner(token, formattedData);
    setEdit(false);
  };

  const cancelEditing = () => {
    reset();
    buttonsDivRef.current.classList.remove("slide-in");
    buttonsDivRef.current.classList.add("slide-out");
    setTimeout(() => setEdit(false), 400);
  };

  return (
    <div className="-mt-4">
      <div className="flex w-full justify-between items-center">
        <h3 className="text-2xl text-secondary-500 font-semibold mb-4 text-center">
          Meu Perfil
        </h3>
        {!edit && !loadingOwner && (
          <div className="flex gap-3 md:gap-6 simple-fade">
            <button
              onClick={() => setEdit(true)}
              className="flex border-[1px] border-primary-500 rounded-sm p-1 md:border-none md:p-0 gap-2 font-semibold transition hover:text-primary-400 text-primary-500 items-center justify-center text-sm"
            >
              <AiFillEdit size={20} />
              <span className=" ">Editar</span>
            </button>
            <button
              onClick={() => router.push("/auth/login")}
              className="flex border-[1px] transition hover:text-primary-400 border-primary-500 rounded-sm p-1 md:border-none md:p-0 gap-2 font-semibold text-primary-500 items-center justify-center text-sm"
            >
              <BiExit size={20} />
              <span className="">Sair</span>
            </button>
          </div>
        )}
      </div>
      {loadingOwner ? (
        <div className="flex w-full justify-center">
          <div className="mt-3 flex items-center font-semibold gap-3 text-lg">
            <Loading alternative="whiteBg" size={32} thickness={3} />
            Carregando seus dados...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-center items-center gap-4 mb-4">
          <div className="flex flex-col items-center justify-center">
            <div>
              <label>Nome</label>
              <Input
                registerField={{
                  ...register("name", {
                    required: {
                      value: true,
                      message: "O nome é obrigatório",
                    },
                  }),
                }}
                placeholder="Nome"
                icon={BiRename}
                readOnly={!edit}
                error={errors.name?.message}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>
              <label>Email</label>
              <Input
                registerField={{
                  ...register("email", {
                    required: {
                      value: true,
                      message: "Email é obrigatório",
                    },
                  }),
                }}
                placeholder="Email"
                icon={MdAlternateEmail}
                readOnly={!edit}
                error={errors.email?.message}
                type="email"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div>
              <label>CNPJ</label>
              <Input
                registerField={{
                  ...register("cnpj", {
                    required: {
                      value: true,
                      message: "CNPJ é obrigatório",
                    },
                    maxLength: {
                      message: "CNPJ precisa de 14 dígitos",
                      value: 18,
                    },
                    minLength: {
                      message: "CNPJ precisa de 14 dígitos",
                      value: 18,
                    },
                  }),
                }}
                placeholder="CNPJ"
                icon={HiOutlineDocumentText}
                readOnly={!edit}
                onChange={(e) =>
                  formatCnpj(e.target.value, (field, value) =>
                    setValue(field as "cnpj", value)
                  )
                }
                error={errors.cnpj?.message}
              />
            </div>
          </div>
        </div>
      )}

      {edit && (
        <div
          ref={buttonsDivRef}
          className="slide-in flex w-full justify-center items-center"
        >
          <div className="flex gap-4 w-full max-w-[240px]">
            <Button
              outline
              disabled={isSubmitting}
              text="Cancelar"
              onClick={cancelEditing}
            />
            <Button
              text="Salvar"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              onClick={
                !isSubmitting
                  ? handleSubmit(handleUpdateUser, () =>
                      setTimeout(clearErrors, 5000)
                    )
                  : () => null
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilPage;
