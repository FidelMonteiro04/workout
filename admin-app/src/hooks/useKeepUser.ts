import { useEffect } from "react";
import { User } from "@/interfaces/User";

export default function useKeepUser(
  token: string | undefined,
  redirect: () => void,
  callback: (user: User) => void
) {
  useEffect(() => {
    if (!token) {
      const recoverData = sessionStorage.getItem("user");
      if (!recoverData) {
        redirect();
        return;
      }
      const user = JSON.parse(recoverData);
      callback(user);
    }
  }, [token]);
}
