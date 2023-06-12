import Brand from "@/components/Brand";
import Cta from "@/components/Cta";
import Navbar from "@/components/Navbar";
import Footer from "@/containers/Footer";
import Header from "@/containers/Header";
import WhatUTCert from "@/containers/WhatUTCert";
import styles from "../styles/Overview.module.css";
import Features from "@/containers/Features";
import AboutUs from "@/components/AboutUs";

function Overview() {
    return (
        <>
            <div className={styles.overview}>
                <div className={styles.gradient__bg}>
                    <Navbar />
                    <Header />
                </div>
                <Brand />
                <WhatUTCert />
                <Features />
                <Cta />
                <AboutUs />
                <Footer />
            </div>
        </>
    );
}

export default Overview;
