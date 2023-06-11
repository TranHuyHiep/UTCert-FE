import React from 'react'
import styles from "styles/Brand.module.css"
import google from "@/public/assets/google.png";
import slack from "@/public/assets/slack.png";
import atlassian from "@/public/assets/atlassian.png";
import dropbox from "@/public/assets/dropbox.png";
import shopify from "@/public/assets/shopify.png";


const Brand = () => {
  return (
    <div className={`${styles.gpt3__brand} ${styles.section__padding}`}>
      <div>
        <img src={google.src} />
      </div>
      <div>
        <img src={slack.src} />
      </div>
      <div>
        <img src={atlassian.src} />
      </div>
      <div>
        <img src={dropbox.src} />
      </div>
      <div>
        <img src={shopify.src} />
      </div>
    </div>
  )
}

export default Brand