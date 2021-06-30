import React, {useContext} from 'react';
import ReactPlayer from 'react-player'
import Link from 'next/link';
import Footer from "../components/Footer";
import Engagement from "../components/Engagement";
import Garanties from "../components/GarantiesMaxEtLea";
import AvisClients from "../components/AvisClients";
import * as product from "../products";
import {AppContext} from "../components/context/AppContext";
import Head from 'next/head'
import HeaderXylophone from "../components/HeaderXylophone";


const XylophoneScreen = props => {

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
      image: product.image,
      totalPrice: parseFloat((productPrice * qty).toFixed(2))
    }
  };


  const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProducts(existingCart.products, products[0], qtyToBeAdded, newQty);
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
      console.log('clicked')
      console.log('existingCart', existingCart)
      if (existingCart!=null) {
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCart(existingCart, products[0], qtyToBeAdded);
        setCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[0]);
        setCart(newCart)
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Max And Lea - Xylophone</title>
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
      <HeaderXylophone />

      <div className="imgCouverture">
        <div className="playboard-title-container">
          <h1 className="playboard-title">XYLOPHONE</h1>
        </div>
        <div className="playboard-paragraph-container">
          <p className="playboard-paragraph">La playboard est le jouet le plus complet pour stimuler l'éveil et la motricité fine des enfants !</p>
        </div>
        <div className="video-container">
          <ReactPlayer
            url="https://maxandlea.com/wp-content/uploads/2020/05/Patchwork-V3-600-1.mp4"
            className="video-presentation"
            playing
            height="100%"
            width="100%"
            loop="true"
            playIcon={<img src="https://maxandlea.fr/wp-content/uploads/2021/04/Lire-la-video.png" alt=""/>}
            light="https://maxandlea.fr/wp-content/uploads/2021/04/image.png"
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
        <img src={'/imagerecap.png'} alt="" className="image-recap"/>
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
              height="480px"
              className="video-presentation"
              playing
              height="100%"
              width="100%"
              loop="true"
              playIcon={<img src="https://maxandlea.fr/wp-content/uploads/2021/04/Lire-la-video.png" alt=""/>}
              light="https://maxandlea.fr/wp-content/uploads/2021/04/image.png"
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
              height="480px"
              className="video-presentation"
              playing
              height="100%"
              width="100%"
              loop="true"
              playIcon={<img src="https://maxandlea.fr/wp-content/uploads/2021/04/Lire-la-video.png" alt=""/>}
              light="https://maxandlea.fr/wp-content/uploads/2021/04/image.png"
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
            <div className="ageContainer">
              <img src={'/bebeBrasTendu.png'} alt="" className="bebeBrasTendu ageImg"/>
              <div className="ageOverlay">
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
            <div className="ageContainer">
              <img src="https://maxandlea.com/wp-content/uploads/2020/05/Be%CC%81be%CC%812ans.jpg" alt="" className="bebeBrasTendu ageImg"/>
              <div className="ageOverlay">
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
            <div className="ageContainer">
              <img src={'/garconSouriant.png'} alt="" className="garconSouriant ageImg"/>
              <div className="ageOverlay">
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
            <div className="ageContainer">
              <img src={'/filleSouriant.png'} alt="" className="garconSouriant ageImg"/>
              <div className="ageOverlay">
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
          <p>Reconnaître les couleurs </p>
          <div className="rectangleContainer">
            <img src={'/rectangle.png'} alt="" className="rectangle"/>
          </div>
        </div>

        <div className="enfantTableauContainer">
          <img src={'/garconTableau.png'} alt="" className="enfantTableau"/>
        </div>
      </div>

      <div className="recommendation">
        <h5 className="recommendation-title">Ils recommandent la Playboard®</h5>
      </div>

      <div className="distribution">
        <div className="distribution-inner">
          <p>Ils distribuent la PlayBoard®</p>
          <p>Nos clients nous font confiance</p>
        </div>
        <div className="photoContainer">
          <img src={'/photoPartenaire.png'} alt="" className="photo"/>
        </div>
      </div>

      <div className="playboardContainer" id="offre">
        <div className="playboardSubContainer">
          <div className="imgBestSellerContainer">
            <img src={'/bestSeller.png'} alt="" className='bestSeller'/>
          </div>
          <div className="imgPlayboardPrixContainer">
            <img src={'/playboardprice.png'} alt="" className="playboardprice"/>
          </div>
          <div className="imgPlayboardContainer">
            <img src={'/playboardGood.png'} alt="" className="playboardGood"/>
          </div>
          <div className="row align-items-center">
            <div className="imgEbookContainer col">
              <img src={'/ebook.png'} alt="" className="ebook"/>
            </div>
            <div className="imgOffertContainer col">
              <img src={'/offertPhoto.png'} alt="" className="offertPhoto"/>
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

      <AvisClients/>

      <div className="sourireContainer">
        <div className="sourireTextContainer">
          <h5>LE SOURIRE DE VOS ENFANTS
            NOTRE PLUS BELLE RECOMPENSE</h5>
        </div>
      </div>

      <div className="sourireEnfantImgContainer">
        <img src={'/sourireEnfant.png'} alt="" className="sourireEnfant"/>
      </div>

      <div>
        <Garanties/>
      </div>

      <div>
        <Engagement/>
      </div>

      <Footer/>
    </div>
  )
};

export default XylophoneScreen;
