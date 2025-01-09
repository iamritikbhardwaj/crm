import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { API_URL } from '../AppConstant';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function Login() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


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
        navigate("/", {state: (await response).data.OUTPUT} );
      }
    })(data);
  }

  return (
    <div className='flex justify-center text-center m-20'>
      <form onSubmit={handleSubmit(loginSubmit)} className='flex-col flex text-center'>
        <TextField variant="outlined" label="Email" sx={{width: '500px', m: 1}} {...register("email")} type="email" placeholder='Email' />
        {errors.email && <p>{errors.email.message}</p>}
        <FormControl sx={{width: '500px', m: 1}} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            {...register("password")}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>        {errors.password && <p>{errors.password.message}</p>}
        <button className='p-2 border-2 m-2 w-40' 
        type='submit'
        >Login</button>
      </form>
    </div>
  )
}

export default Login