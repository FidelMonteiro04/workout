"use client";
import { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { RegisterContext } from "../layout";

import { IProduct } from "@/interfaces/Product";

import { generateFileName } from "@/utils/generateFileName";
import { cloudinaryURL } from "@/config/cloudinary";

import AddImage from "@/app/components/AddImage";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import AddButton from "@/app/components/AddButton";
import Product from "@/app/components/Product";
import ProductModal from "@/app/components/modals/Product";
import LocationModal from "@/app/components/modals/Location";

import { BsBuildings } from "react-icons/bs";
import { BsFillSignpostSplitFill as AddressIcon } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFillTelephoneFill as ContactIcon } from "react-icons/bs";
import { HiOutlineLocationMarker as LocationIcon } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";

const RegisterStore = () => {
  const { image, setImage, modalOpened, setModalOpened, setEditData } =
    useContext(RegisterContext);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
    setValue,
    clearErrors,
  } = useForm();

  const imageRef = useRef({} as HTMLImageElement);

  const handleAddProduct = (product: IProduct) => {
    setProducts((prev) => [
      { ...product, id: product.id || prev.length + 1 },
      ...prev,
    ]);
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    // const newFileName = generateFileName(image);

    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string
    );
    formData.append("folder", "workout/stores");

    const response = await fetch(cloudinaryURL, {
      method: "POST",
      body: formData,
    });

    const { url } = await response.json();
  };

  const handleProductEdit = (product: IProduct) => {
    setEditData(product);
    setModalOpened("product");
  };

  const editProduct = (product: IProduct) => {
    setProducts((prev) => prev.map((p) => (p.id !== product.id ? p : product)));
  };

  const handleAddAddress = (
    address: string,
    coordinates: { lat: number; lng: number }
  ) => {
    setCoordinates(coordinates);
    setValue("address", address);
  };

  return (
    <>
      <LocationModal
        onFinish={handleAddAddress}
        isOpen={modalOpened === "location"}
      />
      <ProductModal
        onDelete={(id) =>
          setProducts((prev) => prev.filter((p) => p.id !== id))
        }
        onAdd={handleAddProduct}
        onEdit={editProduct}
        isOpen={modalOpened === "product"}
      />

      <h2 className="text-2xl lg:text-3xl text-secondary-500 max-w-[240px] lg:max-w-full font-semibold mb-6 lg:mb-0">
        Cadastro da Loja
      </h2>
      <div className="flex flex-col mb-4">
        <div className="max-w-[600px] mx-auto w-full h-full flex flex-col items-center">
          <AddImage
            registerField={{ ...register("image", { required: true }) }}
            callback={setImage}
            imageState={image}
            imageRef={imageRef}
            error={errors.image && "É necessário ter uma imagem!"}
            alt="Imagem da academia"
          />
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-3 pt-4">
              <Input
                registerField={{ ...register("placeName", { required: true }) }}
                error={errors.placeName && "O nome do local é obrigatório!"}
                placeholder="Nome"
                icon={BsBuildings}
              />

              <Input
                registerField={{
                  ...register("address", { required: true }),
                }}
                error={errors.address && "O endereço é obrigatório!"}
                placeholder="Endereço"
                readOnly
                icon={AddressIcon}
                onClick={() => setModalOpened("location")}
              />

              <Input
                registerField={{
                  ...register("instagram", {
                    pattern:
                      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i,
                    message: "Instagram inválido!",
                  }),
                }}
                error={errors.instagram && "Instagram inválido!"}
                placeholder="Link do Instagram"
                icon={BsInstagram}
              />
              <Input
                registerField={{ ...register("contact", { required: true }) }}
                error={errors.placeName && "O número de contato é obrigatório!"}
                placeholder="Contato"
                icon={ContactIcon}
                type="tel"
              />
              {/* {<div className="mt-auto">
                <Button
                  text="Localização"
                  icon={LocationIcon}
                  onClick={() => setModalOpened("location")}
                />
              </div>} */}
              <Button
                onClick={handleSubmit(onSubmit, () =>
                  setTimeout(clearErrors, 5000)
                )}
                text="Finalizar"
                icon={BsCheck}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterStore;
