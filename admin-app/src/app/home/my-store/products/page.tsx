"use client";
import { useContext, useState } from "react";
import { ModalContext } from "@/contexts/Modal";
import { useRouter } from "next/navigation";

import { IProduct } from "@/interfaces/Product";

import ProductModal from "@/app/components/modals/Product";

import { BiSearch } from "react-icons/bi";
import Product from "@/app/components/Product";
import AddButton from "@/app/components/AddButton";
import useKeepUser from "@/hooks/useKeepUser";
import { UserContext } from "@/contexts/User";
import { getProducts } from "@/services/product/getProducts";

const ProductsPage = () => {
  const { user: { token, ...user }, setUser } = useContext(UserContext);
  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState("");

  const router = useRouter();

  useKeepUser(token, () => router.push("/auth/login"), (user) => {
    setUser(user)
    handleGetProducts(user.token, user?.ownId as string);
  }, (token) => handleGetProducts(token, user?.ownId as string));

  const onSearch = () => {
    console.log("onSearch");
    const filtereds: IProduct[] = [];
    for (let product of products) {
      let productName = product.name.toLowerCase();
      let isEqual = true;
      for (let letter in search.toLowerCase() as any) {
        let index = Number(letter);
        if (search[index] !== productName[index]) {
          isEqual = false;
          break;
        }
      }
      if (!isEqual) continue;
      filtereds.push(product);
    }

    setFilteredProducts(filtereds);
  };

  const handleGetProducts = async (token: string, storeId: string) => {
    try{
      const { products: resProducts } = await getProducts(token, storeId);
      setProducts(resProducts);
      setFilteredProducts(resProducts);
    }catch(err) {
      console.log(err);
    }
  }

  return (
    <>
      <ProductModal
        editData={editData}
        isOpen={modalOpened === "product"}
        onAdd={(product) => {
          setProducts((prev) => [
            { ...product, id: product.id || prev.length + 1 },
            ...prev,
          ]);
          setFilteredProducts((prev) => [
            { ...product, id: product.id || prev.length + 1 },
            ...prev,
          ]);
        }}
        onDelete={(id) => {
          setProducts((prev) => prev.filter((product) => product.id !== id));
          setFilteredProducts((prev) =>
            prev.filter((product) => product.id !== id)
          );
        }}
        onEdit={(product) => {
          setProducts((prev) =>
            prev.map((p) => (p.id === product.id ? product : p))
          );
          setFilteredProducts((prev) =>
            prev.map((p) => (p.id === product.id ? product : p))
          );
        }}
        onClose={() => {
          setEditData(null);
          setModalOpened(null);
        }}
      />
      <div className="flex w-full -mt-4 justify-between items-center mb-4">
        <div className="flex gap-2 px-2 items-center py-3 rounded-lg bg-zinc-100 text-zinc-400">
          <input
            placeholder="Pesquise por produtos..."
            className="outline-none bg-transparent placeholder:text-zinc-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={(event) => {
              if (event.key === "Enter") onSearch();
            }}
          />
          <BiSearch size={20} />
        </div>
        <AddButton onClick={() => setModalOpened("product")} />
      </div>
      <div className="grid grid-cols-fill gap-3 justify-center">
        {filteredProducts.map((product, index) => (
          <Product
            key={index}
            onClick={() => {
              setEditData(product);
              setModalOpened("product");
            }}
            {...{ ...product, img: product.image, id: product.id?.toString() }}
          />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
