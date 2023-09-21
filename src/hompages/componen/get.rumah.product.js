import { Tab, Nav, InputGroup, Dropdown, DropdownButton, Form, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.hompages/style.get.rumah.product.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import icon_rumah from '../../images/icon_rumah.png'
import icon_dolar from '../../images/icon_dolar.png'
import icon_kamar from '../../images/icon_kamar.png'
import icon_wc from '../../images/icon_wc.png'
import icon_bumi from '../../images/icon_bumi.png'

const GetProductRumah = () => {
    const [datasProduct, setDatasProduct] = useState([])
    const { user, token } = useSelector((state) => state.reducLogin)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get('http://localhost:4000/product')
            .then((resoult) => {
                setDatasProduct(resoult.data.datas.slice(0, 4))
            })
            .catch((error) => console.log(error))
    }, [])

    return (
        <div>
            {/* Search section */}
            <section id={style.search}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className={style.search_judul}>Temukan Rumah Impianmu</h1>
                            <p className={style.search_paragraf}>sekarang Anda dapat menghemat semua hal stres, waktu, dan biaya <br /> tersembunyi, dengan ratusan rumah untuk anda</p>
                        </div>
                    </div>
                </div>

                <div className="col-9 mx-auto">
                    <Tab.Container id="myTab" defaultActiveKey="home">
                        <Nav className={style.button_jual}>
                            <Nav.Item>
                                <Nav.Link eventKey="jual" className={style.search_lis}>Jual</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="sewa" className={style.search_lis}>Sewa</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="property_baru" className={style.search_lis}>Property Baru</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="jual">

                                {/* Dropdown */}
                                <InputGroup className={`mb-3`}>
                                    <DropdownButton
                                        title={<span><img src={icon_rumah} alt="Icon Rumah" className="me-2" /> Type Rumah</span>}
                                        id={style.customDropdown1}
                                    >
                                        <Dropdown.Item href="#">Action</Dropdown.Item>
                                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                    </DropdownButton>

                                    <DropdownButton
                                        title={<span className={style.customDropdown}><img src={icon_dolar} alt="Icon Rumah" className="me-2" /> Rangger Harga</span>}
                                        id={style.customDropdown2}
                                    >
                                        <Dropdown.Item href="#">Action</Dropdown.Item>
                                        <Dropdown.Item href="#">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item href="#">Separated link</Dropdown.Item>
                                    </DropdownButton>
                                    <Form.Control aria-label="Text input dropdown button" placeholder="cari berdasarkam lokasi, ID, Property" className={`ps-5 ${style.form_input_search}`} />

                                    <Button id={style.button_search}>Cari </Button>
                                </InputGroup>
                                {/* Dropdown */}

                            </Tab.Pane>
                            <Tab.Pane eventKey="sewa">
                                Sewa
                            </Tab.Pane>
                            <Tab.Pane eventKey="property_baru">
                                Property Baru
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>

                </div>
            </section >
            {/* Search section */}

            {/*branda section */}
            <section >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className={style.judul_branda}>Rekomendasi Rumah Untuk Mu</h1>
                        </div>
                    </div>
                    <div className={`row custom-row ${style.cart}`}>

                        {
                            datasProduct.map((index) => {
                                return (
                                    <div key={index._id} className={`col-md-3 mx-1 my-2 ${style.tempat_cart}`}>
                                        <Card className={style.cart1}>
                                            <Card.Img variant="top" className={style.image_product} src={index.image} />
                                            <Card.Body>
                                                <Card.Title className={style.text_titel}>IDR.{index.price}</Card.Title>
                                                <Card.Text className={style.cart_text}>
                                                    {index.alamat}
                                                    <p>{index.category.name}</p>
                                                </Card.Text>
                                            </Card.Body>
                                            <div className={`d-flex ${style.icon_branda}`}>
                                                <div>
                                                    <img src={icon_kamar} alt="icon kamar" className={style.icon_gambar1} /> {index.kamar_tidur}
                                                    <p className={style.icon_paragraf}>Kamar Tidur</p>
                                                </div>
                                                <div className="mx-3">
                                                    <img src={icon_wc} alt="icon wc" className={style.icon_gambar2} /> {index.kamar_mandi}
                                                    <p className={style.icon_paragraf2}>Kamar Mandi</p>
                                                </div>
                                                <div >
                                                    <img src={icon_bumi} alt="icon bumu" /> {index.luas_rumah}cm
                                                    <p className={style.icon_paragraf}>Luas Rumah</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )
                            })
                        }

                        <button onClick={() => user ? navigate('/navbar-user') : navigate('/login')} className={style.lihat_lainya}>Lihat Lainya...</button>
                    </div>
                </div>
            </section>
            {/*branda section */}
        </div>
    )
}

export default GetProductRumah