import React, { useEffect, useState } from 'react'
import { useShopContext } from '../contexts/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const {getCartTotalAmount} = useShopContext();
    const delivery_fee = 40;

    return (
        <div className='w-full'>
            <div className='text-2xl'>
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className='flex flex-col gap-2 mt-2 text-sm'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>₹{getCartTotalAmount()}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping fee</p>
                    <p>₹{delivery_fee}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <b>Total </b>
                    <b>₹{getCartTotalAmount() === 0 ? 0 : getCartTotalAmount() + delivery_fee}</b>
                </div>
            </div>
        </div>
    )
}

export default CartTotal