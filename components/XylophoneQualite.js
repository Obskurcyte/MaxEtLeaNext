import React from 'react';
import styles from './XylophoneQualite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

const XylophoneQualite = () => {

  const { t, i18n } = useTranslation();

  return (
    <div className="container my-5 wola" id={styles.qualite}>
      <h1 className={styles.title}>{t("Xylo.26")}<br/>{t("Xylo.27")}</h1>
      <div className={styles.firstRow}>
        <img src={'/qualiteXylo1.jpg'} className={styles.imgQualite} alt=""/>
        <div className={styles.constructionRobuste}>
          <h5>{t("Xylo.28")}</h5>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>{t("Xylo.29")}<span className="fw-bold">{t("Xylo.30")}</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>{t("Xylo.31")}<span className="fw-bold">{t("Xylo.32")}</span>{t("Xylo.33")}</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>{t("Xylo.34")}<span className="fw-bold">{t("Xylo.35")}</span>{t("Xylo.36")}<span className="fw-bold">{t("Xylo.37")}</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>{t("Xylo.38")}<span className="fw-bold">{t("Xylo.39")}</span>{t("Xylo.40")}<span className="fw-bold">{t("Xylo.41")}</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p><span className="fw-bold">{t("Xylo.42")}</span></p>
          </div>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className={styles.constructionRobuste}>
          <h5 className={styles.finitions}>{t("Xylo.43")}</h5>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>{t("Xylo.44")}<span className="fw-bold">{t("Xylo.45")}</span>{t("Xylo.46")}<span className="fw-bold">{t("Xylo.47")}</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>{t("Xylo.48")}<span className="fw-bold">{t("Xylo.49")}</span>{t("Xylo.50")}</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>{t("Xylo.51")}<span className="fw-bold">{t("Xylo.52")}</span>{t("Xylo.53")}</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>{t("Xylo.54")}<span className="fw-bold">{t("Xylo.55")}</span>{t("Xylo.56")}</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>{t("Xylo.57")}<span className="fw-bold">{t("Xylo.58")}</span>{t("Xylo.59")}<span className="fw-bold">{t("Xylo.60")}</span>{t("Xylo.61")}</p>
          </div>
        </div>
        <img src={'/qualiteXylo2.jpg'} className={styles.imgQualite} alt=""/>
      </div>

    </div>
  );
};

export default XylophoneQualite;
