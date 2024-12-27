import React from "react";
import BackToHome from "../BackToHome";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import axios from "axios";
import { API_URL } from "../../AppConstant.js"
function UserForm() {

  const userShema = z.object({
    userName: z.string().nonempty(),
    phoneNumber: z.string().min(10, {message: "Please enter a valid number"}).max(12, {message: "Please enter a valid number"}),
    profile: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().nonempty(),
    status: z.string().nonempty(),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userShema)
  })

  console.log('errors', errors);

  

  const onSubmitForm = async (data) => {
    // Handle form submission logic here
    try {
      const response = await axios.post(API_URL + "users/createUser", data,
      {
        headers: {  
          "content-type": "application/json" 
        }
      }
      );
      console.log(response.data, 'response');
    } catch (error) {
      console.log(error);
    }
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-100 rounded-lg mt-10 shadow-lg">
        <BackToHome path={"/user"} />
      <h2 className="text-2xl font-semibold text-center text-slate-800 mb-6">Add User</h2>
      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        {/* User Name */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="userName">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            {...register("userName")}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
          {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            {...register("phoneNumber")}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
          {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
        </div>

        {/* Profile */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="profile">
            Profile
          </label>
          <select
            id="profile"
            {...register("profile")}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          >
            <option value="">Select Profile</option>
            <option value="Sales">Sales</option>
            <option value="Operations">Operations</option>
            <option value="Finance">Finance</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.profile && <p className="text-red-500 text-xs mt-1">{errors.profile.message}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password")}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {/* Status */}
        <div className="flex flex-col">
          <label className="text-slate-700 text-sm font-semibold mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
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
