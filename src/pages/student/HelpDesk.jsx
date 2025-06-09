import React, { useState } from "react";
import useAppData from "../../hooks/useAppData";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { FaSearch } from "react-icons/fa";

// --- Mock Data: Replace with API calls ---
const mockDepartments = [
  "Library",
  "Hostel",
  "Laboratory",
  "Accounts",
  "Technical Support",
  "General Inquiry",
];

const existingQueries = [
  {
    id: "QRY-001",
    department: "Library",
    subject: "Incorrect library fine applied",
    status: "Resolved",
    lastUpdate: "2024-05-21",
  },
  {
    id: "QRY-002",
    department: "Accounts",
    subject: "Payment not reflecting on dashboard",
    status: "In Progress",
    lastUpdate: "2024-06-05",
  },
  {
    id: "QRY-003",
    department: "Technical Support",
    subject: "Technical issue with NDC download",
    status: "Open",
    lastUpdate: "2024-06-07",
  },
];

const getStatusClasses = (status) => {
  switch (status) {
    case "Resolved":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-yellow-100 text-yellow-800";
    case "Open":
    default:
      return "bg-red-100 text-red-800";
  }
};

/**
 * The "Help Desk" page for students, styled with the clean, "white grayish" theme.
 * Allows submitting new support queries and viewing the status of existing ones.
 */
const HelpDesk = () => {
  const { user } = useAppData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQueries = existingQueries.filter(
    (query) =>
      query.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      query.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    alert("This would trigger the logic to submit the new query.");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Help Desk & Support</h1>

      {/* Submit New Query Card */}
      <Card title="Submit a New Query">
        <p className="mb-6 text-sm text-gray-600">
          Have an issue with a due or a technical problem? Select a department
          and describe your issue.
        </p>
        <form className="space-y-4" onSubmit={handleQuerySubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <option>Select a Department...</option>
                {mockDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            name="subject"
            placeholder="Subject of your query (e.g., Question about hostel due)"
          />
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            rows="5"
            placeholder="Please describe your issue in detail..."
          ></textarea>
          <div className="pt-2">
            <Button type="submit" variant="primary">
              Submit Query
            </Button>
          </div>
        </form>
      </Card>

      {/* Existing Queries Card */}
      <Card title="My Existing Queries">
        <div className="relative mb-6">
          <Input
            name="search"
            placeholder="Search by ID, subject, or department..."
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
                  Query ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredQueries.map((query) => (
                <tr key={query.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {query.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {query.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {query.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                        query.status
                      )}`}
                    >
                      {query.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {query.lastUpdate}
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

export default HelpDesk;
