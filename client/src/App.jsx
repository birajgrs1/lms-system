import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { Suspense } from "react";

const AuthPage = React.lazy(() => import("./pages/auth/AuthPage"));
const ResetPassword = React.lazy(() => import("./components/auth/ResetPassword"));
const PendingApprovalPage = React.lazy(() => import("./pages/auth/PendingApprovalPage"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const DashboardLayout = React.lazy(() => import("./components/layout/DashboardLayout"));
const StudentDashboard = React.lazy(() => import("./pages/dashboard/StudentDashboard"));
const InstructorDashboard = React.lazy(() => import("./pages/dashboard/InstructorDashboard"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}> 
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/pending-approval" element={<PendingApprovalPage />} />

        <Route element={<ProtectedRoute allowedRoles={["Student", "Instructor"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<RoleBasedDashboard />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Suspense>
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
