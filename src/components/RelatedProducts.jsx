import React, { useContext, useEffect, useState } from 'react'
import ProductItem from './ProductItem';
import { useShopContext } from '../contexts/ShopContext';


function RelatedProducts({ category, subCategory }) {
    const { products } = useShopContext();
    const [related, setRelated] = useState([])

    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            setRelated(productsCopy.slice(0, 5))
        }
    }, [products])



    return (
        <div className='my-24'>
            <div className="text-center text-3xl py-2">
                <div className='inline-flex gap-2 items-center mb-3'>
                    <p className='text-gray-500'>RELATED<span className='text-gray-900 font-medium'>PRODUCTS</span></p>
                    <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-900'></p>
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item,index)=>(
                    <ProductItem key={index} id={item.id} name={item.name} price={item.price} image={item.images[0]} />
                ))}

            </div>

        </div>
    )
}

export default RelatedProducts