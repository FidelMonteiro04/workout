import { apiURL } from "@/config/api";

interface DataRequest {
  image: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  instagram?: string;
  contact: string;
}

export const registerStore = async (data: DataRequest, token: string) => {
  try {
    const response = await fetch(`${apiURL}/stores`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const { id: storeId } = await response.json();

    return { storeId };
  } catch (error) {
    return { error };
  }
};
