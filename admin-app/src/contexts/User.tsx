import { createContext, useState } from "react";
import { User } from "@/interfaces/User";

interface IUserContext {
  user: User;
  setUser: (user: User) => void;
}

export const UserContext = createContext({} as IUserContext);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>({
    token: "",
    ownType: undefined,
    ownId: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
