import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../hompage.module.css'

import icon_alamat from '../../images/icon_alamat.png'
import iconKontak from '../../images/icon_kontak.png'
import iconEmail from '../../images/icon_email.png'
import iconFb from '../../images/icon_fb.png'
import iconTuwiter from '../../images/icon_tuiter.png'
import iconIg from '../../images/icon_ig.png'

const Contak = () => {
    return (
        <div>
            {/* kontak section */}
            <section>
                <div className={style.container1}>
                    <Container >
                        <Row>
                            <Col>
                                <div>
                                    <h1 className="text-white fw-bold">Butuh Konsultasi..?
                                        Silahkan kontak kami
                                        Kami Siap Membantu</h1>
                                    <p className={style.paragrafKontak}>Kontak</p>
                                    <div>
                                        <tbody>
                                            <tr>
                                                <td className={style.tr}><img alt="icon alamat" src={icon_alamat} className={style.iconAlamat} /></td>
                                                <td className={style.td_text}>Jl. Pelajar Pejuang 123 Majalaya Bandung<br />Indonesia</td>
                                            </tr>
                                            <tr>
                                                <td className={style.tr}><img alt="icon alamat" src={iconKontak} className={style.iconAlamat} /></td>
                                                <td className={style.td_text}>022-6545-2041</td>
                                            </tr>
                                            <tr>
                                                <td className={style.tr}><img alt="icon alamat" src={iconEmail} className={style.iconAlamat} /></td>
                                                <td className={style.td_text}>rumahimpian@gmail.com</td>
                                            </tr>
                                        </tbody>
                                    </div>
                                    <div>
                                        <p className={style.paragrafKontak}>Social Media</p>
                                        <div className="d-flex">
                                            <div>
                                                <img alt="icon sosial media" src={iconFb} className="pe-2" />
                                                <img alt="icon sosial media" src={iconTuwiter} className="pe-2" />
                                                <img alt="icon sosial media" src={iconIg} className="pe-2" />
                                            </div>
                                            <div>
                                                <p className="text-white">Rumah Impian</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col>
                                <div className={style.container_form}>
                                    <h2 className={style.judul_form}>ada pertanyaan..?</h2>
                                    <div className="mx-5 ">
                                        <form>
                                            <input className={style.input1} type="email" placeholder="Masukan email anda disini..." />
                                            <input className={style.input1} type="text" placeholder="Pertanyaan Anda.." />
                                            <button className={style.btn_kirim}>Kirim</button>
                                        </form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
            {/* kontak section */}
        </div>
    )
}

export default Contak