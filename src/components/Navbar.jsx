import logo from "../assets/logo.png";
import profile_icon from '../assets/profile_icon.png';
import cart_icon from '../assets/cart_icon.png';
import menu_icon from '../assets/menu_icon.png';
import dropdown_icon from "../assets/dropdown_icon.png"
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useShopContext } from "../contexts/ShopContext";

function Navbar() {
  
  const [visible, setVisible] = useState(false);
  const {name, token, navigate, handleLogout, getCartCount, fetchCartItems} = useShopContext();

  useEffect(()=>{
    if(token){
      fetchCartItems();
    }
  },[token])
  
  return (
    <div className='flex items-center justify-between py-5 font-medium'>

     <Link to='/'> <img src={logo} alt="" className='w-36' /></Link>

      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>

        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p className="text-lg font-normal">Home</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p className="text-lg font-normal">Collection</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p className="text-lg font-normal">About</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p className="text-lg font-normal">Contact</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        { name ? <p>Hi! {name}</p>: <button onClick={()=>{navigate("/login")}}>Login</button>}
        {/* <img src={search_icon} alt="" className='w-5 cursor-pointer'/> */}
        <div className="group relative"> 
         <img onClick={()=> token? null : navigate('/login')} src={profile_icon} alt="" className='w-5 cursor-pointer '/>
         {/* Dropdown Menu */}
          {
            token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 bg-slate-100 text-gray-500 rounded'>
              <p className='cursor-pointer hover:text-black ml-4'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black ml-4'>Orders</p>
              <p onClick={handleLogout} className='cursor-pointer hover:text-black ml-4'>Log Out</p>
            </div>
          </div>
          }
        </div>
        <Link to="/cart" className='relative'>
        <img src={cart_icon} alt="" className='w-5 min-w-5' />
        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
          {getCartCount()}
        </p>
        </Link>
        <img onClick={()=>setVisible(true)} src={menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
      {/* sidebar menu for small screen  */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all  ${visible ? 'w-full' : 'w-0'}`}>
         <div className='flex flex-col text-gray-600 '>
          <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img onClick={()=>{setVisible(false)}} src={dropdown_icon} alt="" className='h-4 rotate-180' />
            <p >Back</p>
          </div>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
          <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>      
         </div>
      </div>
    </div>
  )
}

export default Navbar