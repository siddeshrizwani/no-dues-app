import React from "react";
import Card from "../../components/common/Card";
import DueCard from "../../components/dashboard/DueCard";
import {
  FaUsers,
  FaCheckCircle,
  FaExclamationCircle,
  FaUniversity,
} from "react-icons/fa";
// FIX: The import path now correctly points to the existing 'dashboard' components folder.
import {
  DuesByDepartmentChart,
  ClearanceStatusChart,
} from "../../components/dashboard/AnalyticsCharts.jsx";

/**
 * The main dashboard for Administrators, now featuring interactive charts.
 */
const AdminDashboard = () => {
  // Mock data for summary cards
  const systemStats = {
    totalStudents: 1250,
    studentsCleared: 800,
    duesPending: 450,
    totalDepartments: 12,
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Administrator Dashboard
      </h1>

      {/* System-wide Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DueCard
          icon={<FaUsers size={20} />}
          title="Total Students"
          value={systemStats.totalStudents.toLocaleString()}
        />
        <DueCard
          icon={<FaCheckCircle size={20} />}
          title="Students Cleared"
          value={systemStats.studentsCleared.toLocaleString()}
        />
        <DueCard
          icon={<FaExclamationCircle size={20} />}
          title="Dues Pending"
          value={systemStats.duesPending.toLocaleString()}
        />
        <DueCard
          icon={<FaUniversity size={20} />}
          title="Total Departments"
          value={systemStats.totalDepartments.toLocaleString()}
        />
      </div>

      {/* Interactive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card title="Department Dues Overview">
            <DuesByDepartmentChart />
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title="Clearance Rate">
            <ClearanceStatusChart />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
