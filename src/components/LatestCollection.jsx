import React, { useEffect, useState } from 'react'
import { useShopContext } from '../contexts/ShopContext'
import ProductItem from './ProductItem';

function LatestCollection() {

  const[latestProducts,setLatestProducts]= useState([]);
  const {products} = useShopContext();

  useEffect(()=>{
    setLatestProducts(products.slice(0,10))
  },[products])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>LATEST<span className='text-gray-900 font-medium'>COLLECTION</span></p>
          <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-900'></p>
        </div>
           <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque accusamus asperiores aspernatur  vitae.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {
            latestProducts.map((product,index)=>(<ProductItem  key={index} id={product.id} image={product.images[0]} name={product.name} price={product.price}  />))
          }
        </div>
      
    </div>
  )
}

export default LatestCollection