"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/contexts/Modal";
import { UserContext } from "@/contexts/User";
import Image from "next/image";

import useKeepUser from "@/hooks/useKeepUser";

import { getGym } from "@/services/place/gym/getGym";
import { getPlans, createPlan, updatePlan, deletePlan } from "@/services/plan";

import { IPlan } from "@/interfaces/Plan";
import { Gym } from "@/interfaces/Gym";

import AddButton from "../../components/AddButton";
import Plan from "../../components/Plan";
import StatisticRow from "../../components/StatisticRow";
import AddPlanModal from "../../components/modals/Plan";
import Loading from "@/app/components/Loading";

import { AiFillEdit } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbStarsFilled } from "react-icons/tb";

const GymHome = () => {
  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);
  const [gym, setGym] = useState<Gym | null>(null);
  const [plans, setPlans] = useState<IPlan[]>([]);

  const [plansLoading, setPlansLoading] = useState(false);

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

  const handleCreatePlan = async (plan: IPlan) => {
    const formattedData = { price: plan.price, days: Number(plan.days) };

    const { planId } = await createPlan(
      formattedData,
      token,
      user?.ownId as string
    );

    setPlans((prev) => [{ ...plan, _id: planId }, ...prev]);
  };

  const handleInitEditPlan = (data: any) => {
    console.log("Plano inicial: ", data);
    setEditData(data);
    setModalOpened("plan");
  };

  const handleEditPlan = async (plan: any) => {
    console.log("Plan: ", plan);
    try {
      const formattedData = {
        _id: plan._id,
        price: plan?.price,
        days: Number(plan?.days),
      };
      await updatePlan(formattedData, token, user?.ownId as string);

      setPlans((prev) => prev.map((p) => (p._id === plan._id ? plan : p)));
      setEditData(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePlan = async (id: string) => {
    try {
      await deletePlan(id, token, user?.ownId as string);

      setPlans((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetGym = async (token: string) => {
    try {
      const { gym } = await getGym(token);
      if (!gym) {
        router.push("/register/gym");
        return;
      }
      console.log("Gym: ", gym);
      setGym(gym);
      setUser({ ...user, token, ownId: gym["_id"], ownType: "gym" });
      sessionStorage.setItem(
        "user",
        JSON.stringify({ ...user, token, ownId: gym["_id"], ownType: "gym" })
      );

      await handleGetPlans(token, gym["_id"]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetPlans = async (tokenParam: string, gymId: string) => {
    setPlansLoading(true);
    try {
      const { plans } = await getPlans(
        tokenParam || token,
        gymId || (user?.ownId as string)
      );
      setPlans(plans);
    } catch (error) {
      console.log(error);
    } finally {
      setPlansLoading(false);
    }
  };

  if (!gym) return <></>;

  return (
    <>
      <AddPlanModal
        isOpen={modalOpened === "plan"}
        onAdd={(plan) => handleCreatePlan(plan)}
        onDelete={(id) => handleDeletePlan(id)}
        onEdit={(plan) => handleEditPlan(plan)}
        onClose={() => {
          setModalOpened(null);
          setEditData(null);
        }}
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
      <div className="flex justify-between items-center pt-4 mb-3">
        <h2 className="font-bold text-2xl">{gym.name}</h2>

        <button
          onClick={() => router.push("/edit/gym")}
          className="flex gap-2 py-2 px-4 border-[1px] border-primary-500 font-semibold transition hover:shadow-md rounded-sm text-primary-500 text-xs font items-center"
        >
          <AiFillEdit />
          Editar dados
        </button>
      </div>
      <div className="mb-4 max-w-[95%]">
        <span className="text-lg text-zinc-600 w-full">{gym.description}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">Planos</h3>
      <div className="p-2 flex gap-4 mb-2 w-full overflow-x-auto">
        {plansLoading ? (
          <div className="my-auto flex items-center justify-center font-semibold gap-3 text-lg">
            <Loading alternative="whiteBg" size={32} thickness={3} />
            Carregando planos...
          </div>
        ) : (
          <div className="my-auto">
            <AddButton onClick={() => setModalOpened("plan")} />
          </div>
        )}
        {!plans.length && !plansLoading && (
          <h3 className="self-center text-sm lg:text-base">
            Parece que não há nenhum plano ainda...
          </h3>
        )}
        {plans.map((plan) => (
          <Plan
            key={plan.id}
            onClick={() => handleInitEditPlan({ ...plan })}
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
