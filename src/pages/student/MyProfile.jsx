import React from "react";
import useAppData from "../../hooks/useAppData";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

/**
 * The "My Profile" page for students, styled with the clean, "white grayish" theme.
 * Allows viewing personal information and managing security settings.
 */
const MyProfile = () => {
  const { user } = useAppData();

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    alert("This would trigger the password update logic.");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        My Profile & Settings
      </h1>

      {/* Personal Information Card */}
      <Card title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm">
          <div className="font-medium text-gray-500">Name</div>
          <div className="text-gray-800">{user?.name}</div>

          <div className="font-medium text-gray-500">Student ID</div>
          <div className="text-gray-800">{user?.id}</div>

          <div className="font-medium text-gray-500">Email Address</div>
          <div className="text-gray-800">{user?.id}@university.edu</div>

          <div className="font-medium text-gray-500">Role</div>
          <div className="text-gray-800 capitalize">{user?.role}</div>
        </div>
      </Card>

      {/* Security Settings Card */}
      <Card title="Change Password">
        <form className="max-w-md space-y-4" onSubmit={handlePasswordUpdate}>
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current Password
            </label>
            <Input
              type="password"
              name="currentPassword"
              id="currentPassword"
              placeholder="Enter your current password"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <Input
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter a new password"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm New Password
            </label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm the new password"
            />
          </div>
          <div className="pt-2">
            <Button type="submit" variant="primary">
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default MyProfile;
