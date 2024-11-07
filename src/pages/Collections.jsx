import React, { useContext, useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem'
import { useShopContext } from '../contexts/ShopContext'
import dropdown_icon from "../assets/dropdown_icon.png"
import search_icon from "../assets/search_icon.png"
function Collections() {
  const { products } = useShopContext()
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [categeory, setCategeory] = useState([])
  const [subCateogry, setSubCategeory] = useState([])
  const [sortType, setSortType] = useState('relavent')

  const [search, setSearch] = useState("")
  
  
  const toggleCategeory = (e) => {

    if (categeory.includes(e.target.value)) {
      setCategeory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategeory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategeory = (e) => {
    if (subCateogry.includes(e.target.value)) {
      setSubCategeory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategeory(prev => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();  

    if (search){
      productsCopy = productsCopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }
    
    if (categeory.length > 0) {
      productsCopy = productsCopy.filter(item => categeory.includes(item.category))
    }

    if (subCateogry.length > 0) {
      productsCopy = productsCopy.filter(item => subCateogry.includes(item.subCategory))
    }
    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
        break;

      default:
        applyFilter();
        break;
    }

  }

  useEffect(() => {
    applyFilter();
  }, [categeory, subCateogry,search,products])

  useEffect(() => {
    sortProduct()
  }, [sortType])


  return (
    <>
    <div className='border border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
          <input type="text" placeholder='Search' className='flex-1 outline-none bg-inherit text-sm h-8' value={search}
          onChange={(e)=>setSearch(e.target.value)} />
          <img src={search_icon} alt='' className='w-4' /> 
      </div>
      {/* <img src={assets.cross_icon} alt='' className='inline w-3 cursor-pointer' onClick={()=>{setShowSearch(false)}} />  */}
    </div>
    
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} />
        </p>
        {/* Categeory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGEORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className='flex-gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategeory} /> &nbsp;  Men
            </p>
            <p className='flex-gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategeory} /> &nbsp; Women
            </p>
            <p className='flex-gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategeory} /> &nbsp; kids
            </p>
          </div>
        </div>
        {/* SubCateogry Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className='flex-gap-2'>
              <input type="checkbox" className='w-3' onChange={toggleSubCategeory} value={'Topwear'} /> &nbsp;  Top wear
            </p>
            <p className='flex-gap-2'>
              <input type="checkbox" className='w-3' onChange={toggleSubCategeory} value={'Bottomwear'} /> &nbsp; Bottom wear
            </p>
            <p className='flex-gap-2'>
              <input type="checkbox" className='w-3' onChange={toggleSubCategeory} value={'Winterwear'} /> &nbsp; Winter wear
            </p>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <div className='inline-flex gap-2 items-center mb-3'>
          <p className='text-gray-500'>ALL<span className='text-gray-900 font-medium'>COLLECTIONS</span></p>
          <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-900'></p>
        </div>
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border border-gray-300 text-sm px-2 '>
            <option value="relavent">Sort by: Relavant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map the products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.length ===0 ? "No Products Found":
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item.id} price={item.price} image={item.images[0]} />
            ))
          }

        </div>

      </div>
    </div>
    </>
  )
}

export default Collections