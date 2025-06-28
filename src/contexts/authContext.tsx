import { createContext, useContext, useState, type ReactNode } from "react";
import { clearStorage, setStorage } from "../helpers/LocalStorage.ts";
import type { User } from "../interfaces/userInterface";

interface AuthContextType {
  user: User;
  isAuth: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({} as User);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  
  const login = (user: User) => {
    setStorage("user", user);
    setStorage("isAdmin", user.isAdmin);
    setUser(user);
    setIsAuth(true);
  };

  const logout = () => {
    clearStorage();
    setUser({} as User);
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};