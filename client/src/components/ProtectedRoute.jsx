import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/auth" replace />;

  if (!user.isApproved) return <Navigate to="/pending-approval" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'Student') {
      return <Navigate to="/student" replace />;
    } else if (user.role === 'Instructor') {
      return <Navigate to="/instructor" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
