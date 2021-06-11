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

const EducationPositive = () => {

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
        <title>Max And Lea - Blog-Education positive</title>
      </Head>
      <Header />
      <div className="img-blog-container">
        <img src={'https://maxandlea.com/wp-content/uploads/2020/05/family-kids-baby-457235.jpg'} className="img-blog" alt={'mathématiques'}/>
      </div>

      <div className="date-container">
        <FontAwesomeIcon icon={faCalendar} className="calendar"/>
        <p className="date-text">{t("EducationPositive.0")}</p>
      </div>

      <h1 style={{textAlign: 'center'}}>{t("EducationPositive.1")}</h1>
      <hr/>
      <div className="introduction">
        <p>{t("EducationPositive.2")}</p>
      </div>
      <hr/>

      <div className="paragraph-blog2">
        <div className="paragraph1-text">
          <p>{t("EducationPositive.3")}</p>
          <p>{t("EducationPositive.4")}<a
            href="https://fr.wikipedia.org/wiki/Marshall_Rosenberg" style={{fontFamily: 'Roboto, sans-serif', fontSize: 'inherit'}}>Marshall Rosenberg. </a>{t("EducationPositive.5")}</p>
          <p>{t("EducationPositive.6")}

            <ul>
              <li><span style={{fontWeight: 'bold'}}>{t("EducationPositive.7")}</span>{t("EducationPositive.8")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("EducationPositive.9")}</span>{t("EducationPositive.10")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("EducationPositive.11")}</span>{t("EducationPositive.12")}</li>
              <li><span style={{fontWeight: 'bold'}}>{t("EducationPositive.13")}</span>{t("EducationPositive.14")}</li>
            </ul>
          </p>
        </div>

          <img src={'https://maxandlea.com/wp-content/uploads/2020/06/pay-wood-one-3208068-777x1024.jpg'} alt="" className="enfants-souriant-blog4"/>
      </div>

      <hr/>


      <div className="img-blog2-container">
        <img src={'/handschildren.jpg'} alt="" className="img-blog2"/>
      </div>


      <div className="conseilMaxEtLea">
        <h4>{t("EducationPositive.15")}</h4>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" className='titre-img'/>
          <h5>{t("EducationPositive.16")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("EducationPositive.17")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_3t.svg" alt="" className='titre-img'/>
          <h5>{t("EducationPositive.18")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("EducationPositive.19")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_2t.svg" alt="" className='titre-img'/>
          <h5>{t("EducationPositive.20")}</h5>
        </div>
        <div className="conseildescription">
          <p> {t("EducationPositive.21")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_4.svg" alt="" className='titre-img'/>
          <h5>{t("EducationPositive.22")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("EducationPositive.23")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_4.svg" alt="" className='titre-img'/>
          <h5>{t("EducationPositive.24")}</h5>
        </div>
        <div className="conseildescription">
          {t("EducationPositive.25")}
          <p>« <a href="http://amzn.to/2CKnZuw" style={{fontFamily: 'Roboto, sans-serif', fontSize: 'inherit'}}>Cool Parents make happy kids</a> » {t("EducationPositive.26")}</p>
          <p>« <a href="https://www.amazon.fr/Jai-tout-essay%C3%A9-Isabelle-Filliozat/dp/250113544X/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=j%27ai+tout+essay%C3%A9&qid=1595595217&s=books&sr=1-1" style={{fontFamily: 'Roboto, sans-serif', fontSize: 'inherit'}}>J’ai tout essayé</a> » {t("EducationPositive.27")}</p>
          <p>« <a href="https://www.amazon.fr/discipline-positive-Jane-Nelson/dp/2501141318/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3DXEB19QYDTKY&dchild=1&keywords=la+discipline+positive&qid=1595595252&s=books&sprefix=la+discipline+%2Cstripbooks%2C149&sr=1-1" style={{fontFamily: 'Roboto, sans-serif', fontSize: 'inherit'}}>La discipline positive</a> » {t("EducationPositive.28")}</p>
          <p>{t("EducationPositive.29")}</p>
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
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/06/IMG_4681-scaled.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Mathématiques et jeunes enfants</Card.Title>
                    <Link href='/blogs/MathematiquesEtJeunesEnfants'>
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
                    <Card.Title className="card-title">Les enfants et les écrans</Card.Title>
                    <Link href='/blogs/LesEnfantsEtLesEcrans'>
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

export default EducationPositive;
