import { apiURL } from "@/config/api";

export const getProducts = async (token: string, placeId: string) => {
  try {
    const response = await fetch(`${apiURL}/stores/${placeId}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const { products } = await response.json();

    return { products };
  } catch (error) {
    return { error };
  }
};
