import { apiURL } from "@/config/api";

interface DataRequest {
  image?: string;
  name?: string;
  address?: string;
  lat?: number;
  lng?: number;
  instagram?: string;
  contact?: string;
}

export const updateStore = async (
  data: DataRequest,
  token: string,
  storeId: string
) => {
  try {
    const response = await fetch(`${apiURL}/stores/${storeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    return { error };
  }
};
