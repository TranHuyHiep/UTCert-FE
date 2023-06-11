import Feature from '@/components/Feature';
import React from 'react'
import styles from "styles/Features.module.css"


const featuresData = [
  {
    title: 'Issuer',
    text: 'The organization that create digital certificate and issues it to the holder. Simple, secure creating certificate, reduce cost and time.',
  },
  {
    title: 'Holder',
    text: 'A user who receives the digital certificates. Easily manage certificates and attach them to profile or CV.',
  },
  {
    title: 'Verifier',
    text: `A party that checks if the certificates are authentic. Quickly validate candidate's certificates.`,
  }
];

const Features = () => {
  return (
    <div className={`${styles.utcert__features} ${styles.section__padding}`} id="features">
      <div className={styles.utcert__featuresHeading}>
        <h1 className={styles.gradient__text}>Driving collaboration, efficiency, and impact through three key roles.</h1>
        <p>Everything at one.</p>
      </div>
      <div className={styles.utcert__featuresContainer}>
        {featuresData.map((item, index) => (
          <Feature title={item.title} text={item.text} key={item.title + index} />
        ))}
      </div>
    </div>
  )
}

export default Features