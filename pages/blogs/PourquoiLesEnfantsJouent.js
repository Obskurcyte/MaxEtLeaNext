import React, {useContext} from 'react';
import Header from "../../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/Footer";
import {Card, Col, Container, Row} from "react-bootstrap";
import Link from "next/link";
import {AppContext} from "../../components/context/AppContext";
import * as product from "../../products";
import i18next from "i18next";
import {useTranslation} from "react-i18next";
import Head from "next/head";
import { useRouter } from "next/router";

const PourquoiLesEnfantsJouent = () => {

  const router = useRouter();

  const [cart, setCart] = useContext(AppContext);
  const products = product.products;

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
        <title>Max And Lea - Blog - {t("PourquoiLesEnfantsJouent.1")}</title>
      </Head>
      <Header />
      <div>
        <img src={'/pano.jpg'} className="img-blog" alt={'mathématiques'}/>
      </div>

      <div className="container1000">
        <div className="date-container">
          <FontAwesomeIcon icon={faCalendar} className="calendar"/>
          <p className="date-text">{t("PourquoiLesEnfantsJouent.0")}</p>
        </div>

        <h1 style={{textAlign: 'center'}}>{t("PourquoiLesEnfantsJouent.1")}</h1>
        <hr/>
        <div className="introduction">
          <p>{t("PourquoiLesEnfantsJouent.2")}</p>
        </div>
        <hr/>

        <div className="row">
          <div className="col-sm-8">
            <p>{t("PourquoiLesEnfantsJouent.3")}</p>
            <p>{t("PourquoiLesEnfantsJouent.4")}</p>
            <p>{t("PourquoiLesEnfantsJouent.5")}</p>
          </div>
          <div className="col-sm-4">
            <img src={'/joue-img.jpg'} alt="" className="enfants-souriant-blog"/>
          </div>
        </div>

        <div className="description-blog">
          <p>{t("PourquoiLesEnfantsJouent.6")}</p>
          <p>{t("PourquoiLesEnfantsJouent.7")}</p>
          <p>{t("PourquoiLesEnfantsJouent.8")}</p>
          <p>{t("PourquoiLesEnfantsJouent.9")}</p>
          <p>{t("PourquoiLesEnfantsJouent.10")}</p>
        </div>

        <div className="commentContainer">
          <div className="textPsy">
            <p>Angélique Kosinski</p>
            <p>{t("PourquoiLesEnfantsJouent.11")}</p>
            <p>{t("PourquoiLesEnfantsJouent.12")}</p>
            <a href="https://www.instagram.com/unepsyaparis/" style={{fontSize:"1rem",color:"#00b2cc"}}>@unepsyaparis</a>
          </div>
            <img src={"https://maxandlea.com/wp-content/uploads/2020/11/Angelique.jpg"} alt="" className="imgPsy"/>
        </div>
      </div>

        <div className="aimez-aussi">
          <h2>{t("Blogs.19")}</h2>
          <Container>
            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'/boys-children.webp'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.0")}</Card.Title>
                    <Link href='/blogs/LeJeuEnExterieur'>
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
                  <Card.Img src={'/educationPositive.webp'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">{t("Blogs.13")}</Card.Title>
                    <Link href='/blogs/EducationPositive'>
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

export default PourquoiLesEnfantsJouent;
