import React from 'react'
import styles from "styles/Feature.module.css"

const Feature = ({ title, text }) => (
  <div className={styles.utcert__featuresContainer__feature}>
    <div className={styles.utcert__featuresContainer__featureTitle}>
      <div />
      <h1>{title}</h1>
    </div>
    <div className={styles.utcert__featuresContainer_featureText}>
      <p>{text}</p>
    </div>
  </div>
);

export default Feature