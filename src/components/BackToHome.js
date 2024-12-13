import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';


function BackToHome({path}) {
    const navigate = useNavigate();
  return (
    <div>
       <button onClick={() => navigate(path || "/")}><IoMdArrowRoundBack /></button> 
    </div>
  )
}

export default BackToHome