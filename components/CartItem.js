import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as productAction from "../store/actions/product";
import {AppContext} from "./context/AppContext";
import * as products from '../products'


const CartItem = ({item}) => {

  const [cart, setCart] = useContext(AppContext)

  console.log('item', item)




  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  useEffect(() => {
    dispatch(productAction.getProducts())
  }, [dispatch])



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

      const updatedCart = updateCart(existingCart, item, false, productCount -1)
      setProductCount(productCount - 1);
      setCart(updatedCart)
      document.querySelector('.change-quantity').value = productCount;
    }
  }



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
    <div key={item.productId} className="tr-product" id={"list_"+item.productId}>
      <div className="innerContainerCart">
        <span onClick={(event) => handleRemoveProduct(event, item.productId)}>
          <div className="croix itemsuppr"><i class="far fa-times-circle"></i></div>
        </span>

        <div className="imgContainerCart">
          <img src={item.image} className="cart-image" alt=""/>
        </div>

        <div className="prixDescriptionContainer">
          <div>
            <p className="itemPrix">{item.totalPrice} EUR</p>
          </div>
          <div className="nameAndQty">
          <div className="descriptionProduit">
            <p className="descriptionProduitText">{item.name}</p>
          </div>
          <div className="input-quantity">
            <button className="decrease-button" onClick={onDecreaseClick} target={item.productId}>-</button>
              <input type="text" className="change-quantity" value={productCount}/>
            <button className="increase-button" style={{color: "#e72c59"}} onClick={onIncreaseClick} target={item.productId}>+</button>
          </div>
          </div>
        </div>

      </div>
      <hr/>
    </div>
  )
}

export default CartItem
