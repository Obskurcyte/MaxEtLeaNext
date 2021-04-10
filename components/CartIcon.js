import React from 'react';
import {useContext} from 'react';
import {AppContext} from "./context/AppContext";

const CartIcon = () => {
  const [cart, setCart] = useContext(AppContext)
  const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : '';
  const totalPrice = (null !== cart && Object.keys(cart).length) ? cart.totalProductPrice: '';


  return (
    <React.Fragment>

    </React.Fragment>
  )

}
