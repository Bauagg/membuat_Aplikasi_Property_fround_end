import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../images/Group 1.png'
import styleNavbar from '../style.hompages/style.navbar.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import gambarProfile from '../../images/profile.png'
import { useState } from 'react';
import { LogoutAction } from '../../redux/action/action';

const Navbarhompages = () => {
    const [toggle, setToggle] = useState(false)
    const { user } = useSelector(state => state.reducLogin)
    const navitae = useNavigate()
    const dispatch = useDispatch()

    const hendleToggleLogout = (e) => {
        e.preventDefault()

        setToggle(aktif => !aktif);
    }

    const hendleLogout = () => {
        const user = null
        const role = null
        dispatch(LogoutAction(user, role))
    }

    return (
        <div>
            <Navbar data-bs-theme="dark" className={`position-fixed w-100 ${styleNavbar.navbar}`}>
                <Container>
                    <Navbar.Brand className={styleNavbar.brand}>
                        <img alt="" src={logo} width="30" className="d-inline-block align-top me-3" />
                        Rumah Impian
                    </Navbar.Brand>
                    <Nav className="me-auto mx-auto">
                        <Nav.Link className={styleNavbar.Link}><Link to='/' className='text-decoration-none text-white'>BRANDA</Link></Nav.Link>
                        <Nav.Link className={styleNavbar.Link}><Link to='/pelayanan' className='text-decoration-none text-white'>LAYANAN</Link></Nav.Link>
                        <Nav.Link className={styleNavbar.Link}><Link to='/contact' className='text-decoration-none text-white'>KONTAK</Link></Nav.Link>
                    </Nav>
                    {
                        user ? (
                            <div >
                                <div onClick={hendleToggleLogout}>
                                    <img alt='gambar profile' src={gambarProfile} className={styleNavbar.imageProfile} />
                                </div>

                                {
                                    toggle && (
                                        <div className={styleNavbar.dropdownTogle}>
                                            <div className={styleNavbar.nameProfile}>
                                                <h6 className='text-center'>{user}</h6>
                                            </div>
                                            <div className={styleNavbar.nameProfile}>
                                                <h6 className='text-center'>Profile</h6>
                                            </div>
                                            <Button variant="warning" className={styleNavbar.btnLogout} onClick={hendleLogout}>Logout</Button>
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <div>
                                <button className={styleNavbar.btn_primery} onClick={() => navitae('/register')}>Daftar</button>
                                <button className={styleNavbar.btn_keyprimer} onClick={() => navitae('/login')}>Masuk</button>
                            </div>
                        )
                    }

                </Container>
            </Navbar>
        </div>
    )
}

export default Navbarhompages