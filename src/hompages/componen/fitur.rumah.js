import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.hompages/style.fitur.rumah.module.css'
import { Button } from 'react-bootstrap';

import gambarButton from '../../images/eva_arrow-ios-forward-fill.png'
import gambarFiturRumah1 from '../../images/fitur-rumah1.png'
import btn_img_end from '../../images/img-end.png'
import btn_img_start from '../../images/img-start.png'

const FiturRumah = () => {
    return (
        <div>
            {/* fitur rumah section */}
            <section className="overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className={`col-12 ${style.container_fitur_rumah}`}>
                            <h1 className={style.judul_fitur}>Fitur Rumah</h1>
                            <Button className={style.btn_judul_fitur}>Lihat Semuah.. <img src={gambarButton} alt="icon button" className={style.img_btn} /></Button>
                        </div>
                    </div>
                </div>

                <div className={`container position-relative ${style.container_fitur}`}>
                    <div className="row">
                        <div className="col-12 d-flex justify-content-start">
                            <div className="card-fitur me-3 position-relative">
                                <img src={gambarFiturRumah1} alt="gambar fitur rumah 1" />
                                <div className={`position-absolute top-0 bottom-0 start-0 end-0 w-100 h-100 ${style.overlay}`}>
                                    <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                                        <h4 className={style.heding_fitur}>Kamar Tidur</h4>
                                        <p className={style.paragraf_fitur}>Rumah minimalist Type-A2</p>
                                        <h6 className={style.heding_fitur2}>IDR.200jt</h6>
                                        <button className={style.btn_fitur_lihat_rumah}>Lihat Rumah</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card-fitur me-3 position-relative">
                                <img src={gambarFiturRumah1} alt="gambar fitur rumah 1" />
                                <div className={`position-absolute top-0 bottom-0 start-0 end-0 w-100 h-100 ${style.overlay}`}>
                                    <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                                        <h4 className={style.heding_fitur}>Kamar Tidur</h4>
                                        <p className={style.paragraf_fitur}>Rumah minimalist Type-A2</p>
                                        <h6 className={style.heding_fitur2}>IDR.200jt</h6>
                                        <button className={style.btn_fitur_lihat_rumah}>Lihat Rumah</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card-fitur me-3 position-relative">
                                <img src={gambarFiturRumah1} alt="gambar fitur rumah 1" />
                                <div className={`position-absolute top-0 bottom-0 start-0 end-0 w-100 h-100 ${style.overlay}`}>
                                    <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                                        <h4 className={style.heding_fitur}>Kamar Tidur</h4>
                                        <p className={style.paragraf_fitur}>Rumah minimalist Type-A2</p>
                                        <h6 className={style.heding_fitur2}>IDR.200jt</h6>
                                        <button className={style.btn_fitur_lihat_rumah}>Lihat Rumah</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card-fitur me-3 position-relative">
                                <img src={gambarFiturRumah1} alt="gambar fitur rumah 1" />
                                <div className={`position-absolute top-0 bottom-0 start-0 end-0 w-100 h-100 ${style.overlay}`}>
                                    <div className="position-absolute top-50 start-50 translate-middle text-center w-100">
                                        <h4 className={style.heding_fitur}>Kamar Tidur</h4>
                                        <p className={style.paragraf_fitur}>Rumah minimalist Type-A2</p>
                                        <h5 className={style.heding_fitur2}>IDR.200jt</h5>
                                        <button className={style.btn_fitur_lihat_rumah}>Lihat Rumah</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className={`position-absolute top-50 start-0 translate-middle-y ${style.btn_end}`}><img src={btn_img_end} alt="icon images end" className={style.image_end} /></button>
                    <button className={`position-absolute top-50 end-0 translate-middle-y ${style.btn_start}`}><img src={btn_img_start} alt="icon images start" /></button>
                </div>
            </section >
            {/* fitur rumah section */}
        </div>
    )
}

export default FiturRumah