"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/contexts/Modal";
import { IProduct } from "@/interfaces/Product";
import Image from "next/image";
import Link from "next/link";

import AddButton from "../../components/AddButton";
import StatisticRow from "../../components/StatisticRow";
import ProductModal from "@/app/components/modals/Product";
import Product from "@/app/components/Product";

import { AiFillEdit } from "react-icons/ai";
import { AiFillTag } from "react-icons/ai";
import { AiOutlineUnorderedList as ListProductIcon } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbStarsFilled } from "react-icons/tb";
import { getStore } from "@/services/place/getStore";
import { UserContext } from "@/contexts/User";
import useKeepUser from "@/hooks/useKeepUser";
import { Store } from "@/interfaces/Store";
import { cloudinaryURL } from "@/config/cloudinary";
import { createProduct } from "@/services/product/createProduct";
import { getProducts } from "@/services/product/getProducts";
import { updateProduct } from "@/services/product/updateProduct";

const StoreHome = () => {
  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [store, setStore] = useState<Store | null>(null);

  const router = useRouter();

  useKeepUser(
    token,
    () => router.push("/auth/login"),
    (user) => {
      handleGetStore(user.token);
      setUser(user);
    },
    (token) => handleGetStore(token)
  );

  const handleEditProduct = async (data: any) => {
    const newImage = data.image !== editData.image;
    let formattedData = { ...data };

    if (newImage) {
      const formData = new FormData();

      formData.append("file", data.image);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME_PRODUCT as string
      );
      formData.append("folder", "/workout/stores/products");

      const response = await fetch(cloudinaryURL, {
        method: "POST",
        body: formData,
      });

      const { url, ...rest } = await response.json();

      console.log("Dados da imagem: ", { url, ...rest })

      formattedData.image = url;
    }

    await updateProduct(formattedData, token, user.ownId as string);

    setProducts((prev) =>
      prev.map((p) => (p._id === formattedData._id ? formattedData : p))
    );
  };

  const handleGetStore = async (token: string) => {
    console.log("Executou o getStore");
    try {
      const store = await getStore(token);
      if (!store) router.push("/register/store");
      setStore(store);
      setUser({ ...user, token, ownId: store["_id"], ownType: "store" });
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          token,
          ownId: store["_id"],
          ownType: "store",
        })
      );

      const { products } = await getProducts(token, store["_id"]);
      setProducts(products);
    } catch (error) {
      console.log(error);
      router.push("/auth/login");
    }
  };

  const handleAddProduct = async (data: any) => {
    const formData = new FormData();

    formData.append("file", data.image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME_PRODUCT as string
    );
    formData.append("folder", "/workout/stores/products");

    const response = await fetch(cloudinaryURL, {
      method: "POST",
      body: formData,
    });

    const { url } = await response.json();

    const { productId } = await createProduct(
      { ...data, image: url },
      token,
      user.ownId as string
    );

    console.log("Product id: ", productId);

    setProducts((prev) => [{ ...data, _id: productId }, ...prev]);
  };

  if (!store) return <></>;

  return (
    <>
      <ProductModal
        editData={editData}
        isOpen={modalOpened === "product"}
        onAdd={(product) => handleAddProduct(product)}
        onDelete={(id) =>
          setProducts((prev) => prev.filter((product) => product.id !== id))
        }
        onEdit={
          (product) => handleEditProduct(product)
          // setProducts((prev) =>
          //   prev.map((p) => (p.id === product.id ? product : p))
          // )
        }
        onClose={() => {
          setEditData(null);
          setModalOpened(null);
        }}
      />

      <div className="flex w-full bg-no-repeat items-center justify-center h-full min-h-[140px] md:min-h-[240px] rounded-md relative">
        <div className="hidden absolute opacity-80 inset-0 md:flex items-center justify-center overflow-hidden rounded-md shadow-md">
          <Image
            className="brightness-50 blur-sm"
            src={store.image}
            width={1080}
            height={720}
            alt={`Imagem da ${store.name}`}
          />
        </div>
        <div
          style={{
            backgroundImage: `url(${store.image})`,
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
        <h3 className="font-bold text-2xl">{store.name}</h3>
        <button className="flex gap-2 py-2 px-4 border-[1px] border-primary-500 font-semibold transition hover:shadow-md rounded-sm text-primary-500 text-xs font items-center">
          <AiFillEdit />
          Editar dados
        </button>
      </div>
      <div className="flex w-full justify-between items-center">
        <h3 className="text-lg font-semibold mb-2">Produtos</h3>
        {!!products.length && (
          <Link
            href="/home/my-store/products"
            className="flex transition text-primary-500 hover:text-primary-600 justify-center items-center text-xs font-semibold gap-1"
          >
            <ListProductIcon />
            Ver em lista
          </Link>
        )}
      </div>
      <div className="p-2 flex gap-4 mb-2 w-full overflow-x-auto">
        <div className="my-auto">
          <AddButton onClick={() => setModalOpened("product")} />
        </div>
        {!products.length && (
          <h3 className="self-center text-sm lg:text-base">
            Parece que não há nenhum produto ainda...
          </h3>
        )}
        {products.map((product, index) => (
          <Product
            key={index}
            onClick={() => {
              setEditData(product);
              setModalOpened("product");
            }}
            {...{
              ...product,
              img: product.image,
              id: product.id?.toString(),
            }}
          />
        ))}
      </div>
      <h3 className="text-lg font-semibold mb-2 lg:mb-4">Estatísticas</h3>
      <div className="flex w-full justify-center flex-col lg:flex-row lg:gap-2 items-center md:mb-2">
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
      <div className="flex w-full justify-center flex-col lg:flex-row lg:gap-2 items-center mb-2 md:pt-4">
        <StatisticRow
          icon={AiFillTag}
          statistics={[
            { title: "Vendas", value: "4.6k" },
            { title: "Mais vendido", value: "Creatina Growth" },
            { title: "Mais avaliado", value: "Whey Gold" },
          ]}
        />
      </div>
    </>
  );
};

export default StoreHome;
