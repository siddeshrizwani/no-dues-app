import React from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

/**
 * A reusable select input component for the reports page.
 */
const SelectInput = ({ id, label, options }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <select
      id={id}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

/**
 * Admin page for generating various system-wide reports.
 * Provides a UI for admins to select report types and apply filters.
 */
const SystemReports = () => {
  // Placeholder function to simulate report generation
  const handleGenerateReport = (e, reportName) => {
    e.preventDefault();
    alert(`Generating and exporting the "${reportName}"...`);
    // In a real application, this would trigger an API call
    // to a backend service that compiles and returns a CSV file.
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">System Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dues Report Card */}
        <Card title="Dues Status Report">
          <form
            className="space-y-4"
            onSubmit={(e) => handleGenerateReport(e, "Dues Status Report")}
          >
            <p className="text-sm text-gray-600">
              Generate a detailed report of all outstanding dues, with options
              to filter by department and status.
            </p>

            <SelectInput
              id="dues-dept"
              label="Department"
              options={["All Departments", "Library", "Hostel", "Laboratory"]}
            />

            <SelectInput
              id="dues-status"
              label="Status"
              options={["All", "Pending", "Overdue"]}
            />

            <div className="pt-2">
              <Button type="submit" variant="secondary">
                Generate & Export (CSV)
              </Button>
            </div>
          </form>
        </Card>

        {/* Clearance Status Report Card */}
        <Card title="Final Clearance Report">
          <form
            className="space-y-4"
            onSubmit={(e) => handleGenerateReport(e, "Final Clearance Report")}
          >
            <p className="text-sm text-gray-600">
              Get a report on the final clearance status of students, useful for
              graduation processing.
            </p>

            <SelectInput
              id="clearance-batch"
              label="Student Batch/Year"
              options={["2025", "2024", "2023"]}
            />

            <SelectInput
              id="clearance-status"
              label="Clearance Status"
              options={[
                "All Students",
                "Fully Cleared",
                "Awaiting Department Approval",
              ]}
            />

            <div className="pt-2">
              <Button type="submit" variant="secondary">
                Generate & Export (CSV)
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SystemReports;
