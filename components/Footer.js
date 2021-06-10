import React, {useState} from 'react';
import './Footer.module.css';
import {useTranslation} from "react-i18next";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons";
import {faInstagramSquare} from "@fortawesome/free-brands-svg-icons";
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
    <footer>
      <div className="footer-container">
        <div className="footer-subcontainer">
          <div className="footer-img">
            <img src="https://maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-1024x378.png" alt="" className="img-footer"/>
            <div className="icons-social">
              <a href="https://www.facebook.com/MaxandleaToys/" target="_blank"><FontAwesomeIcon icon={faFacebookSquare} className="iconFacebook"/></a>
              <a href="https://www.instagram.com/max.and.lea/" target="_blank"><FontAwesomeIcon icon={faInstagramSquare} className="iconInstagram" href=""/></a>
              <a href="https://www.youtube.com/channel/UCHaUOBoknhDUyNExyux9yvg/featured" target="_blank"><FontAwesomeIcon icon={faYoutubeSquare} className="iconYoutube"/></a>
            </div>
          </div>
          <div className='flex-footer'>
          <Container>
            <Row>
              <Col>
                <Link href="/about">{t("Footer.1")}</Link>
              </Col>
              <Col>
                <Link href="/mentionsLegales">{t("Footer.5")}</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link href="/equipe">{t("Footer.2")}</Link>
              </Col>
              <Col>
                <Link href="/CGV">{t("Footer.6")}</Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link href="/blogs">{t("Footer.3")}</Link>
              </Col>
              <Col>
                <Link href="/contact">{t("Footer.4")}</Link>
              </Col>
            </Row>
          </Container>
          <div className="footer-column3 footer-terre" >
            <div style={{display: "flex", marginBottom: '10%', flexDirection: 'column', justifyContent: "space-around"}} onClick={() => setOpen(true)}>
              <div className="img-container-arbre">
              <img src={'/arbres.png'} alt="" style={{marginBottom: '5%'}} className="photo-arbre"/>
              </div>
              <div className="photo-container" >
                <img src={'/arbresreplantes.png'} alt="" className="arbre-replantes"/>
                <img src={'/logo_reforest.png'} alt="" className="arbre-replantes"/>
              </div>

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
                      <a href="https://www.reforestaction.com/en/max-lea" className="seePage"><p>Voir notre page</p></a>
                    </div>
                    <button className="arbresButtonClose" onClick={() => setOpen(false)}>x</button>
                  </div>
                </DialogContent>
              </Dialog>

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
