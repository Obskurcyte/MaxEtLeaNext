import React from 'react';
import Header from "../components/Header";
import {useTranslation} from "react-i18next";
import Footer from "../components/Footer";
import Head from "next/head";
import Link from "next/link";

const About = () => {

  const { t, i18n } = useTranslation();

  return (
    <div>
      <Head>
        <title>Max And Lea - A propos</title>
      </Head>
      <Header />
      <div className="bienvenue">
        <h1 className="bienvenue-title">{t("Propos.1")}</h1>
      </div>
      <main>
      <div className="container1000">
        <p className="Apropos-title">{t("Propos.2")}<span>{t("Propos.3")}</span></p>
        <div className="container-about">
          <img src={'/internet10.webp'} alt="" className="grande-photo"/>
          <div className="paragraphs">
            <div className="paragraph1">
              <p>
                <img src={'/internet4.svg'} alt="" className="petite-photo1"/>
                Max & Lea
                <span>{t("Propos.4")}</span>{t("Propos.5")}</p>
            </div>
            <div className="paragraph2">
              <p>              <img src={'/internet11.svg'} alt="" className="petite-photo2"/>
                 {t("Propos.6")}</p>
            </div>
            <div className="paragraph3">
              <p>              <img src={'/internet7.webp'} alt="" className="petite-photo3"/>
                {t("Propos.7")}<span>{t("Propos.8")}</span>{t("Propos.9")}</p>
            </div>
          </div>
        </div>
        <div className="container-about container-photo">
          <div className="paragraphs2">
            <div className="paragraph4">
              <p>              <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_4.svg" alt="" className="petite-photo4"/>
                {t("Propos.10")}<span>{t("Propos.11")}</span>{t("Propos.12")}</p>
            </div>
            <div className="paragraph5">
              <p>              <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" className="petite-photo5"/>
                {t("Propos.13")}<span>{t("Propos.14")}</span>{t("Propos.15")}<span>{t("Propos.16")}</span></p>
            </div>
          </div>
          <div>
            <img src={'/internet11.webp'} alt="" className="moyenne-photo"/>
          </div>
        </div>
        <div className="card-citation container-about">
          <div style={{display: 'flex', marginBottom: '5%'}}>
            <i className="fas fa-quote-left"/>
            <p>{t("Propos.17")}</p>
          </div>
          <p className="signature">{t("Propos.18")}<br/>
            {t("Propos.19")}</p>
        </div>
        <div className="container-about">
          <Link className="container" href="/equipe"><p className="equipe-button">{t("Propos.20")}</p></Link>
        </div>
        <div className="container-about">
          <img src={'/internet12.webp'} alt="" className="mega-photo"/>
        </div>
        </div>
      </main>
      <Footer />
    </div>


  )
};

export default About;
