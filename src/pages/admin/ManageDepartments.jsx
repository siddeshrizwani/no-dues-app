import React, { useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const mockDepartments = [
  { id: "DEPT-01", name: "Library", manager: "Mr. Ankit Sharma" },
  { id: "DEPT-02", name: "Hostel", manager: "Mrs. Priya Gupta" },
  { id: "DEPT-03", name: "Laboratory", manager: "Dr. Ramesh Singh" },
  { id: "DEPT-04", name: "Activity Center", manager: "Ms. Sunita Rao" },
  { id: "DEPT-05", name: "Accounts", manager: "Mr. Vikram Mehta" },
];

export default function ManageDepartments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);

  const handleOpenModal = (department = null) => {
    setEditingDepartment(department);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    alert(
      editingDepartment
        ? `Updating department: ${editingDepartment.name}`
        : "Adding new department..."
    );
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      alert(`Deleting department with ID: ${id}`);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Manage Departments</h1>
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-gray-700">
              All University Departments
            </h4>
            <Button onClick={() => handleOpenModal()} variant="primary">
              <FaPlus />
              <span>Add New</span>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Department ID
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Department Name
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Assigned Manager
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDepartments.map((dept) => (
                  <tr key={dept.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {dept.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                      {dept.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {dept.manager}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleOpenModal(dept)}
                          className="text-gray-400 hover:text-gray-800"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(dept.id)}
                          className="text-gray-400 hover:text-red-600"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
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
        title={editingDepartment ? "Edit Department" : "Add New Department"}
      >
        <form onSubmit={handleSaveChanges} className="space-y-4">
          <Input
            name="departmentName"
            placeholder="Department Name"
            defaultValue={editingDepartment?.name}
          />
          <Input
            name="managerName"
            placeholder="Assigned Manager's Name"
            defaultValue={editingDepartment?.manager}
          />
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
