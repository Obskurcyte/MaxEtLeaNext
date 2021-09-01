import React from 'react';
import styles from './Qualite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const QualiteDansLesDetails = () => {

  const { t, i18n } = useTranslation();

  return (
    <div className="container my-5" id={styles.qualite}>
      <h1 className={styles.title}>{t("Qualite.1")}</h1>
      <div className={styles.firstRow}>
        <img className={styles.imgQualite} src={'/qualite.jpg'} alt="" />
        <div className={styles.constructionRobuste}>
          <h5>{t("Qualite.2")}</h5>
          <div className={styles.list}>
            <div>
              <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon} />
            </div>
            <p>{t("Qualite.3")}<span className="fw-bold">{t("Qualite.4")}</span>{t("Qualite.5")}<span className="fw-bold">{t("Qualite.6")}</span> </p>
          </div>
          <div className={styles.list}>
            <div>
              <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon} />
            </div>
            <p><span className="fw-bold">{t("Qualite.7")}</span>{t("Qualite.8")}<span className="fw-bold">{t("Qualite.9")}</span> </p>
          </div>
          <div className={styles.list}>
            <div>
              <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon} />
            </div>
            <p>{t("Qualite.10")}<span className="fw-bold">{t("Qualite.11")}</span>{t("Qualite.12")}<span className="fw-bold">{t("Qualite.13")}</span>{t("Qualite.14")}<span className="fw-bold">{t("Qualite.15")}</span> </p>
          </div>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className={styles.constructionRobuste}>
          <h5 className={styles.finitions}>{t("Qualite.16")}</h5>
          <div className={styles.list}>
            <div>
              <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon} />
            </div>
            <p>{t("Qualite.17")}<span className="fw-bold">{t("Qualite.18")}</span>{t("Qualite.19")}<span className="fw-bold">{t("Qualite.20")}</span>{t("Qualite.21")}<span className="fw-bold">{t("Qualite.22")}</span> </p>
          </div>
          <div className={styles.list}>
            <div>
              <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon} />
            </div>
            <p><span className="fw-bold">{t("Qualite.23")}</span>{t("Qualite.24")}<span className="fw-bold">{t("Qualite.25")}</span> </p>
          </div>
          <div className={styles.list}>
            <div>
              <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon} />
            </div>
            <p>{t("Qualite.26")}<span className="fw-bold">{t("Qualite.27")}</span>{t("Qualite.28")}<span className="fw-bold">{t("Qualite.29")}</span>{t("Qualite.30")}<span className="fw-bold">{t("Qualite.31")}</span> </p>
          </div>
          <div className={styles.list}>
            <div>
              <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon} />
            </div>
            <p>{t("Qualite.32")}<span className="fw-bold">{t("Qualite.33")}</span>{t("Qualite.34")}<span className="fw-bold">{t("Qualite.35")}</span></p>
          </div>
        </div>
        <img src={'/qualite2.jpg'} className={styles.imgQualite} alt="" />
      </div>

    </div>
  );
};

export default QualiteDansLesDetails;
