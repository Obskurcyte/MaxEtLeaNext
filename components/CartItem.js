import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as productAction from "../store/actions/product";
import { AppContext } from "./context/AppContext";
import * as productFile from "../products";


const CartItem = ({ item }) => {

  const [cart, setCart] = useContext(AppContext)

  const products = productFile.products

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
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
        if (-1 < tourExistsIndex) {
          const qtyTour = existingCart.products[tourExistsIndex].qty;
          const updatedCart = removeProduct(products[1].id);
          const newProduct = createNewProduct(products[6], products[6].price, qtyTour)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
        if (-1 < kakoExistsIndex) {
          const qtyKako = existingCart.products[kakoExistsIndex].qty;
          const updatedCart = removeProduct(products[4].id);
          const newProduct = createNewProduct(products[7], products[7].price, qtyKako)
          updatedCart.products.push(newProduct);
          setCart(updatedCart)
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
          localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
          localStorage.setItem('commande-cart', JSON.stringify(updatedCart))
        }
      }
    }
  }

  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  /*useEffect(() => {
    dispatch(productAction.getProducts())
  }, [dispatch])*/



  // const [cart, setCart] = useContext(AppContext);

  const [productCount, setProductCount] = useState(item.qty);

  const onIncreaseClick = () => {

    let existingCart = localStorage.getItem('woo-next-cart');
    existingCart = JSON.parse(existingCart);

    const updatedCart = updateCart(existingCart, item, false, productCount + 1)
    setProductCount(productCount + 1);
    setCart(updatedCart)
    document.querySelector('.change-quantity').value = productCount;
  }

  const onDecreaseClick = () => {
    if (productCount === 1) {
      return;
    } else {

      let existingCart = localStorage.getItem('woo-next-cart');
      existingCart = JSON.parse(existingCart);

      const updatedCart = updateCart(existingCart, item, false, productCount - 1)
      setProductCount(productCount - 1);
      setCart(updatedCart)
      document.querySelector('.change-quantity').value = productCount;
    }
  }

  const getFloatVal = (string) => {
    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)) : '';
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
  const getUpdatedProducts = (existingProductsInCart, product, qtyToBeAdded, newQty = false) => {
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
      else*/ updatedCart.products.splice(productExistIndex, 1)
      updatedCart.totalProductCount = updatedCart.totalProductCount - qtyTBeRemovedFromTotal;
      updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;


      localStorage.setItem('woo-next-cart', JSON.stringify(updatedCart));
      localStorage.setItem('commande-cart', JSON.stringify(updatedCart));
      return updatedCart
    } else {
      return existingCart;
    }
  };

  const handleRemoveProduct = (event, productId) => {
    const updatedCart = removeProduct(productId);
    setCart(updatedCart)
    changeCartProductsExtraDiscounts();
  }

  return (
    <div key={item.productId} className="tr-product" id={"list_" + item.productId}>
      <div className="innerContainerCart">
        <span onClick={(event) => handleRemoveProduct(event, item.productId)}>
          <div className="croix itemsuppr"><i className="far fa-times-circle"></i></div>
        </span>

        <div className="imgContainerCart">
          <img src={item.image} className="cart-image" alt="" />
        </div>

        <div className="prixDescriptionContainer">

          <div className="descriptionProduit">
            <p className="descriptionProduitText">{item.name}</p>
          </div>
          <div className="nameAndQty">
            <div className="input-quantity">
              <button className="decrease-button" onClick={onDecreaseClick} target={item.productId}>-</button>
              <input type="text" className="change-quantity" value={productCount} />
              <button className="increase-button" style={{ color: "#e72c59" }} onClick={onIncreaseClick} target={item.productId}>+</button>
            </div>
            <div>
              <p className="itemPrixBarre">{item.oldPrice ? `${parseFloat(item.oldPrice).toFixed(2)} €` : ''}</p>
              <p className="itemPrix">{parseFloat(item.totalPrice).toFixed(2)} €</p>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  )
}

export default CartItem
