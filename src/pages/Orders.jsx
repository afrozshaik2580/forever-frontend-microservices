import React, { useEffect, useState } from 'react'
import Title from '../components/Title'
import { useShopContext } from '../contexts/ShopContext'

const Orders = () => {
  const { products, setOrderData, orderData, loadOrderData, token, navigate } = useShopContext()

  useEffect(() => {
    if (token) {
      loadOrderData();
    } else {
      setOrderData([]);
      navigate("/")
    }
  }, [token, products]);

  useEffect(() => {
    console.log(orderData);
  }, [orderData]);


  return (
    <div className='border-t pt-16'>

      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />

        <div >
          {
            orderData.map((order, index) => (
            <div key={index} className='border-t border-b'>
                <div className='flex justify-between'>
                    <p className='text-base'>Order id: {order.orderId}</p>
                    <p className='text-base'>Total price: ₹{order.totalPrice}</p>
                </div>
              { order.orderItems.map((item,i)=> (
              <div key={i} className='py-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                <div className="flex items-start gap-6 text-sm">
                  <img src={item.product.images[0]} className='w-16 sm:w-20' alt="" />
                  <div>
                    <p className='sm:text-base font-medium'>{item.name}</p>
                    <div className='flex items-center gap-3 mt-1 text-base  text-gray-700'>
                      <p>₹{item.unitPrice}</p>
                      <p>Quantity : {item.quantity} </p>
                      <p>Size: {item.size}</p>
                    </div>
                    <p className='mt-1'>Date : <span className='tex-gray-400'>{new Date(order.orderDate).toDateString()}</span></p>
                    <p className='mt-1'>Payment : <span className='tex-gray-400'>{order.paymentMethod}</span></p>
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                    <p className='text-sm md:text-base' >{order.status}</p>
                  </div>
                  <button onClick={loadOrderData} className='border px-4 py-2 text-sm font-medium rounded-md '>Track Order</button>
                </div>
              </div>))
              }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Orders
