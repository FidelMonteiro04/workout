import { apiURL } from "@/config/api";

export const getGym = async (token: string) => {
  try {
    const response = await fetch(`${apiURL}/gyms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { gym } = await response.json();

    return { gym };
  } catch (error) {
    return { error };
  }
};
