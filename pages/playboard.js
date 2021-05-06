import React, {useContext} from 'react';
import ReactPlayer from 'react-player'
import Header from "../components/Header";
import Link from 'next/link';
import Footer from "../components/Footer";
import Engagement from "../components/Engagement";
import Garanties from "../components/GarantiesMaxEtLea";
import HeaderPlayboard from "../components/HeaderPlayboard";
import AvisClients from "../components/AvisClients";
import * as product from "../products";
import {AppContext} from "../components/context/AppContext";
import Head from 'next/head';
import Slider from "react-slick";
import Collapsible from 'react-collapsible';

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

  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 2100,
  };

  var settingsRecommandations = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  const [cart, setCart] = useContext(AppContext);
  const products = product.products

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
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
              integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
              crossorigin="anonymous"
              />
        </Head>
        <div className="imgCouverture">
          <div className="playboard-title-container">
            <h1 className="playboard-title">PLAYBOARD</h1>
          </div>
          <div className="playboard-paragraph-container">
            <p className="playboard-paragraph">La playboard est le jouet le plus complet pour stimuler l'éveil et la motricité fine des enfants !</p>
          </div>
          <div className="video-container">
            <ReactPlayer
            url="https://play.maxandlea.com/wp-content/uploads/2020/09/Video2-MAXLEA-FR-SHORT-SHORT-V4-600.mp4"
            className="video-presentation"
            playing
            height="100%"
            width="100%"
            loop
            playIcon={<img src="https://maxandlea.fr/wp-content/uploads/2021/04/Lire-la-video.png" alt=""/>}
            light="/overlayVideo.webp"
          />
          </div>
          <div className="voir-offre">
            <Link href="#offre"><h3 className="voir-offre-title">Voir notre offre</h3></Link>
          </div>
        </div>

        <div className="pensee-container">
          <div className="img-bebe-container">
            <img src={"/bebeIcone.png"} alt="" className="img-bebe"/>
          </div>
          <div className="pensee-paragraph-container">
            <p className="pensee-paragraph">Pensée pour chaque étape du développement psychomoteur de l'enfant</p>
          </div>
        </div>

        <div className="icone-container1">
          <div className="row">

            <div className="col icone-mini-container">
              <img src={'/creativite.png'} alt=""/>
              <p>Développer <br/>sa Créativité</p>
            </div>

            <div className="col icone-mini-container">
              <img src={'/habilite.png'} alt=""/>
              <p>Améliorer <br/>son habilité</p>
            </div>

            <div className="col icone-mini-container">
              <img src={'/motricite.png'} alt=""/>
              <p>Travailler <br/>sa motricité</p>
            </div>
          </div>

          <div className="row">

            <div className="col icone-mini-container">
              <img src={'/concentration.png'} alt=""/>
              <p>Aiguiser <br/>sa concentration</p>
            </div>

            <div className="col icone-mini-container">
              <img src={'/apprendre.png'} alt=""/>
              <p>Apprendre <br/>en s'amusant</p>
            </div>

            <div className="col icone-mini-container">
              <img src={'/autonomie.png'} alt=""/>
              <p>Développer <br/>l'autonomie</p>
            </div>

          </div>
        </div>

        <div className="image-recap-container">
          <img src={'/imagerecap.webp'} alt="" className="image-recap"/>
        </div>

        <div className="huitEnUnContainerText">
          <p className="huitEnUnText">L'outil 8 en 1 d'éveil et d'apprentissage le plus complet du marché</p>
        </div>

        <div className="containerIcones2">
          <div className="row">

            <div className="col miniIconeContainer2">
              <img src={'/calcul.png'} alt=""/>
              <p>Les signes et les nombres lui permettront de réaliser différents calculs simples et d'évoluer vers des calculs plus complexes</p>
            </div>


            <div className="col miniIconeContainer2">
              <img src={'/couleur.png'} alt=""/>
              <p>L'outil idéal pour la mémoire des couleurs, pour les découvrir et les reconnaitre. Aide à développer ses aptitudes visuelles et mentales</p>
            </div>


            <div className="col miniIconeContainer2">
              <img src={'/degrade.png'} alt=""/>
              <p>Découvrir les contrastes et les dégradés de couleurs pour développer sa sensibilité visuelle et artistique.</p>
            </div>

            <div className="col miniIconeContainer2">
              <img src={'/eveil.png'} alt=""/>
              <p>Votre enfant prendra plaisir à jouer des heures entières avec sa PlayBoard et développera sa créativité.</p>
            </div>

          </div>

          <div className="row">

            <div className="col miniIconeContainer2">
              <img src={'/animaux.png'} alt=""/>
              <p>Il découvrira les animaux grâce à des représentations mignonnes et réalistes et apprendra à les associer avec leur alimentation.</p>
            </div>

            <div className="col miniIconeContainer2">
              <img src={'/formes.png'} alt=""/>
              <p>Plus de 20 formes géométriques simples et complexes pour un maximum de plaisir et travailler sa motricité fine.</p>
            </div>

            <div className="col miniIconeContainer2">
              <img src={'/coordination.png'} alt=""/>
              <p>Empiler différentes formes géométriques pour travailler sa coordination et son habileté.</p>
            </div>

            <div className="col miniIconeContainer2">
              <img src={'/nombres.png'} alt=""/>
              <p>A force de jouer avec les chiffres, leur maîtrise devient naturelle et instinctive. Ce qui favorise sa mémoire des chiffres.</p>
            </div>

          </div>
        </div>

        <div className="playboardBoisContainer">
          <img src={'/playboardBois.png'} alt="" className="playboardBoisImg"/>
        </div>
        <div className="fullwidth computer">
          <div className="videoContainer">
          <div className="video-container">
            <ReactPlayer
                url="https://maxandlea.com/wp-content/uploads/2020/05/Patchwork-V3-600-1.mp4"
                width="100%"
                height="480px"
                className="video-presentation"
                playing
                height="100%"
                width="100%"
                loop
                playIcon={<img src="https://maxandlea.fr/wp-content/uploads/2021/04/Lire-la-video.png" alt=""/>}
                light="/PapaFille.webp"
              />
          </div>
            <div className="robusteContainer row">
              <div className="constructionRobuste col">
                <div><p className="robusteTitle">CONSTRUCTION ROBUSTE EN BOIS</p></div>
                <div><p className="p1">Bois issu de forêts certifiées
                  FSC® et de haute qualité.</p></div>
                <div><p className="p2">Matériaux nobles &
                  construction solide</p></div>
                <div><p className="p3">Une fabrication soignée
                  pour une durabilité maximale.</p></div>
              </div>

              <div className="finitionSoignees col">
                <div><p className="finitionTitle">FINITIONS SOIGNEES</p></div>
                <div><p className="p1">Des couleurs douces et
                  chaleureuses étudiées pour
                  apaiser l’enfant.</p></div>
                <div><p className="p2">Angles biseautés et finitions soignées</p></div>
                <div><p className="p3">Des textures douces et délicates
                  pour une parfaite prise en main.</p></div>
                <div><p className="p4">Des images travaillées pour faciliter
                  la reconnaissance.</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="fullwidth mobile">
          <div className="videoContainer">
          <div className="video-container">
            <ReactPlayer
                url="https://maxandlea.com/wp-content/uploads/2020/05/Patchwork-V3-600-1.mp4"
                width="100%"
                height="480px"
                className="video-presentation"
                playing
                height="100%"
                width="100%"
                loop
                playIcon={<img src="https://maxandlea.fr/wp-content/uploads/2021/04/Lire-la-video.png" alt=""/>}
                light="/PapaFille.webp"
              />
          </div>
            <div className="robusteContainer row">
              <div className="constructionRobuste col">
                <div><p className="robusteTitle">CONSTRUCTION ROBUSTE EN BOIS</p></div>
                <div><p className="p1">Bois issu de forêts certifiées
                  FSC® et de haute qualité.</p></div>
                <div><p className="p2">Matériaux nobles &
                  construction solide</p></div>
                <div><p className="p3">Une fabrication soignée
                  pour une durabilité maximale.</p></div>
              </div>

              <div className="finitionSoignees col">
                <div><p className="finitionTitle">FINITIONS SOIGNEES</p></div>
                <div><p className="p1">Des couleurs douces et
                  chaleureuses étudiées pour
                  apaiser l’enfant.</p></div>
                <div><p className="p2">Angles biseautés et finitions soignées</p></div>
                <div><p className="p3">Des textures douces et délicates
                  pour une parfaite prise en main.</p></div>
                <div><p className="p4">Des images travaillées pour faciliter
                  la reconnaissance.</p></div>
              </div>
            </div>
          </div>
        </div>

        <div className="UnaSixContainer">
          <h2 className="UnaSixTitle">DE <span> 1 </span> A <span> 6 </span> ANS</h2>
          <div className="UnaSixDescription">
          <p className="">La <span>Playboard®</span> accompagne votre
            enfant à chaque étape de
            son développement.</p>
          </div>
          <div className="frereEtSoeur">
           <img src={'/frereEtSoeur.png'} alt="" style={{width: '100%', height: '100%'}} />
          </div>
        </div>

        <div className="imagesContainer">
        <div className="row">
          <div className="garconSouriantContainer col">
          <div class="ageContainer">
          <img src={'/bebeBrasTendu.png'} alt="" className="bebeBrasTendu ageImg"/>
            <div class="ageOverlay">
              <div className="pour">
                <h5>POUR LES 2 A 3 ANS</h5>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il travaille son habileté</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il découvre les formes</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il assimile les couleurs</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il reconnait les animaux</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il améliore sa coordination oeil-main</p>
                </div>
              </div>
            </div>
          </div>
          </div>


          <div className="garconSouriantContainer col">
          <div class="ageContainer">
          <img src="https://maxandlea.com/wp-content/uploads/2020/05/Be%CC%81be%CC%812ans.jpg" alt="" className="bebeBrasTendu ageImg"/>
            <div class="ageOverlay">
              <div className="pour">
                <h5>POUR LES 2 A 3 ANS</h5>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il travaille son habileté</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il découvre les formes</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il assimile les couleurs</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il reconnait les animaux</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il améliore sa coordination oeil-main</p>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="garconSouriantContainer col">
          <div class="ageContainer">
          <img src={'/garconSouriant.png'} alt="" className="garconSouriant ageImg"/>
            <div class="ageOverlay">
              <div className="pour">
                <h5>POUR LES 2 A 3 ANS</h5>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il travaille son habileté</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il découvre les formes</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il assimile les couleurs</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il reconnait les animaux</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il améliore sa coordination oeil-main</p>
                </div>
              </div>
            </div>
          </div>
          </div>

          <div className="garconSouriantContainer col">
          <div class="ageContainer">
          <img src={'/filleSouriant.png'} alt="" className="garconSouriant ageImg"/>
            <div class="ageOverlay">
              <div className="pour">
                <h5>POUR LES 2 A 3 ANS</h5>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il travaille son habileté</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il découvre les formes</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il assimile les couleurs</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il reconnait les animaux</p>
                </div>

                <div className="rowIcone">
                  <img src={'/vector1.png'} alt=""/>
                  <p>Il améliore sa coordination oeil-main</p>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>
        </div>

        <div className="apprentissage">
          <div className="apprendreContainer">
            <h5>Ce que les enfants ont appris
              avec la PlayBoard®</h5>
              <Slider {...settings}>
                <div>
                  <p style={{color:"#e72c59"}}>Reconnaître les couleurs</p>
                  <div className="rectangleContainer">
                    <img src={'/redP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div>
                  <p style={{color:"#e59131"}}>Maîtriser les dégradés</p>
                  <div className="rectangleContainer">
                    <img src={'/orangeP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div>
                  <p style={{color:"#efcb03"}}>Emboiter les formes</p>
                  <div className="rectangleContainer">
                    <img src={'/yellowP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div>
                  <p style={{color:"#4cb155"}}>Apprendre à compter</p>
                  <div className="rectangleContainer">
                    <img src={'/greenP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div>
                  <p style={{color:"#22b9ca"}}>Reconnaitre les animaux​​​</p>
                  <div className="rectangleContainer">
                    <img src={'/blueP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div>
                  <p style={{color:"#e7456c"}}>Débuter en calcul</p>
                  <div className="rectangleContainer">
                    <img src={'/pinkP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
                <div>
                  <p style={{color:"#c436bc"}}>Plaisir de jouer</p>
                  <div className="rectangleContainer">
                    <img src={'/purpleP.webp'} alt="" className="rectangle"/>
                  </div>
                </div>
              </Slider>
          </div>

          <div className="enfantTableauContainer">
            <img src={'/garconTableau.png'} alt="" className="enfantTableau"/>
          </div>
        </div>

        <div className="recommendation">
          <h5 className="recommendation-title">Ils recommandent la Playboard®</h5>
          <div className="row">
            <div className="col recommendationCol">
            <p className="distributionP">Ils distribuent la PlayBoard®</p>
              <Slider {...settingsRecommandations}>
                  <div>
                    <img src={'/amazon-prime.webp'} alt=""/>
                    <p>Avis : <b>4.9</b>/5</p>
                  </div>
                  <div>
                    <img src={'/etsy.webp'} alt=""/>
                    <p>Avis : <b>4.9</b>/5</p>
                  </div>
                  <div>
                    <img src={'/apesanteur.webp'} alt=""/>
                  </div>
                  <div>
                    <img src={'/neminemo.webp'} alt=""/>
                  </div>
                  <div>
                    <img src={'/trait-union.webp'} alt=""/>
                  </div>
                </Slider>
            </div>
            <div className="col recommendationCol">
            <p className="distributionP">Nos clients nous font confiance</p>
              <Slider {...settingsRecommandations}>
                  <div>
                      <a target="_blank" href='https://fr.trustpilot.com/review/maxandlea.com'>
                        <img src={'/trustpilot.webp'} alt=""/>
                        <p>Avis : <b>4.9</b>/5</p>
                      </a>
                  </div>
                  <div>
                      <a target="_blank" href='https://www.google.com/search?biw=2559&bih=1222&ei=MdKIX5WlLsvIaNvaq6AF&q=Max+%26+Lea+review&oq=Max+%26+Lea+review&gs_lcp=CgZwc3ktYWIQAzIICAAQBxAFEB5QxThYxThgvjtoAnAAeACAAWSIAWSSAQMwLjGYAQCgAQGqAQdnd3Mtd2l6wAEB&sclient=psy-ab&ved=0ahUKEwjVgb_K17fsAhVLJBoKHVvtClQQ4dUDCA0&uact=5'>
                        <img src={'/Google-Reviews.webp'} alt=""/>
                        <p>Avis : <b>4.9</b>/5</p>
                      </a>
                  </div>
                </Slider>
            </div>
          </div>
        </div>


        <div className="playboardContainer" id="offre">
          <div className="playboardSubContainer">
            <div className="imgBestSellerContainer">
              <img src={'/bestSeller.png'} alt="" className='bestSeller'/>
            </div>
            <div class="row align-items-center">
              <div className="imgPlayboardPrixContainer col">
                <img src={'/playboardTitle.webp'} alt="" className="playboardprice"/>
                <p className="oldPrice">
                49,90€
                </p>
                <p className="newPrice">
                29,90€
                </p>
                <p className="saveAmount">
                (-40% vous économisez 20€)
                </p>
              </div>
              <div className="imgPlayboardContainer col">
                <img src={'/playboardGood.webp'} alt="" className="playboardGood"/>
              </div>
            </div>
            <div className="offreContainer">
              <div className="row align-items-center">
                <div className="imgEbookContainer col">
                  <img src={'/ebook.webp'} alt="" className="ebook"/>
                </div>
                <div className="imgOffertContainer col">
                  <img src={'/offertPhoto.webp'} alt="" className="offertPhoto"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="addPanierContainer" onClick={handleAddToCart}>
              <Link href='#'><p>Ajouter au panier</p></Link>
        </div>

        <div className="clientSatisfait">
          <h5>6867 clients déjà satisfaits</h5>
        </div>

        <div>
          <AvisClients/>
        </div>

        <div className="sourireContainer">
          <div className="sourireTextContainer">
          <h5>LE SOURIRE DE VOS ENFANTS
            NOTRE PLUS BELLE RECOMPENSE</h5>
          </div>
        </div>

        <div className="sourireEnfantImgContainer">
          <img src={'/sourireEnfant.webp'} alt="" className="sourireEnfant"/>
        </div>

        <div>
          <Garanties/>
        </div>

        <div>
          <Engagement/>
        </div>

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

        <Footer/>
      </div>
    )
};

export default PlayBoardScreen;
