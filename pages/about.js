import React from 'react';
import Header from "../components/Header";
import {useTranslation} from "react-i18next";
import Footer from "../components/Footer";
import Head from "next/head";

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
        <p className="Apropos-title">{t("Propos.2")}<span>{t("Propos.3")}</span></p>
        <div className="container">
          <img src="https://maxandlea.com/wp-content/uploads/2020/06/iStock-478587034-1.jpg" alt="" className="grande-photo"/>
          <div className="paragraphs">
            <div className="paragraph1">
              <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" className="petite-photo1"/>
              <p>Max & Lea <span>{t("Propos.4")}</span>{t("Propos.5")}</p>
            </div>
            <div className="paragraph2">
              <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_3t.svg" alt="" className="petite-photo2"/>
              <p>{t("Propos.6")}</p>
            </div>
            <div className="paragraph3">
              <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_2t.svg" alt="" className="petite-photo3"/>
              <p>{t("Propos.7")}<span>{t("Propos.8")}</span>{t("Propos.9")}</p>
            </div>
          </div>
        </div>
        <div className="container container-photo">
          <div className="paragraphs2">
            <div className="paragraph4">
              <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_4.svg" alt="" className="petite-photo4"/>
              <p>{t("Propos.10")}<span>{t("Propos.11")}</span>{t("Propos.12")}</p>
            </div>
            <div className="paragraph5">
              <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" className="petite-photo5"/>
              <p>{t("Propos.13")}<span>{t("Propos.14")}</span>{t("Propos.15")}<span>{t("Propos.16")}</span></p>
            </div>
          </div>
          <div>
            <img src="https://maxandlea.com/wp-content/uploads/2020/06/iStock-623688768-1.jpg" alt="" className="moyenne-photo"/>
          </div>
        </div>
        <div className="card-citation container">
          <div style={{display: 'flex', marginBottom: '5%'}}>
            <i className="fas fa-quote-left"/>
            <p>{t("Propos.17")}</p>
          </div>
          <p className="signature">{t("Propos.18")}<br/>
            {t("Propos.19")}</p>
        </div>
        <div className="container">
          <button className="equipe-button container">{t("Propos.20")}</button>
        </div>
        <div className="container">
          <img src="https://maxandlea.com/wp-content/uploads/2020/06/iStock-912734770-1.jpg" alt="" className="mega-photo"/>
        </div>
      </main>
      <Footer />
    </div>


  )
};

export default About;
