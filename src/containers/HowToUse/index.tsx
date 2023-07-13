import React from 'react'
import styles from "styles/HowToUse.module.css"

const HowToUse = () => {
    return (
        <>
            <div className={styles.howtouse} id="howtouse">
                <h1 className={styles.gradient__text}>How to use</h1>
            </div>
            <div className={styles.body}>
                <div className={styles.wrapper}>
                    <iframe width="950" height="480" src="https://www.youtube.com/embed/nlOwO1o_LbU" title="Demo How To Use UTCert"></iframe>
                </div>
            </div>
        </>
    )
}
export default HowToUse