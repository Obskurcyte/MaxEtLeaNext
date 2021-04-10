import React, {useEffect} from 'react';
import Header from "../components/Header";
import {Row, Col} from "react-bootstrap";
import Footer from "../components/Footer";
import {useSelector, useDispatch} from "react-redux";
import * as productAction from '../store/actions/product'

const PlayBoardScreen = props => {



    return (
      <div>
        <Header/>
        <div className="playboard-container">
          <div className="playboard-description">
            <div className="playboard-images">
              <div className="playboard-image">
                <img src="https://maxandlea.com/wp-content/uploads/2020/10/VueProduit-Tablette-MaxAndLea-2-min.png"
                     alt=""/>
              </div>
              <div className="playboard-petites-images">
                <Row className="">
                  <Col sm={12} md={2} lg={2} xl={2}>
                    <img
                      src="https://maxandlea.com/wp-content/uploads/2020/10/VueProduit-Tablette-MaxAndLea-2-min-100x100.png"
                      alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/05/VISUEL-CTA-EN-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/05/TabletteUtilisée-VueDessus-100x100.jpg"
                         alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/05/IMG_5094-logo-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/05/IMG_3528-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/05/IMG_4636-logo-1-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/05/IMG_4203-copie-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/05/IMG_5098-logo-100x100.jpg" alt=""/>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="playboard-total">
              <div className="playboard-rating">
                <h1 className="playboard-title">
                  La PlayBoard
                </h1>
                <div>
                  <i className="fas fa-star"/>
                  <i className="fas fa-star"/>
                  <i className="fas fa-star"/>
                  <i className="fas fa-star"/>
                  <i className="fas fa-star"/>
                </div>
              </div>
              <div className="succes-playboard">
                <h5 className="playboard-prix">49,90€</h5>
                <p className="playboard-succes">Victime de son succès, la PlayBoard est actuellement en rupture de
                  stock. Elle sera de nouveau disponible le 01/03/2021.
                  Laissez nous votre e-mail pour être informé des qu’elle sera de nouveau disponible :
                </p>
                <input type="text" placeholder="Email"/>
                <div className="button-container">
                  <div className="bouton-playboard">
                    <button className="playboard-button">Envoyer</button>
                  </div>
                </div>
                <p className="description-playboard">La PlayBoard est le jouet le plus complet pour <span>stimuler l’éveil</span> et
                  la <span>motricité fine des enfants. </span>

                  La PlayBoard est une véritable boite à outils avec laquelle votre
                  petit <span>développera ses talents.</span> Votre enfant apprendra <span>à son rythme</span> et <span>en s’amusant.</span>
                </p>
                <div className="ebookgratuits">
                  <img src="https://play.maxandlea.com/wp-content/uploads/2020/05/dot_4.svg" alt=""/>
                  <p style={{fontWeight: 'bold'}}>3 ebooks <span
                    style={{textDecoration: 'underline'}}>GRATUITS</span> avec votre PlayBoard</p>
                </div>
                <div className="rangement-offert">
                  <img
                    src="https://play.maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-copie-6.png"
                    alt=""/>
                  <p style={{fontWeight: 'bold'}}>Un sac de rangement <span
                    style={{textDecoration: 'underline'}}>OFFERT</span></p>
                </div>
              </div>
            </div>
          </div>
          <div className="video">
            <video src="https://maxandlea.com/wp-content/uploads/2020/10/MaxEtLea-GIF-FR-V3-600.mp4"/>
          </div>
        </div>

        <div className="developpement-psycho">
          <h2>Pensée pour chaque étape du <span>développement psychomoteur</span> de l'enfant</h2>
          <div style={{display: 'flex', justifyContent: 'space-around'}}>
            <div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className="psycho">
                  <i className="fas fa-palette"/>
                  <p>Développez sa <span>créativité</span></p>
                </div>
                <div className="psycho">
                  <i className="fas fa-sign-language"/>
                  <p>Développez son <span>habilité</span></p>
                </div>
                <div className="psycho">
                  <i className="fas fa-child"/>
                  <p>Travaillez sa <span>motricité</span></p>
                </div>
              </div>
            </div>
            <div>
              <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className="psycho">
                  <i className="fas fa-brain"/>
                  <p>Aiguiser sa <span>concentration</span></p>
                </div>
                <div className="psycho">
                  <i className="far fa-grin-stars"/>
                  <p><span>Apprendre est un jeu</span></p>
                </div>
                <div className="psycho">
                  <i className="fas fa-user-check"/>
                  <p>Travaillez sa <span>motricité</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
};

export default PlayBoardScreen;
