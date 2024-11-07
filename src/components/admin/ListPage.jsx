import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from "./Modal"
import { useNavigate } from 'react-router-dom';

function ListPage( {token} ) {
  const [products,setProducts]=useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState("")
  const [isAdded, setIsAdded] = useState(false)

  const navigate= useNavigate();

  async function getProducts() {
    try {
      const response=await axios.get(
        "http://localhost:8080/products",
      )
      if(response.status==200){
        setProducts(response.data)
      }
      else{
        console.log(response.data);
      }
    } catch (error) {
      setIsModalOpen(true);
      setModalMessage("Internal server Error! Unable to fetch products");
      setIsAdded(false);
      console.log(error.response.data);
    }
  }
  
  async function removeProduct(productId){
    try {
      const response=await axios.delete(
        `http://localhost:8080/products/${productId}`,
        {headers: {Authorization: "Bearer "+ token}}
      )
      
      if(response.status === 200){
        setModalMessage('Product removed successfully!');
        setIsAdded(true);
        getProducts()
      }
    } catch (error) {
      setModalMessage("Error deleting product. Please try again later.");
      setIsAdded(false);
      console.error("error deleting product",error);
      setError('Error deleting product');

    } finally{
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden'
    }
  }

  function updateProduct(product){
    navigate(`/admin/update/${product.id}`, {state: {product}})
  }

  useEffect(()=>{
    getProducts()
  },[])
  
  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className='flex flex-col gap-2'>
        
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm gap-x-4'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
          </div>

          {
            products.map((product,index) => (
              <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                <img className='w-20' src={product.images[0]} alt={product.name} />
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>₹{product.price}</p>
                <div className='flex gap-4 justify-center'>
                  <button  onClick={()=>updateProduct(product)} className='text-right md:text-center cursor-pointer text-lg rounded-full flex justify-center'>
                    <svg className='mt-[2px] w-7 h-7' fill="#2c87e8" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 420.827 420.827" xmlSpace="preserve" stroke="#2c87e8">
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                      <g id="SVGRepo_iconCarrier"> <g> <g> <path d="M210.29,0C156,0,104.43,20.693,65.077,58.269C25.859,95.715,2.794,146.022,0.134,199.921 c-0.135,2.734,0.857,5.404,2.744,7.388c1.889,1.983,4.507,3.105,7.244,3.105h45.211c5.275,0,9.644-4.098,9.979-9.362 c4.871-76.214,68.553-135.914,144.979-135.914c80.105,0,145.275,65.171,145.275,145.276c0,80.105-65.17,145.276-145.275,145.276 c-18.109,0-35.772-3.287-52.501-9.771l17.366-15.425c2.686-2.354,3.912-5.964,3.217-9.468c-0.696-3.506-3.209-6.371-6.592-7.521 l-113-32.552c-3.387-1.149-7.122-0.407-9.81,1.948c-2.686,2.354-3.913,5.963-3.218,9.467L69.71,403.157 c0.696,3.505,3.209,6.372,6.591,7.521c3.383,1.147,7.122,0.408,9.81-1.946l18.599-16.298 c31.946,18.574,68.456,28.394,105.581,28.394c116.021,0,210.414-94.392,210.414-210.414C420.705,94.391,326.312,0,210.29,0z"/> <path d="M195.112,237.9h118.5c2.757,0,5-2.242,5-5v-30c0-2.757-2.243-5-5-5h-83.5v-91c0-2.757-2.243-5-5-5h-30 c-2.757,0-5,2.243-5,5v126C190.112,235.658,192.355,237.9,195.112,237.9z"/> </g> </g> </g>
                    </svg>
                  </button>
                  <button onClick={()=>removeProduct(product.id)} className='text-right md:text-center cursor-pointer text-lg rounded-full flex justify-center'>
                    <svg className='w-8 h-8' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256">
                      <g fill="#FA5252" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"  style={{mixBlendMode: 'normal'}}><g transform="scale(8.53333,8.53333)"><path d="M14.98438,2.48633c-0.55152,0.00862 -0.99193,0.46214 -0.98437,1.01367v0.5h-5.5c-0.26757,-0.00363 -0.52543,0.10012 -0.71593,0.28805c-0.1905,0.18793 -0.29774,0.44436 -0.29774,0.71195h-1.48633c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587h18c0.36064,0.0051 0.69608,-0.18438 0.87789,-0.49587c0.18181,-0.3115 0.18181,-0.69676 0,-1.00825c-0.18181,-0.3115 -0.51725,-0.50097 -0.87789,-0.49587h-1.48633c0,-0.26759 -0.10724,-0.52403 -0.29774,-0.71195c-0.1905,-0.18793 -0.44836,-0.29168 -0.71593,-0.28805h-5.5v-0.5c0.0037,-0.2703 -0.10218,-0.53059 -0.29351,-0.72155c-0.19133,-0.19097 -0.45182,-0.29634 -0.72212,-0.29212zM6,9l1.79297,15.23438c0.118,1.007 0.97037,1.76563 1.98438,1.76563h10.44531c1.014,0 1.86538,-0.75862 1.98438,-1.76562l1.79297,-15.23437z"></path></g></g>
                    </svg>
                  </button>
                </div>
              </div>
            ))
          }
      </div>
      <Modal success={isAdded} isOpen={isModalOpen} onClose={setIsModalOpen} message={modalMessage} />
    </>
  )
}

export default ListPage