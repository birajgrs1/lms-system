import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage";
import ResetPassword from "./components/auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import InstructorDashboard from "./pages/dashboard/InstructorDashboard";
import PendingApprovalPage from "./pages/auth/PendingApprovalPage";
import { useSelector } from "react-redux";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/pending-approval" element={<PendingApprovalPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute allowedRoles={["Student", "Instructor"]} />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={<RoleBasedDashboard />}
          />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );
};

const RoleBasedDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  
  switch(user?.role) {
    case "Student":
      return <StudentDashboard />;
    case "Instructor":
      return <InstructorDashboard />;
    default:
      return <Navigate to="/auth" replace />;
  }
};

export default App;
