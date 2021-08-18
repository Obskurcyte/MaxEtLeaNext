import React, {useContext} from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Garanties from "../components/GarantiesMaxEtLea";
import Engagement from "../components/Engagement";
import {Card} from 'react-bootstrap'
import {useTranslation} from "react-i18next";
import {AppContext} from "../components/context/AppContext";
import Link from "next/link";
import Head from 'next/head'

const HomeScreen = () => {

  const [ cart, setCart ] = useContext( AppContext );

  const { t, i18n } = useTranslation();


  return (
    <div>
      <Head>
        <title>Max And Lea - Accueil</title>
      </Head>
      <Header/>
      <div className="baby-container container1000">
        <div className="head-title-container">
          <h1 className="head-title">{t("HomeScreen1")}<br/> {t("HomeScreen7")}</h1>
        </div>
        <div>
          <p className="description-title">{t("HomeScreen2")}</p>
        </div>

        <div className="grid-container">

          <div className="row-card-home">


            <Card className="card-jouet card-playboard">
              <Link href="/playboard">
                <a>
                <img src={'/playboard-top.webp'} alt="" className="img-card"/>
                </a>
              </Link>
            </Card>



            <Card className="card-jouet card-tour">
              <Link href="/tour">
              <a>
                <img src={'/tour-top.webp'} alt="" className="img-card"/>
                </a>
              </Link>

            </Card>
          </div>

          <div className="row-card-home">

            <Card className="card-jouet card-xylo">
              <Link href="/xylophone">
              <a>
                <img src={'/xylo-top.webp'} alt="" className="img-card"/>
                </a>
              </Link>
            </Card>

          </div>

        </div>

      </div>

      <div className="baby-container container1000">
        <div className="head-title-container">
          <h1 className="head-title">Nos Histoires</h1>
        </div>
        <div>
          <p className="description-title">Retrouvez tous nos livres</p>
        </div>

        <div className="grid-container">

          <div className="row-card-home">
            <Card className="card-jouet card-kako">
              <Link href="/kako">
                <a>
                <img src={'/kako.png'} alt="" className="img-card"/>
                </a>
              </Link>
            </Card>
          </div>

        </div>

      </div>

      <div className="container1000">
        <Garanties/>
      </div>

      <div className="container1000">
        <Engagement/>
      </div>

      <Footer/>
    </div>
  )

};

export default HomeScreen
