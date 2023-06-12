import { apiURL } from "@/config/api";

interface DataRequest {
  image: string;
  personals: string;
  address: string;
  lat: number;
  lng: number;
  instagram?: string;
  contact: string;
}

export const registerGym = async (data: DataRequest, token: string) => {
  try {
    const response = await fetch(`${apiURL}/gyms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const { id: gymId } = await response.json();

    return { gymId };
  } catch (error) {
    return { error };
  }
};
