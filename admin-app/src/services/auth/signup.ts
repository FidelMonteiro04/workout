import { apiURL } from "@/config/api";

interface DataRequest {
  name: string;
  email: string;
  password: string;
  cnpj: string;
  ownType: "gym" | "store";
}

export const signup = async (data: DataRequest) => {
  try {
    const response = await fetch(`${apiURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const { token } = await response.json();

    sessionStorage.setItem(
      "user",
      JSON.stringify({ token, ownType: data.ownType })
    );

    return { token };
  } catch (error) {
    return { error };
  }
};
