import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

// Register the necessary components for Chart.js to work.
// This is a required step for react-chartjs-2.
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

/**
 * A bar chart component to display the number of pending dues for each department.
 */
export const DuesByDepartmentChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4b5563", // Gray-600 for text
        },
      },
      title: {
        display: true,
        text: "Pending Dues by Department",
        color: "#1f2937", // Gray-800
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        ticks: { color: "#4b5563" },
      },
      x: {
        ticks: { color: "#4b5563" },
      },
    },
  };
  const data = {
    labels: ["Library", "Hostel", "Laboratory", "Accounts", "Activity Center"],
    datasets: [
      {
        label: "Number of Pending Dues",
        data: [32, 45, 15, 22, 18],
        backgroundColor: "rgba(107, 114, 128, 0.6)", // gray-500 with opacity
        borderColor: "rgba(55, 65, 81, 1)", // gray-700
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="h-80">
      <Bar options={options} data={data} />
    </div>
  );
};

/**
 * A doughnut chart component to display the overall student clearance status.
 */
export const ClearanceStatusChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4b5563",
        },
      },
      title: {
        display: true,
        text: "Overall Student Clearance Status",
        color: "#1f2937",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
  };
  const data = {
    labels: ["Fully Cleared", "Dues Pending"],
    datasets: [
      {
        label: "# of Students",
        data: [800, 450],
        backgroundColor: ["rgba(16, 185, 129, 0.6)", "rgba(239, 68, 68, 0.6)"], // green-500, red-500
        borderColor: ["rgba(16, 185, 129, 1)", "rgba(239, 68, 68, 1)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="h-80">
      <Doughnut options={options} data={data} />
    </div>
  );
};
