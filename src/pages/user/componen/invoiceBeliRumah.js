import { Container, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.user/style.invoiceBeliRumah.module.css'
import imageProperty from '../../../images/rumah-model2.png'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const InvoiceBeliRumah = () => {
    const [invoice, setInvoice] = useState([])
    const { token } = useSelector((state) => state.reducLogin)

    useEffect(() => {
        axios.get('http://localhost:4000/invoice-beli-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => setInvoice(resoult.data.datas))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <Container>
                <Row>
                    <div className={style.container}>
                        <h3>Invoice</h3>
                        <p>650d4c71b97b74a7f35f3da2</p>
                    </div>
                    <div>
                        {
                            invoice.map((index) => {
                                return (
                                    <div key={index._id} className={style.container2}>
                                        {
                                            index.cartsBeliRumah.map((item) => {
                                                return (
                                                    <div key={item._id} className={style.containerProduct} >
                                                        <img alt="gambar rumah model " src={item.propertyId.image} className={style.imageProduct} />
                                                        <div className={style.keteranganProduct} >
                                                            <h3>{item.propertyId.name}</h3>
                                                            <h6>{item.propertyId.category}</h6>
                                                            <h6>IDR.{item.total}</h6>
                                                            <div>
                                                                <tbody>
                                                                    <tr>
                                                                        <td className={style.tabelProduct} >Quantity</td>
                                                                        <td className={style.qty}>: {item.qty}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className={style.tabelProduct}>Status</td>
                                                                        <td className={style.statusProduct}>: {index.status}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className={style.container3}>
                                            <div>
                                                <h3>Address</h3>
                                                <tbody>
                                                    <tr>
                                                        <td className={style.tdAddress}>Name</td>
                                                        <td>: {index.addressId.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className={style.tdAddress}>Kecamatan</td>
                                                        <td>: {index.addressId.kecamatan}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className={style.tdAddress}>Kabupaten</td>
                                                        <td>: {index.addressId.kota}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className={style.tdAddress}>Provinsi</td>
                                                        <td>: {index.addressId.provinsi}</td>
                                                    </tr>
                                                </tbody>
                                            </div>
                                            <div>
                                                <h3>History Transaksi</h3>
                                                <tbody>
                                                    <tr>
                                                        <td className={style.tdAddress}>Name</td>
                                                        <td>: {index.addressId.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className={style.tdAddress}>No Telepon</td>
                                                        <td>: {index.noTelepon}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className={style.tdAddress}>kartu Debit</td>
                                                        <td>: {index.kartuDebit} / {index.noRekening}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className={style.tdAddress}>Email</td>
                                                        <td>: user123@gmail.com</td>
                                                    </tr>
                                                </tbody>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default InvoiceBeliRumah