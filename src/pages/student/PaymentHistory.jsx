import React, { useState } from "react";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import { FaSearch } from "react-icons/fa";

// --- Mock Data: Represents a student's entire payment history ---
const mockPaymentHistory = [
  {
    id: "TXN-001",
    date: "2025-05-15",
    description: "Library Fine: Overdue Book",
    amount: 25.0,
    status: "Successful",
  },
  {
    id: "TXN-002",
    date: "2025-02-01",
    description: "Semester 8 Tuition Fee",
    amount: 1250.0,
    status: "Successful",
  },
  {
    id: "TXN-003",
    date: "2024-10-15",
    description: "Hostel Fee: October",
    amount: 300.0,
    status: "Successful",
  },
  {
    id: "TXN-004",
    date: "2024-08-01",
    description: "Semester 7 Tuition Fee",
    amount: 1250.0,
    status: "Successful",
  },
];

const getStatusClasses = (status) => {
  return status === "Successful"
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
};

/**
 * Page for students to view their complete payment history.
 */
const PaymentHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = mockPaymentHistory.filter((payment) =>
    payment.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>

      <Card>
        <div className="relative mb-6">
          <Input
            name="search"
            placeholder="Search by description..."
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
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  Date Paid
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                    {payment.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
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

export default PaymentHistory;
