"use client";

import { useContext, useState, useRef, ChangeEvent, useEffect } from "react";
import { RegisterContext } from "@/app/register/layout";
import { useForm, Controller } from "react-hook-form";

import { formatPrice } from "@/utils/formatPrice";

import AddImage from "../AddImage";
import Button from "../Button";
import Input from "../Input";

import { AiOutlineTags } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  onAdd: (data: any) => void;
  onEdit: (data: any) => void;
}

const ProductModal = ({ isOpen, onAdd, onEdit }: Props) => {
  const { setModalOpened, editData, setEditData } = useContext(RegisterContext);
  const [image, setImage] = useState<any>(editData?.image || null);
  const imageRef = useRef({} as HTMLImageElement);

  useEffect(() => {
    setImage(editData?.image || null);
  }, [editData?.image]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      type: "",
      distributor: "",
      price: "",
    },
    values: {
      name: editData?.name || "",
      type: editData?.type || "",
      distributor: editData?.distributor || "",
      price: formatPrice(editData?.price || ""),
    },
  });

  const handleClose = () => {
    reset();
    setModalOpened(null);
    setEditData(null);
  };

  console.log("Edit data: ", editData);

  const body = (
    <div className="flex flex-col gap-2 mx-6 items-center justify-center">
      <div className="mb-2 max-w-[120px] max-h-[120]">
        <AddImage
          registerField={{
            ...register("image", { required: !image }),
          }}
          error={errors.image && "A imagem do produto é obrigatória!"}
          noAnimation
          callback={setImage}
          imageState={image}
          imageRef={imageRef}
          alt="Imagem do produto"
        />
      </div>
      <Input
        registerField={{ ...register("name", { required: true }) }}
        error={errors.name && "Nome do produto é obrigatório!"}
        placeholder="Nome"
        icon={AiOutlineTags}
      />
      <Controller
        control={control}
        name="price"
        defaultValue=""
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <Input
            error={error && "Preço do produto é obrigatório!"}
            placeholder="Preço"
            icon={MdAttachMoney}
            value={field.value}
            onChange={(e) => {
              const formattedValue = "R$ " + formatPrice(e.target.value);
              field.onChange(formattedValue);
            }}
          />
        )}
      />
      <Input
        registerField={{ ...register("type", { required: true }) }}
        error={errors.type && "O tipo do produto é obrigatório!"}
        placeholder="Tipo"
        icon={BiCategoryAlt}
      />
      <Input
        registerField={{ ...register("distributor") }}
        placeholder="Distribuidora"
        icon={BsTruck}
      />
      <div className="pt-3 flex w-full">
        <Button
          outline
          text="Salvar"
          icon={BsCheck}
          onClick={handleSubmit(
            (data: any) => {
              console.log(data);
              console.log("Edited Data on finish: ", editData);
              if (!editData) {
                onAdd({ ...data, price: data.price.replace("R$ ", ""), image });
              } else {
                onEdit({
                  ...data,
                  price: data.price.replace("R$ ", ""),
                  image,
                  id: editData.id,
                });
              }
              reset();
              setImage(null);
              handleClose();
            },
            () => setTimeout(clearErrors, 5000)
          )}
        />
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return (
    <Modal
      title={editData ? "Editar Produto" : "Novo produto"}
      body={body}
      handleClose={handleClose}
    />
  );
};

export default ProductModal;
