import React, { useContext, useEffect, useState } from 'react'
import { useShopContext } from '../contexts/ShopContext'
import Title from '../components/Title'
import bin_icon from "../assets/bin_icon.png"
import CartTotal from '../components/CartTotal'

const Cart = () => {

  const { token, products, cartItems, fetchCartItems, updateCart , navigate} = useShopContext()

  useEffect(() => {
    if(!token || token===''){
        navigate("/login")
        return;
    }
    fetchCartItems();
  }, [token, products])

  
  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR '} text2={'CART'} />
      </div>
      <div>
        {
            cartItems.length==0
            ?
            <div className='text-center text-2xl'>
                <p>Cart Is <span className='underline text-red-600'>Empty</span></p>
                <p>Add some items to you cart</p>
            </div>
            :
            cartItems.map((item, index) => {
            const productData = products.find((product) => product.id === item.product.id)
            if(!productData) return null;
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData.images[0]} className='w-1 sm:w-20' alt="" />
                  <div>
                    <p className='text-small sm:text-lg font-medium'>{item.product.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>₹{item.product.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input type="number" min={1} defaultValue={item.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateCart(item.product.id, item.size, Number(e.target.value))} />
                <img src={bin_icon} alt="" className='w-4 mr-4 sm:w-5 cursor-pointer' onClick={() => updateCart(item.product.id, item.size, 0)} />
              </div>
            )
          })
        }
      </div>

      <div className="flex justify-end mt-14 mb-7">
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className="w-full text-end">
            <button className='bg-black text-white text-sm my-8 px-8 py-3 active:bg-gray-600' onClick={()=>navigate('/place-order')}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart