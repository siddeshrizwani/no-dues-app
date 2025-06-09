import React, { useState } from "react";
import useAppData from "../../hooks/useAppData";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { FaSearch, FaCheck, FaTimes } from "react-icons/fa";

// --- Mock Data: Represents clearance requests for this department ---
const mockClearanceRequests = [
  {
    id: "APP-001",
    studentName: "Srijan Suryansh",
    studentId: "S12345",
    requestDate: "2025-06-08",
    status: "Pending",
  },
  {
    id: "APP-002",
    studentName: "Tanay Agrawal",
    studentId: "S67890",
    requestDate: "2025-06-08",
    status: "Pending",
  },
  {
    id: "APP-003",
    studentName: "Siddesh Rizwani",
    studentId: "S11223",
    requestDate: "2025-06-07",
    status: "Pending",
  },
];

/**
 * Page for Department Staff to review and approve/reject No Dues Certificate applications.
 */
const ClearanceRequests = () => {
  const { user } = useAppData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = mockClearanceRequests.filter(
    (req) =>
      req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Placeholder functions for actions
  const handleApprove = (id) => {
    alert(`Approving clearance for application: ${id}`);
  };

  const handleReject = (id) => {
    if (
      window.confirm(
        "Are you sure you want to reject this clearance request? You may need to add a due for this student first."
      )
    ) {
      alert(`Rejecting clearance for application: ${id}`);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        NDC Clearance Requests
      </h1>

      <Card>
        <div className="relative mb-6">
          <Input
            name="search"
            placeholder="Search by Student Name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((req) => (
                <tr key={req.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-800">
                      {req.studentName}
                    </div>
                    <div className="text-gray-500">{req.studentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {req.requestDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Button
                        onClick={() => handleApprove(req.id)}
                        className="!bg-green-500 hover:!bg-green-600 focus:!ring-green-500 text-white"
                      >
                        <FaCheck />
                        <span>Approve</span>
                      </Button>
                      <Button
                        onClick={() => handleReject(req.id)}
                        className="!bg-red-500 hover:!bg-red-600 focus:!ring-red-500 text-white"
                      >
                        <FaTimes />
                        <span>Reject</span>
                      </Button>
                    </div>
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

export default ClearanceRequests;
