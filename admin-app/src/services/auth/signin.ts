import { apiURL } from "@/config/api";

interface DataRequest {
  email: string;
  password: string;
}

export const signin = async (data: DataRequest) => {
  try {
    const response = await fetch(`${apiURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { token } = await response.json();

    return token;
  } catch (error) {
    return { error };
  }
};
