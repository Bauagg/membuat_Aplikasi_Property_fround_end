import iconButton from '../../../images/arrow.png'
import iconSampah from '../../../images/Trash Can.png'

import { Col, Container, Row, Form } from "react-bootstrap"
import style from '../style.user/style.cartSewaRumah.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const GetCartSewaRumah = () => {
    const [dataCartSewaRumah, setDataCartSewaRumah] = useState([])
    const [contCart, setContCart] = useState(0)
    const { token } = useSelector(state => state.reducLogin)

    useEffect(() => {
        axios.get('http://localhost:4000/cart-sewa-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoul) => {
                setDataCartSewaRumah(resoul.data.datas)
                setContCart(resoul.data.datas.length)
            })
            .catch((err) => console.log('get data cart sewa rumah error', err))
    }, [])

    const hendleDleteCartSewaRumah = (id) => {
        axios.delete(`http://localhost:4000/cart-sewa-rumah/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {

                axios.get('http://localhost:4000/cart-sewa-rumah', { headers: { Authorization: `Bearer ${token}` } })
                    .then((resoul) => {
                        setDataCartSewaRumah(resoul.data.datas)
                        setContCart(resoul.data.datas.length)
                    })
                    .catch((err) => console.log('get data cart sewa rumah error', err))
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container className="w-100 pb-5">
                <Row>
                    <Col>
                        <div>
                            <div className={style.container1}>
                                <div className={style.judulCart}>
                                    <Link to='/navbar-user/get-product-sewa-rumah' className="d-flex text-decoration-none ">
                                        <img alt="img tombol cart" src={iconButton} className={style.iconBtn} />
                                        <h3 className="text-dark">Shopping Continue</h3>
                                    </Link>
                                </div>
                                <div>
                                    <h4 className="text-success">Shopping cart</h4>
                                    <p className="mb-4">You have {contCart} item in your cart</p>
                                    <div className="d-flex justify-content-between">
                                        <button className={style.btnSelect}>Transaksi</button>
                                        <button className={style.btnSelect}>Select All</button>
                                    </div>
                                    {
                                        dataCartSewaRumah.map((index) => {
                                            return (
                                                <div key={index._id} className={style.container2}>
                                                    <div className={style.conten2}>
                                                        <button className={style.btnSampah} onClick={() => hendleDleteCartSewaRumah(index._id)}>
                                                            <img alt="btn sampah" src={iconSampah} /> Sampah
                                                        </button>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <img alt="ptoduct cart" src={index.productId.image} className={style.imageProduct} />
                                                        <div className={style.nameProduct}>
                                                            <h5 className={style.judulProduct}>{index.productId.name}</h5>
                                                            <div>
                                                                <p>{index.productId.category.name}</p>
                                                                <p className={style.pragrafProduct}>IDR.{index.productId.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={style.date}>
                                                        <div className={style.dateData}>
                                                            <div>
                                                                <h6 className='mt-2'>Start Date</h6>
                                                                <p className='mb-0'>2023-10-10</p>
                                                            </div>
                                                            <div>
                                                                <h6 className='mt-2'>Start Date</h6>
                                                                <p className='mb-0'>2023-10-10</p>
                                                            </div>
                                                        </div>
                                                        <button className={style.btnUpdate}>Update</button>
                                                    </div>
                                                    <div className={style.chekout}>
                                                        <Form.Check label='Chekout' />
                                                    </div>
                                                </div>
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

export default GetCartSewaRumah