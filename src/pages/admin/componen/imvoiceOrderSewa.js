import { Button, Container, Row, InputGroup, Form, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.admin/style.invoiceBeliRumah.module.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const InvoiceOrderSewarumah = () => {
    const [invoice, setInvoice] = useState([])
    const [status, setStatus] = useState('')
    const [errorStatus, setErrorStatus] = useState('')
    const { token } = useSelector(state => state.reducLogin)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/invoice-sewa-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                const filterStatus = resoult.data.datas.filter((statusInvoice) => {
                    return statusInvoice.status === 'Pending'
                })
                setInvoice(filterStatus)
            })
            .catch((err) => console.log(err))
    }, [])

    const hendleUpdateInvoice = () => {
        if (!status || status === 'Update Status') {
            setErrorStatus('status tidak valid')
        }
        axios.put('http://localhost:4000/invoice-sewa-rumah', { status: status }, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => navigate('/navigate-admin/order-success-sewa-rumah'))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Container className={style.container}>
                <Row>
                    <div>
                        <div className={style.judulInvoice}>
                            <h3>Order Sewa Rumah</h3>
                            <Button variant="success" onClick={() => navigate("/navigate-admin/order-success-sewa-rumah")}>Order Success</Button>
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
                                            <th>Email</th>
                                            <th>Username</th>
                                            <th>Product</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    {
                                        invoice.map((index) => {
                                            return (
                                                <tbody key={index._id}>
                                                    {
                                                        index.sewaRumah.map((item) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index.email}</td>
                                                                    <td>{index.username}</td>
                                                                    <td>{item.productId.name}</td>
                                                                    <td>{item.startDate}</td>
                                                                    <td>{item.endDate}</td>
                                                                    <td>IDR.{item.productId.price}</td>
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

export default InvoiceOrderSewarumah