import React from 'react';
import './GarantiesMaxEtLea.module.css';
import {useTranslation} from "react-i18next";



const Garanties = () => {
  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
    <div className="garanties-supercontainer">
      <h1 style={{textAlign: 'center'}} className="garanties-title">{t("Garanties1")}</h1>
      <div className="satisfactions">
        <div className="satisfaction-mini-container">
          <div className="inner-satisfaction">
            <div>
              <img src={'../public/Payment.png'} alt="paiement" className="image-garanties" style={{marginTop: '10%'}}/>
            </div>
            <h3 className="garanties-undertitle">{t("Garanties2")}</h3>
            <p className="garanties-paragraph">{t("Garanties3")}</p>
          </div>
          <div className="inner-satisfaction">
            <div>
             <img src={'../public/like.png'} alt="like" className="image-garanties"/>
            </div>
            <h3 className="garanties-undertitle">{t("Garanties4")}</h3>
            <p className="garanties-paragraph">{t("Garanties5")}</p>
          </div>
        </div>
        <div className="satisfaction-mini-container">
        <div className="inner-satisfaction">
          <div>
            <img src={'../public/headphones.png'} alt="headphones" className="image-garanties"/>
          </div>
          <h3 className="garanties-undertitle">{t("Garanties6")}</h3>
          <p className="garanties-paragraph">{t("Garanties7")}</p>
        </div>
        <div className="inner-satisfaction">
          <div>
            <img src={'../public/delivering.png'} alt="livraison" className="image-garanties"/>
          </div>
          <h3 className="garanties-undertitle">{t("Garanties8")}</h3>
          <p className="garanties-paragraph">{t("Garanties9")}</p>
        </div>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
};

export default Garanties
