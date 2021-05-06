import React from 'react';
import './Footer.module.css';
import {useTranslation} from "react-i18next";
import Link from 'next/link'
const Footer = () => {

  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
    <footer>
      <div className="footer-container">
        <div className="footer-img">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-1024x378.png" alt="" className="img-footer"/>
          <div className="icons-social">
            <i className="fab faFacebook"/>
            <i className="fab faInstagram"/>
            <i className="fab faYoutube"/>
          </div>
        </div>
          <div className="footer-column">
            <Link href="#">A propos </Link>
            <Link href="#">L'équipe</Link>
            <Link href="/contact">Contactez-nous</Link>
          </div>
        <div className="footer-column">
          <Link href="/blogs">Blog</Link>
          <Link href="#">Mentions légales</Link>
          <Link href="#">CGV</Link>
        </div>
        <div className="footer-column footer-terre" >
          <div style={{display: "flex", marginBottom: '10%', flexDirection: 'column'}}>
            <div>
             <img src={'/arbres.png'} alt="" style={{marginBottom: '5%'}}/>
            </div>
            <div>
              <img src={'/arbresreplantes.png'} alt=""/>
              <img src={'/logo_reforest.png'} alt=""/>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </React.Fragment>
  )
}

export default Footer;
