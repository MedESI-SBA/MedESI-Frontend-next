"use client";

import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); 

  const login = () => {
    setIsAuthenticated(true);
    router.push("/dashboard"); 
  };

  const logout = () => {
    setIsAuthenticated(false);
    router.push("/"); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
