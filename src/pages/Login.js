import React from 'react'

function Login(setUser) {

  return (
    <div className='text-center m-20'>
      <form className='flex-col flex text-center'>
        <input className='p-2 border-2 m-2 w-[500px]' type="text" placeholder='Email' />
        <input className='p-2 border-2 m-2 w-[500px]' type="text" placeholder='Password' />
        <button className='p-2 border-2 m-2 w-40' 
        onClick={() => alert('Login')} 
        // type='submit'
        >Login</button>
      </form>
    </div>
  )
}

export default Login