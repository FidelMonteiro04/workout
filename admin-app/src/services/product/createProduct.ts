import { apiURL } from "@/config/api";

interface DataRequest {
  image: string;
  name: string;
  description: string;
  price: string;
  type: string;
  distributor?: string;
}

export const createProduct = async (
  data: DataRequest,
  token: string,
  placeId: string
) => {
  try {
    const response = await fetch(`${apiURL}/stores/${placeId}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const { id: productId } = await response.json();

    return { productId };
  } catch (error) {
    return { error };
  }
};
