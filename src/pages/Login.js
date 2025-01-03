import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { API_URL } from '../AppConstant';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  })

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const loginSubmit = (data) => {
    (async() => {
      const response = axios.post(`${API_URL}users/login`, data,
      {
        withCredentials: true,
        headers: {
          "content-type": "application/json",
          "credentials": "include",
        }
      })
      console.log(response, 'response');
      if (response) {
        console.log((await response).data.OUTPUT, 'response');
        navigate("/", state={user: (await response).data.OUTPUT});
      }
    })(data);
  }

  return (
    <div className='text-center m-20'>
      <form onSubmit={handleSubmit(loginSubmit)} className='flex-col flex text-center'>
        <input {...register("email")} className='p-2 border-2 m-2 w-[500px]' type="text" placeholder='Email' />
        {errors.email && <p>{errors.email.message}</p>}
        <input {...register("password")} className='p-2 border-2 m-2 w-[500px]' type="text" placeholder='Password' />
        {errors.password && <p>{errors.password.message}</p>}
        <button className='p-2 border-2 m-2 w-40' 
        type='submit'
        >Login</button>
      </form>
    </div>
  )
}

export default Login