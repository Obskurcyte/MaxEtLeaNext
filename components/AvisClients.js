import React from 'react';
import styles from './AvisClients.module.css';
import './AvisClients.module.css';
import {useTranslation} from "react-i18next";
import Slider from "react-slick";

const AvisClients = () => {

  const { t, i18n } = useTranslation();

  var settings = {
    dots: true,
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
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
                    <i class="fa fa-star mar-star-first" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    <i class="fa fa-star mar-star" aria-hidden="true"></i>
                    </div>
                    <p className={styles.avisDesc}>
                    {t("avis.12")}
                    </p>
                </div>
            </Slider>
        </div>
    </React.Fragment>
  )
};

export default AvisClients
