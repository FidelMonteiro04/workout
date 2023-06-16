import { apiURL } from "@/config/api";

export const getPlans = async (token: string, placeId: string) => {
  try {
    const response = await fetch(`${apiURL}/gyms/${placeId}/plans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { plans } = await response.json();

    return { plans };
  } catch (error) {
    return { error };
  }
};
