import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import YourOrder from "../components/YourOrder";
import {AppContext} from "../components/context/AppContext";
import {ListGroup} from "react-bootstrap";
import {PayPalButton} from "react-paypal-button-v2";
import {useDispatch} from "react-redux";
import * as commandeActions from '../store/actions/commandes';
import client from "../components/ApolloClient";
import XylophoneScreen from "./xylophone";


const userID = localStorage.getItem('userID');
const prenom = localStorage.getItem('prenom')
const nom = localStorage.getItem('nom')
const adresse = localStorage.getItem('adresse')
const postalcode = localStorage.getItem('postalcode')
const ville = localStorage.getItem('ville')
const pays = localStorage.getItem('pays')
const phone = localStorage.getItem('phone')
const email = localStorage.getItem('email')

const CREATE_COMMANDE_MUTATION = gql `mutation CreateOrder {
  __typename
  createOrder(input: {status: PROCESSING, shipping: {address1: "${adresse}", city: "${ville}", email: "${email}", country: FR, firstName: "${prenom}", lastName: "${nom}", phone: "${phone}", postcode: "${postalcode}", state: "Essone"}, billing: {address1: "${adresse}", city: "${ville}", address2: "", country: FR, company: "", email: "${email}", firstName: "${prenom}", lastName: "${nom}", overwrite: true, phone: "${phone}", postcode: "${postalcode}", state: "Essone"}, lineItems: {productId: 3163, quantity: 2, total: "10", subtotal: "5"}, isPaid: true, feeLines: {amount: "15", total: "15"}, paymentMethod: "cod", shippingLines: {methodId: "cod", methodTitle: "Paiement à la livraison", total: "5"}, customerId: ${userID}}) {
    orderId
  }
}`

const PaiementScreen = props => {

  const [ cart, setCart ] = useContext( AppContext );
  console.log('cart', cart)

  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }


  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)


   // router.push('/payment-recap')
    localStorage.removeItem('woo-next-cart')
    console.log(cart)
    console.log('ok')
  }
  const [sdKready, setSdkReady] = useState(false)

  useEffect(() => {
    const addPayPalScript = async () => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = "https://www.paypal.com/sdk/js?client-id=Aa3c7qfO6HfeBDSRyk6_Pf1MITgO3qCXZ7kA2PPaW3atVSBQNO5tHhbhq7HU2FIinlIeT83X4Cxv5Gqw"
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    addPayPalScript()
    setSdkReady(true)
  });

  return (
    <div>
      <Header />
      <div>
        <h1>Choisissez votre moyen de paiement</h1>
        <div>
          <YourOrder cart={ cart }/>
        </div>
        <div >
          <ListGroup.Item>
            <PayPalButton
              amount={totalPrice1}
              shippingPreference="NO_SHIPPING"
              onSuccess={successPaymentHandler}
            />
          </ListGroup.Item>
        </div>
      </div>
    </div>
  )
};

PaiementScreen.getInitialProps = async () => {
  const result = await client.query({query: CREATE_COMMANDE_MUTATION});


  return {
    commande: result.data
  }
}

export default PaiementScreen
