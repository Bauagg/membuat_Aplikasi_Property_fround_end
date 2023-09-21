import { Container, Form, Row } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import style from './style.register.module.css'
import imageHero from '../../images/image-login.jpg'
import { useState } from "react";
import axios from "axios";


const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user')
    const [errorName, setErrorName] = useState('')
    const [emailError, setEmailError] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const navigate = useNavigate()

    const hendleRegister = (e) => {
        e.preventDefault()

        if (!name) {
            return setErrorName('name harus di isi')
        }

        const validateEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/
        if (!validateEmail.test(email)) {
            return setEmailError('email tidak valid')
        }

        if (password.length < 3) {
            return setErrorPassword('password kurang kuat')
        }

        const registerBody = { name, email, password, role }

        axios.post('http://localhost:4000/register', registerBody)
            .then(() => {
                alert('register success')
                navigate('/login')
            })
            .catch((error) => console.log('register error', error))
    }

    return (
        <div>
            <Container>
                <Row>
                    <div className={style.container_form}>
                        <h1>Welcome to Register</h1>
                        <div>
                            <div className="pt-4">
                                <button className={style.btn2} ><Link className={style.link1}>Register</Link></button>
                                <button className={style.btn1} ><Link to='/login' className={style.link1}>Login</Link></button>
                            </div>
                            <Form>
                                <Form.Group>
                                    <Form.Control value={name} className=" mt-5" type="text" placeholder="Masukan Username"
                                        onChange={(e) => setName(e.target.value)} isInvalid={errorName} isValid={name} />
                                    <Form.Control.Feedback type="invalid">
                                        {errorName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control value={email} className="mt-3" type="email" placeholder="Email Address"
                                        onChange={(e) => setEmail(e.target.value)} isInvalid={emailError} />
                                    <Form.Control.Feedback type="invalid">
                                        {emailError}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control value={password} className="mt-3" type="password" placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)} isInvalid={errorPassword} />
                                    <Form.Control.Feedback type="invalid">
                                        {errorPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mt-3">
                                        <Form.Check
                                            inline
                                            label="User"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                            value='user'
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                        <Form.Check
                                            inline
                                            label="Admin"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                            value='admin'
                                            onChange={(e) => setRole(e.target.value)}
                                        />
                                    </div>
                                ))}
                                <button className={style.btn3} type="submit" onClick={hendleRegister}>Register</button>
                            </Form>
                        </div>
                        <img alt="gambar hero" src={imageHero} className={style.image_hero} />
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Register