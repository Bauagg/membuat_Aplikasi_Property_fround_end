import { Container, Row, Card, Form, Button, InputGroup } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.user/style.getProduct.module.css'
import { Link, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { useEffect } from "react";
import axios from "axios";
import icon_kamar from '../../../images/icon_kamar.png'
import icon_wc from '../../../images/icon_wc.png'
import icon_bumi from '../../../images/icon_bumi.png'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataIdGlobal } from "../../../redux/action/action";

const GetProduct = () => {
    const [product, setProduct] = useState([])
    const [cartIndex, setCartIndex] = useState(0)
    const [search, setSearch] = useState('')
    const { token } = useSelector(state => state.reducLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchProduct = () => {
        axios.get(`http://localhost:4000/product/?name=${search}`)
            .then((resolt) => {
                const filterProduct = resolt.data.datas.filter((product) => {
                    return product.category.name === 'Beli Rumah' || product.category.name === 'Property Baru'
                })
                setProduct(filterProduct)
            })
            .catch((error) => console.log('get data error', error))
    }

    useEffect(() => {
        searchProduct()

        axios.get('http://localhost:4000/cart-beli-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                setCartIndex(resoult.data.datas.length)
            })
            .catch((error) => console.log('get data gart beli rumah error', error))
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <div className="col-12">
                        <div className="d-flex justify-content-between mt-5" >
                            <div>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Recipient's username"
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <Button className={style.btn_cari} onClick={() => searchProduct()}>
                                        Cari
                                    </Button>
                                </InputGroup>
                            </div>
                            <div>
                                <Link to='/navbar-user/cart' className="text-decoration-none text-dark">
                                    <BsFillCartCheckFill className={style.cart3} />
                                    <span className={`badge ${style.cart2}`}>{cartIndex}</span>
                                    <p className="d-inline px-3 text-secondary">/ Carts</p>
                                </Link>
                            </div>
                        </div>
                        <h1>Rumah Impian</h1>
                        <div className={`row custom-row ${style.cart}`}>
                            {
                                product.map((index) => {
                                    return (
                                        <div key={index._id} className={`col-md-3 mx-1 my-2 ${style.tempat_cart}`}>
                                            <Card className={style.cart1}>
                                                <Card.Img variant="top" className={style.image_product} src={index.image} />
                                                <Card.Body>
                                                    <Card.Title className={style.text_titel}>IDR.{index.price}</Card.Title>
                                                    <Card.Text className={style.cart_text}>
                                                        {index.name},
                                                        <p>{index.alamat}</p>
                                                    </Card.Text>
                                                </Card.Body>
                                                <div className={`d-flex ${style.icon_branda}`}>
                                                    <div>
                                                        <img src={icon_kamar} alt="icon kamar" className={style.icon_gambar1} />{index.kamar_tidur}
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
                                                <Button
                                                    onClick={() => {
                                                        navigate(`/navbar-user/get-product-by-id/${index._id}`)
                                                        dispatch(DataIdGlobal(index._id))
                                                    }}>
                                                    {index.category.name}
                                                </Button>
                                            </Card>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default GetProduct