import { createContext, useState } from "react";
import { TOKEN } from "../constant";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Cookies.get(TOKEN) || false
  );
  const state = {
    isAuthenticated,
    setIsAuthenticated,
  };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
