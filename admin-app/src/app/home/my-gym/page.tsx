"use client";

import { useContext, useEffect, useState } from "react";
import { ModalContext } from "@/contexts/Modal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useKeepUser from "@/hooks/useKeepUser";

import { getGym } from "@/services/place/getGym";

import { IPlan } from "@/interfaces/Plan";
import { Gym } from "@/interfaces/Gym";

import Button from "../../components/Button";
import Header from "../../components/Header";
import AddButton from "../../components/AddButton";
import Plan from "../../components/Plan";
import StatisticRow from "../../components/StatisticRow";
import AddPlanModal from "../../components/modals/Plan";

import { AiFillEdit } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbStarsFilled } from "react-icons/tb";
import { GiWeightLiftingUp } from "react-icons/gi";
import { UserContext } from "@/contexts/User";

const GymHome = () => {
  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);
  const [gym, setGym] = useState<Gym | null>(null);
  const [plans, setPlans] = useState<IPlan[]>([]);

  const router = useRouter();

  console.log("My gym montou!");

  useKeepUser(
    token,
    () => router.push("/auth/login"),
    (user) => {
      setUser(user), handleGetGym(user.token);
    },
    (token) => handleGetGym(token)
  );

  const handleEditPlan = (data: any) => {
    setEditData(data);
    setModalOpened("plan");
  };

  const handleGetGym = async (token: string) => {
    const gym = await getGym(token);
    console.log("Gym: ", gym);
    setGym(gym);
    setUser({ ...user, token, ownId: gym["_id"] });
    sessionStorage.setItem(
      "user",
      JSON.stringify({ ...user, token, ownId: gym["_id"] })
    );
  };

  if (!gym) return <></>;

  const urlImage = gym.image;

  return (
    <>
      <AddPlanModal
        isOpen={modalOpened === "plan"}
        onAdd={(plan) =>
          setPlans((prev) => [{ ...plan, id: plans.length + 1 }, ...prev])
        }
        onDelete={(id) => setPlans((prev) => prev.filter((p) => p.id !== id))}
        onEdit={(plan) => {
          setPlans((prev) => prev.map((p) => (p.id === plan.id ? plan : p)));
          setEditData(null);
        }}
        onClose={() => setModalOpened(null)}
        editData={editData}
      />
      <div className="flex w-full bg-no-repeat items-center justify-center h-full min-h-[140px] md:min-h-[240px] rounded-md relative">
        <div className="hidden absolute opacity-80 inset-0 md:flex items-center justify-center overflow-hidden rounded-md shadow-md">
          <Image
            width={1080}
            height={720}
            className="brightness-50 blur-sm"
            src={gym.image}
            alt={`Imagem da ${gym.name}`}
          />
        </div>
        <div
          style={{
            backgroundImage: `url(${gym.image})`,
          }}
          className="bg-cover bg-no-repeat bg-center z-1 rounded-md transition-all duration-300 ease-in-out md:-translate-y-3 max-w-[600px] w-full min-h-[140px] md:min-h-[240px] hover:translate-y-0 hover:max-w-[800px]"
        >
          {/* <img
            src="https://blog.sistemapacto.com.br/wp-content/uploads/2022/04/Blog-650x350-segunda-1280x720-1.webp"
            alt="Imagem da sua academia"
            className="w-full h-auto rounded-md "
          /> */}
        </div>
      </div>
      <div className="flex justify-between items-center pt-4 mb-6">
        <h3 className="font-bold text-2xl">{gym.name}</h3>

        <button className="flex gap-2 py-2 px-4 border-[1px] border-primary-500 font-semibold transition hover:shadow-md rounded-sm text-primary-500 text-xs font items-center">
          <AiFillEdit />
          Editar dados
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-2">Planos</h3>
      <div className="p-2 flex gap-4 mb-2 w-full overflow-x-auto">
        <div className="my-auto">
          <AddButton onClick={() => setModalOpened("plan")} />
        </div>
        {!plans.length && (
          <h3 className="self-center text-sm lg:text-base">
            Parece que não há nenhum plano ainda...
          </h3>
        )}
        {plans.map((plan) => (
          <Plan
            key={plan.id}
            onClick={() => handleEditPlan({ ...plan })}
            {...plan}
          />
        ))}
        {/* <Plan days="3" price="89,90" onClick={() => null} />
          <Plan days="3" price="89,90" onClick={() => null} />
          <Plan days="3" price="89,90" onClick={() => null} /> */}
      </div>
      <h3 className="text-lg font-semibold mb-2 lg:mb-4">Estatísticas</h3>
      <div className="flex w-full justify-center flex-col lg:flex-row lg:gap-2 items-center mb-2">
        <StatisticRow
          icon={HiOutlineUserGroup}
          statistics={[
            { title: "Número de visitas", value: "12.334" },
            { title: "Mensal", value: "640" },
            { title: "Semanal", value: "295" },
          ]}
        />
        <StatisticRow
          icon={TbStarsFilled}
          statistics={[
            { title: "Avaliação Média", value: "4.5" },
            { title: "5 estrelas", value: "86%" },
            { title: "1 estrela", value: "5%" },
          ]}
        />
      </div>
    </>
  );
};

export default GymHome;
