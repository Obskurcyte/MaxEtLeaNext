import React from 'react';
import './Footer.module.css';
import {useTranslation} from "react-i18next";
import {faFacebook} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Footer = () => {

  const { t, i18n } = useTranslation();
  return (
    <React.Fragment>
    <footer>
      <div className="footer-container">
        <div className="footer-img">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-1024x378.png" alt="" className="img-footer"/>
          <div className="icons-social">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faInstagram} />
            <FontAwesomeIcon icon={faYoutube} />
          </div>
        </div>
          <div className="footer-column">
            <Link href="#">A propos </Link>
            <Link href="#">L'équipe</Link>
            <Link href="/blogs">Blog</Link>
            <Link href="/contact">Contactez-nous</Link>
          </div>
        <div className="footer-column2">

          <Link href="#">Mentions légales</Link>
          <Link href="#">CGV</Link>
        </div>
        <div className="footer-column3 footer-terre" >
          <div style={{display: "flex", marginBottom: '10%', flexDirection: 'column', justifyContent: "space-around"}}>
            <div className="img-container-arbre">
             <img src={'/arbres.png'} alt="" style={{marginBottom: '5%'}} className="photo-arbre"/>
            </div>
            <div className="photo-container">
              <img src={'/arbresreplantes.png'} alt="" className="arbre-replantes"/>
              <img src={'/logo_reforest.png'} alt="" className="arbre-replantes"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </React.Fragment>
  )
}

export default Footer;
