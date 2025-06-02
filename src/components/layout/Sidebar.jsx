import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../ui/Button"; // Assuming you might want a styled logout button

// Placeholder icons (replace with actual icons, e.g., from react-icons)
const DashboardIcon = () => <span>📊</span>;
const DuesIcon = () => <span>📄</span>;
const CertificateIcon = () => <span>📜</span>;
const ContactIcon = () => <span>📞</span>;
const ExportIcon = () => <span>📤</span>;
const LogoutIcon = () => <span>🚪</span>;

const Sidebar = ({ onLogout }) => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { name: "View Dues", path: "/dashboard", icon: <DuesIcon /> }, // Or a specific /dues path
    {
      name: "Generate Certificate",
      path: "/certificate",
      icon: <CertificateIcon />,
    },
    { name: "Contact", path: "/contact", icon: <ContactIcon /> },
    { name: "Export Data", path: "/export", icon: <ExportIcon /> },
  ];

  const activeClassName = "bg-blue-600 text-white";
  const inactiveClassName =
    "text-gray-700 hover:bg-blue-100 hover:text-blue-700";

  return (
    <div className="w-64 bg-white h-screen p-4 flex flex-col shadow-lg">
      <div className="text-2xl font-bold text-blue-700 mb-10 ml-2">Sunyam</div>{" "}
      {/* Logo/Brand */}
      <nav className="flex-grow">
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="mb-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-md text-sm font-medium ${
                    isActive ? activeClassName : inactiveClassName
                  }`
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <button
          onClick={onLogout}
          className="flex items-center space-x-3 p-2 w-full text-left rounded-md text-sm font-medium text-gray-700 hover:bg-red-100 hover:text-red-700"
        >
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
