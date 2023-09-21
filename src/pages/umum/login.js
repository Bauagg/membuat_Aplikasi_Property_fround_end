import { Container, Row, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './style.login.module.css'
import imageHero from '../../images/image-login.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LoginAction } from "../../redux/action/action";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorhendling, setErrorHendling] = useState('')
    const dispatch = useDispatch((state) => state.reducLogin)
    const navitor = useNavigate()

    const hendleLogin = (e) => {
        e.preventDefault()

        const validateEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!validateEmail.test(email)) {
            return setEmailError('Email tidak Vaild')
        }

        if (password.length < 3) {
            return setErrorPassword('Password tidak boleh kosong')
        }
        const axiosBody = {
            email: email,
            password: password
        }

        axios.post('http://localhost:4000/login', axiosBody)
            .then((resoult) => {
                const { role, name, token } = resoult.data.datas
                dispatch(LoginAction(role, name, token))
                alert('login success')
                navitor('/')
            })
            .catch((error) => {
                console.log('login error', error.response.data.message)
                setErrorHendling(error.response.data.message)
            })
    }

    return (
        <div className={style.container1}>
            <Container>
                <Row >
                    <div className={style.container_form}>
                        <h2>Login to Rumah Impian</h2>
                        <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,</p>
                        <div className="pt-5">
                            <button className={style.btn1}><Link to='/register' className={style.link1}>Register</Link></button>
                            <button className={style.btn2}><Link className={style.link1}>Login</Link></button>
                        </div>

                        <Form className="mt-4">
                            {errorhendling && <p className={style.error}>{errorhendling}</p>}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    isInvalid={emailError} />
                                <Form.Control.Feedback type="invalid">
                                    {emailError}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    isInvalid={errorPassword} />
                                <Form.Control.Feedback type="invalid">
                                    {errorPassword}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <button className={style.btn} type="submit" onClick={hendleLogin}>
                                Login
                            </button>
                        </Form>
                    </div>
                    <img alt="gambar hero" src={imageHero} className={style.image_hero} />
                </Row>
            </Container>
        </div>
    )
}

export default Login
