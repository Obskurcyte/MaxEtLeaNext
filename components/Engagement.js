import React from 'react';
import './GarantiesMaxEtLea.module.css'
import "./Engagement.module.css";
import {useTranslation} from "react-i18next";

const Engagement = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
    <div className="engagement-container">
      <h1 style={{textAlign: 'center'}} className="garanties-title">Max et Léa s'engage à</h1>
      <div className="container-photo1">
        <img src={'../public/100.png'} alt="" className="photo1"/>
      </div>
      <div className="satisfactions">
        <div className="satisfaction-mini-container">
        <div className="inner-satisfaction">
          <div>
            <img src={'../public/childcare.png'} alt="" className="image-garanties"/>
          </div>
          <h3 className="garanties-undertitle">{t("Engagement.2")}</h3>
          <p className="garanties-paragraph">{t("Engagement.3")}</p>
        </div>
        <div className="inner-satisfaction">
          <div>
            <img src={'../public/eco-label.png'} alt="" className="image-garanties"/>
          </div>
          <h3 className="garanties-undertitle">{t("Engagement.4")}</h3>
          <p className="garanties-paragraph">{t("Engagement.5")}</p>
        </div>
        </div>
        <div className="satisfaction-mini-container">
        <div className="inner-satisfaction">
          <div>
            <img src={'../public/stars.png'} alt="" className="image-garanties"/>
          </div>
          <h3 className="garanties-undertitle">{t("Engagement.6")}</h3>
          <p className="garanties-paragraph">{t("Engagement.7")}</p>
        </div>
        <div className="inner-satisfaction">
          <div>
            <img src={'../public/ellipse2.png'} alt="" className="image-garanties"/>
          </div>
          <h3 className="garanties-undertitle">{t("Engagement.8")}</h3>
          <p className="garanties-paragraph">{t("Engagement.9")}</p>
        </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
};

export default Engagement;
