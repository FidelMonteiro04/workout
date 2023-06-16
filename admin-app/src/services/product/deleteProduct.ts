import { apiURL } from "@/config/api";

export const deleteProduct = async (
  productId: string,
  token: string,
  placeId: string
) => {
  try {
    const response = await fetch(
      `${apiURL}/stores/${placeId}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    return { error };
  }
};
