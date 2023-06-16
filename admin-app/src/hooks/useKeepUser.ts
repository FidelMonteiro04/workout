import { useEffect } from "react";
import { User } from "@/interfaces/User";

export default function useKeepUser(
  token: string | undefined,
  redirect: () => void,
  callback: (user: User) => void,
  keepOnToken?: (token: string) => Promise<void> | void
) {
  useEffect(() => {
    console.log("Chamou o keep user!");
    if (!token && typeof window !== "undefined") {
      const recoverData = sessionStorage.getItem("user");
      if (!recoverData) {
        redirect();
        return;
      }
      const user = JSON.parse(recoverData);
      console.log("Dados recuperados: ", user);
      callback(user);
    } else if (keepOnToken && token) {
      keepOnToken(token);
    }
  }, [token]);
}
