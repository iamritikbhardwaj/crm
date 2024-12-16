import React from 'react'
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbBrandBooking } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { GrSchedulePlay } from "react-icons/gr";

function Header() {

  const navigate = useNavigate();

  return (
    <div className='fixed w-1/6 flex flex-col text-center justify-between h-full  bg-slate-800 p-3'>
    <ul >
      <li>
        <img src='https://activitybeds.com/static/media/activitybed.3a214645e1b5c84c0bdf.png' alt='logo' className='w-4/5 mx-auto text-red-500 my-2' />
      </li>
      <li><button onClick={() => navigate('/dashboard')} className='w-fit flex items-center sm:w-4/5 text-xs font-bold bg-slate-100 p-2 rounded-lg text-center mx-0 md:mx-1 my-4 hover:bg-slate-300 focus:bg-slate-300'>
      <MdDashboard className='mx-1'/> Dashboard</button></li>
      
        <li><button onClick={() => navigate('/user')} className='w-4/5 flex items-center text-xs font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>
          <FaUser className='mx-1'/>User</button></li>
<li><button onClick={() => navigate('/setting')} className='w-4/5 text-xs flex items-center font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'><IoMdSettings className='mx-1'/>Setting</button></li>       
<li><button onClick={() => navigate('/booking')} className='flex items-center w-4/5 text-xs font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'><TbBrandBooking className='mx-1' />Booking</button></li>
        <li><button onClick={() => navigate('/schedule')} className='flex items-centerw-fit sm:w-4/5 text-xs font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'><GrSchedulePlay className='mx-1'/>Schedule</button></li>
    </ul>

    <ul>
      <li><button onClick={() => navigate('/login')} className='w-4/5 flex items-center text-xs font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'><IoLogOut className='mx-1'/>Logout</button></li>
      </ul>
      
    </div>
    
  )
}

export default Header