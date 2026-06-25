import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // FIX: Explicitly check for the exact string "true". 
  // If it is "false", null, undefined, or missing entirely, they are BOOTED.
  if (isLoggedIn !== "true") {
    return <Navigate to="/login" replace />;
  }

  // Role verification block
  if (role && user?.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;