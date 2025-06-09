import React, { useState } from "react";
import useAppData from "../../hooks/useAppData";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import { FaSearch, FaReply } from "react-icons/fa";

// --- Mock Data: Represents help requests for this department ---
const mockHelpRequests = [
  {
    id: "QRY-002",
    studentName: "Srijan Suryansh",
    studentId: "S12345",
    subject: "Payment not reflecting on dashboard",
    status: "In Progress",
    submittedDate: "2024-06-05",
    message:
      "I paid my library fine yesterday but it is still showing as pending on my dashboard. Can you please check?",
  },
  {
    id: "QRY-003",
    studentName: "Tanay Agrawal",
    studentId: "S67890",
    subject: "Question about hostel security deposit",
    status: "Open",
    submittedDate: "2024-06-07",
    message:
      "I have a question about when the security deposit for the hostel is refunded after graduation.",
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
 * A page for department staff to manage student help requests, styled with the clean, "white grayish" theme.
 */
const HelpRequests = () => {
  const { user } = useAppData();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = mockHelpRequests.filter(
    (req) =>
      req.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenReplyModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    alert(`Replying to query: ${selectedRequest.id}`);
    handleCloseModal();
  };

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Student Help Requests
        </h1>

        <Card title="Incoming Queries">
          <div className="relative mb-6">
            <Input
              name="search"
              placeholder="Search by Student Name, ID, or Subject..."
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
                    Student
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((req) => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-800">
                        {req.studentName}
                      </div>
                      <div className="text-gray-500">{req.studentId}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-800">{req.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                          req.status
                        )}`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {req.submittedDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button
                        variant="secondary"
                        onClick={() => handleOpenReplyModal(req)}
                      >
                        <FaReply />
                        <span>View / Reply</span>
                      </Button>
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
        title={`Reply to Query: ${selectedRequest?.id}`}
      >
        {selectedRequest && (
          <form onSubmit={handleSendReply} className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800">
                Subject: {selectedRequest.subject}
              </h4>
              <p className="text-sm text-gray-600">
                From: {selectedRequest.studentName} ({selectedRequest.studentId}
                )
              </p>
            </div>
            <div className="border p-4 rounded-md bg-gray-50">
              <p className="text-sm text-gray-700">{selectedRequest.message}</p>
            </div>
            <div>
              <label
                htmlFor="replyMessage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Reply
              </label>
              <textarea
                id="replyMessage"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                rows="6"
                placeholder="Type your response to the student..."
              ></textarea>
            </div>
            <div className="flex justify-between items-center pt-4">
              <div>
                <label
                  htmlFor="updateStatus"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Update Status
                </label>
                <select
                  id="updateStatus"
                  defaultValue={selectedRequest.status}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
              <Button type="submit" variant="primary">
                Send Reply
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default HelpRequests;
