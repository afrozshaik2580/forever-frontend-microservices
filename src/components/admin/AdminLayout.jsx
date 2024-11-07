import { NavLink, Outlet, useNavigate, Routes, Route} from "react-router-dom";
import AddPage from "../AddPage";

function AdminLayout() {
    const navigate= useNavigate();
    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }
        
    return (
        <div>
            <h2>Admin Panel</h2>
            <nav>
                <NavLink to="add">Add product</NavLink>
                <NavLink to="update">update product</NavLink>
                <button onClick={handleLogout}>logout</button>
            </nav>  
            <Routes>
                <Route path="add" element={<AddPage />} />
                <Route path="update" element={<AddPage />} />
            </Routes>
            <Outlet />
        </div>
    )
}

export default AdminLayout