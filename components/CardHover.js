import React, {useContext, useState} from 'react';
import styles from './CardHover.module.css'
import {AppContext} from "./context/AppContext";
import Link from 'next/link';


const CardHoverItem = ({item}) => {

  const [cart, setCart] = useContext(AppContext);
  console.log('cart', cart)

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
      productId: product.productId,
      name: product.name,
      price: productPrice,
      qty: qty,
      totalPrice: parseFloat((productPrice * qty).toFixed(2))
    }
  };

  const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProducts(existingCart.products, product, qtyToBeAdded, newQty);
    const addPrice = (total, item) => {

      total.totalPrice += item.totalPrice;
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

  console.log(cart)

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



  console.log('item', item)
  const [productCount, setProductCount] = useState(item.qty);

  const handleQtyChange = (event) => {
    if (process.browser) {
      const newQty = event.target.value
      console.log('new Qty', newQty)
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
    console.log('existing', existingCart)

    console.log('existing products' ,existingCart.products.length)
    if (1 === existingCart.products.length) {
      localStorage.removeItem('woo-next-cart')
      return null;
    }

    const productExistIndex = isProductInCart(existingCart.products, productId);

    console.log('product exist index', productExistIndex)

    console.log('product', existingCart.products)
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
            <img src={item.image} alt="product-image" className={styles.image}/>
          </div>
            <div className="flex-column w-50">
              <p className={styles.itemName}>{item.name}</p>
              <div className="quantityContainer flex justify-content-between w-100">
                <p>{productCount} x {item.price}</p>
                <td className="croix ml-4"><div className="croix itemsuppr" onClick={(e) => handleRemoveProduct(e, item.productId)}><i class="far fa-times-circle"></i></div></td>
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

  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }



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
        ) : <p>Vous n'avez pas d'articles dans votre panier</p>
      }
      <div className="prix-container">
        <p className={styles.subtotal}>Sous-total : {totalPrice1.toFixed(2)} €</p>
        <hr/>
      </div>
      <Link href="/checkout">
        <div className={styles.buttonsContainer}>
         <p className={styles.linkPopper} id="linkCart">Commander</p>
        </div>
      </Link>
    </div>
  )

}

export default CardHover;
