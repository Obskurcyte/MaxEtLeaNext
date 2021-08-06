import React from 'react';
import styles from './XylophoneQualite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const TourQualite = () => {

  return (
    <div className="container my-5 wola" id={styles.qualite}>
      <h1 className={styles.title}>La tour Arc-en-ciel : <br/>Le célèbre jouet des 1 à 6 ans, Durable et Ecologique</h1>
      <div className={styles.firstRow}>
        <img src={'/tourQualite1.webp'} alt=""/>
        <div className={styles.constructionRobuste}>
          <h5>“Encourager le tri des formes,l'organisation et la logique”</h5>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Découvrir <span className="fw-bold">les couleurs</span> et jouer avec</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Un jouet sûr grâce aux <span className="fw-bold">textures douces</span> et à une <span className="fw-bold">tige centrale qui se plie</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Un jouet <span className="fw-bold">ludique</span> et <span className="fw-bold">éducatif</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Un jouet idéal pour la <span className="fw-bold">coordination oeil-main</span> de l'enfant</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p><span className="fw-bold">D'innombrables façons de jouer</span></p>
          </div>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className={styles.constructionRobuste}>
          <h5 className={styles.finitions}>"Le Best-seller mondial que tous les enfants adorent !"</h5>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Un Outil indispensable pour travailler la <span className="fw-bold">concentration</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Développer sa <span className="fw-bold">patience </span>et <span className="fw-bold">affiner sa gestuelle</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Un <span className="fw-bold">jouet durable</span>: bon pour la nature et bon pour vos enfants</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Votre petit apprendra à empiler et ordonner les formes</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Votre petit l'utilisera des heures entières grâce à ses <span className="fw-bold">innombrables façons de jouer</span></p>
          </div>
        </div>
        <img src={'/tourQualite2.webp'} alt=""/>
      </div>

    </div>
  );
};

export default TourQualite;
