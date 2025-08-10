import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";

const AuthPage = React.lazy(() => import("./pages/auth/AuthPage"));
const ResetPassword = React.lazy(() => import("./components/auth/ResetPassword"));
const PendingApprovalPage = React.lazy(() => import("./pages/auth/PendingApprovalPage"));
const ProtectedRoute = React.lazy(() => import("./components/ProtectedRoute"));
const DashboardLayout = React.lazy(() => import("./components/layout/DashboardLayout"));
const StudentDashboard = React.lazy(() => import("./pages/dashboard/StudentDashboard"));
const InstructorLayout = React.lazy(() => import("./pages/dashboard/InstructorDashboard"));
const AddNewCourses = React.lazy(() => import("./components/instructor-view/courses/AddNewCourses"));
const InstructorCourse = React.lazy(() => import("./components/instructor-view/courses/InstructorCourse"));

const App = () => {
  return (
    <Suspense fallback={<div className="loader"></div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/pending-approval" element={<PendingApprovalPage />} />

        <Route element={<ProtectedRoute allowedRoles={["Student", "Instructor"]} />}>
          <Route element={<DashboardLayout />}>
            <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
              <Route path="/dashboard/student" element={<StudentDashboard />} />
            </Route>
            
            <Route element={<ProtectedRoute allowedRoles={["Instructor"]} />}>
              <Route path="/dashboard" element={<InstructorLayout />} end>
                <Route index element={<div>Instructor Dashboard Content</div>} />
                <Route path="courses" element={<InstructorCourse />} />
                <Route path="add-new-courses" element={<AddNewCourses />} />
                <Route path="profile" element={<div>Profile Content</div>} />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;
