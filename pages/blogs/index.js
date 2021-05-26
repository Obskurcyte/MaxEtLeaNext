import React from 'react';
import Header from "../../components/Header";
import Link from 'next/link';
import {Card, Row, Col, Container} from "react-bootstrap";
import Footer from "../../components/Footer";
import i18next from "i18next";
import {useTranslation} from "react-i18next";

const BlogScreen = props => {

  const lang = i18next.language;

  const { t, i18n } = useTranslation();

    return (
      <div>
        <Header />
        <div className="blogs-container">
          <Container className="big-container">
          <div className="principal-blog-container">
            <div className="math-description">
              <h2 className="titre-math">{t("Blogs.0")}</h2>
              <p className="paragraph-math">{t("Blogs.1")}</p>
              <Link href='/blogs/LeJeuEnExterieur'>
                <a className="read-more-button" >{t("Blogs.2")}</a>
              </Link>
            </div>
            <div className="math-image-container">
              <img  src={'https://maxandlea.com/wp-content/uploads/2021/04/boys-children-path-5630669.jpg'} alt="" className="blog-big-image"/>
            </div>
          </div>
          </Container>

            <Container>
            <Row className="row-card">
                  <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                    <Card className="card-list-container">
                      <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/06/IMG_4681-scaled.jpg'} variant="top" className="math-image" />
                      <Card.Body className="card-body">
                        <Card.Title className="card-title">{t("Blogs.3")}</Card.Title>
                        <Card.Text className="card-text">
                          {t("Blogs.4")}
                        </Card.Text>
                        <Link href='/blogs/MathematiquesEtJeunesEnfants'>
                          <a className="read-more-button" >{t("Blogs.2")}</a>
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/11/Playboard-Angelique-Kosinski.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.5")}</Card.Title>
                    <Card.Text className="card-text">
                      {t("Blogs.6")}
                    </Card.Text>
                    <Link href='/blogs/PourquoiLesEnfantsJouent'>
                      <a className="read-more-button" >{t("Blogs.2")}</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/327490-P9JVOQ-930-1.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.7")}</Card.Title>
                    <Card.Text className="card-text">
                      {t("Blogs.8")}
                    </Card.Text>
                    <Link href='/blogs/LesEnfantsEtLesEcrans'>
                      <a className="read-more-button" >{t("Blogs.2")}</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

            </Row>

              <Row className="row-card">
                <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                  <Card className="card-list-container">
                    <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/child-fun-family-3046494.jpg'} variant="top" className="math-image" />
                    <Card.Body className="card-body">
                      <Card.Title className="card-title">{t("Blogs.9")}</Card.Title>
                      <Card.Text className="card-text">
                        {t("Blogs.10")}
                      </Card.Text>
                      <Link href='/blogs/ConcilierTravailEtEducation'>
                        <a className="read-more-button" >{t("Blogs.2")}</a>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                  <Card className="card-list-container">
                    <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/father-53e5d44a48_1280.jpg'} variant="top" className="math-image" />
                    <Card.Body className="card-body">
                      <Card.Title className="card-title">{t("Blogs.11")}</Card.Title>
                      <Card.Text className="card-text">
                        {t("Blogs.12")}
                      </Card.Text>
                      <Link href='/blogs/AideMoiAFaireSeul'>
                        <a className="read-more-button" >{t("Blogs.2")}</a>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                  <Card className="card-list-container">
                    <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/family-kids-baby-457235.jpg'} variant="top" className="math-image" />
                    <Card.Body className="card-body">
                      <Card.Title className="card-title">{t("Blogs.13")}</Card.Title>
                      <Card.Text className="card-text">
                        {t("Blogs.14")}
                      </Card.Text>
                      <Link href='/blogs/EducationPositive'>
                        <a className="read-more-button" >{t("Blogs.2")}</a>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>

              </Row>

              <Row className="row-card">
                <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                  <Card className="card-list-container">
                    <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/child-wooden-blocks-2293839.jpg'} variant="top" className="math-image" />
                    <Card.Body className="card-body">
                      <Card.Title className="card-title">{t("Blogs.15")}</Card.Title>
                      <Card.Text className="card-text">
                        {t("Blogs.16")}
                      </Card.Text>
                      <Link href='/blogs/PourquoiChoisirDesJouetsEnBois'>
                        <a className="read-more-button" >{t("Blogs.2")}</a>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
        </div>
        <Footer/>
      </div>
    )
}


export default BlogScreen;
