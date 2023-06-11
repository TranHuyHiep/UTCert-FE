import React from 'react'
import styles from "styles/Footer.module.css"
import logo from "@/public/logo.png"

const Footer = () => {
  return (
    <div className={`${styles.utcert__footer} ${styles.section__padding}`}>
      <div className={styles.utcert__footerLinks}>
        <div className={styles.utcert__footerLinks_logo}>
          <img src={logo.src} alt="utcert_logo" />
          <p>Ha Noi, Viet Nam, <br /> All Rights Reserved</p>
        </div>
        <div className={styles.utcert__footerLinks_div}>
          <h4>Links</h4>
          <p>Overons</p>
          <p>Social Media</p>
          <p>Counters</p>
          <p>Contact</p>
        </div>
        <div className={styles.utcert__footerLinks_div}>
          <h4>Company</h4>
          <p>Terms & Conditions </p>
          <p>Privacy Policy</p>
          <p>Contact</p>
        </div>
        <div className={styles.utcert__footerLinks_div}>
          <h4>Get in touch</h4>
          <p>Ha Noi, Viet Nam</p>
          <p>1900-1009</p>
          <p>utcert@gmail.com</p>
        </div>
      </div>

      <div className={styles.utcert__footerCopyright}>
        <p>@2023 UTCert. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer