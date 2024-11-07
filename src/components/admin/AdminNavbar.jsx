import React from 'react'
import admin_logo from "../../assets/admin_logo.png"

function AdminNavbar({setToken}) {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between' >
      <img src={admin_logo} alt="" className='w-36' />
      <button 
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm' 
        onClick={()=>{
          setToken('');
        }} 
      >
        Logout
      </button>
    </div>
  )
}

export default AdminNavbar