import React from "react";

const DepartmentSelector = ({
  selectedDepartment,
  onSelectDepartment,
  departments,
}) => {
  return (
    <div className="mb-6">
      <label
        htmlFor="department"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select Department
      </label>
      <select
        id="department"
        name="department"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        value={selectedDepartment}
        onChange={(e) => onSelectDepartment(e.target.value)}
      >
        <option value="">View All / Latest Uncleared</option>
        {departments.map((dept) => (
          <option key={dept.id} value={dept.id}>
            {dept.name}
          </option>
        ))}
      </select>
      <p className="mt-2 text-sm text-gray-500">
        Please select a department to view your detailed dues. If no department
        is selected, you will see a summary of your latest uncleared dues.
      </p>
    </div>
  );
};

export default DepartmentSelector;
