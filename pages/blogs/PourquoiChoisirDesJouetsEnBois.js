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

const PourquoiChoisirDesJouetsEnBois = () => {

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
      oldPrice: product.priceAugmente,
      name: product.name,
      price: productPrice,
      qty: qty,
      image: product.image,
      slug: product.slug,
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
        <title>Max And Lea - Blog - {t("PourquoiChoisirDesJouetsEnBois.1")}</title>
      </Head>
      <Header />
      <div className="img-blog-container jouets-bois-top">
      </div>

      <div className="container1000">
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

        <div className="row">
          <div className="col-sm-8">
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
          <div className="col-sm-4">
            <img src={'/wood-toys.webp'} alt="" className="jouets-bois-img"/>
          </div>

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
      </div>

        <div className="aimez-aussi">
          <h2>{t("Blogs.19")}</h2>
          <Container>
            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'/father.webp'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.11")}</Card.Title>
                    <Link href='/blogs/AideMoiAFaireSeul'>
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
                  <Card.Img src={'/baby-guitar-rock.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.17")}</Card.Title>
                    <Link href='/blogs/MusiqueEtJeunesEnfants'>
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

export default PourquoiChoisirDesJouetsEnBois;
