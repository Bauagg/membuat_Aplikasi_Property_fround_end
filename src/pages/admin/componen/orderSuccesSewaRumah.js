import { Button, Container, Row, InputGroup, Form, Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.admin/style.invoiceBeliRumah.module.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const OrderSuccessSewaRumah = () => {
    const [invoice, setInvoice] = useState([])
    const { token } = useSelector(state => state.reducLogin)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/invoice-sewa-rumah', { headers: { Authorization: `Bearer ${token}` } })
            .then((resoult) => {
                const filterStatus = resoult.data.datas.filter((statusInvoice) => {
                    return statusInvoice.status === 'Confirm'
                })
                setInvoice(filterStatus)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <Container className={style.container}>
                <Row>
                    <div>
                        <div className={style.judulInvoice}>
                            <h3>Order Sewa Rumah</h3>
                            <Button variant="success" onClick={() => navigate('/navigate-admin/invoice-sewa-rumah')}>Kembali</Button>
                        </div>
                        <div>
                            <InputGroup className="mb-3">
                                <Form.Select aria-label="Default select example">
                                    <option>Update Status</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </Form.Select>
                                <Button variant="success" id="button-addon2">
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

export default OrderSuccessSewaRumah