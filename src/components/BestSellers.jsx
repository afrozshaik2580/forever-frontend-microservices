import React, { useEffect, useState } from 'react'
import { useShopContext } from '../contexts/ShopContext';
import ProductItem from './ProductItem';

function BestSellers() {

    const[bestSellers, setBestSeller] = useState([]);
    const {products}= useShopContext();

    useEffect(()=>{
        const items= products.filter(item=> item.bestSeller);
        setBestSeller(items.slice(0,5))
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
        <div className='inline-flex gap-2 items-center mb-3'>
            <p className='text-gray-500'>BEST<span className='text-gray-900 font-medium'>SELLERS</span></p>
            <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-900'></p>
        </div>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident at ipsa dolor harum quis qui reiciendis, repellat dolorem totam eius?</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                bestSellers.map((product,index)=>(
                    <ProductItem key={index} id={product.id} name={product.name} image={product.images[0]} price={product.price} />  
                ))
            }
        </div>
      
    </div>
  )
}

export default BestSellers