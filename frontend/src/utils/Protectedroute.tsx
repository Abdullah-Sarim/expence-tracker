import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useauth";
import { type JSX } from "react";
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

 
  return children;
};

export default ProtectedRoute;