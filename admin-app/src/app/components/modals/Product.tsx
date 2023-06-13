"use client";

import { useContext, useState, useRef, ChangeEvent, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { formatPrice } from "@/utils/formatPrice";

import AddImage from "../AddImage";
import Button from "../Button";
import Input from "../Input";
import Modal from "./Modal";

import { AiOutlineTags } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsTruck } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsChatLeftText } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import TextArea from "../TextArea";

interface Props {
  isOpen: boolean;
  editData?: any;
  onAdd: (data: any) => void;
  onEdit: (data: any) => void;
  onDelete: (id: string, urlImage: string) => void;
  onClose: () => void;
}

const ProductModal = ({
  isOpen,
  onAdd,
  onEdit,
  onDelete,
  onClose,
  editData,
}: Props) => {
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
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      distributor: "",
      price: "",
      description: "",
    },
    values: {
      name: editData?.name || "",
      category: editData?.category || "",
      distributor: editData?.distributor || "",
      price: editData?.price ? formatPrice(editData?.price) : "",
      description: editData?.description || "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleDelete = async () => {
    await onDelete(editData._id, editData.image);
    handleClose();
  };

  const onSubmit = async (data: any) => {
    if (!editData) {
      await onAdd({ ...data, price: data.price.replace("R$ ", ""), image });
    } else {
      await onEdit({
        ...data,
        price: data.price.replace("R$ ", ""),
        image,
        _id: editData._id,
      });
    }
    reset();
    setImage(null);
    handleClose();
  };

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
      <TextArea
        registerField={{ ...register("description", { required: true }) }}
        error={errors.description && "A descrição é obrigatória!"}
      />
      <Input
        registerField={{ ...register("category", { required: true }) }}
        error={errors.category && "O tipo do produto é obrigatório!"}
        placeholder="Tipo"
        icon={BiCategoryAlt}
      />
      <Input
        registerField={{ ...register("distributor") }}
        placeholder="Distribuidora"
        icon={BsTruck}
      />
      <div className="flex gap-2 pt-3 flex w-full">
        {editData && (
          <Button
            text="Excluir"
            disabled={isSubmitting}
            icon={BsFillTrashFill}
            onClick={!isSubmitting ? handleSubmit(handleDelete) : () => null}
          />
        )}
        <Button
          outline
          text="Salvar"
          icon={BsCheck}
          disabled={isSubmitting}
          isLoading={!editData ? isSubmitting : false}
          onClick={
            !isSubmitting
              ? handleSubmit(onSubmit, () => setTimeout(clearErrors, 5000))
              : () => null
          }
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
