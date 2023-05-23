"use client";
import { IconType } from "react-icons";

interface Props {
  icon?: IconType;
  text: string;
  selected: boolean;
  onClick: () => void;
}

const PropertySelector = ({ icon: Icon, text, selected, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`flex transition items-center justify-center cursor-pointer p-3 w-full gap-3 shadow-sm font-semibold rounded-full ${
        selected
          ? "bg-primary-500 text-white"
          : "border-[1px] border-gray-500 text-gray-500 hover:shadow-lg"
      }`}
    >
      {Icon && <Icon size={20} />}
      <span>{text}</span>
    </div>
  );
};

export default PropertySelector;
