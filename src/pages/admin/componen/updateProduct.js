import { Col, Container, Row, Form, Button } from "react-bootstrap"
import style from '../style.admin/style.createProduct.module.css'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"

const UpdateProductAdmin = () => {
    const [name, setName] = useState('')
    const [kamar_tidur, setKamar_tidur] = useState('')
    const [kamar_mandi, setKamar_mandi] = useState('')
    const [luas_rumah, setLuas_rumah] = useState('')
    const [alamat, setAlamat] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [image, setImage] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorKamarTidur, setErrorKamarTidur] = useState('')
    const [errorKamarMandi, seterrorKamarMandi] = useState('')
    const [errorLuasRumah, setErrorLuasRumah] = useState('')
    const [errorAlamat, setErrorAlamat] = useState('')
    const [errorPrice, setErrorPrice] = useState('')
    const [errorCategory, setErrorCategory] = useState('')
    const [errorImage, setErrorImage] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()
    const { token } = useSelector((state) => state.reducLogin)

    useEffect(() => {
        axios.get(`http://localhost:4000/product/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                setName(resoult.data.datas.name)
                setKamar_tidur(resoult.data.datas.kamar_tidur)
                setKamar_mandi(resoult.data.datas.kamar_mandi)
                setLuas_rumah(resoult.data.datas.luas_rumah)
                setAlamat(resoult.data.datas.alamat)
                setPrice(resoult.data.datas.price)
                setCategory(resoult.data.datas.category.name)
                setImage(resoult.data.datas.image)

            })
            .catch((err) => console.log(err))
    }, [])

    const hendleUpdateProduct = () => {
        if (!name) {
            return setErrorName('Name harus di isi')
        }

        if (!kamar_mandi) {
            return seterrorKamarMandi('Kamar Mandi harus di isi')
        }

        if (!kamar_tidur) {
            return setErrorKamarTidur('Kamar tidur harus di isi')
        }

        if (!luas_rumah) {
            return setErrorLuasRumah('Luas Rumah harus di isi')
        }

        if (!alamat) {
            return setErrorAlamat('Alamat harus di isi')
        }

        if (!price) {
            return setErrorPrice('price harus di isi')
        }

        if (!category) {
            return setErrorCategory('Categori harus di isi')
        }

        if (!image) {
            return setErrorImage('Image harus di isi')
        }

        const bodyReques = {
            name,
            kamar_mandi,
            kamar_tidur,
            luas_rumah,
            alamat,
            price,
            category,
            image
        }
        axios.put(`http://localhost:4000/product/${id}`, bodyReques, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                navigate('/navigate-admin')
            })
            .catch((err) => console.log(err))
    }
    return (
        <div>
            <Container className={style.container}>
                <div className={style.conten}>
                    <h1>Update Product</h1>
                    <Button variant="success" className={style.btnkembali} onClick={() => navigate('/navigate-admin')}>Kembali</Button>
                </div>
                <div className={style.container2}>
                    <Row>
                        <Col>
                            <label className={style.label}> Name Product
                                <Form.Control
                                    type="text"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    isInvalid={errorName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorName}
                                </Form.Control.Feedback>
                            </label>
                        </Col>
                        <Col>
                            <label className={style.label}> Kamar Tidur
                                <Form.Control
                                    type="number"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    value={kamar_tidur}
                                    onChange={(e) => setKamar_tidur(e.target.value)}
                                    isInvalid={errorKamarTidur}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorKamarTidur}
                                </Form.Control.Feedback>
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label className={style.label}> kamar Mandi
                                <Form.Control
                                    type="number"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    value={kamar_mandi}
                                    onChange={(e) => setKamar_mandi(e.target.value)}
                                    isInvalid={errorKamarMandi}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorKamarMandi}
                                </Form.Control.Feedback>
                            </label>
                        </Col>
                        <Col>
                            <label className={style.label}> Luas Rumah
                                <Form.Control
                                    type="number"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    value={luas_rumah}
                                    onChange={(e) => setLuas_rumah(e.target.value)}
                                    isInvalid={errorLuasRumah}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorLuasRumah}
                                </Form.Control.Feedback>
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label className={style.label}> Price
                                <Form.Control
                                    type="number"
                                    id="inputPassword5"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    aria-describedby="passwordHelpBlock"
                                    isInvalid={errorPrice}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorPrice}
                                </Form.Control.Feedback>
                            </label>
                        </Col>
                        <Col>
                            <label className={style.label}> Alamat
                                <Form.Control
                                    type="text"
                                    id="inputPassword5"
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    aria-describedby="passwordHelpBlock"
                                    isInvalid={errorAlamat}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorAlamat}
                                </Form.Control.Feedback>
                            </label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <label className={style.label}> Category
                                <Form.Select aria-label="Default select example"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    isInvalid={errorCategory}
                                >
                                    <option>Open this select menu</option>
                                    <option value="Property Baru">Property Baru</option>
                                    <option value="Sewa Rumah">Sewa Rumah</option>
                                    <option value="Beli Rumah">Beli Rumah</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    {errorCategory}
                                </Form.Control.Feedback>
                            </label>
                        </Col>
                        <Col>
                            <label className={style.label}> Image Url
                                <Form.Control
                                    type="text"
                                    id="inputPassword5"
                                    aria-describedby="passwordHelpBlock"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}
                                    isInvalid={errorImage}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorImage}
                                </Form.Control.Feedback>
                            </label>
                        </Col>
                    </Row>
                    <button className={style.btnSubmit} onClick={hendleUpdateProduct}>Update</button>
                </div>
            </Container>
        </div>
    )
}

export default UpdateProductAdmin