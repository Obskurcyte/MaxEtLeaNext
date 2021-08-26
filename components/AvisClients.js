import React from 'react';
import styles from './AvisClients.module.css';
import './AvisClients.module.css';
import {useTranslation} from "react-i18next";
import Slider from "react-slick";

const AvisClients = () => {

  const { t, i18n } = useTranslation();

  /*useEffect(() => {
    if (localStorage.getItem('lang')) {
        i18n.changeLanguage(localStorage.getItem('lang')).then(() => setAnchorEl(null))
        if (localStorage.getItem('lang') === 'fr') {
          dispatch(getDrapeau('/flagfr.png'))
        } if (localStorage.getItem('lang') === 'en') {
          dispatch(getDrapeau('/flagen.png'))
        } if (localStorage.getItem('lang') === 'es') {
          dispatch(getDrapeau('/flages.png'))
        } if (localStorage.getItem('lang') === 'al') {
          dispatch(getDrapeau('/flagal.png'))
        }
    }
  }, []);*/

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
  };
  return (
    <React.Fragment>
        <div className={styles.avisContainer}>
            <Slider {...settings}>
                <div>
                    <p className={styles.avisName}>Christine A.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src='/internet9.webp'></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.1")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Hélène S.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.irlande")}</p>
                        <img className={styles.paysFlag} src="/ireland-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.2")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Ethan F.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.uk")}</p>
                        <img className={styles.paysFlag} src="/uk-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.3")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Coralie C.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src="/internet9.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.4")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Agnes D.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.suisse")}</p>
                        <img className={styles.paysFlag} src="/suisse-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.5")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Alexis N.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src="/internet9.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.6")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Evelyn O.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.belgique")}</p>
                        <img className={styles.paysFlag} src="/belgium-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.7")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Clara A.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.italie")}</p>
                        <img className={styles.paysFlag} src="/italy-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.8")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Fernando N.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.portugal")}</p>
                        <img className={styles.paysFlag} src="/portugal-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.9")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Guillaume H.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src="/internet9.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.10")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Rita K.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.italie")}</p>
                        <img className={styles.paysFlag} src="/italy-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.11")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Carmen P.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.espagne")}</p>
                        <img className={styles.paysFlag} src="/spain-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.12")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Jean-Antoine P.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.espagne")}</p>
                        <img className={styles.paysFlag} src="/spain-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.13")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Norah H.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.allemagne")}</p>
                        <img className={styles.paysFlag} src="/germany-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.14")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Elizabeth R.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src="/internet9.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.15")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Joelle V.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.pays-bas")}</p>
                        <img className={styles.paysFlag} src="/netherlands-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.16")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>William S.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.uk")}</p>
                        <img className={styles.paysFlag} src="/uk-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.17")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Rosa A.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.portugal")}</p>
                        <img className={styles.paysFlag} src="/portugal-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.18")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Ina B.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.allemagne")}</p>
                        <img className={styles.paysFlag} src="/germany-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.19")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Paola R.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.espagne")}</p>
                        <img className={styles.paysFlag} src="/spain-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.20")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Astrid D.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src="/internet9.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.21")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Giovanni D.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.italie")}</p>
                        <img className={styles.paysFlag} src="/italy-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.22")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Alicia G.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.suede")}</p>
                        <img className={styles.paysFlag} src="/sweden-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.23")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Camilla S.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.portugal")}</p>
                        <img className={styles.paysFlag} src="/portugal-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.24")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Patricia A.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.italie")}</p>
                        <img className={styles.paysFlag} src="/italy-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.25")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Michel L.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.allemagne")}</p>
                        <img className={styles.paysFlag} src="/germany-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.26")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Jérôme B.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src="/internet9.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.27")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Patrick L.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.irlande")}</p>
                        <img className={styles.paysFlag} src="/ireland-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.28")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Helena W.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.portugal")}</p>
                        <img className={styles.paysFlag} src="/portugal-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.29")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Sabrina B.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.espagne")}</p>
                        <img className={styles.paysFlag} src="/spain-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.30")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Mathieu F.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.italie")}</p>
                        <img className={styles.paysFlag} src="/italy-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.31")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Amber G.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.uk")}</p>
                        <img className={styles.paysFlag} src="/uk-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.32")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Charlotte J.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src='/internet9.webp'></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.33")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Olivier G.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src='/internet9.webp'></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.34")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Sophia H.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.espagne")}</p>
                        <img className={styles.paysFlag} src="/spain-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.35")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Anthony R.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.uk")}</p>
                        <img className={styles.paysFlag} src="/uk-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.36")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Fiona S.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.france")}</p>
                        <img className={styles.paysFlag} src='/internet9.webp'></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.37")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Elise B.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.allemagne")}</p>
                        <img className={styles.paysFlag} src="/germany-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.38")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Alexandra D.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.irlande")}</p>
                        <img className={styles.paysFlag} src="/ireland-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.39")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Karen P.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.danemark")}</p>
                        <img className={styles.paysFlag} src="/denmark-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.40")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>George A.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.uk")}</p>
                        <img className={styles.paysFlag} src="/uk-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.41")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Joanna P.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.italie")}</p>
                        <img className={styles.paysFlag} src="/italy-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.42")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Adrian R.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.irlande")}</p>
                        <img className={styles.paysFlag} src="/ireland-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.43")}
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Anna C.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>{t("avis.suisse")}</p>
                        <img className={styles.paysFlag} src="/suisse-flag.webp"></img>
                    </div>
                    <div>
                    <i className="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    <i className="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.44")}
                    </p>
                </div>
            </Slider>
        </div>
    </React.Fragment>
  )
};

export default AvisClients
