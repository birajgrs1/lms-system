import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/auth" replace />;
  if (!user.isApproved) return <Navigate to="/pending-approval" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const roleToPath = {
      Student: "/dashboard/student",
      Instructor: "/dashboard",
    };
    return <Navigate to={roleToPath[user.role] || "/"} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;