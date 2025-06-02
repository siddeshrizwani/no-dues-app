import React from "react";
import Card from "../ui/Card";

const UpcomingPayments = ({ payments }) => {
  if (!payments || payments.length === 0) {
    return (
      <Card title="Upcoming Payments">
        <p className="text-gray-500">No upcoming payments.</p>
      </Card>
    );
  }

  const getStatusClasses = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-status-pending text-text-pending";
      case "paid":
        return "bg-status-paid text-text-paid";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card title="Upcoming Payments">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-200">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity/Amount
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payments.map((payment, index) => (
              <tr key={index}>
                {" "}
                {/* Use a proper ID if available */}
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.date}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.description}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${parseFloat(payment.quantity).toFixed(2)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
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
  );
};

export default UpcomingPayments;
