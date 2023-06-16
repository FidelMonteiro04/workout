"use client";
import { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import useKeepUser from "@/hooks/useKeepUser";

import { formatPhoneNumber } from "@/utils/formatPhone";

import { cloudinaryURL } from "@/config/cloudinary";
import { registerStore } from "@/services/place/store";

import { ImageContext } from "@/contexts/Image";
import { ModalContext } from "@/contexts/Modal";
import { UserContext } from "@/contexts/User";

import AddImage from "@/app/components/AddImage";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import LocationModal from "@/app/components/modals/Location";
import TextArea from "@/app/components/TextArea";

import { BsBuildings } from "react-icons/bs";
import { BsFillSignpostSplitFill as AddressIcon } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFillTelephoneFill as ContactIcon } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";

const RegisterStore = () => {
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);
  const { image, setImage } = useContext(ImageContext);
  const { modalOpened, setModalOpened } = useContext(ModalContext);

  const router = useRouter();

  useKeepUser(token, () => router.push("/auth/register"), setUser);

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
  } = useForm();

  const imageRef = useRef({} as HTMLImageElement);

  // const handleAddProduct = (product: IProduct) => {
  //   setProducts((prev) => [
  //     { ...product, id: product.id || prev.length + 1 },
  //     ...prev,
  //   ]);
  // };

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

    const formattedData = {
      ...data,
      lat: coordinates.lat.toString(),
      lng: coordinates.lat.toString(),
      contact: data.contact.replace(/\D/g, ""),
      image: url,
    };

    const { storeId } = await registerStore(formattedData, token);

    setUser({ ...user, token, ownId: storeId });
    sessionStorage.setItem(
      "user",
      JSON.stringify({ ...user, token, ownId: storeId })
    );

    router.push("/home/my-store");
  };

  // const handleProductEdit = (product: IProduct) => {
  //   setEditData(product);
  //   setModalOpened("product");
  // };

  // const editProduct = (product: IProduct) => {
  //   setProducts((prev) => prev.map((p) => (p.id !== product.id ? p : product)));
  // };

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
        onClose={() => setModalOpened(null)}
        onFinish={handleAddAddress}
        isOpen={modalOpened === "location"}
      />
      {/* {<ProductModal
        onDelete={(id) =>
          setProducts((prev) => prev.filter((p) => p.id !== id))
        }
        onAdd={handleAddProduct}
        onEdit={editProduct}
        isOpen={modalOpened === "product"}
      />} */}

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
                registerField={{ ...register("name", { required: true }) }}
                error={errors.name && "O nome do local é obrigatório!"}
                placeholder="Nome"
                icon={BsBuildings}
              />
              <TextArea
                registerField={{
                  ...register("description", {
                    required: {
                      value: true,
                      message: "A descrição é obrigatória!",
                    },
                  }),
                }}
                error={errors.description?.message as string}
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
                    pattern: {
                      value:
                        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i,
                      message: "Instagram inválido!",
                    },
                  }),
                }}
                error={errors.instagram && "Instagram inválido!"}
                placeholder="Link do Instagram"
                icon={BsInstagram}
              />
              <Input
                registerField={{ ...register("contact", { required: true }) }}
                error={errors.contact && "O número de contato é obrigatório!"}
                placeholder="Contato"
                onChange={(e) =>
                  formatPhoneNumber(e.target.value, (field, value) =>
                    setValue(field, value)
                  )
                }
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
                onClick={
                  !isSubmitting
                    ? handleSubmit(onSubmit, () =>
                        setTimeout(clearErrors, 5000)
                      )
                    : () => null
                }
                text="Finalizar"
                icon={BsCheck}
                isLoading={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterStore;
