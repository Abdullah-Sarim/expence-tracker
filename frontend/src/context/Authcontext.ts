import { createContext } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

const Authcontext = createContext<AuthContextType | null>(null);

export default Authcontext;