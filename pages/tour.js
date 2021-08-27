import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player'
import Header from "../components/Header";
import Link from 'next/link';
import Footer from "../components/Footer";
import Engagement from "../components/Engagement";
import Garanties from "../components/GarantiesMaxEtLea";
import HeaderPlayboard from "../components/HeaderPlayboard";
import AvisClients from "../components/AvisClients";
import * as product from "../products";
import { AppContext } from "../components/context/AppContext";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import Head from 'next/head'
import HeaderTour from "../components/HeaderTour";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faGrinStars } from "@fortawesome/free-solid-svg-icons";
import Recommendation from "../components/Recommendation";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import QualiteDansLesDetails from "../components/QualiteDansLesDetails";
import Collapsible from "react-collapsible";
import { useTranslation } from "react-i18next";
import CountClients from "../components/CountClients";
import ItemsCarousel from "react-items-carousel";
import { set } from "react-ga";
import Slider from "react-slick";
import styles from "../components/AvisClients.module.css";
import TourQualite from "../components/TourQualite";
import { useRouter } from "next/router";


const TourScreen = props => {

  const [cart, setCart] = useContext(AppContext);
  const products = product.products

  const { t, i18n } = useTranslation();

  const icon = React.createElement('i', { className: 'far fa-question-circle' }, "");
  const title1 = React.createElement('p', {}, t("Tour.FAQtitle1"));
  const faqHeader1 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title1]);
  const title2 = React.createElement('p', {}, t("Tour.FAQtitle2"));
  const faqHeader2 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title2]);
  const title3 = React.createElement('p', {}, t("Tour.FAQtitle3"));
  const faqHeader3 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title3]);
  const title4 = React.createElement('p', {}, t("Tour.FAQtitle4"));
  const faqHeader4 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title4]);

  const router = useRouter();

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
      oldPrice: product.priceAugmente,
      name: product.name,
      price: productPrice,
      qty: qty,
      image: product.image,
      totalPrice: parseFloat((productPrice * qty).toFixed(2))
    }
  };


  const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProducts(existingCart.products, products[1], qtyToBeAdded, newQty);
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
    const productExistsIndex = isProductInCart(existingProductsInCart, products[1].id);

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
        const qtyToBeAdded = productCount
        const updatedCart = updateCart(existingCart, products[1], qtyToBeAdded);
        setCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[1]);
        setCart(newCart)
      }
    }
  }

  const [productCount, setProductCount] = useState(1);

  const onIncreaseClick = () => {
    setProductCount(productCount + 1);
  }

  const onDecreaseClick = () => {
    if (productCount === 1) {
      return;
    } else {
      setProductCount(productCount - 1);
    }
  }

  const [children, setChildren] = useState([
    <div>
      <img src={'/xylophoneImg.jpg'} alt='photoXylo' />
    </div>,
    <div>
      <img src={'/xylophoneImg.jpg'} alt='photoXylo' />
    </div>,
    <div>
      <img src={'/xylophoneImg.jpg'} alt='photoXylo' />
    </div>
  ])
  const [activeItemIndex, setActiveItemIndex] = useState(0)

  const changeActiveItem = (activeItemIndex) => set(activeItemIndex);

  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  return (
    <div>
      <Head>
        <title>Max And Lea - {t("Tour.1")}</title>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <HeaderTour />
      <div className="page-supercontainer">
        <div className="container1000">
          <div className="imgCouverture">
            <div className="playboard-title-container">
              <h1 className="playboard-title">{t("Tour.1")}</h1>
            </div>
            <div className="playboard-paragraph-container">
              <p className="playboard-paragraph"><span>{t("Tour.subtitle.1")}{t("Tour.subtitle.2")}</span>{t("Tour.subtitle.3")}<span>{t("Tour.subtitle.4")}</span>{t("Tour.subtitle.5")}<span>{t("Tour.subtitle.6")}</span>{t("Tour.subtitle.7")}<span>{t("Tour.subtitle.8")}</span></p>
            </div>
            <div className="voir-offre">
              <Link href="#offre"><h3 className="voir-offre-title">{t("Playboard2")}</h3></Link>
            </div>
            <div className="slider-container">
              <Slider {...settings}>
                <div>
                  <img src={'/tour1.jpg'} alt="" />
                </div>
                <div>
                  <img src={'/tour2.jpg'} alt="" />
                </div>
                <div>
                  <img src={'/tour3.jpg'} alt="" />
                </div>
                <div>
                  <img src={'/tour4.jpg'} alt="" />
                </div>
                <div>
                  <img src={'/tour5.jpg'} alt="" />
                </div>
                <div>
                  <img src={'/tour6.jpg'} alt="" />
                </div>
              </Slider>
            </div>

          </div>
        </div>
        <div className="mainContainer pensee-container">
          <div className="container1000">
            <div className="img-bebe-container">
              <img src={"/bebeIcone.png"} alt="" className="img-bebe" />
            </div>
            <div className="pensee-paragraph-container">
              <p className="pensee-paragraph">{t("Tour.2")}</p>
            </div>

            <div className="icone-container1">
              <div className="row">

                <div className="col icone-mini-container">
                  <img src={'/habilite.png'} alt="" />
                  <p className="xyloPara"><span>{t("Tour.3")}</span><br />{t("Tour.4")}</p>
                </div>

                <div className="col icone-mini-container">

                  <img src={'/motricite.png'} alt="" />
                  <p className="xyloPara"><span>{t("Tour.5")}</span><br />{t("Tour.6")}</p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/creativite.png'} alt="" />
                  <p className="xyloPara"><span>{t("Tour.7")}</span><br />{t("Tour.8")}</p>
                </div>
              </div>

              <div className="row">

                <div className="col icone-mini-container">
                  <img src={'/concentration.png'} alt="" />
                  <p className="xyloPara"><span>{t("Tour.9")}</span><br />{t("Tour.10")}</p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/apprendre.png'} alt="" />
                  <p className="xyloPara"><span>{t("Tour.11")}</span><br />{t("Tour.12")}</p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/autonomie.png'} alt="" />
                  <p className="xyloPara"><span>{t("Tour.13")}</span><br />{t("Tour.14")}</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="container1000">
          <div className="card-citation container-about" style={{ marginTop: "25px", marginBottom: "0px" }}>
            <div style={{ display: 'flex', marginBottom: '5%' }}>
              <i className="fas fa-quote-left" style={{ marginRight: "25px" }} />
              <p>{t("Tour.quote")}</p>
            </div>
            <p className="signature" style={{ marginLeft: "25px" }}>
              Max & Lea</p>
          </div>
        </div>


        <div className="container1000">
          <div className="image-recap-container">
            <img src={'/tourArc.jpg'} alt="" className="image-recap" />
          </div>
        </div>

        <div className="container1000">
          <div className="huitEnUnContainerText">
            <p className="huitEnUnBigText">{t("Tour.15")}</p>
            <p className="huitEnUnText">{t("Tour.16")}</p>
          </div>
        </div>


        <div className="container1000">
          <div className="containerIcones2">
            <div className="row">

              <div className="col miniIconeContainer2">
                <FontAwesomeIcon icon={faDotCircle} color="#35A936" className="anneauxImg" />
                <h5>{t("Tour.17")}</h5>
                <p>{t("Tour.18")}<span>{t("Tour.18a")}</span>{t("Tour.18b")}<span>{t("Tour.18c")}</span></p>
              </div>


              <div className="col miniIconeContainer2">
                <img src={'/couleur.png'} alt="" />
                <h5>{t("Tour.19")}</h5>
                <p>{t("Tour.20")}<span>{t("Tour.20a")}</span>{t("Tour.20b")}<span>{t("Tour.20c")}</span></p>
              </div>


              <div className="col miniIconeContainer2">
                <img src={'/degrade.png'} alt="" />
                <h5>{t("Tour.21")}</h5>
                <p>{t("Tour.22")}<span>{t("Tour.22a")}</span>{t("Tour.22b")}<span>{t("Tour.22c")}</span>{t("Tour.22d")}<span>{t("Tour.22e")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <FontAwesomeIcon icon={faGrinStars} color="#E72C59" className="eveilImg" />
                <h5>{t("Tour.23")}</h5>
                <p>{t("Tour.24")}<span>{t("Tour.24a")}</span>{t("Tour.24b")}<span>{t("Tour.24c")}</span>{t("Tour.24d")}<span>{t("Tour.24e")}</span></p>
              </div>

            </div>
          </div>
        </div>

        <div className="container1000">
          <CountClients />
        </div>

        <div className="container1000">
          <div>
            <AvisClients />
          </div>
        </div>

        <div className="mainContainer playboardContainer">
          <span className="offreAnchor" id="offre"></span>
          <div className="container1000">
            <div className="playboardSubContainer container">
              <div className="innerPlayboard">
                <div className="prixPlayboardContainer">
                  <div className="productPrix">
                    <p className="priceFalse">19,90 €</p>
                    <p className="productRedPrice">14,90 € <span className="reduction">{t("Tour.reduc")}</span></p>
                    <p className="sub-offer">{t("Tour.25")}<Link href="/playboard">PlayBoard</Link></p>
                    <div className="add-to-cart-container">
                      <div className="input-quantity">
                        <button className="decrease-button" onClick={onDecreaseClick}>-</button>
                        <input type="text" className="change-quantity" value={productCount} />
                        <button className="increase-button" style={{ color: "#e72c59" }} onClick={onIncreaseClick}>+</button>
                      </div>
                      <div className="ajouterPanier" onClick={() => {
                        handleAddToCart()
                        router.push('/checkout')
                      }}>
                        <Link href="javascript:void(0)"><p className="ajouterPanierText">{t("Playboard101")}</p></Link>
                      </div>
                    </div>
                    <p className="question" onClick={async () => {
                      await router.push('/contact')
                    }}>{t("Playboard102")}</p>
                  </div>
                  <div className="productImgContainer">
                    <img src={'/tour-top.webp'} alt="" className="reducImg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container1000">
          <Engagement />
        </div>

        <div className="mainContainer garantiesContainer">
          <div className="container1000">
            <Garanties />
          </div>
        </div>

        <div className="container1000">
          <TourQualite />
        </div>

        <div className="container1000">
          <div className="faqContainer">
            <h5>{t("Playboard111")}</h5>
            <div className="row">
              <div className="col">
                <Collapsible trigger={faqHeader1}>
                  <p>{t("Tour.FAQanswer1")}</p>
                </Collapsible>
                <Collapsible trigger={faqHeader2}>
                  <p>{t("Tour.FAQanswer2")}</p>
                </Collapsible>
              </div>
              <div className="col">
                <Collapsible trigger={faqHeader3}>
                  <p>{t("Tour.FAQanswer3a")}<a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a>{t("Tour.FAQanswer3b")}<a href="/contact/" target="_blank" rel="noopener">{t("Tour.FAQanswer3c")}</a></p>
                </Collapsible>
                <Collapsible trigger={faqHeader4}>
                  <p>{t("Tour.FAQanswer4a")}
                    <a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a>
                    {t("Tour.FAQanswer4b")}<a href="/contact/" target="_blank" rel="noopener">{t("Tour.FAQanswer4c")}</a>{t("Tour.FAQanswer4d")}
                  </p>
                </Collapsible>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default TourScreen;
