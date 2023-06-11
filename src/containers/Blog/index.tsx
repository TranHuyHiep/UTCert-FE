import React from 'react'
import styles from "styles/Blog.module.css"
import blog01 from "public/assets/blog01.png"
import blog02 from "public/assets/blog02.png"
import blog03 from "public/assets/blog03.png"
import blog04 from "public/assets/blog04.png"
import blog05 from "public/assets/blog05.png"
import Article from '@/components/Article'

const Blog = () => {
  return (
    <div className={`${styles.utcert__blog} ${styles.section__padding}`} id="blog">
      <div className={styles.utcert__blogHeading}>
        <h1 className={styles.gradient__text}>A lot is happening, <br /> We are blogging about it.</h1>
      </div>
      <div className={styles.utcert__blogContainer}>
        <div className={styles.utcert__blogContainer_groupA}>
          <Article imgUrl={blog01.src} date="Sep 26, 2021" text="GPT-3 and Open  AI is the future. Let us exlore how it is?" />
        </div>
        <div className="utcert__blog-container_groupB">
          <Article imgUrl={blog02.src} date="Sep 26, 2021" text="GPT-3 and Open  AI is the future. Let us exlore how it is?" />
          <Article imgUrl={blog03.src} date="Sep 26, 2021" text="GPT-3 and Open  AI is the future. Let us exlore how it is?" />
          <Article imgUrl={blog04.src} date="Sep 26, 2021" text="GPT-3 and Open  AI is the future. Let us exlore how it is?" />
          <Article imgUrl={blog05.src} date="Sep 26, 2021" text="GPT-3 and Open  AI is the future. Let us exlore how it is?" />
        </div>
      </div>
    </div>
  )
}

export default Blog