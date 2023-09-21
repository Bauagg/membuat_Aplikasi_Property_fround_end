import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom"
import style from '../style.user/style.getByIdHome.module.css'
import { BsFillCartPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const GetByIdRumah = () => {
    const [dataQty, setDataQty] = useState(1)
    const [homeById, setHomeById] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.reducLogin)
    const { id } = useParams()

    const hendleInput = (e) => {
        const input = parseInt(e.target.value)
        if (!isNaN(input) && input >= 1) {
            return setDataQty(input)
        }
    }

    const createCartBeliRumah = () => {
        const cartBody = {
            propertyId: id,
            qty: parseInt(dataQty)
        }

        return axios.post(`http://localhost:4000/cart-beli-rumah`, cartBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                navigate('/navbar-user/cart')
            })
            .catch((error) => console.log('create data Cart Beli Property', error))
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
                                    <h1>{homeById.name}</h1>
                                    <h5>IDR.{homeById.price}</h5>
                                    <div className="pt-4">
                                        <tbody>
                                            <tr>
                                                <td className={style.category}>Description</td>
                                                <td>Rumah sangat bagus</td>
                                            </tr>
                                            <tr>
                                                <td className={style.category}>Category</td>
                                                <td>{homeById.category.name}</td>
                                            </tr>
                                        </tbody>
                                    </div>
                                    <div className="d-flex mt-5">
                                        <div>
                                            <button className={style.btn1} onClick={() => {
                                                if (dataQty > 1) {
                                                    setDataQty(dataQty - 1)
                                                }
                                            }}>
                                                Minus
                                            </button>
                                            <input placeholder="0" type="number" value={dataQty} className={style.inputQty}
                                                onChange={hendleInput} />
                                            <button className={style.btn2} onClick={() => setDataQty(dataQty + 1)}>Plus</button>
                                        </div>
                                        <button onClick={createCartBeliRumah} className={style.btnCart}> <BsFillCartPlusFill /> Masukan Kranjang</button>
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
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GetByIdRumah