import React, {useState} from 'react';
import './Footer.module.css';
import {useTranslation} from "react-i18next";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faYoutubeSquare} from "@fortawesome/free-brands-svg-icons";
import Link from 'next/link';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from "@material-ui/core/styles";
import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleClose = () => {
    setOpen(false);
  };

  console.log(open)

  const { t, i18n } = useTranslation();

  return (
    <React.Fragment>
    <footer className="footer-container">
      <div className="container">
        <div className="footer-subcontainer">
        <div class="container">
        <div class="row">
          <div className="col-8 col-md-3 order-5 order-md-1 flex-column d-flex">
          <Link href="/"><a href="/"><img src={'/logogrand.webp'} alt="" className="img-footer"/></a></Link>
            <span className="copyright">Copyright © 2021 | Max And Lea</span>
            <div className="icons-social">
              <a href="https://www.facebook.com/MaxandleaToys/" target="_blank"><FontAwesomeIcon icon={faFacebookSquare} className="iconFacebook"/></a>
              <a href="https://www.instagram.com/max.and.lea/" target="_blank" style={{marginTop: '2px'}}><FontAwesomeIcon icon={faInstagram} className="iconInstagram" href=""/></a>
              <a href="https://www.youtube.com/channel/UCHaUOBoknhDUyNExyux9yvg/featured" target="_blank"><FontAwesomeIcon icon={faYoutubeSquare} className="iconYoutube"/></a>
            </div>
          </div>
          <div className="col-6 col-md-3 order-2 order-md-2 my-auto flex-column d-flex phone-none">
            <Link href="/about">{t("Footer.1")}</Link>
            <Link href="/equipe">{t("Footer.2")}</Link>
            <Link href="/blogs">{t("Footer.3")}</Link>
          </div>
          <div className="col-6 col-md-3 order-3 order-md-3 my-auto flex-column d-flex phone-none">
            <Link href="/contact">{t("Footer.4")}</Link>
            <Link href="/mentionsLegales">{t("Footer.5")}</Link>
            <Link href="/CGV">{t("Footer.6")}</Link>
          </div>
          <div className="col-6 col-md-3 order-1 order-md-3 my-auto flex-column d-flex phone-50 phone-only">
            <Link href="/about">{t("Footer.1")}</Link>
            <Link href="/equipe">{t("Footer.2")}</Link>
            <Link href="/blogs">{t("Footer.3")}</Link>
            <Link href="/contact">{t("Footer.4")}</Link>
            <Link href="/mentionsLegales">{t("Footer.5")}</Link>
            <Link href="/CGV">{t("Footer.6")}</Link>
          </div>
          <div className="col-8 col-md-3 order-4 order-md-4 my-auto flex-column d-flex phone-50" >
            <div style={{display: "flex", marginBottom: '10%', flexDirection: 'column', justifyContent: "space-around"}} >
              <img src={'/forest.webp'} alt="" className="img-footer" onClick={() => setOpen(true)}/>

              <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogContent>
                  <div className="arbresDialogContainer">
                    <h5>257 arbres</h5>
                    <p>Plantés par Max & Léa dans la forêt de Monchique (Portugal)</p>
                    <hr />
                      <p>Bénéfices pour l'environnement :</p>
                    <div className="beneficesContainer">
                      <div className="arbresRow">
                            <div>
                            <img src="https://maxandlea.com/wp-content/uploads/elementor/thumbs/carte-benefices-nuage-1-ox6w2acn9kffruv4ypghfx20j15d0wwotvc9kp1fuc.png" alt=""/>
                            </div>
                        <div>
                          <h5>CLIMAT</h5>
                          <p><span style={{color: '#91BB1F'}}>38</span> tonnes de CO2 stockées</p>
                        </div>
                      </div>

                      <div className="arbresRow">
                        <div>
                          <img src="https://maxandlea.com/wp-content/uploads/elementor/thumbs/carte-benefices-bird-1-ox6w2d65u2jaqor1i8od5eceb6rgo07vu9aq0ix9c8.png" alt=""/>
                        </div>
                        <div>
                          <h5>BIODIVERSITE</h5>
                          <p><span style={{color: '#91BB1F'}}>771</span> abris pour animaux crées</p>
                        </div>
                      </div>

                      <div className="arbresRow">
                        <div>
                          <img src="https://maxandlea.com/wp-content/uploads/elementor/thumbs/carte-benefices-coeur-1-ox6w2f1u7qlvdwob79hmadvbhyi73efciiloz2uh1q.png" alt=""/>
                        </div>
                        <div>
                          <h5>SANTE</h5>
                          <p><span style={{color: '#91BB1F'}}>1028</span> mois d'oxygène générés</p>
                        </div>
                      </div>

                      <div className="arbresRow">
                        <div>
                          <img src="https://maxandlea.com/wp-content/uploads/elementor/thumbs/carte-benefices-hand-1-ox6w2fzoekn5pimy1rw8uvms3cdkb3j2un96gct2ta.jpg" alt=""/>
                        </div>
                        <div>
                          <h5>EMPLOI</h5>
                          <p><span style={{color: '#91BB1F'}}>257</span> theures de travail créées</p>
                        </div>
                      </div>

                      <p style={{textAlign: 'center', fontSize: '12px'}}>C'est grâce à vous !</p>
                      <a href="https://www.reforestaction.com/en/max-lea" target="_blank" className="seePage"><p>Voir notre page</p></a>
                    </div>
                    <button className="arbresButtonClose" onClick={() => handleClose()}>x</button>
                  </div>
                </DialogContent>
              </Dialog>

            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </footer>
    </React.Fragment>
  )
}

export default Footer;
