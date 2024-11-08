import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ShopContext = createContext();

function ShopContextProvider({children}) {
    
    const BACKEND_URL="https://forever-backend-yw9l.onrender.com";
    const [name, setName] = useState('');
    const [products, setProducts]=useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [orderData, setOrderData] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');
    const navigate = useNavigate();
    
    async function validateAndSetToken(){
        if(token !== ''){
            try {
                const response = await axios.post(
                    `${BACKEND_URL}/auth/validateToken`,
                    token,
                    {headers:{'Content-Type': 'text/plain'}}
                );
                if(!response.data.valid || !response.data.roles.includes("USER")){
                    setToken('');
                    localStorage.setItem('token', '');
                }
                else{
                    setName(response.data.name)
                }
            } catch (error) {
                setToken('');
                localStorage.setItem('token','')
            }
        }
    }

    async function handleLogout() {
        setToken('');
        localStorage.setItem('token','');
        setCartItems([]);
        setName('');
        setOrderData([]);
    }

    async function fetchProducts() {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/products`)
            if(response.status === 200){
                setProducts(response.data);
            }
        } catch (error) {
            console.log(error.response);
        }
        finally{
            setLoading(false);
        }
    }

    async function addToCart(productId, size) {
        if(!token || token === ''){
            navigate("/login");
            return
        }
        if(!size){
            console.log("select size");
            return
        }
        try {
            const response = await axios.put(
                `${BACKEND_URL}/user/cart/add`,
                {id:productId, size},
                {headers:{Authorization: "Bearer "+token}}
            )
            if(response.status === 200){
                fetchCartItems()
            }
        } catch (error) {
            console.log(error.response);
            
        }
    }

    async function updateCart(productId, size, quantity) {
        if(!token || token === ''){
            navigate("/login");
            return
        }
        if(!size){
            console.log("select size");
            return
        }
        try {
            const response = await axios.put(
                `${BACKEND_URL}/user/cart/update`,
                {productId, size, quantity},
                {headers:{Authorization: "Bearer "+token}}
            )
            if(response.status === 200){
                fetchCartItems()
            }
        } catch (error) {
            console.log(error.response);      
        }
    }

    async function fetchCartItems() {
        if(!token || token === ''){
            setCartItems([]);
            return;
        }
        try {
            const response = await axios.get(
                `${BACKEND_URL}/user/cart`,
                {headers:{Authorization: "Bearer "+token}}
            )
            if(response.status === 200){
                setCartItems(response.data);
            }
        } catch (error) {
            console.log(error.response.data);
        }        
    }

    function getCartCount(){
        let cartCount = 0;
        for(let i=0; i<cartItems.length; i++){
            cartCount += cartItems[i].quantity;
        }
        return cartCount;
    }
    
    function getCartTotalAmount(){
        let total=0;
        for(let i=0; i<cartItems.length; i++){
            total += cartItems[i].product.price * cartItems[i].quantity;
        }
        return Math.round(total * 100)/100 ;
    }

    const loadOrderData = async () => {
        try {
            if (!token || token === '') {
                setOrderData([])
                return
            }
            const response = await axios.get(`${BACKEND_URL}/user/orders/all`,{headers:{Authorization: `Bearer ${token}`}})
            if (response.status === 200) {
                response.data.map((order) => {
                    order.orderItems.map((item) => {
                    let product
                    if(products.length !==0 ) product = products.find((product) => product.id === parseInt(item.productId, 10));
                    if(product) item['image'] = product.images[0]
                    // allOrdersItem.push(item)
                    })
                })
                setOrderData(response.data.reverse());
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchProducts();
    },[])

    useEffect(()=>{
        validateAndSetToken();
    },[token])
    
    const value ={
        name, products, BACKEND_URL, token, setToken, handleLogout, loading, navigate, 
        fetchProducts, addToCart, getCartCount, cartItems, fetchCartItems, 
        setCartItems, updateCart, getCartTotalAmount, orderData, setOrderData, loadOrderData };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}

function useShopContext() {
    const state=useContext(ShopContext);
    if(state === undefined){
        throw new Error("usecontest must be used within shop")
    } 
    return state;
};


export {ShopContextProvider, useShopContext};
