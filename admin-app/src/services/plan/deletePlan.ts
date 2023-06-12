import { apiURL } from "@/config/api";

export const deletePlan = async (
  planId: string,
  token: string,
  placeId: string
) => {
  try {
    const response = await fetch(`${apiURL}/gyms/${placeId}/plans/${planId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    return { error };
  }
};
