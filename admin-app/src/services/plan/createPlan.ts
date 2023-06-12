import { apiURL } from "@/config/api";

interface DataRequest {
  price: string;
  days: number;
}

export const createPlan = async (
  data: DataRequest | DataRequest[],
  token: string,
  placeId: string
) => {
  try {
    const response = await fetch(`${apiURL}/gyms/${placeId}/plans`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const { id: planId } = await response.json();

    return { planId };
  } catch (error) {
    return { error };
  }
};
