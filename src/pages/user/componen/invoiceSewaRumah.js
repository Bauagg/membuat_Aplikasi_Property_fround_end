import { Container, Row, Col } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.user/style.invoiceSewaRumah.module.css'
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";


const InvoiceSewaRumah = () => {
    const [dataInvoiceSewaRumah, setDataInvoiceSewaRumah] = useState([])
    const { token } = useSelector((state) => state.reducLogin)

    useEffect(() => {
        axios.get('http://localhost:4000/invoice-sewa-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => setDataInvoiceSewaRumah(resoult.data.datas))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <div>
                <Container>
                    <div className={style.judulInvoice}>
                        <h5>Invoice</h5>
                        <p>650d4c71b97b74a7f35f3da2</p>
                    </div>
                    <div>
                        {
                            dataInvoiceSewaRumah.map((index) => {
                                return (
                                    <div key={index._id} className={style.container1}>

                                        {
                                            index.sewaRumah.map((item) => {
                                                return (
                                                    <Row>
                                                        <Col>
                                                            <div key={item._id} className={style.container2}>
                                                                <img alt="gambar rumah product" src={item.productId.image} className={style.imagesProduct} />
                                                                <div className={style.text}>
                                                                    <h3>{item.productId.name}</h3>
                                                                    <h6>{item.productId.category}</h6>
                                                                    <h6>IDR.{item.productId.price}</h6>
                                                                    <h6>{item.productId.alamat}</h6>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className={style.td}>Start Date</td>
                                                                            <td>{item.startDate}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className={style.td}>End Date</td>
                                                                            <td>{item.endDate}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                    <h6 className="mt-1">Status : <span className={style.status}>{index.status}</span></h6>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className={style.pembayaran}>
                                                                <h3>Data Pembayaran</h3>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className={style.td}>Name / Username</td>
                                                                        <td>: {index.username}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className={style.td}>Transaksi / Debit</td>
                                                                        <td>: {index.kartuDebit} / {index.noRekening}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className={style.td}>No Telepon</td>
                                                                        <td>: {index.noTelepon}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className={style.td}>Email</td>
                                                                        <td>: {index.email}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className={style.td}>Total</td>
                                                                        <td>: IDR.{item.productId.price}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                )
                                            })
                                        }

                                    </div>
                                )
                            })
                        }
                    </div>
                </Container>
            </div>
        </div >
    )
}

export default InvoiceSewaRumah