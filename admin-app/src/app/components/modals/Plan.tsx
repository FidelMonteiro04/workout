import { ChangeEvent, useContext, useRef } from "react";
import { RegisterContext } from "@/app/register/layout";
import { useForm, Controller } from "react-hook-form";

import { formatPrice } from "@/utils/formatPrice";

import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";

import { MdAttachMoney } from "react-icons/md";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";

interface Props {
  isOpen: boolean;
  onAdd: (plan: any) => void;
  onEdit: (plan: any) => void;
  onDelete: (plan: any) => void;
}

const AddPlanModal = ({ isOpen, onAdd, onEdit, onDelete }: Props) => {
  const { setModalOpened, editData, setEditData } = useContext(RegisterContext);
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    defaultValues: {
      price: "",
      days: "1",
    },
    values: {
      price: editData?.price || "",
      days: editData?.days || "1",
    },
  });

  const amountRef = useRef({} as HTMLInputElement);

  const handleClose = () => {
    reset();
    setModalOpened(null);
    setEditData(null);
  };

  const handleAmountDaysInput = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (Number(value) < 0) return (event.target.value = "0");
    if (Number(value) > 365) return (event.target.value = "365");
    value = value.length > 3 ? value.slice(0, value.length - 1) : value;
  };

  const onIncrease = () => {
    let value = amountRef.current.value;
    if (Number(value) >= 365) return;
    amountRef.current.value = (Number(value) + 1).toString();
  };
  const onDecrease = () => {
    let value = amountRef.current.value;
    if (Number(value) === 1) return;
    amountRef.current.value = (Number(amountRef.current.value) - 1).toString();
  };

  const Submit = (data: any) => {
    if (Number(amountRef.current.value) <= 0)
      return setError("days", {
        message: "Os dias são obrigatórios",
        type: "value",
      });
    console.log({ price: data.price, days: amountRef.current.value });
    const formattedData = { price: data.price, days: amountRef.current.value };
    if (!editData) {
      onAdd(formattedData);
    } else {
      onEdit({ ...formattedData, id: editData.id });
    }
    handleClose();
  };

  const handleDelete = () => {
    onDelete(editData.id);
    handleClose();
  };

  const body = (
    <div className="flex flex-col gap-8 mt-2 ">
      <div className="flex gap-8 justify-between items-center">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-secondary-500">
            Preço do Plano
          </span>
          <Controller
            control={control}
            name="price"
            defaultValue=""
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <Input
                customStyles="max-w-[140px] text-xs"
                error={error && "Preço do produto é obrigatório!"}
                placeholder="R$ 00,00"
                icon={MdAttachMoney}
                value={field.value}
                onChange={(e) => {
                  const formattedValue = "R$ " + formatPrice(e.target.value);
                  field.onChange(formattedValue);
                }}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-secondary-500 text-center">
            Quantidade de dias
          </span>
          <div className="flex justify-center gap-3">
            <button
              onClick={onDecrease}
              className="border-zinc-600 text-zinc-600 border-[1px] rounded-full p-1 transition hover:text-primary-500 hover:border-primary-500"
            >
              <AiOutlineMinus />
            </button>
            <input
              {...register("days")}
              type="number"
              ref={amountRef}
              className="max-w-[36px] text-secondary-500 text-center placeholder:text-secondary-500"
              placeholder="0"
              defaultValue={editData?.days || 1}
              onChange={handleAmountDaysInput}
            />
            <button
              onClick={onIncrease}
              className="border-zinc-600 text-zinc-600 border-[1px] rounded-full p-1 transition hover:text-primary-500 hover:border-primary-500"
            >
              <AiOutlinePlus />
            </button>
          </div>
          <small className="text-red-600 text-xs">
            {errors.days && "Os dias são obrigatórios!"}
          </small>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[80%] flex gap-2">
          {editData && (
            <Button
              text="Excluir"
              onClick={handleDelete}
              icon={BsFillTrashFill}
            />
          )}
          <Button
            icon={BsCheck}
            text="Salvar"
            onClick={handleSubmit(Submit, () =>
              setTimeout(() => {
                clearErrors();
              }, 5000)
            )}
            outline
          />
        </div>
      </div>
    </div>
  );

  if (!isOpen) return <></>;

  return (
    <Modal
      title={editData ? "Editar Plano" : "Adicionar Plano"}
      body={body}
      handleClose={handleClose}
    />
  );
};

export default AddPlanModal;
