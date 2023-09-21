import iconButton from '../../../images/arrow.png'
import iconSampah from '../../../images/Trash Can.png'
import axios from 'axios'
import { Col, Container, Row, Form } from "react-bootstrap"
import style from '../style.user/style.getCart.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

const GetCartHome = () => {
    const [dataCart, setDataCart] = useState([])
    const [cartIndex, setCartIndex] = useState(0)
    const { token } = useSelector(state => state.reducLogin)

    useEffect(() => {
        axios.get('http://localhost:4000/cart-beli-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                setDataCart(resoult.data.datas)
                setCartIndex(resoult.data.datas.length)
            })
            .catch((error) => console.log('get data gart beli rumah error', error))
    }, [])

    const hendleDleteCartBeliRumah = (id) => {
        axios.delete(`http://localhost:4000/cart-beli-rumah/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                axios.get('http://localhost:4000/cart-beli-rumah', { headers: { Authorization: `Bearer ${token}` } })
                    .then((resoult) => {
                        setDataCart(resoult.data.datas)
                        setCartIndex(resoult.data.datas.length)
                    })
                    .catch((error) => console.log('get data gart beli rumah error', error))
            })
            .catch((error) => console.log(error))
    }

    const updateCartBeliRumha = (id) => {

        axios.put(`http://localhost:4000/cart-beli-rumah/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                axios.get('http://localhost:4000/cart-beli-rumah', { headers: { Authorization: `Bearer ${token}` } })
                    .then((resoult) => {
                        setDataCart(resoult.data.datas)
                        setCartIndex(resoult.data.datas.length)
                    })
                    .catch((error) => console.log('get data gart beli rumah error', error))
            })
            .catch((error) => console.log(error))
    }

    return (
        <div>
            <Container className="w-100 pb-5">
                <Row>
                    <Col>
                        <div>
                            <div className={style.container1}>
                                <div className={style.judulCart}>
                                    <Link to='/navbar-user' className="d-flex text-decoration-none ">
                                        <img alt="img tombol cart" src={iconButton} className={style.iconBtn} />
                                        <h3 className="text-dark">Shopping Continue</h3>
                                    </Link>
                                </div>
                                <div>
                                    <h4 className="text-success">Shopping cart</h4>
                                    <p className="mb-4">You have {cartIndex} item in your cart</p>
                                    <div className="d-flex justify-content-between">
                                        <button className={style.btnSelect}>Transaksi</button>
                                        <button className={style.btnSelect}>Select All</button>
                                    </div>
                                    {
                                        dataCart.map((index, item) => {
                                            return (
                                                <Row>
                                                    <Col>
                                                        <div key={index._id} className={style.container2} onClick={() => hendleDleteCartBeliRumah(index._id)}>
                                                            <button className={style.btnSampah}>
                                                                <img alt="btn sampah" src={iconSampah} /> Sampah
                                                            </button>
                                                            <div className={style.conten}>
                                                                <img alt="ptoduct cart" src={index.propertyId.image} className={style.imageProduct} />
                                                                <div className="ps-3">
                                                                    <h5 className={style.judulProduct}>{index.propertyId.name}</h5>
                                                                    <p className={style.pragrafProduct}>{index.propertyId.category.name}</p>
                                                                </div>
                                                            </div>
                                                            <div className={style.qty}>
                                                                <button className={style.btnMinus}>Minus</button>
                                                                <input placeholder="0" className={style.inputQty} value={index.qty} readOnly />
                                                                <button className={style.btnPlus}>Plus</button>
                                                            </div>
                                                            <div className={style.conten1}>
                                                                <h6>IDR.{index.total}</h6>
                                                                <Form.Check label='Chekout' />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GetCartHome