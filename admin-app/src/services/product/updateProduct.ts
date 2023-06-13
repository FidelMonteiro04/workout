import { apiURL } from "@/config/api";

interface DataRequest {
  _id: string;
  image?: string;
  name?: string;
  description?: string;
  price?: string;
  type?: string;
  distributor?: string;
}

export const updateProduct = async (
  data: DataRequest,
  token: string,
  placeId: string
) => {
  try {
    const response = await fetch(
      `${apiURL}/stores/${placeId}/products/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    return response;
  } catch (error) {
    return { error };
  }
};
