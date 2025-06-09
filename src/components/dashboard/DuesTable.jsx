import React from "react";
import Button from "../common/Button";
import Card from "../common/Card";
import { useUI } from "../../contexts/UIContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * A fully theme-aware DuesTable component with pagination.
 * This version handles dark mode manually within the component and fixes the previous crash.
 */
const DuesTable = ({
  title = "Dues",
  dues,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}) => {
  const { theme } = useUI();

  // --- Manual Theme-Aware Styling ---
  const isDark = theme === "dark";
  const headerBg = isDark ? "bg-gray-700/50" : "bg-gray-50";
  const headerColor = isDark ? "text-gray-300" : "text-gray-500";
  const rowBorderColor = isDark ? "divide-gray-700" : "divide-gray-200";
  const rowTextColor = isDark ? "text-gray-400" : "text-gray-500";
  const rowTextPrimaryColor = isDark ? "text-gray-100" : "text-gray-900";
  const linkColor = isDark
    ? "text-indigo-400 hover:text-indigo-300"
    : "text-indigo-600 hover:text-indigo-500";
  const paginationBorderColor = isDark ? "border-gray-700" : "border-gray-200";

  if (!dues || dues.length === 0) {
    return (
      <Card title={title}>
        <p className={rowTextColor}>No dues to display.</p>
      </Card>
    );
  }

  const getStatusClasses = (status) =>
    String(status || "").toLowerCase() === "overdue"
      ? "bg-red-100 text-red-700"
      : String(status || "").toLowerCase() === "pending"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-green-100 text-green-700";

  return (
    <Card title={title} className="!p-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className={headerBg}>
            <tr>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${headerColor}`}
              >
                ID
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${headerColor}`}
              >
                Description
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${headerColor}`}
              >
                Amount
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${headerColor}`}
              >
                Due Date
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${headerColor}`}
              >
                Status
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${headerColor}`}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${rowBorderColor}`}>
            {dues.map((due) => (
              <tr key={due.id}>
                <td className={`px-6 py-4 text-sm ${rowTextColor}`}>
                  {due.id}
                </td>
                <td
                  className={`px-6 py-4 text-sm font-medium ${rowTextPrimaryColor}`}
                >
                  {due.description}
                </td>
                <td className={`px-6 py-4 text-sm ${rowTextColor}`}>
                  ${parseFloat(due.amount || 0).toFixed(2)}
                </td>
                <td className={`px-6 py-4 text-sm ${rowTextColor}`}>
                  {due.dueDate}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                      due.status
                    )}`}
                  >
                    {due.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {String(due.status || "").toLowerCase() !== "paid" && (
                    <button className={`font-semibold ${linkColor}`}>
                      Pay Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div
          className={`p-4 border-t flex items-center justify-between ${paginationBorderColor}`}
        >
          <Button
            onClick={onPrevPage}
            disabled={currentPage === 1}
            variant="secondary"
          >
            <FaChevronLeft className="mr-2" />
            Previous
          </Button>
          <span className={`text-sm ${rowTextColor}`}>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            variant="secondary"
          >
            Next
            <FaChevronRight className="ml-2" />
          </Button>
        </div>
      )}
    </Card>
  );
};
export default DuesTable;
