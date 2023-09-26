import { Navbar, Dropdown } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../../user/style.user/style.getProduct.module.css'
import { Link, Outlet, useNavigate } from "react-router-dom";

import logo from '../../../images/Group 1.png'
import imageHero from '../../../images/Frame 10.png'

const NavbarAdmin = () => {
    const navigate = useNavigate()
    return (
        <div className={style.container1}>
            <div className={style.sidebar}>
                <Navbar.Brand className={style.brend} >
                    <img alt="logo" src={logo} width="30" className="d-inline-block align-top me-3" />
                    Rumah Impian
                </Navbar.Brand>

                <div>
                    <img alt="gambar hero" src={imageHero} />
                </div>

                <div className={style.main}>
                    <div className={style.list_item}>
                        <Link to='' className={style.link}>
                            <span className={style.nav1}>Product</span>
                        </Link>
                    </div>
                </div>

                <div className={style.main}>
                    <div className={style.list_item}>
                        <Link to='' className={style.link}>
                            <span className={style.nav1}>Order Beli</span>
                        </Link>
                    </div>
                </div>

                <div className={style.main}>
                    <div className={style.list_item}>
                        <Link to='' className={style.link}>
                            <span className={style.nav1}>Order Sewa</span>
                        </Link>
                    </div>
                </div>

                <div className={style.main}>
                    <div className={style.list_item}>
                        <Link className={style.link}>
                            <span className={style.nav1}>Setting</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={style.main_content}>
                <Outlet />
            </div>
        </div>
    )
}

export default NavbarAdmin