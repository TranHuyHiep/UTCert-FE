import Brand from "@/components/Brand";
import Cta from "@/components/Cta";
import Navbar from "@/components/Navbar";
import Blog from "@/containers/Blog";
import Footer from "@/containers/Footer";
import Header from "@/containers/Header";
import Possibility from "@/containers/Possibility";
import WhatUTCert from "@/containers/WhatUTCert";
import styles from "../styles/Overview.module.css";
import Features from "@/containers/Features";

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
                <Possibility />
                <Cta />
                <Blog />
                <Footer />
            </div>
        </>
    );
}

export default Overview;
