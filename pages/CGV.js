import React from 'react';
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useTranslation} from "react-i18next";

const Cgv = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Head>
        <title>Max And Lea - {t("CGV.title")}</title>
      </Head>
      <Header />
      <div className="page-supercontainer">
        <div className="mentionsContainer">
          <h1 className="mentionsTitle">{t("CGV.title")}</h1>
        </div>

        <div className="containerMentions container1000">
          <h5>
            <ul>
              <li>{t("CGV.1")}</li>
            </ul>
          </h5>

          <p>{t("CGV.2")}</p>

          <h5>
            <ul>
              <li>{t("CGV.3")}</li>
            </ul>
          </h5>

          <p>{t("CGV.4")}</p>

          <h5>
            <ul>
              <li>{t("CGV.5")}</li>
            </ul>
          </h5>

          <p>{t("CGV.6")}</p>

          <h5>
            <ul>
              <li>{t("CGV.7")}</li>
            </ul>
          </h5>

          <p>{t("CGV.8")}</p>

          <h5>
            <ul>
              <li>{t("CGV.9")}</li>
            </ul>
          </h5>

          <p>
            <span style={{ textDecoration: 'underline' }}>{t("CGV.10")}</span><br></br>
            {t("CGV.11")}<br></br> 
            <span>– {t("CGV.12")}</span><br></br>
            {t("CGV.13")}<br></br>
            <span>– {t("CGV.14")}</span> <br></br>
            {t("CGV.15")}<br></br>
            <span style={{ textDecoration: 'underline' }}>{t("CGV.16")}</span><br></br>
            {t("CGV.17")}<br></br>
            <span style={{ textDecoration: 'underline' }}>{t("CGV.18")}</span><br></br>
            {t("CGV.19")}
          </p>

          <h5>
            <ul>
              <li>{t("CGV.20")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.21")}
          </p>

          <h5>
            <ul>
              <li>{t("CGV.22")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.23")}
            <ul>
              <li>{t("CGV.24")}</li>
              <li>{t("CGV.25")}</li>
            </ul>
            {t("CGV.26")}
          </p>

          <h5>
            <ul>
              <li>{t("CGV.27")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.28")}
          </p>


          <h5>
            <ul>
              <li>{t("CGV.29")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.30")}
          </p>


          <h5>
            <ul>
              <li>{t("CGV.31")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.32")}
          </p>


          <h5>
            <ul>
              <li>{t("CGV.33")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.34")}
            <ul>
              <li>
              {t("CGV.35")}
              </li>
              <li>
              {t("CGV.36")}
              </li>
            </ul>
            {t("CGV.37")}
            <ul>
              <li>
              {t("CGV.38")}
              </li>
              <li>
              {t("CGV.39")}
              </li>
            </ul>
            {t("CGV.40")}

          </p>


          <h5>
            <ul>
              <li>{t("CGV.41")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.42")}
          </p>



          <h5>
            <ul>
              <li>{t("CGV.43")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.44")}
          </p>


          <h5>
            <ul>
              <li>{t("CGV.45")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.46")}
          </p>


          <h5>
            <ul>
              <li>{t("CGV.47")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.48")}
          </p>

          <h5>
            <ul>
              <li>{t("CGV.49")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.50")}
          </p>

          <h5>
            <ul>
              <li>{t("CGV.51")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.52")}
          </p>


          <h5>
            <ul>
              <li>{t("CGV.53")}</li>
            </ul>
          </h5>

          <p>
          {t("CGV.54")}
          </p>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cgv;
