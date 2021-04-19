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
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };
  return (
    <React.Fragment>
        <div className={styles.avisContainer}>
            <Slider {...settings}>
                <div>
                    <p className={styles.avisName}>Coralie C.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>France</p>
                        <img className={styles.paysFlag} src="https://maxandlea.com/wp-content/uploads/2020/06/france-flag-icon-16.png"></img>
                    </div>
                    <img className={styles.stars} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/5_stars.svg/1200px-5_stars.svg.png"></img>
                    <p className={styles.avisDesc}>
                        Je suis très heureuse de mon achat. Mes 2 enfants jouent beaucoup avec leur PlayBoard et avec les autres jouets achetés sur Max & Lea. Livraison très rapide : 3 jours.
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Coralie C.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>France</p>
                        <img className={styles.paysFlag} src="https://maxandlea.com/wp-content/uploads/2020/06/france-flag-icon-16.png"></img>
                    </div>
                    <img className={styles.stars} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/5_stars.svg/1200px-5_stars.svg.png"></img>
                    <p className={styles.avisDesc}>
                        Je suis très heureuse de mon achat. Mes 2 enfants jouent beaucoup avec leur PlayBoard et avec les autres jouets achetés sur Max & Lea. Livraison très rapide : 3 jours.
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Coralie C.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>France</p>
                        <img className={styles.paysFlag} src="https://maxandlea.com/wp-content/uploads/2020/06/france-flag-icon-16.png"></img>
                    </div>
                    <img className={styles.stars} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/5_stars.svg/1200px-5_stars.svg.png"></img>
                    <p className={styles.avisDesc}>
                        Je suis très heureuse de mon achat. Mes 2 enfants jouent beaucoup avec leur PlayBoard et avec les autres jouets achetés sur Max & Lea. Livraison très rapide : 3 jours.
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Coralie C.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>France</p>
                        <img className={styles.paysFlag} src="https://maxandlea.com/wp-content/uploads/2020/06/france-flag-icon-16.png"></img>
                    </div>
                    <img className={styles.stars} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/5_stars.svg/1200px-5_stars.svg.png"></img>
                    <p className={styles.avisDesc}>
                        Je suis très heureuse de mon achat. Mes 2 enfants jouent beaucoup avec leur PlayBoard et avec les autres jouets achetés sur Max & Lea. Livraison très rapide : 3 jours.
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Coralie C.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>France</p>
                        <img className={styles.paysFlag} src="https://maxandlea.com/wp-content/uploads/2020/06/france-flag-icon-16.png"></img>
                    </div>
                    <img className={styles.stars} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/5_stars.svg/1200px-5_stars.svg.png"></img>
                    <p className={styles.avisDesc}>
                        Je suis très heureuse de mon achat. Mes 2 enfants jouent beaucoup avec leur PlayBoard et avec les autres jouets achetés sur Max & Lea. Livraison très rapide : 3 jours.
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Coralie C.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>France</p>
                        <img className={styles.paysFlag} src="https://maxandlea.com/wp-content/uploads/2020/06/france-flag-icon-16.png"></img>
                    </div>
                    <img className={styles.stars} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/5_stars.svg/1200px-5_stars.svg.png"></img>
                    <p className={styles.avisDesc}>
                        Je suis très heureuse de mon achat. Mes 2 enfants jouent beaucoup avec leur PlayBoard et avec les autres jouets achetés sur Max & Lea. Livraison très rapide : 3 jours.
                    </p>
                </div>
                <div>
                    <p className={styles.avisName}>Coralie C.</p>
                    <div className={styles.paysContainer}>
                        <p className={styles.paysName}>France</p>
                        <img className={styles.paysFlag} src="https://maxandlea.com/wp-content/uploads/2020/06/france-flag-icon-16.png"></img>
                    </div>
                    <img className={styles.stars} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/5_stars.svg/1200px-5_stars.svg.png"></img>
                    <p className={styles.avisDesc}>
                        Je suis très heureuse de mon achat. Mes 2 enfants jouent beaucoup avec leur PlayBoard et avec les autres jouets achetés sur Max & Lea. Livraison très rapide : 3 jours.
                    </p>
                </div>
            </Slider>
        </div>
    </React.Fragment>
  )
};

export default AvisClients
