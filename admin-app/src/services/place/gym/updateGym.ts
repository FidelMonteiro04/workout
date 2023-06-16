import { apiURL } from "@/config/api";

interface DataRequest {
  image?: string;
  name?: string;
  personals?: string;
  address?: string;
  lat?: number;
  lng?: number;
  instagram?: string;
  contact?: string;
  airConditioner?: boolean;
  accessbility?: boolean;
}

export const updateGym = async (
  data: DataRequest,
  token: string,
  gymId: string
) => {
  try {
    const response = await fetch(`${apiURL}/gyms/${gymId}`, {
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
