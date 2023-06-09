"use client";

import { useContext } from "react";
import { ModalContext } from "@/contexts/Modal";

import Button from "../components/Button";
import Header from "../components/Header";
import AddButton from "../components/AddButton";
import Plan from "../components/Plan";
import StatisticRow from "../components/StatisticRow";
import AddPlanModal from "../components/modals/Plan";

import { AiFillEdit } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbStarsFilled } from "react-icons/tb";
import { GiWeightLiftingUp } from "react-icons/gi";

const GymHome = () => {
  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);
  return (
    <>
      <AddPlanModal
        isOpen={modalOpened === "plan"}
        onAdd={() => null}
        onDelete={() => null}
        onEdit={() => null}
        onClose={() => setModalOpened(null)}
        editData={editData}
      />
      <main className="max-w-[800px] h-full rounded-md shadow-lg mx-auto p-4 overflow-y-auto pb-10 md:pb-4 max-h-screen lg:max-h-full md:border-[1px] md:border-zinc-200 md:my-2">
        <div className="-mx-4 -mt-4 mb-4">
          <Header
            menuOptions={[
              {
                text: "Minha academia",
                path: "/home",
                icon: GiWeightLiftingUp,
              },
            ]}
          />
        </div>
        <div className="flex w-full bg-no-repeat items-center justify-center h-full min-h-[140px] md:min-h-[240px] rounded-md relative">
          <div className="hidden absolute opacity-80 inset-0 md:flex items-center justify-center overflow-hidden rounded-md shadow-md">
            <img
              className="brightness-50 blur-sm"
              src="https://blog.sistemapacto.com.br/wp-content/uploads/2022/04/Blog-650x350-segunda-1280x720-1.webp"
            />
          </div>
          <div
            style={{
              backgroundImage:
                "url(https://blog.sistemapacto.com.br/wp-content/uploads/2022/04/Blog-650x350-segunda-1280x720-1.webp)",
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
          <h3 className="font-bold text-2xl">SmartFit</h3>

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
          <Plan days="3" price="89,90" onClick={() => null} />
          <Plan days="3" price="89,90" onClick={() => null} />
          <Plan days="3" price="89,90" onClick={() => null} />
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
      </main>
    </>
  );
};

export default GymHome;
