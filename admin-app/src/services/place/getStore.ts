import { apiURL } from "@/config/api";

export const getStore = async (token: string) => {
  try {
    const response = await fetch(`${apiURL}/stores`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const store = await response.json();

    return store;
  } catch (error) {
    return { error };
  }
};
