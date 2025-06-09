import React from "react";
import useAppData from "../../hooks/useAppData";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaDownload,
  FaPaperPlane,
} from "react-icons/fa";

// --- Mock Data: Represents the student's application status ---
const applicationData = {
  status: "Pending", // Change to 'Not Applied' or 'Issued' to see different states
  allDuesCleared: true,
  departments: [
    { name: "Library", status: "Approved", date: "2025-06-07" },
    { name: "Hostel", status: "Approved", date: "2025-06-07" },
    { name: "Laboratory", status: "Pending", date: null },
    { name: "Accounts", status: "Pending", date: null },
  ],
  adminApproval: { status: "Pending", date: null },
};

const StatusIcon = ({ status }) => {
  switch (status) {
    case "Approved":
      return <FaCheckCircle className="text-green-500" />;
    case "Pending":
      return <FaClock className="text-yellow-500 animate-pulse" />;
    case "Rejected":
      return <FaTimesCircle className="text-red-500" />;
    default:
      return null;
  }
};

/**
 * The page for students to apply for and track their No Dues Certificate.
 */
const CertificateStatus = () => {
  const { user } = useAppData();

  const renderApplyButton = () => {
    if (applicationData.status === "Not Applied") {
      return (
        <Button variant="primary" disabled={!applicationData.allDuesCleared}>
          <FaPaperPlane />
          <span>Apply for Certificate</span>
        </Button>
      );
    }
    return null;
  };

  const renderDownloadButton = () => {
    if (applicationData.status === "Issued") {
      return (
        <Button variant="primary">
          <FaDownload />
          <span>Download Certificate (PDF)</span>
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        No Dues Certificate Status
      </h1>

      {/* Main Status Card */}
      <Card>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Overall Application Status
          </h3>
          <p
            className={`text-2xl font-bold mt-2 ${
              applicationData.status === "Issued"
                ? "text-green-500"
                : "text-gray-900"
            }`}
          >
            {applicationData.status}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {applicationData.status === "Pending" &&
              "Your application is being reviewed by various departments."}
            {applicationData.status === "Not Applied" &&
              (applicationData.allDuesCleared
                ? "You are eligible to apply."
                : "Clear all pending dues to apply.")}
            {applicationData.status === "Issued" &&
              "Congratulations! Your certificate has been issued."}
          </p>
          <div className="mt-6">
            {renderApplyButton()}
            {renderDownloadButton()}
          </div>
        </div>
      </Card>

      {/* Approval Timeline */}
      {applicationData.status !== "Not Applied" && (
        <Card title="Approval Timeline">
          <ul className="space-y-4">
            {applicationData.departments.map((dept, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <StatusIcon status={dept.status} />
                  </div>
                  {index < applicationData.departments.length && (
                    <div className="w-px h-8 bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                  <p className="text-sm text-gray-500">Status: {dept.status}</p>
                  {dept.date && (
                    <p className="text-xs text-gray-400">
                      Approved on: {dept.date}
                    </p>
                  )}
                </div>
              </li>
            ))}
            <li className="flex items-start space-x-4">
              <div className="p-2 bg-gray-100 rounded-full">
                <StatusIcon status={applicationData.adminApproval.status} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Final Admin Approval
                </h4>
                <p className="text-sm text-gray-500">
                  Status: {applicationData.adminApproval.status}
                </p>
              </div>
            </li>
          </ul>
        </Card>
      )}
    </div>
  );
};

export default CertificateStatus;
