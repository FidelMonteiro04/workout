import { apiURL } from "@/config/api";

interface DataRequest {
  _id: string;
  price?: string;
  days?: number;
}

export const updatePlan = async (
  data: DataRequest,
  token: string,
  placeId: string
) => {
  try {
    const response = await fetch(
      `${apiURL}/gyms/${placeId}/plans/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    return response;
  } catch (error) {
    return { error };
  }
};
