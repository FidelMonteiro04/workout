"use client";
import { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useKeepUser from "@/hooks/useKeepUser";

import { formatPhoneNumber } from "@/utils/formatPhone";

import { cloudinaryURL } from "@/config/cloudinary";
import { ImageContext } from "@/contexts/Image";
import { ModalContext } from "@/contexts/Modal";

import AddImage from "@/app/components/AddImage";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

import LocationModal from "@/app/components/modals/Location";

import { BsBuildings } from "react-icons/bs";
import { BsFillSignpostSplitFill as AddressIcon } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFillTelephoneFill as ContactIcon } from "react-icons/bs";
import { UserContext } from "@/contexts/User";
import { getStore } from "@/services/place/store/getStore";
import { Store } from "@/interfaces/Store";
import { updateStore } from "@/services/place/updateStore";
import { deleteImage } from "@/services/deleteImage";
import Loading from "@/app/components/Loading";
import TextArea from "@/app/components/TextArea";

const EditStore = () => {
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);
  const { image, setImage } = useContext(ImageContext);
  const { modalOpened, setModalOpened } = useContext(ModalContext);

  const router = useRouter();

  useKeepUser(
    token,
    () => router.push("/auth/login"),
    (user) => {
      handleGetStore(user.token);
      setUser(user);
    },
    (token) => handleGetStore(token)
  );

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [store, setStore] = useState<Store | null>(null);
  const [storeLoading, setStoreLoading] = useState(true);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
  } = useForm({
    values: {
      name: store?.name || "",
      description: store?.description || "",
      instagram: store?.instagram || "",
      contact: formatPhoneNumber(store?.contact || "", () => null) || "",
      address: store?.address || "",
    },
  });

  const imageRef = useRef({} as HTMLImageElement);

  // const handleAddProduct = (product: IProduct) => {
  //   setProducts((prev) => [
  //     { ...product, id: product.id || prev.length + 1 },
  //     ...prev,
  //   ]);
  // };

  const onSubmit = async (data: any) => {
    const newImage = store?.image !== image;
    let formattedData = { ...data, image: image };
    try {
      if (newImage) {
        const formData = new FormData();

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

        formattedData.image = url;

        await deleteImage(store?.image as string);
      }
      formattedData = {
        ...formattedData,
        lat: coordinates.lat.toString(),
        lng: coordinates.lng.toString(),
        contact: data.contact.replace(/\D/g, ""),
      };
      await updateStore(formattedData, token, store?._id as string);
      router.push(`/home/my-store`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetStore = async (token: string) => {
    try {
      const store = await getStore(token);
      setStore(store);
      setCoordinates({ lat: Number(store.lat), lng: Number(store.lng) });
      setImage(store.image);
    } catch (error) {
      console.log(error);
      router.push("/auth/login");
    } finally {
      setStoreLoading(false);
    }
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
        onClose={() => setModalOpened(null)}
        onFinish={handleAddAddress}
        isOpen={modalOpened === "location"}
      />

      <h2 className="text-2xl lg:text-3xl text-secondary-500 max-w-[240px] lg:max-w-full font-semibold mb-6 lg:mb-0">
        Cadastro da Loja
      </h2>
      <div className="flex flex-col mb-4">
        <div className="max-w-[600px] mx-auto w-full h-full flex flex-col items-center">
          {storeLoading ? (
            <div className="flex h-full items-center justify-center gap-4 pt-8 font-semibold text-lg">
              <Loading alternative="whiteBg" size={32} thickness={3} />{" "}
              Carregando loja...
            </div>
          ) : (
            <>
              <AddImage
                registerField={{ ...register("image", { required: !image }) }}
                callback={setImage}
                imageState={image}
                imageRef={imageRef}
                error={errors.image && "É necessário ter uma imagem!"}
                alt="Imagem da academia"
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                    error={errors.description?.message}
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
                </div>
                <div className="flex flex-col gap-3 pt-4">
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
                    registerField={{
                      ...register("contact", { required: true }),
                    }}
                    error={
                      errors.contact && "O número de contato é obrigatório!"
                    }
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
                  <div className="flex gap-3">
                    <Button
                      outline
                      onClick={
                        !isSubmitting
                          ? () => router.push("home/my-store")
                          : () => null
                      }
                      text="Cancelar"
                    />
                    <Button
                      onClick={
                        !isSubmitting
                          ? handleSubmit(onSubmit, () =>
                              setTimeout(clearErrors, 5000)
                            )
                          : () => null
                      }
                      text="Salvar"
                      isLoading={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EditStore;
