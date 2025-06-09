import React from "react";
import useAppData from "../../hooks/useAppData";
import Card from "../../components/common/Card";
import { FaBell, FaCheck } from "react-icons/fa";

// --- Mock Data: Replace with API calls ---
const mockNotifications = [
  {
    id: 1,
    title: "Fee Payment Deadline Extended",
    timestamp: "2 hours ago",
    read: false,
    snippet: "The deadline for semester fees has been extended to June 15th.",
  },
  {
    id: 2,
    title: "System Maintenance Alert",
    timestamp: "1 day ago",
    read: false,
    snippet:
      "The portal will be down for maintenance on Sunday from 2 AM to 4 AM.",
  },
  {
    id: 3,
    title: 'Library Book "Atomic Habits" is due',
    timestamp: "3 days ago",
    read: true,
    snippet:
      "Please return the book to the library by the end of the week to avoid fines.",
  },
  {
    id: 4,
    title: "Welcome to the NDC Portal",
    timestamp: "5 days ago",
    read: true,
    snippet:
      "We are pleased to have you on board. Please verify your profile information.",
  },
];

/**
 * The "Notifications" page for students, styled with the clean, "white grayish" theme.
 * Displays a list of recent notifications with read/unread status.
 */
const Notifications = () => {
  const { user } = useAppData();

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>

      <Card className="!p-0">
        <ul className="divide-y divide-gray-200">
          {mockNotifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 flex items-start space-x-4 transition-colors duration-200 ${
                !notification.read ? "bg-blue-50" : "bg-white"
              }`}
            >
              {/* Icon */}
              <div
                className={`mt-1 p-2 rounded-full ${
                  !notification.read
                    ? "bg-blue-100 text-blue-600"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {notification.read ? <FaCheck /> : <FaBell />}
              </div>

              {/* Content */}
              <div className="flex-grow">
                <p
                  className={`font-semibold ${
                    !notification.read ? "text-gray-800" : "text-gray-600"
                  }`}
                >
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500">{notification.snippet}</p>
              </div>

              {/* Timestamp */}
              <p className="text-xs text-gray-400 ml-4 whitespace-nowrap pt-1">
                {notification.timestamp}
              </p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default Notifications;
