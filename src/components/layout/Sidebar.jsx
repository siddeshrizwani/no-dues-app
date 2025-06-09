import React from "react";
import { NavLink } from "react-router-dom";
import useAppData from "../../hooks/useAppData";
import {
  FaTachometerAlt,
  FaUserEdit,
  FaHeadset,
  FaBell,
  FaUniversity,
  FaUsersCog,
  FaFileInvoiceDollar,
  FaQuestionCircle,
  FaSignOutAlt,
  FaScroll,
  FaClipboardCheck,
  FaChartBar, // New Icon
  FaHistory,
  FaCog,
} from "react-icons/fa";

/**
 * The main sidebar navigation for the application.
 * This version adds the "System Reports" link for administrators.
 */
const Sidebar = () => {
  const { user, isSidebarCollapsed, logout } = useAppData();

  const navItems = {
    student: [
      {
        name: "Dashboard",
        path: "/student/dashboard",
        icon: <FaTachometerAlt />,
      },
      {
        name: "Certificate Status",
        path: "/student/certificate-status",
        icon: <FaScroll />,
      },
      {
        name: "Payment History",
        path: "/student/payment-history",
        icon: <FaHistory />,
      },
      { name: "My Profile", path: "/student/profile", icon: <FaUserEdit /> },
      { name: "Help Desk", path: "/student/help", icon: <FaHeadset /> },
      {
        name: "Notifications",
        path: "/student/notifications",
        icon: <FaBell />,
      },
    ],
    department: [
      { name: "Dashboard", path: "/dept/dashboard", icon: <FaTachometerAlt /> },
      {
        name: "Clearance Requests",
        path: "/dept/clearance-requests",
        icon: <FaClipboardCheck />,
      },
      {
        name: "Manage Dues",
        path: "/dept/dues",
        icon: <FaFileInvoiceDollar />,
      },
      {
        name: "Help Requests",
        path: "/dept/help-requests",
        icon: <FaQuestionCircle />,
      },
    ],
    admin: [
      {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <FaTachometerAlt />,
      },
      { name: "System Reports", path: "/admin/reports", icon: <FaChartBar /> }, // New Link
      {
        name: "Departments",
        path: "/admin/departments",
        icon: <FaUniversity />,
      },
      { name: "Manage Staff", path: "/admin/staff", icon: <FaUsersCog /> },
      { name: "Audit Log", path: "/admin/audit-log", icon: <FaHistory /> },
      { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
    ],
  };

  const currentNavItems = navItems[user?.role] || [];
  const activeClassName = "bg-gray-200 text-gray-900";
  const inactiveClassName =
    "text-gray-600 hover:bg-gray-100 hover:text-gray-800";

  return (
    <aside
      className={`bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-20 transition-all duration-300 ease-in-out ${
        isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-4 h-16 flex items-center justify-center shrink-0 border-b border-gray-200">
        <h1
          className={`font-bold text-2xl text-gray-800 whitespace-nowrap overflow-hidden transition-all duration-300 ${
            isSidebarCollapsed ? "w-0 opacity-0" : "w-full opacity-100"
          }`}
        >
          Sunyam
        </h1>
        <h1
          className={`font-bold text-2xl text-gray-800 transition-all duration-300 ${
            isSidebarCollapsed ? "w-full opacity-100" : "w-0 opacity-0"
          }`}
        >
          S
        </h1>
      </div>
      <nav className="flex-grow p-2">
        {currentNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            title={item.name}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg my-1 transition-colors duration-200 group relative ${
                isActive ? activeClassName : inactiveClassName
              }`
            }
          >
            <span className="text-xl text-gray-500">{item.icon}</span>
            <span
              className={`ml-4 font-medium whitespace-nowrap transition-all duration-300 ${
                isSidebarCollapsed ? "opacity-0 hidden" : "opacity-100"
              }`}
            >
              {item.name}
            </span>
            {isSidebarCollapsed && (
              <span className="absolute left-full ml-4 w-auto p-2 text-sm bg-gray-800 text-white rounded-md invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-30">
                {item.name}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={logout}
          title="Logout"
          className={`flex items-center p-3 rounded-lg my-1 transition-colors duration-200 group relative w-full ${inactiveClassName}`}
        >
          <span className="text-xl text-gray-500">
            <FaSignOutAlt />
          </span>
          <span
            className={`ml-4 font-medium whitespace-nowrap transition-all duration-300 ${
              isSidebarCollapsed ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            Logout
          </span>
          {isSidebarCollapsed && (
            <span className="absolute left-full ml-4 w-auto p-2 text-sm bg-gray-800 text-white rounded-md invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-30">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
