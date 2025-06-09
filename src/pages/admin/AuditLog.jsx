import React, { useState } from "react";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";

// --- Mock Data: Replace with data from your API ---
const mockAuditLog = [
  {
    id: "LOG-001",
    timestamp: "2025-06-07 14:30:15",
    user: "admin@university.edu",
    action: 'DELETED Department: "Sports"',
  },
  {
    id: "LOG-002",
    timestamp: "2025-06-07 11:05:42",
    user: "library@university.edu",
    action: "CLEARED due for student S12345",
  },
  {
    id: "LOG-003",
    timestamp: "2025-06-06 16:20:00",
    user: "Srijan Suryansh (S12345)",
    action: "APPLIED for No Dues Certificate",
  },
  {
    id: "LOG-004",
    timestamp: "2025-06-06 09:00:10",
    user: "hostel@university.edu",
    action: "ADDED new due for student S67890 ($50.00)",
  },
  {
    id: "LOG-005",
    timestamp: "2025-06-05 18:15:22",
    user: "admin@university.edu",
    action: 'ASSIGNED priya.gupta@university.edu to "Hostel" department',
  },
];

/**
 * Admin page for viewing the system audit log.
 * Displays a chronological list of all significant actions taken within the application.
 */
const AuditLog = () => {
  const [logs] = useState(mockAuditLog); // In real app, you'd fetch and filter this

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">System Audit Log</h1>

      <Card>
        {/* Filtering Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 pb-6 border-b border-gray-200">
          <Input
            name="searchUser"
            placeholder="Filter by user or action..."
            className="w-full md:w-1/3"
          />
          <Input name="dateFilter" type="date" className="w-full md:w-auto" />
        </div>

        {/* Log Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Action Performed
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono">
                    {log.timestamp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {log.action}
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

export default AuditLog;
