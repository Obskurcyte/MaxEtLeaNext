import React, { useEffect, useState, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { AppContext } from "./context/AppContext";
import i18next from "i18next";
import CardHover from "./CardHover";
import Link from 'next/link';
import * as product from '../products';
import { getDrapeau } from "../store/actions/drapeau";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const HeaderTour = (props) => {

  console.log(product)
  const [cart, setCart, commandeCart, setCommandeCart] = useContext(AppContext);
  console.log(cart)

  const router = useRouter()
  const products = product.products
  const [viewCart, setViewCart] = useState(false);



  let valueCount = 1;

  const onIncreaseClick = () => {
    valueCount++;
    document.querySelector('.change-quantity').value = valueCount;
  }

  const onDecreaseClick = () => {
    if (valueCount === 1) {
      return;
    } else {
      valueCount--;
      document.querySelector('.change-quantity').value = valueCount;
    }
  }

  const getFloatVal = (string) => {
    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)) : '';
  };

  const addFirstProduct = (product) => {
    let productPrice = product.price

    let newCart = {
      products: [],
      totalProductCount: 1,
      totalProductsPrice: productPrice
    }

    const newProduct = createNewProduct(product, productPrice, 1)
    newCart.products.push(newProduct);
    localStorage.setItem('woo-next-cart', JSON.stringify(newCart));
    localStorage.setItem('commande-cart', JSON.stringify(newCart))
    console.log('newCart', newCart)
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
      console.log('total', total)
      console.log('item', item)
      console.log(total)
      return total;
    }

    // Loop through the updated product array and add the totalPrice of each item to get the totalPrice
    let total = updatedProducts.reduce(addPrice, { totalPrice: 0, qty: 0 })

    const updatedCart = {
      products: updatedProducts,
      totalProductCount: parseInt(total.qty),
      totalProductsPrice: parseFloat(total.totalPrice)
    }

    localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
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
      let commandeCart = localStorage.getItem('commande-cart');
      console.log('clicked')
      console.log('existingCart', existingCart)
      if (existingCart != null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCart(existingCart, products[1], qtyToBeAdded);
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[1]);
        setCart(newCart)
        setCommandeCart(newCart)
      }
    }
  }


  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const lang = i18next.language;
  console.log('cart', cart);
  const [codePromo, setCodePromo] = useState('')
  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem('livraison');
      const trueData = JSON.parse(cartData);
      let codePromoData = localStorage.getItem('promoCode');
      const promoCodeData = JSON.parse(codePromoData)
      setCodePromo(promoCodeData)
    }
  }, []);
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
  if (ebookInCart.length !== 0) {
    qtyTotale = qtyTotale - ebookInCart.length
  }

  let discountPanier = 0;
  if (qtyTotale === 2) {
    discountPanier = (sumPanier * 0.10).toFixed(2)
  } else if (qtyTotale === 3) {
    discountPanier = (sumPanier * 0.15).toFixed(2)
  } else if (qtyTotale >= 4) {
    discountPanier = (sumPanier * 0.20).toFixed(2)
  }


  let totalPriceIntermediaire = sumPanier - discountPanier
  const reducCodePromo = totalPriceIntermediaire * (1 / codePromo?.amount)

  let totalPrice1 = sumPanier - discountPanier - reducCodePromo
  let user = '';


  let numberOfProducts = 0;
  if (cart) {
    for (let data in cart.products) {
      console.log(cart.products[data].qty)
      numberOfProducts += parseInt(cart.products[data].qty)
    }
  }

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      user = localStorage.getItem('userName');
    }
  })


  const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductCount : '';
  const totalPrice = (null !== cart && Object.keys(cart).length) ? cart.totalProductsPrice : '';


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch();
  const drapeau = useSelector(state => state.drapeau.drapeau)


  const handleClose = (lang) => {
    i18n.changeLanguage(lang).then(() => setAnchorEl(null))
    if (lang === 'fr') {
      dispatch(getDrapeau('/flagfr.png'))
    } if (lang === 'en') {
      dispatch(getDrapeau('/flagen.png'))
    } if (lang === 'es') {
      dispatch(getDrapeau('/flages.png'))
    } if (lang === 'al') {
      dispatch(getDrapeau('/flagal.png'))
    }
  };

  const renderCart = () => {

    return <CardHover />

  }

  return (
    <div className="stickyHeader">
      <div className="freeContainer">
        <h1 className="freeLivraison">Livraison GRATUITE en Europe (3-5 jours) à partir de 30€ d'achat</h1>
      </div>

      <nav className="containerHeader">
        <div className="drapeauContainer">
          <p className="langue">{lang}</p>
          <img src={drapeau} alt="drapeau français" className="drapeauImg" onClick={handleClick} />
        </div>
        <Nav className="navBar container">
          <div className="imgContainer">
            <Link href="/">
              <a href="/">
                <img src={'/logogrand.webp'} alt="" className="imgNavbar" />
              </a>
            </Link>
          </div>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose('en')}><img src={'/flagen.png'} alt="" /></MenuItem>
            <MenuItem onClick={() => handleClose('es')}><img src={'/flages.png'} alt="" /></MenuItem>
            <MenuItem onClick={() => handleClose('al')}><img src={'/flagal.png'} className="drapeauAllemand" alt="" /></MenuItem>
            <MenuItem onClick={() => handleClose('fr')}><img src={'/flagfr.png'} alt="" /></MenuItem>

          </Menu>

          <div className="jouet">
            <div className="prixJouet">
              <p className="jouetName">La Tour Arc En Ciel</p>
              <p className="jouetPrix">12,90€</p>
            </div>

            <div className="prixReduc">
              <div>
                <p className="economie">(-40% vous économisez 7€)</p>
              </div>
              <div>
                <p className="prixBarre">19,90€</p>
              </div>
            </div>
          </div>

          <div className="ajouterPanier" onClick={() => {
            //handleClickOpen()
            handleAddToCart()

            router.push('/checkout')


          }}>
            <Link href="javascript:void(0)"><p className="ajouterPanierText">Ajouter au panier</p></Link>
          </div>
          <div className="accountShopping" onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <Link href="/cart">
              <Nav.Link>

                <div className="cartWrap">
                  <div className="productsCountContainer">
                    <div className="productCountInnerContainer">{productCount ? <span className="productCountText">{numberOfProducts}</span> : <span className="productCountText">0</span>}</div>
                  </div>
                  <div className="flex">
                    <div className='productPrice'>
                      {totalPrice1 ? <span className="totalPriceSpan">{totalPrice1.toFixed(2)} €</span> : <span className="totalPriceSpan">0, 00 €</span>}
                    </div>
                    <FontAwesomeIcon icon={faShoppingBasket} className="shoppingCart" />
                  </div>
                </div>
              </Nav.Link>

            </Link>
            {open && renderCart()}
          </div>
        </Nav>
      </nav>
    </div>
  )
}

export default HeaderTour;
