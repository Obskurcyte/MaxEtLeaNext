import React from 'react';
import styles from "./Engagement.module.css";
import {useTranslation} from "react-i18next";

const Engagement = () => {
  const { t, i18n } = useTranslation();

  return (
    <React.Fragment>
    <div className={styles.engagementContainer}>
      <h1 style={{textAlign: 'center'}} className={styles.garantiesTitle}>{t("Engagement.1")}</h1>
      <div >
        <img src={'/100.png'} alt="" className={styles.photo1}/>
      </div>
      <div className="row" style={{maxWidth: '1200px', margin: '35px auto'}}>
        <div className="col" style={{minWidth: '170px'}}>
          <div>
            <img src={'/childcare.png'} alt="" className={styles.imageGaranties}/>
          </div>
          <h3 className={styles.garantiesUndertitle}>{t("Engagement.2")}</h3>
          <p className={styles.garantiesParagraph}>{t("Engagement.3")}</p>
        </div>
        <div className="col" style={{minWidth: '170px'}}>
          <div>
            <img src={'/eco-icon.webp'} alt="" className={styles.imageGaranties}/>
          </div>
          <h3 className={styles.garantiesUndertitle}>{t("Engagement.4")}</h3>
          <p className={styles.garantiesParagraph}>{t("Engagement.5")}</p>
        </div>
        <div className="col" style={{minWidth: '170px'}}>
          <div>
            <img src={'/stars.webp'} alt="" className={styles.imageGaranties}/>
          </div>
          <h3 className={styles.garantiesUndertitle}>{t("Engagement.6")}</h3>
          <p className={styles.garantiesParagraph}>{t("Engagement.7")}</p>
        </div>
        <div className="col" style={{minWidth: '170px'}}>
          <div>
            <img src={'/smile-icon.webp'} alt="" className={styles.imageGaranties}/>
          </div>
          <h3 className={styles.garantiesUndertitle}>{t("Engagement.8")}</h3>
          <p className={styles.garantiesParagraph}>{t("Engagement.9")}</p>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
};

export default Engagement;
