import { useState } from "react";
import toast from "react-hot-toast";

import AuthContext from "./AuthContext";
import { getCurrentUser, loginUser } from "../api/authApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = async (credentials) => {
    const response = await loginUser(credentials);

    localStorage.setItem(
      "access_token",
      response.access_token
    );

    const currentUser = await getCurrentUser();

    localStorage.setItem(
      "user",
      JSON.stringify(currentUser)
    );

    setUser(currentUser);

    return currentUser;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    setUser(null);

    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};