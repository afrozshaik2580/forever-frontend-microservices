import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminLogin from '../components/admin/AdminLogin';
import AdminNavbar from '../components/admin/AdminNavbar';
import AddPage from '../components/admin/AddPage';
import ListPage from '../components/admin/ListPage';
import OrdersPage from '../components/admin/OrdersPage';
import axios from 'axios';

function AdminPage() {

  const[token,setToken]=useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
  const[isValid,setIsValid]=useState(false);

  useEffect(()=>{
    localStorage.setItem('token',token);
    async function validateAndSetToken() {
      if(token === null || token===''){
        setIsValid(false);
        setToken('');
      }
      else{
        try {
          const response= await axios.post(
            "http://localhost:8080/auth/validateToken",
            token,
            {headers:{'Content-Type': 'text/plain'}}
          );
          if(!response.data.valid || !response.data.roles.includes("ADMIN")){
            alert("invalid credentials");
            setIsValid(false);
            setToken('');
          }
          else{
            setIsValid(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    validateAndSetToken();
  },[token])

  return (
    <div className='bg-gray-50 min-h-screen'>

      {!isValid ? <AdminLogin setToken={setToken} /> :
        <>
          <AdminNavbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <AdminSidebar />
            <div className='w-[70%] mx-auto  ml-[max(5vw,25px)] my-8 text-gray-600 text-base '>
              <Routes>
                <Route path='add' element={<AddPage  token={token} />} />
                <Route path="update/:id" element={<AddPage  token={token} />} />
                <Route path='list' element={<ListPage  token={token} />} />
                <Route path='orders' element={<OrdersPage  token={token} />} />
              </Routes>
            </div>
          </div>
        </>}

    </div>
  )
}

export default AdminPage;