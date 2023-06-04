import { useContext } from "react";
import { RegisterContext } from "@/app/register/layout";

import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";

import { MdAttachMoney } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  isOpen: boolean;
}

const AddPlanModal = ({ isOpen }: Props) => {
  const { setModalIsOpened } = useContext(RegisterContext);

  const handleClose = () => {
    setModalIsOpened(false);
  };

  const body = (
    <div className="flex flex-col gap-8 mt-2 ">
      <div className="flex gap-8 justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-secondary-500">
            Preço do Plano
          </span>
          <Input
            customStyles="max-w-[140px] text-xs"
            placeholder="R$ 00,00"
            icon={MdAttachMoney}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-secondary-500 text-center">
            Quantidade de dias
          </span>
          <div className="flex justify-center gap-3">
            <button className="border-zinc-600 text-zinc-600 border-[1px] rounded-full p-1 transition hover:text-primary-500 hover:border-primary-500">
              <AiOutlineMinus />
            </button>
            <input
              maxLength={3}
              max={999}
              type="number"
              className="max-w-[36px] text-center"
              defaultValue={0}
            />
            <button className="border-zinc-600 text-zinc-600 border-[1px] rounded-full p-1 transition hover:text-primary-500 hover:border-primary-500">
              <AiOutlinePlus />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[80%]">
          <Button text="Salvar" onClick={() => null} outline />
        </div>
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return (
    <Modal title="Adicionar Plano" body={body} handleClose={handleClose} />
  );
};

export default AddPlanModal;
