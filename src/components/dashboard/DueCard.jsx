import React from "react";
import Card from "../common/Card";

/**
 * A more detailed summary card for displaying key metrics on the dashboard.
 * This version includes an icon for better visual context and a subtle hover effect.
 * It uses the clean, "white grayish" theme.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} [props.icon] - An optional icon to display.
 * @param {string} props.title - The title for the metric (e.g., "Outstanding Dues").
 * @param {string | number} props.value - The value of the metric.
 * @param {string} [props.description] - An optional description for the metric.
 */
const DueCard = ({ icon, title, value, description }) => {
  return (
    // The Card component is already styled with the new theme.
    // Added a hover effect for better interactivity.
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        {icon && (
          <div className="bg-gray-100 text-gray-600 p-3 rounded-lg">{icon}</div>
        )}
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {title}
          </h4>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default DueCard;
