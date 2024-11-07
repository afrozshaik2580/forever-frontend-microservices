import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useShopContext } from '../contexts/ShopContext'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, BACKEND_URL } = useShopContext()

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      if (currentState === 'Sign Up') {
        const roles =["USER"]
        const response = await axios.post(
            `${BACKEND_URL}/auth/register`, 
            {name,email,password,roles});
        if (response.status === 201) {
          console.log(response)
          setCurrentState("Login")
        } else {
          console.log(response.data.message)
        }
      } else {
        const response = await axios.post(
            `${BACKEND_URL}/auth/login`, 
            { email, password })
        if (response.status === 200) {
          console.log(response.data);
          setToken(response.data)
          localStorage.setItem('token',response.data)
        } else {
          toast.error(error.message)
        }

      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
   if(token && token !==''){
    navigate('/')
   }
  },[token])

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  },[])

  return (

    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className='prata-regular text-3xl'> {currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className='cursor-pointer'>Forgot Password ?</p>
        {
          currentState === "Login"
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === "Login" ? 'Sign In' : 'Sign Up'}</button>

    </form>
  )
}

export default Login