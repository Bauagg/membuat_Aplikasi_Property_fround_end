import { Button, Container, Row, InputGroup, Form, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.admin/style.invoiceBeliRumah.module.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const InvoiceOrderBeliRumah = () => {
    const [invoice, setInvoice] = useState([])
    const [status, setStatus] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const { token } = useSelector(state => state.reducLogin)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/invoice-beli-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                const filterStatus = resoult.data.datas.filter((statusInvoice) => {
                    return statusInvoice.status === 'Pending'
                })
                setInvoice(filterStatus)
            })
            .catch((err) => console.log(err))
    }, [])

    const hendleUpdateInvoice = () => {
        axios.put('http://localhost:4000/invoice-beli-rumah', { status }, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => navigate('/navigate-admin/order-success-beli-rumah'))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container className={style.container}>
                <Row>
                    <div>
                        <div className={style.judulInvoice}>
                            <h3>Order Beli Rumah</h3>
                            <Button variant="success" onClick={() => navigate('/navigate-admin/order-success-beli-rumah')}>Order Success</Button>
                        </div>
                        <div>
                            <InputGroup className="mb-3">
                                <Form.Select aria-label="Default select example"
                                    isInvalid={errorStatus}
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option>Update Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Confirm">Confirm</option>
                                </Form.Select>
                                <Button variant="success" id="button-addon2" onClick={hendleUpdateInvoice}>
                                    Update
                                </Button>
                            </InputGroup>
                            <div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>#</th>
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
                                                                <tr>
                                                                    <td>1</td>
                                                                    <td>{index.addressId.name}</td>
                                                                    <td>{item.propertyId.name}</td>
                                                                    <td>{item.qty}</td>
                                                                    <td>IDR.{item.total}</td>
                                                                    <td><p className={style.status}>{index.status}</p></td>
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

export default InvoiceOrderBeliRumah