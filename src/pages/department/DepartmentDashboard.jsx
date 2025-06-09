import React from "react";
import useAppData from "../../hooks/useAppData";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import DueCard from "../../components/dashboard/DueCard";
import {
  FaFileInvoiceDollar,
  FaDollarSign,
  FaQuestionCircle,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// --- Mock Data: Replace with API calls specific to this department ---
const departmentStats = {
  pendingDuesCount: 32,
  totalAmountPending: 4850.75,
  pendingHelpRequests: 3,
};

const recentDues = [
  {
    id: "DUE-005",
    studentName: "Siddesh Rizwani",
    amount: "150.00",
    status: "Overdue",
  },
  {
    id: "DUE-004",
    studentName: "Tanay Agrawal",
    amount: "75.00",
    status: "Pending",
  },
  {
    id: "DUE-001",
    studentName: "Srijan Suryansh",
    amount: "25.00",
    status: "Overdue",
  },
];

const getStatusClasses = (status) => {
  switch (status) {
    case "Overdue":
      return "bg-red-100 text-red-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

/**
 * The main dashboard for Department Staff, styled with the clean, "white grayish" theme.
 */
const DepartmentDashboard = () => {
  const { user } = useAppData();
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Library Department Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.name}. Here's your department's summary.
          </p>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Button
            onClick={() => navigate("/dept/help-requests")}
            variant="secondary"
            className="w-full"
          >
            <FaQuestionCircle />
            <span>View Help Requests</span>
          </Button>
          <Button
            onClick={() => navigate("/dept/dues")}
            variant="primary"
            className="w-full"
          >
            <FaPlus />
            <span>Add New Due</span>
          </Button>
        </div>
      </div>

      {/* Summary Cards with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DueCard
          icon={<FaFileInvoiceDollar size={20} />}
          title="Pending Dues"
          value={departmentStats.pendingDuesCount}
          description="Active dues requiring action"
        />
        <DueCard
          icon={<FaDollarSign size={20} />}
          title="Total Amount Pending"
          value={`$${departmentStats.totalAmountPending.toFixed(2)}`}
          description="Across all pending dues"
        />
        <DueCard
          icon={<FaQuestionCircle size={20} />}
          title="Pending Help Requests"
          value={departmentStats.pendingHelpRequests}
          description="New queries from students"
        />
      </div>

      {/* Recent Activity Table */}
      <Card title="Recent Dues Activity">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDues.map((due) => (
                <tr key={due.id}>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {due.studentName}
                  </td>
                  <td className="px-6 py-4 text-gray-600">${due.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                        due.status
                      )}`}
                    >
                      {due.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-semibold text-gray-600 hover:text-gray-900">
                      Clear Due
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DepartmentDashboard;
