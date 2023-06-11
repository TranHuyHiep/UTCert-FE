import React from 'react'
import styles from "styles/Brand.module.css"
import cadano from "@/public/assets/Cardano-RGB_Logo-Full-White.png"

const Brand = () => {
  return (
    <div className={`${styles.utcert__brand} ${styles.section__padding}`}>
      <div>
        <img src={cadano.src} width="120"/>
      </div>
      <div>
        <img src={cadano.src} width="120"/>
      </div>
      <div>
        <img src={cadano.src} width="120"/>
      </div>
      <div>
        <img src={cadano.src} width="120"/>
      </div>
      <div>
        <img src={cadano.src} width="120"/>
      </div>
    </div>
  )
}

export default Brand