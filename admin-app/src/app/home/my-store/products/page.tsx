"use client";
import { useContext, useState, useEffect } from "react";
import ProductModal from "@/app/components/modals/Product";
import { ModalContext } from "@/contexts/Modal";
import { IProduct } from "@/interfaces/Product";

import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import Product from "@/app/components/Product";
import AddButton from "@/app/components/AddButton";

const mockProduct = {
  id: Math.floor(Math.random() * 100),
  image:
    "https://integralmedica.vteximg.com.br/arquivos/ids/164894-350-350/DARKNESS-CREATINE-ME3129-2_TAMPA-1000x1000.png?v=638119151036900000",
  name: "Creatina",
  description: "Qualquer texto aleatório convincente",
  price: "89,90",
  distributor: "DistMonster",
};

const ProductsPage = () => {
  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);
  const [products, setProducts] = useState<IProduct[]>(
    Array(20).fill(mockProduct)
  );
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

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
        <Product
          img="https://integralmedica.vteximg.com.br/arquivos/ids/164894-350-350/DARKNESS-CREATINE-ME3129-2_TAMPA-1000x1000.png?v=638119151036900000"
          name="Juliana"
          price="89,90"
          onClick={() => null}
          distributor="DistMonster"
        />
      </div>
    </>
  );
};

export default ProductsPage;
