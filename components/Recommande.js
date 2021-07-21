import React from 'react';
import styles from './Recommande.module.css';
import Slider from "react-slick";
import Link from "next/link";

const Recommande = () => {

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
            slidesToShow: 1,
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
              <p className={styles.title}>Je suis Papa​</p>
              <p className={styles.subtitle}>Blogueur et Papa</p>
              <p className={styles.description}>« Avec ses jolis dégradés de couleurs, la PlayBoard est idéale pour découvrir les couleurs, les chiffres, les formes et bien d’autres jeux d’éveil. »</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/maman-plume.png"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>Maman Plume</p>
              <p className={styles.subtitle}>Blogueuse et Maman</p>
              <p className={styles.description}>« Mon avis de Maman : Un gros coup de coeur pour la PlayBoard. Un jeu super complet, qui à lui seul, contient 8 jeux ludiques.Bébé adore et Maman aussi ! »</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/aounZoom.png"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>Dr. Julia AOUN</p>
              <p className={styles.subtitle}>Pediatre et Maman</p>
              <p className={styles.description}>« La PlayBoard est un jouet éducatif, ludique et écologique très complet qui commence du plus jeune âge jusqu’aux plus grands. Ce jouet permet le développement de la motricité fine et de la coordination avec un principe que je recommande : zéro-écran et zero-plastique. »</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/Angelique.jpg"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>Angélique KOSINSKI-CIMELIERE</p>
              <p className={styles.subtitle}>Psychologue <br></br> & Psychomotricienne - <br></br>Spécialiste de la petite enfance</p>
              <p className={styles.description}>« La PlayBoard de Max & Lea est l’outil idéal pour stimuler les fonctions cognitives de l’enfant. »</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/Babadins.jpg"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>Les ptits Babadins</p>
              <p className={styles.subtitle}>Réseau de 80 micro-crèches en France</p>
              <p className={styles.description}>« Un superbe jouet pour favoriser l’éveil des tous petits et des plus grands. »</p>
            </div>
          </div>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/Julia-Kobus.jpg"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>Julia Kobus</p>
              <p className={styles.subtitle}>Blogueuse et Maman</p>
              <p className={styles.description}>« J’aime beaucoup la PlayBoard. C’est un jouet 8 en 1 idéal de 1 à 6 ans : calcul, couleurs, dégradés de couleur, éveil, animaux, formes, coordination et nombre. »</p>
            </div>
          </div>
      </Slider>
      </div>

    </div>
  );
};

export default Recommande;
