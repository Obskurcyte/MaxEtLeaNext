import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player'
import Link from 'next/link';
import Footer from "../components/Footer";
import Engagement from "../components/Engagement";
import Garanties from "../components/GarantiesMaxEtLea";
import AvisClients from "../components/AvisClients";
import * as product from "../products";
import { AppContext } from "../components/context/AppContext";
import Head from 'next/head'
import HeaderXylophone from "../components/HeaderXylophone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faDotCircle, faGrinStars, faMusic, faChild, faPalette } from "@fortawesome/free-solid-svg-icons";
import Recommendation from "../components/Recommendation";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import QualiteDansLesDetails from "../components/QualiteDansLesDetails";
import Collapsible from "react-collapsible";
import { useTranslation } from "react-i18next";
import CountClients from "../components/CountClients";
import HeaderTour from "../components/HeaderTour";
import XylophoneQualite from "../components/XylophoneQualite";
import Slider from "react-slick";
import { useRouter } from "next/router";

const XylophoneScreen = props => {

  const [cart, setCart] = useContext(AppContext);
  const products = product.products

  const { t, i18n } = useTranslation();

  const icon = React.createElement('i', { className: 'far fa-question-circle' }, "");
  const title1 = React.createElement('p', {}, t("Xylo.FAQtitle1"));
  const faqHeader1 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title1]);
  const title2 = React.createElement('p', {}, t("Xylo.FAQtitle2"));
  const faqHeader2 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title2]);
  const title3 = React.createElement('p', {}, t("Xylo.FAQtitle3"));
  const faqHeader3 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title3]);
  const title4 = React.createElement('p', {}, t("Xylo.FAQtitle4"));
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
    const updatedProducts = getUpdatedProducts(existingCart.products, products[0], qtyToBeAdded, newQty);
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
    const productExistsIndex = isProductInCart(existingProductsInCart, products[0].id);

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
        const updatedCart = updateCart(existingCart, products[0], qtyToBeAdded);
        setCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[0]);
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
        <title>Max And Lea - {t("Xylo.1")}</title>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <HeaderXylophone />
      <div className="page-supercontainer">
        <div className="container1000">
          <div className="imgCouverture">
            <div className="playboard-title-container">
              <h1 className="playboard-title">{t("Xylo.1")}</h1>
            </div>
            <div className="playboard-paragraph-container">
              <p className="playboard-paragraph">{t("Xylo.subtitle.1")}</p>
            </div>
            <div className="voir-offre">
              <Link href="#offre"><h3 className="voir-offre-title">{t("Playboard2")}</h3></Link>
            </div>
            <div className="slider-container">
              <Slider {...settings}>
                <div>
                  <img src={'/xylo1.jpg'} alt="" />
                </div>
                <div>
                  <img src={'/xylo2.jpg'} alt="" />
                </div>
                <div>
                  <img src={'/xylo3.jpg'} alt="" />
                </div>
                <div>
                  <img src={'/xylo4.jpg'} alt="" />
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
              <p className="pensee-paragraph">{t("Xylo.2")}</p>
            </div>

            <div className="icone-container1">
              <div className="row">

                <div className="col icone-mini-container">

                  <img src={'/habilite.png'} alt="" />
                  <p className="xyloPara"><span>{t("Xylo.3")}</span><br />{t("Xylo.4")}</p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/motricite.png'} alt="" />
                  <p className="xyloPara"><span>{t("Xylo.5")}</span><br />{t("Xylo.6")}</p>
                </div>

                <div className="col icone-mini-container">

                  <img src={'/creativite.png'} alt="" />
                  <p className="xyloPara"><span>{t("Xylo.7")}</span><br />{t("Xylo.8")}</p>
                </div>
              </div>

              <div className="row">

                <div className="col icone-mini-container">
                  <img src={'/concentration.png'} alt="" />
                  <p className="xyloPara"><span>{t("Xylo.9")}</span><br />{t("Xylo.10")}</p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/apprendre.png'} alt="" />
                  <p className="xyloPara"><span>{t("Xylo.11")}</span><br />{t("Xylo.12")}</p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/autonomie.png'} alt="" />
                  <p className="xyloPara"><span>{t("Xylo.13")}</span><br />{t("Xylo.14")}</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="container1000">
          <div className="card-citation container-about" style={{ marginTop: "25px", marginBottom: "0px" }}>
            <div style={{ display: 'flex', marginBottom: '5%' }}>
              <i className="fas fa-quote-left" style={{ marginRight: "25px" }} />
              <p>{t("Xylo.quote")}</p>
            </div>
            <p className="signature" style={{ marginLeft: "25px" }}>
              Max & Lea</p>
          </div>
        </div>


        <div className="container1000">
          <div className="image-recap-container">
            <img src={'/xylophoneImg.jpg'} alt="" className="image-recap" />
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
                <FontAwesomeIcon icon={faMusic} color="#E72C59" className="anneauxImg" />
                <h5>{t("Xylo.17")}</h5>
                <p>{t("Xylo.18")}<span>{t("Xylo.18a")}</span>{t("Xylo.18b")}<span>{t("Xylo.18c")}</span>{t("Xylo.18d")}<span>{t("Xylo.18e")}</span>{t("Xylo.18f")}<span>{t("Xylo.18g")}</span></p>
              </div>


              <div className="col miniIconeContainer2">
                <FontAwesomeIcon icon={faChild} color="lightblue" className="childImg" />
                <h5>{t("Xylo.19")}</h5>
                <p>{t("Xylo.20")}<span>{t("Xylo.20a")}</span>{t("Xylo.20b")}<span>{t("Xylo.20c")}</span>{t("Xylo.20d")}<span>{t("Xylo.20e")}</span>{t("Xylo.20f")}</p>
              </div>


              <div className="col miniIconeContainer2">
                <FontAwesomeIcon icon={faPalette} color="#CE51C6" className="paletteImg" />
                <h5>{t("Xylo.21")}</h5>
                <p>{t("Xylo.22")}<span>{t("Xylo.22a")}</span>{t("Xylo.22b")}<span>{t("Xylo.22c")}</span>{t("Xylo.22d")}<span>{t("Xylo.22e")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <FontAwesomeIcon icon={faGrinStars} color="#F28D2A" className="eveilImg" />
                <h5>{t("Xylo.23")}</h5>
                <p>{t("Xylo.24")}<span>{t("Xylo.24a")}</span>{t("Xylo.24b")}<span>{t("Xylo.24c")}</span></p>
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
                    <p className="priceFalse">21,90 €</p>
                    <p className="productRedPrice">17,90 €  <span className="reduction">{t("Tour.reduc")}</span></p>
                    <p className="sub-offer">{t("Xylo.25")}<Link href="/playboard">PlayBoard</Link></p>
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
                    <img src={'/xylo-top.webp'} alt="" className="reducImg" />
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
          <XylophoneQualite />
        </div>

        <div className="container1000">
          <div className="faqContainer">
            <h5>{t("Playboard111")}</h5>
            <div className="row">
              <div className="col">
                <Collapsible trigger={faqHeader1}>
                  <p>{t("Xylo.FAQanswer1")}</p>
                </Collapsible>
                <Collapsible trigger={faqHeader2}>
                  <p>{t("Xylo.FAQanswer2")}</p>
                </Collapsible>
              </div>
              <div className="col">
                <Collapsible trigger={faqHeader3}>
                  <p>{t("Xylo.FAQanswer3a")}<a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a>{t("Xylo.FAQanswer3b")}<a href="/contact/" target="_blank" rel="noopener">{t("Xylo.FAQanswer3c")}</a></p>
                </Collapsible>
                <Collapsible trigger={faqHeader4}>
                  <p>{t("Xylo.FAQanswer4a")}
                    <a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a>
                    {t("Xylo.FAQanswer4b")}<a href="/contact/" target="_blank" rel="noopener">{t("Xylo.FAQanswer4c")}</a>{t("Xylo.FAQanswer4d")}
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

export default XylophoneScreen;
