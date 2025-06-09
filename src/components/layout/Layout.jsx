import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import useAppData from "../../hooks/useAppData";

/**
 * The main layout for the authenticated part of the application.
 * This version uses a static light/grayish theme and supports a collapsible sidebar.
 */
const Layout = () => {
  const { isSidebarCollapsed } = useAppData();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div
        className={`relative flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
