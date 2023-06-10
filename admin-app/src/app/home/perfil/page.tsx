"use client";
import "@/styles/animations.css";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { BiRename } from "react-icons/bi";
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";

import Input from "@/app/components/Input";
import Button from "@/app/components/Button";

const PerfilPage = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [edit, setEdit] = useState(false);
  return (
    <div className="-mt-4">
      <div className="flex w-full justify-between items-center">
        <h3 className="text-2xl text-secondary-500 font-semibold mb-4 text-center">
          Meu Perfil
        </h3>
        {!edit && (
          <button
            onClick={() => setEdit(true)}
            className="flex gap-2 font-semibold text-primary-500 items-center justify-center text-sm"
          >
            <AiFillEdit />
            Editar dados
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-4 mb-4">
        <div className="flex flex-col items-center justify-center">
          <div>
            <label>Nome</label>
            <Input
              registerField={{ ...register("name", { required: true }) }}
              placeholder="Nome"
              icon={BiRename}
              readOnly={!edit}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            <label>Email</label>
            <Input
              registerField={{ ...register("email", { required: true }) }}
              placeholder="Email"
              icon={MdAlternateEmail}
              readOnly={!edit}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="max-w-[260px]">
            <label>Senha</label>
            <Input
              registerField={{ ...register("password", { required: true }) }}
              placeholder="Senha"
              icon={FaLock}
              readOnly={!edit}
              password
              visibility
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            <label>CNPJ</label>
            <Input
              registerField={{ ...register("cnpj", { required: true }) }}
              placeholder="CNPJ"
              icon={HiOutlineDocumentText}
              readOnly={!edit}
            />
          </div>
        </div>
      </div>
      {edit && (
        <div className="slide-in flex w-full justify-center items-center">
          <div className="flex gap-4 w-full max-w-[240px]">
            <Button outline text="Cancelar" onClick={() => setEdit(false)} />
            <Button text="Salvar" onClick={() => null} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilPage;
