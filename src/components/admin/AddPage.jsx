import axios from "axios"
import { useEffect, useState } from "react"
import upload_area from "../../assets/upload_area.png"
import Modal from "./Modal"
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddPage({ token }) {

    const [product, setProduct]=useState(
        {
            name: "",
            description: "",
            price: "",
            category: "Men",
            subCategory: "Topwear",
            sizes:[],
            bestSeller: false
        }
    );
    const [images,setImages]=useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState("")
    const [isAdded, setIsAdded] = useState(false)

    const {id} =useParams()
    const navigate = useNavigate()
    const location = useLocation()

    
    function handleProductChange(e){        
        const {name,value}=e.target;
        setProduct({...product, [name]: value});
    }
    
    function handleSizeChange(e){
        const value=e.target.innerHTML;
        if(!product.sizes.includes(value)){
            setProduct({...product, 'sizes': [...product.sizes,value]});
        }
        else{
            setProduct({...product, 'sizes': product.sizes.filter(size=> size!=value)});
        }
    }
    
    function handleImageChange(e){
        const {name, files} =e.target;
        const file= files[0];
        const reader = new FileReader();
        reader.onloadend = ()=>{
            setImages({...images, [name]: reader.result});
        }
        reader.readAsDataURL(file);
    }
    
    async function onSubmitHandler(e){
        e.preventDefault()
        const productData={
            ...product,
            images: [images.image1, images.image2, images.image3, images.image4]
        };
        
        let response;
        
        try {
            if(id){
                response = await axios.put(
                    `https://forever-backend-yw9l.onrender.com/products/${id}`,
                    JSON.stringify(productData),
                    {   
                        headers: { 
                            Authorization : "Bearer " + token, 
                            'Content-Type': 'application/json',
                        },
                    }
                );
            }
            else{
                response = await axios.post(
                    "http://localhost:8080/products",
                    JSON.stringify(productData),
                    {   
                        headers: { 
                            Authorization : "Bearer " + token, 
                            'Content-Type': 'application/json',
                        },
                    }
                );
            }            
            if(response.status===201){
                setProduct({
                    name: "",
                    description: "",
                    price: "",
                    category: "Men",
                    subCategory: "Topwear",
                    sizes:[],
                    bestSeller: false
                })
                setImages({
                    image1: null,
                    image2: null,
                    image3: null,
                    image4: null
                })
                if(id){
                    setModalMessage('Product updated successfully!');
                    setIsAdded(true);
                }
                else{
                    setModalMessage('Product added successfully!');
                    setIsAdded(true);
                }
            }
            else{
                setModalMessage(response.data);
                setIsAdded(false);
            }
            
        } catch (error) {
            setModalMessage("Internal server error. Please try again later.");
            setIsAdded(false);
            console.log(error);
            
        }
        finally{
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden'
        }
    }
    
    useEffect(()=>{
        if(id && location.state && location.state.product){
            
            const productData = location.state.product;
            setProduct({
                name: productData.name,
                description: productData.description,
                price: productData.price,
                category: productData.category,
                subCategory: productData.subCategory,
                sizes: productData.sizes,
                bestSeller: productData.bestSeller
            });
            setImages({
                image1: productData.images[0],
                image2: productData.images[1],
                image3: productData.images[2],
                image4: productData.images[3]
            })
        }
    },[id, location.state])

    return (
        <div>
            <h1 className="text-3xl text-center text-[#c586a5]">{id ? "Update item": "Add item"}</h1>
            <form className='flex flex-col w-full items-start gap-3' onSubmit={onSubmitHandler}>
                <div>
                    <p className='mb-2'>Upload Image</p>
                    <div className='flex gap-2'>
                        <label htmlFor="image1">
                            <img src={!images.image1 ? upload_area : images.image1} alt="" className='w-20' />
                            <input type="file" onChange={handleImageChange} accept="image/*" id="image1" name="image1" hidden />
                        </label>
                        <label htmlFor="image2">
                            <img src={!images.image2 ? upload_area : images.image2} alt="" className='w-20' />
                            <input type="file" onChange={handleImageChange} name="image2" id="image2" hidden />
                        </label>
                        <label htmlFor="image3">
                            <img src={!images.image3 ? upload_area : images.image3} alt="" className='w-20' />
                            <input type="file" onChange={handleImageChange} name="image3" id="image3" hidden />
                        </label>
                        <label htmlFor="image4">
                            <img src={!images.image4 ? upload_area : images.image4} alt="" className='w-20' />
                            <input type="file" onChange={handleImageChange} name="image4" id="image4" hidden />
                        </label>
                    </div>
                </div>

                <div className='w-full'>
                    <p className='mb-2'>Product Name</p>
                    <input onChange={handleProductChange} name="name" value={product.name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Here' required />
                </div>
                <div className='w-full'>
                    <p className='mb-2'>Product Description</p>
                    <textarea onChange={handleProductChange} name="description" value={product.description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write Content Here' required />
                </div>

                <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

                    <div>
                        <p className='mb-2'>Product Category</p>
                        <select onChange={handleProductChange} name="category" value={product.category} className='w-full px-3 py-2'>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Kids">Kids</option>
                        </select>
                    </div>

                    <div>
                        <p className='mb-2'>Sub Category</p>
                        <select onChange={handleProductChange} name="subCategory" value={product.subCategory} className='w-full px-3 py-2'>
                            <option value="Topwear">Top Wear</option>
                            <option value="Bottomwear">Bottom Wear</option>
                            <option value="Winterwear">Winter Wear</option>
                        </select>
                    </div>

                    <div>
                        <p className='mb-2'> Product Price</p>
                        <input onChange={handleProductChange} name="price" value={product.price} className='w-full px-3  py-2 sm:w-[120px]' type="Number" placeholder='25' />
                    </div>

                </div>

                <div>
                    <p className='mb-2'>Product Sizes</p>
                    <div className='flex gap-3'>
                        <p onClick={handleSizeChange} className={`${product.sizes.includes("S") ? "bg-pink-200" : "bg-slate-200"} px-4 py1 cursor-pointer`}>S</p>
                        <p onClick={handleSizeChange} className={`${product.sizes.includes("M") ? "bg-pink-200" : "bg-slate-200"} px-4 py1 cursor-pointer`}>M</p>
                        <p onClick={handleSizeChange} className={`${product.sizes.includes("L") ? "bg-pink-200" : "bg-slate-200"} px-4 py1 cursor-pointer`}>L</p>
                        <p onClick={handleSizeChange} className={`${product.sizes.includes("XL") ? "bg-pink-200" : "bg-slate-200"} px-4 py1 cursor-pointer`}>XL</p>
                        <p onClick={handleSizeChange} className={`${product.sizes.includes("XXL") ? "bg-pink-200" : "bg-slate-200"} px-4 py1 cursor-pointer`}>XXL</p>
                    </div>
                </div>

                <div className='flex gap-2 mt-2 '>
                    <input onChange={e=>setProduct({...product,bestSeller : e.target.checked})} name="bestSeller" checked={product.bestSeller} type="checkbox" id='bestSeller' />
                    <label className='cursor-pointer ' htmlFor="bestSeller">Add to Best Seller</label>
                </div>

                <button type='submit' className='w-28 py-3  mt-4 bg-black text-white active:bg-gray-800' >ADD</button>
            </form>

            <Modal success={isAdded} isOpen={isModalOpen} onClose={setIsModalOpen} message={modalMessage} />
        </div>
    )
}

export default AddPage
