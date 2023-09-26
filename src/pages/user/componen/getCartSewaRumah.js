import iconButton from '../../../images/arrow.png'
import iconSampah from '../../../images/Trash Can.png'

import { Col, Container, Row, Form, CloseButton, Alert } from "react-bootstrap"
import style from '../style.user/style.cartSewaRumah.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const GetCartSewaRumah = () => {
    const [dataCartSewaRumah, setDataCartSewaRumah] = useState([])
    const [contCart, setContCart] = useState(0)
    const [show, setSHow] = useState(false)
    const [toggleUpdate, setToggleUpdate] = useState(false)
    const [toggleTransaksi, setToggleTransaksi] = useState(false)
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [debit, setDebit] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [noTelepon, setNotelepon] = useState('')
    const [errorUsername, setErrorUsername] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorDebit, setErrorDebit] = useState('')
    const [errorNoTelepon, setErrorNoTelepon] = useState('')
    const [errorNoRekening, setErrorNoRekening] = useState('')
    const [noRekening, setNoRekening] = useState('')
    const [errorChecket, setErrorChecket] = useState('')
    const [cartId, setCartId] = useState([])
    const [toggleInput, setToggleInput] = useState(false)
    const { token } = useSelector(state => state.reducLogin)
    const navigate = useNavigate()



    useEffect(() => {
        axios.get('http://localhost:4000/cart-sewa-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoul) => {
                setDataCartSewaRumah(resoul.data.datas)
                setContCart(resoul.data.datas.length)
            })
            .catch((err) => console.log('get data cart sewa rumah error', err))
    }, [])

    console.log(dataCartSewaRumah)

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

    const buttonUpdate = (e) => {
        e.preventDefault()
        setToggleUpdate(true)
    }

    const buttonCloss = (e) => {
        e.preventDefault()
        setToggleUpdate(false)
    }

    const hendleUpdateCart = (id) => {
        const bodyReques = {

            startDate: dateStart,
            endDate: dateEnd
        }
        axios.put(`http://localhost:4000/cart-sewa-rumah/${id}`, bodyReques, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                alert('update data success')
                setToggleUpdate(false)
            })
            .catch((err) => console.log(err))

        axios.get('http://localhost:4000/cart-sewa-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoul) => {
                setDataCartSewaRumah(resoul.data.datas)
                setContCart(resoul.data.datas.length)
            })
            .catch((err) => console.log('get data cart sewa rumah error', err))
    }
    const toogleButtonTransaksi = (e) => {
        e.preventDefault()
        setToggleTransaksi(true)
    }

    const toogleButtonTransaksiCloss = (e) => {
        e.preventDefault()
        setToggleTransaksi(false)
        setToggleInput(false)
    }

    const checkedCartInd = (index) => {
        if (cartId.includes(index)) {
            setCartId(cartId.filter((item) => item !== index))
        } else {
            setCartId([...cartId, index])
        }
    }

    const hendleInvoiceSewaRumah = () => {

        if (!username) {
            return setErrorUsername('Username harus di isi')
        }

        const regexNotelepon = /\+62\s\d{3}[-\.\s]??\d{3}[-\.\s]??\d{3,4}|\(0\d{2,3}\)\s?\d+|0\d{2,3}\s?\d{6,7}|\+62\s?361\s?\d+|\+62\d+|\+62\s?(?:\d{3,}-)*\d{3,5}/
        if (!regexNotelepon.test(noTelepon.toString())) {
            return setErrorNoTelepon('Telepon tidak valid')
        }

        const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!regexEmail.test(email)) {
            setErrorEmail('Email tidak valid')
        }

        if (noRekening.toString().length <= 5 || noRekening.toString().length >= 12) {
            setErrorNoRekening('No Rekening harus terdiri dari 5 hingga 12 digit angka.')
        }

        if (!debit || debit === 'Open this select menu') {
            return setErrorDebit('kartu Debit tidak valid')
        }

        if (!cartId.length) {
            setSHow(true)
            setToggleTransaksi(false)
            return setErrorChecket('Sewa rumah tidak boleh kosong')
        }

        const queryBody = {
            sewaRumah: cartId,
            noTelepon: noTelepon,
            kartuDebit: debit,
            username,
            email,
            noRekening: noRekening.toString()
        }
        axios.post('http://localhost:4000/invoice-sewa-rumah', queryBody, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                navigate('/navbar-user/invoiceSewaRumah')
            })
            .catch((err) => console.log(err))

    }

    return (
        <div>
            {
                show &&
                (
                    <Alert variant="danger" dismissible onClose={() => setSHow(false)} className={style.alert}>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            Chekout harus di centang MINIMAL 1 bisa pakai button Select All jika ingin semuanya di centang
                        </p>
                    </Alert>
                )
            }
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
                                {
                                    dataCartSewaRumah > 0 ? (
                                        <div>
                                            <h4 className="text-success">Shopping cart</h4>
                                            <p className="mb-4">You have {contCart} item in your cart</p>
                                            <div className="d-flex justify-content-between">
                                                <button className={style.btnSelect} onClick={toogleButtonTransaksi}>Transaksi</button>
                                                <button className={style.btnSelect}>Select All</button>
                                                {
                                                    toggleTransaksi && (
                                                        <div className={style.containerInvoice}>
                                                            <CloseButton aria-label="Hide" className={style.btnCloss2} onClick={toogleButtonTransaksiCloss} />
                                                            <h3 className={style.judulInvoice}>Invoice</h3>
                                                            <div>
                                                                <label className={style.label}> Username
                                                                    <Form.Control
                                                                        type="text"
                                                                        id="inputPassword5"
                                                                        aria-describedby="passwordHelpBlock"
                                                                        value={username}
                                                                        onChange={(e) => setUsername(e.target.value)}
                                                                        isInvalid={errorUsername}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errorUsername}
                                                                    </Form.Control.Feedback>
                                                                </label>
                                                                <label className={style.label}> No Telepon
                                                                    <Form.Control
                                                                        type="number"
                                                                        id="inputPassword5"
                                                                        aria-describedby="passwordHelpBlock"
                                                                        value={noTelepon}
                                                                        onChange={(e) => setNotelepon(e.target.value)}
                                                                        isInvalid={errorNoTelepon}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errorNoTelepon}
                                                                    </Form.Control.Feedback>
                                                                </label>
                                                                <label className={style.label}>Email Address
                                                                    <Form.Control
                                                                        type="email"
                                                                        id="inputPassword5"
                                                                        aria-describedby="passwordHelpBlock"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        isInvalid={errorEmail}
                                                                    />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errorEmail}
                                                                    </Form.Control.Feedback>
                                                                </label>
                                                                <label className={style.label}> Kartu Debit
                                                                    <Form.Select
                                                                        aria-label="Default select example"
                                                                        value={debit}
                                                                        isInvalid={errorDebit}
                                                                        onChange={(e) => {
                                                                            if (e.target.value === 'Open this select menu') {
                                                                                setDebit(e.target.value)
                                                                                setToggleInput(false)
                                                                            } else {
                                                                                setDebit(e.target.value)
                                                                                setToggleInput(true)
                                                                            }
                                                                        }}>
                                                                        <option>Open this select menu</option>
                                                                        <option value='BRI'>BRI</option>
                                                                        <option value="BCA">BCA</option>
                                                                        <option value="Mandiri">Mandiri</option>
                                                                    </Form.Select>
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errorDebit}
                                                                    </Form.Control.Feedback>
                                                                </label>
                                                                {
                                                                    toggleInput && (
                                                                        <label className={style.label}>No Req
                                                                            <Form.Control
                                                                                type="number"
                                                                                id="inputPassword5"
                                                                                aria-describedby="passwordHelpBlock"
                                                                                value={noRekening}
                                                                                onChange={(e) => setNoRekening(e.target.value)}
                                                                                isInvalid={errorNoRekening}
                                                                            />
                                                                            <Form.Control.Feedback type="invalid">
                                                                                {errorNoRekening}
                                                                            </Form.Control.Feedback>
                                                                        </label>
                                                                    )
                                                                }
                                                                <button type='sumit' className={style.buttonInvoice} onClick={hendleInvoiceSewaRumah}>Pembayaran</button>
                                                            </div>
                                                        </div>
                                                    )}
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
                                                                        <p className='mb-0'>{index.startDate}</p>
                                                                    </div>
                                                                    <div>
                                                                        <h6 className='mt-2'>Start Date</h6>
                                                                        <p className='mb-0'>{index.endDate}</p>
                                                                    </div>
                                                                </div>
                                                                <button className={style.btnUpdate} onClick={buttonUpdate}>Update</button>
                                                                {
                                                                    toggleUpdate && (
                                                                        <div className={style.contenerUpdate}>
                                                                            <CloseButton aria-label="Hide" className={style.btnClos} onClick={buttonCloss} />
                                                                            <h3 className={style.judulInvoice}>Ubah Tanggal</h3>
                                                                            <div className={style.conten3}>
                                                                                <label className={style.label}>
                                                                                    Start Date
                                                                                    <input type='date' value={dateStart} className={style.inputUpdate} onChange={(e) => setDateStart(e.target.value)} />
                                                                                </label>
                                                                                <label className={style.label}>
                                                                                    End Date
                                                                                    <input type='date' className={style.inputUpdate} value={dateEnd} onChange={(e) => setDateEnd(e.target.value)} />
                                                                                </label>
                                                                                <button type='submit' className={style.btnUpdate2} onClick={() => hendleUpdateCart(index._id)}>Update</button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className={style.chekout}>
                                                                <Form.Check label='Chekout'
                                                                    checked={cartId.includes(index._id)}
                                                                    isValid
                                                                    isInvalid={errorChecket}
                                                                    onChange={() => checkedCartInd(index._id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    ) : (
                                        <div>
                                            <p>Anda belum memiliki Cart Sewa Rumah</p>
                                        </div>
                                    )
                                }

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        </div >
    )
}

export default GetCartSewaRumah