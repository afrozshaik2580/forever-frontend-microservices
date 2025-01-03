import axios from 'axios'
import React, { useState } from 'react'

function AdminLogin({setToken}) {
    const [email,setEmail]  = useState('')
    const [password,setPassword]  = useState('')

    const loginHandler = async(e)=>{
        try {
            e.preventDefault()
            const response = await axios.post("https://forever-backend-yw9l.onrender.com/auth/login",{email,password})
            
            if(response.data){
                setToken(response.data);
                localStorage.setItem('token',response.data);
            }
        } catch (error) {
            alert("error")
            console.log(error)
        }
    
    }
    return (
        <div className='min-h-screen flex  items-center justify-center w-full' > 
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
            <form onSubmit={loginHandler}>  
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Email Adress</p>
                    <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder='Your@email.com' required className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' />
                </div>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder='Enter Your Password' required className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'/>
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black'>Login</button>
            </form>
        </div> 
        </div>
    )
}

export default AdminLogin
