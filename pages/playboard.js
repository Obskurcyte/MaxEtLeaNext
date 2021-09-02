import React, { useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import Link from 'next/link';
import Footer from "../components/Footer";
import Engagement from "../components/Engagement";
import Garanties from "../components/GarantiesMaxEtLea";
import HeaderPlayboard from "../components/HeaderPlayboard";
import AvisClients from "../components/AvisClients";
import * as product from "../products";
import { AppContext } from "../components/context/AppContext";
import Head from 'next/head';
import Collapsible from 'react-collapsible';
import Recommendation from "../components/Recommendation";
import Recommande from "../components/Recommande";
import CountClients from "../components/CountClients";
import { useTranslation } from "react-i18next";
import { useTheme } from '@material-ui/core/styles';
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import QualiteDansLesDetails from "../components/QualiteDansLesDetails";




const PlayBoardScreen = props => {

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { t, i18n } = useTranslation();

  const icon = React.createElement('i', { className: 'far fa-question-circle' }, "");
  const title1 = React.createElement('p', {}, t("FAQtitle1"));
  const faqHeader1 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title1]);
  const title2 = React.createElement('p', {}, t("FAQtitle2"));
  const faqHeader2 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title2]);
  const title3 = React.createElement('p', {}, t("FAQtitle3"));
  const faqHeader3 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title3]);
  const title4 = React.createElement('p', {}, t("FAQtitle4"));
  const faqHeader4 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title4]);
  const title5 = React.createElement('p', {}, t("FAQtitle5"));
  const faqHeader5 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title5]);
  const title6 = React.createElement('p', {}, t("FAQtitle6"));
  const faqHeader6 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title6]);
  const title7 = React.createElement('p', {}, t("FAQtitle7"));
  const faqHeader7 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title7]);
  const title8 = React.createElement('p', {}, t("FAQtitle8"));
  const faqHeader8 = React.createElement('div', { className: 'faqHeaderContainer' }, [icon, title8]);

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
  const width = 100
  React.useEffect(() => {
    setValue(0.98 * width);
  });




  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2100,
  };



  const [cart, setCart] = useContext(AppContext);
  const products = product.products

  const getFloatVal = (string) => {
    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)) : '';
  };

  const addFirstProduct = (product,qty) => {
    let productPrice = getFloatVal(product.price)

    let newCart = {
      products: [],
      totalProductCount: qty,
      totalProductsPrice: productPrice * qty
    }

    const newProduct = createNewProduct(product, productPrice, qty)
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
      slug: product.slug,
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
        const qtyToBeAdded = productCount
        const updatedCart = updateCart(existingCart, products[2], qtyToBeAdded);
        setCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[2],productCount);
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


  return (
    <div>
      <HeaderPlayboard />
      <Head>
        <title>Max And Lea - PlayBoard</title>
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
      <div className="page-supercontainer">

        <div className="container1200">
          <div className="imgCouverture">
            <div className="playboard-title-container">
              <h1 className="playboard-title">{t("PlayboardTitle")}</h1>
            </div>
            <div className="playboard-paragraph-container">
              <p className="playboard-paragraph">{t("Playboard1")}</p>
            </div>
            <div className="voir-offre">
              <Link href="#offre"><h3 className="voir-offre-title">{t("Playboard2")}</h3></Link>
            </div>
            <div className="video-container">
              <ReactPlayer
                url={t("PlayboardVideo1")}
                className="video-presentation"
                playing={true}
                muted
                height="100%"
                width="100%"
                loop
              />
            </div>

          </div>
        </div>
        <div className="mainContainer pensee-container">
          <div className="container1000">
            <div className="img-bebe-container">
              <img src={"/bebeIcone.png"} alt="" className="img-bebe" />
            </div>
            <div className="pensee-paragraph-container">
              <p className="pensee-paragraph">{t("Playboard3")}</p>
            </div>

            <div className="icone-container1">
              <div className="row">

                <div className="col icone-mini-container">
                  <img src={'/creativite.png'} alt="" />
                  <p>{t("Playboard4")}<br /><span>{t("Playboard5")}</span></p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/habilite.png'} alt="" />
                  <p>{t("Playboard6")} <br /><span>{t("Playboard7")}</span></p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/motricite.png'} alt="" />
                  <p>{t("Playboard8")}<br /><span>{t("Playboard9")}</span></p>
                </div>
              </div>

              <div className="row">

                <div className="col icone-mini-container">
                  <img src={'/concentration.png'} alt="" />
                  <p>{t("Playboard10")}<br /><span>{t("Playboard11")}</span></p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/apprendre.png'} alt="" />
                  <p>{t("Playboard12")}<br /><span>{t("Playboard13")}</span></p>
                </div>

                <div className="col icone-mini-container">
                  <img src={'/autonomie.png'} alt="" />
                  <p>{t("Playboard14")}<br /><span>{t("Playboard15")}</span></p>
                </div>

              </div>
            </div>
          </div>
        </div>



        <div className="container1000">
          <div className="image-recap-container">
            <img src={'/playboardIMG.webp'} alt="" className="image-recap" />
          </div>
        </div>

        <div className="container1000">
          <div className="huitEnUnContainerText">
            <p className="huitEnUnBigText">{t("Playboard16")}</p>
            <p className="huitEnUnText">{t("Playboard17")}</p>
          </div>
        </div>

        <div className="container1000">
          <div className="containerIcones2">
            <div className="row">

              <div className="col miniIconeContainer2">
                <img src={'/calcul.png'} alt="" />
                <h5>{t("Playboard18")}</h5>
                <p>{t("Playboard19")}<span>{t("Playboard20")}</span>{t("Playboard21")}<span>{t("Playboard22")}</span>{t("Playboard23")}<span>{t("Playboard24")}</span>{t("Playboard25")}<span>{t("Playboard26")}</span>{t("Playboard27")}<span>{t("Playboard28")}</span></p>
              </div>


              <div className="col miniIconeContainer2">
                <img src={'/couleur.png'} alt="" />
                <h5>{t("Playboard29")}</h5>
                <p>{t("Playboard30")} <span>{t("Playboard30.1")}</span>{t("Playboard30.2")} <span>{t("Playboard30.3")}</span> {t("Playboard30.4")} <span>{t("Playboard30.5")}</span>{t("Playboard30.6")} <span>{t("Playboard30.7")}</span></p>
              </div>


              <div className="col miniIconeContainer2">
                <img src={'/degrade.png'} alt="" />
                <h5>{t("Playboard31")}</h5>
                <p>{t("Playboard32")}<span>{t("Playboard32.1")}</span>{t("Playboard32.2")}<span>{t("Playboard32.3")}</span>{t("Playboard32.4")}<span>{t("Playboard32.5")}</span>{t("Playboard32.4")}<span>{t("Playboard32.7")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <img src={'/eveil.png'} alt="" />
                <h5>{t("Playboard33")}</h5>
                <p>{t("Playboard34")}<span>{t("Playboard34.1")}</span>{t("Playboard34.2")}<span>{t("Playboard34.3")}</span></p>
              </div>

            </div>

            <div className="row">

              <div className="col miniIconeContainer2">
                <img src={'/animaux.png'} alt="" />
                <h5>{t("Playboard35")}</h5>
                <p>{t("Playboard36")}<span>{t("Playboard36.1")}</span>{t("Playboard36.2")}<span>{t("Playboard36.3")}</span>{t("Playboard36.4")}<span>{t("Playboard36.5")}</span>{t("Playboard36.6")}<span>{t("Playboard36.7")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <img src={'/formes.png'} alt="" />
                <h5>{t("Playboard37")}</h5>
                <p>{t("Playboard38")}<span>{t("Playboard38.1")}</span>{t("Playboard38.2")}<span>{t("Playboard38.3")}</span>{t("Playboard38.4")}<span>{t("Playboard38.5")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <img src={'/coordination.png'} alt="" />
                <h5>{t("Playboard39")}</h5>
                <p>{t("Playboard40")}<span>{t("Playboard40.1")}</span>{t("Playboard40.2")}<span>{t("Playboard40.3")}</span>{t("Playboard40.4")}<span>{t("Playboard40.5")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <img src={'/nombres.png'} alt="" />
                <h5>{t("Playboard41")}</h5>
                <p>{t("Playboard42")}<span>{t("Playboard42.1")}</span>{t("Playboard42.2")}<span>{t("Playboard42.3")}</span>{t("Playboard42.4")}<span>{t("Playboard42.5")}</span>{t("Playboard42.6")}<span>{t("Playboard42.7")}</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="container1000 videoMidContainer">
          <img src={'/playboardBois.png'} alt="" className="playboardBoisImg" />
          <ReactPlayer
            url={t("PlayboardVideo2")}
            width="100%"
            height="390px"
            className="video-presentation"
            playing={true}
            muted
            loop
          />
        </div>

        <div className="container1000">
          <div className="UnaSixContainer container">
            <h2 className="UnaSixTitle">{t("Playboard43")}<span>{t("Playboard44")}</span>{t("Playboard45")}<span>{t("Playboard46")}</span>{t("Playboard47")}</h2>
            <div className="UnaSixDescription">
              <p className="">{t("Playboard48")}<span>{t("Playboard49")}®</span>{t("Playboard50")}</p>
            </div>
          </div>
        </div>

        <div className="container1000">
          <div className="imagesContainer container">
            <div className="row rowDevelopment">
              <div className="col">
                <div className="photoDescriptionContainer">
                  <div className="imgDevelopmentContainer">
                    <img src={'/bebeBrasTendu.webp'} alt="bebe qui s'amuse" className="imgDevelopment" />
                  </div>
                  <div className="listeDevelopment">
                    <p className="developmentTitle" style={{ color: '#02B3C8' }}>{t("Playboard51")}</p>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#02B3C8' }} />
                      <p>{t("Playboard52")}<span>{t("Playboard53")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#02B3C8' }} />
                      <p>{t("Playboard54")}<span>{t("Playboard55")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#02B3C8' }} />
                      <p>{t("Playboard56")}<span>{t("Playboard57")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#02B3C8' }} />
                      <p>{t("Playboard58")}<span>{t("Playboard59")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#02B3C8' }} />
                      <p>{t("Playboard60")}<span>{t("Playboard61")}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="photoDescriptionContainer">
                  <div className="imgDevelopmentContainer">
                    <img src={'/bebeDeuxAns.webp'} alt="bebe deux ans" className="imgDevelopment" />
                  </div>
                  <div className="listeDevelopment">
                    <p className="developmentTitle" style={{ color: '#31A73A' }}>{t("Playboard611")}</p>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#31A73A' }} />
                      <p>{t("Playboard62")}<span>{t("Playboard63")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#31A73A' }} />
                      <p>{t("Playboard64")}<span>{t("Playboard65")}</span> </p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#31A73A' }} />
                      <p>{t("Playboard66")}<span>{t("Playboard67")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#31A73A' }} />
                      <p>{t("Playboard68")}<span>{t("Playboard69")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#31A73A' }} />
                      <p>{t("Playboard70")}<span>{t("Playboard71")}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row rowDevelopment">
              <div className="col">
                <div className="photoDescriptionContainer reverse">
                  <div className="imgDevelopmentContainer">
                    <img src={'/FilletteSouriante.webp'} alt="Fillette souriante" className="imgDevelopment" />
                  </div>
                  <div className="listeDevelopment">
                    <p className="developmentTitle" style={{ color: '#F28D2A' }}>{t("Playboard711")}</p>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#F28D2A' }} />
                      <p>{t("Playboard72")}<span>{t("Playboard73")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#F28D2A' }} />
                      <p>{t("Playboard74")}<span>{t("Playboard75")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#F28D2A' }} />
                      <p>{t("Playboard76")}<span>{t("Playboard77")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#F28D2A' }} />
                      <p>{t("Playboard78")}<span>{t("Playboard79")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: '#F28D2A' }} />
                      <p>{t("Playboard80")}<span>{t("Playboard81")}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="photoDescriptionContainer reverse">
                  <div className="imgDevelopmentContainer">
                    <img src={'/garcon-assis.webp'} alt="Garcon assis" className="imgDevelopment" />
                  </div>
                  <div className="listeDevelopment">
                    <p className="developmentTitle" style={{ color: 'rgba(191, 20, 180, 0.7686274509803922)' }}>{t("Playboard811")}</p>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: 'rgba(191, 20, 180, 0.7686274509803922)' }} />
                      <p>{t("Playboard82")}<span>{t("Playboard83")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: 'rgba(191, 20, 180, 0.7686274509803922)' }} />
                      <p>{t("Playboard84")}<span>{t("Playboard85")}</span> </p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: 'rgba(191, 20, 180, 0.7686274509803922)' }} />
                      <p>{t("Playboard86")}<span>{t("Playboard87")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: 'rgba(191, 20, 180, 0.7686274509803922)' }} />
                      <p>{t("Playboard88")}<span>{t("Playboard89")}</span></p>
                    </div>
                    <div className="innerItemList">
                      <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{ color: 'rgba(191, 20, 180, 0.7686274509803922)' }} />
                      <p>{t("Playboard90")}<span>{t("Playboard91")}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container1000">
          <div className="apprentissage container">
            <h5>{t("Playboard92")}</h5>
            <div className="flex w-100 enfantTableau2">
              <div className="enfantTableauContainer">
                <img src={'/garconTableau.png'} alt="" className="enfantTableau" />
              </div>
              <div className="barreProgression">
                <div className="mb-2">
                  <p style={{ color: "#e72c59" }}>{t("Playboard93")}</p>
                  <div className="rectangleContainer">
                    <img src={'/redP.webp'} alt="" className="rectangle" />
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{ color: "#e59131" }}>{t("Playboard94")}</p>
                  <div className="rectangleContainer">
                    <img src={'/orangeP.webp'} alt="" className="rectangle" />
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{ color: "#efcb03" }}>{t("Playboard95")}</p>
                  <div className="rectangleContainer">
                    <img src={'/yellowP.webp'} alt="" className="rectangle" />
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{ color: "#4cb155" }}>{t("Playboard96")}</p>
                  <div className="rectangleContainer">
                    <img src={'/greenP.webp'} alt="" className="rectangle" />
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{ color: "#22b9ca" }}>{t("Playboard97")}</p>
                  <div className="rectangleContainer">
                    <img src={'/blueP.webp'} alt="" className="rectangle" />
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{ color: "#e7456c" }}>{t("Playboard98")}</p>
                  <div className="rectangleContainer">
                    <img src={'/pinkP.webp'} alt="" className="rectangle" />
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{ color: "#c436bc" }}>{t("Playboard99")}</p>
                  <div className="rectangleContainer">
                    <img src={'/purpleP.webp'} alt="" className="rectangle" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="container1000">
          <div className="image-papa-container">
            <img src={'/papafille.webp'} alt="" className="image-recap" />
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
                  <div className="playboardPrix">
                    <p className="priceFalse">49,90 €</p>
                    <p className="playboardRedPrice">29,90 €    <span className="reduction">{t("Playboard100")}</span></p>
                  </div>
                  <div>
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
                </div>


                <div className="ebooksContainer">
                  <p className="ebookTitle">{t("Playboard103")}</p>
                  <div className="ebook">
                    <img src={'/internet4.svg'} alt="" />
                    <p>{t("Playboard104")}</p>
                  </div>
                  <div className="ebook">
                    <img src={'/internet5.svg'} alt="" />
                    <p>{t("Playboard105")}</p>
                  </div>
                  <div className="ebook">
                    <img src={'/internet6.svg'} alt="" />
                    <p>{t("Playboard106")}</p>
                  </div>
                </div>

                <div className="sacRangement">
                  <p className="ebookTitle">{t("Playboard107")}</p>
                  <div className="ebookOffertText">
                    <img src={'/internet7.webp'} alt="" />
                    <p>{t("Playboard108")}</p>
                  </div>
                </div>

                <div className="playboardImgContainer" onClick={() => setOpen(true)}>
                  <img src={t("PlayboardImgOffre")} alt="" className="reducImg" />
                </div>

                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogContent>
                    <div>
                      <img src={t("Checkout.popUpImg")} alt="" style={{ maxWidth: '100%' }} />
                      <button className="buttonPopupClose" onClick={() => setOpen(false)}>x</button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        <div className="container1000">
          <div className="sourireContainer container">
            <div className="sourireTextContainer">
              <h5>{t("Playboard109")}</h5>
            </div>
          </div>
        </div>

        <div className="container1000 videoMidContainer">
          <ReactPlayer
            url="/Patchwork.mp4"
            width="100%"
            height="390px"
            className="video-presentation"
            playing={true}
            muted
            loop
          />
        </div>

        <div className="container1000">
          <div className="recommendation">
            <Recommendation />
          </div>
        </div>

        <div className="container1200">
          <h5 className="recommendation-title">{t("Playboard110")}</h5>
          <Recommande />
        </div>

        <div className="container1000">
          <Engagement />
        </div>

        <div className="container1000">
          <div className="sourireEnfantImgContainer">
            <img src={'/sourireEnfant.webp'} alt="" className="sourireEnfant" />
          </div>
        </div>

        <div className="mainContainer garantiesContainer">
          <div className="container1000">
            <Garanties />
          </div>
        </div>

        <div className="container1200">
          <QualiteDansLesDetails />
        </div>

        <div className="container1000">
          <div className="faqContainer">
            <h5>{t("Playboard111")}</h5>
            <div className="row">
              <div className="col">
                <Collapsible trigger={faqHeader1}>
                  <p>{t("Playboard112")}</p>
                </Collapsible>
                <Collapsible trigger={faqHeader2}>
                  <p>{t("Playboard113")}</p>
                </Collapsible>
                <Collapsible trigger={faqHeader3}>
                  <p>{t("Playboard114")}</p>
                </Collapsible>
                <Collapsible trigger={faqHeader4}>
                  <p>{t("Playboard115")}
                    <a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a>
                    {t("Playboard1151")}<a href="/contact/" target="_blank" rel="noopener">{t("Playboard1152")}</a>{t("Playboard1153")}
                  </p>
                </Collapsible>
              </div>
              <div className="col">
                <Collapsible trigger={faqHeader5}>
                  <p>{t("Playboard116")}</p>
                </Collapsible>
                <Collapsible trigger={faqHeader6}>
                  <p>
                    {t("Playboard117")}<img src={'/internet9.webp'} />).
                    {t("Playboard1171")}
                  </p>
                </Collapsible>
                <Collapsible trigger={faqHeader7}>
                  <p>{t("Playboard118")}<a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a>{t("Playboard1151")}<a href="/contact/" target="_blank" rel="noopener">{t("Playboard1152")}</a>.</p>
                </Collapsible>
                <Collapsible trigger={faqHeader8}>
                  <p>{t("Playboard119")}<a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a>{t("Playboard1151")}<a href="/contact/" target="_blank" rel="noopener">{t("Playboard1152")}</a>{t("Playboard1153")}.</p>
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

export default PlayBoardScreen;
