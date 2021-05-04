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

const PourquoiLesEnfantsJouent = () => {

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
      name: product.name,
      price: productPrice,
      qty: qty,
      totalPrice: parseFloat((productPrice * qty).toFixed(2))
    }
  };


  const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProducts(existingCart.products, products[4], qtyToBeAdded, newQty);
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
    const productExistsIndex = isProductInCart(existingProductsInCart, products[4].id);

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
        const updatedCart = updateCart(existingCart, products[4], qtyToBeAdded);
        setCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[4]);
        setCart(newCart)
      }
    }
  }


  return (
    <div className='jeuContainer'>
      <Header />
      <div className="img-blog-container">
        <img src={'/playboardBlog.jpg'} className="img-blog" alt={'mathématiques'}/>
      </div>

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

      <div className="paragraph-blog1">
        <div className="paragraph1-text">
          <p>{t("PourquoiLesEnfantsJouent.3")}</p>
          <p>{t("PourquoiLesEnfantsJouent.4")}</p>
          <p>{t("PourquoiLesEnfantsJouent.5")}</p>
        </div>

        <div className="img-blog-container">
          <img src={'https://maxandlea.com/wp-content/uploads/2020/11/IMG_4278-768x1152.jpg'} alt="" className="enfants-souriant-blog"/>
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
        <div>
          <p>Angélique Kosinski</p>
          <p>{t("PourquoiLesEnfantsJouent.11")}</p>
          <p>{t("PourquoiLesEnfantsJouent.12")}</p>
        </div>
          <img src={"https://maxandlea.com/wp-content/uploads/2020/11/Angelique.jpg"} alt="" className="imgPsy"/>
      </div>

      {lang === 'fr' && (
        <div className="aimez-aussi">
          <h2>Vous pourriez aimer aussi</h2>
          <Container>
            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2021/04/boys-children-path-5630669.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Le jeu en extérieur</Card.Title>
                    <Link href='/blogs/LeJeuEnExterieur'>
                      <a className="read-more-button" >Lire plus</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'http://localhost:3000/playboardGood.png'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title card-no-margin">La PlayBoard<br/>
                      <div className='playboard-card'>
                        <p className='prix-playboard-card-cross'>49,90€</p>
                        <p className='prix-playboard-card-true'>29,90€</p>
                      </div>
                    </Card.Title>
                    <div onClick={handleAddToCart}>
                      <a className="read-more-button" >Ajouter au panier</a>
                    </div>
                  </Card.Body>
                </Card>
              </Col>


              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'https://maxandlea.com/fr/education-positive/'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Education positive</Card.Title>
                    <Link href='/blogs/EducationPositive'>
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

export default PourquoiLesEnfantsJouent;
