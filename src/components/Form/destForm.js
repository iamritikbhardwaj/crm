import React, { useState } from "react";
import BackToHome from "../BackToHome";
import destinationForm from "./destinationForm";

function DestForm() {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    profile: "",
    email: "",
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
      <h2 className="text-2xl font-semibold text-center text-slate-800 mb-6">Add Destination</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="userName">
            Destination
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

        {/* Currency */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="userName">
            Currency
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

        {/* Agent */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="userName">
            Agent
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

        {/* Supplier */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="userName">
            Supplier
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

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="userName">
            Status
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

export default DestForm;
