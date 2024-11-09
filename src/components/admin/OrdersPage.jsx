import axios from 'axios';
import React, { useEffect, useState } from 'react'
import parcel_icon from "../../assets/parcel_icon.svg"

function OrdersPage({token}) {
    const [orders, setOrders] = useState([])
    // const [products, setProducts] = useState([])

    // async function getProducts() {
    //   try {
    //     const response=await axios.get(
    //       "https://forever-backend-yw9l.onrender.com/products",
    //     )
    //     if(response.status==200){
    //       setProducts(response.data)
    //     }
    //     else{
    //       console.log(response.data);
    //     }
    //   } catch (error) {
    //     setIsModalOpen(true);
    //     setModalMessage("Internal server Error! Unable to fetch products");
    //     setIsAdded(false);
    //     console.log(error.response.data);
    //   }
    // }

    const fetchAllOrders = async () => {
      if (!token) {
        return null;
      }
      try {
        const response = await axios.get(
            "https://forever-backend-yw9l.onrender.com/orders/manageorders",
            { headers: {Authorization :"Bearer "+token } }
        )
        if (response.status === 200) {
          console.log(response.data);
          setOrders(response.data.sort((a,b)=>b.orderId - a.orderId))
        } else {
          alert(response.data.message)
        }
      } catch (error) {
        alert(response.data.message)
      }
    }
  
  
    const statusHandler = async( event , orderId ) => {
      try {
        const response = await axios.post(
            "https://forever-backend-yw9l.onrender.com/orders/manageorders",
            {orderId, status : event.target.value},
            {headers:{Authorization : "Bearer "+token}}
        )
        console.log(response);
        
        if (response.status === 200) {
          await fetchAllOrders()
        }
      } catch (error) {
        console.log(error);
        alert(response.data.message)
      }
    }
  
    useEffect(() => {
      // getProducts();
      fetchAllOrders();
    }, [token])
  
  
    return (
      <div>
        <h3>Orders Page</h3>
        <div>
          {
            orders.map((order, index) => (
              <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-400 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700 ' key={index}>
                <img className='w-12' src={parcel_icon} alt="" />
                <div>
                  <div>
                    {
                      order.orderItems.map((item, index) => {
                          console.log(item);
                        if (index === order.orderItems.length - 1) {
                          <p className='py-0.5 ' key={index}>{item.product.name} x {item.quantity} <span>{item.size}</span> </p>
                        } else {
                          <p className='py-0.5 ' key={index}>{item.product.name} x {item.quantity} <span>{item.size}</span>, </p>
                        }
                      })}
                  </div>
                  <p className='mt-3 mb-2 font-medium'>{order.address.firstName + "" + order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + " , " + order.address.state + ", " + order.address.country + " , " + order.address.zipcode + " , "}</p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className='text-sm sm:text-[15px]'>Itmes : {order.orderItems.length}</p>
                  <p className='mt-3'>Method : {order.paymentMethod}</p>
                  <p>Payment : {order.payment ? 'Done' : 'Pending' }</p>
                  <p>Date {new Date(order.orderDate).toLocaleDateString()}</p>
                </div>
                <p className='text-sm sm:text-[15px]'>₹{order.totalPrice}</p>
                <select onChange={(event)=> statusHandler(event,order.orderId)} value={order.status} className='p-2 font-semibold'>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing"> Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
  
            ))}
        </div>
  
      </div>
    )
}

export default OrdersPage
