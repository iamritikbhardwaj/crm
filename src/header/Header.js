import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbBrandBooking } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { GrSchedulePlay } from "react-icons/gr";
import { logout } from "../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth.user; // Accessing user from auth 

  return (
    <div className="fixed w-1/6 flex flex-col text-center justify-between h-full  bg-slate-800 p-3">
      <ul>
        <li>
          <img
            src="https://activitybeds.com/static/media/activitybed.3a214645e1b5c84c0bdf.png"
            alt="logo"
            className="w-4/5 mx-0 text-red-500 my-2"
          />
        </li>
        <li>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-4/5 flex items-center text-xs font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300"
          >
            <MdDashboard className="mx-1" /> Dashboard
          </button>
        </li>

        <li>
          <button
            onClick={() => navigate("/user")}
            disabled={user?.profile !== "Admin"}
            className={`w-4/5 ${user?.profile === "Admin" ? "flex" : "hidden"
              }  items-center text-xs font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300`}
          >
            <FaUser className="mx-1" />
            User
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/setting")}
            disabled={user?.profile !== "Admin"}
            className={`w-4/5 text-xs ${user?.profile === "Admin" ? "flex" : "hidden"
              } items-center font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300`}
          >
            <IoMdSettings className="mx-1" />
            Setting
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/booking")}
            className={`${user?.profile === "Finance" ? "hidden" : "flex"} items-center w-4/5 
            text-xs font-bold bg-slate-100 p-2 rounded-lg 
            text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300
            `}
          >
            <TbBrandBooking className="mx-1" />
            New Booking
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/schedule")}
            className="flex items-centerw-fit sm:w-4/5 text-xs font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300"
          >
            <GrSchedulePlay className="mx-1" />
            All Bookings
          </button>
        </li>
      </ul>

      <ul>
        <li>
          <button
            onClick={() => {
              navigate("/login", dispatch(logout()));
            }}
            className="w-4/5 flex items-center text-xs font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300"
          >
            <IoLogOut className="mx-1" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Header;
