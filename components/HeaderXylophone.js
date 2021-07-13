import React, {useEffect, useState, useContext} from 'react';
import { Nav } from 'react-bootstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import {AppContext} from "./context/AppContext";
import i18next from "i18next";
import CardHover from "./CardHover";
import Link from 'next/link';
import * as product from '../products';
import {getDrapeau} from "../store/actions/drapeau";
import {useDispatch} from "react-redux";


const HeaderXylophone = (props) => {

  const [cart, setCart, commandeCart, setCommandeCart] = useContext(AppContext);
  console.log(cart)

  const products = product.products
  const [viewCart, setViewCart] = useState(false);


  // const [cart, setCart] = useContext(AppContext);


  let valueCount = 1;

  const onIncreaseClick = () => {
    valueCount ++;
    document.querySelector('.change-quantity').value = valueCount;
  }

  const onDecreaseClick = () => {
    if (valueCount === 1) {
      return;
    } else {
      valueCount --;
      document.querySelector('.change-quantity').value = valueCount;
    }
  }

  const getFloatVal = (string) => {
    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)): '';
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
      let commandeCart = localStorage.getItem('commande-cart');
      console.log('clicked')
      console.log('existingCart', existingCart)
      if (existingCart!=null) {
        commandeCart = JSON.parse(commandeCart)
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCart(existingCart, products[0], qtyToBeAdded);
        setCart(updatedCart)
        setCommandeCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[0]);
        setCart(newCart)
        setCommandeCart(newCart)
      }
    }
  }


  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const lang = i18next.language;
  console.log('cart', cart);
  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }
  console.log(totalPrice1)
  let user = '';

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      user = localStorage.getItem('userName');
    }
  })


  const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductCount : '';
  const totalPrice = (null !== cart && Object.keys(cart).length) ? cart.totalProductsPrice: '';


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const dispatch = useDispatch()
  const [imgurl, setImgUrl] = useState("https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png")

  console.log(open)
  const handleClose = (lang) => {
    i18n.changeLanguage(lang).then(() => setAnchorEl(null))
    if (lang === 'fr') {
      dispatch(getDrapeau('https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png'))
    } if (lang === 'en') {
      dispatch(getDrapeau('https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png'))
    } if (lang === 'es') {
      dispatch(getDrapeau('https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png'))
    } if (lang === 'al') {
      dispatch(getDrapeau('https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langfr-225px-Flag_of_Germany.svg.png'))
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

      <nav className="container">
        <div className="drapeauContainer">
          <p className="langue">{lang}</p>
          <img src={drapeau} alt="drapeau français" className="drapeauImg" onClick={handleClick}/>
        </div>
        <Nav className="navBar">
          <div className="imgContainer imgContainerjouet"><img src="https://maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-1536x567.png" alt="" className="imgNavbar"/></div>
          <Link href="/" style={{marginTop: '5%'}}>
            <img src={'/home.png'} alt="" style={{width: "3%", height: '3%'}} className="home"/>
          </Link>


          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose('en')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png" alt=""/></MenuItem>
            <MenuItem onClick={() => handleClose('es')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png" alt=""/></MenuItem>
            <MenuItem onClick={() => handleClose('al')}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langfr-225px-Flag_of_Germany.svg.png" className="drapeauAllemand" alt=""/></MenuItem>
            <MenuItem onClick={() => handleClose('fr')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png" alt=""/></MenuItem>

          </Menu>

          <div className="jouet">
            <div className="prixJouet">
              <p className="jouetName">XYLOPHONE</p>
              <p className="jouetPrix">29,90€</p>
            </div>

            <div className="prixReduc">
              <div>
                <p className="economie">(-40% vous économisez 20€)</p>
              </div>
              <div>
                <p className="prixBarre">49,90€</p>
              </div>
            </div>
          </div>

          <div className="ajouterPanier" onClick={handleAddToCart}>
            <Link href="#"><p className="ajouterPanierText">Ajouter au panier</p></Link>
          </div>
          <div className="accountShopping" onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <Link href="/cart">
              <Nav.Link>

                <div className="cartWrap">
                  {productCount && (<div className="productsCountContainer">
                    <div className="productCountInnerContainer">{productCount ? <span className="productCountText">{productCount}</span> : ''}</div>
                  </div>)}
                  <img src={'/shoppingcart.png'} alt="shopping cart" />
                  {totalPrice1 ? <span className="totalPriceSpan">€{totalPrice1.toFixed(2)}</span> : ''}
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

export default HeaderXylophone;
