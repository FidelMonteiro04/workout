import { apiURL } from "@/config/api";

interface DataRequest {
  name?: string;
  cnpj?: string;
  email?: string;
}

export const updateOwner = async (token: string, data: DataRequest) => {
  try {
    const response = await fetch(`${apiURL}/owners`, {
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
