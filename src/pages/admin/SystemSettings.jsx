import React from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

/**
 * A simple toggle switch component for settings.
 */
const ToggleSwitch = ({ id, label, description, defaultChecked = false }) => (
  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
    <div>
      <h4 className="font-semibold text-gray-800">{label}</h4>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          defaultChecked={defaultChecked}
        />
        <div className="block bg-gray-200 w-14 h-8 rounded-full"></div>
        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
      </div>
    </label>
  </div>
);

/**
 * Admin page for managing system-wide settings.
 * This component provides a UI for configuring application-level parameters.
 */
const SystemSettings = () => {
  // In a real application, these settings would be fetched from and saved to an API.
  const handleSaveChanges = (e) => {
    e.preventDefault();
    alert("Saving system settings...");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>

      <form onSubmit={handleSaveChanges}>
        <Card>
          <div className="space-y-6">
            <ToggleSwitch
              id="maintenance-toggle"
              label="Maintenance Mode"
              description="Temporarily disable access for students and staff."
            />

            <ToggleSwitch
              id="registration-toggle"
              label="Allow New Registrations"
              description="Control whether new students can register for an account."
              defaultChecked={true}
            />

            <ToggleSwitch
              id="email-toggle"
              label="Enable Email Notifications"
              description="Send email alerts to users for due updates and other events."
              defaultChecked={true}
            />
          </div>

          {/* Save Button */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end">
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </Card>
      </form>

      {/* A simple style tag to make the toggle switches functional */}
      <style>{`
                input:checked + .block {
                    background-color: #4f46e5; /* indigo-600 */
                }
                input:checked + .block + .dot {
                    transform: translateX(100%);
                }
            `}</style>
    </div>
  );
};

export default SystemSettings;
