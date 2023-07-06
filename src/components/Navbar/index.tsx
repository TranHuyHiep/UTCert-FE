import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import styles from "styles/Navbar.module.css";
import logo from "@/public/logo.png";
import Hero from '@/content/Overview/Hero';
import { Dialog, DialogTitle, List, ListItem } from '@mui/material';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle></DialogTitle>
      <List style={{ width: '500px', height: '300px' }}>
        <ListItem>
          <Hero />
        </ListItem>
      </List>
    </Dialog>
  );
}

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.utcert__navbar}>
      <div className={styles.utcert__navbarLinks}>
        <div className={styles.utcert__navbarLinks_logo}>
          <img src={logo.src} alt='logo' />
        </div>
        <div className={styles.utcert__navbarLinks_container}>
          <p><a href="#home">Home</a></p>
          <p><a href="#wutcert">What is UTCert?</a></p>
          <p><a href="#features">Features</a></p>
          <p><a href="#howtouse">How to use?</a></p>
          <p><a href="#possibility">Possibility</a></p>
          <p><a href="#aboutus">About Us</a></p>
        </div>
      </div>
      <div className={styles.utcert__navbarSign}>
        <p onClick={handleClickOpen}>Sign in</p>
        <a href='https://eternl.io/app/mainnet/welcome'>Sign up</a>
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
              <p><a href="#features">Features</a></p>
              <p><a href="#howtouse">How to use?</a></p>
              <p><a href="#possibility">Possibility</a></p>
              <p><a href="#aboutus">About Us</a></p>
            </div>
            <div className={styles.utcert__navbarMenu_containerLinksSign}>
              <p onClick={handleClickOpen}>Sign in</p>
              <a href='https://eternl.io/app/mainnet/welcome'>Sign up</a>
            </div>
          </div>
        )}
      </div>
      <SimpleDialog
        open={open}
        onClose={handleClose}
      />
    </div>
  )
}

export default Navbar