import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/auth" replace />;

  if (!user.isApproved) return <Navigate to="/pending-approval" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const roleToPath = {
      Student: "/dashboard",
      Instructor: "/dashboard"
    };
    
    return <Navigate to={roleToPath[user.role] || "/"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
