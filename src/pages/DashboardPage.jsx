import React, { useState, useEffect } from "react";
import DepartmentSelector from "../components/dashboard/DepartmentSelector";
import DuesTable from "../components/dashboard/DuesTable";
import DueCard from "../components/dashboard/DueCard";
import UpcomingPayments from "../components/dashboard/UpcomingPayments";
import Card from "../components/ui/Card";

// Mock Data - Replace with API calls
const mockDepartments = [
  { id: "lib", name: "Library" },
  { id: "lab", name: "Laboratory" },
  { id: "activity", name: "Activity Center" },
];

const allDuesData = {
  uncleared: [
    {
      id: "12345",
      description: "Library Fine",
      amount: "25.00",
      dueDate: "2024-05-15",
      status: "Overdue",
    },
    {
      id: "67890",
      description: "Lab Fee",
      amount: "50.00",
      dueDate: "2024-06-01",
      status: "Pending",
    }, // Assuming today is June 2, 2025, this would be overdue. Adjust for dynamic date.
    {
      id: "11223",
      description: "Activity Fee",
      amount: "30.00",
      dueDate: "2024-08-15",
      status: "Pending",
    },
  ],
  upcoming: [
    {
      date: "2024-09-15",
      description: "Tuition Fee",
      quantity: "250",
      status: "Pending",
    },
    {
      date: "2024-09-01",
      description: "Library Fine",
      quantity: "50",
      status: "Paid",
    }, // Example from image
    {
      date: "2024-09-15",
      description: "Lab Fee",
      quantity: "150",
      status: "Pending",
    },
  ],
};

// Helper to determine status dynamically (example)
const getDynamicStatus = (dueDateStr) => {
  const today = new Date();
  const dueDate = new Date(dueDateStr);
  // Set hours to 0 to compare dates only
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);

  if (dueDate < today) {
    return "Overdue";
  }
  return "Pending";
};

const DashboardPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [unclearedDues, setUnclearedDues] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [totalDuesCount, setTotalDuesCount] = useState(0);

  // Simulate fetching data
  useEffect(() => {
    // For "Latest Uncleared Dues" view (Screenshot 301 like)
    const processedUnclearedDues = allDuesData.uncleared.map((due) => ({
      ...due,
      status: due.status === "Paid" ? "Paid" : getDynamicStatus(due.dueDate), // Keep paid as paid, otherwise calculate
    }));
    setUnclearedDues(processedUnclearedDues);

    // For "Upcoming Payments" view (Screenshot 300 like)
    setUpcomingPayments(allDuesData.upcoming);

    // For "Total Dues" (Screenshot 300 like)
    // This could be the count of pending/overdue items from `unclearedDues`
    const pendingOrOverdueCount = processedUnclearedDues.filter(
      (d) => d.status === "Pending" || d.status === "Overdue"
    ).length;
    setTotalDuesCount(pendingOrOverdueCount);
  }, [selectedDepartment]); // Re-fetch or filter if department changes

  // Filter logic for department (simplified)
  const displayedUnclearedDues = selectedDepartment
    ? unclearedDues.filter((due) =>
        due.description.toLowerCase().includes(selectedDepartment)
      ) // Basic filter
    : unclearedDues;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">View Dues</h1>
      {/* This section matches parts of Screenshot 300 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <DueCard
          title="Total Dues"
          value={totalDuesCount.toString()}
          description="Currently Outstanding"
        />
        {/* Add other summary cards if needed, e.g., "Amount Due" */}
      </div>
      <UpcomingPayments payments={upcomingPayments} />
      <hr className="my-8 border-gray-300" /> {/* Separator */}
      {/* This section matches parts of Screenshot 301 */}
      <div>
        <DepartmentSelector
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
          departments={mockDepartments}
        />
        <DuesTable
          title="Latest Uncleared Dues"
          dues={displayedUnclearedDues}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
