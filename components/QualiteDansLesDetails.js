import React from 'react';
import styles from './Qualite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const QualiteDansLesDetails = () => {
  return (
    <div className="container my-5 wola" id={styles.qualite}>
      <h1 className={styles.title}>LA QUALITE EST DANS LES DETAILS</h1>
      <div className={styles.firstRow}>
        <img src={'/qualite.jpg'} alt=""/>
        <div className={styles.constructionRobuste}>
          <h5>CONSTRUCTION ROBUSTE EN BOIS</h5>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Bois issu de <span className="fw-bold">forêts certifiées FSC®</span> et de <span className="fw-bold">haute qualité</span> </p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p><span className="fw-bold">Matériaux nobles</span> et <span className="fw-bold">construction solide</span> </p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Un <span className="fw-bold">travail minutieux</span> et une <span className="fw-bold">fabrication soignée</span> pour une <span className="fw-bold">durabilité maximale</span> </p>
          </div>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className={styles.constructionRobuste}>
          <h5 className={styles.finitions}>Finitions soignées</h5>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Des <span className="fw-bold">couleurs douces</span> et <span className="fw-bold">chaleureuses</span> étudiées pour <span className="fw-bold">apaiser l'enfant</span> </p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p><span className="fw-bold">Angles biseautés</span> et <span className="fw-bold">finitions soignées</span> </p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Des <span className="fw-bold">textures douces</span> et <span className="fw-bold">délicates</span> pour une <span className="fw-bold">parfaite prise en main</span> </p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Des <span className="fw-bold">images travaillées</span> pour <span className="fw-bold">faciliter la reconnaissance</span></p>
          </div>
        </div>
        <img src={'/qualite2.jpg'} alt=""/>
      </div>

    </div>
  );
};

export default QualiteDansLesDetails;
