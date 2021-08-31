import React from 'react';
import styles from './XylophoneQualite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {useTranslation} from "react-i18next";

const TourQualite = () => {


  const { t, i18n } = useTranslation();

  return (
    <div className="container my-5 wola" id={styles.qualite}>
      <h1 className={styles.title}>{t("Tour.26")}<br/>{t("Tour.27")}</h1>
      <div className={styles.firstRow}>
        <img src={'/tourQualite1.webp'} className={styles.imgQualite} alt=""/>
        <div className={styles.constructionRobuste}>
          <h5>{t("Tour.28")}</h5>
          <div className={styles.list}>
            <div>
              <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
              </div>
            <p>{t("Tour.29")}<span className="fw-bold">{t("Tour.30")}</span>{t("Tour.31")}</p>
          </div>
          <div className={styles.list}>
          <div>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            </div>
            <p>{t("Tour.32")}<span className="fw-bold">{t("Tour.33")}</span>{t("Tour.34")}<span className="fw-bold">{t("Tour.35")}</span></p>
          </div>
          <div className={styles.list}>
          <div>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            </div>
            <p>{t("Tour.36")}<span className="fw-bold">{t("Tour.37")}</span>{t("Tour.38")}<span className="fw-bold">{t("Tour.39")}</span></p>
          </div>
          <div className={styles.list}>
          <div>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            </div>
            <p>{t("Tour.40")}<span className="fw-bold">{t("Tour.41")}</span>{t("Tour.42")}</p>
          </div>
          <div className={styles.list}>
          <div>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            </div>
            <p><span className="fw-bold">{t("Tour.43")}</span></p>
          </div>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className={styles.constructionRobuste}>
          <h5 className={styles.finitions}>{t("Tour.44")}</h5>
          <div className={styles.list}>
          <div>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            </div>
            <p>{t("Tour.45")}<span className="fw-bold">{t("Tour.46")}</span></p>
          </div>
          <div className={styles.list}>
          <div>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            </div>
            <p>{t("Tour.47")}<span className="fw-bold">{t("Tour.48")}</span>{t("Tour.49")}<span className="fw-bold">{t("Tour.50")}</span></p>
          </div>
          <div className={styles.list}>
          <div>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            </div>
            <p>{t("Tour.51")}<span className="fw-bold">{t("Tour.52")}</span>{t("Tour.53")}</p>
          </div>
          <div className={styles.list}>
          <div>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            </div>
            <p>{t("Tour.54")}</p>
          </div>
          <div className={styles.list}>
          <div>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            </div>
            <p>{t("Tour.55")}<span className="fw-bold">{t("Tour.56")}</span></p>
          </div>
        </div>
        <img src={'/tourQualite2.webp'} className={styles.imgQualite} alt=""/>
      </div>

    </div>
  );
};

export default TourQualite;
