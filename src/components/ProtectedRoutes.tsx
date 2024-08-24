import { Navigate } from "react-router-dom";
import { supabase } from "../api/supabaseClient";

// @ts-ignore
const ProtectedRoute = ({ children }) => {

    if (!supabase.auth.session) {
        return <Navigate to="/login" replace />;
    }
  return children;
};

export default ProtectedRoute;
