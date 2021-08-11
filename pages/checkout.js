import React, {Fragment, useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import { makeStyles } from '@material-ui/core/styles';
import {AppContext} from "../components/context/AppContext";
import {CardElement} from '@stripe/react-stripe-js';
import CheckoutFormStripe from "../components/CheckoutFormStripe";
import CartItem from "../components/CartItem";
import {Spinner} from "react-bootstrap";
import {Formik} from "formik";
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
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import AvisClients from "../components/AvisClients";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";
import Slider from "react-slick";
import { useRouter } from 'next/router';
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from '@stripe/react-stripe-js';
import SelectSearch,{ useSelect, fuzzySearch } from 'react-select-search-nextjs';
import i18next from "i18next";

const stripePromise = loadStripe('pk_test_51IjLvTHhHoTNAiE0pkif0qnH6Dl91AUale4WRxVMbPoAGKaScqGFyXxy82Pi2DZw8bfsD82mTceXZ6tIoqqV4XVe00hBpIWhvL')

function SimpleDialogPlayboard(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div>
        <img src={'/popup.png'} alt="" style={{maxWidth: '100%'}}/>
        <a href="/playboard" target="_blank"><p class="modal-know-more">En savoir plus</p></a>
      </div>
    </Dialog>
  );
}

function SimpleDialogXylo(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div>
        <img src={'/xylopopup.webp'} alt="" style={{maxWidth: '100%'}}/>
        <div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p>Il découvre <span className="fw-bold">ses premières notes musicales</span></p>
          </div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p>Il développe sa <span className="fw-bold">capacité auditive</span> et son ouïe</p>
          </div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p>Une aide au développement <span className="fw-bold">psycho-moteur</span> et à <span className="fw-bold">l'éveil</span> </p>
          </div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p><span className="fw-bold">8 tonalités différentes</span>pour un maximum de sons et de <span className="fw-bold">plaisirs</span></p>
          </div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p><span className="fw-bold">7 partitions musicales OFFERTES</span> avec votre xylophone</p>
          </div>

        </div>
        <a href="/xylophone" target="_blank"><p class="modal-know-more">En savoir plus</p></a>
      </div>
    </Dialog>
  );
}

function SimpleDialogTour(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <div>
        <img src={'/tourPopup.webp'} alt="" style={{maxWidth: '100%'}}/>
        <div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p>Développer son sens de <span className="fw-bold">l'organisation</span> et de <span className="fw-bold">l'agencement</span></p>
          </div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p><span className="fw-bold">Empiler</span> les grosses pièces de couleur</p>
          </div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p><span className="fw-bold">Réorganiser</span> les couleurs et les dégradés</p>
          </div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p><span className="fw-bold">Apprendre en jouant</span></p>
          </div>
          <div className="flex iconContainer">
            <FontAwesomeIcon icon={faCheck} className='checkIcon'/>
            <p><span className="fw-bold">100% Bois et 100% Ecologique</span></p>
          </div>
        </div>
        <a href="/tour" target="_blank"><p class="modal-know-more">En savoir plus</p></a>
      </div>
    </Dialog>
  );
}

