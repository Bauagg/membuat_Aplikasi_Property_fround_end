import { Container, Row, Form, Button, InputGroup, Card } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.admin/style.getProduct.module.css'
import iconKamarTidur from '../../../images/icon_kamar.png'
import iconBumi from '../../../images/icon_bumi.png'
import iconWc from '../../../images/icon_wc.png'
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataIdGlobal } from '../../../redux/action/action'

const GetProductAdmin = () => {
    const [dataProduct, setDataProduct] = useState([])
    const { token } = useSelector((state) => state.reducLogin)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/product')
            .then((resoult) => setDataProduct(resoult.data.datas))
            .catch((err) => console.log(err))
    })

    const hendleDeleteProduct = (id) => {
        axios.delete(`http://localhost:4000/product/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                axios.get('http://localhost:4000/product')
                    .then((resoult) => setDataProduct(resoult.data.datas))
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container className={style.conten}>
                <Row>
                    <div className={style.container}>
                        <div>
                            <h2>Dasbord Admin</h2>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Recipient's username"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <Button variant="success" id="button-addon2">
                                    Cari
                                </Button>
                            </InputGroup>
                        </div>
                        <Button variant="success" className={style.btnCreate} onClick={() => navigate('/navigate-admin/create-product')}>Create Product</Button>
                    </div>
                    <div>
                        <div className="row custom-row">
                            {
                                dataProduct.map((index) => {
                                    return (
                                        <div key={index._id} className="col-md-3 my-2">
                                            <Card style={{ width: '16rem' }} className={style.card}>
                                                <Card.Img variant="top" src={index.image} className={style.imageHero} />
                                                <Card.Body>
                                                    <Card.Title className={style.title}>IDR.{index.price}</Card.Title>
                                                    <Card.Text className={style.cardText}>
                                                        {index.name}
                                                        <p>{index.category.name}</p>
                                                    </Card.Text>
                                                    <div className={style.icontCart}>
                                                        <div className={style.contenIcon}>
                                                            <img alt="image kamar tidur" src={iconKamarTidur} />{index.kamar_tidur}
                                                            <p className={style.text}>Kamar Tidur</p>
                                                        </div>
                                                        <div className={style.contenIcon}>
                                                            <img alt="image kamar tidur" src={iconWc} />{index.kamar_mandi}
                                                            <p className={style.text2}>Kamar Mandi</p>
                                                        </div>
                                                        <div className={style.contenIcon}>
                                                            <img alt="image kamar tidur" src={iconBumi} /> {index.luas_rumah}cm
                                                            <p className={style.text}>Luas Rumah</p>
                                                        </div>
                                                    </div>
                                                    <button className={style.btnUpdate} onClick={() => {
                                                        navigate(`/navigate-admin/update-product/${index._id}`)
                                                        dispatch(DataIdGlobal(index._id))
                                                    }}>Update</button>
                                                    <button className={style.btnDelete} onClick={() => hendleDeleteProduct(index._id)}>Delete</button>
                                                </Card.Body>
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

export default GetProductAdmin