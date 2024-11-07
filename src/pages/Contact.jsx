import React from 'react'
import contact_img from "../assets/contact_img.png"
import NewsLetter from '../components/NewsLetter'

function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>CONTACT<span className='text-gray-900 font-medium'>US</span></p>
          <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-900'></p>
        </div>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10'>
        <img  className="w-full md:max-w-[480px]" src={contact_img} alt="" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>54079 William Street <br />Suite 350,Washington DC, USA</p>
          <p className='text-gray-500'><b>Mob :</b> (+91) 8919266197 <br /> <b>Email :</b> afrozshaik2580@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Carrers at Forever</p>
          <p className='text-gray-500'>Learn more abou our team and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsLetter />
      
    </div>
  )
}

export default Contact