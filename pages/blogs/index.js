import React from 'react';
import Header from "../../components/Header";
import Link from 'next/link';
import { Card, Row, Col, Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Head from "next/head";

const BlogScreen = props => {

  const lang = i18next.language;

  const { t, i18n } = useTranslation();

  return (
    <div className="blogs-supercontainer">
      <Head>
        <title>Max And Lea - Blog</title>
      </Head>
      <Header />
      <div className="container1200">
        <div className="blogs-container">
          <Container className="big-container">
            <Link href='/blogs/MusiqueEtJeunesEnfants'><a>
              <div className="principal-blog-container card-blog-list-container">
                <div className="math-description">
                  <h2 className="titre-math">{t("Blogs.17")}</h2>
                  <p className="paragraph-math">{t("Blogs.18")}</p>
                  <Link href='/blogs/MusiqueEtJeunesEnfants'>
                    <a className="read-more-button" >{t("Blogs.2")}</a>
                  </Link>
                </div>
                <div className="math-image-container">
                  <Link href='/blogs/MusiqueEtJeunesEnfants'>
                    <a>
                      <img src={'/baby-guitar-rock.jpg'} alt="" className="blog-big-image" />
                    </a>
                  </Link>
                </div>
              </div>
            </a></Link>
          </Container>

          <Container className='grandContainer'>
            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Link href='/blogs/LeJeuEnExterieur'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/boys-children.webp'} variant="top" className="math-image" />
                    <Card.Body className="card-body">
                      <Card.Title className="card-title">{t("Blogs.0")}</Card.Title>
                      <Card.Text className="card-text">
                        {t("Blogs.1")}
                      </Card.Text>
                      <Link href='/blogs/LeJeuEnExterieur'>
                        <a className="read-more-button" >{t("Blogs.2")}</a>
                      </Link>
                    </Card.Body>
                  </Card>
                </a></Link>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Link href='/blogs/MathematiquesEtJeunesEnfants'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/toy.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Link href='/blogs/PourquoiLesEnfantsJouent'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/Playboard-Angelique-Kosinski.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>



            </Row>

            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Link href='/blogs/LesEnfantsEtLesEcrans'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/girl-ipad.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Link href='/blogs/ConcilierTravailEtEducation'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/child-fun-family.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Link href='/blogs/AideMoiAFaireSeul'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/father.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>



            </Row>

            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Link href='/blogs/EducationPositive'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/family-kids-baby.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Link href='/blogs/PourquoiChoisirDesJouetsEnBois'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/child-wooden-blocks.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>
            </Row>
          </Container>



          <Container className='petitContainer'>
            <Row className="row-card">
              <Col lg={true} className="col-card">
                <Link href='/blogs/MusiqueEtJeunesEnfants'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/baby-guitar-rock.jpg'} variant="top" className="math-image" />
                    <Card.Body className="card-body">
                      <Card.Title className="card-title">{t("Blogs.17")}</Card.Title>
                      <Card.Text className="card-text">
                        {t("Blogs.18")}
                      </Card.Text>
                      <Link href='/blogs/MusiqueEtJeunesEnfants'>
                        <a className="read-more-button" >{t("Blogs.2")}</a>
                      </Link>
                    </Card.Body>
                  </Card>
                </a></Link>
              </Col>
              <Col lg={true} className="col-card">
                <Link href='/blogs/LeJeuEnExterieur'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/boys-children.webp'} variant="top" className="math-image" />
                    <Card.Body className="card-body">
                      <Card.Title className="card-title">{t("Blogs.0")}</Card.Title>
                      <Card.Text className="card-text">
                        {t("Blogs.1")}
                      </Card.Text>
                      <Link href='/blogs/LeJeuEnExterieur'>
                        <a className="read-more-button" >{t("Blogs.2")}</a>
                      </Link>
                    </Card.Body>
                  </Card>
                </a></Link>
              </Col>

            </Row>
            <Row>
              <Col lg={true} className="col-card">
                <Link href='/blogs/MathematiquesEtJeunesEnfants'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/toy.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>
              <Col lg={true} className="col-card">
                <Link href='/blogs/PourquoiLesEnfantsJouent'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/Playboard-Angelique-Kosinski.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>

            </Row>

            <Row className="row-card">
              <Col lg={true} className="col-card">
                <Link href='/blogs/LesEnfantsEtLesEcrans'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/girl-ipad.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>
              <Col lg={true} className="col-card">
                <Link href='/blogs/ConcilierTravailEtEducation'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/child-fun-family.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>

            </Row>
            <Row>
              <Col lg={true} className="col-card">
                <Link href='/blogs/AideMoiAFaireSeul'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/father.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>
              <Col lg={true} className="col-card">
                <Link href='/blogs/EducationPositive'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/family-kids-baby.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>
            </Row>
            <Row>
              <Col lg={true} className="col-card">
                <Link href='/blogs/PourquoiChoisirDesJouetsEnBois'><a>
                  <Card className="card-list-container card-blog-list-container">
                    <Card.Img src={'/child-wooden-blocks.webp'} variant="top" className="math-image" />
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
                </a></Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  )
}


export default BlogScreen;
