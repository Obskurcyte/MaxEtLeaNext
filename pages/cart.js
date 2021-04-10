import React, {useContext} from 'react';
import Header from "../components/Header";
import {AppContext} from "../context/AppContext";
import {Table} from 'react-bootstrap';
import CartItem from "../components/CartItem";
import Link from 'next/link'


const CartScreen = props => {


  const [cart, setCart] = useContext(AppContext)
  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }
  console.log(cart)

  const isProductInCart = (existingProductsInCart, productId) => {
    const returnItemThatExists = (item, index) => {
      if (productId === item.productId) {
        return item;
      }
    };

    const newArray = existingProductsInCart.filter(returnItemThatExists)

    return existingProductsInCart.indexOf(newArray[0]);
  };



  return (
    <div>
      <Header />
      <div className="container-cart" >

        <h1>Votre panier</h1>
        { cart ? (
          <div>
            <div className="container">
              <Table>
                <thead>
                <tr>
                  <th className="container-croix" />
                  <th />
                  <th className="container-produit">Produit</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Sous-total</th>
                </tr>
                </thead>
                <tbody>
                {
                  cart.products.length && (
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
                {/*  <tr className='gras'>
              <div>
                <td className="croix"><button className="button-supp">x</button></td>
                <td><img src="https://maxandlea.com/wp-content/uploads/2020/07/XYLOPHONE-TABS-compress-150x150.jpg" className="cart-image" alt=""/></td>
              </div>
              <td className="rose">Xylophone</td>
              <td>21,90€</td>
              <div className="input-card">
                <button className="decrease-button" onClick={onDecreaseClick}>-</button>
                <input type="text" className="change-quantity" value={1}/>
                <button className="increase-button" style={{color: "#e72c59"}} onClick={onIncreaseClick}>+</button>
              </div>
              <td>21,90€</td>
            </tr>
            <tr>
              <td>
                  <div className="code-promo">
                    <input type="text" className="code-promo-input"/>
                    <div className="cart-button-container">
                      <button className="cart-button">Appliquez le code promo</button>
                    </div>
                  </div>
              </td>
            </tr>
              */}
                </tbody>
              </Table>
            </div>
            <div className="cart-total">
              <div className="col-6">
                <div className="total-panier">
                  <h2>Total panier</h2>
                </div>
                <div className='total'>
                  <div className="total-text">
                    <h5 >Total</h5>
                  </div>
                  <div className="total-price">
                    <p>{totalPrice1} €</p>
                  </div>
                </div>
                <div>
                  <p>Aucune méthode de livraison disponible pour un panier de ce poids. Veuillez ajuster le nombre d'articles dans votre panier.</p>

                </div>
              </div>
            </div>
            <Link to="/checkout">
              <button className="cart-valide">Valider la commande</button>
            </Link>
          </div>
        ): <h1>Vous n'avez aucun article dans votre panier</h1>}

      </div>
    </div>
  )
};

export default CartScreen;
