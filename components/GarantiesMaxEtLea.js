import React from 'react';
import styles from './GarantiesMaxEtLea.module.css';
import {useTranslation} from "react-i18next";



const Garanties = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
    <div className={styles.garantiesSupercontainer}>
      <h1 style={{textAlign: 'center'}} className={styles.garantiesTitle}>{t("Garanties1")}</h1>
      <div className={styles.satisfactions}>
        <div className={styles.satisfactionMiniContainer}>
          <div className={styles.innerSatisfaction}>
            <div>
              <img src={'/Payment.png'} alt="paiement" className={styles.imageGaranties} style={{marginTop: '10%'}}/>
            </div>
            <h3 className={styles.garantiesUndertitle}>{t("Garanties2")}</h3>
            <p className={styles.garantiesParagraph}>{t("Garanties3")}</p>
          </div>
          <div className={styles.innerSatisfaction}>
            <div>
             <img src={'/like.png'} alt="like" className={styles.imageGaranties}/>
            </div>
            <h3 className={styles.garantiesUndertitle}>{t("Garanties4")}</h3>
            <p className={styles.garantiesParagraph}>{t("Garanties5")}</p>
          </div>
        </div>
        <div className={styles.satisfactionMiniContainer}>
        <div className={styles.innerSatisfaction}>
          <div>
            <img src={'/headphones.png'} alt="headphones" className={styles.imageGaranties}/>
          </div>
          <h3 className={styles.garantiesUndertitle}>{t("Garanties6")}</h3>
          <p className={styles.garantiesParagraph}>{t("Garanties7")}</p>
        </div>
        <div className={styles.innerSatisfaction}>
          <div>
            <img src={'/delivering.png'} alt="livraison" className={styles.imageGaranties}/>
          </div>
          <h3 className={styles.garantiesUndertitle}>{t("Garanties8")}</h3>
          <p className={styles.garantiesParagraph}>{t("Garanties9")}</p>
        </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
};

export default Garanties
