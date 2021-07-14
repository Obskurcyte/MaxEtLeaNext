import React, {useEffect, useState} from 'react';
import {useStripe, useElements, PaymentRequestButtonElement} from "@stripe/react-stripe-js";
import axios from "axios";

const ApplePay = (props) => {

  console.log(props)
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      currency: 'eur',
      country: 'FR',
      requestPayerEmail: true,
      requestPayerName: true,
      total: {
        label: 'Demo Apple Pay',
        amount: parseInt(props.totalPrice * 100)
      }
    });
    pr.canMakePayment().then(result => {
      if (result) {
          setPaymentRequest(pr)
      }
    })
    pr.on('paymentmethod', async(e) => {
      const {data: clientSecret} = await axios.post("/api/payment_intents", {
        amount: parseInt(props.totalPrice * 100)
      }).then((r) => r.json())

      const {error, paymentIntent} = await stripe.confirmCardPayment(
        clientSecret, {
          payment_method: e.paymentMethod.id
        }, {
          handleActions: false,
        }
        )
      if (error) {
        e.complete('fail');
        return;
      }
      e.complete('success');
      if (paymentIntent.status === 'requires_action') {
        stripe.confirmCardPayment(clientSecret)
      }
      })

  }, [stripe, elements]);

  return (

    <div>
      <h1>Apple Pay</h1>
      {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}}/>}

    </div>

  );
};

export default ApplePay;
