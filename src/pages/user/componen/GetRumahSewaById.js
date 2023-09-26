
import { Container, Row, Col, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom"
import style from '../style.user/style.getByIdHome.module.css'
import { BsFillCartPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const GetByIdRumahSewa = () => {
    const [homeById, setHomeById] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [errorStartDate, setErrorStartDate] = useState('')
    const [errorEndDate, setErrorEndDate] = useState('')
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.reducLogin)
    const { id } = useParams()

    const createCartSewaRumah = () => {
        if (!startDate) {
            return setErrorStartDate('sartDate harus di isi')
        }

        if (!endDate) {
            return setErrorEndDate('sartDate harus di isi')
        }

        const cartBody = {
            productId: id,
            startDate,
            endDate
        }

        axios.post('http://localhost:4000/cart-sewa-rumah', cartBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => navigate('/navbar-user/cart-sewa-rumah'))
            .catch((err) => console.log('error create data cart sewa rumah', err))
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/product/${id}`)
            .then((resolt) => {
                setHomeById(resolt.data.datas)
                setIsLoading(false)
            })
            .catch((error) => console.log('get data error', error))
    }, [id])

    if (isLoading) {
        return <p>Loading...</p>;
    }


    return (
        <div >
            <Container>
                <Row>
                    <Col>
                        <div>
                            <div className={style.container1} >
                                <div>
                                    <img alt="gambar product home" src={homeById.image} className={style.imageHero} />
                                </div>
                                <div className="ps-5">
                                    <div className="d-flex justify-content-between">
                                        <div >
                                            <h4>{homeById.name}</h4>
                                            <h5>IDR.{homeById.price}</h5>
                                            <div className="pt-3">

                                                <h6 className={style.category}>Description</h6>
                                                <p>Rumah sangat bagus</p>

                                                <h6 className={style.category}>Category</h6>
                                                <p>{homeById.category.name}</p>

                                            </div>
                                        </div>
                                        <div className={style.container3}>
                                            <div className={style.formDate}>
                                                <Form>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                        <Form.Label>Start Date</Form.Label>
                                                        <Form.Control type="date" value={startDate} isInvalid={errorStartDate} onChange={(e) => setStartDate(e.target.value)} />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                                        <Form.Label>End Date</Form.Label>
                                                        <Form.Control type="date" value={endDate} isInvalid={errorEndDate} onChange={(e) => setEndDate(e.target.value)} />
                                                    </Form.Group>
                                                </Form>
                                                <button onClick={createCartSewaRumah} className={style.btnSewa}> <BsFillCartPlusFill /> Masukan Sewa Rumah</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style.container2}>
                                <h3 className={style.judulDescription}>Description Detail</h3>
                            </div>
                            <p className={style.paragraf}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                                sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
                                recusandae alias </p>
                        </div>
                    </Col >
                </Row >
            </Container >
        </div >
    )
}

export default GetByIdRumahSewa