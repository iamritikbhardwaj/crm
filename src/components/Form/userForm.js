import React, { useState } from "react";
import BackToHome from "../BackToHome";
import { z } from "zod"

function UserForm() {

  const userShema = z.object({
    userName: z.string(),
    phoneNumber: z.string(),
    profile: z.string(),
    email: z.string(),
    password: z.string(),
    status: z.string(),
    permissions: z.string(),
  })
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    profile: "",
    email: "",
    password: "",
    status: "",
    permissions: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-100 rounded-lg mt-10 shadow-lg">
        <BackToHome path={"/user"} />
      <h2 className="text-2xl font-semibold text-center text-slate-800 mb-6">Add User</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Name */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="userName">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
        </div>

        {/* Profile */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="profile">
            Profile
          </label>
          <select
            id="profile"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          >
            <option value="">Select Profile</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
            <option value="Finance">Finance</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Assigned Permissions */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="permissions">
            Assigned Permissions
          </label>
          <input
            type="text"
            id="permissions"
            name="permissions"
            value={formData.permissions}
            onChange={handleChange}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
        </div>

        {/* Action */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-slate-800 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
