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

const LesEnfantsEtLesEcrans = () => {

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
      <Head>
        <title>Max And Lea - Blog-Les Enfants et Les Ecrans</title>
      </Head>
        <Header />
        <div className="img-blog-container">
          <img src={'/enfantEcran.webp'} className="img-blog" alt={'mathématiques'}/>
        </div>

        <div className="date-container">
          <FontAwesomeIcon icon={faCalendar} className="calendar"/>
          <p className="date-text">{t("LesEnfantsEtLesEcrans.0")}</p>
        </div>

        <h1 style={{textAlign: 'center'}}>{t("LesEnfantsEtLesEcrans.1")}</h1>
        <hr/>
        <div className="introduction">
          <p>{t("LesEnfantsEtLesEcrans.2")}
          <span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.3")}</span>
            {t("LesEnfantsEtLesEcrans.4")}
            {t("LesEnfantsEtLesEcrans.5")}
            <span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.6")}</span>
            {t("LesEnfantsEtLesEcrans.7")}<span style={{fontWeight: 'bold'}}>
              {t("LesEnfantsEtLesEcrans.8")}</span>
            {t("LesEnfantsEtLesEcrans.9")}<span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.10")}</span>{t("LesEnfantsEtLesEcrans.11")}<span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.12")}</span>

            {t("LesEnfantsEtLesEcrans.13")}<span style={{fontWeight: 'bold'}}>
              {t("LesEnfantsEtLesEcrans.14")}</span>
            {t("LesEnfantsEtLesEcrans.15")}<span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.16")}</span>{t("LesEnfantsEtLesEcrans.17")}</p>
        </div>
        <hr/>

      <div className="paragraph-blog1">
        <div className="paragraph1-text">
          <p>{t("LesEnfantsEtLesEcrans.18")}

            <ul>
              <li><span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.19")}</span>{t("LesEnfantsEtLesEcrans.20")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.21")}</span>{t("LesEnfantsEtLesEcrans.22")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.23")}</span>{t("LesEnfantsEtLesEcrans.24")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.25")}</span>{t("LesEnfantsEtLesEcrans.26")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.27")}</span></li>
              <li><span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.28")}</span></li>
              <li><span style={{fontWeight: 'bold'}}>{t("LesEnfantsEtLesEcrans.29")}</span></li>
            </ul>
          </p>
        </div>
          <img src={'https://maxandlea.com/wp-content/uploads/2020/05/438057-PEBQAZ-599.jpg'} alt="" className="enfants-souriant-blog"/>
      </div>

      <div className="encadrement">
        <p><span className="grosseLettre">{t("LesEnfantsEtLesEcrans.30")}</span>{t("LesEnfantsEtLesEcrans.31")}</p>
        <p>{t("LesEnfantsEtLesEcrans.32")}</p>
        <p>{t("LesEnfantsEtLesEcrans.33")}</p>
      </div>

      <hr/>

      <div className="outil">
        <div className="hrContainer">
        <h3>{t("LesEnfantsEtLesEcrans.34")}<br className="brseparator"/>{t("LesEnfantsEtLesEcrans.35")}</h3>
        <hr/>
        </div>
        <div className="apprentissageDescription">
          <p>{t("LesEnfantsEtLesEcrans.36")}<br/>
            {t("LesEnfantsEtLesEcrans.37")}<br/>

            {t("LesEnfantsEtLesEcrans.38")}</p>
        </div>
      </div>


      <div className="img-blog2-container">
        <img src={'/handschildren.jpg'} alt="" className="img-blog2"/>
      </div>

      <div className="conseilMaxEtLea">
        <h4>{t("LesEnfantsEtLesEcrans.39")}</h4>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" className='titre-img'/>
          <h5>{t("LesEnfantsEtLesEcrans.40")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("LesEnfantsEtLesEcrans.41")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_3t.svg" alt="" className='titre-img'/>
          <h5>{t("LesEnfantsEtLesEcrans.42")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("LesEnfantsEtLesEcrans.43")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_2t.svg" alt="" className='titre-img'/>
          <h5>{t("LesEnfantsEtLesEcrans.44")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("LesEnfantsEtLesEcrans.45")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_4.svg" alt="" className='titre-img'/>
          <h5>{t("LesEnfantsEtLesEcrans.46")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("LesEnfantsEtLesEcrans.47")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" className='titre-img'/>
          <h5>{t("LesEnfantsEtLesEcrans.48")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("LesEnfantsEtLesEcrans.49")}</p>
        </div>
      </div>

      <div className="img-blog2-container">
        <img src={'/handschildren.jpg'} alt="" className="img-blog2"/>
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
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/327490-P9JVOQ-930-1.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Aide moi à faire seul</Card.Title>
                    <Link href='/blogs/AideMoiAFaireSeul'>
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

export default LesEnfantsEtLesEcrans;