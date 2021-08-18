import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const MentionsLegales = () => {

  const { t, i18n } = useTranslation();

  return (
    <div>
      <Head>
        <title>Max And Lea - {t("Mentions.title")}</title>
      </Head>
      <Header />
      <div className="page-supercontainer">
        <div className="mentionsContainer">
          <h1 className="mentionsTitle">{t("Mentions.title")} - Max & Léa</h1>
        </div>

        <div className="containerMentions container1000">
          <p>{t("Mentions.1")} <a href="/" id="sitelink">www.maxandlea.com</a> {t("Mentions.2")}</p>

          <h5>SAS MAX AND LEA, <br /></h5>
          <p>{t("Mentions.3")}<br />

            {t("Mentions.4")} <br />

            {t("Mentions.5")} <br />

            {t("Mentions.6")} <br />

            {t("Mentions.7")} <a href="mailto:contact@maxandlea.com" id="sitelink">contact@maxandlea.com</a><br />

            {t("Mentions.8")}<br />

            {t("Mentions.9")} <br />

            {t("Mentions.10")}</p>

          <h5>{t("Mentions.11")}</h5>
          <p>{t("Mentions.12")}, <a href="vercel.com" id="sitelink">www.vercel.com</a> <br />

            {t("Mentions.13")} <br />

            {t("Mentions.14")} <br />
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MentionsLegales;
