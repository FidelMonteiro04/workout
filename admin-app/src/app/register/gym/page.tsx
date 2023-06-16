"use client";
import { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { formatPhoneNumber } from "@/utils/formatPhone";

import { generateFileName } from "@/utils/generateFileName";
import { cloudinaryURL } from "@/config/cloudinary";
import { createPlan } from "@/services/plan";
import { registerGym } from "@/services/place/gym";

import { ImageContext } from "@/contexts/Image";
import { ModalContext } from "@/contexts/Modal";
import { UserContext } from "@/contexts/User";

import useKeepUser from "@/hooks/useKeepUser";

import AddImage from "@/app/components/AddImage";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Plan from "@/app/components/Plan";
import AddButton from "@/app/components/AddButton";
import AddPlanModal from "@/app/components/modals/Plan";
import LocationModal from "@/app/components/modals/Location";
import TextArea from "@/app/components/TextArea";

import { IPlan } from "@/interfaces/Plan";

import { BsBuildings } from "react-icons/bs";
import { HiOutlineUserGroup as PersonalIcon } from "react-icons/hi";
import { BsFillSignpostSplitFill as AddressIcon } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFillTelephoneFill as ContactIcon } from "react-icons/bs";
import { BsCheck } from "react-icons/bs";

const RegisterGym = () => {
  const router = useRouter();
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);
  const { image, setImage } = useContext(ImageContext);
  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm();

  useKeepUser(token, () => router.push("/auth/register"), setUser);

  const [plans, setPlans] = useState<IPlan[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const imageRef = useRef({} as HTMLImageElement);

  const onSubmit = async (data: any) => {
    console.log("Token: ", token);
    const formData = new FormData();
    // const newFileName = generateFileName(image);

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

    const formattedData = {
      ...data,
      lat: coordinates.lat.toString(),
      lng: coordinates.lng.toString(),
      personals: Number(data.personals),
      airConditioner: data.airConditioner === "true",
      accessibility: data.accessibility === "true",
      image: url,
      contact: data.contact.replace(/\D/g, ""),
    };

    const { gymId } = await registerGym(formattedData, token);

    setUser({ ...user, token, ownId: gymId });
    sessionStorage.setItem(
      "user",
      JSON.stringify({ ...user, token, ownId: gymId })
    );

    if (plans.length) {
      const formattedPlans: { days: number; price: string }[] = plans.map(
        (plan) => {
          return { price: plan.price, days: Number(plan.days) };
        }
      );

      const { planId } = await createPlan(formattedPlans, token, gymId);

      console.log("PlanId: ", planId);
    }

    router.push(`/home/my-gym`);
  };

  const handleEditPlan = (data: any) => {
    setEditData(data);
    setModalOpened("plan");
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
      <AddPlanModal
        editData={editData}
        onClose={() => {
          setEditData(null);
          setModalOpened(null);
        }}
        onDelete={(id) => setPlans((prev) => prev.filter((p) => p.id !== id))}
        onAdd={(plan) =>
          setPlans((prev) => [...prev, { ...plan, id: plans.length + 1 }])
        }
        onEdit={(plan) => {
          setPlans((prev) => prev.map((p) => (p.id !== plan.id ? p : plan)));
          setEditData(null);
        }}
        isOpen={modalOpened === "plan"}
      />
      <h2 className="text-2xl lg:text-3xl text-secondary-500 max-w-[240px] lg:max-w-full font-semibold mb-6 lg:mb-0">
        Cadastro da Academia
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                error={errors.description?.message as string}
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
                registerField={{ ...register("address", { required: true }) }}
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
                icon={ContactIcon}
                type="tel"
                onChange={(e) =>
                  formatPhoneNumber(e.target.value, (field, value) =>
                    setValue(field, value)
                  )
                }
              />
              {/* {<Button
                text="Localização"
                icon={LocationIcon}
                onClick={() => setModalOpened("location")}
              />} */}
            </div>
            <div className="flex flex-col pt-4 h-full justify-between">
              <h3 className="font-bold text-xl mb-2 ">Planos</h3>
              <div className="grid gap-2 mb-6 grid-flow-col max-w-[250px] overflow-x-auto grid-rows-2 pb-2">
                <div className="w-full flex items-center justify-center">
                  <AddButton onClick={() => setModalOpened("plan")} />
                </div>
                {plans.map((plan, index) => (
                  <Plan
                    key={index}
                    {...plan}
                    onClick={() => handleEditPlan({ ...plan })}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-sm">Climatizado?</span>
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
                  <span className="font-semibold text-sm">Acessibilidade?</span>
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

              <Button
                onClick={
                  !isSubmitting
                    ? handleSubmit(onSubmit, () =>
                        setTimeout(clearErrors, 5000)
                      )
                    : () => null
                }
                text="Finalizar"
                isLoading={isSubmitting}
                icon={BsCheck}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterGym;
