import React from "react"
import PelayanaHompages from "./componen/pelayanan.hompages";
import GetProductRumah from "./componen/get.rumah.product";
import FiturRumah from "./componen/fitur.rumah";
import Contak from "./componen/contak";
import Footer from "./componen/footer";


const Hompages = () => {
    return (
        <div>
            <PelayanaHompages />
            <GetProductRumah />
            <FiturRumah />
            <Contak />
            <Footer />
        </div >
    )
}

export default Hompages
