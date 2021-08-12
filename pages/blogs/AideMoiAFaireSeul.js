import React, {useContext} from 'react';
import Header from "../../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import {Card, Col, Container, Row} from "react-bootstrap";
import Link from "next/link";
import Footer from "../../components/Footer";
import {AppContext} from "../../components/context/AppContext";
import * as product from "../../products";
import {useTranslation} from "react-i18next";
import i18next from "i18next";
import Head from "next/head";

const AideMoiAFaireSeul = () => {

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
        <title>Max And Lea - Blog - Aide-moi à faire seul</title>
      </Head>
      <Header />
      <div className="img-blog-container aide-moi-top">
      </div>

      <div className="container1000">
        <div className="date-container">
          <FontAwesomeIcon icon={faCalendar} className="calendar"/>
          <p className="date-text">{t("AideMoiAFaireSeul.0")}</p>
        </div>

        <h1 style={{textAlign: 'center'}}>{t("AideMoiAFaireSeul.1")}</h1>
        <hr/>
        <div className="introduction">
          <p>{t("AideMoiAFaireSeul.4")}</p>
        </div>
        <hr/>

        <div className="row">
          <div className="col-sm-6">
            <p>{t("AideMoiAFaireSeul.2")}<a href="https://fr.wikipedia.org/wiki/Maria_Montessori" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>Maria Montessori</a>{t("AideMoiAFaireSeul.3")}</p>
          </div>
          <div className="col-sm-6">
            <img src={'/family-baby-crawling.webp'} alt="" className="enfants-souriant-blog"/>
          </div>
        </div>

        <div className="encadrement">
          <p><span className="grosseLettre">{t("AideMoiAFaireSeul.5")}</span>{t("AideMoiAFaireSeul.6")}</p>

        </div>

        <div className="description-blog">
          <p>{t("AideMoiAFaireSeul.7")}</p>
        </div>

        <hr/>

        <div className="conseilMaxEtLea">
          <h4>{t("AideMoiAFaireSeul.8")}</h4>

          <div className="conseilTitre">
            <img src="/triangle.svg" alt="" className='titre-img'/>
            <h5>{t("AideMoiAFaireSeul.9")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("AideMoiAFaireSeul.10")}</p>
          </div>

          <div className="conseilTitre">
            <img src="/carre.svg" alt="" className='titre-img'/>
            <h5>{t("AideMoiAFaireSeul.11")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("AideMoiAFaireSeul.12")}</p>
          </div>

          <div className="conseilTitre">
            <img src="/etoile.svg" alt="" className='titre-img'/>
            <h5>{t("AideMoiAFaireSeul.13")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("AideMoiAFaireSeul.14")}</p>
          </div>

          <div className="conseilTitre">
            <img src="/cercle.svg" alt="" className='titre-img'/>
            <h5>{t("AideMoiAFaireSeul.15")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("AideMoiAFaireSeul.16")}</p>
          </div>

          <div className="conseilTitre">
            <img src="/triangle.svg" alt="" className='titre-img'/>
            <h5>{t("AideMoiAFaireSeul.17")}</h5>
          </div>
          <div className="conseildescription">
            <p>{t("AideMoiAFaireSeul.18")}</p>
          </div>
        </div>

        <div className="img-blog2-container">
          <img src={'/jenga.webp'} alt="" className="img-blog2"/>
        </div>
      </div>


      {lang === 'fr' && (
        <div className="aimez-aussi">
          <h2>{t("AideMoiAFaireSeul.19")}</h2>
          <Container>
            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/child-fun-family-3046494.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("AideMoiAFaireSeul.20")}</Card.Title>
                    <Link href='/blogs/MathematiquesEtJeunesEnfants'>
                      <a className="read-more-button" >{t("AideMoiAFaireSeul.21")}</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'/playboardGood.webp'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title card-no-margin">{t("AideMoiAFaireSeul.22")}<br/>
                      <div className='playboard-card'>
                        <p className='prix-playboard-card-cross'>49,90€</p>
                        <p className='prix-playboard-card-true'>29,90€</p>
                      </div>
                    </Card.Title>
                    <Link href="javascript:void(0);">
                      <a className="read-more-button" onClick={handleAddToCart}>{t("AideMoiAFaireSeul.23")}</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/family-kids-baby-457235.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Education positive</Card.Title>
                    <Link href='/blog-math'>
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

export default AideMoiAFaireSeul;

