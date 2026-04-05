import { useContext } from "react";
import Authcontext from "../context/Authcontext"

export const useAuth = () => {
  const context = useContext(Authcontext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};