import React from 'react';
import Header from "../components/Header";
import { Card, Row, Col, Container } from "react-bootstrap";
import Footer from "../components/Footer";
import {useTranslation} from "react-i18next";
import Head from "next/head";


const Equipe = () => {

  const { t, i18n } = useTranslation();

  return (
    <div>
      <Head>
        <title>Max And Lea - {t("Equipe.title")}</title>
      </Head>
      <Header />
      <div className="page-supercontainer">
        <div className="equipeContainer">
          <div className="bgOverlay"></div>
          <h1 className="team">{t("Equipe.1")}</h1>
        </div>
        <div className="container1000">
          <div className="equipeDescriptionContainer">
            <p>{t("Equipe.2")}</p>
            <p>{t("Equipe.3")}</p>

            <div className="mainEquipeContainer">
              <div className="row">
                <div className="col">
                  <div className="imgPresentationContainer">
                    <img src={'/PC.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Pierre-Charles <br /> FOSANELLI</h5>
                    <p>{t("Equipe.4")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.5")}</p>
                  </div>
                </div>

                <div className="col">
                  <div className="imgPresentationContainer">
                    <img src={'/Ludo.png'} alt="" />
                  </div>
                  <div>
                    <h5>Ludovic <br /> CHARTOUNI</h5>
                    <p>{t("Equipe.6")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.7")}</p>
                  </div>

                </div>

                <div className="col">
                  <div className="imgPresentationContainer">
                    <img src={'/theo.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Théodore <br /> D'AVRAY</h5>  
                    <p>{t("Equipe.8")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.9")}</p>
                  </div>
                </div>

                <div className="col">
                  <div className="imgPresentationContainer">
                    <img src={'/sandrine.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Sandrine <br /> BERTINETTI</h5>  
                    <p>{t("Equipe.10")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.11")}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/kristel.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Kristhel <br /> ASNAR-GALLOIS</h5>  
                    <p>{t("Equipe.12")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.13")}</p>
                  </div>
                </div>

                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/xavier.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Xavier <br /> CARRASCO</h5>  
                    <p>{t("Equipe.14")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.15")}</p>
                  </div>
                </div>

                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/stephane.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Stephane <br /> COUNDOURIS</h5>  
                    <p>{t("Equipe.16")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.17")}</p>
                  </div>
                </div>

                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/alexandre.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Alexandre <br /> LOONES</h5>  
                    <p>{t("Equipe.18")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.19")}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/sandy.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Sandy <br /> EUDELINE</h5>  
                    <p>{t("Equipe.20")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.21")}</p>
                  </div>
                </div>

                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/delphine.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Delphine <br /> ESPOSITO</h5>  
                    <p>{t("Equipe.22")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.23")}</p>
                  </div>
                </div>

                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/carla.png'} alt="" />
                  </div>
                  <div>
                    <h5>Carla <br /> GOMEZ</h5>  
                    <p>{t("Equipe.24")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.25")}</p>
                  </div>
                </div>

                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/hadrien.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Hadrien <br /> JAUBERT</h5>  
                    <p>{t("Equipe.26")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.27")}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/nora.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Nora <br /> CHELABI</h5>  
                    <p>{t("Equipe.28")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.29")}</p>
                  </div>
                </div>

                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/shana.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Shana <br /> CUBRILOVIC</h5>  
                    <p>{t("Equipe.30")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.31")}</p>
                  </div>
                </div>

                <div className="col colequipe">
                  <div className="imgPresentationContainer">
                    <img src={'/fried.jpg'} alt="" />
                  </div>
                  <div>
                    <h5>Friederike <br /> KRIEGER</h5>  
                    <p>{t("Equipe.32")}</p>
                  </div>
                  <hr />

                  <div>
                    <p>{t("Equipe.33")}</p>
                  </div>
                </div>

              </div>



            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
};

export default Equipe;
