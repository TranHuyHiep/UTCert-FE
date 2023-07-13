import React from 'react'
import styles from "styles/AboutUs.module.css"

const AboutUs = () => (
    <>
        <div className={styles.aboutus} id="aboutus">
            <h1>Meet our team</h1>
        </div>
        <div className={styles.body}>
            <div className={styles.wrapper}>
                <h1>Executive Team</h1>
                <hr className={styles.hr} />
                <div className={styles.members}>
                    <div className={styles.teamMem}>
                        <img src="https://res.cloudinary.com/dha9551k2/image/upload/v1686590503/MrTien_vyno9m.jpg" alt="Mr. Tien" className={styles.img} />
                        <h2>Nguyen Anh Tien</h2>
                        <p>PROJECT ADVISOR</p>
                    </div>
                    <div className={styles.teamMem}>
                        <img src="https://res.cloudinary.com/dha9551k2/image/upload/v1686590477/MrHieu_cpinfz.jpg" alt="Nguyen Van Hieu" className={styles.img} />
                        <h2>Nguyen Van Hieu</h2>
                        <p>PROJECT ADVISOR</p>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.body}>   
            <div className={styles.wrapper}>
                <h1>Engineering & Development</h1>
                <hr className={styles.hr} />
                <div className={styles.members}>
                    <div className={styles.teamMem}>
                        <img src="https://res.cloudinary.com/dha9551k2/image/upload/v1686590428/MrBach_z5jfd9.jpg" alt="Mr. Tien" className={styles.img} />
                        <h2>Trinh Xuan Bach</h2>
                        <p>BACK-END DEVELOPER</p>
                    </div>
                    <div className={styles.teamMem}>
                        <img src="https://res.cloudinary.com/dha9551k2/image/upload/v1686590472/MrHiep_fyckdr.jpg" alt="MrsKimSao" className={styles.img} />
                        <h2>Tran Huy Hiep</h2>
                        <p>FRONT-END DEVELOPER</p>
                    </div>
                    <div className={styles.teamMem}>
                        <img src="https://res.cloudinary.com/dha9551k2/image/upload/v1688216281/MrMinh_tavqob.jpg" alt="MrMinh" className={styles.img} />
                        <h2>Le Dinh Minh</h2>
                        <p>TESTER</p>
                    </div>
                </div>
            </div>
        </div>

    </>
);

export default AboutUs