import React from 'react';
import styles from './XylophoneQualite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const XylophoneQualite = () => {
  return (
    <div className="container my-5 wola" id={styles.qualite}>
      <h1 className={styles.title}>Le Xylophone : <br/>Le jouet Musical préféré des 1 à 6 ans</h1>
      <div className={styles.firstRow}>
        <img src={'/qualiteXylo1.jpg'} alt=""/>
        <div className={styles.constructionRobuste}>
          <h5>“La musique est fondamentale pour la croissance du jeune enfant. Elle aide notamment au développement du cerveau”</h5>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Il cultive son <span className="fw-bold">intérêt pour la musique</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Il <span className="fw-bold">découvre ses premières notes</span> musicales</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Il développe sa <span className="fw-bold">capacité auditive</span> et son <span className="fw-bold">sens du rythme</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Fabriqué avec des matériaux <span className="fw-bold">écologiques</span> et <span className="fw-bold">naturels</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p><span className="fw-bold">8 tonalités différentes</span></p>
          </div>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className={styles.constructionRobuste}>
          <h5 className={styles.finitions}>"Favoriser les vrais instruments de musique permet des sons de meilleure qualité et inspire le talent des enfants"</h5>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Il apprend à <span className="fw-bold">reproduire des sons</span> et des musiques simples et <span className="fw-bold">améliore sa concentration</span></p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Les baguettes sont <span className="fw-bold">adaptées à la taille de sa main</span> pour une prise en main facilitée</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Un <span className="fw-bold">jouet durable</span> - Bon pour la nature et bon pour vos enfants</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Le Xylophone est LE <span className="fw-bold">jouet d'éveil musical</span> préféré des tout-petits</p>
          </div>
          <div className={styles.list}>
            <FontAwesomeIcon icon={faCheck} color="#E72C59" className={styles.icon}/>
            <p>Développe la <span className="fw-bold">créativité </span>et le <span className="fw-bold">talent</span> des jeunes enfants</p>
          </div>
        </div>
        <img src={'/qualiteXylo2.jpg'} alt=""/>
      </div>

    </div>
  );
};

export default XylophoneQualite;
