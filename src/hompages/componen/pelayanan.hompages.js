import 'bootstrap/dist/css/bootstrap.min.css';
import style from '../style.hompages/style.pelayanan.hompages.module.css'

// import image
import gambar_rumah from '../../images/Group 7.png'
import gambarLayer from '../../images/Layer_x0020_1.png'
import gambarPropertyBaru from '../../images/house 1.png'
import gambarSewaRumah from '../../images/assets 1.png'
import gambarBeliRumah from '../../images/town 1.png'
import gambarButton from '../../images/eva_arrow-ios-forward-fill.png'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PelayanaHompages = () => {
    const { user } = useSelector(state => state.reducLogin)
    const navigate = useNavigate()

    return (
        <div>
            {/* Hero section */}
            <section id={style.hero}>
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-md-6">
                            <h1 className={style.judul}>Membantu Temukan
                                Rumah Impian.
                            </h1>
                            <p className={style.paragraf}><span className="fw-bold">Rumah Impian</span> hadir untuk temukan rumah terbaik
                                untukmu, untuk di jual ataupun di sewa dengan sumber
                                terpercaya
                            </p>
                            <button className={style.btn_Menu}
                                onClick={() => user ? navigate('/navbar-user') : navigate('/login')}>
                                Temukan Rumah
                            </button>
                            <img src={gambarButton} alt="gambar button" />

                        </div>
                    </div>
                    <img src={gambar_rumah} alt="gambar rumah" className={`h-100 ${style.imageHero}`} />
                    <img src={gambarLayer} alt="gambar layer" className={`h-100 position-absolute start-0 top-0 ${style.imageLayer}`} />
                </div>
            </section>
            {/* Hero section  */}

            {/* Layanan section */}
            <section id={style.layanan}>
                <div className={`container`}>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h1 className={style.layanan_judul}>Layanan Kami</h1>
                            <p className={style.layanan_paragraf}>Rumah impian hadir menjadi solusi bagi kamu</p>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-4">
                            <div className={`text-center ${style.cart_layanan}`}>
                                <div className={`position-relative mx-auto ${style.cart_icons}`}>
                                    <img src={gambarPropertyBaru} alt="gambar Property baru" className={`position-absolute top-50 start-50 translate-middle ${style.image_layanan}`} />
                                </div>
                                <button className={style.btn1} onClick={() => user ? navigate('/navbar-user') : navigate('/login')}>
                                    <h3 className={`mt-4 ${style.layanan_judul}`}>Property Baru</h3>
                                </button>
                                <p className={`mt-3 ${style.layanan_paragraf}`}>
                                    Rumah impian kini jadi kenyataan, Beli
                                    rumah bary dengan fasilitas terbaik.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className={`text-center ${style.cart_layanan}`}>
                                <div className={`position-relative mx-auto ${style.cart_icons}`}>
                                    <img src={gambarSewaRumah} alt="gambar sewa rumah" className={`position-absolute top-50 start-50 translate-middle ${style.image_layanan}`} />
                                </div>
                                <button className={style.btn1} onClick={() => user ? navigate('/navbar-user/get-product-sewa-rumah') : navigate('/login')}>
                                    <h3 className={`mt-4 ${style.layanan_judul}`}>Sewa Rumah</h3>
                                </button>
                                <p className={`mt-3 ${style.layanan_paragraf}`}>
                                    Sewa rumah yang indah untuk keluarga
                                    anda, pilihan terbaik untuk tempat
                                    tinggal keluarga mu.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className={`text-center ${style.cart_layanan}`}>
                                <div className={`position-relative mx-auto ${style.cart_icons}`}>
                                    <img src={gambarBeliRumah} alt="gambar beli rumah" className={`position-absolute top-50 start-50 translate-middle ${style.image_layanan}`} />
                                </div>
                                <button className={style.btn1} onClick={() => user ? navigate('/navbar-user') : navigate('/login')}>
                                    <h3 className={`mt-4 ${style.layanan_judul}`}>Beli Rumah</h3>
                                </button>
                                <p className={`mt-3 ${style.layanan_paragraf}`}>
                                    Beli Rumah sempurna dengan harga
                                    terbaik kualitas terjamin dari sumber
                                    terpercaya.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Layanan section */}
        </div>
    )
}

export default PelayanaHompages