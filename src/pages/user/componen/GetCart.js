import iconButton from '../../../images/arrow.png'
import iconSampah from '../../../images/Trash Can.png'
import axios from 'axios'
import { Col, Container, Row, Form, CloseButton, Alert } from "react-bootstrap"
import style from '../style.user/style.getCart.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react';

const GetCartHome = () => {
    const [dataCart, setDataCart] = useState([])
    const [toggleTransaksi, setToggleTRansaksi] = useState(false)
    const [toggleInput, setToggleInput] = useState(false)
    const [show, setShow] = useState(false)
    const [toogleInputAddress, setToogleInputAddress] = useState(false)
    const [username, setUsername] = useState('')
    const [noTelepon, setNotelepon] = useState('')
    const [noRekening, setNoRekening] = useState('')
    const [kartuDebit, setKartuDebit] = useState('')
    const [kecamatan, setKecamatan] = useState('')
    const [kabupaten, setKabupaten] = useState('')
    const [provinsi, setProvinsi] = useState('')
    const [errorUsername, setErrorUsername] = useState('')
    const [errorNoTelepon, setErrorNoTelepon] = useState('')
    const [errorNoRekening, setErrorNoRekening] = useState('')
    const [errorKartuDEbit, setErrorKartuDebiit] = useState('')
    const [errorKecamatan, setErrorKecamatan] = useState('')
    const [errorKabupaten, setErrorKabupaten] = useState('')
    const [errorProvinsi, setErrorProvinsi] = useState('')
    const [idAddress, setIdAddress] = useState('')
    const [invoice, setInvoice] = useState([])
    const [errorInvoice, setErrorInvoice] = useState('')
    const [cartIndex, setCartIndex] = useState(0)
    const { token } = useSelector(state => state.reducLogin)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/cart-beli-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                setDataCart(resoult.data.datas)
                setCartIndex(resoult.data.datas.length)
            })
            .catch((error) => console.log('get data gart beli rumah error', error))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:4000/address', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                const responData = resoult.data.datas

                responData.map((index) => {
                    setIdAddress(index._id)
                    setUsername(index.name)
                    setKecamatan(index.kecamatan)
                    setKabupaten(index.kota)
                    setProvinsi(index.provinsi)
                })
            })
            .catch((err) => console.log(err))
    }, [])

    console.log(idAddress)

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

    const hendleOnCheckot = (index) => {
        if (invoice.includes(index)) {
            setInvoice(invoice.filter((item) => item !== index))
        } else {
            setInvoice([...invoice, index])
        }

    }

    const invoiceBeliRumah = () => {
        if (!username) {
            return setErrorUsername('Username harus di isi')
        }

        if (!kecamatan) {
            return setErrorKecamatan('Kecamatan harus di isi')
        }

        if (!kabupaten) {
            return setErrorKabupaten('Kabupaten harus di isi')
        }

        if (!provinsi) {
            return setErrorProvinsi('Provinsi harus di isi')
        }

        const regexNotelepon = /\+62\s\d{3}[-\.\s]??\d{3}[-\.\s]??\d{3,4}|\(0\d{2,3}\)\s?\d+|0\d{2,3}\s?\d{6,7}|\+62\s?361\s?\d+|\+62\d+|\+62\s?(?:\d{3,}-)*\d{3,5}/
        if (!regexNotelepon.test(noTelepon.toString())) {
            return setErrorNoTelepon('NO Telepon tidak valid')
        }

        if (!kartuDebit || kartuDebit === 'Open this select menu') {
            return setErrorKartuDebiit('yang kamu masukan tidak valid')
        }

        if (noRekening.toString().length <= 5 || noRekening.toString().length >= 12) {
            return setErrorNoRekening('No Rekening harus terdiri dari 5 hingga 12 digit angka.')
        }

        if (!invoice.length) {
            setShow(true)
            setToggleTRansaksi(false)
            return setErrorInvoice('Sewa rumah tidak boleh kosong')
        }

        const bodyReques = {
            cartsBeliRumah: invoice,
            noTelepon: noTelepon.toString(),
            addressId: idAddress,
            kartuDebit,
            noRekening: noRekening.toString()
        }

        axios.post('http://localhost:4000/invoice-beli-rumah', bodyReques, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                navigate()
            })
            .catch((err) => console.log(err))

        const bodyRequesAddress = {
            name: username,
            kota: kabupaten,
            kecamatan,
            provinsi
        }

        axios.put(`http://localhost:4000/address/${idAddress}`, bodyRequesAddress, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                alert('update addtess success')
            })
            .catch((err) => console.log(err))
    }

    const buttonCreateAddress = () => {
        if (!username) {
            return setErrorUsername('Username harus di isi')
        }

        if (!kecamatan) {
            return setErrorKecamatan('Kecamatan harus di isi')
        }

        if (!kabupaten) {
            return setErrorKabupaten('Kabupaten harus di isi')
        }

        if (!provinsi) {
            return setErrorProvinsi('Provinsi harus di isi')
        }

        const bodyReques = {
            name: username,
            kecamatan,
            kota: kabupaten,
            provinsi
        }

        axios.post('http://localhost:4000/address', bodyReques, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                alert('create data address success')
                setToogleInputAddress(false)
                setToggleTRansaksi(true)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container className="w-100 pb-5">
                {
                    show && (
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                Chekout harus di centang MINIMAL 1 bisa pakai button Select All jika ingin semuanya di centang
                            </p>
                        </Alert>
                    )
                }
                <Row>
                    <Col>
                        <div>
                            {
                                toogleInputAddress && (
                                    <div className={style.containerTransaktion}>
                                        <CloseButton aria-label="Hide" className={style.btnCloss} onClick={() => setToogleInputAddress(false)} />
                                        <h3 className={style.judulInvoice}>CREATE ADDRESS</h3>
                                        <Row>
                                            <Col>
                                                <label className={style.label}> Username
                                                    <Form.Control
                                                        type="text"
                                                        id="inputPassword5"
                                                        aria-describedby="passwordHelpBlock"
                                                        value={username}
                                                        isInvalid={errorUsername}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                    />
                                                </label>
                                            </Col>
                                            <Col>
                                                <label className={style.label}> Kecamatan
                                                    <Form.Control
                                                        type="text"
                                                        value={kecamatan}
                                                        isInvalid={errorKecamatan}
                                                        onChange={(e) => setKecamatan(e.target.value)}
                                                        id="inputPassword5"
                                                        aria-describedby="passwordHelpBlock"
                                                    />
                                                </label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <label className={style.label}> Kabupaten
                                                    <Form.Control
                                                        type="text"
                                                        id="inputPassword5"
                                                        isInvalid={errorKabupaten}
                                                        value={kabupaten}
                                                        aria-describedby="passwordHelpBlock"
                                                        onChange={(e) => setKabupaten(e.target.value)}
                                                    />
                                                </label>
                                            </Col>
                                            <Col>
                                                <label className={style.label}> Provinsi
                                                    <Form.Control
                                                        type="text"
                                                        id="inputPassword5"
                                                        isInvalid={errorProvinsi}
                                                        aria-describedby="passwordHelpBlock"
                                                        value={provinsi}
                                                        onChange={(e) => setProvinsi(e.target.value)}
                                                    />
                                                </label>
                                            </Col>
                                        </Row>
                                        <button type='submit' className={style.btnPembayaran} onClick={buttonCreateAddress}>Submit</button>
                                    </div>
                                )
                            }
                            {
                                toggleTransaksi && (
                                    <div className={style.containerTransaktion}>
                                        <CloseButton aria-label="Hide" className={style.btnCloss} onClick={() => setToggleTRansaksi(false)} />
                                        <h3 className={style.judulInvoice}>Invoice</h3>
                                        <div>
                                            <Row>
                                                <Col>
                                                    <label className={style.label}> Username
                                                        <Form.Control
                                                            type="text"
                                                            id="inputPassword5"
                                                            aria-describedby="passwordHelpBlock"
                                                            value={username}
                                                            isInvalid={errorUsername}
                                                            onChange={(e) => setUsername(e.target.value)}
                                                        />
                                                    </label>
                                                </Col>
                                                <Col>
                                                    <label className={style.label}> Kecamatan
                                                        <Form.Control
                                                            type="text"
                                                            value={kecamatan}
                                                            isInvalid={errorKecamatan}
                                                            onChange={(e) => setKecamatan(e.target.value)}
                                                            id="inputPassword5"
                                                            aria-describedby="passwordHelpBlock"
                                                        />
                                                    </label>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <label className={style.label}> Kabupaten
                                                        <Form.Control
                                                            type="text"
                                                            id="inputPassword5"
                                                            isInvalid={errorKabupaten}
                                                            value={kabupaten}
                                                            aria-describedby="passwordHelpBlock"
                                                            onChange={(e) => setKabupaten(e.target.value)}
                                                        />
                                                    </label>
                                                </Col>
                                                <Col>
                                                    <label className={style.label}> Provinsi
                                                        <Form.Control
                                                            type="text"
                                                            id="inputPassword5"
                                                            isInvalid={errorProvinsi}
                                                            aria-describedby="passwordHelpBlock"
                                                            value={provinsi}
                                                            onChange={(e) => setProvinsi(e.target.value)}
                                                        />
                                                    </label>
                                                </Col>
                                            </Row>

                                            <label className={style.label}> No Telepon
                                                <Form.Control
                                                    type="number"
                                                    id="inputPassword5"
                                                    isInvalid={errorNoTelepon}
                                                    aria-describedby="passwordHelpBlock"
                                                    value={noTelepon}
                                                    onChange={(e) => setNotelepon(e.target.value)}
                                                />
                                            </label>
                                            <label className={style.label}> kartu Debit
                                                <Form.Select aria-label="Default select example"
                                                    value={kartuDebit}
                                                    isInvalid={errorKartuDEbit}
                                                    onChange={(e) => {
                                                        if (e.target.value === 'Open this select menu') {
                                                            setKartuDebit(e.target.value)
                                                            setToggleInput(false)
                                                        } else {
                                                            setKartuDebit(e.target.value)
                                                            setToggleInput(true)
                                                        }
                                                    }}
                                                >
                                                    <option>Open this select menu</option>
                                                    <option value="BRi">BRI</option>
                                                    <option value="BCA">BCA</option>
                                                    <option value="Mandiri">Mandiri</option>
                                                </Form.Select>
                                            </label>
                                            {
                                                toggleInput && (
                                                    <label className={style.label}> No Req
                                                        <Form.Control
                                                            type="number"
                                                            id="inputPassword5"
                                                            isInvalid={errorNoRekening}
                                                            aria-describedby="passwordHelpBlock"
                                                            value={noRekening}
                                                            onChange={(e) => setNoRekening(e.target.value)}
                                                        />
                                                    </label>
                                                )
                                            }
                                            <button type='submit' className={style.btnPembayaran} onClick={invoiceBeliRumah}>Pembayaran</button>
                                        </div>
                                    </div>
                                )
                            }
                            <div className={style.container1}>
                                <div className={style.judulCart}>
                                    <Link to='/navbar-user' className="d-flex text-decoration-none ">
                                        <img alt="img tombol cart" src={iconButton} className={style.iconBtn} />
                                        <h3 className="text-dark">Shopping Continue</h3>
                                    </Link>
                                </div>
                                {
                                    dataCart > 0 ? (
                                        <div>
                                            <h4 className="text-success">Shopping cart</h4>
                                            <p className="mb-4">You have {cartIndex} item in your cart</p>
                                            <div className="d-flex justify-content-between">
                                                <button className={style.btnSelect} onClick={() => idAddress ? setToggleTRansaksi(true) : setToogleInputAddress(true)}>Transaksi</button>
                                                <button className={style.btnSelect}>Select All</button>
                                            </div>
                                            {
                                                dataCart.map((index, item) => {
                                                    return (
                                                        <Row>
                                                            <Col>
                                                                <div key={index._id} className={style.container2}>
                                                                    <button className={style.btnSampah} onClick={() => hendleDleteCartBeliRumah(index._id)}>
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
                                                                        <Form.Check label='Chekout'
                                                                            isValid
                                                                            isInvalid={errorInvoice}
                                                                            checked={invoice.includes(index._id)}
                                                                            onChange={() => hendleOnCheckot(index._id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </div>
                                    ) : (
                                        <p>Maaf anda masi belum memiliki Cart beli Rumah</p>
                                    )
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default GetCartHome