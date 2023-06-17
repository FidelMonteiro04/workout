"use client";
import { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { formatPhoneNumber } from "@/utils/formatPhone";

import useKeepUser from "@/hooks/useKeepUser";

import { getGym, updateGym } from "@/services/place/gym";
import { deleteImage } from "@/services/deleteImage";
import { cloudinaryURL } from "@/config/cloudinary";

import AddImage from "@/app/components/AddImage";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import LocationModal from "@/app/components/modals/Location";
import Loading from "@/app/components/Loading";
import TextArea from "@/app/components/TextArea";

import { Gym } from "@/interfaces/Gym";

import { BsBuildings } from "react-icons/bs";
import { HiOutlineUserGroup as PersonalIcon } from "react-icons/hi";
import { BsFillSignpostSplitFill as AddressIcon } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFillTelephoneFill as ContactIcon } from "react-icons/bs";

import { ImageContext } from "@/contexts/Image";
import { ModalContext } from "@/contexts/Modal";
import { UserContext } from "@/contexts/User";

const EditGym = () => {
  const router = useRouter();
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);
  const { image, setImage } = useContext(ImageContext);
  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);

  const [gym, setGym] = useState<Gym | null>(null);
  const [loadingGym, setLoadingGym] = useState(true);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    defaultValues: {
      image: "",
    },
    values: {
      name: gym?.name || "",
      description: gym?.description || "",
      personals: gym?.personals || "",
      instagram: gym?.instagram || "",
      contact: formatPhoneNumber(gym?.contact || "", () => null) || "",
      address: gym?.address || "",
      airConditioner: gym?.airConditioner
        ? !!gym?.airConditioner
          ? "true"
          : "false"
        : "false",
      accessibility: gym?.accessibility
        ? !!gym?.accessibility
          ? "true"
          : "false"
        : "false",
    },
  });

  useKeepUser(
    token,
    () => router.push("/auth/login"),
    (user) => {
      setUser(user), handleGetGym(user.token);
    },
    (token) => handleGetGym(token)
  );

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const imageRef = useRef({} as HTMLImageElement);

  const handleGetGym = async (token: string) => {
    setLoadingGym(true);
    try {
      const { gym: gymRes } = await getGym(token);

      setGym(gymRes);
      setImage(gymRes.image);
      if (gymRes) {
        setCoordinates({ lat: Number(gymRes.lat), lng: Number(gymRes.lng) });
      }
    } catch (err) {
    } finally {
      setLoadingGym(false);
    }
  };

  const onSubmit = async (data: any) => {
    const newImage = gym?.image !== image;
    let formattedData = { ...data, image: image };
    try {
      if (newImage) {
        const formData = new FormData();

        formData.append("file", image);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string
        );
        formData.append("folder", "workout/gyms");

        const response = await fetch(cloudinaryURL, {
          method: "POST",
          body: formData,
        });

        const { url } = await response.json();

        formattedData.image = url;

        await deleteImage(gym?.image as string);
      }
      formattedData = {
        ...formattedData,
        lat: coordinates.lat.toString(),
        lng: coordinates.lng.toString(),
        personals: Number(data.personals),
        airConditioner: data.airConditioner === "true",
        accessibility: data.accessibility === "true",
        contact: data.contact.replace(/\D/g, ""),
      };

      await updateGym(formattedData, token, gym?._id as string);
      router.push(`/home/my-gym`);
    } catch (error) {}
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
        onClose={() => setModalOpened(null)}
        isOpen={modalOpened === "location"}
      />

      <h2 className="text-2xl lg:text-3xl text-secondary-500 max-w-[240px] lg:max-w-full font-semibold mb-6 lg:mb-0">
        Editar Academia
      </h2>
      <div className="flex flex-col mb-4">
        <div className="max-w-[600px] mx-auto w-full h-full flex flex-col items-center">
          {loadingGym ? (
            <div className="flex h-full items-center justify-center gap-4 pt-8 font-semibold text-lg">
              <Loading alternative="whiteBg" size={32} thickness={3} />{" "}
              Carregando academia...
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-4">
                <div className="flex flex-col justify-between gap-3 pt-4">
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
                    max={200}
                    min={0}
                    maxLength={4}
                    registerField={{
                      ...register("personals", { required: true }),
                    }}
                    error={
                      errors.personals && "O número de personais é obrigatório!"
                    }
                    type="number"
                    placeholder="Número de personais"
                    icon={PersonalIcon}
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

                  {/* {<Button
                text="Localização"
                icon={LocationIcon}
                onClick={() => setModalOpened("location")}
              />} */}
                </div>
                <div className="flex flex-col pt-4 h-full justify-between">
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
                    icon={ContactIcon}
                    type="tel"
                    onChange={(e) =>
                      formatPhoneNumber(e.target.value, (field, value) =>
                        setValue(field as "contact", value)
                      )
                    }
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold text-sm">
                        Climatizado?
                      </span>
                      <div className="flex gap-3">
                        <div className="flex gap-2">
                          <input
                            {...register("airConditioner")}
                            type="radio"
                            id="has-air"
                            name="airConditioner"
                            value={"true"}
                          />
                          <label htmlFor="has-air">Sim</label>
                        </div>
                        <div className="flex gap-2">
                          <input
                            {...register("airConditioner")}
                            type="radio"
                            id="no-air"
                            name="airConditioner"
                            value={"false"}
                            defaultChecked
                          />
                          <label htmlFor="no-air">Não</label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold text-sm">
                        Acessibilidade?
                      </span>
                      <div className="flex gap-3">
                        <div className="flex gap-2">
                          <input
                            {...register("accessibility")}
                            type="radio"
                            id="has-accessibility"
                            name="accessibility"
                            value="true"
                          />
                          <label htmlFor="has-accessibility">Sim</label>
                        </div>
                        <div className="flex gap-2">
                          <input
                            {...register("accessibility")}
                            type="radio"
                            id="no-accessibility"
                            name="accessibility"
                            value="false"
                            defaultChecked
                          />
                          <label htmlFor="no-accessibility">Não</label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      outline
                      onClick={
                        !isSubmitting
                          ? () => router.push("home/my-gym")
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

export default EditGym;
