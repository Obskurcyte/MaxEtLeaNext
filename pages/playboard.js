import React, {useContext, useEffect, useRef, useState} from 'react';
import ReactPlayer from 'react-player'
import Link from 'next/link';
import Footer from "../components/Footer";
import Engagement from "../components/Engagement";
import Garanties from "../components/GarantiesMaxEtLea";
import HeaderPlayboard from "../components/HeaderPlayboard";
import AvisClients from "../components/AvisClients";
import * as product from "../products";
import {AppContext} from "../components/context/AppContext";
import Head from 'next/head';
import Collapsible from 'react-collapsible';
import Recommendation from "../components/Recommendation";
import Recommande from "../components/Recommande";
import {useTranslation} from "react-i18next";
import { useTheme } from '@material-ui/core/styles';
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useRouter} from "next/router";
import QualiteDansLesDetails from "../components/QualiteDansLesDetails";

const icon = React.createElement('i', { className: 'far fa-question-circle' }, "");
const title1 = React.createElement('p', {}, "La PlayBoard s'abime-t-elle avec le temps ?");
const faqHeader1 = React.createElement('div', {className: 'faqHeaderContainer' }, [icon,title1]);
const title2 = React.createElement('p', {}, "A partir de quel âge mon enfant peut-il commencer à jouer avec ?");
const faqHeader2 = React.createElement('div', {className: 'faqHeaderContainer' }, [icon,title2]);
const title3 = React.createElement('p', {}, "Jusqu'à quel âge la PlayBoard est-elle recommandée ?");
const faqHeader3 = React.createElement('div', {className: 'faqHeaderContainer' }, [icon,title3]);
const title4 = React.createElement('p', {}, "Je n’ai pas reçu mes E-Books OFFERTS avec ma commande ? ");
const faqHeader4 = React.createElement('div', {className: 'faqHeaderContainer' }, [icon,title4]);
const title5 = React.createElement('p', {}, "Comment récupérer mon sac de rangement OFFERT ?");
const faqHeader5 = React.createElement('div', {className: 'faqHeaderContainer' }, [icon,title5]);
const title6 = React.createElement('p', {}, "En combien de temps vais-je recevoir ma PlayBoard ?");
const faqHeader6 = React.createElement('div', {className: 'faqHeaderContainer' }, [icon,title6]);
const title7 = React.createElement('p', {}, "Si je vis hors Europe, comment puis-je acquérir la PlayBoard ?");
const faqHeader7 = React.createElement('div', {className: 'faqHeaderContainer' }, [icon,title7]);
const title8 = React.createElement('p', {}, "J’ai une question ou une remarque ?");
const faqHeader8 = React.createElement('div', {className: 'faqHeaderContainer' }, [icon,title8]);


