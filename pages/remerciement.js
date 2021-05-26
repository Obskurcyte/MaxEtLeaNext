import React, {Fragment, useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import {useDispatch, useSelector} from "react-redux";
import {getCart} from "../store/actions/commandes";
import {AppContext} from "../components/context/AppContext";
import Head from "next/head";

const Remerciement = (props) => {


  const [ cart, setCart, commandeCart, setCommandeCart ] = useContext( AppContext );
  console.log(commandeCart);

  let totalPrice1 = 0;
  if (commandeCart) {
    for (let data in commandeCart.products) {
      console.log(commandeCart.products[data])
      totalPrice1 += parseFloat(commandeCart.products[data].totalPrice)
    }
  }



  return (
    <div>
      <Head>
        <title>Max And Lea - Remerciement</title>
      </Head>
      <Header />
      <h1>Merci !</h1>
      <Fragment>
        { commandeCart ? (
          <Fragment>
            {/*Product Listing*/}
            <table className="checkout-cart table table-hover w-full mb-10">
              <thead>
              <tr className="woo-next-cart-head-container text-left">
                <th className="woo-next-cart-heading-el" scope="col"/>
                <th className="woo-next-cart-heading-el" scope="col">Product</th>
                <th className="woo-next-cart-heading-el" scope="col">Total</th>
              </tr>
              </thead>
              <tbody>
              { commandeCart.products && (
                commandeCart.products.map( item => (
                  <CartItem key={ item.productId } item={ item } />
                ) )
              ) }
              {/*Total*/}
              <tr className="bg-gray-200">
                <td className=""/>
                <td className="woo-next-checkout-total font-normal text-xl">Subtotal</td>
                <td className="woo-next-checkout-total font-bold text-xl">{totalPrice1} €</td>
              </tr>
              {/* <tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ cart.totalProductsPrice }</td>
						</tr> */}
              </tbody>
            </table>
          </Fragment>
        ) : '' }
      </Fragment>
    </div>
  );
};

export default Remerciement;
