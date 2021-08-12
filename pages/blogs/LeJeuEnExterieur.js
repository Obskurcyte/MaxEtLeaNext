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
import { useRouter } from "next/router";

const LeJeuEnExterieur = () => {

  const router = useRouter();

  const [cart, setCart] = useContext(AppContext);
  const products = product.products

  const lang = i18next.language;

  const { t, i18n } = useTranslation();

  const getFloatVal = (string) => {
    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)) : '';
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
    return newCart
  };



  const createNewProduct = (product, productPrice, qty) => {
    return {
      productId: product.id,
      name: product.name,
      price: productPrice,
      qty: qty,
      image: product.image,
      totalPrice: parseFloat((productPrice * qty).toFixed(2))
    }
  };


  const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProducts(existingCart.products, products[2], qtyToBeAdded, newQty);
    const addPrice = (total, item) => {

      total.totalPrice = item.totalPrice;
      total.qty += item.qty;
      return total;
    }

    // Loop through the updated product array and add the totalPrice of each item to get the totalPrice
    let total = updatedProducts.reduce(addPrice, { totalPrice: 0, qty: 0 })

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


  const getUpdatedProducts = (existingProductsInCart, product, qtyToBeAdded, newQty = false) => {
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
      if (existingCart != null) {
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
        <title>Max And Lea - Blog - {t("LeJeuEnExterieur.1")}</title>
      </Head>
      <Header />
      
      <div className="img-blog-container jeu-exterieur-top">
      </div>
      <div className="container1000">

      <div className="date-container">
        <FontAwesomeIcon icon={faCalendar} className="calendar"/>
        <p className="date-text">{t("LeJeuEnExterieur.0")}</p>
      </div>

      <h1 style={{textAlign: 'center'}}>{t("LeJeuEnExterieur.1")}</h1>
      <hr/>
      <div className="introduction">
        <p>{t("LeJeuEnExterieur.2")}</p>
      </div>
      <hr/>

      <div className="row">
        <div className="col-sm-8">
          <p>{t("LeJeuEnExterieur.3")}</p>
          <p>{t("LeJeuEnExterieur.4")}</p>
        </div>
        <div className="col-sm-4">
          <img src={'/enfantBlog.jpg'} alt="" className="enfants-souriant-blog"/>
        </div>
      </div>

      <div className="description-blog">
        <p>{t("LeJeuEnExterieur.5")}</p>
        <p>{t("LeJeuEnExterieur.6")}</p>
      </div>

      <div className="img-blog2-container">
        <img src={'/girl-playing-leaves.webp'} alt="" className="img-blog2"/>
      </div>

      <div className="conseilMaxEtLea">
        <h4>{t("LeJeuEnExterieur.7")}</h4>

        <div className="conseilTitre">
          <img src="/triangle.svg" alt="" className='titre-img'/>
          <h5>{t("LeJeuEnExterieur.8")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("LeJeuEnExterieur.10")}</p>
        </div>

        <div className="conseilTitre">
          <img src="/carre.svg" alt="" className='titre-img'/>
          <h5>{t("LeJeuEnExterieur.11")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("LeJeuEnExterieur.12")}</p>
        </div>

        <div className="conseilTitre">
          <img src="/etoile.svg" alt="" className='titre-img'/>
          <h5>{t("LeJeuEnExterieur.13")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("LeJeuEnExterieur.14")}</p>
        </div>

        <div className="conseilTitre">
          <img src="/cercle.svg" alt="" className='titre-img'/>
          <h5>{t("LeJeuEnExterieur.15")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("LeJeuEnExterieur.16")}</p>
        </div>
      </div>

      <div className="img-blog2-container">
        <img src={'/boy-playing-leaves.webp'} alt="" className="img-blog2"/>
      </div>

      </div>
        <div className="aimez-aussi">
          <h2>{t("Blogs.19")}</h2>
          <Container>
            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Link href='/blogs/ConcilierTravailEtEducation'>
                    <Card.Img src={'/family-kids-baby.webp'} variant="top" className="math-image" />
                  </Link>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.9")}</Card.Title>
                    <Link href='/blogs/ConcilierTravailEtEducation'>
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
                  <Link href='/blogs/LesEnfantsEtLesEcrans'>
                    <Card.Img src={'/enfantEcran.webp'} variant="top" className="math-image" />
                  </Link>
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.7")}</Card.Title>
                    <Link href='/blogs/LesEnfantsEtLesEcrans'>
                      <a className="read-more-button" >{t("Blogs.2")}</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

            </Row>
          </Container>
        </div>

      <Footer />
    </div>
  );
};

export default LeJeuEnExterieur;
