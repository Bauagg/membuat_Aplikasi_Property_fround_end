import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import style from '../hompage.module.css'
import logo from '../../images/Group 1.png'
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <div>
            <div className={`bg-dark ${style.containerFutter}`}>
                <div>
                    <Navbar bg="dark" data-bs-theme="dark">
                        <Container>
                            <Navbar.Brand className="fw-bold">
                                <img
                                    alt=""
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}
                                Rumah Impian
                            </Navbar.Brand>
                            <Nav className="ms-auto">
                                <Nav.Link><Link to='/' className='text-decoration-none text-white'>Branda</Link></Nav.Link>
                                <Nav.Link><Link className='text-decoration-none text-white'>Layanan</Link></Nav.Link>
                                <Nav.Link><Link className='text-decoration-none text-white'>Kontak</Link></Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
                <p className="text-white pt-3 text-center">Copyright bg Creative Academy All Right Reserved.s</p>
            </div>
        </div>
    )
}

export default Footer