const PlayBoardScreen = props => {

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
  const width = 100
  React.useEffect(() => {
    setValue(0.98 * width);
  });


  const { t, i18n } = useTranslation();

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

  console.log('products', products)
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
      image: product.image,
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
        <div className="container1000">
          <div className="imgCouverture">
            <div className="playboard-title-container">
              <h1 className="playboard-title">La PlayBoard</h1>
            </div>
            <div className="playboard-paragraph-container">
              <p className="playboard-paragraph">{t("Playboard1")}</p>
            </div>
            <div className="voir-offre">
              <Link href="#offre"><h3 className="voir-offre-title">{t("Playboard2")}</h3></Link>
            </div>
            <div className="video-container">
              <ReactPlayer
              url="https://play.maxandlea.com/wp-content/uploads/2020/09/MaxEtLea-GIF-FR-V4-600-1.mp4"
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
            <img src={"/bebeIcone.png"} alt="" className="img-bebe"/>
          </div>
          <div className="pensee-paragraph-container">
            <p className="pensee-paragraph">{t("Playboard3")}</p>
          </div>

          <div className="icone-container1">
          <div className="row">

            <div className="col icone-mini-container">
              <img src={'/creativite.png'} alt=""/>
              <p>{t("Playboard4")}<br/>{t("Playboard5")}</p>
            </div>

            <div className="col icone-mini-container">
              <img src={'/habilite.png'} alt=""/>
              <p>{t("Playboard6")} <br/>{t("Playboard7")}</p>
            </div>

            <div className="col icone-mini-container">
              <img src={'/motricite.png'} alt=""/>
              <p>{t("Playboard8")}<br/>{t("Playboard9")}</p>
            </div>
          </div>

          <div className="row">

            <div className="col icone-mini-container">
              <img src={'/concentration.png'} alt=""/>
              <p>{t("Playboard1O")}<br/>{t("Playboard11")}</p>
            </div>

            <div className="col icone-mini-container">
              <img src={'/apprendre.png'} alt=""/>
              <p>{t("Playboard12")}<br/>{t("Playboard13")}</p>
            </div>

            <div className="col icone-mini-container">
              <img src={'/autonomie.png'} alt=""/>
              <p>{t("Playboard14")}<br/>{t("Playboard15")}</p>
            </div>

          </div>
        </div>
        </div>
        </div>

        

        <div className="container1000">
        <div className="image-recap-container">
          <img src={'/playboardIMG.webp'} alt="" className="image-recap"/>
        </div>
        </div>

        <div className="container1000">
        <div className="huitEnUnContainerText">
          <p className="huitEnUnBigText">8 en 1</p>
          <p className="huitEnUnText">L'outil d'éveil et d'apprentissage le plus complet du marché</p>
        </div>
        </div>

        <div className="container1000">
        <div className="containerIcones2">
          <div className="row">

            <div className="col miniIconeContainer2">
              <img src={'/calcul.png'} alt=""/>
              <h5>CALCUL</h5>
              <p>Les signes et les nombres lui permettront de réaliser différents calculs simples et d'évoluer vers des calculs plus complexes</p>
            </div>


            <div className="col miniIconeContainer2">
              <img src={'/couleur.png'} alt=""/>
              <h5>COULEURS</h5>
              <p>L'outil idéal pour la mémoire des couleurs, pour les découvrir et les reconnaitre. Aide à développer ses aptitudes visuelles et mentales</p>
            </div>


            <div className="col miniIconeContainer2">
              <img src={'/degrade.png'} alt=""/>
              <h5>DEGRADES DE COULEUR</h5>
              <p>Découvrir les contrastes et les dégradés de couleurs pour développer sa sensibilité visuelle et artistique.</p>
            </div>

            <div className="col miniIconeContainer2">
              <img src={'/eveil.png'} alt=""/>
              <h5>EVEIL</h5>
              <p>Votre enfant prendra plaisir à jouer des heures entières avec sa PlayBoard et développera sa créativité.</p>
            </div>

          </div>

          <div className="row">

            <div className="col miniIconeContainer2">
              <img src={'/animaux.png'} alt=""/>
              <h5>ANIMAUX</h5>
              <p>Il découvrira les animaux grâce à des représentations mignonnes et réalistes et apprendra à les associer avec leur alimentation.</p>
            </div>

            <div className="col miniIconeContainer2">
              <img src={'/formes.png'} alt=""/>
              <h5>FORMES</h5>
              <p>Plus de 20 formes géométriques simples et complexes pour un maximum de plaisir et travailler sa motricité fine.</p>
            </div>

            <div className="col miniIconeContainer2">
              <img src={'/coordination.png'} alt=""/>
              <h5>COORDINATION</h5>
              <p>Empiler différentes formes géométriques pour travailler sa coordination et son habileté.</p>
            </div>

            <div className="col miniIconeContainer2">
              <img src={'/nombres.png'} alt=""/>
              <h5>NOMBRE</h5>
              <p>A force de jouer avec les chiffres, leur maîtrise devient naturelle et instinctive. Ce qui favorise sa mémoire des chiffres.</p>
            </div>

          </div>
        </div>
        </div>
        
        <div className="container1000 videoMidContainer">
        <img src={'/playboardBois.png'} alt="" className="playboardBoisImg"/>
        <ReactPlayer
                url="https://play.maxandlea.com/wp-content/uploads/2020/09/Video2-MAXLEA-FR-SHORT-SHORT-V4-600.mp4"
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
          <h2 className="UnaSixTitle">DE <span> 1 </span> A <span> 6 </span> ANS</h2>
          <div className="UnaSixDescription">
          <p className="">La <span>Playboard®</span> accompagne votre
            enfant à chaque étape de
            son développement.</p>
          </div>
        </div>
        </div>

        <div className="container1000">
        <div className="imagesContainer container">
          <div className="row rowDevelopment">
            <div className="col">
              <div className="photoDescriptionContainer">
                <div className="imgDevelopmentContainer">
                  <img src="https://play.maxandlea.com/wp-content/uploads/2020/10/Be%CC%81be%CC%81Mouvements-MaxAndLea-2.jpg" alt="bebe qui s'amuse" className="imgDevelopment"/>
                </div>
                <div className="listeDevelopment">
                  <p className="developmentTitle" style={{color: '#02B3C8'}}>Pour les 1-2 ans</p>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#02B3C8'}}/>
                    <p>Il travaille son <span>habilité</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#02B3C8'}}/>
                    <p>Il découvre les <span>formes</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#02B3C8'}}/>
                    <p>Il assimile les <span>couleurs</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#02B3C8'}}/>
                    <p>Il reconnait les <span>animaux</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#02B3C8'}}/>
                    <p>Il améliore sa <span>coordination oeil-main</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="photoDescriptionContainer">
                <div className="imgDevelopmentContainer">
                  <img src="https://play.maxandlea.com/wp-content/uploads/2020/10/Be%CC%81be%CC%812ans-1862x2048.jpg" alt="bebe qui s'amuse" className="imgDevelopment"/>
                </div>
                <div className="listeDevelopment">
                  <p className="developmentTitle" style={{color: '#31A73A'}}>Pour les 2-3 ans</p>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#31A73A'}}/>
                    <p>Il affine sa <span>motricité</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#31A73A'}}/>
                    <p>Il s'exerce à empiler <span>les anneaux et les formes</span> </p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#31A73A'}}/>
                    <p>Il distingue les <span>nuances de couleur</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#31A73A'}}/>
                    <p>Il s'habitue à <span>compter sur ses doigts</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#31A73A'}}/>
                    <p>Il apprend à <span>compter jusqu'à cinq</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row rowDevelopment">
            <div className="col">
              <div className="photoDescriptionContainer reverse">
                <div className="imgDevelopmentContainer">
                  <img src="https://play.maxandlea.com/wp-content/uploads/2020/10/FilletteSouriante-802x1024.jpg" alt="bebe qui s'amuse" className="imgDevelopment"/>
                </div>
                <div className="listeDevelopment">
                  <p className="developmentTitle" style={{color: '#F28D2A'}}>Pour les 3-4 ans</p>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#F28D2A'}}/>
                    <p>Il développe son <span>autonomie</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#F28D2A'}}/>
                    <p>Il fait travailler son <span>imagination</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#F28D2A'}}/>
                    <p>Il apprend à <span>compter jusqu'à 10</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#F28D2A'}}/>
                    <p>Il découvre les <span>calculs simples</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: '#F28D2A'}}/>
                    <p>Il relie les <span>animaux à leur alimentation</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="photoDescriptionContainer reverse">
                <div className="imgDevelopmentContainer">
                  <img src={'/garconAssis.webp'} alt="bebe qui s'amuse" className="imgDevelopment"/>
                </div>
                <div className="listeDevelopment">
                  <p className="developmentTitle" style={{color: 'rgba(191, 20, 180, 0.7686274509803922)'}}>Pour les 4-6 ans</p>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: 'rgba(191, 20, 180, 0.7686274509803922)'}}/>
                    <p>Il améliore sa <span>concentration</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: 'rgba(191, 20, 180, 0.7686274509803922)'}}/>
                    <p>Il joue avec la tablette et prend <span>plaisir à apprendre</span> </p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: 'rgba(191, 20, 180, 0.7686274509803922)'}}/>
                    <p>Il <span>progresse en calcul</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: 'rgba(191, 20, 180, 0.7686274509803922)'}}/>
                    <p>Il apprend à <span>partager et à enseigner à plus petit que lui</span></p>
                  </div>
                  <div className="innerItemList">
                    <FontAwesomeIcon icon={faChevronRight} className="iconDevelopment" style={{color: 'rgba(191, 20, 180, 0.7686274509803922)'}}/>
                    <p>Il apprend à <span>organiser son espace</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        <div className="container1000">
        <div className="apprentissage container">
            <h5>Ce que les enfants ont appris
              avec la PlayBoard®</h5>
          <div className="flex w-100 enfantTableau2">
            <div className="enfantTableauContainer">
              <img src={'/garconTableau.png'} alt="" className="enfantTableau"/>
            </div>
            <div className="barreProgression">
                <div className="mb-2">
                  <p style={{color:"#e72c59"}}>Reconnaître les couleurs</p>
                  <div className="rectangleContainer">
                    <img src={'/redP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{color:"#e59131"}}>Maîtriser les dégradés</p>
                  <div className="rectangleContainer">
                    <img src={'/orangeP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{color:"#efcb03"}}>Emboiter les formes</p>
                  <div className="rectangleContainer">
                    <img src={'/yellowP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{color:"#4cb155"}}>Apprendre à compter</p>
                  <div className="rectangleContainer">
                    <img src={'/greenP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{color:"#22b9ca"}}>Reconnaitre les animaux</p>
                  <div className="rectangleContainer">
                    <img src={'/blueP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{color:"#e7456c"}}>Débuter en calcul</p>
                  <div className="rectangleContainer">
                    <img src={'/pinkP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div className="mb-2">
                  <p style={{color:"#c436bc"}}>Plaisir de jouer</p>
                  <div className="rectangleContainer">
                    <img src={'/purpleP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
            </div>

          </div>
        </div>
        </div>

        {/*   <div className="apprentissagePlayboard container">
          <h5 className="apprentissageTitle">Ce que les enfants ont appris avec la PlayBoard</h5>
          <div className="imageApprentissageContainer">
            <img src={'/enfantTableau.jpg'} alt="" className="imgTableau"/>
            <div className="progressContainer">
              <p className="apprentissagePara">Reconnaitre les couleurs</p>
              <div id='progress1' ref={bar1}>

                <div id="bar1">
                    <p className="progressBarText2">98%</p>
                </div>
                {/*<img src={'/redProgress.png'} alt="" className="progress"/>
              </div>
              <div>
                <p className="apprentissagePara">Maitriser les dégradés</p>
                <div id='progress2' ref={bar2}>

                  <div id="bar2">
                    <p className="progressBarText2">97%</p>
                  </div>
                  {/*<img src={'/redProgress.png'} alt="" className="progress"/>
                </div>
              </div>
              <div>
                <p className="apprentissagePara">Emboiter les formes</p>
                <div id='progress3' ref={bar3}>

                  <div id="bar3">
                    <p className="progressBarText2">96%</p>
                  </div>
                  {/*<img src={'/redProgress.png'} alt="" className="progress"/>
                </div>
              </div>
              <div>
                <p className="apprentissagePara">Apprendre à compter</p>
                <div id='progress4' ref={bar4}>

                  <div id="bar4">
                    <p className="progressBarText2">98%</p>
                  </div>
                  {/*<img src={'/redProgress.png'} alt="" className="progress"/>
                </div>
              </div>
              <div>
                <p className="apprentissagePara">Reconnaitre les animaux</p>
                <div id='progress5' ref={bar5}>

                  <div id="bar5">
                    <p className="progressBarText2">90%</p>
                  </div>
                  {/*<img src={'/redProgress.png'} alt="" className="progress"/>
                </div>
              </div>
              <div>
                <p className="apprentissagePara">Débuter en calcul</p>
                <div id='progress6' ref={bar6}>

                  <div id="bar6">
                    <p className="progressBarText2">92%</p>
                  </div>
                  {/*<img src={'/redProgress.png'} alt="" className="progress"/>
                </div>
              </div>
              <div>
                <p className="apprentissagePara">Plaisir de jouer</p>
                <div id='progress7' ref={bar7}>

                  <div id="bar7">
                    <p className="progressBarText2">100%</p>
                  </div>
                  {/*<img src={'/redProgress.png'} alt="" className="progress"/>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="container1000">
          <div className="image-recap-container">
            <img src={'/papafille.webp'} alt="" className="image-recap"/>
          </div>
        </div>

        <div className="container1000">
          <div className="clientSatisfait">
            <h5>6867 clients déjà satisfaits</h5>
          </div>
        </div>

        <div className="container1000">
          <div>
            <AvisClients/>
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
                <p className="playboardRedPrice">29,90 €    <span className="reduction">(-40%, économisez 20€)</span></p>
              </div>
              <div>
              <div onClick={() => {
              handleAddToCart()
              router.push('/checkout')
            }}
             className="ajouterPanierContainer">
                <p>Ajouter au panier</p>
              </div>
              <p className="question" onClick={async () => {
                await router.push('/contact')
              }}>Une question ? Contactez-nous</p>
              </div>
            </div>


            <div className="ebooksContainer">
              <p className="ebookTitle">3 ebooks GRATUITS avec votre commande : </p>
              <div className="ebook">
                <img src="https://play.maxandlea.com/wp-content/uploads/2020/05/dot_1-1.svg" alt="" />
                <p>1 guide d'activités pour enfants</p>
              </div>
              <div className="ebook">
                <img src="https://play.maxandlea.com/wp-content/uploads/2020/05/dot_4.svg" alt="" />
                <p>1 livre de contes</p>
              </div>
              <div className="ebook">
                <img src="https://play.maxandlea.com/wp-content/uploads/2020/05/dot_3t.svg" alt="" />
                <p>1 cahier de coloriage</p>
              </div>
            </div>

            <div className="sacRangement">
              <p className="ebookTitle">1 sac de rangement OFFERT :</p>
              <div className="ebookOffertText">
                <img src="https://play.maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-copie-6.png" alt=""/>
                <p>Conçu pour ranger les pièces de la Playboard</p>
              </div>
            </div>

            <div className="playboardImgContainer" onClick={() => setOpen(true)}>
              <img src="https://play.maxandlea.com/wp-content/uploads/2020/05/fr2.png" alt="" className="reducImg"/>
            </div>

            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogContent>
                <div>
                  <img src={'/popup.png'} alt="" style={{maxWidth: '100%'}}/>
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
          <h5>LE SOURIRE DE VOS ENFANTS
            NOTRE PLUS BELLE RECOMPENSE</h5>
          </div>
        </div>
        </div>

        <div className="container1000 videoMidContainer">
        <ReactPlayer
                url="https://play.maxandlea.com/wp-content/uploads/2020/09/Patchwork-V3-600.mp4"
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
          <h5 className="recommendation-title">Ils recommandent la Playboard®</h5>
            <Recommande />
        </div>

        <div className="container1000">
          <Garanties/>
        </div>
        
        <div className="container1000">
        <div className="sourireEnfantImgContainer">
          <img src={'/sourireEnfant.webp'} alt="" className="sourireEnfant"/>
        </div>
        </div>

        <div className="container1000">
          <Engagement/>
        </div>

        <div className="container1000">
          <QualiteDansLesDetails />
        </div>

        <div className="container1000">
        <div className="faqContainer">
        <h5>QUESTIONS FRÉQUENTES</h5>
          <div className="row">
            <div className="col">
                <Collapsible trigger={faqHeader1}>
                  <p>
                  La PlayBoard est conçue à base de hêtre, un bois solide et résistant. L’ensemble de ses pièces sont parfaitement peintes, ce qui leur donne une durée de vie de plusieurs dizaines d’années en restant intactes.
                  </p>
                </Collapsible>
                <Collapsible trigger={faqHeader2}>
                  <p>
                  La PlayBoard est certifiée CE à partir de 12 mois. Les études montrent qu’à partir de 7 mois le jeune enfant commence à prendre des jouets dans ses mains et dès 10 mois sa motricité fine se développe. Il peut donc commencer à jouer avec sa tablette très tôt. Nous recommandons toujours qu’un adulte surveille le jeune enfant pendant qu’il joue pour éviter tout risque.
                  </p>
                </Collapsible>
                <Collapsible trigger={faqHeader3}>
                  <p>
                  Nous recommandons la PlayBoard jusqu’à 6 ans, mais il n’est pas rare de voir des enfants de plus de 6 ans continuer à l’utiliser car elle leur sert à apprendre le calcul.
                  </p>
                </Collapsible>
                <Collapsible trigger={faqHeader4}>
                <p>
                  Lors de l’achat de votre PlayBoard, un e-mail contenant les liens pour télécharger vos E-books vous est automatiquement envoyé par e-mail. Cet email est peut parfois se retrouver dans vos spams. Si vous ne le trouvez pas, n’hésitez pas à nous contacter à <a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a> ou via <a href="https://maxandlea.com/fr/contact/" target="_blank" rel="noopener">notre formulaire</a>, nous vous le renverrons avec plaisir.
                </p>
                </Collapsible>
            </div>
            <div className="col">
                <Collapsible trigger={faqHeader5}>
                  <p>
                  Le sac de rangement est inséré dans l’emballage de votre PlayBoard, vous le découvrirez donc lors de la reception de votre commande.
                  </p>
                </Collapsible>
                <Collapsible trigger={faqHeader6}>
                  <p>
                   La PlayBoard est envoyée depuis notre entrepôt situé à Evreux (France <img src="https://maxandlea.com/wp-content/uploads/2020/06/france-flag-icon-16.png"/>).
Pour une livraison en France (y compris Monaco) nos délais sont de 3 à 5 jours ouvrés (livraison Standard à domicile ou en Point Mondial Relay), et 2 à 3 jours ouvrés en livraison Express.

Pour le reste de l’Europe, nos délais de livraison sont de 5 à 7 jours ouvrés en livraison Standard et 3 à 5 jours en livraison Express.
                  </p>
                </Collapsible>
                <Collapsible trigger={faqHeader7}>
                <p>Max &amp; Lea livre toute l’Europe (y compris Suisse et Royaume Uni), les Etats Unis et le Canada. En dehors de ces zones géographiques nous vous invitons à nous contacter directement par email à <a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a> ou via le <a href="https://maxandlea.com/fr/contact/" target="_blank" rel="noopener">formulaire de contact</a>.</p>
                </Collapsible>
                <Collapsible trigger={faqHeader8}>
                <p>Notre service client est à votre écoute du Lundi au Samedi de 9h à 19h heure Française. Nous nous ferons un plaisir de vous répondre très rapidement (Notre délais moyen de réponse est de 45 minutes). Nous sommes joignable par email à <a href="mailto:contact@maxandlea.com">contact@maxandlea.com</a> ou via le <a href="https://maxandlea.com/fr/contact/" target="_blank" rel="noopener">formulaire de contact</a>.</p>
                </Collapsible>
            </div>
          </div>
        </div>
        </div>

        <Footer/>
      </div>
    )
};

export default PlayBoardScreen;
