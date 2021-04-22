import React from 'react';
import styles from './Recommande.module.css';
import Carousel from "react-elastic-carousel";
import Link from "next/link";

const Recommande = () => {
  return (
    <div className={styles.recommandeContainer}>
      <h1 className={styles.recommandeTitle}>Ils recommandent Max et Lea</h1>
      <div className={styles.avisContainer}>
        <img src={'/avis.png'} alt="" className={styles.avisImg}/>
      </div>

      <div className={styles.carouselContainer}>
      <Carousel itemsToShow={3} isRTL={false} className={styles.avisCarousel}>
          <div className={styles.avisInnerContainer}>
            <div className={styles.imgAvatarContainer}>
              <img src={"/avatar.png"} alt="" className={styles.avatarImg}/>
            </div>
            <div>
              <p className={styles.title}>ANGELIQUE STRAUSS</p>
              <p className={styles.title}>Psychologue et pédiatre</p>
              <p className={styles.description}>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. A doloremque dolores eaque earum eveniet magnam minus natus quo, ratione saepe."</p>
            </div>
          </div>

        <div className={styles.avisInnerContainer}>
          <div className={styles.imgAvatarContainer}>
            <img src={"/avatar.png"} alt="" className={styles.avatarImg}/>
          </div>
          <div className={styles.avatarTitle}>
            <p className={styles.title}>ANGELIQUE STRAUSS</p>
            <p className={styles.title}>Psychologue et pédiatre</p>
            <p className={styles.description}>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. A doloremque dolores eaque earum eveniet magnam minus natus quo, ratione saepe."</p>
          </div>
        </div>

        <div className={styles.avisInnerContainer}>
          <div className={styles.imgAvatarContainer}>
            <img src={"/avatar.png"} alt="" className={styles.avatarImg}/>
          </div>
          <div className={styles.avatarTitle}>
            <p className={styles.title}>ANGELIQUE STRAUSS</p>
            <p className={styles.title}>Psychologue et pédiatre</p>
            <p className={styles.description}>"Lorem ipsum dolor sit amet, consectetur adipisicing elit. A doloremque dolores eaque earum eveniet magnam minus natus quo, ratione saepe."</p>
          </div>
        </div>
      </Carousel>
      </div>

    </div>
  );
};

export default Recommande;
