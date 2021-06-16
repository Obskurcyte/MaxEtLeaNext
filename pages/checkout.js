import React, {Fragment, useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import { makeStyles } from '@material-ui/core/styles';
import {AppContext} from "../components/context/AppContext";
import {CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutFormStripe from "../components/CheckoutFormStripe";
import CartItem from "../components/CartItem";
import {Field, Formik} from "formik";
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
import Menu from "@material-ui/core/Menu";
import {getCart, setMauvaisCart} from "../store/actions/commandes";
import {useDispatch, useSelector} from "react-redux";
import styles from "../components/CheckoutFormStripe.module.css";
import Slider from "react-slick";
import AvisClients from "../components/AvisClients";
import {getCoupons} from "../store/actions/coupons.js";
import {getProducts} from "../store/actions/product.js";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const stripePromise = loadStripe('pk_test_51IjLvTHhHoTNAiE0pkif0qnH6Dl91AUale4WRxVMbPoAGKaScqGFyXxy82Pi2DZw8bfsD82mTceXZ6tIoqqV4XVe00hBpIWhvL')


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const CheckoutScreen = props => {


  const [cart, setCart, commandeCart, setCommandeCart] = useContext(AppContext);

  const [dataClient, setDataClient] = useState(null);

  useEffect(() => {
    if ( process.browser) {
      let cartData = localStorage.getItem('livraison');
      const trueData = JSON.parse(cartData);
      setDataClient(trueData)
    }
  }, []);


  console.log(dataClient);

  const [donneesClient, setdonneesClient] = useState({})

  const products = product.products

  const breakPoints = [
    {width: 200, itemsToShow: 1},
    {width: 600, itemsToShow: 2},
    {width: 1000, itemsToShow: 3},
  ]

  //---------------------AJOUTER PANIER-----------------------//


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
    localStorage.setItem('commande-cart', JSON.stringify(newCart))
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


  const updateCartTour = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsTour(existingCart.products, products[3], qtyToBeAdded, newQty);
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
    const productExistsIndex = isProductInCart(existingProductsInCart, products[3].id);

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


  const handleAddToCartTour = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart!=null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCartTour(existingCart, products[2], qtyToBeAdded);
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[2]);
        setCart(newCart)
        setCommandeCart(newCart)
      }
    }
  }

  const updateCartXylo = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsXylo(existingCart.products, products[2], qtyToBeAdded, newQty);
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


  const handleAddToCartXylo = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart!=null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCartXylo(existingCart, products[3], qtyToBeAdded);
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[3]);
        setCart(newCart)
        setCommandeCart(newCart)
      }
    }
  }

  const updateCartPlayboard = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsPlayboard(existingCart.products, products[4], qtyToBeAdded, newQty);
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


  const handleAddToCartPlayboard = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart!=null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCartPlayboard(existingCart, products[4], qtyToBeAdded);
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[4]);
        setCart(newCart)
        setCommandeCart(newCart)
      }
    }
  }

  const updateCartEbookPlayboard = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsEbookPlayboard(existingCart.products, products[5], qtyToBeAdded, newQty);
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
    const productExistsIndex = isProductInCart(existingProductsInCart, products[5].id);

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


  const handleAddToCartEbookPlayboard = () => {
    if (process.browser) {
      let existingCart = localStorage.getItem('woo-next-cart');
      let commandeCart = localStorage.getItem('commande-cart');
      if (existingCart!=null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCartEbookPlayboard(existingCart, products[5], qtyToBeAdded);
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[5]);
        setCart(newCart)
        setCommandeCart(newCart)
      }
    }
  }

  const updateCartEbookXylo = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProductsEbookXylo(existingCart.products, products[6], qtyToBeAdded, newQty);
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

  const [checkedEbookPlayboard, setCheckedEbookPlayboard] = useState(false);
  const [checkedEbookXylo, setCheckedEbookXylo] = useState(false);
  const [checkedEbookTour, setCheckedEbookTour] = useState(false);







  //-------------------- LIVRAISON ----------------------------


  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [adresseLivraison, setAdresseLivraison] = useState('');
  const [villeLivraison, setVilleLivraison] = useState('');
  const [codePostalLivraison, setCodePostalLivraison] = useState('');
  const [adresseFacturation, setAdresseFacturation] = useState('');
  const [prixLivraison, setPrixLivraison] = useState(0);
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


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChange1 = (event, prix) => {
    setChecked1(!checked1);
    setChecked2(false);
    setChecked3(false);
    setPrixLivraison(prix)
  };

  const handleChange2 = (event, prix) => {
    setChecked2(!checked2);
    setChecked1(false);
    setChecked3(false);
    setPrixLivraison(prix)
  }

  const handleChange3 = (event, prix) => {
    setChecked3(!checked3);
    setChecked1(false);
    setChecked2(false);
    setPrixLivraison(prix)
  }


  const [checked, setChecked] = React.useState(false);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const {stripe, elements} = props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };


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

  console.log(dataClient)
  let dataClientEmail = ''
  if (dataClient && dataClient.email) {
    dataClientEmail = dataClient.email
  }

  console.log(dataClient)

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


  let totalPrice1 = 0;
  let totalPrice2 = 0
  let qtyTotale = 0
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
      qtyTotale += parseFloat(cart.products[data].qty)
    }
  }

  let playboardReducPrice = 0
  let playboardInCart = []
  if (cart) {
    const playboard = cart.products.filter(obj => {
      return obj.productId === 'cHJvZHVjdDozMTYz'
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
      return obj.productId === 'cHJvZHVjdDo0NTI3'
    })
    if (tour.length !== 0) {
      tourInCart = tour
      tourReducPrice = tour[0].qty * 20
    }
  }


  let xyloReducPrice = 0
  let xyloInCart = []
  if (cart) {
    const xylo = cart.products.filter(obj => {
      return obj.productId === 'cHJvZHVjdDo0NTM1'
    })
    if (xylo.length !== 0) {
      xyloInCart = xylo
      xyloReducPrice = xylo[0].qty * 20
    }
  }


  if (qtyTotale === 2) {
    totalPrice1 = totalPrice1 * 0.90
  }

  if (qtyTotale >= 3) {
    totalPrice1 = totalPrice1 * 0.85
  }

  if (qtyTotale >= 4) {
    totalPrice1 = totalPrice1 * 0.80
  }
  console.log('ebook checked', checkedEbookPlayboard)

  const [firstStep, setFirstStep] = useState(false);

  const [goPaiement, setGoPaiement] = useState(false)




  totalPrice2 = totalPrice1 + prixLivraison

  //------AFFILIATE AND COUPON CODES-----//

  const [promoCode, setpromoCode] = useState('')

   const fetchAffiliates = async () => {
      const encoded = window.btoa("51c3be50ab9c71d50de81306ddb8590a:bdf2b2c8119512ea65c31d49d96c7e92")
      ///wp-json/affwp/v1/affiliates
      ///wp-json/affwp/v1/referrals?user_name=theo&amount=15&status=unpaid
      
      /*const res = await fetch(`https://maxandlea.fr/wp-json/affwp/v1/affiliates?user=1`, {
          //method: 'POST',
          headers: {
            'Authorization': "Basic "+encoded
          }
        })
      const newData = await res.json(); 
      var aff_id = 0;
      newData.forEach( aff => {
        if(localStorage.getItem('ref').toLowerCase()==aff.user.user_login.toLowerCase()){
          aff_id = aff.affiliate_id;
        }
      });
      if(aff_id != 0){
        const linkRefCreate = `https://maxandlea.fr/wp-json/affwp/v1/referrals?affiliate_id=`+aff_id+`&amount=`+totalPrice2.toFixed(2)+`&status=unpaid`;
        const ref = await fetch( linkRefCreate, {
          method: 'POST',
          headers: {
            'Authorization': "Basic "+encoded
          }
        })
        const newRef = await ref.json();
        console.log(newRef);
      }*/
      //const coupons = await getCoupons(); 
      //console.log(coupons);
      var aff_id = 0;
      var is_code = false;
      const WooCommerce = new WooCommerceRestApi({
        url: 'https://maxandlea.fr',
        consumerKey: 'ck_9e4d330373ed9a52a684ec88434271aa37652603',
        consumerSecret: 'cs_a0272dea628e462d7288a10226cfa3e1f4ffcaff',
        version: 'wc/v3'
      }); 
      WooCommerce.get("coupons")
      .then((response) => {
        response.data.forEach( code => {
          if(code.code == promoCode){
            is_code = true;
            localStorage.setItem('promoCode',JSON.stringify({"id":code.id,"code":code.code,"amount":code.amount}));
            code.meta_data.forEach( meta => {
              if(meta.key == "affwp_discount_affiliate"){
                  //localStorage.setItem('ref',meta.value);
                  aff_id = meta.value;
                  console.log(aff_id);
              }
            });
          }
        });
        if(is_code){
          //Rajouter promo en utilisant "amount" dans promoCode dans le localStorage
        }
        else{
          //Afficher "Code incorrect" en dessous de l'input code promo
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

      
      //return setData(newData.results);
    };
  
  const checkPromo = (event) => {
      fetchAffiliates();
  };


    return (
      <div style={{fontFamily: "Roboto, sans-serif"}}>
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

        <div className="cadeauContainer">
          <h2 className="cadeauContainerText">Le plus beau cadeau pour votre enfant</h2>
        </div>

        <div>
          <AvisClients/>
        </div>

        <div className="checkoutContainer">
          <div className="progressBarContainer">
            <p className="progressBarText">CHOIX DU PRODUIT</p>
            <p className="progressBarText">ADRESSE DE LIVRAISON ET DE FACTURATION</p>
            <p className="progressBarText">PAIEMENT</p>
          </div>
          <div className="hrContainerCheckout">
            <img src={'/ellipsePetite.png'} alt="" className="ellipseImg"/>
            <hr className={firstStep ? 'premierHrDone' : 'premierHr'}/>
            <img src={'/ellipsePetite.png'} alt="" className="ellipseImg"/>
            <hr className={goPaiement ? 'deuxiemeHrDone' : 'deuxiemeHr'}/>
            <img src={'/ellipsePetite.png'} alt="" className="ellipseImg"/>
          </div>

          <div className="produitPaiementContainer">
            <div className="produitContainer">
              <p className="produitText">Produit</p>
              {(!cart || cart.products.length === 0) && (
                <h2>Vous n'avez pas d'articles dans votre panier</h2>
              )}
              <div className="productContainer">
                <div className="imgContainer">
                  {
                    cart && cart.products.length && (
                      cart.products.map(item => (
                          <CartItem
                            key={item.productId}
                            item={item}
                            setCart={setCart}
                          />
                        )
                      )
                    )
                  }
                </div>
              </div>
              <div className="ebookContainer">
                <div className="ebookInner">
                  <p>Ebook Playboard imprimé (9,99€)</p>
                  <Checkbox checked={checkedEbookPlayboard}
                            onChange={() => {
                              setCheckedEbookPlayboard(!checkedEbookPlayboard)
                              handleAddToCartEbookPlayboard()
                            }} />
                </div>
                <div className="ebookInner">
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
                        <p className="itemTotalPrice">{(totalPrice1 * 0.10).toFixed(2)} €</p>
                      </div>
                    )}
                  </div>

                  <div>
                    {qtyTotale === 3 && (
                      <div className="prix-reduc-container">
                        <p className="sousTotalText">Discount Panier (3 articles) 15%</p>
                        <p className="itemTotalPrice">{(totalPrice1 * 0.15).toFixed(2)} €</p>
                      </div>
                    )}
                  </div>

                  <div>
                    {qtyTotale >= 4 && (
                      <div className="prix-reduc-container">
                        <p className="sousTotalText">Discount Panier (4 articles et plus) 20%</p>
                        <p className="itemTotalPrice">{(totalPrice1 * 0.20).toFixed(2)} €</p>
                      </div>
                    )}
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
                  <input type="text" onChange={event => setpromoCode(event.target.value)} placeholder="Code promo" className="inputPromo"/>
                </div>
                <button className="buttonCodepromo" onClick={() => {checkPromo()}}>Valider votre code promo</button>
              </div>

              <div className="addOtherArticlesPanier">
                {qtyTotale === 1 && (
                  <h5 className="addArticleTitle">Ajouter un article et bénéficiez de 10% sur tout votre panier !</h5>
                )}

                {qtyTotale === 2 && (
                  <h5 className="addArticleTitle">Ajouter un article et bénéficiez de 15% sur tout votre panier !</h5>
                )}

                {qtyTotale === 3 && (
                  <h5 className="addArticleTitle">Ajouter un article et bénéficiez de 20% sur tout votre panier !</h5>
                )}

                {qtyTotale >= 4 && (
                  <h5 className="addArticleTitle">Ajouter un article !</h5>
                )}
                <Carousel itemsToShow={3} isRTL={false} className="addItemsCarousel" breakPoints={breakPoints}>
                  <div className="innerArticleContainer">
                    <div className="imgContainerCarousel">
                      <img src="https://maxandlea.com/wp-content/uploads/2020/06/VueProduit-2-Tablette-MaxAndLea-sans-logo.jpg" alt="playboard" className="xylophoneImg"/>
                      <Link href={'/playboard'}><p className="savoirplus">En savoir plus</p></Link>
                    </div>

                    <div className="carouselItemAdd">
                      <p className='addCarousel'>Ajouter la Playboard !</p>
                      <div className="prixReduc">
                        <p className="prixReducText">{products[4].price} €</p>
                        <p className="fauxPrix">{products[4].priceAugmente} €</p>
                      </div>
                      <div className="economie">
                        <p className="economieText">(-41% economisez {products[4].priceAugmente - products[4].price} €)</p>
                      </div>
                      <div className="buttonAddPanierContainer">
                        <button className="buttonAddPanier" onClick={() => {
                          handleAddToCartPlayboard()
                          window.location.reload()
                        }}>Ajouter au panier</button>
                      </div>
                    </div>

                  </div>

                  <div className="innerArticleContainer">
                    <div className="imgContainerCarousel">
                      <img src={'/xylophone.png'} alt="" className="xylophoneImg"/>
                      <Link href={'/xylophone'}><p className="savoirplus">En savoir plus</p></Link>
                    </div>

                    <div className="carouselItemAdd">
                      <p className='addCarousel'>Ajouter le Xylophone !</p>
                      <div className="prixReduc">
                        <p className="prixReducText">{products[2].priceReduc} €</p>
                        <p className="fauxPrix">{products[2].price} €</p>
                      </div>
                      <div className="economie">
                        <p className="economieText">(-41% economisez {(products[2].price - products[2].priceReduc).toFixed(2)} €)</p>
                      </div>
                      <div className="buttonAddPanierContainer">
                        <button className="buttonAddPanier" onClick={() => {
                          handleAddToCartXylo()
                          window.location.reload()
                        }}>Ajouter au panier</button>
                      </div>
                    </div>

                  </div>

                  <div className="innerArticleContainer">
                    <div className="imgContainerCarousel">
                      <img src={'/tourCarre.png'} alt="" className="xylophoneImg"/>
                      <Link href={'/tour'}><p className="savoirplus">En savoir plus</p></Link>
                    </div>

                    <div className="carouselItemAdd">
                      <p className='addCarousel'>Ajouter la Tour Arc en Ciel !</p>
                      <div className="prixReduc">
                        <p className="prixReducText">{products[3].priceReduc} €</p>
                        <p className="fauxPrix">{products[3].price} €</p>
                      </div>
                      <div className="economie">
                        <p className="economieText">(-41% economisez {(products[3].price - products[3].priceReduc).toFixed(2)} €)</p>
                      </div>
                      <div className="buttonAddPanierContainer">
                        <button className="buttonAddPanier" onClick={() => {
                          handleAddToCartTour()
                          window.location.reload()
                        }}>Ajouter au panier</button>
                      </div>
                    </div>

                  </div>
                </Carousel>
              </div>

            </div>

            <img src={'/separation.png'} alt="" className="separation"/>



            <div className="prixContainer">
              {cart ?
                <div>
                <div className="prixText">
                  <a href="javascript:void(0);" onClick={() => setGoPaiement(false)}>
                    <p className={!goPaiement ? 'coordonneesText' : 'coordonneesTextLight'}>Coordonnées</p>
                  </a>
                  <p className={goPaiement ? 'coordonneesText' : 'coordonneesTextLight'}>Paiement</p>
                </div>

                <div className="content">
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
                            adresseLivraison : values.adresseLivraison,
                            codePostalLivraison : values.codePostalLivraison,
                            total : totalPrice2.toFixed(2),
                            sousTotal : totalPrice1
                          }
                        }
                        localStorage.setItem('livraison', JSON.stringify(donnesClient))
                        setGoPaiement(true)
                      }}
                    >
                      {props => (
                        <form className={classes.root} noValidate autoComplete="off">
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
                          <div className="inputContainer">
                            <TextField
                              required
                              value={props.values.adresseLivraison}
                              onChange={props.handleChange('adresseLivraison')}
                              id="adresse"
                              label="Numéro et nom de rue"
                              variant="outlined"
                              className="inputMoyenGauche"
                            />
                            {props.errors.adresseLivraison && props.touched.adresseLivraison && <div style={{color: 'red'}}>{props.errors.adresseLivraison}</div>}

                            <TextField
                              required
                              value={props.values.codePostalLivraison}
                              onChange={props.handleChange('codePostalLivraison')}
                              id="postalcode"
                              label="Code postal"
                              variant="outlined"
                              className="inputMoyenDroit"
                            />
                            {props.errors.codePostalLivraison && props.touched.codePostalLivraison && <div style={{color: 'red'}}>{props.errors.codePostalLivraison}</div>}

                          </div>
                          <div className="inputContainer">
                            <TextField
                              id="ville"
                              required
                              value={props.values.villeLivraison}
                              onChange={props.handleChange('villeLivraison')}
                              label="Ville"
                              variant="outlined"
                              className="inputMoyenGauche"
                            />
                            {props.errors.villeLivraison && props.touched.villeLivraison && <div style={{color: 'red'}}>{props.errors.villeLivraison}</div>}

                            <TextField
                              select
                              value={props.values.pays}
                              onChange={props.handleChange('pays')}
                              label="Select"
                              helperText="Veuillez sélectionner un pays"
                              defaultValue="France"
                              className="inputMoyenDroit"
                            >
                              {props.errors.pays && props.touched.pays && <div style={{color: 'red'}}>Ce champ est requis</div>}


                              {countries.listCountries.map((option) => (
                                <MenuItem key={option.code} value={option.name} defaultValue={(dataClient && dataClient.pays) ? dataClient.pays : ''} onClick={() => {
                                  setPays(option.name)
                                  setChecked2(false);
                                  setChecked1(false);
                                  setChecked3(false);
                                }}>
                                  {option.name}
                                </MenuItem>
                              ))}

                            </TextField>
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
                                  {/* {countries.map((option) => (
                                <MenuItem key={option.code} value={option.name}>
                                  {option.name}
                                </MenuItem>
                              ))}
                              */}
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
                            {(pays === 'France' || pays === 'Monaco') && (
                              <div>
                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked1}
                                      onChange={() => handleChange1(event, 4.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison standard (3-5 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>4,99 €</p>
                                  </div>
                                </div>

                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked2}
                                      onChange={() => handleChange2(event, 4.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison en point Mondial Relay (2-4 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>4,99 €</p>
                                  </div>
                                </div>

                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked3}
                                      onChange={() => handleChange3(event, 6.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison express (2-3 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>6,99 €</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {pays === 'Etats-Unis' && (
                              <div className="livraisonRow">
                                <div className="checkboxLivraisonContainer">
                                  <Checkbox
                                    checked={checked1}
                                    onChange={() => handleChange3(event, 19.99)}
                                    inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                </div>
                                <div className="livraisonChoice">
                                  <p>Livraison Amérique (8-10 jours)</p>
                                </div>
                                <div className="livraisonPrice">
                                  <p>19,99 €</p>
                                </div>
                              </div>
                            )}


                            {(pays === 'Royaume-Uni (UK)') && (
                              <div>
                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked1}
                                      onChange={() => handleChange1(event, 6.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison standard UK (5-7 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>6,99 €</p>
                                  </div>
                                </div>

                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked2}
                                      onChange={() => handleChange2(event, 9.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison Express UK (2-4 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>9,99 €</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {(pays === 'Albanie' || pays === 'Algérie' || pays === 'Argentine' || pays === 'Bolivie' || pays === 'Bulgarie' || pays === 'Brésil' || pays === 'Canada' || pays === 'Chili' || pays === 'Chypre' || pays === 'Colombie' || pays === 'Costa Rica' || pays === 'Gibraltar' || pays === 'Guadeloupe' || pays === 'Guatemala' || pays === 'Guyane' || pays === 'Guyane Française' || pays === 'Israël' || pays === 'La Réunion' || pays === 'Liban' || pays === 'Malte' || pays === 'Maroc' || pays === 'Martinique' || pays === 'Mayotte' || pays === 'Mexique' || pays === 'Moldavie' || pays === 'Nouvelle-Calédonie' || pays === 'Panama' || pays === 'Paraguay' || pays === 'Puerto Rico' || pays === 'Pérou' || pays === 'Saint Pierre et Miquelon' || pays === 'Salvador' || pays === 'Terres Australes Françaises' || pays === 'Tunisie' || pays === 'Ukraine' || pays === 'Uruguay' || pays === 'Vatican' || pays === 'Venezuela' || pays === 'Equateur') && (
                              <div>
                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked1}
                                      onChange={() => handleChange1(event, 47.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison monde (8-10 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>47,99 €</p>
                                  </div>
                                </div>

                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked2}
                                      onChange={() => handleChange2(event, 54.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison Express Monde (6-8 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>54,99 €</p>
                                  </div>
                                </div>
                              </div>
                            )}


                            {(pays === 'Espagne' || pays === 'Allemagne' || pays === 'Andorre' || pays === 'Autriche' || pays === 'Belgique' || pays === 'Danemark' || pays === 'Hongrie' || pays === 'Irlande' || pays === 'Italie' || pays === 'Luxembourg' || pays === 'Liechtenstein' || pays === 'Pays-Bas' || pays === 'Pologne' || pays === 'Portugal' || pays === 'République Tchèque') && (
                              <div>
                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked1}
                                      onChange={() => handleChange1(event, 9.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison Standard (5-7 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>9,99 €</p>
                                  </div>
                                </div>

                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked2}
                                      onChange={() => handleChange2(event, 12.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison Express (3-5 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>12,99 €</p>
                                  </div>
                                </div>
                              </div>
                            )}


                            {(pays === 'Croatie' || pays === 'Islande' || pays === 'Norvège') && (
                              <div>
                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked1}
                                      onChange={() => handleChange1(event, 24.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison standard (6-8 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>24,99 €</p>
                                  </div>
                                </div>

                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked2}
                                      onChange={() => handleChange2(event, 29.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison Express (4-6 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>29,99 €</p>
                                  </div>
                                </div>
                              </div>
                            )}

                            {(pays === 'Estonie' || pays === 'Finlande' || pays === 'Grèce' || pays === 'Lettonie' || pays === 'Lituanie' || pays === 'Roumanie' || pays === 'Slovaquie' || pays === 'Slovénie' || pays === 'Suède') && (
                              <div>
                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked1}
                                      onChange={() => handleChange1(event, 14.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison standard (5-7 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>14,99 €</p>
                                  </div>
                                </div>

                                <div className="livraisonRow">
                                  <div className="checkboxLivraisonContainer">
                                    <Checkbox
                                      checked={checked2}
                                      onChange={() => handleChange2(event, 19.99)}
                                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                  </div>
                                  <div className="livraisonChoice">
                                    <p>Livraison en point Mondial Relay (3-5 jours)</p>
                                  </div>
                                  <div className="livraisonPrice">
                                    <p>19,99 €</p>
                                  </div>
                                </div>
                              </div>
                            )}

                          </div>

                          <Link href="#">
                            <button className="cart-valide" type="submit" onClick={props.handleSubmit}>Aller à l'étape suivante</button>
                          </Link>
                        </form>
                      )
                      }
                    </Formik>
                  ): <Elements stripe={stripePromise}>
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
        <div>
          <Footer />
        </div>
      </div>
    )
  };

export default CheckoutScreen
