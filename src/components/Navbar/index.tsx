import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import styles from "styles/Navbar.module.css";
import logo from "@/public/logo.png"; 

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={styles.utcert__navbar}>
      <div className={styles.utcert__navbarLinks}>
        <div className={styles.utcert__navbarLinks_logo}>
          <img src={logo.src} alt='logo'/>
        </div>
        <div className={styles.utcert__navbarLinks_container}>
          <p><a href="#home">Home</a></p>
          <p><a href="#wutcert">What is utcert?</a></p>
          <p><a href="#possibility">Open AI</a></p>
          <p><a href="#features">Case Studies</a></p>
          <p><a href="#blog">Library</a></p>
        </div>
      </div>
      <div className={styles.utcert__navbarSign}>
        <p>Sign in</p>
        <button type="button">Sign up</button>
      </div>
      <div className={styles.utcert__navbarMenu}>
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className={`${styles.utcert__navbarMenu_container} ${styles.scaleUpCenter}`}>

            <div className={styles.utcert__navbarMenu_containerLinks}>
              <p><a href="#home">Home</a></p>
              <p><a href="#wutcert">What is UTCert?</a></p>
              <p><a href="#possibility">Open AI</a></p>
              <p><a href="#features">Case Studies</a></p>
              <p><a href="#blog">Library</a></p>
            </div>
            <div className={styles.utcert__navbarMenu_containerLinksSign}>
              <p>Sign in</p>
              <button type="button">Sign up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar