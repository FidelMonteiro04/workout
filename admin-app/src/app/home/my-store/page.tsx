"use client";

import { useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { ModalContext } from "@/contexts/Modal";
import { IProduct } from "@/interfaces/Product";

import Button from "../../components/Button";
import Header from "../../components/Header";
import AddButton from "../../components/AddButton";
import Plan from "../../components/Plan";
import StatisticRow from "../../components/StatisticRow";
import ProductModal from "@/app/components/modals/Product";
import Product from "@/app/components/Product";

import { AiFillEdit } from "react-icons/ai";
import { AiFillTag } from "react-icons/ai";
import { AiOutlineUnorderedList as ListProductIcon } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbStarsFilled } from "react-icons/tb";
import { GiWeightLiftingUp } from "react-icons/gi";
import Link from "next/link";
import { getStore } from "@/services/place/getStore";
import { UserContext } from "@/contexts/User";
import useKeepUser from "@/hooks/useKeepUser";

const StoreHome = () => {
  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [store, setStore] = useState(null);

  useKeepUser(
    token,
    () => redirect("/auth/login"),
    () => handleGetStore()
  );

  const handleEditProduct = (data: any) => {
    setEditData(data);
    setModalOpened("plan");
  };

  const handleGetStore = async () => {
    try {
      const store = await getStore(token);
      console.log(store);
      setStore(store);
    } catch (error) {
      console.log(error);
      redirect("/auth/login");
    }
  };

  useEffect(() => {
    handleGetStore();
  }, []);

  return (
    <>
      <ProductModal
        editData={editData}
        isOpen={modalOpened === "product"}
        onAdd={(product) =>
          setProducts((prev) => [
            { ...product, id: product.id || prev.length + 1 },
            ...prev,
          ])
        }
        onDelete={(id) =>
          setProducts((prev) => prev.filter((product) => product.id !== id))
        }
        onEdit={(product) =>
          setProducts((prev) =>
            prev.map((p) => (p.id === product.id ? product : p))
          )
        }
        onClose={() => {
          setEditData(null);
          setModalOpened(null);
        }}
      />

      <div className="flex w-full bg-no-repeat items-center justify-center h-full min-h-[140px] md:min-h-[240px] rounded-md relative">
        <div className="hidden absolute opacity-80 inset-0 md:flex items-center justify-center overflow-hidden rounded-md shadow-md">
          <img
            className="brightness-50 blur-sm"
            src="https://i.pinimg.com/originals/c1/2c/0c/c12c0c3ef0a757ea81298bf6d12db4b9.jpg"
          />
        </div>
        <div
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/originals/c1/2c/0c/c12c0c3ef0a757ea81298bf6d12db4b9.jpg)",
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
        <h3 className="font-bold text-2xl">MonsterBox</h3>
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
