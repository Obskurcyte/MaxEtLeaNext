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

const MathematiquesEtJeunesEnfants = () => {

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
        <title>Max And Lea - Blog-Mathématiques et Jeunes Enfants</title>
      </Head>
      <Header />
      <div className="img-blog-container">
        <img src={'/maths.jpg'} className="img-blog" alt={'mathématiques'}/>
      </div>

      <div className="date-container">
        <FontAwesomeIcon icon={faCalendar} className="calendar"/>
        <p className="date-text">{t("MathematiquesEtJeunesEnfants.0")}</p>
      </div>

      <h1 style={{textAlign: 'center'}}>{t("MathematiquesEtJeunesEnfants.1")}</h1>
      <hr/>
      <div className="introduction">
        <p>{t("MathematiquesEtJeunesEnfants.2")}</p>
      </div>
      <hr/>

      <div className="paragraph-blog1">
        <div className="paragraph1-text">
          <p>{t("MathematiquesEtJeunesEnfants.3")}

            <ul>
              <li><span style={{fontWeight: 'bold'}}>{t("MathematiquesEtJeunesEnfants.4")}</span>{t("MathematiquesEtJeunesEnfants.5")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("MathematiquesEtJeunesEnfants.6")}</span>{t("MathematiquesEtJeunesEnfants.7")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("MathematiquesEtJeunesEnfants.8")}</span>{t("MathematiquesEtJeunesEnfants.9")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("MathematiquesEtJeunesEnfants.10")}</span>{t("MathematiquesEtJeunesEnfants.11")}</li>
            </ul>
            </p>

          <p>{t("MathematiquesEtJeunesEnfants.12")}</p>
        </div>
            <img src={'/quatre.jpg'} alt="" className="enfants-souriant-blog"/>
      </div>

      <div className="description-blog">
        <p>{t("MathematiquesEtJeunesEnfants.13")}
          <ul>
            <li>{t("MathematiquesEtJeunesEnfants.14")}</li>
            <li>{t("MathematiquesEtJeunesEnfants.15")}</li>
            <li>
              {t("MathematiquesEtJeunesEnfants.16")}
            </li>
            <li>
              {t("MathematiquesEtJeunesEnfants.17")}
            </li>
            <li>
              {t("MathematiquesEtJeunesEnfants.18")}
            </li>
            <li>
              {t("MathematiquesEtJeunesEnfants.19")}
            </li>
          </ul>
    </p>

        <p>{t("MathematiquesEtJeunesEnfants.20")}</p>
        <p>{t("MathematiquesEtJeunesEnfants.21")}</p>

      </div>

      <div className="img-blog2-container">
        <img src={'/handschildren.jpg'} alt="" className="img-blog2"/>
      </div>

      <div className="conseilMaxEtLea">
        <h4>{t("MathematiquesEtJeunesEnfants.22")}</h4>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" className='titre-img'/>
          <h5>{t("MathematiquesEtJeunesEnfants.23")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("MathematiquesEtJeunesEnfants.24")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_3t.svg" alt="" className='titre-img'/>
          <h5>{t("MathematiquesEtJeunesEnfants.25")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("MathematiquesEtJeunesEnfants.26")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_2t.svg" alt="" className='titre-img'/>
          <h5>{t("MathematiquesEtJeunesEnfants.27")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("MathematiquesEtJeunesEnfants.28")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_4.svg" alt="" className='titre-img'/>
          <h5>{t("MathematiquesEtJeunesEnfants.29")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("MathematiquesEtJeunesEnfants.30")}<a href="/blogs/LesEnfantsEtLesEcrans" style={{fontFamily: 'Roboto, sans-serif', fontSize: 'inherit'}}>{t("MathematiquesEtJeunesEnfants.31")}</a></p>
        </div>
      </div>

      <div className="img-blog2-container">
        <img src={'/handschildren.jpg'} alt="" className="img-blog2"/>
      </div>


      {lang === 'fr' && (
        <div className="aimez-aussi">
          <h2>Vous pouriez aimer aussi</h2>
          <Container>
            <Row className="row-card">
              <Col sm={4} md={4} lg={4} xl={4} className="col-card">
                <Card className="card-list-container">
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/11/Playboard-Angelique-Kosinski.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Pourquoi les enfants jouent ?</Card.Title>
                    <Link href='/blogs/PourquoiLesEnfantsJouent'>
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
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/child-fun-family-3046494.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Concilier travail et éducation</Card.Title>
                    <Link href='/blogs/ConcilierTravailEtEducation'>
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

export default MathematiquesEtJeunesEnfants;
