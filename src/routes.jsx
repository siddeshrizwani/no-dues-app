import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAppData from "./hooks/useAppData";

// --- Import all necessary components ---
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import StudentDashboard from "./pages/student/StudentDashboard";
import MyProfile from "./pages/student/MyProfile";
import HelpDesk from "./pages/student/HelpDesk";
import Notifications from "./pages/student/Notifications";
import CertificateStatus from "./pages/student/CertificateStatus";
import PaymentHistory from "./pages/student/PaymentHistory";
import DepartmentDashboard from "./pages/department/DepartmentDashboard";
import ManageDues from "./pages/department/ManageDues";
import HelpRequests from "./pages/department/HelpRequests";
import ClearanceRequests from "./pages/department/ClearanceRequests";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageDepartments from "./pages/admin/ManageDepartments";
import ManageStaff from "./pages/admin/ManageStaff"; // This import will now work correctly
import SystemReports from "./pages/admin/SystemReports";
import AuditLog from "./pages/admin/AuditLog";
import SystemSettings from "./pages/admin/SystemSettings";

/**
 * The main router for the application.
 */
const AppRoutes = () => {
  const { user } = useAppData();

  const HomeRedirect = () => {
    if (!user) return <Navigate to="/login" replace />;
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "department":
        return <Navigate to="/dept/dashboard" replace />;
      case "student":
      default:
        return <Navigate to="/student/dashboard" replace />;
    }
  };

  return (
    <Routes>
      <Route path="/login" element={user ? <HomeRedirect /> : <LoginPage />} />

      <Route
        path="/*"
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<HomeRedirect />} />

        {/* Student Routes */}
        <Route path="student/dashboard" element={<StudentDashboard />} />
        <Route
          path="student/certificate-status"
          element={<CertificateStatus />}
        />
        <Route path="student/payment-history" element={<PaymentHistory />} />
        <Route path="student/profile" element={<MyProfile />} />
        <Route path="student/help" element={<HelpDesk />} />
        <Route path="student/notifications" element={<Notifications />} />

        {/* Department Routes */}
        <Route path="dept/dashboard" element={<DepartmentDashboard />} />
        <Route path="dept/clearance-requests" element={<ClearanceRequests />} />
        <Route path="dept/dues" element={<ManageDues />} />
        <Route path="dept/help-requests" element={<HelpRequests />} />

        {/* Admin Routes */}
        <Route path="admin/dashboard" element={<AdminDashboard />} />
        <Route path="admin/reports" element={<SystemReports />} />
        <Route path="admin/departments" element={<ManageDepartments />} />
        <Route path="admin/staff" element={<ManageStaff />} />
        <Route path="admin/audit-log" element={<AuditLog />} />
        <Route path="admin/settings" element={<SystemSettings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
