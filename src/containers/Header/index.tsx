import React from 'react'
import styles from "styles/Header.module.css"
import people from "@/public/assets/people.png";
import ai from "@/public/assets/ai.png";

const Header = () => {
  return (
    <>
      <div className={`${styles.utcert__header} ${styles.section__padding}`} id="home">
        <div className={styles.utcert__headerContent}>
          <h1 className={styles.gradient__text}>Let&apos;s Build Something amazing with GPT-3 OpenAI</h1>
          <p>Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.</p>

          <div className={styles.utcert__headerContent__input}>
            <input type="email" placeholder="Your Email Address" />
            <button type="button">Get Started</button>
          </div>

          <div className={styles.utcert__headerContent__people}>
            <img src={people.src} />
            <p>1,600 people requested access a visit in last 24 hours</p>
          </div>
        </div>

        <div className={styles.utcert__headerImage}>
          <img src={ai.src} />
        </div >
      </div >
    </>
  )
}

export default Header