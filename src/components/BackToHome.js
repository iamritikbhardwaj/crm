import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


function BackToHome({path}) {
    const navigate = useNavigate();
  return (
    <div>
       <button onClick={() => navigate(path || "/")}><IoMdArrowRoundBack className='text-red-600' size={30}/></button> 
    </div>
  )
}

export default BackToHome