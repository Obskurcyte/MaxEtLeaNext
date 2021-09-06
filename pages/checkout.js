import React, { Fragment, useContext, useEffect, useState, useRef } from 'react';
import Header from "../components/Header";
import { makeStyles } from '@material-ui/core/styles';
import { AppContext } from "../components/context/AppContext";
import { CardElement } from '@stripe/react-stripe-js';
import CheckoutFormStripe from "../components/CheckoutFormStripe";
import CartItem from "../components/CartItem";
import CartItemSimple from "../components/CartItemSimple";
import { Spinner } from "react-bootstrap";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "next/link";
import Garanties from "../components/GarantiesMaxEtLea";
import Footer from "../components/Footer";
import Carousel from 'react-elastic-carousel';
import Recommande from "../components/Recommendation";
import Head from 'next/head';
import * as countries from '../listCountries';
import * as product from "../products";
import * as Yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import AvisClients from "../components/AvisClients";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Slider from "react-slick";
import { useRouter } from 'next/router';
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from '@stripe/react-stripe-js';
import SelectSearch, { useSelect, fuzzySearch } from 'react-select-search-nextjs';
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Collapsible from "react-collapsible";
import * as Scroll from 'react-scroll';
import { faChevronRight, faDotCircle, faGrinStars, faMusic, faChild, faPalette } from "@fortawesome/free-solid-svg-icons";

const stripePromise = loadStripe('pk_test_51IjLvTHhHoTNAiE0pkif0qnH6Dl91AUale4WRxVMbPoAGKaScqGFyXxy82Pi2DZw8bfsD82mTceXZ6tIoqqV4XVe00hBpIWhvL')

function SimpleDialogPlayboard(props) {
  const { t, i18n } = useTranslation();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} maxWidth="md" aria-labelledby="simple-dialog-title" open={open}>
      <div>
        <img src={t("Checkout.popUpImg")} alt="" style={{ maxWidth: '100%', display: 'block', margin: 'auto' }} />
        <div className="container1000">
          <div className="containerIcones2">
            <div className="row">

              <div className="col miniIconeContainer2">
                <img src={'/calcul.png'} alt="" />
                <h5>{t("Playboard18")}</h5>
                <p className="computer">{t("Playboard19")}<span>{t("Playboard20")}</span>{t("Playboard21")}<span>{t("Playboard22")}</span>{t("Playboard23")}<span>{t("Playboard24")}</span>{t("Playboard25")}<span>{t("Playboard26")}</span>{t("Playboard27")}<span>{t("Playboard28")}</span></p>
              </div>


              <div className="col miniIconeContainer2">
                <img src={'/couleur.png'} alt="" />
                <h5>{t("Playboard29")}</h5>
                <p className="computer">{t("Playboard30")} <span>{t("Playboard30.1")}</span>{t("Playboard30.2")} <span>{t("Playboard30.3")}</span> {t("Playboard30.4")} <span>{t("Playboard30.5")}</span>{t("Playboard30.6")} <span>{t("Playboard30.7")}</span></p>
              </div>


              <div className="col miniIconeContainer2">
                <img src={'/degrade.png'} alt="" />
                <h5>{t("Playboard31")}</h5>
                <p className="computer">{t("Playboard32")}<span>{t("Playboard32.1")}</span>{t("Playboard32.2")}<span>{t("Playboard32.3")}</span>{t("Playboard32.4")}<span>{t("Playboard32.5")}</span>{t("Playboard32.4")}<span>{t("Playboard32.7")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <img src={'/eveil.png'} alt="" />
                <h5>{t("Playboard33")}</h5>
                <p className="computer">{t("Playboard34")}<span>{t("Playboard34.1")}</span>{t("Playboard34.2")}<span>{t("Playboard34.3")}</span></p>
              </div>

            </div>

            <div className="row">

              <div className="col miniIconeContainer2">
                <img src={'/animaux.png'} alt="" />
                <h5>{t("Playboard35")}</h5>
                <p className="computer">{t("Playboard36")}<span>{t("Playboard36.1")}</span>{t("Playboard36.2")}<span>{t("Playboard36.3")}</span>{t("Playboard36.4")}<span>{t("Playboard36.5")}</span>{t("Playboard36.6")}<span>{t("Playboard36.7")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <img src={'/formes.png'} alt="" />
                <h5>{t("Playboard37")}</h5>
                <p className="computer">{t("Playboard38")}<span>{t("Playboard38.1")}</span>{t("Playboard38.2")}<span>{t("Playboard38.3")}</span>{t("Playboard38.4")}<span>{t("Playboard38.5")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <img src={'/coordination.png'} alt="" />
                <h5>{t("Playboard39")}</h5>
                <p className="computer">{t("Playboard40")}<span>{t("Playboard40.1")}</span>{t("Playboard40.2")}<span>{t("Playboard40.3")}</span>{t("Playboard40.4")}<span>{t("Playboard40.5")}</span></p>
              </div>

              <div className="col miniIconeContainer2">
                <img src={'/nombres.png'} alt="" />
                <h5>{t("Playboard41")}</h5>
                <p className="computer">{t("Playboard42")}<span>{t("Playboard42.1")}</span>{t("Playboard42.2")}<span>{t("Playboard42.3")}</span>{t("Playboard42.4")}<span>{t("Playboard42.5")}</span>{t("Playboard42.6")}<span>{t("Playboard42.7")}</span></p>
              </div>
            </div>
          </div>
        </div>
        <a href="/playboard" target="_blank"><p className="modal-know-more">{t("products.savoir")}</p></a>
      </div>
    </Dialog>
  );
}

function SimpleDialogXylo(props) {
  const { t, i18n } = useTranslation();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} maxWidth="md" aria-labelledby="simple-dialog-title" open={open}>
      <div>
        <img src={'/xylo-diapo.webp'} alt="" style={{ maxWidth: '100%', marginBottom: '35px' }} />
        <div className="container1000">
          <div className="containerIcones2">
            <div className="row">

              <div className="col miniIconeContainer2">
                <FontAwesomeIcon icon={faMusic} color="#E72C59" className="anneauxImg" />
                <h5>{t("Xylo.17")}</h5>
                <p className="computer">{t("Xylo.18")}<span>{t("Xylo.18a")}</span>{t("Xylo.18b")}<span>{t("Xylo.18c")}</span>{t("Xylo.18d")}<span>{t("Xylo.18e")}</span>{t("Xylo.18f")}<span>{t("Xylo.18g")}</span></p>
                <p className="mobile">{t("Xylo.18mobile")}</p>
              </div>


              <div className="col miniIconeContainer2">
                <FontAwesomeIcon icon={faChild} color="lightblue" className="childImg" />
                <h5>{t("Xylo.19")}</h5>
                <p className="computer">{t("Xylo.20")}<span>{t("Xylo.20a")}</span>{t("Xylo.20b")}<span>{t("Xylo.20c")}</span>{t("Xylo.20d")}<span>{t("Xylo.20e")}</span>{t("Xylo.20f")}</p>
                <p className="mobile">{t("Xylo.20mobile")}</p>
              </div>
            </div>
            <div className="row">
              <div className="col miniIconeContainer2">
                <img src={'/music-icon.webp'} style={{ maxHeight: "75px", maxWidth: "55%" }} alt="" />
                <h5>{t("Xylo.21")}</h5>
                <p className="computer">{t("Xylo.22")}<span>{t("Xylo.22a")}</span>{t("Xylo.22b")}<span>{t("Xylo.22c")}</span>{t("Xylo.22d")}<span>{t("Xylo.22e")}</span></p>
                <p className="mobile">{t("Xylo.22mobile")}</p>
              </div>

              <div className="col miniIconeContainer2">
                <FontAwesomeIcon icon={faGrinStars} color="#F28D2A" className="eveilImg" />
                <h5>{t("Xylo.23")}</h5>
                <p className="computer">{t("Xylo.24")}<span>{t("Xylo.24a")}</span>{t("Xylo.24b")}<span>{t("Xylo.24c")}</span></p>
                <p className="mobile">{t("Xylo.24mobile")}</p>
              </div>
            </div>
          </div>
        </div>
        <a href="/xylophone" target="_blank"><p className="modal-know-more">{t("products.savoir")}</p></a>
      </div>
    </Dialog >
  );
}

function SimpleDialogTour(props) {
  const { t, i18n } = useTranslation();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} maxWidth="md" aria-labelledby="simple-dialog-title" open={open}>
      <div>
        <img src={'/tourPopup.webp'} alt="" style={{ maxWidth: '100%' }} />
        <div className="row">

          <div className="col miniIconeContainer2">
            <FontAwesomeIcon icon={faDotCircle} color="#35A936" className="anneauxImg" />
            <h5>{t("Tour.17")}</h5>
            <p className="computer">{t("Tour.18")}<span>{t("Tour.18a")}</span>{t("Tour.18b")}<span>{t("Tour.18c")}</span></p>
          </div>


          <div className="col miniIconeContainer2">
            <img src={'/couleur.png'} style={{ maxHeight: "75px", maxWidth: "35%" }} alt="" />
            <h5>{t("Tour.19")}</h5>
            <p className="computer">{t("Tour.20")}<span>{t("Tour.20a")}</span>{t("Tour.20b")}<span>{t("Tour.20c")}</span></p>
          </div>


          <div className="col miniIconeContainer2">
            <img src={'/degrade.png'} style={{ maxHeight: "75px", maxWidth: "29%" }} alt="" />
            <h5>{t("Tour.21")}</h5>
            <p className="computer">{t("Tour.22")}<span>{t("Tour.22a")}</span>{t("Tour.22b")}<span>{t("Tour.22c")}</span>{t("Tour.22d")}<span>{t("Tour.22e")}</span></p>
          </div>

          <div className="col miniIconeContainer2">
            <FontAwesomeIcon icon={faGrinStars} color="#E72C59" className="eveilImg" />
            <h5>{t("Tour.23")}</h5>
            <p className="computer">{t("Tour.24")}<span>{t("Tour.24a")}</span>{t("Tour.24b")}<span>{t("Tour.24c")}</span>{t("Tour.24d")}<span>{t("Tour.24e")}</span></p>
          </div>

        </div>
        <a href="/tour" target="_blank"><p className="modal-know-more">{t("products.savoir")}</p></a>
      </div>
    </Dialog>
  );
}

