import React, { useState, useEffect } from "react";
import useAppData from "../../hooks/useAppData";
import DuesTable from "../../components/dashboard/DuesTable";
import DueCard from "../../components/dashboard/DueCard";
import { FaFileInvoiceDollar, FaDollarSign } from "react-icons/fa";

// --- Mock Data: Expanded to demonstrate pagination ---
const allDuesData = {
  uncleared: [
    {
      id: "DUE-001",
      description: "Library Fine: Overdue Book",
      amount: "25.00",
      dueDate: "2024-05-15",
    },
    {
      id: "DUE-002",
      description: "Laboratory Fee: Chem Lab",
      amount: "50.00",
      dueDate: "2025-07-01",
    },
    {
      id: "DUE-003",
      description: "Activity Center Fee",
      amount: "15.00",
      dueDate: "2025-08-01",
    },
    {
      id: "DUE-004",
      description: "Hostel Fee: May",
      amount: "300.00",
      dueDate: "2024-05-10",
    },
    {
      id: "DUE-005",
      description: "Sports Kit Damage",
      amount: "45.00",
      dueDate: "2025-09-01",
    },
    {
      id: "DUE-006",
      description: "Library Fine: Lost ID",
      amount: "10.00",
      dueDate: "2024-04-01",
    },
  ],
};

const ITEMS_PER_PAGE = 3;

const getDynamicStatus = (dueDateStr) => {
  const today = new Date();
  const dueDate = new Date(dueDateStr);
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0, 0, 0, 0);
  if (dueDate < today) return "Overdue";
  return "Pending";
};

/**
 * The main dashboard for students, updated with the clean, "white grayish" theme.
 * It uses the more detailed DueCard with icons.
 */
const StudentDashboard = () => {
  const { user } = useAppData();
  const [dues, setDues] = useState({ all: [], total: 0, totalAmount: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const processedDues = allDuesData.uncleared.map((d) => ({
      ...d,
      status: getDynamicStatus(d.dueDate),
    }));

    const outstandingDues = processedDues.filter((d) => d.status !== "Paid");
    const totalOutstanding = outstandingDues.length;
    const totalAmount = outstandingDues.reduce(
      (sum, d) => sum + parseFloat(d.amount),
      0
    );

    setDues({
      all: outstandingDues,
      total: totalOutstanding,
      totalAmount: totalAmount,
    });
  }, []);

  // --- Pagination Logic ---
  const totalPages = Math.ceil(dues.all.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDues = dues.all.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome back, {user?.name}!
      </h1>

      {/* Summary Cards with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DueCard
          icon={<FaFileInvoiceDollar size={20} />}
          title="Outstanding Dues"
          value={dues.total}
          description="Items requiring your attention"
        />
        <DueCard
          icon={<FaDollarSign size={20} />}
          title="Total Amount Due"
          value={`$${dues.totalAmount.toFixed(2)}`}
          description="Sum of all outstanding dues"
        />
      </div>

      {/* Dues Table */}
      <div>
        <DuesTable
          title="Your Dues Details"
          dues={currentDues}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
