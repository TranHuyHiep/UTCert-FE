import Feature from '@/components/Feature'
import React from 'react'
import styles from "styles/WhatUTCert.module.css"

const WhatUTCert = () => {
  return (
    <>
      <div className={`${styles.utcert__whatutcert} ${styles.section__margin}`} id="wutcert">
        <div className={styles.utcert__whatutcertFeature}>
          <Feature title="What is UTCert" text="UTCert is a groundbreaking blockchain-based credential verification application built on Cardano. With UTCert, verifying credentials becomes easier, secure, and more transparent than ever before." />
        </div>
        <div className={styles.utcert__whatutcertHeading}>
          <h1 className={styles.gradient__text}>Trustworthy credential verification made easy.</h1>
          <p>Explore more information</p>
        </div>
        <div className={styles.utcert__whatutcertContainer}>
          <div>
            <Feature title="Convenience" text="UTCert provides a user-friendly and efficient experience for verifying credentials, making the process quick and hassle-free." />
          </div>
          <div>
            <Feature title="Transparency" text="UTCert ensures transparency by utilizing blockchain technology, allowing easy access and verification of credentials for employers and institutions." />
          </div>
          <div>
            <Feature title="Security" text="UTCert prioritizes security, leveraging encryption and the immutability of blockchain to protect personal information and ensure the integrity of verified credentials." />
          </div>
        </div>
      </div>
    </>
  )
}

export default WhatUTCert