"use client";

import AddImage from "../components/AddImage";
import Button from "../components/Button";
import Input from "../components/Input";
import Plan from "../components/Plan";

import { BsBuildings } from "react-icons/bs";
import { HiOutlineUserGroup as PersonalIcon } from "react-icons/hi";
import { BsFillSignpostSplitFill as AddressIcon } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFillTelephoneFill as ContactIcon } from "react-icons/bs";
import { HiOutlineLocationMarker as LocationIcon } from "react-icons/hi";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

const RegisterPlace = () => {
  return (
    <>
      <h2 className="text-2xl lg:text-3xl text-secondary-500 max-w-[240px] lg:max-w-full font-semibold mb-6 lg:mb-0">
        Cadastro da Academia
      </h2>
      <div className="flex flex-col mb-4">
        <div className="max-w-[600px] mx-auto w-full h-full flex flex-col items-center">
          <AddImage />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <form className="flex flex-col gap-3 pt-4">
              <Input placeholder="Nome" icon={BsBuildings} />
              <Input placeholder="Número de personais" icon={PersonalIcon} />
              <Input placeholder="Endereço" icon={AddressIcon} />
              <Input placeholder="Link do Instagram" icon={BsInstagram} />
              <Input placeholder="Contato" icon={ContactIcon} />
              <Button
                text="Localização"
                icon={LocationIcon}
                onClick={() => null}
              />
            </form>
            <div className="flex flex-col pt-4 h-full justify-between">
              <h3 className="font-bold text-xl mb-2 ">Planos</h3>
              <div className="grid gap-2 mb-6 grid-flow-col max-w-[250px] overflow-x-auto grid-rows-2 pb-2">
                <div className="w-full flex items-center justify-center">
                  <button
                    onClick={() => null}
                    className="p-2 rounded-full transition border-[1px] text-primary-500 border-primary-500 hover:border-primary-600 hover:shadow-md hover:text-primary-600"
                  >
                    <AiOutlinePlus size={20} />
                  </button>
                </div>
                <Plan days="3" value="60,00" />
                <Plan days="5" value="70,00" />
                <Plan days="7" value="90,00" />
                <Plan days="5" value="70,00" />
                <Plan days="7" value="90,00" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-sm">Climatizado?</span>
                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        id="has-air"
                        name="airConditioned"
                        value="true"
                      />
                      <label htmlFor="has-air">Sim</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        id="no-air"
                        name="airConditioned"
                        value="false"
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
                        type="radio"
                        id="has-accessibility"
                        name="accessibility"
                        value="true"
                      />
                      <label htmlFor="has-accessibility">Sim</label>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="radio"
                        id="no-accessibility"
                        name="accessibility"
                        value="false"
                      />
                      <label htmlFor="no-accessibility">Não</label>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                outline
                onClick={() => null}
                text="Finalizar"
                icon={BsCheck}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPlace;