function SimpleDialogRelay(props) {
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
          Chargement...
          <Spinner animation="border" role="status" >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
        <button class="buttonCodepromo" id="choice_relay" onClick={handleClose}>Choisir</button>
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

  const router = useRouter();

  const [goodCodePromo, setGoodCodePromo] = useState(false)

  var settingsSlider = {
    dots: true,
    arrows:true,
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
    if ( process.browser) {
      let cartData = localStorage.getItem('livraison');
      const trueData = JSON.parse(cartData);
      let codePromoData = localStorage.getItem('promoCode');
      let ebookImprime = localStorage.getItem('ebookImprime');
      setEbookImprime(ebookImprime)
      const promoCodeData = JSON.parse(codePromoData)
      setDataClient(trueData)
      setCodePromo(promoCodeData)
      if(trueData && trueData.pays){
        setPays(trueData.pays);
      }

      changeCartProductsExtraDiscounts();
    }
  }, [goodCodePromo]);




  const [donneesClient, setdonneesClient] = useState({})

  const products = product.products

  const breakPoints = [
    {width: 200, itemsToShow: 1},
    {width: 600, itemsToShow: 2},
    {width: 1000, itemsToShow: 3},
  ]

  //---------------------AJOUTER PANIER-----------------------//

  const changeCartProductsExtraDiscounts = () =>{
    let existingCart = localStorage.getItem('woo-next-cart');
    existingCart = JSON.parse(existingCart);
    if(existingCart != null){
      const playboardExistsIndex = isProductInCart(existingCart.products, products[2].id);
      if (-1 < playboardExistsIndex) {
        const xyloExistsIndex = isProductInCart(existingCart.products, products[0].id);
        const tourExistsIndex = isProductInCart(existingCart.products, products[1].id);
        if(-1 < xyloExistsIndex){
          const qtyXylo = existingCart.products[xyloExistsIndex].qty;
          const updatedCart = removeProduct(products[0].id);
          const newProduct = createNewProduct(products[5], products[5].price, qtyXylo)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          setCommandeCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
        if(-1 < tourExistsIndex){
          const qtyTour = existingCart.products[tourExistsIndex].qty;
          const updatedCart = removeProduct(products[1].id);
          const newProduct = createNewProduct(products[6], products[6].price, qtyTour)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          setCommandeCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
      }else{
        const disXyloExistsIndex = isProductInCart(existingCart.products, products[5].id);
        const distourExistsIndex = isProductInCart(existingCart.products, products[6].id);
        if(-1 < disXyloExistsIndex){
          const qtyXylo = existingCart.products[disXyloExistsIndex].qty;
          const updatedCart = removeProduct(products[5].id);
          const newProduct = createNewProduct(products[0], products[0].price, qtyXylo)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          setCommandeCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
        if(-1 < distourExistsIndex){
          const qtyTour = existingCart.products[distourExistsIndex].qty;
          const updatedCart = removeProduct(products[6].id);
          const newProduct = createNewProduct(products[1], products[1].price, qtyTour)
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
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)): '';
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
    localStorage.setItem('commande-cart', JSON.stringify(newCart))
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


  const updateCartTour = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsTour(existingCart.products, product, qtyToBeAdded, newQty);
    if(updatedProducts == null) return null;
    const addPrice = (total, item) => {
      total.totalPrice = item.totalPrice;
      total.qty += item.qty;
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


  const getUpdatedProductsTour = (existingProductsInCart, product, qtyToBeAdded, newQty=false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, product.id);

    if (-1 < productExistsIndex) {
      let updatedProducts = existingProductsInCart;
      let updatedProduct = updatedProducts[productExistsIndex];
      if(updatedProduct.qty + qtyToBeAdded < 0)
        return updatedProducts;
      else if(updatedProduct.qty + qtyToBeAdded == 0){
        const updatedCart = removeProduct(product.id);
        if(updatedCart == null) return null;
        setCart(updatedCart);
        return updatedCart.products;
      }
      updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded)
      updatedProduct.totalPrice = parseFloat(updatedProduct.price * updatedProduct.qty).toFixed(2);
      return updatedProducts;
    } else {
      if(qtyToBeAdded > 0){
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
      if (existingCart!=null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        var updatedCart = "";
        if(!checkedTour){
          setCheckedTour(true);
          updatedCart = updateCartTour(existingCart, products[1], 1);
        }
        else {
          setCheckedTour(false);
          const playboardExistsIndex = isProductInCart(existingCart.products, products[2].id);
          if (-1 < playboardExistsIndex) {//Si playboard, on retire la seconde version de la tour
            updatedCart = updateCartTour(existingCart, products[6], -1);
          }
          else updatedCart = updateCartTour(existingCart, products[1], -1);
        }
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        if(!checkedTour){
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
    if(updatedProducts == null) return null;
    const addPrice = (total, item) => {

      total.totalPrice = item.totalPrice;
      total.qty += item.qty;
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


  const getUpdatedProductsXylo = (existingProductsInCart, product, qtyToBeAdded, newQty=false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, product.id);

    if (-1 < productExistsIndex) {
      let updatedProducts = existingProductsInCart;
      let updatedProduct = updatedProducts[productExistsIndex];
      if(updatedProduct.qty + qtyToBeAdded < 0)
        return updatedProducts;
      else if(updatedProduct.qty + qtyToBeAdded == 0){
        const updatedCart = removeProduct(product.id);
        if(updatedCart == null) return null;
        setCart(updatedCart);
        return updatedCart.products;
      }
      updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded)
      updatedProduct.totalPrice = parseFloat(updatedProduct.price * updatedProduct.qty).toFixed(2);
      return updatedProducts;
    } else {
      if(qtyToBeAdded > 0){
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
      if (existingCart!=null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        var updatedCart = "";
        if(!checkedXylo){
          setCheckedXylo(true);
          updatedCart = updateCartXylo(existingCart, products[0], 1);
        }
        else {
          setCheckedXylo(false);
          const playboardExistsIndex = isProductInCart(existingCart.products, products[2].id);
          if (-1 < playboardExistsIndex) {//Si playboard, on retire la seconde version de la tour
            updatedCart = updateCartXylo(existingCart, products[5], -1);
          }
          else updatedCart = updateCartXylo(existingCart, products[0], -1);
        }
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        if(!checkedXylo){
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
    if(updatedProducts == null) return null;
    const addPrice = (total, item) => {

      total.totalPrice = item.totalPrice;
      total.qty += item.qty;
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


  const getUpdatedProductsPlayboard = (existingProductsInCart, product, qtyToBeAdded, newQty=false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, products[2].id);

    if (-1 < productExistsIndex) {
      let updatedProducts = existingProductsInCart;
      let updatedProduct = updatedProducts[productExistsIndex];
      if(updatedProduct.qty + qtyToBeAdded < 0)
        return updatedProducts;
      else if(updatedProduct.qty + qtyToBeAdded == 0){
        const updatedCart = removeProduct(products[2].id);
        if(updatedCart == null) return null;
        setCart(updatedCart);
        return updatedCart.products;
      }
      updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded)
      updatedProduct.totalPrice = parseFloat(updatedProduct.price * updatedProduct.qty).toFixed(2);
      return updatedProducts;
    } else {
      if(qtyToBeAdded > 0){
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
      if (existingCart!=null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        var updatedCart = "";
        if(!checkedPlayboard){
          setCheckedPlayboard(true);
          updatedCart = updateCartPlayboard(existingCart, products[2], 1);
        }
        else {
          setCheckedPlayboard(false);
          updatedCart = updateCartPlayboard(existingCart, products[2], -1);
        }
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        if(!checkedPlayboard){
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
    if(updatedProducts == null) return null;
    const addPrice = (total, item) => {

      total.totalPrice = item.totalPrice;
      total.qty += item.qty;
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


  const getUpdatedProductsEbookPlayboard = (existingProductsInCart, product, qtyToBeAdded, newQty=false) => {
    const productExistsIndex = isProductInCart(existingProductsInCart, products[3].id);

    if (-1 < productExistsIndex) {
      let updatedProducts = existingProductsInCart;
      let updatedProduct = updatedProducts[productExistsIndex];
      if(updatedProduct.qty + qtyToBeAdded < 0)
        return updatedProducts;
      else if(updatedProduct.qty + qtyToBeAdded == 0){

        const updatedCart = removeProduct(products[3].id);
        if(updatedCart == null){
          return null;
        }
        setCart(updatedCart);
        return updatedCart.products;
      }
      updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded)
      updatedProduct.totalPrice = parseFloat(updatedProduct.price * updatedProduct.qty).toFixed(2);
      return updatedProducts;
    } else {
      if(qtyToBeAdded > 0){
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
      if (existingCart!=null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        var updatedCart = "";
        if(!checkedEbookPlayboard){
          setCheckedEbookPlayboard(true);
          updatedCart = updateCartEbookPlayboard(existingCart, products[3], 1);
        }
        else {
          setCheckedEbookPlayboard(false);
          updatedCart = updateCartEbookPlayboard(existingCart, products[3], -1);
        }
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        if(!checkedPlayboard){
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


  const getUpdatedProductsEbookXylo = (existingProductsInCart, product, qtyToBeAdded, newQty=false) => {
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
      if (existingCart!=null) {
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
    let total = updatedProducts.reduce(addPrice, {totalPrice: 0, qty: 0})

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


  const getUpdatedProductsEbookTour = (existingProductsInCart, product, qtyToBeAdded, newQty=false) => {
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
      if (existingCart!=null) {
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
    if(existingCart != null && (isProductInCart(existingCart.products, products[0].id) > -1 || isProductInCart(existingCart.products, products[5].id) > -1)){
      setCheckedXylo(true);
    }
    if(existingCart != null && (isProductInCart(existingCart.products, products[1].id) > -1 || isProductInCart(existingCart.products, products[6].id) > -1)){
      setCheckedTour(true);
    }
    if(existingCart != null && isProductInCart(existingCart.products, products[2].id) > -1){
      setCheckedPlayboard(true);
    }
    if(existingCart != null && isProductInCart(existingCart.products, products[3].id) > -1){
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


  const items = [
    {id: 1, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'},
    {id: 2, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'},
    {id: 3, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'},
    {id: 4, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'},
    {id: 5, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'}
  ]

  //----------------FORMULAIRE DE LIVRAISON ------------------//




  const livraisonSchema = Yup.object().shape({
    email: Yup.string().email('Cet email est invalide').required('Ce champ est requis'),
    prenom: Yup.string().required('Ce champ est requis'),
    nom: Yup.string().required('Ce champ est requis'),
    adresseLivraison: Yup.string().required('Ce champ est requis'),
    codePostalLivraison: Yup.string().required('Ce champ est requis'),
    villeLivraison: Yup.string().required('Ce champ est requis'),
    pays: Yup.string().required('Ce champ est requis'),
    phone: Yup.string().required('Ce champ est requis'),
  });

  let dataClientEmail = ''
  if (dataClient && dataClient.email) {
    dataClientEmail = dataClient.email
  }

  const initialValues = {
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



  const classes = useStyles();


  let sumPanier = 0;
  let totalPrice2 = 0
  let qtyTotale = 0
  if (cart) {
    for (let data in cart.products) {
      sumPanier += parseFloat(cart.products[data].totalPrice)
      qtyTotale += parseFloat(cart.products[data].qty)
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
      playboardReducPrice = playboard[0].qty * 20
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
      tourReducPrice = tour[0].qty * 7
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
      xyloReducPrice = xylo[0].qty * 9
    }
  }

  let ebookInCart = []
  if (cart) {
    const ebook = cart.products.filter(obj => {
      return obj.productId === 'hdkfhdhfdjjJ'
    })
    if (ebook.length !== 0) {
      ebookInCart = ebook
    }
  }

  //On enlève les ebooks de la qty totale
  if (ebookInCart.length!==0) {
    qtyTotale = qtyTotale - ebookInCart.length
  }

  console.log(ebookInCart)


  const [firstStep, setFirstStep] = useState(false);

  const [goPaiement, setGoPaiement] = useState(false)


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
        response.data.forEach( code => {
          if(code.code === promoCode){
            is_code = true;
            localStorage.setItem('promoCode',JSON.stringify({"id":code.id,"code":code.code,"amount":code.amount}));
            code.meta_data.forEach( meta => {
              if(meta.key === "affwp_discount_affiliate"){
                //localStorage.setItem('ref',meta.value);
                aff_id = meta.value;
              }
            });
          }
        });
        if(is_code){
          setCodePromoIncorrect(false)
          setGoodCodePromo(true)
        }
        else{
          setCodePromoIncorrect(true)
        }

        if(aff_id != 0){
          fetch(`https://maxandlea.fr/wp-json/affwp/v1/affiliates/`+aff_id+`?user=1`, {
            //method: 'POST',
            headers: {
              'Authorization': "Basic "+encoded
            }
          })
            .then(res => res.json())
            .then(
              (result) => {
                localStorage.setItem('ref',result.user.user_login);
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

  let totalIntermediaire = sumPanier - discountPanier
  const reducCodePromo = totalIntermediaire * (1/codePromo?.amount)

  let totalPrice1 = sumPanier - discountPanier - reducCodePromo

  console.log(sumPanier)
  const totalDiscount = parseFloat(tourReducPrice) + parseFloat(xyloReducPrice) + parseFloat(playboardReducPrice) + parseFloat(discountPanier) + parseFloat(reducCodePromo)

  totalPrice2 = totalPrice1 + prixLivraison
  return (
    <PayPalScriptProvider options= {{"client-id": process.env.PAYPAL_CLIENT_ID }}>
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
          <h2 className="cadeauContainerText">ÉMERVEILLEZ VOTRE ENFANT !</h2>
        </div>

        <div>
          <AvisClients/>
        </div>

        <div>

          <div className="produitPaiementContainer">
            <div className="produitContainer">
              <div className='coordonneesDiv'>
                <p className="coordonneesNum">1</p>
                <p className="coordonneesTitle">PANIER</p>
                <p className="coordonneesSubTitle">Vos Produits</p>
              </div>
              {(!cart || cart.products.length === 0) && (
                <h2>Vous n'avez pas d'articles dans votre panier</h2>
              )}
              <div className="productContainer">
                <div>
                  {
                    cart && cart.products.length && (
                      cart.products.map((item) => {
                        console.log(item)
                        return(
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
                              <p>Ebook Par mail (gratuit)</p>
                              <Checkbox
                                checked={true}
                                disabled
                                onChange={() => {
                                  setCheckedEbookPlayboard(!checkedEbookPlayboard)
                                  handleAddToCartEbookPlayboard()
                                }}
                              />
                            </div>
                            <div className="ebookInner free">
                              <p>Ebook Playboard imprimé (9,99€)</p>
                              <Checkbox checked={ebookImprime ? true : checkedEbookPlayboard}
                                        onChange={(event) => {
                                          handleAddToCartEbookPlayboard();
                                        }} />
                            </div>
                          </div>

                        </div>
                        </>
                        ) : (
                          <CartItem
                            key={item.productId}
                            item={item}
                            setCart={setCart}
                          />
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
                    {playboardInCart.length !== 0 && (
                      <div className="prix-reduc-container">
                        <p className="sousTotalText">Discount PlayBoard</p>
                        <p className="itemTotalPrice">{playboardReducPrice} €</p>
                      </div>
                    )}
                  </div>

                  <div>
                    {xyloInCart.length !== 0 && (
                      <div className="prix-reduc-container">
                        <p className="sousTotalText">Discount Xylophone</p>
                        <p className="itemTotalPrice">{xyloReducPrice} €</p>
                      </div>
                    )}
                  </div>

                  <div>
                    {tourInCart.length !== 0 && (
                      <div className="prix-reduc-container">
                        <p className="sousTotalText">Discount Tour</p>
                        <p className="itemTotalPrice">{tourReducPrice} €</p>
                      </div>
                    )}
                  </div>

                  <div>
                    {qtyTotale === 2 && (
                      <div className="prix-reduc-container">
                        <p className="sousTotalText">Discount Panier (2 articles) 10%</p>
                        <p className="itemTotalPrice">{discountPanier} €</p>
                      </div>
                    )}
                  </div>

                  <div>
                    {qtyTotale === 3 && (
                      <div className="prix-reduc-container">
                        <p className="sousTotalText">Discount Panier (3 articles) 15%</p>
                        <p className="itemTotalPrice">{discountPanier} €</p>
                      </div>
                    )}
                  </div>

                  <div>
                    {qtyTotale >= 4 && (
                      <div className="prix-reduc-container">
                        <p className="sousTotalText">Discount Panier (4 articles et plus) 20%</p>
                        <p className="itemTotalPrice">{discountPanier} €</p>
                      </div>
                    )}
                  </div>


                  <div>
                    {(codePromo && codePromo.amount) && (
                      <div className="prix-reduc-container">
                        <p className="sousTotalText">Code Promo</p>
                        <p className="itemTotalPrice">{codePromo.amount} %</p>
                      </div>
                    )}
                  </div>

                  <div className="prix-reduc-container">
                      <p className="sousTotalText2">Total discount</p>
                      <p className="itemTotalPrice2">{totalDiscount.toFixed(2)} €</p>
                  </div>

                  <div>

                  </div>

                </div>

                <hr/>


                {(cart && cart.products.length) && (
                  <div className="sousTotal">

                    <div>
                      <div className="prix-reduc-container">
                        <p className="sousTotalText2">Sous-total</p>
                        <p className="itemTotalPrice2">{totalPrice1.toFixed(2)} €</p>
                      </div>
                    </div>
                    <div>
                      {prixLivraison !== 0 && (
                        <div className="prix-reduc-container">
                          <p className="sousTotalText2">Prix livraison</p>
                          <p className="itemTotalPrice2">{prixLivraison} €</p>
                        </div>
                      )}
                    </div>

                    <hr/>
                    <div>
                      <div className="prix-reduc-container">
                        <p className="sousTotalText2" style={{fontWeight: 'bold'}}>Total</p>
                        <p className="itemTotalPrice2" style={{fontWeight: 'bold'}}>{totalPrice2.toFixed(2)} €</p>
                      </div>
                    </div>
                    <hr/>

                    <div>

                    </div>

                  </div>
                )}
              </div>

              <div className="codepromoContainer">
                <div>
                  {codePromoIncorrect ? <p style={{color: 'red'}}>Ce code est incorrect</p>: ''}
                  {goodCodePromo ? <p style={{color: 'green'}}>Votre code promo a été validé</p>: ''}
                  <input type="text" onChange={event => setpromoCode(event.target.value)} placeholder="Code promo" className="inputPromo"/>
                </div>
                {codePromoLoading && <Spinner animation="border" role="status" >
                  <span className="sr-only">Loading...</span>
                </Spinner>}
                <button className="buttonCodepromo" onClick={() => {checkPromo()}}>Valider votre code promo</button>
              </div>

              <div className="addOtherArticlesPanier">
                {qtyTotale === 1 && (
                  <h5 className="addArticleTitle">Ajouter +1 article et bénéficiez de -10% sur TOUT votre panier !</h5>
                )}

                {qtyTotale === 2 && (
                  <h5 className="addArticleTitle">Ajouter +1 article et bénéficiez de -15% sur TOUT votre panier !</h5>
                )}

                {qtyTotale >= 3 && (
                  <h5 className="addArticleTitle">Ajouter +1 article et bénéficiez de -20% sur TOUT votre panier !</h5>
                )}
                <Slider {...settingsSlider}>
                  <div className="innerArticleContainer">
                    <div className="innerArticleTop">
                      <label className="labelArticleTop">
                        <Checkbox
                        id={products[2].id}
                        className="checkArticle"
                        style={{display:'inlineBlock'}}
                        checked={checkedPlayboard}
                        onChange={(event) => {
                          handleAddToCartPlayboard()
                        }}></Checkbox>
                        <span className="innerArticleTitle">Ajouter la Playboard !</span>
                        <br></br>
                        <strike className="innerArticleStrike">{products[2].priceAugmente} €</strike>
                        <span className="innerArticlePrice">{products[2].price} €</span>
                        <br></br>
                        <span className="innerArticleReduction">(-41% economisez {products[2].priceAugmente - products[2].price} €)</span>
                        </label>
                    </div>
                    <div className="innerArticleBottom" onClick={() => {
                        handleClickOpenPlayboard()
                      }}>
                    <img src="/playboard.png" alt="playboard" className="articleImg" />

                    </div>
                    <SimpleDialogPlayboard open={openPlayboard} onClose={handleClosePlayboard} />

                  </div>

                  <div className="innerArticleContainer">
                    <div className="innerArticleTop">
                      <label className="labelArticleTop">
                        <Checkbox style={{display:'inlineBlock'}} onChange={() => {
                          handleAddToCartXylo()
                        }}></Checkbox>
                        <span className="innerArticleTitle">Ajouter le Xylophone !</span>
                        <br></br>
                        <strike className="innerArticleStrike">{products[0].priceAugmente} €</strike>
                        <span className="innerArticlePrice">{products[0].price} €</span>
                        <br></br>
                        <span className="innerArticleReduction">(-41% economisez {Math.round(products[0].priceAugmente - products[0].price)} €)</span>
                        </label>
                    </div>
                    <div className="innerArticleBottom" onClick={() => {
                        handleClickOpenXylo()
                      }}>
                    <img src="/xylophonecard.png" alt="playboard" className="articleImg" />

                    </div>
                    <SimpleDialogXylo open={openXylo} onClose={handleCloseXylo} />

                  </div>

                  <div className="innerArticleContainer">
                    <div className="innerArticleTop">
                      <label className="labelArticleTop">
                        <Checkbox style={{display:'inlineBlock'}} onChange={() => {
                          handleAddToCartTour()
                        }}></Checkbox>
                        <span className="innerArticleTitle">Ajouter la Tour Arc en Ciel !</span>
                        <br></br>
                        <strike className="innerArticleStrike">{products[1].priceAugmente} €</strike>
                        <span className="innerArticlePrice">{products[1].price} €</span>
                        <br></br>
                        <span className="innerArticleReduction">(-41% economisez {Math.round(products[1].priceAugmente - products[1].price)} €)</span>
                        </label>
                    </div>
                    <div className="innerArticleBottom" onClick={() => {
                        handleClickOpenTour()
                      }}>
                    <img src="/tour.png" alt="playboard" className="articleImg" />

                    </div>
                    <SimpleDialogTour open={openTour} onClose={handleCloseTour} />

                  </div>

                </Slider>
              </div>

            </div>

            <div className="separationCheckout"></div>



            <div className="prixContainer">
              {cart ?
                <div>
                  <div className="prixText">
                    <a href="javascript:void(0);" onClick={() => setGoPaiement(false)} style={{width:'50%'}}>
                      <div className={!goPaiement ? 'coordonneesDiv' : 'coordonneesDivLight'}>
                        <p className="coordonneesNum">2</p>
                        <p className="coordonneesTitle">LIVRAISON</p>
                        <p className="coordonneesSubTitle">Où l'expédier ?</p>
                      </div>
                    </a>
                    <a href="javascript:void(0);" style={{width:'50%'}}>
                      <div className={goPaiement ? 'coordonneesDiv' : 'coordonneesDivLight'}>
                        <p className="coordonneesNum">3</p>
                        <p className="coordonneesTitle">PAIEMENT</p>
                        <p className="coordonneesSubTitle">Confirmez votre commande</p>
                      </div>
                    </a>
                  </div>

                  <div className="checkoutContent">
                    {!goPaiement ? (
                      <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={livraisonSchema}
                        onSubmit={values => {


                          let donnesClient = {}
                          if (checked) {
                            donnesClient = {
                              adresseFacturation : values.adresseFacturation,
                              codePostalFacturation : values.codePostalFacturation,
                              villeFacturation : values.villeFacturation,
                              villeLivraison : values.villeLivraison,
                              email : values.email,
                              nom : values.nom,
                              prenom : values.prenom,
                              phone : values.phone,
                              pays: values.pays,
                              prixLivraison,
                              titreLivraison,
                              userLang: i18next.language,
                              adresseLivraison : values.adresseLivraison,
                              codePostalLivraison : values.codePostalLivraison,
                              total : totalPrice2,
                              sousTotal : totalPrice1
                            }
                          } else {
                            donnesClient = {
                              adresseFacturation : values.adresseLivraison,
                              codePostalFacturation : values.codePostalLivraison,
                              villeFacturation : values.villeLivraison,
                              villeLivraison : values.villeLivraison,
                              email : values.email,
                              nom : values.nom,
                              pays: values.pays,
                              prenom : values.prenom,
                              phone : values.phone,
                              prixLivraison,
                              titreLivraison,
                              userLang: i18next.language,
                              adresseLivraison : values.adresseLivraison,
                              codePostalLivraison : values.codePostalLivraison,
                              total : totalPrice2.toFixed(2),
                              sousTotal : totalPrice1
                            }
                          }
                          if (!checked1 && !checked2 && !checked3) {
                            setErrorLivraison(true)
                          } else {
                            localStorage.setItem('livraison', JSON.stringify(donnesClient))
                            setGoPaiement(true)
                          }
                        }}
                      >
                        {props => (
                          <form className={classes.root} noValidate autoComplete="off">
                            <div className="checkout-form">
                            <div className="inputContainer">
                              <TextField
                                required
                                value={props.values.prenom}
                                onChange={props.handleChange('prenom')}
                                id="prenom"
                                label="Prénom"
                                variant="outlined"
                                className="inputMoyenGauche"
                              />
                              {props.errors.prenom && props.touched.prenom && <div style={{color: 'red'}}>{props.errors.prenom}</div>}

                              <TextField
                                id="nom"
                                value={props.values.nom}
                                onChange={props.handleChange('nom')}
                                required
                                label="Nom"
                                variant="outlined"
                                className="inputMoyenDroit"
                              />
                              {props.errors.nom && props.touched.nom && <div style={{color: 'red'}}>{props.errors.nom}</div>}

                            </div>
                            <div>
                              <TextField
                                required
                                value={props.values.email}
                                onChange={props.handleChange('email')}
                                id="email"
                                label="Email"
                                variant="outlined"
                                onFocus={() => setFirstStep(true)}
                                className="bigInput"
                              />
                            </div>
                            {props.errors.email && props.touched.email && <div style={{color: 'red'}}>{props.errors.email}</div>}

                            <div>
                            <SelectSearch onChange={(val) => {
                                props.handleChange('pays');
                                setPays(val);
                                setChecked2(false);
                                setChecked1(false);
                                setChecked3(false);
                                props.setFieldValue('pays', val);
                                }} options={countries.listCountries} value={props.values.pays} id="pays" name="country" placeholder="Choisir Pays" search={true} filterOptions={ fuzzySearch }/>
                            </div>
                              {props.errors.pays && props.touched.pays && <div style={{color: 'red'}}>Ce champ est requis</div>}

                            
                            <div>
                              <TextField
                                required
                                value={props.values.adresseLivraison}
                                onChange={props.handleChange('adresseLivraison')}
                                id="adresse"
                                label="Numéro et nom de rue"
                                variant="outlined"
                                className="bigInput"
                              />
                              {props.errors.adresseLivraison && props.touched.adresseLivraison && <div style={{color: 'red'}}>{props.errors.adresseLivraison}</div>}
                            </div>
                            <div>
                              <TextField
                                required
                                value={props.values.codePostalLivraison}
                                onChange={props.handleChange('codePostalLivraison')}
                                id="postalcode"
                                label="Code postal"
                                variant="outlined"
                                className="bigInput"
                              />
                              {props.errors.codePostalLivraison && props.touched.codePostalLivraison && <div style={{color: 'red'}}>{props.errors.codePostalLivraison}</div>}
                            </div>

                            <div>
                              <TextField
                                id="ville"
                                required
                                value={props.values.villeLivraison}
                                onChange={props.handleChange('villeLivraison')}
                                label="Ville"
                                variant="outlined"
                                className="bigInput"
                              />
                              {props.errors.villeLivraison && props.touched.villeLivraison && <div style={{color: 'red'}}>{props.errors.villeLivraison}</div>}
                            </div>

                            <div className="checkboxContainer">
                              <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                              />
                              <p className="paragraphFacturation">Utiliser une adresse de facturation différente</p>
                            </div>

                            {checked ? (
                              <div className="facturationDifferente">
                                <div className="inputContainer">
                                  <TextField
                                    required
                                    value={props.values.adresseFacturation}
                                    onChange={props.handleChange('adresseFacturation')}
                                    id="outlined-error"
                                    label="Numéro et nom de rue"
                                    variant="outlined"
                                    className="inputMoyenGauche"
                                  />
                                  <TextField
                                    required
                                    value={props.values.villeFacturation}
                                    onChange={props.handleChange('villeFacturation')}
                                    id="outlined-error"
                                    label="Ville"
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
                                    label="Code Postal"
                                    variant="outlined"
                                    className="inputMoyenGauche"
                                  />
                                  <TextField
                                    select
                                    value={props.values.paysFacturation}
                                    onChange={props.handleChange('paysFacturation')}
                                    label="Select"
                                    helperText="Veuillez sélectionner un pays"
                                    defaultValue="France"
                                    className="inputMoyenDroit"
                                  >
                                    { countries.listCountries.map((option) => (
                                  <MenuItem key={option.code} value={option.name}>
                                    {option.name}
                                  </MenuItem>
                                ))}
                                
                                  </TextField>
                                </div>
                              </div>
                            ) : ''}



                            <div className="inputContainer">
                              <TextField
                                value={props.values.phone}
                                onChange={props.handleChange('phone')}
                                id="phone"
                                label="Numéro de téléphone (facultatif)"
                                variant="outlined"
                                className="bigInput"
                              />
                            </div>

                            <div className="livraison">
                              <h4 className="livraisonTitle">Méthode d'expédition</h4>
                              {(pays === 'FR' || pays === 'MC') && (
                                <div className="livraisonListContainer">
                                  <div className="livraisonRow">
                                    <div className="checkboxLivraisonContainer">
                                      <label className="livraisonChoice">
                                      <div className="livraisonInnerRow">
                                        <Checkbox
                                        checked={checked1}
                                        onChange={() => {
                                          handleChange1(event, 4.99,"Livraison standard")
                                          setMondialRelay(false)
                                        }}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                        <p>Livraison standard (3-5 jours)</p>
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
                                            handleChange2(event, 4.99,"Livraison en point Mondial Relay")
                                            setMondialRelay(true)
                                            handleClickOpenRelay()
                                          }}
                                          inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison en point Mondial Relay (2-4 jours)</p>
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
                                          handleChange3(event, 6.99,"Livraison express")
                                          setMondialRelay(false)
                                        }}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison express (2-3 jours)</p>
                                          </div>
                                      </label>
                                      
                                    </div>
                                    <div className="livraisonPrice">
                                      <p>6,99 €</p>
                                    </div>
                                  </div>
                                  {errorLivraison ? <p className='text-danger'>Veuillez remplir ce champ</p> : ''}
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
                                          <p>Livraison Amérique (8-10 jours)</p>
                                          </div>
                                      </label>
                                      
                                    </div>
                                    <div className="livraisonPrice">
                                      <p>19,99 €</p>
                                    </div>
                                    {errorLivraison ? <p className='text-danger'>Veuillez remplir ce champ</p> : ''}

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
                                        onChange={() => handleChange1(event, 6.99,"Livraison standard")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison standard UK (5-7 jours)</p>
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
                                        onChange={() => handleChange2(event, 9.99,"Livraison express")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison Express UK (2-4 jours)</p>
                                          </div>
                                      </label>
                                    </div>
                                    <div className="livraisonPrice">
                                      <p>9,99 €</p>
                                    </div>
                                  </div>
                                  {errorLivraison ? <p className='text-danger'>Veuillez remplir ce champ</p> : ''}

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
                                        onChange={() => handleChange1(event, 47.99,"Livraison standard")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison monde (8-10 jours)</p>
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
                                        onChange={() => handleChange2(event, 54.99,"Livraison express")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison Express Monde (6-8 jours)</p>
                                          </div>
                                      </label>
                                    </div>
                                    <div className="livraisonPrice">
                                      <p>54,99 €</p>
                                    </div>
                                  </div>
                                  {errorLivraison ? <p className='text-danger'>Veuillez remplir ce champ</p> : ''}

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
                                        onChange={() => handleChange1(event, 9.99,"Livraison standard")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison Standard (5-7 jours)</p>
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
                                        onChange={() => handleChange2(event, 12.99,"Livraison express")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison Express (3-5 jours)</p>
                                          </div>
                                      </label>
                                    </div>
                                    <div className="livraisonPrice">
                                      <p>12,99 €</p>
                                    </div>
                                  </div>
                                  {errorLivraison ? <p className='text-danger'>Veuillez remplir ce champ</p> : ''}

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
                                        onChange={() => handleChange1(event, 24.99,"Livraison standard")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison standard (6-8 jours)</p>
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
                                        onChange={() => handleChange2(event, 29.99,"Livraison express")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison Express (4-6 jours)</p>
                                          </div>
                                      </label>
                                    </div>
                                    <div className="livraisonPrice">
                                      <p>29,99 €</p>
                                    </div>
                                  </div>
                                  {errorLivraison ? <p className='text-danger'>Veuillez remplir ce champ</p> : ''}

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
                                        onChange={() => handleChange1(event, 14.99,"Livraison standard")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison standard (5-7 jours)</p>
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
                                        onChange={() => handleChange2(event, 19.99,"Livraison express")}
                                        inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                          <p>Livraison express (3-5 jours)</p>
                                          </div>
                                      </label>
                                    </div>
                                    <div className="livraisonPrice">
                                      <p>19,99 €</p>
                                    </div>
                                  </div>
                                  {errorLivraison ? <p className='text-danger'>Veuillez remplir ce champ</p> : ''}

                                </div>
                              )}

                              {(pays === '') && (
                                    <label style={{textAlign:"center",width:"100%"}}>Veuillez choisir un pays de livraison</label>
                              )}

                              


                            </div>

                            <input type="hidden" id="relay_value"></input>
                              <div className={mondialRelay ? "display" : "displayNone"} >
                                <label id="relay_text" onClick={() => {
                                  handleClickOpenRelay()
                                }}>
                                  Choisissez un point Relay
                                </label>
                                <SimpleDialogRelay open={openRelay} onClose={handleCloseRelay} />
                              </div>


                            <Link href="#">
                              <button className="cart-valide" type="submit" onClick={props.handleSubmit}>PASSER À L'ÉTAPE SUIVANTE →</button>
                            </Link>
                            </div>
                          </form>
                        )
                        }
                      </Formik>
                    ):
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
                      </div>
                      </Elements>}

                  </div>
                </div>
                : <p className="articlesInPanier">Veuillez ajouter des articles dans votre panier !</p>}

            </div>

          </div>
        </div>

        <div className="recommendation">
          <h5 className="recommendation-title">Ils recommandent la Playboard®</h5>
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
