"use client";
import { useContext, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { RegisterContext } from "../layout";

import { IProduct } from "@/interfaces/Product";

import { generateFileName } from "@/utils/generateFileName";
import { cloudinaryURL } from "@/config/cloudinary";

import AddImage from "@/app/components/AddImage";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import AddButton from "@/app/components/AddButton";
import Product from "@/app/components/Product";
import AddProductModal from "@/app/components/modals/AddProduct";
import LocationModal from "@/app/components/modals/Location";

import { BsBuildings } from "react-icons/bs";
import { BsFillSignpostSplitFill as AddressIcon } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFillTelephoneFill as ContactIcon } from "react-icons/bs";
import { HiOutlineLocationMarker as LocationIcon } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";

const RegisterStore = () => {
  const { image, setImage, modalOpened, setModalOpened } =
    useContext(RegisterContext);

  const [products, setProducts] = useState<IProduct[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors, isLoading },
    clearErrors,
  } = useForm();

  const imageRef = useRef({} as HTMLImageElement);

  const handleAddProduct = (product: IProduct) => {
    setProducts((prev) => [product, ...prev]);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    const formData = new FormData();
    // const newFileName = generateFileName(image);

    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME as string
    );
    formData.append("folder", "workout/gyms");

    const response = await fetch(cloudinaryURL, {
      method: "POST",
      body: formData,
    });

    const { url } = await response.json();

    console.log(url);
  };
  return (
    <>
      <LocationModal isOpen={modalOpened === "location"} />
      <AddProductModal
        onAdd={handleAddProduct}
        isOpen={modalOpened === "product"}
      />

      <h2 className="text-2xl lg:text-3xl text-secondary-500 max-w-[240px] lg:max-w-full font-semibold mb-6 lg:mb-0">
        Cadastro da Loja
      </h2>
      <div className="flex flex-col mb-4">
        <div className="max-w-[600px] mx-auto w-full h-full flex flex-col items-center">
          <AddImage
            registerField={{ ...register("image", { required: true }) }}
            callback={setImage}
            imageState={image}
            imageRef={imageRef}
            error={errors.image && "É necessário ter uma imagem!"}
            alt="Imagem da academia"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3 pt-4">
              <Input
                registerField={{ ...register("placeName", { required: true }) }}
                error={errors.placeName && "O nome do local é obrigatório!"}
                placeholder="Nome"
                icon={BsBuildings}
              />

              <Input
                registerField={{ ...register("address", { required: true }) }}
                error={errors.address && "O endereço é obrigatório!"}
                placeholder="Endereço"
                icon={AddressIcon}
              />
              <Input
                registerField={{
                  ...register("instagram", {
                    pattern:
                      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i,
                    message: "Instagram inválido!",
                  }),
                }}
                error={errors.instagram && "Instagram inválido!"}
                placeholder="Link do Instagram"
                icon={BsInstagram}
              />
              <Input
                registerField={{ ...register("contact", { required: true }) }}
                error={errors.placeName && "O número de contato é obrigatório!"}
                placeholder="Contato"
                icon={ContactIcon}
                type="tel"
              />
              <Button
                text="Localização"
                icon={LocationIcon}
                onClick={() => setModalOpened("location")}
              />
            </div>
            <div className="flex flex-col pt-4 h-full justify-between">
              <div>
                <h3 className="font-bold text-xl mb-2 ">Produtos</h3>
                <div className="flex gap-3 overflow-x-auto pt-2 pb-3 px-1 max-w-[250px] mb-4">
                  <div className="flex items-center justify-center">
                    <AddButton onClick={() => setModalOpened("product")} />
                  </div>
                  {products.map((product, index) => (
                    <Product
                      key={`${index}`}
                      {...product}
                      id={`${product.id}`}
                      img={product.image}
                      onClick={() => null}
                    />
                  ))}
                  <Product
                    img="https://cdn.shopify.com/s/files/1/0273/2323/6455/products/WPCMORANGONOVO.png?v=1679949271"
                    name="Whey Protein"
                    price="119,90"
                    onClick={() => null}
                    distributor="Iridium"
                  />
                  <Product
                    img="https://www.corpoevidasuplementos.com.br/images/products/full/10473-bcaa-2-1-1-2044-mg-90-capsulas-integralmedica.1626808819.png"
                    name="BCAA"
                    price="89,90"
                    onClick={() => null}
                    distributor="IntegralMedica"
                  />
                </div>
              </div>
              <Button
                outline
                onClick={handleSubmit(onSubmit, () =>
                  setTimeout(clearErrors, 5000)
                )}
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

export default RegisterStore;
