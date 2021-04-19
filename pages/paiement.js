import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import YourOrder from "../components/YourOrder";
import {AppContext} from "../components/context/AppContext";
import {ListGroup} from "react-bootstrap";
import {PayPalButton} from "react-paypal-button-v2";
import {useRouter} from 'next/router';


/* const userID = localStorage.getItem('userID');
const prenom = localStorage.getItem('prenom')
const nom = localStorage.getItem('nom')
const adresse = localStorage.getItem('adresse')
const postalcode = localStorage.getItem('postalcode')
const ville = localStorage.getItem('ville')
const pays = localStorage.getItem('pays')
const phone = localStorage.getItem('phone')
const email = localStorage.getItem('email')

*/

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
    router.push('/payment-recap')
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



export default PaiementScreen
