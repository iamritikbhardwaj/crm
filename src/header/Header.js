import React from 'react'
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  return (
    
    <div className='fixed sm:w-1/3 w-fit flex-col text-center justify-between h-full  bg-slate-800 p-3'>
    <ul >
      <ul>
      <li><button onClick={() => navigate('/')} className='w-fit sm:w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-0 md:mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>Dashboard</button></li>
      </ul>
        <li><button onClick={() => navigate('/user')} className='w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>User</button></li>
<li><button onClick={() => navigate('/setting')} className='w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>Setting</button></li>       
<li> <button onClick={() => navigate('/booking')} className='w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>Booking</button></li>
        <li><button onClick={() => navigate('/schedule')} className='w-fit sm:w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>Schedule</button></li>
    </ul>

    <ul>
      <li><button onClick={() => navigate('/login')} className='w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>Logout</button></li>
      </ul>
      
    </div>
    
  )
}

export default Header