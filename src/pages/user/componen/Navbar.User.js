import { Navbar, Dropdown, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.user/style.getProduct.module.css'
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from '../../../images/Group 1.png'
import imageHero from '../../../images/Frame 10.png'
import { useDispatch } from "react-redux";
import { LogoutAction } from '../../../redux/action/action'

const NavbarUser = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const hendleLogout = () => {
        const user = null
        const token = null
        dispatch(LogoutAction(user, token))
        navigate('/')
    }
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
                        <Link to='/' className={style.link}>
                            <span className={style.nav1}>Beranda</span>
                        </Link>
                    </div>
                </div>

                <div className={style.main}>
                    <div className={style.list_item}>
                        <Link to='' className={style.link}>
                            <span className={style.nav1}>Beli Rumah</span>
                        </Link>
                    </div>
                </div>

                <div className={style.main}>
                    <div className={style.list_item}>
                        <Link to='/navbar-user/get-product-sewa-rumah' className={style.link}>
                            <span className={style.nav1}>Sewa Rumah</span>
                        </Link>
                    </div>
                </div>

                <div className={style.main}>
                    <div className={style.items}>
                        <Dropdown>
                            <Dropdown.Toggle variant='warning' className={style.btnDrop}>
                                History
                            </Dropdown.Toggle>

                            <Dropdown.Menu className={style.item1}>
                                <Dropdown.Item onClick={() => navigate('/navbar-user/invoiceBeliRumah')} >Invoice Beli</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate('/navbar-user/invoiceSewaRumah')}>Invoice Sewa</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <Button variant="warning" className={style.btnLogout} onClick={hendleLogout}>
                    Logout
                </Button>
            </div>
            <div className={style.main_content}>
                <Outlet />
            </div>
        </div>
    )
}

export default NavbarUser