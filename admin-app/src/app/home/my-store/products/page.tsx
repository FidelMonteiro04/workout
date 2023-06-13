"use client";
import { useContext, useState } from "react";
import { ModalContext } from "@/contexts/Modal";
import { useRouter } from "next/navigation";

import { cloudinaryURL } from "@/config/cloudinary";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "@/services/product";
import { deleteImage } from "@/services/deleteImage";

import { IProduct } from "@/interfaces/Product";

import ProductModal from "@/app/components/modals/Product";

import { BiSearch } from "react-icons/bi";
import Product from "@/app/components/Product";
import AddButton from "@/app/components/AddButton";
import useKeepUser from "@/hooks/useKeepUser";
import { UserContext } from "@/contexts/User";
import Loading from "@/app/components/Loading";

const ProductsPage = () => {
  const {
    user: { token, ...user },
    setUser,
  } = useContext(UserContext);

  const { modalOpened, setModalOpened, editData, setEditData } =
    useContext(ModalContext);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

  const [search, setSearch] = useState("");

  const [loadingProducts, setLoadingProducts] = useState(false);

  const router = useRouter();

  useKeepUser(
    token,
    () => router.push("/auth/login"),
    (user) => {
      setUser(user);
      handleGetProducts(user.token, user?.ownId as string);
    },
    (token) => handleGetProducts(token, user?.ownId as string)
  );

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
    setLoadingProducts(true);
    try {
      const { products: resProducts } = await getProducts(token, storeId);
      setProducts(resProducts);
      setFilteredProducts(resProducts);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingProducts(false);
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

    const updatedData = [{ ...data, _id: productId }, ...products];

    setProducts(updatedData);
    setFilteredProducts(updatedData);
  };

  const handleDeleteProduct = async (id: string, urlImage: string) => {
    try {
      await deleteProduct(id, token, user?.ownId as string);
      await deleteImage(urlImage);

      const updatedData = products.filter((product) => product._id !== id);

      setProducts(updatedData);
      setFilteredProducts(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = async (data: any) => {
    const newImage = data.image !== editData.image;
    let formattedData = { ...data };

    try {
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

        console.log("Dados da imagem: ", { url, ...rest });

        formattedData.image = url;

        await deleteImage(editData.image);
      }

      await updateProduct(formattedData, token, user.ownId as string);
    } catch (err) {
      console.log(err);
      return;
    }

    const updatedData = products.map((p) =>
      p._id === formattedData._id ? formattedData : p
    );

    setProducts(updatedData);
    setFilteredProducts(updatedData);
  };

  return (
    <>
      <ProductModal
        editData={editData}
        isOpen={modalOpened === "product"}
        onAdd={(product) => handleAddProduct(product)}
        onDelete={(id, urlImage) => handleDeleteProduct(id, urlImage)}
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
      <div className="flex w-full -mt-4 justify-between items-center mb-4">
        <div className="flex gap-2 px-2 items-center py-3 rounded-lg bg-zinc-100 text-zinc-400">
          <input
            placeholder="Pesquise por produtos..."
            className="outline-none bg-transparent placeholder:text-zinc-400"
            value={search}
            onChange={
              !loadingProducts ? (e) => setSearch(e.target.value) : () => null
            }
            onKeyUp={
              !loadingProducts
                ? (event) => {
                    if (event.key === "Enter") onSearch();
                  }
                : () => null
            }
          />
          <BiSearch size={20} />
        </div>
        <AddButton onClick={() => setModalOpened("product")} />
      </div>

      {loadingProducts ? (
        <div className="mt-3 flex items-center font-semibold gap-3 text-lg">
          <Loading alternative="whiteBg" size={32} thickness={3} />
          Carregando produtos...
        </div>
      ) : null}
      {!products.length && !loadingProducts && (
        <h3 className="self-center text-sm lg:text-base">
          Parece que não há nenhum produto ainda...
        </h3>
      )}
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
