import React, {useContext} from 'react';
import Header from "../../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {Card, Col, Container, Row} from "react-bootstrap";
import Link from "next/link";
import Footer from "../../components/Footer";
import {AppContext} from "../../components/context/AppContext";
import * as product from "../../products";
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import Head from "next/head";
import { useRouter } from "next/router";

const ConcilierTravailEtEducation = () => {

  const router = useRouter();

  const [cart, setCart] = useContext(AppContext);
  const products = product.products

  const lang = i18next.language;

  const { t, i18n } = useTranslation();

  const getFloatVal = (string) => {
    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)): '';
  };

  const addFirstProduct = (product) => {
    let productPrice = getFloatVal(product.price)

    let newCart = {
      products: [],
      totalProductCount: 1,
      totalProductsPrice: productPrice
    }

    const newProduct = createNewProduct(product, productPrice, 1)
    newCart.products.push(newProduct);
    localStorage.setItem('woo-next-cart', JSON.stringify(newCart));
    console.log('newCart', newCart)
    return newCart

  };

  const createNewProduct = (product, productPrice, qty) => {
    return {
      productId: product.id,
      name: product.name,
      price: productPrice,
      qty: qty,
      totalPrice: parseFloat((productPrice * qty).toFixed(2))
    }
  };


  const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProducts(existingCart.products, products[2], qtyToBeAdded, newQty);
    const addPrice = (total, item) => {

      total.totalPrice = item.totalPrice;
      total.qty += item.qty;
      console.log('total', total)
      console.log('item', item)
      console.log(total)
      return total;
    }

    // Loop through the updated product array and add the totalPrice of each item to get the totalPrice
    let total = updatedProducts.reduce(addPrice, {totalPrice: 0, qty: 0})

    const updatedCart = {
      products: updatedProducts,
      totalProductCount: parseInt(total.qty),
      totalProductsPrice: parseFloat(total.totalPrice)
    }

    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart))
    return updatedCart
  };





  /**
   * Get updated products array
   *
   * @param existingProductsInCart
   * @param product
   * @param qtyToBeAdded
   * @param newQty
   * @returns {*}
   */


  const getUpdatedProducts = (existingProductsInCart, product, qtyToBeAdded, newQty=false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, products[2].id);

    if (-1 < productExistsIndex) {
      let updatedProducts = existingProductsInCart;
      let updatedProduct = updatedProducts[productExistsIndex];

      updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded)
      updatedProduct.totalPrice = parseFloat(updatedProduct.price * updatedProduct.qty).toFixed(2);
      return updatedProducts;
    } else {
      let productPrice = parseFloat(product.price);
      const newProduct = createNewProduct(product, productPrice, qtyToBeAdded)
      existingProductsInCart.push(newProduct);
      return existingProductsInCart
    }
  };

  const isProductInCart = (existingProductsInCart, productId) => {
    const returnItemThatExists = (item, index) => {
      if (productId === item.productId) {
        return item;
      }
    };

    const newArray = existingProductsInCart.filter(returnItemThatExists)

    return existingProductsInCart.indexOf(newArray[0]);
  };


  const handleAddToCart = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      console.log('clicked')
      console.log('existingCart', existingCart)
      if (existingCart!=null) {
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCart(existingCart, products[2], qtyToBeAdded);
        setCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[2]);
        setCart(newCart)
      }
    }
  }

  return (
    <div className='jeuContainer'>
      <Head>
        <title>Max And Lea - Blog - {t("ConcilierTravailEtEducation.1")}</title>
      </Head>
      <Header />
      <div className="img-blog-container travail-education-top"></div>
      <div className="container1000">
        <div className="date-container">
          <FontAwesomeIcon icon={faCalendar} className="calendar"/>
          <p className="date-text">{t("ConcilierTravailEtEducation.0")}</p>
        </div>

        <h1 style={{textAlign: 'center'}}>{t("ConcilierTravailEtEducation.1")}</h1>
        <hr/>
        <div className="introduction">
          <p>{t("ConcilierTravailEtEducation.2")}</p>
        </div>
        <hr/>

        <div className="row">
          <div className="col-sm-6">
            <p>{t("ConcilierTravailEtEducation.3")}<a href="https://www.filliozat.net/" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>Isabelle Filliozat</a> , {t("ConcilierTravailEtEducation.4")} <a
              href="https://www.amazon.fr/Maman-veux-pas-travailles-professionnelle/dp/2844545882/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3KBT6HOGVTAQI&dchild=1&keywords=maman+je+ne+veux+pas+que+tu+travailles&qid=1595598334&s=books&sprefix=maman+je+ne+veux+pas+que+tu+travaill%2Cstripbooks%2C147&sr=1-1" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>« Maman je ne veux pas que tu travailles »</a>

              {t("ConcilierTravailEtEducation.6")}
            </p>
          </div>
          <div className="col-sm-6">
            <img src={'/baby-child-field.webp'} alt="" className="enfants-souriant-blog"/>
            </div>
        </div>

        <div className="encadrement">
          <p><span className="grosseLettre">{t("ConcilierTravailEtEducation.7")}</span>{t("ConcilierTravailEtEducation.8")} « <a
            href="https://www.amazon.fr/pas-parent-parfait-Psy-Sant%C3%A9-ebook/dp/B005OJB4UM/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2BFOKHVWS3XQZ&dchild=1&keywords=il+n%27y+a+pas+de+parents+parfaits&qid=1595598392&s=books&sprefix=il+n%27y+a+pas+de+parent%2Cstripbooks%2C146&sr=1-1" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>Il n’y a pas de parent parfait</a> » {t("ConcilierTravailEtEducation.10")}</p>
        </div>



        <div className="img-blog2-container">
          <img src={'/girl-mother-daughter.webp'} alt="" className="img-blog2"/>
        </div>

        <hr/>

        <div className="conseilMaxEtLea">
          <h4>{t("ConcilierTravailEtEducation.11")}</h4>

          <div className="conseilTitre">
            <img src="/triangle.svg" alt="" className='titre-img'/>
            <h5>{t("ConcilierTravailEtEducation.12")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("ConcilierTravailEtEducation.13")}</p>
          </div>

          <div className="conseilTitre">
            <img src="/carre.svg" alt="" className='titre-img'/>
            <h5>{t("ConcilierTravailEtEducation.14")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("ConcilierTravailEtEducation.15")}</p>
          </div>

          <div className="conseilTitre">
            <img src="/etoile.svg" alt="" className='titre-img'/>
            <h5>{t("ConcilierTravailEtEducation.16")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("ConcilierTravailEtEducation.17")}</p>
          </div>

          <div className="conseilTitre">
            <img src="/cercle.svg" alt="" className='titre-img'/>
            <h5>{t("ConcilierTravailEtEducation.18")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("ConcilierTravailEtEducation.19")}</p>
          </div>

          <div className="conseilTitre">
            <img src="/triangle.svg" alt="" className='titre-img'/>
            <h5>{t("ConcilierTravailEtEducation.20")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("ConcilierTravailEtEducation.21")}<a
              href="/blogs/LesEnfantsEtLesEcrans" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>{t("ConcilierTravailEtEducation.22")}</a>{t("ConcilierTravailEtEducation.23")}</p>
          </div>

          <div className="conseilTitre">
            <img src="/carre.svg" alt="" className='titre-img'/>
            <h5>{t("ConcilierTravailEtEducation.24")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("ConcilierTravailEtEducation.25")}</p>
          </div>
        </div>
      </div>

      {lang === 'fr' && (
        <div className="aimez-aussi">
          <h2>{t("Blogs.19")}</h2>
          <Container>
            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'/child-wooden-blocks.webp'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.15")}</Card.Title>
                    <Link href='/blogs/PourquoiChoisirDesJouetsEnBois'>
                      <a className="read-more-button" >{t("Blogs.2")}</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
              <Card className="card-list-container">
                <Link href='/playboard'>
                  <Card.Img src={products[2].image} variant="top" className="math-image" />
                </Link>
                <Card.Body className="card-body">
                  <Card.Title className="card-title card-no-margin">{t("products.playboard")}<br />
                    <div className='playboard-card'>
                      <p className='prix-playboard-card-cross'>{products[2].priceAugmente}</p>
                      <p className='prix-playboard-card-true'>{products[2].price}</p>
                    </div>
                  </Card.Title>
                  <div onClick={() => {
                    handleAddToCart()
                    router.push('/checkout')
                  }}>
                    <a className="read-more-button">{t("products.cart")}</a>
                  </div>
                </Card.Body>
              </Card>
            </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'/Playboard-Angelique-Kosinski.webp'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.5")}</Card.Title>
                    <Link href='/blogs/PourquoiLesEnfantsJouent'>
                      <a className="read-more-button" >{t("Blogs.2")}</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}


      <Footer />


    </div>
  );
};

export default ConcilierTravailEtEducation;
