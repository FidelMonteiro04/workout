import { apiURL } from "@/config/api";

interface DataRequest {
  email: string;
  password: string;
}

export const login = async (data: DataRequest) => {
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
