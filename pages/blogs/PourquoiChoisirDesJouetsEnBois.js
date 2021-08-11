import React, {useContext} from 'react';
import Header from "../../components/Header";
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Card, Col, Container, Row} from "react-bootstrap";
import Link from "next/link";
import Footer from "../../components/Footer";
import {AppContext} from "../../components/context/AppContext";
import * as product from "../../products";
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import Head from "next/head";

const PourquoiChoisirDesJouetsEnBois = () => {

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
        <title>Max And Lea - Blog-Pourquoi choisir des jouets en bois</title>
      </Head>
      <Header />
      <div className="img-blog-container">
        <img src={'/child-wooden-blocks-bg.webp'} className="img-blog" alt={'jeu extérieur'}/>
      </div>

      <div className="date-container">
        <FontAwesomeIcon icon={faCalendar} className="calendar"/>
        <p className="date-text">{t("PourquoiChoisirDesJouetsEnBois.0")}</p>
      </div>

      <h1 style={{textAlign: 'center'}}>{t("PourquoiChoisirDesJouetsEnBois.1")}</h1>
      <hr/>
      <div className="introduction">
        <p>{t("PourquoiChoisirDesJouetsEnBois.2")}</p>
      </div>
      <hr/>

      <div className="paragraph-blog3">
        <div className="paragraph1-text">
          <p>
            <ul>
              <li>{t("PourquoiChoisirDesJouetsEnBois.3")}<span style={{fontWeight: 'bold'}}>{t("PourquoiChoisirDesJouetsEnBois.4")}</span>{t("PourquoiChoisirDesJouetsEnBois.5")}<a
                href="https://www.pefc-france.org/" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>PEFC</a>{t("PourquoiChoisirDesJouetsEnBois.6")}<a href="https://fr.fsc.org/fr-fr" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>FSC</a>{t("PourquoiChoisirDesJouetsEnBois.7")}</li>
              <li>{t("PourquoiChoisirDesJouetsEnBois.8")}<span style={{fontWeight: 'bold'}}>{t("PourquoiChoisirDesJouetsEnBois.9")}</span>{t("PourquoiChoisirDesJouetsEnBois.10")}</li>
              <li>{t("PourquoiChoisirDesJouetsEnBois.11")}<span style={{fontWeight: 'bold'}}>{t("PourquoiChoisirDesJouetsEnBois.12")}</span>{t("PourquoiChoisirDesJouetsEnBois.13")}<span style={{fontWeight: 'bold'}}>{t("PourquoiChoisirDesJouetsEnBois.14")}</span>{t("PourquoiChoisirDesJouetsEnBois.15")}</li>
              <li>{t("PourquoiChoisirDesJouetsEnBois.16")}<span style={{fontWeight: 'bold'}}>{t("PourquoiChoisirDesJouetsEnBois.17")}</span>{t("PourquoiChoisirDesJouetsEnBois.18")}</li>
            </ul>
          </p>

        </div>


          <img src={'/wood-toys.webp'} alt="" className="jouets-bois-img"/>

      </div>

      <div className="description-blog">
        <p>{t("PourquoiChoisirDesJouetsEnBois.19")}
          <br/>
          {t("PourquoiChoisirDesJouetsEnBois.20")}
          <br/>
          {t("PourquoiChoisirDesJouetsEnBois.21")}
          <br/>
          {t("PourquoiChoisirDesJouetsEnBois.22")}</p>
      </div>

      <hr/>

      <div className="conseilMaxEtLea">
        <h4>{t("PourquoiChoisirDesJouetsEnBois.23")}</h4>

        <div className="conseilTitre">
          <img src="/triangle.svg" alt="" className='titre-img'/>
          <h5>{t("PourquoiChoisirDesJouetsEnBois.24")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("PourquoiChoisirDesJouetsEnBois.25")}</p>
        </div>

        <div className="conseilTitre">
          <img src="/carre.svg" alt="" className='titre-img'/>
          <h5>{t("PourquoiChoisirDesJouetsEnBois.26")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("PourquoiChoisirDesJouetsEnBois.27")}</p>
        </div>

        <div className="conseilTitre">
          <img src="/etoile.svg" alt="" className='titre-img'/>
          <h5>{t("PourquoiChoisirDesJouetsEnBois.28")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("PourquoiChoisirDesJouetsEnBois.29")}</p>
        </div>

        <div className="conseilTitre">
          <img src="/cercle.svg" alt="" className='titre-img'/>
          <h5>{t("PourquoiChoisirDesJouetsEnBois.30")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("PourquoiChoisirDesJouetsEnBois.31")}</p>
        </div>
      </div>

      <div className="img-blog2-container">
        <img src={'/toddler-building-block-pull.webp'} alt="" className="img-blog2"/>
      </div>

      {lang === 'fr' && (
        <div className="aimez-aussi">
          <h2>Vous pouriez aimer aussi</h2>
          <Container>
            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'/father.webp'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Aide moi à faire seul</Card.Title>
                    <Link href='/blogs/AideMoiAFaireSeul'>
                      <a className="read-more-button" >Lire plus</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'/playboardGood.webp'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title card-no-margin">La PlayBoard<br/>
                      <div className='playboard-card'>
                        <p className='prix-playboard-card-cross'>49,90€</p>
                        <p className='prix-playboard-card-true'>29,90€</p>
                      </div>
                    </Card.Title>
                    <Link href="javascript:void(0);">
                      <a className="read-more-button" onClick={handleAddToCart}>Ajouter au panier</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'/boys-children.webp'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Le jeu en extérieur</Card.Title>
                    <Link href='/blogs/LeJeuEnExterieur'>
                      <a className="read-more-button" >Lire plus</a>
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

export default PourquoiChoisirDesJouetsEnBois;
