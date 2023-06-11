import Feature from '@/components/Feature'
import React from 'react'
import styles from "styles/WhatUTCert.module.css"

const WhatUTCert = () => {
  return (
    <>
      <div className={`${styles.utcert__whatutcert} ${styles.section__margin}`} id="wutcert">
        <div className={styles.utcert__whatutcertFeature}>  
          <Feature title="What is GPT-3" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought. His defective nor convinced residence own. Connection has put impossible own apartments boisterous. At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by." />
        </div>
        <div className={styles.utcert__whatutcertHeading}>
          <h1 className={styles.gradient__text}>The possibilities are beyond your imagination</h1>
          <p>Explore the Library</p>
        </div>
        <div className={styles.utcert__whatutcertContainer}>
          <Feature title="Chatbots" text="We so opinion friends me message as delight. Whole front do of plate heard oh ought." />
          <Feature title="Knowledgebase" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
          <Feature title="Education" text="At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by. As put impossible own apartments b" />
        </div>
      </div>
    </>
  )
}

export default WhatUTCert