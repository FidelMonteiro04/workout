import "../../../styles/animations.css";
import { useRef } from "react";

import { MdClose } from "react-icons/md";

interface Props {
  title: string;
  header?: React.ReactNode;
  body: React.ReactNode;
  handleClose: () => void;
}

const Modal = ({ title, body, handleClose, header }: Props) => {
  const backgroundRef = useRef({} as HTMLDivElement);

  const onClose = () => {
    backgroundRef.current.classList.remove("fade-in");
    backgroundRef.current.classList.add("fade-out");

    setTimeout(handleClose, 400);
  };

  return (
    <div
      onClick={onClose}
      className="fade-in fixed overflow-hidden z-10 inset-0 bg-black/20 flex items-center justify-center"
      ref={backgroundRef}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white p-4 rounded-md flex flex-col gap-2 max-h-[calc(100vh-24px)] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-2xl">{title}</h3>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 transition rounded-full hover:shadow-md text-zinc-600 hover:text-red-600"
          >
            <MdClose size={20} />
          </button>
        </div>
        {header}
        {body}
      </div>
    </div>
  );
};

export default Modal;
