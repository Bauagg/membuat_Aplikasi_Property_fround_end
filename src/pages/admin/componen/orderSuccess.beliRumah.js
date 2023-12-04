import { Button, Container, Row, InputGroup, Form, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.admin/style.invoiceBeliRumah.module.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InvoiceOrderSuccessBeliRumah = () => {
    const [invoice, setInvoice] = useState([])
    const navigate = useNavigate()
    const { token } = useSelector(state => state.reducLogin)

    useEffect(() => {
        axios.get('http://localhost:4000/invoice-beli-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoul) => {
                const filterProduct = resoul.data.datas.filter((statusProduct) => {
                    return statusProduct.status === 'Confirm'
                })
                setInvoice(filterProduct)
            })
    }, [])

    return (
        <div>
            <Container className={style.container}>
                <Row>
                    <div>
                        <div className={style.judulInvoice}>
                            <h3>Order Beli Rumah</h3>
                            <Button variant="success" onClick={() => navigate('/navigate-admin/invoice-beli-rumah')}>Kembali</Button>
                        </div>
                        <div>
                            <InputGroup className="mb-3">
                                <Form.Select aria-label="Default select example">
                                    <option>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <Button variant="success" id="button-addon2">
                                    Cari
                                </Button>
                            </InputGroup>
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>No Telepon</th>
                                            <th>Username</th>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    {
                                        invoice.map((index) => {
                                            return (
                                                <tbody key={index._id}>
                                                    {
                                                        index.cartsBeliRumah.map((item) => {
                                                            return (
                                                                <tr key={item._id}>
                                                                    <td>{index.noTelepon}</td>
                                                                    <td>{index.addressId.name}</td>
                                                                    <td>{item.propertyId.name}</td>
                                                                    <td>{item.qty}</td>
                                                                    <td>IDR.{item.total}</td>
                                                                    <td><p className={style.success}>{index.status}</p></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            )
                                        })
                                    }
                                </Table>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default InvoiceOrderSuccessBeliRumah