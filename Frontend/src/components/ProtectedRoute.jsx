import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../assets/context/AuthContext";

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    // ❌ Not logged in → redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // ✅ Logged in → allow access
    return children;
}

export default ProtectedRoute;
