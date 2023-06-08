import Button from "../Button";
import Input from "../Input";
import Modal from "./Modal";

import { AiOutlineSearch } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

interface Props {
  isOpen: boolean;
}

const LocationModal = ({ isOpen }: Props) => {
  const header = (
    <div className="mb-4 max-w-[300px]">
      <span className="text-sm text-zinc-600 ">
        Precisamos do endereço para facilitar a sua vida e a de seu cliente!
      </span>
    </div>
  );
  const body = (
    <div className="flex flex-col gap-8">
      <Input
        icon={AiOutlineSearch}
        placeholder="Busque pelo endereço"
        containerStyles="max-w-full w-full"
      />
      <Button outline text="Finalizar" icon={BsCheck} onClick={() => null} />
    </div>
  );

  if (!isOpen) return <></>;

  return (
    <Modal
      handleClose={() => null}
      header={header}
      title="Localização"
      body={body}
    />
  );
};

export default LocationModal;
