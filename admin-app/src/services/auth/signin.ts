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

    const { token, ownType } = await response.json();

    sessionStorage.setItem("user", JSON.stringify({ token, ownType }));

    return { token, ownType };
  } catch (error) {
    return { error };
  }
};
