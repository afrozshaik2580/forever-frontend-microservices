import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import { ShopContextProvider } from "./contexts/ShopContext";
import Collections from "./pages/Collections";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={
            <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
              <ShopContextProvider>
                <Navbar />
                <Routes>
                  <Route index element={<HomePage />} />
                  <Route path="/collection" element={<Collections />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/place-order" element={<PlaceOrder />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
                <Footer />
              </ShopContextProvider>
            </div>
          } />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App;