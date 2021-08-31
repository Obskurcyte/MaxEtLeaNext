import React from 'react';
import styles from './Recommande.module.css';
import Slider from "react-slick";
import Link from "next/link";
import {useTranslation} from "react-i18next";

const Recommande = () => {

  const { t, i18n } = useTranslation();

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
      ]
  };

  return (
    <div className={styles.recommandeContainer}>

      <div className={styles.carouselContainer}>
      <Slider {...settings}>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/Je-suis-Papa.jpg"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>{t("Recommande.1")}</p>
              <p className={styles.subtitle}>{t("Recommande.2")}</p>
              <p className={styles.description}>{t("Recommande.3")}</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/maman-plume.png"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>{t("Recommande.4")}</p>
              <p className={styles.subtitle}>{t("Recommande.5")}</p>
              <p className={styles.description}>{t("Recommande.6")}</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/aounZoom.png"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>{t("Recommande.7")}</p>
              <p className={styles.subtitle}>{t("Recommande.8")}</p>
              <p className={styles.description}>{t("Recommande.9")}</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/Angelique.jpg"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>{t("Recommande.10")}</p>
              <p className={styles.subtitle}>{t("Recommande.11")} <br></br> {t("Recommande.12")} - <br></br>{t("Recommande.13")}</p>
              <p className={styles.description}>{t("Recommande.14")}</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/Babadins.jpg"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>{t("Recommande.15")}</p>
              <p className={styles.subtitle}>{t("Recommande.16")}</p>
              <p className={styles.description}>{t("Recommande.17")}</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/Julia-Kobus.jpg"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>{t("Recommande.18")}</p>
              <p className={styles.subtitle}>{t("Recommande.19")}</p>
              <p className={styles.description}>{t("Recommande.20")}</p>
            </div>
          </div>
      </Slider>
      </div>

    </div>
  );
};

export default Recommande;
