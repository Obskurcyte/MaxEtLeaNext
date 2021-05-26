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

const ConcilierTravailEtEducation = () => {

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
        <title>Max And Lea - Blog-Concilier travail et éducation</title>
      </Head>
      <Header />
      <div className="img-blog-container">
        <img src={'https://maxandlea.com/wp-content/uploads/2020/05/child-fun-family-3046494.jpg'} className="img-blog" alt={'mathématiques'}/>
      </div>

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

      <div className="paragraph-blog1">
        <div className="paragraph1-text">
          <p>{t("ConcilierTravailEtEducation.3")}<a href="https://www.filliozat.net/" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>Isabelle Filliozat</a> , {t("ConcilierTravailEtEducation.4")} <a
            href="https://www.amazon.fr/Maman-veux-pas-travailles-professionnelle/dp/2844545882/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3KBT6HOGVTAQI&dchild=1&keywords=maman+je+ne+veux+pas+que+tu+travailles&qid=1595598334&s=books&sprefix=maman+je+ne+veux+pas+que+tu+travaill%2Cstripbooks%2C147&sr=1-1" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>« Maman je ne veux pas que tu travailles »</a>

            {t("ConcilierTravailEtEducation.6")}
          </p>
        </div>

        <div className="img-blog-container">
          <img src={'https://maxandlea.com/wp-content/uploads/2020/05/baby-child-field-1851485.jpg'} alt="" className="enfants-souriant-blog"/>
        </div>
      </div>

      <div className="encadrement">
        <p><span className="grosseLettre">{t("ConcilierTravailEtEducation.7")}</span>{t("ConcilierTravailEtEducation.8")} « <a
          href="https://www.amazon.fr/pas-parent-parfait-Psy-Sant%C3%A9-ebook/dp/B005OJB4UM/ref=sr_1_1?__mk_fr_FR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=2BFOKHVWS3XQZ&dchild=1&keywords=il+n%27y+a+pas+de+parents+parfaits&qid=1595598392&s=books&sprefix=il+n%27y+a+pas+de+parent%2Cstripbooks%2C146&sr=1-1" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>Il n’y a pas de parent parfait</a> » {t("ConcilierTravailEtEducation.10")}</p>
      </div>



      <div className="img-blog2-container">
        <img src={'/handschildren.jpg'} alt="" className="img-blog2"/>
      </div>

      <hr/>

      <div className="conseilMaxEtLea">
        <h4>{t("ConcilierTravailEtEducation.11")}</h4>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" className='titre-img'/>
          <h5>{t("ConcilierTravailEtEducation.12")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("ConcilierTravailEtEducation.13")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_3t.svg" alt="" className='titre-img'/>
          <h5>{t("ConcilierTravailEtEducation.14")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("ConcilierTravailEtEducation.15")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_2t.svg" alt="" className='titre-img'/>
          <h5>{t("ConcilierTravailEtEducation.16")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("ConcilierTravailEtEducation.17")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_4.svg" alt="" className='titre-img'/>
          <h5>{t("ConcilierTravailEtEducation.18")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("ConcilierTravailEtEducation.19")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" className='titre-img'/>
          <h5>{t("ConcilierTravailEtEducation.20")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("ConcilierTravailEtEducation.21")}<a
            href="/blogs/LesEnfantsEtLesEcrans" style={{fontFamily: 'Roboto, sans-serif ', fontSize: 'inherit'}}>{t("ConcilierTravailEtEducation.22")}</a>{t("ConcilierTravailEtEducation.23")}</p>
        </div>

        <div className="conseilTitre">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/dot_3t.svg" alt="" className='titre-img'/>
          <h5>{t("ConcilierTravailEtEducation.24")}</h5>
        </div>
        <div className="conseildescription">
          <p>{t("ConcilierTravailEtEducation.25")}</p>
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
                  <Card.Img src={'https://maxandlea.com/wp-content/uploads/2020/05/child-wooden-blocks-2293839.jpg'} variant="top" className="math-image" />
                  <Card.Body className="card-body">
                    <Card.Title className="card-title">Pourquoi choisir des jouets en bois ?</Card.Title>
                    <Link href='/blogs/PourquoiChoisirDesJouetsEnBois'>
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
                    <Link href='#'>
                      <a className="read-more-button" onClick={handleAddToCart}>Ajouter au panier</a>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>

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
            </Row>
          </Container>
        </div>
      )}


      <Footer />


    </div>
  );
};

export default ConcilierTravailEtEducation;
