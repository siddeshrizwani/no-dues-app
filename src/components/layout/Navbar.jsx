import React from "react";
// Placeholder icons
const UserIcon = () => (
  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">
    U
  </div>
); // User avatar placeholder
const BellIcon = () => <span>🔔</span>;
const SettingsIcon = () => <span>⚙️</span>;
const SearchIcon = () => <span>🔍</span>;

const Navbar = () => {
  // This navbar is minimal based on the provided UIs.
  // Screenshot (301) shows a more complex one (Dashboard, Courses, Calendar, Grades, Dues).
  // We'll keep it simple here, aligned with the sidebar providing main navigation.
  // The "Sunyam" brand is in the Sidebar. The main content area usually shows the page title.

  return (
    <nav className="bg-white shadow-sm h-16 flex items-center justify-end px-6">
      {/* Search Bar - optional, not prominent in all provided views */}
      {/* <div className="relative mr-4">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div> */}

      <div className="flex items-center space-x-4">
        {/* Placeholder for icons like notifications, settings, often seen in dashboards */}
        {/* <button className="text-gray-500 hover:text-gray-700">
          <BellIcon size={20} />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <SettingsIcon size={20} />
        </button> */}
        <div className="text-sm text-gray-500">67%</div> {/* From screenshot */}
        <UserIcon />
      </div>
    </nav>
  );
};

export default Navbar;
