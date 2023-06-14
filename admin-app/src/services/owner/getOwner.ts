import { apiURL } from "@/config/api";

export const getOwner = async (token: string) => {
  try {
    const response = await fetch(`${apiURL}/owners`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { owner } = await response.json();

    return { owner };
  } catch (error) {
    return { error };
  }
};
