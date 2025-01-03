import React from 'react'
import about_img from "../assets/about_img.png"
import NewsLetter from "../components/NewsLetter"

function About() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>ABOUT<span className='text-gray-900 font-medium'>US</span></p>
          <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-900'></p>
        </div>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img src={about_img} alt="" className='w-full md:max-w-[450px]' />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates sunt asperiores dolores doloremque debitis ipsa animi soluta quos nemo totam hic illum alias suscipit distinctio tempore quam porro, exercitationem quasi.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum quo natus quas, rem molestiae sapiente cum ut harum tenetur? Voluptates earum atque sequi aliquam soluta libero quas laboriosam pariatur vero.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquid voluptatum consequatur sunt natus commodi ullam ea quia corrupti velit modi nostrum soluta laborum excepturi hic dolorum quidem, asperiores dolor.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>WHY<span className='text-gray-900 font-medium'>CHOOSE US</span></p>
          <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-900'></p>
        </div>
      </div>

      <div className='flex flex-col md:flex-row text-sm gap-2'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance : </b>
          <p>We meticulously select and vet each product to ensure it meets the strigent quality standards. </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinience : </b>
          <p>With our user-friendly interface and hasle-free ordering process shopping has never been easier.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer service : </b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our first priority </p>
        </div>
      </div>
      <NewsLetter />


    </div>


  )
}

export default About