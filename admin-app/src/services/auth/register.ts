import { apiURL } from "@/config/api";

interface DataRequest {
  name: string;
  email: string;
  password: string;
  cnpj: string;
}

export const register = async (data: DataRequest) => {
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { token } = await response.json();

    return token;
  } catch (error) {
    return { error };
  }
};
