import React, { useState } from "react";
import useAppData from "../../hooks/useAppData";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import { FaSearch, FaPlus } from "react-icons/fa";

// --- Mock Data: Represents all dues managed by this department ---
const allDepartmentDues = [
  {
    id: "DUE-001",
    studentName: "Srijan Suryansh",
    studentId: "S12345",
    description: "Library Fine: Overdue Book",
    amount: "25.00",
    status: "Overdue",
  },
  {
    id: "DUE-004",
    studentName: "Tanay Agrawal",
    studentId: "S67890",
    description: "Library Fine: Damaged Book",
    amount: "75.00",
    status: "Pending",
  },
  {
    id: "DUE-005",
    studentName: "Siddesh Rizwani",
    studentId: "S11223",
    description: "Lost Book Fee",
    amount: "150.00",
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
 * Page for Department Staff to manage student dues, styled with the clean, "white grayish" theme.
 */
const ManageDues = () => {
  const { user } = useAppData();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDues = allDepartmentDues.filter(
    (due) =>
      due.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      due.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddNewDue = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveDue = (e) => {
    e.preventDefault();
    alert("This would save the new due to the database.");
    handleCloseModal();
  };

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Student Dues
        </h1>

        <Card>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-auto md:flex-grow">
              <Input
                name="search"
                placeholder="Search by student name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <Button
              onClick={handleAddNewDue}
              variant="primary"
              className="w-full md:w-auto"
            >
              <FaPlus />
              <span>Add New Due</span>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDues.map((due) => (
                  <tr key={due.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-800">
                        {due.studentName}
                      </div>
                      <div className="text-gray-500">{due.studentId}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-800">
                      {due.description}
                    </td>
                    <td className="px-6 py-4 text-gray-800">${due.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                          due.status
                        )}`}
                      >
                        {due.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Modal
        isVisible={isModalOpen}
        onClose={handleCloseModal}
        title="Add New Due"
      >
        <form onSubmit={handleSaveDue} className="space-y-4">
          <Input name="studentId" placeholder="Student ID" />
          <Input
            name="description"
            placeholder="Due Description (e.g., Lab breakage fee)"
          />
          <Input name="amount" type="number" placeholder="Amount ($)" />
          <Input name="dueDate" type="date" />
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Due
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ManageDues;
