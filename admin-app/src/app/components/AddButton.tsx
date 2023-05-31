"use client";

import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  onClick: () => void;
}

const AddButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full transition border-[1px] text-primary-500 border-primary-500 hover:border-primary-600 hover:shadow-md hover:text-primary-600"
    >
      <AiOutlinePlus size={20} />
    </button>
  );
};

export default AddButton;
