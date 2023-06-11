import React from 'react'
import styles from "styles/Cta.module.css"

const Cta = () => {
  return (
    <div className={styles.utcert__cta} id="possibility">
      <div className={styles.utcert__ctaContent}>
        <p>Request Early Access to Get Started</p>
        <h3>Register Today & start exploring the endless possibilities.</h3>
      </div>
      <div className={styles.utcert__ctaBtn}>
        <button type="button">Get Started</button>
      </div>
    </div>
  )
}

export default Cta