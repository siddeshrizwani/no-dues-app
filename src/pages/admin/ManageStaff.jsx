import React, { useState } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Input from "../../components/common/Input";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

// --- Mock Data: Replace with data from your API ---
const mockStaff = [
  {
    id: "USER-001",
    name: "Mr. Ankit Sharma",
    email: "ankit.sharma@university.edu",
    role: "Department Staff",
    department: "Library",
  },
  {
    id: "USER-002",
    name: "Mrs. Priya Gupta",
    email: "priya.gupta@university.edu",
    role: "Department Staff",
    department: "Hostel",
  },
  {
    id: "USER-003",
    name: "Dr. Ramesh Singh",
    email: "ramesh.singh@university.edu",
    role: "Department Staff",
    department: "Laboratory",
  },
  {
    id: "USER-004",
    name: "Admin User",
    email: "admin@university.edu",
    role: "Admin",
    department: "N/A",
  },
];

/**
 * Admin page for managing staff members and their roles.
 * Allows viewing, adding, and editing staff accounts.
 */
// FIX: Changed from named export to default export to resolve the build error.
export default function ManageStaff() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);

  const handleOpenModal = (staff = null) => {
    setEditingStaff(staff);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    alert(
      editingStaff
        ? `Updating staff member: ${editingStaff.name}`
        : "Adding new staff member..."
    );
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this staff member?")) {
      alert(`Removing staff member with ID: ${id}`);
    }
  };

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Staff & Roles
        </h1>
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-gray-700">
              All Staff Members
            </h4>
            <Button onClick={() => handleOpenModal()} variant="primary">
              <FaPlus />
              <span>Add New Staff</span>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockStaff.map((staff) => (
                  <tr key={staff.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-800">
                        {staff.name}
                      </div>
                      <div className="text-gray-500">{staff.email}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-800">{staff.role}</td>
                    <td className="px-6 py-4 text-gray-800">
                      {staff.department}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleOpenModal(staff)}
                          className="text-gray-400 hover:text-gray-800"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(staff.id)}
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
        title={editingStaff ? "Edit Staff Member" : "Add New Staff Member"}
      >
        <form onSubmit={handleSaveChanges} className="space-y-4">
          <Input
            name="name"
            placeholder="Full Name"
            defaultValue={editingStaff?.name}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            defaultValue={editingStaff?.email}
          />
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              defaultValue={editingStaff?.role || "Department Staff"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            >
              <option>Department Staff</option>
              <option>Admin</option>
            </select>
          </div>
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
              defaultValue={editingStaff?.department}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            >
              <option value="N/A">N/A (for Admins)</option>
              <option>Library</option>
              <option>Hostel</option>
              <option>Laboratory</option>
            </select>
          </div>
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
