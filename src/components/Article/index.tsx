import React from 'react'
import styles from "styles/Article.module.css"

const Article = ({ imgUrl, date, text }) => (
  <div className={styles.utcert__blogContainer_article}>
    <div className={styles.utcert__blogContainer_articleImage}>
      <img src={imgUrl} alt="blog_image" />
    </div>
    <div className={styles.utcert__blogContainer_articleContent}>
      <div>
        <p>{date}</p>
        <h3>{text}</h3>
      </div>
      <p>Read Full Article</p>
    </div>
  </div>
);

export default Article