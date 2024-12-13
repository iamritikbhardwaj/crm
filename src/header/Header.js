import React from 'react'
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate();

  return (
    <>
    <div className='fixed flex-col text-center justify-between h-[100vh] w-1/4 bg-slate-800 p-3'>
    <ul>
      <li onClick={() => navigate('/profile')} className='text-white text-xl'><FaUser /></li>
        <li><button onClick={() => navigate('/user')} className='w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>User</button></li>
<li><button onClick={() => navigate('/setting')} className='w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>Setting</button></li>       
<li> <button onClick={() => navigate('/booking')} className='w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>Booking</button></li>
        <li><button onClick={() => navigate('/schedule')} className='w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>Schedule</button></li>
    </ul>

    <ul>
      <li><button onClick={() => navigate('/')} className='w-3/4 text-2xl font-bold bg-slate-100 p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300 focus:bg-slate-300'>Logout</button></li>
      </ul>
    </div>
    </>
  )
}

export default Header