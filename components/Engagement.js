import React from 'react';
import styles from "./Engagement.module.css";
import {useTranslation} from "react-i18next";

const Engagement = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
    <div className={styles.engagementContainer}>
      <h1 style={{textAlign: 'center'}} className="garanties-title">Max et Léa s'engage à</h1>
      <div >
        <img src={'/100.png'} alt="" className={styles.photo1}/>
      </div>
      <div className="row" style={{maxWidth: '1200px', margin: '20px auto'}}>
        <div className="col" style={{minWidth: '170px'}}>
          <div>
            <img src={'/childcare.png'} alt="" className={styles.imageGaranties}/>
          </div>
          <h3 className={styles.garantiesUndertitle}>{t("Engagement.2")}</h3>
          <p className={styles.garantiesParagraph}>{t("Engagement.3")}</p>
        </div>
        <div className="col" style={{minWidth: '170px'}}>
          <div>
            <img src={'/eco-label.png'} alt="" className={styles.imageGaranties}/>
          </div>
          <h3 className={styles.garantiesUndertitle}>{t("Engagement.4")}</h3>
          <p className={styles.garantiesParagraph}>{t("Engagement.5")}</p>
        </div>
        <div className="col" style={{minWidth: '170px'}}>
          <div>
            <img src={'/stars.png'} alt="" className={styles.imageGaranties}/>
          </div>
          <h3 className={styles.garantiesUndertitle}>{t("Engagement.6")}</h3>
          <p className={styles.garantiesParagraph}>{t("Engagement.7")}</p>
        </div>
        <div className="col" style={{minWidth: '170px'}}>
          <div>
            <img src={'/ellipse2.png'} alt="" className={styles.imageGaranties}/>
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
