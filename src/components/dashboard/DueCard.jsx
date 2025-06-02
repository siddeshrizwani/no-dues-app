import React from "react";
import Card from "../ui/Card";

const DueCard = ({ title, value, description }) => {
  return (
    <Card className="text-center">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
    </Card>
  );
};

export default DueCard;
