import React, {useContext, useEffect, useState} from 'react';
import styles from './CardHover.module.css'
import {AppContext} from "./context/AppContext";
import Link from 'next/link';
import * as product from "../products";
import {useTranslation} from "react-i18next";


const CardHoverItem = ({item}) => {

  const [cart, setCart] = useContext(AppContext);

  const { t, i18n } = useTranslation();

  const getFloatVal = (string) => {
    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)): '';
  };

  const addFirstProduct = (product) => {
    let productPrice = getFloatVal(product.price)

    let newCart = {
      products: [],
      image: "Bonjour",
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
      slug: product.slug,
      totalPrice: parseFloat((productPrice * qty).toFixed(2))
    }
  };

  const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProducts(existingCart.products, product, qtyToBeAdded, newQty);
    const addPrice = (total, item) => {

      total.totalPrice += item.totalPrice;
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
    const productExistsIndex = isProductInCart(existingProductsInCart, product.productId);

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



  const [productCount, setProductCount] = useState(item.qty);

  const handleQtyChange = (event) => {
    if (process.browser) {
      const newQty = event.target.value
      setProductCount(newQty)

      let existingCart = localStorage.getItem('woo-next-cart');
      existingCart = JSON.parse(existingCart);

      const updatedCart = updateCart(existingCart, item, false, newQty)

      setCart(updatedCart)
    }
    //  setCart(updateCart)
  }

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

      let updatedCart = existingCart;
      updatedCart.products.splice(productExistIndex,1)
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




  return (
    <React.Fragment>
        <div className={styles.innerContainer}>
          <div className={styles.imageContainer}>
          <Link href={item.slug== "ebooks" ? "/playboard" : "/"+item.slug}><a><img src={item.image} alt="product-image" className={styles.image}/></a></Link>
          </div>
            <div className="flex-column w-50">
            <Link href={item.slug== "ebooks" ? "/playboard" : "/"+item.slug}><a><p className={styles.itemName}>{t("products." + item.slug)}</p></a></Link>
              <div className="quantityContainer flex justify-content-between w-100">
              <p className="qtyProducts">x{productCount}</p>
                <div>
                  <p className="itemPrixBarre">{item.oldPrice ? `${parseFloat(item.oldPrice).toFixed(2).replace(".", ",")}€` : ''}</p>
                  <p>{parseFloat(item.price).toFixed(2).replace(".", ",")}€</p>
                </div>
                <td className="croix ml-4"><div className="croix itemsuppr" onClick={(e) => handleRemoveProduct(e, item.productId)}><i className="far fa-times-circle"></i></div></td>
              </div>
            </div>
          <hr/>
          </div>
          <hr/>
    </React.Fragment>
  )
};


const CardHover = () => {

  const [cart, setCart] = useContext(AppContext);
  const [codePromo, setCodePromo] = useState('')

  const products = product.products


  const { t, i18n } = useTranslation();

  useEffect(() => {
    if ( process.browser) {
      let cartData = localStorage.getItem('livraison');
      const trueData = JSON.parse(cartData);
      let codePromoData = localStorage.getItem('promoCode');
      let ebookImprime = localStorage.getItem('ebookImprime');
      const promoCodeData = JSON.parse(codePromoData)
      setCodePromo(promoCodeData)
    }
  }, [codePromo]);

  let sumPanier = 0;
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

  let ebookInCart = []
  if (cart) {
    const ebook = cart.products.filter(obj => {
      return obj.productId === '17014'
    })
    if (ebook.length !== 0) {
      ebookInCart = ebook
    }
  }

  //On enlève les ebooks de la qty totale
  if (ebookInCart.length!==0) {
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


  let totalIntermediaire = sumPanier
  if(discountPanier)
    totalIntermediaire -= discountPanier;

  const reducCodePromo = totalIntermediaire * (1/codePromo?.amount)

  let totalPrice1 = sumPanier
  if(discountPanier)
    totalPrice1 -= discountPanier;
  if(reducCodePromo)
    totalPrice1 -= reducCodePromo;

    var totalDiscount = 0;
  if(disTourReducPrice)
    totalDiscount += parseFloat(disTourReducPrice);
  if(disXyloReducPrice)
   totalDiscount += parseFloat(disXyloReducPrice);
  if(tourReducPrice)
    totalDiscount += parseFloat(tourReducPrice);
  if(xyloReducPrice)
    totalDiscount += parseFloat(xyloReducPrice);
  if(playboardReducPrice)
    totalDiscount += parseFloat(playboardReducPrice);
  if(discountPanier)
    totalDiscount += parseFloat(discountPanier);
  if(reducCodePromo)
    totalDiscount += parseFloat(reducCodePromo);

  return (
    <div className={styles.hoverContainer}>
      {
        cart ? (
          cart.products.map(item => (
              <CardHoverItem
                key={item.productId}
                item={item}
              />
            )
          )
        ) : <p>{t('Checkout.4')}</p>
      }


      <div className="prix-container">
        <p className={styles.subtotal}>{t('Checkout.16')} : {totalDiscount.toFixed(2).replace(".", ",")} €</p>
        <hr/>
      </div>

      <div className="prix-container">
        <p className={styles.subtotal}>{t('Checkout.17')} : {totalPrice1.toFixed(2).replace(".", ",")} €</p>
        <hr/>
      </div>
      <Link href="/checkout">
        <a>
          <div className={styles.buttonsContainer}>
          <p className={styles.linkPopper} id="linkCart">{t('Form.3')}</p>
          </div>
        </a>
      </Link>
    </div>
  )

}

export default CardHover;
