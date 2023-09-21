import { Route, Routes, useLocation } from "react-router-dom"

import Login from "../pages/umum/login"
import Hompages from "../hompages/hompages"
import Register from "../pages/umum/register"
import Contak from "../hompages/componen/contak"
import PelayanaHompages from "../hompages/componen/pelayanan.hompages"
import NavbarUser from "../pages/user/componen/Navbar.User"
import Navbarhompages from "../hompages/componen/navbar"
import GetByIdRumah from "../pages/user/componen/GetById.Rumah"
import GetCartHome from "../pages/user/componen/GetCart"
import GetProduct from "../pages/user/componen/Get,Product"
import { useSelector } from "react-redux"
import GetProductSewarumah from "../pages/user/componen/Get.Sewa.Rumah"
import GetCartSewaRumah from "../pages/user/componen/getCartSewaRumah"
import GetByIdRumahSewa from "../pages/user/componen/GetRumahSewaById"


const RouterAplication = () => {
    const { role } = useSelector(state => state.reducLogin)
    const { id } = useSelector(state => state.reducProduct)
    const location = useLocation()

    const pathsWithoutNavbar = ["/navbar-user", `/navbar-user/get-product-by-id/${id}`, '/navbar-user/cart', '/navbar-user/get-product-sewa-rumah', '/navbar-user/cart-sewa-rumah', `/navbar-user/get-rumah-sewa/${id}`];
    const shouldDisplayNavbar = !pathsWithoutNavbar.includes(location.pathname)
    return (
        <div>
            {shouldDisplayNavbar && <Navbarhompages />}
            <Routes>
                <Route path="/" element={<Hompages />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contak />} />
                <Route path="/pelayanan" element={<PelayanaHompages />} />
                <Route path="/navbar-user" element={<NavbarUser />}>
                    <Route path="" element={<GetProduct />} />
                    <Route path="get-product-by-id/:id" element={<GetByIdRumah />} />
                    <Route path="get-rumah-sewa/:id" element={<GetByIdRumahSewa />} />
                    <Route path="get-product-sewa-rumah" element={<GetProductSewarumah />} />
                    <Route path="cart-sewa-rumah" element={<GetCartSewaRumah />} />
                    <Route path="cart" element={<GetCartHome />} />
                </Route>
            </Routes>
        </div>
    )
}

export default RouterAplication