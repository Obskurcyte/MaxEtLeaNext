import React, {useContext} from 'react';
import Header from "../components/Header";
import {Col, Row} from "react-bootstrap";
import {AppContext} from "../components/context/AppContext";
import * as product from '../products';


const TourScreen = () => {

  const [cart, setCart] = useContext(AppContext);

  const products = product.products

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
    let productPrice = getFloatVal(product.price)

    let newCart = {
      products: [],
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
      name: product.name,
      price: productPrice,
      qty: qty,
      totalPrice: parseFloat((productPrice * qty).toFixed(2))
    }
  };

  const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {
    const updatedProducts = getUpdatedProducts(existingCart.products, product, qtyToBeAdded, newQty);
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
    const productExistsIndex = isProductInCart(existingProductsInCart,products[1].id);

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
      console.log(existingCart)
      if (existingCart) {
        existingCart = JSON.parse(existingCart)
        const qtyToBeAdded = 1
        const updatedCart = updateCart(existingCart, products[1], qtyToBeAdded);
        setCart(updatedCart)
      } else {
        const newCart = addFirstProduct(products[1]);
        setCart(newCart)
      }
    }
  }

    return (
      <div>
        <Header/>
        <div className="playboard-container">
          <div className="playboard-description">
            <div className="playboard-images">
              <div className="playboard-image">
                <img src="https://maxandlea.com/wp-content/uploads/2020/06/tour-carre.png" alt=""/>
              </div>
              <div className="playboard-petites-images">
                <Row className="">
                  <Col sm={12} md={2} lg={2} xl={2}>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/06/tour-carre-100x100.png" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/06/IMG_4209-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/06/IMG_4953-logo-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/06/IMG_4241-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/06/TOUR-ARC-EN-CIEL-HD-01-100x100.jpg"
                         alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/06/IMG_4180-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/06/IMG_5003-logo-100x100.jpg" alt=""/>
                    <img src="https://maxandlea.com/wp-content/uploads/2020/06/PYRAMIDE-MS-01-100x100.jpg" alt=""/>
                  </Col>
                </Row>
              </div>
            </div>
            <div className="playboard-total">
              <div className="playboard-rating">
                <h1 className="playboard-title">
                  Tour Arc en Ciel
                </h1>
                <div>
                  <i className="fas fa-star"/>
                  <i className="fas fa-star"/>
                  <i className="fas fa-star"/>
                  <i className="fas fa-star"/>
                  <i className="fas fa-star"/>
                </div>
              </div>

              <div className="add-panier">
                <div className="input-quantity">
                  <button className="decrease-button" onClick={onDecreaseClick}>-</button>
                  <input type="text" className="change-quantity" value={1}/>
                  <button className="increase-button" style={{color: "#e72c59"}} onClick={onIncreaseClick}>+</button>
                </div>

                <div className="button-add-panier">
                  <button onClick={handleAddToCart}>Ajouter au panier</button>
                </div>

                <div className="xylophone-prix">
                  <div style={{display: 'flex', flexDirection: 'column'}} className="inner-xylophone">
                    <h5>19,90€</h5>
                    <p>Seulement 12.90€ avec l’achat de la <a style={{color: '#e72c59'}}
                                                              href="http://localhost:3000/playboard">PlayBoard</a></p>
                  </div>
                </div>
              </div>


              <div className="succes-xylo">
                <p className="description-playboard">
                  La pyramide Arc-en-ciel est <span>ludique</span> et <span>éducative</span>. Elle est adaptée au jeune
                  enfant et l’aidera à <span>développer sa concentration</span> ainsi que
                  sa <span>motricité</span> grâce aux anneaux de couleurs vives
                  qui <span>attireront son attention</span>.

                  Il aiguisera sa <span>créativité</span> en élaborant différents scénarios de constructions.
                </p>
                <div className="ebookgratuits">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
};


export default TourScreen;

