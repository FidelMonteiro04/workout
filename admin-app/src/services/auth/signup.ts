import { apiURL } from "@/config/api";

interface DataRequest {
  name: string;
  email: string;
  password: string;
  cnpj: string;
}

export const signup = async (data: DataRequest) => {
  try {
    const response = await fetch(`${apiURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { token } = await response.json();

    return { token };
  } catch (error) {
    return { error };
  }
};