function SimpleDialogRelay(props) {
  const { t, i18n } = useTranslation();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="Points relay" open={open} maxWidth="md">
      <div className="relay-container">
        <div id="Zone_Widget">
          {t("loading")}
          <Spinner animation="border" role="status" >
            <span className="sr-only">{t("loading")}</span>
          </Spinner>
        </div>
        <button className="buttonCodepromo" id="choice_relay" onClick={handleClose}>Choisir</button>
      </div>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const CheckoutScreen = props => {

  const { t, i18n } = useTranslation();

  const router = useRouter();

  const [goodCodePromo, setGoodCodePromo] = useState(false)

  var settingsSlider = {
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const [openPlayboard, setOpenPlayboard] = React.useState(false);
  const [openXylo, setOpenXylo] = useState(false);
  const [openTour, setOpenTour] = useState(false);
  const [openRelay, setOpenRelay] = useState(false);

  const handleClickOpenPlayboard = () => {
    setOpenPlayboard(true);
  };

  const handleClickOpenXylo = () => {
    setOpenXylo(true);
  };

  const handleClickOpenTour = () => {
    setOpenTour(true);
  };

  const handleClickOpenRelay = () => {
    setOpenRelay(true);
  };

  const handleClosePlayboard = (value) => {
    setOpenPlayboard(false);
  };
  const handleCloseXylo = (value) => {
    setOpenXylo(false);
  };
  const handleCloseTour = (value) => {
    setOpenTour(false);
  };
  const handleCloseRelay = (value) => {
    setOpenRelay(false);
  };

  const [cart, setCart, commandeCart, setCommandeCart] = useContext(AppContext);

  const [codePromo, setCodePromo] = useState('')
  const [dataClient, setDataClient] = useState(null);
  const [ebookImprime, setEbookImprime] = useState('');

  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem('livraison');
      const trueData = JSON.parse(cartData);
      let codePromoData = localStorage.getItem('promoCode');
      let ebookImprime = localStorage.getItem('ebookImprime');
      setEbookImprime(ebookImprime)
      const promoCodeData = JSON.parse(codePromoData)
      setDataClient(trueData)
      setCodePromo(promoCodeData)
      if (trueData && trueData.pays) {
        setPays(trueData.pays);
      }

      changeCartProductsExtraDiscounts();
    }
  }, [goodCodePromo]);




  const [donneesClient, setdonneesClient] = useState({})

  const products = product.products

  const breakPoints = [
    { width: 200, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 1000, itemsToShow: 3 },
  ]

  //---------------------AJOUTER PANIER-----------------------//

  const changeCartProductsExtraDiscounts = () => {
    let existingCart = localStorage.getItem('woo-next-cart');
    existingCart = JSON.parse(existingCart);
    if (existingCart != null) {
      const playboardExistsIndex = isProductInCart(existingCart.products, products[2].id);
      if (-1 < playboardExistsIndex) {
        const xyloExistsIndex = isProductInCart(existingCart.products, products[0].id);
        const tourExistsIndex = isProductInCart(existingCart.products, products[1].id);
        const kakoExistsIndex = isProductInCart(existingCart.products, products[4].id);
        if (-1 < xyloExistsIndex) {
          const qtyXylo = existingCart.products[xyloExistsIndex].qty;
          const updatedCart = removeProduct(products[0].id);
          const newProduct = createNewProduct(products[5], products[5].price, qtyXylo)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          setCommandeCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
        if (-1 < tourExistsIndex) {
          const qtyTour = existingCart.products[tourExistsIndex].qty;
          const updatedCart = removeProduct(products[1].id);
          const newProduct = createNewProduct(products[6], products[6].price, qtyTour)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          setCommandeCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
        if (-1 < kakoExistsIndex) {
          const qtyKako = existingCart.products[kakoExistsIndex].qty;
          const updatedCart = removeProduct(products[4].id);
          const newProduct = createNewProduct(products[7], products[7].price, qtyKako)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          setCommandeCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
      } else {
        const disXyloExistsIndex = isProductInCart(existingCart.products, products[5].id);
        const distourExistsIndex = isProductInCart(existingCart.products, products[6].id);
        const disKakoExistsIndex = isProductInCart(existingCart.products, products[7].id);
        if (-1 < disXyloExistsIndex) {
          const qtyXylo = existingCart.products[disXyloExistsIndex].qty;
          let updatedCart = removeProduct(products[5].id);
          if (updatedCart == null) {
            updatedCart = {
              products: [],
              totalProductCount: 1,
              totalProductsPrice: products[0].price
            }
          }
          const newProduct = createNewProduct(products[0], products[0].price, qtyXylo)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          setCommandeCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
        if (-1 < distourExistsIndex) {
          const qtyTour = existingCart.products[distourExistsIndex].qty;
          let updatedCart = removeProduct(products[6].id);
          if (updatedCart == null) {
            updatedCart = {
              products: [],
              totalProductCount: 1,
              totalProductsPrice: products[1].price
            }
          }
          const newProduct = createNewProduct(products[1], products[1].price, qtyTour)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          setCommandeCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
        if (-1 < disKakoExistsIndex) {
          const qtyKako = existingCart.products[disKakoExistsIndex].qty;
          let updatedCart = removeProduct(products[7].id);
          if (updatedCart == null) {
            updatedCart = {
              products: [],
              totalProductCount: 1,
              totalProductsPrice: products[4].price
            }
          }
          const newProduct = createNewProduct(products[4], products[4].price, qtyKako)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          setCommandeCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
      }
    }
  }


  const getFloatVal = (string) => {
    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)) : '';
  };

  const addFirstProduct = (product) => {
    let productPrice = getFloatVal(product.price)
    let oldPrice = getFloatVal(product.priceAugmente)


    let newCart = {
      products: [],
      totalProductCount: 1,
      totalProductsPrice: productPrice
    }

    const newProduct = createNewProduct(product, productPrice, 1)
    newCart.products.push(newProduct);
    localStorage.setItem('woo-next-cart', JSON.stringify(newCart));
    localStorage.setItem('commande-cart', JSON.stringify(newCart));
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


  const updateCartTour = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsTour(existingCart.products, product, qtyToBeAdded, newQty);
    if (updatedProducts == null) return null;
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
    localStorage.setItem('commande-cart', JSON.stringify(updatedCart));
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


  const getUpdatedProductsTour = (existingProductsInCart, product, qtyToBeAdded, newQty = false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, product.id);

    if (-1 < productExistsIndex) {
      let updatedProducts = existingProductsInCart;
      let updatedProduct = updatedProducts[productExistsIndex];
      if (updatedProduct.qty + qtyToBeAdded < 0)
        return updatedProducts;
      else if (updatedProduct.qty + qtyToBeAdded == 0) {
        const updatedCart = removeProduct(product.id);
        if (updatedCart == null) return null;
        setCart(updatedCart);
        return updatedCart.products;
      }
      updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded)
      updatedProduct.totalPrice = parseFloat(updatedProduct.price * updatedProduct.qty).toFixed(2);
      return updatedProducts;
    } else {
      if (qtyToBeAdded > 0) {
        let productPrice = parseFloat(product.price);
        const newProduct = createNewProduct(product, productPrice, qtyToBeAdded)
        existingProductsInCart.push(newProduct);
      }
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


  const handleAddToCartTour = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart != null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        var updatedCart = "";
        if (!checkedTour) {
          setCheckedTour(true);
          updatedCart = updateCartTour(existingCart, products[1], 1);
        }
        else {
          setCheckedTour(false);
          const playboardExistsIndex = isProductInCart(existingCart.products, products[2].id);
          if (-1 < playboardExistsIndex) {//Si playboard, on retire la seconde version de la tour
            updatedCart = removeProduct(products[6].id);
            //updatedCart = updateCartTour(existingCart, products[6], -1);
          }
          else {
            updatedCart = removeProduct(products[1].id);
            //updatedCart = updateCartTour(existingCart, products[1], -1);
          }
        }
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        if (!checkedTour) {
          setCheckedTour(true);
          const newCart = addFirstProduct(products[1]);
          setCart(newCart)
          setCommandeCart(newCart)
        }
        else setCheckedTour(false);
      }
      changeCartProductsExtraDiscounts();
    }
  }

  const updateCartXylo = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsXylo(existingCart.products, product, qtyToBeAdded, newQty);
    if (updatedProducts == null) return null;
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
    localStorage.setItem('commande-cart', JSON.stringify(updatedCart));
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


  const getUpdatedProductsXylo = (existingProductsInCart, product, qtyToBeAdded, newQty = false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, product.id);

    if (-1 < productExistsIndex) {
      let updatedProducts = existingProductsInCart;
      let updatedProduct = updatedProducts[productExistsIndex];
      if (updatedProduct.qty + qtyToBeAdded < 0)
        return updatedProducts;
      else if (updatedProduct.qty + qtyToBeAdded == 0) {
        const updatedCart = removeProduct(product.id);
        if (updatedCart == null) return null;
        setCart(updatedCart);
        return updatedCart.products;
      }
      updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded)
      updatedProduct.totalPrice = parseFloat(updatedProduct.price * updatedProduct.qty).toFixed(2);
      return updatedProducts;
    } else {
      if (qtyToBeAdded > 0) {
        let productPrice = parseFloat(product.price);
        const newProduct = createNewProduct(product, productPrice, qtyToBeAdded)
        existingProductsInCart.push(newProduct);
      }
      return existingProductsInCart
    }
  };


  const handleAddToCartXylo = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart != null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        var updatedCart = "";
        if (!checkedXylo) {
          setCheckedXylo(true);
          updatedCart = updateCartXylo(existingCart, products[0], 1);
        }
        else {
          setCheckedXylo(false);
          const playboardExistsIndex = isProductInCart(existingCart.products, products[2].id);
          if (-1 < playboardExistsIndex) {//Si playboard, on retire la seconde version du xylo
            updatedCart = removeProduct(products[5].id);
            //updatedCart = updateCartXylo(existingCart, products[5], -1);
          }
          else {
            updatedCart = removeProduct(products[0].id);
            //updatedCart = updateCartXylo(existingCart, products[0], -1);
          }
        }
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        if (!checkedXylo) {
          setCheckedXylo(true);
          const newCart = addFirstProduct(products[0]);
          setCart(newCart)
          setCommandeCart(newCart)
        }
        else setCheckedXylo(false);
      }
      changeCartProductsExtraDiscounts();
    }
  }

  const updateCartPlayboard = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsPlayboard(existingCart.products, products[2], qtyToBeAdded, newQty);
    if (updatedProducts == null) return null;
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
    localStorage.setItem('commande-cart', JSON.stringify(updatedCart));
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


  const getUpdatedProductsPlayboard = (existingProductsInCart, product, qtyToBeAdded, newQty = false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, products[2].id);

    if (-1 < productExistsIndex) {
      let updatedProducts = existingProductsInCart;
      let updatedProduct = updatedProducts[productExistsIndex];
      if (updatedProduct.qty + qtyToBeAdded < 0)
        return updatedProducts;
      else if (updatedProduct.qty + qtyToBeAdded == 0) {
        const updatedCart = removeProduct(products[2].id);
        if (updatedCart == null) return null;
        setCart(updatedCart);
        return updatedCart.products;
      }
      updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded)
      updatedProduct.totalPrice = parseFloat(updatedProduct.price * updatedProduct.qty).toFixed(2);
      return updatedProducts;
    } else {
      if (qtyToBeAdded > 0) {
        let productPrice = parseFloat(product.price);
        const newProduct = createNewProduct(product, productPrice, qtyToBeAdded)
        existingProductsInCart.push(newProduct);
      }
      return existingProductsInCart
    }
  };


  const handleAddToCartPlayboard = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart != null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        var updatedCart = "";
        if (!checkedPlayboard) {
          setCheckedPlayboard(true);
          updatedCart = updateCartPlayboard(existingCart, products[2], 1);
        }
        else {
          setCheckedPlayboard(false);
          updatedCart = removeProduct(products[2].id);
          //updatedCart = updateCartPlayboard(existingCart, products[2], -1);
        }
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        if (!checkedPlayboard) {
          setCheckedPlayboard(true);
          const newCart = addFirstProduct(products[2]);
          setCart(newCart)
          setCommandeCart(newCart)
        }
        else setCheckedPlayboard(false);
      }
      changeCartProductsExtraDiscounts();
    }
  }

  const updateCartEbookPlayboard = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsEbookPlayboard(existingCart.products, products[3], qtyToBeAdded, newQty);
    if (updatedProducts == null) return null;
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
    localStorage.setItem('commande-cart', JSON.stringify(updatedCart));
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


  const getUpdatedProductsEbookPlayboard = (existingProductsInCart, product, qtyToBeAdded, newQty = false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, products[3].id);

    if (-1 < productExistsIndex) {
      let updatedProducts = existingProductsInCart;
      let updatedProduct = updatedProducts[productExistsIndex];
      if (updatedProduct.qty + qtyToBeAdded < 0)
        return updatedProducts;
      else if (updatedProduct.qty + qtyToBeAdded == 0) {

        const updatedCart = removeProduct(products[3].id);
        if (updatedCart == null) {
          return null;
        }
        setCart(updatedCart);
        return updatedCart.products;
      }
      updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded)
      updatedProduct.totalPrice = parseFloat(updatedProduct.price * updatedProduct.qty).toFixed(2);
      return updatedProducts;
    } else {
      if (qtyToBeAdded > 0) {
        let productPrice = parseFloat(product.price);
        const newProduct = createNewProduct(product, productPrice, qtyToBeAdded)
        existingProductsInCart.push(newProduct);
      }
      return existingProductsInCart
    }
  };


  const handleAddToCartEbookPlayboard = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart != null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        var updatedCart = "";
        if (!checkedEbookPlayboard) {
          setCheckedEbookPlayboard(true);
          updatedCart = updateCartEbookPlayboard(existingCart, products[3], 1);
        }
        else {
          setCheckedEbookPlayboard(false);
          updatedCart = removeProduct(products[3].id);
          //updatedCart = updateCartEbookPlayboard(existingCart, products[3], -1);
        }
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        if (!checkedPlayboard) {
          setCheckedEbookPlayboard(true);
          const newCart = addFirstProduct(products[3]);
          setCart(newCart)
          setCommandeCart(newCart)
        }
        else setCheckedEbookPlayboard(false);
      }
      changeCartProductsExtraDiscounts();
    }
  }






  /**
   * Get updated products array
   *
   * @param existingProductsInCart
   * @param product
   * @param qtyToBeAdded
   * @param newQty
   * @returns {*}
   */


  const getUpdatedProductsEbookXylo = (existingProductsInCart, product, qtyToBeAdded, newQty = false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, products[6].id);

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


  const handleAddToCartEbookXylo = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart != null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCartEbookXylo(existingCart, products[6], qtyToBeAdded);
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[6]);
        setCart(newCart)
        setCommandeCart(newCart)
      }
    }
  }

  const updateCartEbookTour = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsEbookTour(existingCart.products, products[7], qtyToBeAdded, newQty);
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
    localStorage.setItem('commande-cart', JSON.stringify(updatedCart));
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


  const getUpdatedProductsEbookTour = (existingProductsInCart, product, qtyToBeAdded, newQty = false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, products[7].id);

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




  const removeProduct = (productId) => {
    let existingCart = localStorage.getItem('woo-next-cart');
    existingCart = JSON.parse(existingCart);

    if (1 === existingCart.products.length) {
      localStorage.removeItem('woo-next-cart')
      return null;
    }

    const productExistIndex = isProductInCart(existingCart.products, productId);

    if (-1 < productExistIndex) {

      const productToBeRemoved = existingCart.products[productExistIndex];
      const qtyTBeRemovedFromTotal = productToBeRemoved.qty;
      const priceToBeDeductedFromTotal = productToBeRemoved.totalPrice;

      let updatedCart = existingCart
      /*if(productExistIndex == 0){
        updatedCart.products.shift()
      }
      else*/ updatedCart.products.splice(productExistIndex, 1);
      updatedCart.totalProductCount = updatedCart.totalProductCount - qtyTBeRemovedFromTotal;
      updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;

      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
      return updatedCart
    } else {
      return existingCart;
    }
  };

  const handleRemoveProduct = (event, productId) => {
    const updatedCart = removeProduct(productId);
    setCart(updatedCart)
  }


  const handleAddToCartEbookTour = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart != null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCartEbookTour(existingCart, products[7], qtyToBeAdded);
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[7]);
        setCart(newCart)
        setCommandeCart(newCart)
      }
    }
  }



  //-------------------- LIVRAISON ----------------------------


  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [adresseLivraison, setAdresseLivraison] = useState('');
  const [villeLivraison, setVilleLivraison] = useState('');
  const [codePostalLivraison, setCodePostalLivraison] = useState('');
  const [adresseFacturation, setAdresseFacturation] = useState('');
  const [prixLivraison, setPrixLivraison] = useState(0);
  const [titreLivraison, setTitreLivraison] = useState('')
  const [villeFacturation, setVilleFacturation] = useState('')
  const [codePostalFacturation, setCodePostalFacturation] = useState('')
  const [paysFacturation, setPaysFacturation] = useState('')
  const [phone, setPhone] = useState('');
  var [pays, setPays] = useState('');
  const [expedition, setExpedition] = useState('');
  const [total, setTotal] = useState('');
  const [sousTotal, setSousTotal] = useState('');

  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checkedPlayboard, setCheckedPlayboard] = useState(false);
  const [checkedTour, setCheckedTour] = useState(false);
  const [checkedXylo, setCheckedXylo] = useState(false);
  const [checkedEbookPlayboard, setCheckedEbookPlayboard] = useState(false);
  const [codePromoIncorrect, setCodePromoIncorrect] = useState(false);
  const [codePromoLoading, setCodePromoLoading] = useState(false);

  useEffect(() => {
    let existingCart = localStorage.getItem('woo-next-cart');
    existingCart = JSON.parse(existingCart)
    if (existingCart != null && ((isProductInCart(existingCart.products, products[0].id) > -1) || (isProductInCart(existingCart.products, products[5].id) > -1))) {
      setCheckedXylo(true);
    }
    if (existingCart != null && (isProductInCart(existingCart.products, products[1].id) > -1 || isProductInCart(existingCart.products, products[6].id) > -1)) {
      setCheckedTour(true);
    }
    if (existingCart != null && isProductInCart(existingCart.products, products[2].id) > -1) {
      setCheckedPlayboard(true);
    }
    if (existingCart != null && isProductInCart(existingCart.products, products[3].id) > -1) {
      setCheckedEbookPlayboard(true);
    }
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange1 = (event, prix, titre = "") => {
    setChecked1(!checked1);
    setChecked2(false);
    setChecked3(false);
    setPrixLivraison(prix);
    setTitreLivraison(titre);
  };

  const handleChange2 = (event, prix, titre = "") => {
    setChecked2(!checked2);
    setChecked1(false);
    setChecked3(false);
    setPrixLivraison(prix);
    setTitreLivraison(titre);
  }

  const handleChange3 = (event, prix, titre = "") => {
    setChecked3(!checked3);
    setChecked1(false);
    setChecked2(false);
    setPrixLivraison(prix);
    setTitreLivraison(titre);
  }


  const [checked, setChecked] = React.useState(false);


  //----------------FORMULAIRE DE LIVRAISON ------------------//




  const livraisonSchema = Yup.object().shape({
    email: Yup.string().email('Cet email est invalide').required(t("Checkout.37")),
    prenom: Yup.string().required(t("Checkout.37")),
    nom: Yup.string().required(t("Checkout.37")),
    adresseLivraison: Yup.string().required(t("Checkout.37")),
    codePostalLivraison: Yup.string().required(t("Checkout.37")),
    villeLivraison: Yup.string().required(t("Checkout.37")),
    pays: Yup.string().required(t("Checkout.37"))
  });

  let dataClientEmail = ''
  if (dataClient && dataClient.email) {
    dataClientEmail = dataClient.email
  }


  const getInitialValues = (event) => {
    return {
      email: (dataClient && dataClient.email) ? dataClient.email : '',
      prenom: (dataClient && dataClient.prenom) ? dataClient.prenom : '',
      nom: (dataClient && dataClient.nom) ? dataClient.nom : '',
      adresseLivraison: (dataClient && dataClient.adresseLivraison) ? dataClient.adresseLivraison : '',
      codePostalLivraison: (dataClient && dataClient.codePostalLivraison) ? dataClient.codePostalLivraison : '',
      villeLivraison: (dataClient && dataClient.villeLivraison) ? dataClient.villeLivraison : '',
      pays: (dataClient && dataClient.pays) ? dataClient.pays : '',
      phone: (dataClient && dataClient.phone) ? dataClient.phone : '',
      adresseFacturation: (dataClient && dataClient.adresseFacturation) ? dataClient.adresseFacturation : '',
      codePostalFacturation: (dataClient && dataClient.codePostalFacturation) ? dataClient.codePostalFacturation : '',
      villeFacturation: (dataClient && dataClient.villeFacturation) ? dataClient.villeFacturation : ''
    }
  };



  const classes = useStyles();


  let sumPanier = 0;
  let totalBeforeDiscount = 0;
  let oldPrice = 0;
  let qtyProduct = 0;
  let totalPrice2 = 0
  let qtyTotale = 0
  if (cart) {
    for (let data in cart.products) {
      sumPanier += parseFloat(cart.products[data].totalPrice)
      qtyProduct = parseFloat(cart.products[data].qty)
      qtyTotale += qtyProduct
      if (parseFloat(cart.products[data].oldPrice))
        oldPrice = parseFloat(cart.products[data].oldPrice)
      else oldPrice = parseFloat(cart.products[data].totalPrice)
      totalBeforeDiscount += oldPrice * qtyProduct
    }
  }


  let playboardReducPrice = 0
  let playboardInCart = []
  if (cart) {
    const playboard = cart.products.filter(obj => {
      return obj.productId === '3163'
    })
    if (playboard.length !== 0) {
      playboardInCart = playboard
      playboardReducPrice = Number((playboard[0].qty * (products[2].priceAugmente - products[2].price)).toFixed(2))
    }
  }

  let tourReducPrice = 0
  let tourInCart = []
  if (cart) {
    const tour = cart.products.filter(obj => {
      return obj.productId === '4527'
    })
    if (tour.length !== 0) {
      tourInCart = tour
      tourReducPrice = Number((tour[0].qty * (products[1].priceAugmente - products[1].price)).toFixed(2))
    }
  }

  let disTourReducPrice = 0
  let disTourInCart = []
  if (cart) {
    const tour = cart.products.filter(obj => {
      return obj.productId === '9692'
    })
    if (tour.length !== 0) {
      disTourInCart = tour
      disTourReducPrice = Number((tour[0].qty * (products[6].priceAugmente - products[6].price)).toFixed(2))
    }
  }


  let xyloReducPrice = 0
  let xyloInCart = []
  if (cart) {
    const xylo = cart.products.filter(obj => {
      return obj.productId === '4535'
    })
    if (xylo.length !== 0) {
      xyloInCart = xylo
      xyloReducPrice = Number((xylo[0].qty * (products[0].priceAugmente - products[0].price)).toFixed(2))
    }
  }

  let disXyloReducPrice = 0
  let disXyloInCart = []
  if (cart) {
    const xylo = cart.products.filter(obj => {
      return obj.productId === '9697'
    })
    if (xylo.length !== 0) {
      disXyloInCart = xylo
      disXyloReducPrice = Number((xylo[0].qty * (products[5].priceAugmente - products[5].price)).toFixed(2))
    }
  }

  let ebookReducPrice = 0
  let ebookInCart = []
  if (cart) {
    const ebook = cart.products.filter(obj => {
      return obj.productId === '17014'
    })
    if (ebook.length !== 0) {
      ebookInCart = ebook[0].qty
      ebookReducPrice = Number((ebook[0].qty * (products[3].priceAugmente - products[3].price)).toFixed(2))
    }
  }

  let disKakoReducPrice = 0
  let disKakoInCart = []
  if (cart) {
    const kako = cart.products.filter(obj => {
      return obj.productId === '17693'
    })
    if (kako.length !== 0) {
      disKakoInCart = kako
      disKakoReducPrice = Number((kako[0].qty * (products[7].priceAugmente - products[7].price)).toFixed(2))
    }
  }

  //On enlève les ebooks de la qty totale
  if (ebookInCart > 0) {
    qtyTotale = qtyTotale - ebookInCart
  }


  const [firstStep, setFirstStep] = useState(false);

  const [goPaiement, setGoPaiement] = useState(false)
  const [goCart, setGoCart] = useState(false)


  const [errorLivraison, setErrorLivraison] = useState(false)




  //------AFFILIATE AND COUPON CODES-----//

  const [promoCode, setpromoCode] = useState('')

  const fetchAffiliates = async () => {
    const encoded = window.btoa("51c3be50ab9c71d50de81306ddb8590a:bdf2b2c8119512ea65c31d49d96c7e92")
    var aff_id = 0;
    var is_code = false;
    const WooCommerce = new WooCommerceRestApi({
      url: 'https://maxandlea.fr',
      consumerKey: 'ck_9e4d330373ed9a52a684ec88434271aa37652603',
      consumerSecret: 'cs_a0272dea628e462d7288a10226cfa3e1f4ffcaff',
      version: 'wc/v3'
    });
    setCodePromoLoading(true)
    WooCommerce.get("coupons")
      .then((response) => {
        setCodePromoLoading(false)
        response.data.forEach(code => {
          if (code.code === promoCode) {
            is_code = true;
            localStorage.setItem('promoCode', JSON.stringify({ "id": code.id, "code": code.code, "amount": code.amount }));
            code.meta_data.forEach(meta => {
              if (meta.key === "affwp_discount_affiliate") {
                //localStorage.setItem('ref',meta.value);
                aff_id = meta.value;
              }
            });
          }
        });
        if (is_code) {
          setCodePromoIncorrect(false)
          setGoodCodePromo(true)
        }
        else {
          setCodePromoIncorrect(true)
        }

        if (aff_id != 0) {
          fetch(`https://maxandlea.fr/wp-json/affwp/v1/affiliates/` + aff_id + `?user=1`, {
            //method: 'POST',
            headers: {
              'Authorization': "Basic " + encoded
            }
          })
            .then(res => res.json())
            .then(
              (result) => {
                localStorage.setItem('ref', result.user.user_login);
              })
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const checkPromo = (event) => {
    fetchAffiliates();
  };

  const [mondialRelay, setMondialRelay] = useState(false);

  let discountPanier = 0;
  if (qtyTotale === 2) {
    discountPanier = (sumPanier * 0.10).toFixed(2)
  } else if (qtyTotale === 3) {
    discountPanier = (sumPanier * 0.15).toFixed(2)
  } else if (qtyTotale >= 4) {
    discountPanier = (sumPanier * 0.20).toFixed(2)
  }

  let totalIntermediaire = sumPanier
  if (discountPanier)
    totalIntermediaire -= discountPanier;

  const reducCodePromo = totalIntermediaire * (1 / codePromo?.amount)

  let totalPrice1 = sumPanier
  if (discountPanier)
    totalPrice1 -= discountPanier;
  if (reducCodePromo)
    totalPrice1 -= reducCodePromo;

  var totalDiscount = 0;
  if (disTourReducPrice)
    totalDiscount += parseFloat(disTourReducPrice);
  if (disXyloReducPrice)
    totalDiscount += parseFloat(disXyloReducPrice);
  if (disKakoReducPrice)
    totalDiscount += parseFloat(disKakoReducPrice);
  if (tourReducPrice)
    totalDiscount += parseFloat(tourReducPrice);
  if (xyloReducPrice)
    totalDiscount += parseFloat(xyloReducPrice);
  if (ebookReducPrice)
    totalDiscount += parseFloat(ebookReducPrice);
  if (playboardReducPrice)
    totalDiscount += parseFloat(playboardReducPrice);
  if (discountPanier)
    totalDiscount += parseFloat(discountPanier);
  if (reducCodePromo)
    totalDiscount += parseFloat(reducCodePromo);

  totalPrice2 = totalPrice1 + prixLivraison;

  let percentageTotalDiscount = (totalDiscount / totalBeforeDiscount) * 100;

  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(true)


  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 770)
        setIsCollapsibleOpen(false)
    }
  }, []); // Empty array ensures that effect is only run on mount



  const coordonneesNum = React.createElement('p', { className: 'coordonneesNum' }, "1");
  const coordonneesTitle = React.createElement('p', { className: 'coordonneesTitle' }, t("Checkout.2"));
  const coordonneesSubTitle = React.createElement('p', { className: 'coordonneesSubTitle' }, t("Checkout.3"));
  const coordonneesSubDiv = React.createElement('div', {}, [coordonneesTitle, coordonneesSubTitle]);
  const coordonneesArrow = React.createElement('i', { className: 'fas fa-chevron-down coordonneesArrow' }, "");
  const coordonneesPanierDiv = React.createElement('div', { className: 'coordonneesDiv coordonneesLinkContainer' }, [coordonneesNum, coordonneesSubDiv, coordonneesArrow]);

  const totalTitle = React.createElement('p', { className: 'sousTotalText2' }, t("Checkout.19"));
  const totalValue = React.createElement('p', { className: 'sousTotalText2' }, totalPrice2.toFixed(2) + "€");
  const totalArrow = React.createElement('i', { className: 'fas fa-chevron-down coordonneesArrow' }, "");
  const totalDiv = React.createElement('div', { className: 'prix-reduc-container collapsilbeSimpleCartDiv' }, [totalTitle, totalValue, totalArrow]);

  const refPaiementDiv = useRef(null)

  return (
    <PayPalScriptProvider options={{ "client-id": process.env.PAYPAL_CLIENT_ID }}>
      <div className="checkout-main-container">
        <Head>
          <title>Max And Lea - Checkout</title>
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
        <Header />
        <div className="checkout-sub-container">
          <div className="cadeauContainer">
            <img src="/bandeau-checkout.webp" style={{ width: "100%" }} />
            <h2 className="cadeauContainerText">{t("Checkout.1")}</h2>
          </div>

          <div>
            <AvisClients />
          </div>

          <div>

            <div className="produitPaiementContainer" id="produits-container">
              <input type="hidden" id="total-price" value={totalPrice2.toFixed(2)} />

              <div className="produitContainer" ref={refPaiementDiv}>
                <Collapsible trigger={coordonneesPanierDiv} open={isCollapsibleOpen} >
                  {(!cart || cart.products.length === 0) && (
                    <h2>{t("Checkout.4")}</h2>
                  )}
                  <div className="productContainer">
                    <div>
                      {
                        cart && cart.products.length && (
                          cart.products.map((item) => {
                            return (
                              item.productId == 3163 ? (
                                <>
                                  <div>
                                    <CartItem
                                      key={item.productId}
                                      item={item}
                                      setCart={setCart}
                                    />
                                    <div className="ebookContainer">
                                      <div className="ebookInner free">
                                        <Checkbox
                                          checked={true}
                                          disabled
                                          onChange={() => {
                                            setCheckedEbookPlayboard(!checkedEbookPlayboard)
                                            handleAddToCartEbookPlayboard()
                                          }}
                                        />
                                        <p>{t("Checkout.5")}</p>
                                      </div>
                                      <div className="ebookInner free">
                                        <Checkbox checked={ebookImprime ? true : checkedEbookPlayboard}
                                          onChange={(event) => {
                                            handleAddToCartEbookPlayboard();
                                          }} />
                                        <p>{t("Checkout.6")}</p>
                                      </div>
                                    </div>
                                    <hr />
                                  </div>
                                </>
                              ) : (
                                <div>
                                  <CartItem
                                    key={item.productId}
                                    item={item}
                                    setCart={setCart}
                                  />
                                  <hr />
                                </div>
                              )
                            )
                          }
                          )
                        )
                      }
                    </div>
                  </div>

                  <div className="prixRecap">
                    <div className="sousTotal">

                      <div>
                        <div className="prix-reduc-container">
                          <p className="sousTotalText2">{t("Checkout.totalAvantDiscount")}</p>
                          <p className="itemTotalPrice2">{totalBeforeDiscount.toFixed(2).replace(".", ",")} €</p>
                        </div>
                      </div>

                      <div>
                        {playboardInCart.length !== 0 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">{t("Checkout.7")}</p>
                            <p className="itemTotalPrice">{playboardReducPrice.toFixed(2).replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {xyloInCart.length !== 0 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">{t("Checkout.8")}</p>
                            <p className="itemTotalPrice">{xyloReducPrice.toFixed(2).replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {disXyloInCart.length !== 0 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">{t("Checkout.9")}</p>
                            <p className="itemTotalPrice">{disXyloReducPrice.toFixed(2).replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {disKakoInCart.length !== 0 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">Discount Kako</p>
                            <p className="itemTotalPrice">{disKakoReducPrice.toFixed(2).replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {tourInCart.length !== 0 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">{t("Checkout.10")}</p>
                            <p className="itemTotalPrice">{tourReducPrice.toFixed(2).replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {disTourInCart.length !== 0 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">{t("Checkout.11")}</p>
                            <p className="itemTotalPrice">{disTourReducPrice.toFixed(2).replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {ebookInCart.length !== 0 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">Discount ebook</p>
                            <p className="itemTotalPrice">{ebookReducPrice.toFixed(2).replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {qtyTotale === 2 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">{t("Checkout.12")}</p>
                            <p className="itemTotalPrice">{discountPanier.replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {qtyTotale === 3 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">{t("Checkout.13")}</p>
                            <p className="itemTotalPrice">{discountPanier.replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>

                      <div>
                        {qtyTotale >= 4 && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">{t("Checkout.14")}</p>
                            <p className="itemTotalPrice">{discountPanier.replace(".", ",")} €</p>
                          </div>
                        )}
                      </div>


                      <div>
                        {(codePromo && codePromo.amount) && (
                          <div className="prix-reduc-container">
                            <p className="sousTotalText">{t("Checkout.15")}</p>
                            <p className="itemTotalPrice">{codePromo.amount} %</p>
                          </div>
                        )}
                      </div>

                      <div className="prix-reduc-container">
                        <p className="totalDiscountText">{t("Checkout.16")} (-{percentageTotalDiscount.toFixed(0)}%)</p>
                        <p className="totalDiscountPrice">{totalDiscount.toFixed(2).replace(".", ",")} €</p>
                      </div>

                      <div>

                      </div>

                    </div>

                    <hr />


                    {(cart && cart.products.length) && (
                      <div className="sousTotal">

                        <div>
                          <div className="prix-reduc-container">
                            <p className="sousTotalText2">{t("Checkout.17")}</p>
                            <p className="itemTotalPrice2">{totalPrice1.toFixed(2).replace(".", ",")} €</p>
                          </div>
                        </div>
                        <div>
                          {prixLivraison !== 0 && (
                            <div className="prix-reduc-container">
                              <p className="sousTotalText2">{t("Checkout.18")}</p>
                              <p className="itemTotalPrice2">{prixLivraison.toFixed(2).replace(".", ",")} €</p>
                            </div>
                          )}
                        </div>

                        <hr />
                        <div>

                        </div>

                      </div>
                    )}
                  </div>
                </Collapsible>
                <div className="sousTotal" style={{ marginTop: "15px" }}>
                  <div>
                    <div className="prix-reduc-container">
                      <p className="sousTotalText2" style={{ fontWeight: 'bold' }}>{t("Checkout.19")}</p>
                      <p className="itemTotalPrice2" style={{ fontWeight: 'bold' }}>{totalPrice2.toFixed(2).replace(".", ",")} €</p>
                    </div>
                  </div>
                </div>

                <div className="codepromoContainer">
                  <div className="codepromoContainerCol1">
                    {codePromoIncorrect ? <p style={{ color: 'red' }}>{t("Checkout.20")}</p> : ''}
                    {goodCodePromo ? <p style={{ color: 'green' }}>{t("Checkout.21")}</p> : ''}
                    <input type="text" onChange={event => setpromoCode(event.target.value)} placeholder="Code promo" className="inputPromo" />
                  </div>
                  {codePromoLoading && <Spinner animation="border" role="status" >
                    <span className="sr-only">{t("Checkout.22")}</span>
                  </Spinner>}
                  <div className="codepromoContainerCol2">
                    <button className="buttonCodepromo" onClick={() => { checkPromo() }}>{t("Checkout.23")}</button>
                  </div>
                </div>

                <div className="addOtherArticlesPanier">
                  {qtyTotale === 1 && (
                    <h5 className="addArticleTitle">{t("Checkout.24")}</h5>
                  )}

                  {qtyTotale === 2 && (
                    <h5 className="addArticleTitle">{t("Checkout.25")}</h5>
                  )}

                  {qtyTotale >= 3 && (
                    <h5 className="addArticleTitle">{t("Checkout.26")}</h5>
                  )}
                  <Slider {...settingsSlider}>
                    <div className="innerArticleContainer">
                      <div className="innerArticleTop">
                        <label className="labelArticleTop">
                          <Checkbox
                            id={products[2].id}
                            className="checkArticle"
                            style={{ display: 'inlineBlock' }}
                            checked={checkedPlayboard}
                            onChange={(event) => {
                              handleAddToCartPlayboard()
                            }}></Checkbox>
                          <span className="innerArticleTitle">{t("Checkout.27")}</span>
                          <br></br>
                          <strike className="innerArticleStrike">{products[2].priceAugmente} €</strike>
                          <span className="innerArticlePrice">{products[2].price} €</span>
                          <p className="innerArticleReductionContainer">
                            <span className="innerArticleReduction">({t("Checkout.28")} {products[2].priceAugmente - products[2].price} €)</span>
                          </p>
                        </label>
                      </div>
                      <div className="innerArticleBottom" >
                        <div onClick={() => {
                          handleClickOpenPlayboard()
                        }}>
                          <img src="/PLAYBOARD-ombresSansFond.webp" alt="playboard" className="articleImg" />

                          <p className="modal-know-more">{t("products.savoir")}</p>
                        </div>
                      </div>

                      <SimpleDialogPlayboard open={openPlayboard} onClose={handleClosePlayboard} />

                    </div>

                    <div className="innerArticleContainer">
                      <div className="innerArticleTop">
                        <label className="labelArticleTop">
                          <Checkbox style={{ display: 'inlineBlock' }} onChange={() => {
                            handleAddToCartXylo()
                          }} checked={checkedXylo}></Checkbox>
                          <span className="innerArticleTitle">{t("Checkout.29")}</span>
                          <br></br>
                          <strike className="innerArticleStrike">{products[0].priceAugmente} €</strike>
                          <span className="innerArticlePrice">{products[0].price} €</span>
                          <br></br>
                          <p className="innerArticleReductionContainer">
                            <span className="innerArticleReduction">{t("Checkout.30")} {products[5].price}€ {t("Checkout.31")}</span>
                          </p>
                        </label>
                      </div>
                      <div className="innerArticleBottom">
                        <div onClick={() => {
                          handleClickOpenXylo()
                        }}>
                          <img src="/Xylo-OmbrageSansFond.webp" alt="playboard" className="articleImg" />

                          <p className="modal-know-more">{t("products.savoir")}</p>
                        </div>

                      </div>
                      <SimpleDialogXylo open={openXylo} onClose={handleCloseXylo} />

                    </div>

                    <div className="innerArticleContainer">
                      <div className="innerArticleTop">
                        <label className="labelArticleTop">
                          <Checkbox style={{ display: 'inlineBlock' }} onChange={() => {
                            handleAddToCartTour()
                          }} checked={checkedTour}></Checkbox>
                          <span className="innerArticleTitle">{t("Checkout.32")}</span>
                          <br></br>
                          <strike className="innerArticleStrike">{products[1].priceAugmente} €</strike>
                          <span className="innerArticlePrice">{products[1].price} €</span>
                          <br></br>
                          <p className="innerArticleReductionContainer">
                            <span className="innerArticleReduction">{t("Checkout.30")} {products[6].price}€ {t("Checkout.31")}</span>
                          </p>
                        </label>
                      </div>
                      <div className="innerArticleBottom" >
                        <div onClick={() => {
                          handleClickOpenTour()
                        }}>
                          <img src="/tour.png" alt="playboard" className="articleImg" />

                          <p className="modal-know-more">{t("products.savoir")}</p>
                        </div>
                      </div>
                      <SimpleDialogTour open={openTour} onClose={handleCloseTour} />

                    </div>

                  </Slider>
                </div>

              </div>

              <div className="separationCheckout computer"></div>



              <div className="prixContainer">
                {cart ?
                  <div>
                    <div className="prixText">
                      <a href="javascript:void(0);" onClick={() => {
                        setGoCart(true)
                        setGoPaiement(false)
                      }} className={goCart ? 'coordonneesLinkContainer mobile' : 'coordonneesLinkContainerLight mobile'}>
                        <div className={goCart ? 'coordonneesDiv' : 'coordonneesDivLight'}>
                          <p className="coordonneesNum">1</p>
                          <div>
                            <p className="coordonneesTitle">{t("Checkout.2")}</p>
                          </div>
                        </div>
                      </a>
                      <a href="javascript:void(0);" id="addresses-block" onClick={() => {
                        setGoCart(false)
                        setGoPaiement(false)
                      }} className={!goPaiement && !goCart ? 'coordonneesLinkContainer' : 'coordonneesLinkContainerLight'}>
                        <div className={!goPaiement && !goCart ? 'coordonneesDiv' : 'coordonneesDivLight'}>
                          <p className="coordonneesNum">2</p>
                          <div>
                            <p className="coordonneesTitle">{t("Checkout.33")}</p>
                            <p className="coordonneesSubTitle computer">{t("Checkout.34")}</p>
                          </div>
                        </div>
                      </a>
                      <a href="javascript:void(0);" onClick={() => setGoCart(false)} className={goPaiement && !goCart ? 'coordonneesLinkContainer' : 'coordonneesLinkContainerLight'} id="go-to-payment-header">
                        <div className={goPaiement && !goCart ? 'coordonneesDiv' : 'coordonneesDivLight'}>
                          <p className="coordonneesNum">3</p>
                          <div>
                            <p className="coordonneesTitle">{t("Checkout.35")}</p>
                            <p className="coordonneesSubTitle computer">{t("Checkout.36")}</p>
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="checkoutContent">
                      <div className={goCart ? 'showTab mobile' : 'hideTab mobile'}>
                        <div className="productContainer">
                          <div>
                            {
                              cart && cart.products.length && (
                                cart.products.map((item) => {
                                  return (
                                    item.productId == 3163 ? (
                                      <>
                                        <div>
                                          <CartItem
                                            key={item.productId}
                                            item={item}
                                            setCart={setCart}
                                          />
                                          <div className="ebookContainer">
                                            <div className="ebookInner free">
                                              <Checkbox
                                                checked={true}
                                                disabled
                                                onChange={() => {
                                                  setCheckedEbookPlayboard(!checkedEbookPlayboard)
                                                  handleAddToCartEbookPlayboard()
                                                }}
                                              />
                                              <p>{t("Checkout.5")}</p>
                                            </div>
                                            <div className="ebookInner free">
                                              <Checkbox checked={ebookImprime ? true : checkedEbookPlayboard}
                                                onChange={(event) => {
                                                  handleAddToCartEbookPlayboard();
                                                }} />
                                              <p>{t("Checkout.6")}</p>
                                            </div>
                                          </div>
                                          <hr />
                                        </div>
                                      </>
                                    ) : (
                                      <div>
                                        <CartItem
                                          key={item.productId}
                                          item={item}
                                          setCart={setCart}
                                        />
                                        <hr />
                                      </div>
                                    )
                                  )
                                }
                                )
                              )
                            }
                          </div>
                        </div>

                        <div className="prixRecap">
                          <div className="sousTotal">

                            <div>
                              <div className="prix-reduc-container">
                                <p className="sousTotalText2">{t("Checkout.totalAvantDiscount")}</p>
                                <p className="itemTotalPrice2">{totalBeforeDiscount.toFixed(2)} €</p>
                              </div>
                            </div>

                            <div>
                              {playboardInCart.length !== 0 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">{t("Checkout.7")}</p>
                                  <p className="itemTotalPrice">{playboardReducPrice} €</p>
                                </div>
                              )}
                            </div>

                            <div>
                              {xyloInCart.length !== 0 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">{t("Checkout.8")}</p>
                                  <p className="itemTotalPrice">{xyloReducPrice} €</p>
                                </div>
                              )}
                            </div>

                            <div>
                              {disXyloInCart.length !== 0 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">{t("Checkout.9")}</p>
                                  <p className="itemTotalPrice">{disXyloReducPrice} €</p>
                                </div>
                              )}
                            </div>

                            <div>
                              {disKakoInCart.length !== 0 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">Discount Kako</p>
                                  <p className="itemTotalPrice">{disKakoReducPrice} €</p>
                                </div>
                              )}
                            </div>

                            <div>
                              {tourInCart.length !== 0 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">{t("Checkout.10")}</p>
                                  <p className="itemTotalPrice">{tourReducPrice} €</p>
                                </div>
                              )}
                            </div>

                            <div>
                              {disTourInCart.length !== 0 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">{t("Checkout.11")}</p>
                                  <p className="itemTotalPrice">{disTourReducPrice} €</p>
                                </div>
                              )}
                            </div>

                            <div>
                              {ebookInCart.length !== 0 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">Discount ebook</p>
                                  <p className="itemTotalPrice">{ebookReducPrice} €</p>
                                </div>
                              )}
                            </div>

                            <div>
                              {qtyTotale === 2 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">{t("Checkout.12")}</p>
                                  <p className="itemTotalPrice">{discountPanier} €</p>
                                </div>
                              )}
                            </div>

                            <div>
                              {qtyTotale === 3 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">{t("Checkout.13")}</p>
                                  <p className="itemTotalPrice">{discountPanier} €</p>
                                </div>
                              )}
                            </div>

                            <div>
                              {qtyTotale >= 4 && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">{t("Checkout.14")}</p>
                                  <p className="itemTotalPrice">{discountPanier} €</p>
                                </div>
                              )}
                            </div>


                            <div>
                              {(codePromo && codePromo.amount) && (
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText">{t("Checkout.15")}</p>
                                  <p className="itemTotalPrice">{codePromo.amount} %</p>
                                </div>
                              )}
                            </div>

                            <div className="prix-reduc-container">
                              <p className="totalDiscountText">{t("Checkout.16")} (-{percentageTotalDiscount.toFixed(0)}%)</p>
                              <p className="totalDiscountPrice">{totalDiscount.toFixed(2)} €</p>
                            </div>

                            <div>

                            </div>

                          </div>

                          <hr />


                          {(cart && cart.products.length) && (
                            <div className="sousTotal">

                              <div>
                                <div className="prix-reduc-container">
                                  <p className="sousTotalText2">{t("Checkout.17")}</p>
                                  <p className="itemTotalPrice2">{totalPrice1.toFixed(2)} €</p>
                                </div>
                              </div>
                              <div>
                                {prixLivraison !== 0 && (
                                  <div className="prix-reduc-container">
                                    <p className="sousTotalText2">{t("Checkout.18")}</p>
                                    <p className="itemTotalPrice2">{prixLivraison} €</p>
                                  </div>
                                )}
                              </div>

                              <hr />
                              <div>

                              </div>

                            </div>
                          )}
                        </div>
                        <div className="sousTotal" style={{ marginTop: "15px" }}>
                          <div>
                            <div className="prix-reduc-container">
                              <p className="sousTotalText2" style={{ fontWeight: 'bold' }}>{t("Checkout.19")}</p>
                              <p className="itemTotalPrice2" style={{ fontWeight: 'bold' }}>{totalPrice2.toFixed(2)} €</p>
                              <input type="hidden" id="total-price" value={totalPrice2.toFixed(2)} />
                            </div>
                          </div>
                        </div>

                        <div className="codepromoContainer">
                          <div className="codepromoContainerCol1">
                            {codePromoIncorrect ? <p style={{ color: 'red' }}>{t("Checkout.20")}</p> : ''}
                            {goodCodePromo ? <p style={{ color: 'green' }}>{t("Checkout.21")}</p> : ''}
                            <input type="text" onChange={event => setpromoCode(event.target.value)} placeholder="Code promo" className="inputPromo" />
                          </div>
                          {codePromoLoading && <Spinner animation="border" role="status" >
                            <span className="sr-only">{t("Checkout.22")}</span>
                          </Spinner>}
                          <div className="codepromoContainerCol2">
                            <button className="buttonCodepromo" onClick={() => { checkPromo() }}>{t("Checkout.23")}</button>
                          </div>
                        </div>

                        <div className="addOtherArticlesPanier">
                          {qtyTotale === 1 && (
                            <h5 className="addArticleTitle">{t("Checkout.24")}</h5>
                          )}

                          {qtyTotale === 2 && (
                            <h5 className="addArticleTitle">{t("Checkout.25")}</h5>
                          )}

                          {qtyTotale >= 3 && (
                            <h5 className="addArticleTitle">{t("Checkout.26")}</h5>
                          )}
                          <Slider {...settingsSlider}>
                            <div className="innerArticleContainer">
                              <div className="innerArticleTop">
                                <label className="labelArticleTop">
                                  <Checkbox
                                    id={products[2].id}
                                    className="checkArticle"
                                    style={{ display: 'inlineBlock' }}
                                    checked={checkedPlayboard}
                                    onChange={(event) => {
                                      handleAddToCartPlayboard()
                                    }}></Checkbox>
                                  <span className="innerArticleTitle">{t("Checkout.27")}</span>
                                  <br></br>
                                  <strike className="innerArticleStrike">{products[2].priceAugmente} €</strike>
                                  <span className="innerArticlePrice">{products[2].price} €</span>
                                  <p className="innerArticleReductionContainer">
                                    <span className="innerArticleReduction">({t("Checkout.28")} {products[2].priceAugmente - products[2].price} €)</span>
                                  </p>
                                </label>
                              </div>
                              <div className="innerArticleBottom" >
                                <div onClick={() => {
                                  handleClickOpenPlayboard()
                                }}>
                                  <img src="/PLAYBOARD-ombresSansFond.webp" alt="playboard" className="articleImg" />

                                  <p className="modal-know-more">{t("products.savoir")}</p>
                                </div>
                              </div>

                              <SimpleDialogPlayboard open={openPlayboard} onClose={handleClosePlayboard} />

                            </div>

                            <div className="innerArticleContainer">
                              <div className="innerArticleTop">
                                <label className="labelArticleTop">
                                  <Checkbox style={{ display: 'inlineBlock' }} onChange={() => {
                                    handleAddToCartXylo()
                                  }} checked={checkedXylo}></Checkbox>
                                  <span className="innerArticleTitle">{t("Checkout.29")}</span>
                                  <br></br>
                                  <strike className="innerArticleStrike">{products[0].priceAugmente} €</strike>
                                  <span className="innerArticlePrice">{products[0].price} €</span>
                                  <br></br>
                                  <p className="innerArticleReductionContainer">
                                    <span className="innerArticleReduction">{t("Checkout.30")} {products[5].price}€ {t("Checkout.31")}</span>
                                  </p>
                                </label>
                              </div>
                              <div className="innerArticleBottom">
                                <div onClick={() => {
                                  handleClickOpenXylo()
                                }}>
                                  <img src="/Xylo-OmbrageSansFond.webp" alt="playboard" className="articleImg" />

                                  <p className="modal-know-more">{t("products.savoir")}</p>
                                </div>

                              </div>
                              <SimpleDialogXylo open={openXylo} onClose={handleCloseXylo} />

                            </div>

                            <div className="innerArticleContainer">
                              <div className="innerArticleTop">
                                <label className="labelArticleTop">
                                  <Checkbox style={{ display: 'inlineBlock' }} onChange={() => {
                                    handleAddToCartTour()
                                  }} checked={checkedTour}></Checkbox>
                                  <span className="innerArticleTitle">{t("Checkout.32")}</span>
                                  <br></br>
                                  <strike className="innerArticleStrike">{products[1].priceAugmente} €</strike>
                                  <span className="innerArticlePrice">{products[1].price} €</span>
                                  <br></br>
                                  <p className="innerArticleReductionContainer">
                                    <span className="innerArticleReduction">{t("Checkout.30")} {products[6].price}€ {t("Checkout.31")}</span>
                                  </p>
                                </label>
                              </div>
                              <div className="innerArticleBottom" >
                                <div onClick={() => {
                                  handleClickOpenTour()
                                }}>
                                  <img src="/tour.png" alt="playboard" className="articleImg" />

                                  <p className="modal-know-more">{t("products.savoir")}</p>
                                </div>
                              </div>
                              <SimpleDialogTour open={openTour} onClose={handleCloseTour} />

                            </div>

                          </Slider>
                        </div>
                        <a id="cart-to-addresses" onClick={() => setGoCart(false)}>
                          <button className="cart-valide">{t("Checkout.56")}</button>
                        </a>
                        <p className="question" onClick={async () => {
                          await router.push('/contact')
                        }}>{t("Playboard102")}</p>
                      </div>
                      <div className={!goPaiement && !goCart ? 'showTab' : 'hideTab'}>
                        <Formik
                          initialValues={getInitialValues()}
                          enableReinitialize={true}
                          validationSchema={livraisonSchema}
                          onSubmit={async (values, actions) => {


                            let donnesClient = {}
                            if (checked) {
                              donnesClient = {
                                adresseFacturation: values.adresseFacturation,
                                codePostalFacturation: values.codePostalFacturation,
                                villeFacturation: values.villeFacturation,
                                villeLivraison: values.villeLivraison,
                                email: values.email,
                                nom: values.nom,
                                prenom: values.prenom,
                                phone: values.phone,
                                pays: values.pays,
                                prixLivraison,
                                titreLivraison,
                                userLang: i18next.language,
                                adresseLivraison: values.adresseLivraison,
                                codePostalLivraison: values.codePostalLivraison,
                                total: totalPrice2,
                                sousTotal: totalPrice1
                              }
                            } else {
                              donnesClient = {
                                adresseFacturation: values.adresseLivraison,
                                codePostalFacturation: values.codePostalLivraison,
                                villeFacturation: values.villeLivraison,
                                villeLivraison: values.villeLivraison,
                                email: values.email,
                                nom: values.nom,
                                pays: values.pays,
                                prenom: values.prenom,
                                phone: values.phone,
                                prixLivraison,
                                titreLivraison,
                                userLang: i18next.language,
                                adresseLivraison: values.adresseLivraison,
                                codePostalLivraison: values.codePostalLivraison,
                                total: totalPrice2.toFixed(2),
                                sousTotal: totalPrice1
                              }
                            }
                            actions.setFieldValue("email", values.email);
                            actions.setSubmitting(false);
                            if (!checked1 && !checked2 && !checked3) {
                              setErrorLivraison(true)
                            } else {
                              localStorage.setItem('livraison', JSON.stringify(donnesClient))
                              setGoPaiement(true)
                              setIsCollapsibleOpen(false)
                            }
                          }}
                        >
                          {props => (
                            <form className={classes.root} noValidate autoComplete="off">
                              <div className="mobile">
                                <Collapsible trigger={totalDiv} open={isCollapsibleOpen} >
                                  <div>
                                    {
                                      cart && cart.products.length && (
                                        cart.products.map((item) => {
                                          return (
                                            item.productId == 3163 ? (
                                              <>
                                                <div>
                                                  <CartItemSimple
                                                    key={item.productId}
                                                    item={item}
                                                    setCart={setCart}
                                                  />
                                                  <div className="ebookContainer">
                                                    <div className="ebookInner free">
                                                      <Checkbox
                                                        checked={true}
                                                        disabled
                                                        onChange={() => {
                                                          setCheckedEbookPlayboard(!checkedEbookPlayboard)
                                                          handleAddToCartEbookPlayboard()
                                                        }}
                                                      />
                                                      <p>{t("Checkout.5")}</p>
                                                    </div>
                                                    <div className="ebookInner free">
                                                      <Checkbox checked={ebookImprime ? true : checkedEbookPlayboard}
                                                        onChange={(event) => {
                                                          handleAddToCartEbookPlayboard();
                                                        }} />
                                                      <p>{t("Checkout.6")}</p>
                                                    </div>
                                                  </div>
                                                  <hr />
                                                </div>
                                              </>
                                            ) : (
                                              <div>
                                                <CartItemSimple
                                                  key={item.productId}
                                                  item={item}
                                                  setCart={setCart}
                                                />
                                                <hr />
                                              </div>
                                            )
                                          )
                                        }
                                        )
                                      )
                                    }
                                  </div>
                                </Collapsible>
                              </div>
                              <div className="checkout-form">
                                <div className="inputContainer">
                                  <TextField
                                    required
                                    value={props.values.prenom}
                                    onChange={props.handleChange('prenom')}
                                    id="prenom"
                                    label={t("Checkout.fields.prenom")}
                                    variant="outlined"
                                    className="inputMoyenGauche"
                                  />
                                  {props.errors.prenom && props.touched.prenom && <div style={{ color: 'red' }}>{props.errors.prenom}</div>}

                                  <TextField
                                    id="nom"
                                    value={props.values.nom}
                                    onChange={props.handleChange('nom')}
                                    required
                                    label={t("Checkout.fields.nom")}
                                    variant="outlined"
                                    className="inputMoyenDroit"
                                  />
                                  {props.errors.nom && props.touched.nom && <div style={{ color: 'red' }}>{props.errors.nom}</div>}

                                </div>
                                <div>
                                  <TextField
                                    required
                                    value={props.values.email}
                                    onChange={props.handleChange('email')}
                                    id="email"
                                    label={t("Checkout.fields.email")}
                                    variant="outlined"
                                    onFocus={() => setFirstStep(true)}
                                    className="bigInput"
                                  />
                                </div>
                                {props.errors.email && props.touched.email && <div style={{ color: 'red' }}>{props.errors.email}</div>}

                                <div className="MuiFormControl-root MuiTextField-root bigInput">
                                  <label style={{ zIndex: "2" }} className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-filled Mui-required Mui-required" data-shrink="true" for="pays" id="pays-label">{t("Checkout.fields.pays")}<span aria-hidden="true" class="MuiFormLabel-asterisk MuiInputLabel-asterisk"> *</span></label>
                                  <SelectSearch onChange={(val) => {
                                    props.handleChange('pays');
                                    setPays(val);
                                    setChecked2(false);
                                    setChecked1(false);
                                    setChecked3(false);
                                    props.setFieldValue('pays', val);
                                  }} options={countries.listCountries} value={props.values.pays} id="pays" name="country" placeholder={t("Checkout.fields.pays")} search={true} filterOptions={fuzzySearch} />
                                </div>
                                {props.errors.pays && props.touched.pays && <div style={{ color: 'red' }}>{t("Checkout.37")}</div>}
                                <input type="hidden" id="pays_holder" value={props.values.pays} />


                                <div>
                                  <TextField
                                    required
                                    value={props.values.adresseLivraison}
                                    onChange={props.handleChange('adresseLivraison')}
                                    id="adresse"
                                    label={t("Checkout.fields.rue")}
                                    variant="outlined"
                                    className="bigInput"
                                  />
                                  {props.errors.adresseLivraison && props.touched.adresseLivraison && <div style={{ color: 'red' }}>{props.errors.adresseLivraison}</div>}
                                </div>
                                <div>
                                  <TextField
                                    required
                                    value={props.values.codePostalLivraison}
                                    onChange={props.handleChange('codePostalLivraison')}
                                    id="postalcode"
                                    label={t("Checkout.fields.cp")}
                                    variant="outlined"
                                    className="bigInput"
                                  />
                                  {props.errors.codePostalLivraison && props.touched.codePostalLivraison && <div style={{ color: 'red' }}>{props.errors.codePostalLivraison}</div>}
                                </div>

                                <div>
                                  <TextField
                                    id="ville"
                                    required
                                    value={props.values.villeLivraison}
                                    onChange={props.handleChange('villeLivraison')}
                                    label={t("Checkout.fields.ville")}
                                    variant="outlined"
                                    className="bigInput"
                                  />
                                  {props.errors.villeLivraison && props.touched.villeLivraison && <div style={{ color: 'red' }}>{props.errors.villeLivraison}</div>}
                                </div>

                                <div className="inputContainer">
                                  <TextField
                                    value={props.values.phone}
                                    onChange={props.handleChange('phone')}
                                    id="phone"
                                    label={t("Checkout.fields.tel")}
                                    variant="outlined"
                                    className="bigInput"
                                  />
                                </div>

                                <div className="checkboxContainer">
                                  <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                  />
                                  <p className="paragraphFacturation">{t("Checkout.fields.fac")}</p>
                                </div>

                                {checked ? (
                                  <div className="facturationDifferente">
                                    <div className="inputContainer">
                                      <TextField
                                        required
                                        value={props.values.adresseFacturation}
                                        onChange={props.handleChange('adresseFacturation')}
                                        id="outlined-error"
                                        label={t("Checkout.fields.rue")}
                                        variant="outlined"
                                        className="inputMoyenGauche"
                                      />
                                      <TextField
                                        required
                                        value={props.values.villeFacturation}
                                        onChange={props.handleChange('villeFacturation')}
                                        id="outlined-error"
                                        label={t("Checkout.fields.ville")}
                                        variant="outlined"
                                        className="inputMoyenDroit"
                                      />
                                    </div>

                                    <div className="inputContainer">
                                      <TextField
                                        required
                                        value={props.values.codePostalFacturation}
                                        onChange={props.handleChange('codePostalFacturation')}
                                        id="outlined-error"
                                        label={t("Checkout.fields.cp")}
                                        variant="outlined"
                                        className="inputMoyenGauche"
                                      />
                                      <TextField
                                        select
                                        value={props.values.paysFacturation}
                                        onChange={props.handleChange('paysFacturation')}
                                        label={t("Checkout.fields.pays")}
                                        helperText="Veuillez sélectionner un pays"
                                        defaultValue="France"
                                        className="inputMoyenDroit"
                                      >
                                        {countries.listCountries.map((option) => (
                                          <MenuItem key={option.code} value={option.name}>
                                            {option.name}
                                          </MenuItem>
                                        ))}

                                      </TextField>
                                    </div>
                                  </div>
                                ) : ''}





                                <div className="livraison">
                                  <h4 className="livraisonTitle">{t("Checkout.39")}</h4>
                                  {(pays === 'FR' || pays === 'MC') && (
                                    <div className="livraisonListContainer">
                                      <div className="livraisonRow">
                                        <div className="checkboxLivraisonContainer">
                                          <label className="livraisonChoice">
                                            <div className="livraisonInnerRow">
                                              <Checkbox
                                                checked={checked1}
                                                onChange={() => {
                                                  handleChange1(event, 4.99, "Livraison standard")
                                                  setMondialRelay(false)
                                                }}
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                              <p>{t("Checkout.40")}</p>
                                            </div>
                                          </label>
                                        </div>
                                        <div className="livraisonPrice">
                                          <p>4,99 €</p>
                                        </div>
                                      </div>

                                      <div className="livraisonRow">
                                        <div className="checkboxLivraisonContainer">
                                          <label className="livraisonChoice">
                                            <div className="livraisonInnerRow">
                                              <Checkbox
                                                id="relay_check"
                                                checked={checked2}
                                                onChange={() => {
                                                  handleChange2(event, 4.99, "Livraison en point Mondial Relay")
                                                  setMondialRelay(true)
                                                  handleClickOpenRelay()
                                                }}
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                              <p>{t("Checkout.41")}</p>
                                            </div>
                                          </label>
                                        </div>
                                        <div className="livraisonPrice">
                                          <p>4,99 €</p>
                                        </div>
                                      </div>

                                      <div className="livraisonRow">
                                        <div className="checkboxLivraisonContainer">
                                          <label className="livraisonChoice">
                                            <div className="livraisonInnerRow">
                                              <Checkbox
                                                checked={checked3}
                                                onChange={() => {
                                                  handleChange3(event, 6.99, "Livraison express")
                                                  setMondialRelay(false)
                                                }}
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                              <p>{t("Checkout.42")}</p>
                                            </div>
                                          </label>

                                        </div>
                                        <div className="livraisonPrice">
                                          <p>6,99 €</p>
                                        </div>
                                      </div>
                                      {errorLivraison ? <p className='text-danger'>{t("Checkout.43")}</p> : ''}
                                    </div>

                                  )}


                                  {pays === 'US' && (
                                    <div className="livraisonListContainer">
                                      <div className="livraisonRow">
                                        <div className="checkboxLivraisonContainer">
                                          <label className="livraisonChoice">
                                            <div className="livraisonInnerRow">
                                              <Checkbox
                                                checked={checked1}
                                                onChange={() => handleChange3(event, 19.99)}
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                              <p>{t("Checkout.44")}</p>
                                            </div>
                                          </label>

                                        </div>
                                        <div className="livraisonPrice">
                                          <p>19,99 €</p>
                                        </div>
                                        {errorLivraison ? <p className='text-danger'>{t("Checkout.43")}</p> : ''}

                                      </div>
                                    </div>
                                  )}


                                  {(pays === 'RU') && (
                                    <div className="livraisonListContainer">
                                      <div className="livraisonRow">
                                        <div className="checkboxLivraisonContainer">
                                          <label className="livraisonChoice">
                                            <div className="livraisonInnerRow">
                                              <Checkbox
                                                checked={checked1}
                                                onChange={() => handleChange1(event, 6.99, "Livraison standard")}
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                              <p>{t("Checkout.46")}</p>
                                            </div>
                                          </label>

                                        </div>
                                        <div className="livraisonPrice">
                                          <p>6,99 €</p>
                                        </div>
                                      </div>

                                      <div className="livraisonRow">
                                        <div className="checkboxLivraisonContainer">
                                          <label className="livraisonChoice">
                                            <div className="livraisonInnerRow">
                                              <Checkbox
                                                checked={checked2}
                                                onChange={() => handleChange2(event, 9.99, "Livraison express")}
                                                inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                              <p>{t("Checkout.47")}</p>
                                            </div>
                                          </label>
                                        </div>
                                        <div className="livraisonPrice">
                                          <p>9,99 €</p>
                                        </div>
                                      </div>
                                      {errorLivraison ? <p className='text-danger'>{t("Checkout.43")}</p> : ''}

                                    </div>
                                  )}



                                  {(pays === 'AL'
                                    || pays === 'DZ'
                                    || pays === 'AR'
                                    || pays === 'BO'
                                    || pays === 'BG'
                                    || pays === 'BR'
                                    || pays === 'CA'
                                    || pays === 'CL'
                                    || pays === 'CY'
                                    || pays === 'CO'
                                    || pays === 'CR'
                                    || pays === 'GI'
                                    || pays === 'GP'
                                    || pays === 'GT'
                                    || pays === 'GY'
                                    || pays === 'GF'
                                    || pays === 'ISR'
                                    || pays === 'LR'
                                    || pays === 'LB'
                                    || pays === 'MT'
                                    || pays === 'MA'
                                    || pays === 'MQ'
                                    || pays === 'YT'
                                    || pays === 'MX'
                                    || pays === 'MD'
                                    || pays === 'NC'
                                    || pays === 'PA'
                                    || pays === 'PY'
                                    || pays === 'PR'
                                    || pays === 'PO'
                                    || pays === 'PM'
                                    || pays === 'VC'
                                    || pays === 'TW'
                                    || pays === 'TJ'
                                    || pays === 'UA'
                                    || pays === 'UY'
                                    || pays === 'VU'
                                    || pays === 'VE'
                                    || pays === 'EQ') && (
                                      <div className="livraisonListContainer">
                                        <div className="livraisonRow">
                                          <div className="checkboxLivraisonContainer">
                                            <label className="livraisonChoice">
                                              <div className="livraisonInnerRow">
                                                <Checkbox
                                                  checked={checked1}
                                                  onChange={() => handleChange1(event, 47.99, "Livraison standard")}
                                                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                <p>{t("Checkout.48")}</p>
                                              </div>
                                            </label>
                                          </div>
                                          <div className="livraisonPrice">
                                            <p>47,99 €</p>
                                          </div>
                                        </div>

                                        <div className="livraisonRow">
                                          <div className="checkboxLivraisonContainer">
                                            <label className="livraisonChoice">
                                              <div className="livraisonInnerRow">
                                                <Checkbox
                                                  checked={checked2}
                                                  onChange={() => handleChange2(event, 54.99, "Livraison express")}
                                                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                <p>{t("Checkout.49")}</p>
                                              </div>
                                            </label>
                                          </div>
                                          <div className="livraisonPrice">
                                            <p>54,99 €</p>
                                          </div>
                                        </div>
                                        {errorLivraison ? <p className='text-danger'>{t("Checkout.43")}</p> : ''}

                                      </div>
                                    )}



                                  {(pays === 'ES'
                                    || pays === 'DE'
                                    || pays === 'AD'
                                    || pays === 'AT'
                                    || pays === 'BE'
                                    || pays === 'DK'
                                    || pays === 'HU'
                                    || pays === 'IR'
                                    || pays === 'IT'
                                    || pays === 'LU'
                                    || pays === 'LI'
                                    || pays === 'PB'
                                    || pays === 'PL'
                                    || pays === 'PT'
                                    || pays === 'RT') && (
                                      <div className="livraisonListContainer">
                                        <div className="livraisonRow">
                                          <div className="checkboxLivraisonContainer">
                                            <label className="livraisonChoice">
                                              <div className="livraisonInnerRow">
                                                <Checkbox
                                                  checked={checked1}
                                                  onChange={() => handleChange1(event, 9.99, "Livraison standard")}
                                                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                <p>{t("Checkout.50")}</p>
                                              </div>
                                            </label>
                                          </div>
                                          <div className="livraisonPrice">
                                            <p>9,99 €</p>
                                          </div>
                                        </div>

                                        <div className="livraisonRow">
                                          <div className="checkboxLivraisonContainer">
                                            <label className="livraisonChoice">
                                              <div className="livraisonInnerRow">
                                                <Checkbox
                                                  checked={checked2}
                                                  onChange={() => handleChange2(event, 12.99, "Livraison express")}
                                                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                <p>{t("Checkout.51")}</p>
                                              </div>
                                            </label>
                                          </div>
                                          <div className="livraisonPrice">
                                            <p>12,99 €</p>
                                          </div>
                                        </div>
                                        {errorLivraison ? <p className='text-danger'>{t("Checkout.43")}</p> : ''}

                                      </div>
                                    )}



                                  {(pays === 'HR'
                                    || pays === 'IS'
                                    || pays === 'NO') && (
                                      <div className="livraisonListContainer">
                                        <div className="livraisonRow">
                                          <div className="checkboxLivraisonContainer">
                                            <label className="livraisonChoice">
                                              <div className="livraisonInnerRow">
                                                <Checkbox
                                                  checked={checked1}
                                                  onChange={() => handleChange1(event, 24.99, "Livraison standard")}
                                                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                <p>{t("Checkout.52")}</p>
                                              </div>
                                            </label>
                                          </div>
                                          <div className="livraisonPrice">
                                            <p>24,99 €</p>
                                          </div>
                                        </div>

                                        <div className="livraisonRow">
                                          <div className="checkboxLivraisonContainer">
                                            <label className="livraisonChoice">
                                              <div className="livraisonInnerRow">
                                                <Checkbox
                                                  checked={checked2}
                                                  onChange={() => handleChange2(event, 29.99, "Livraison express")}
                                                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                <p>{t("Checkout.53")}</p>
                                              </div>
                                            </label>
                                          </div>
                                          <div className="livraisonPrice">
                                            <p>29,99 €</p>
                                          </div>
                                        </div>
                                        {errorLivraison ? <p className='text-danger'>{t("Checkout.53")}</p> : ''}

                                      </div>
                                    )}



                                  {(pays === 'EE'
                                    || pays === 'FI'
                                    || pays === 'GR'
                                    || pays === 'LT'
                                    || pays === 'LIT'
                                    || pays === 'RO'
                                    || pays === 'SK'
                                    || pays === 'SI'
                                    || pays === 'SO') && (
                                      <div className="livraisonListContainer">
                                        <div className="livraisonRow">
                                          <div className="checkboxLivraisonContainer">
                                            <label className="livraisonChoice">
                                              <div className="livraisonInnerRow">
                                                <Checkbox
                                                  checked={checked1}
                                                  onChange={() => handleChange1(event, 14.99, "Livraison standard")}
                                                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                <p>{t("Checkout.50")}</p>
                                              </div>
                                            </label>
                                          </div>
                                          <div className="livraisonPrice">
                                            <p>14,99 €</p>
                                          </div>
                                        </div>

                                        <div className="livraisonRow">
                                          <div className="checkboxLivraisonContainer">
                                            <label className="livraisonChoice">
                                              <div className="livraisonInnerRow">
                                                <Checkbox
                                                  checked={checked2}
                                                  onChange={() => handleChange2(event, 19.99, "Livraison express")}
                                                  inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                                <p>{t("Checkout.51")}</p>
                                              </div>
                                            </label>
                                          </div>
                                          <div className="livraisonPrice">
                                            <p>19,99 €</p>
                                          </div>
                                        </div>
                                        {errorLivraison ? <p className='text-danger'>{t("Checkout.43")}</p> : ''}

                                      </div>
                                    )}

                                  {(pays === '') && (
                                    <label style={{ textAlign: "center", width: "100%" }}>{t("Checkout.54")}</label>
                                  )}




                                </div>

                                <input type="hidden" id="relay_value"></input>
                                <div className={mondialRelay ? "display" : "displayNone"} >
                                  <label id="relay_text" onClick={() => {
                                    handleClickOpenRelay()
                                  }}>
                                    {t("Checkout.55")}
                                  </label>
                                  <SimpleDialogRelay open={openRelay} onClose={handleCloseRelay} />
                                </div>



                                <a id="addresses-to-payment" >
                                  <button className="cart-valide" id="cart-valide" type="submit" onClick={props.handleSubmit}>{t("Checkout.56")}</button>
                                </a>
                                <p className="question" onClick={async () => {
                                  await router.push('/contact')
                                }}>{t("Playboard102")}</p>
                              </div>
                            </form>
                          )
                          }
                        </Formik>
                      </div>
                      <div className={goPaiement && !goCart ? 'showTab' : 'hideTab'}>
                        <Elements stripe={stripePromise}>
                          <div className="formData">
                            <CheckoutFormStripe
                              adress={adresseLivraison}
                              codePostal={codePostalLivraison}
                              ville={villeLivraison}
                              email={email}
                              price={totalPrice1}
                              prenom={prenom}
                              nom={nom}
                              donneesClient={donneesClient}
                              prixLivraison={prixLivraison}
                              totalPrice2={totalPrice2}
                              pays={pays}
                              adresseFacturation={adresseFacturation}
                              paysFacturation={paysFacturation}
                              villeFacturation={villeFacturation}
                              codePostalFacturation={codePostalFacturation}
                              phone={phone}
                            />

                            <div className="addOtherArticlesPanier">
                              {qtyTotale === 1 && (
                                <h5 className="addArticleTitle">{t("Checkout.24")}</h5>
                              )}

                              {qtyTotale === 2 && (
                                <h5 className="addArticleTitle">{t("Checkout.25")}</h5>
                              )}

                              {qtyTotale >= 3 && (
                                <h5 className="addArticleTitle">{t("Checkout.26")}</h5>
                              )}
                              <Slider {...settingsSlider}>
                                <div className="innerArticleContainer">
                                  <div className="innerArticleTop">
                                    <label className="labelArticleTop">
                                      <Checkbox
                                        id={products[2].id}
                                        className="checkArticle"
                                        style={{ display: 'inlineBlock' }}
                                        checked={checkedPlayboard}
                                        onChange={(event) => {
                                          handleAddToCartPlayboard()
                                        }}></Checkbox>
                                      <span className="innerArticleTitle">{t("Checkout.27")}</span>
                                      <br></br>
                                      <strike className="innerArticleStrike">{products[2].priceAugmente} €</strike>
                                      <span className="innerArticlePrice">{products[2].price} €</span>
                                      <p className="innerArticleReductionContainer">
                                        <span className="innerArticleReduction">({t("Checkout.28")} {products[2].priceAugmente - products[2].price} €)</span>
                                      </p>
                                    </label>
                                  </div>
                                  <div className="innerArticleBottom" >
                                    <div onClick={() => {
                                      handleClickOpenPlayboard()
                                    }}>
                                      <img src="/PLAYBOARD-ombresSansFond.webp" alt="playboard" className="articleImg" />

                                      <p className="modal-know-more">{t("products.savoir")}</p>
                                    </div>
                                  </div>

                                  <SimpleDialogPlayboard open={openPlayboard} onClose={handleClosePlayboard} />

                                </div>

                                <div className="innerArticleContainer">
                                  <div className="innerArticleTop">
                                    <label className="labelArticleTop">
                                      <Checkbox style={{ display: 'inlineBlock' }} onChange={() => {
                                        handleAddToCartXylo()
                                      }} checked={checkedXylo}></Checkbox>
                                      <span className="innerArticleTitle">{t("Checkout.29")}</span>
                                      <br></br>
                                      <strike className="innerArticleStrike">{products[0].priceAugmente} €</strike>
                                      <span className="innerArticlePrice">{products[0].price} €</span>
                                      <br></br>
                                      <p className="innerArticleReductionContainer">
                                        <span className="innerArticleReduction">{t("Checkout.30")} {products[5].price}€ {t("Checkout.31")}</span>
                                      </p>
                                    </label>
                                  </div>
                                  <div className="innerArticleBottom">
                                    <div onClick={() => {
                                      handleClickOpenXylo()
                                    }}>
                                      <img src="/Xylo-OmbrageSansFond.webp" alt="playboard" className="articleImg" />

                                      <p className="modal-know-more">{t("products.savoir")}</p>
                                    </div>

                                  </div>
                                  <SimpleDialogXylo open={openXylo} onClose={handleCloseXylo} />

                                </div>

                                <div className="innerArticleContainer">
                                  <div className="innerArticleTop">
                                    <label className="labelArticleTop">
                                      <Checkbox style={{ display: 'inlineBlock' }} onChange={() => {
                                        handleAddToCartTour()
                                      }} checked={checkedTour}></Checkbox>
                                      <span className="innerArticleTitle">{t("Checkout.32")}</span>
                                      <br></br>
                                      <strike className="innerArticleStrike">{products[1].priceAugmente} €</strike>
                                      <span className="innerArticlePrice">{products[1].price} €</span>
                                      <br></br>
                                      <p className="innerArticleReductionContainer">
                                        <span className="innerArticleReduction">{t("Checkout.30")} {products[6].price}€ {t("Checkout.31")}</span>
                                      </p>
                                    </label>
                                  </div>
                                  <div className="innerArticleBottom" >
                                    <div onClick={() => {
                                      handleClickOpenTour()
                                    }}>
                                      <img src="/tour.png" alt="playboard" className="articleImg" />

                                      <p className="modal-know-more">{t("products.savoir")}</p>
                                    </div>
                                  </div>
                                  <SimpleDialogTour open={openTour} onClose={handleCloseTour} />

                                </div>

                              </Slider>
                            </div>
                          </div>
                          <div className="spacer-crossSells"></div>
                        </Elements>
                      </div>
                    </div>
                  </div>
                  : <p className="articlesInPanier">{t("Checkout.57")}</p>}

              </div>

            </div>
          </div>

          <div className="recommendation">
            <h5 className="recommendation-title">{t("Checkout.58")}</h5>
            <Recommande />
          </div>
          <div>
            <Garanties />
          </div>
        </div>

      </div>
      <div>
        <Footer />
      </div>
    </PayPalScriptProvider>
  )
};

export default CheckoutScreen
