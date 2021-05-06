import React, {useContext, useEffect, useState} from "react";
import {CardElement, useStripe, useElements, Elements} from "@stripe/react-stripe-js";
import axios from "axios";
import {ListGroup, Row} from 'react-bootstrap'
import styles from './CheckoutFormStripe.module.css'
import {loadStripe} from "@stripe/stripe-js/pure";
import styled from "@emotion/styled";
import {Formik} from "formik";
import {v4} from "uuid";
import {useMutation} from "@apollo/client";
import gql from "graphql-tag";
import {AppContext} from "./context/AppContext";
import {useRouter} from 'next/router';
import {PayPalButton} from "react-paypal-button-v2";

const CHECKOUT_MUTATION = gql`
mutation CHECKOUT_MUTATION( $input: CheckoutInput! ) {
  checkout(input: $input) {
    clientMutationId
    order {
      id
      orderKey
      refunds {
        nodes {
          amount
        }
      }
      status
    }
    result
    redirect
  }
}
`;

const CheckoutFormStripe = ({
                              price,
                              onSuccessfulCheckout,
                              adress,
                              codePostal,
                              email,
                              ville,
                              prenom,
                              nom,
                              pays,
                              paysFacturation,
                              adresseFacturation,
  villeFacturation,
  codePostalFacturation,
  phone
                            }) => {
  const [isProcessing, setProcessingTo] = useState(false);

  const [checkoutData, setCheckoutData] = useState({})

  const [visaClicked, setVisaClicked] = useState(false);
  const [paypalClicked, setPaypalClicked] = useState(false);

  console.log(visaClicked)
  console.log(paypalClicked)

  //############    PAYPAL #############//

  const [ cart, setCart ] = useContext( AppContext );
  console.log('cart', cart)

  const router = useRouter()
  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }


  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    router.push('/remerciement')
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


  //##############   STRIPE #############//

  const [ checkout, { data: checkoutResponse, loading: checkoutLoading, error: checkoutError } ] = useMutation( CHECKOUT_MUTATION, {
    variables: {
      input: checkoutData
    },
    onCompleted: () => {
      console.log( 'completed CHECKOUT_MUTATION' );
    },
    onError: ( error ) => {
      console.log('y a erreur')
      if ( error ) {
        setRequestError( error.graphQLErrors[ 0 ].message );
      }
    }
  } );

  console.log(isProcessing)
  const stripe = useStripe();
  const elements = useElements();


  const CardElementContainer = styled.div`
  height: 40px;
  display: flex;
  width: 100%;
  align-items: center;
  & .StripeElement {
    width: 100%;
    padding: 15px;
  }
`;

  const iframeStyles = {
    base: {
      color: 'black',
      fontSize: "16px",
      iconColor: "lightgrey",
      "::placeholder": {
        color: "lightgrey"
      }
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE"
    },
    complete: {
      iconColor: "#cbf4c9"
    }
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true
  };

  return (

    <div>
      <div className={styles.paymentMethods}>
        <div className={visaClicked ? styles.visaContainerClicked : styles.visaContainer} onClick={() => {
          setPaypalClicked(false)
          setVisaClicked(true)
        }}>
          <img src={'/visa.png'} alt="" className={visaClicked ? styles.visaImgClicked : styles.visaImg}/>
        </div>
        <div className={paypalClicked ? styles.paypalContainerClicked : styles.paypalContainer} onClick={() => {
          setVisaClicked(false)
          setPaypalClicked(true)
        }}>
          <img src={'/paypal.png'} alt="" className={paypalClicked ? styles.paypalImgClicked : styles.paypalImg}/>
        </div>
      </div>

      {visaClicked && (
        <Formik
          initialValues={{email: '', cardnumber: ''}}
          onSubmit={async values => {

            const checkoutData = {
              clientMutationId: v4(),

              billing: {
                firstName: prenom,
                lastName: nom,
                address1: adresseFacturation,
                city: villeFacturation,
                country: pays,
                postcode: codePostalFacturation,
                email: email,
                phone: phone,
              },
              shipping: {
                firstName: prenom,
                lastName: nom,
                address1: adress,
                city: ville,
                country: pays,
                postcode: codePostal,
                email: email,
                phone: phone,
              },
              shipToDifferentAddress: false,
              isPaid: false,
              transactionId: "hjkhjkhsdsdiui"
            }
            setCheckoutData(checkoutData)

            console.log(checkoutData)

            const billingDetails = {
              name: values.email,
              address: {
                city: ville,
                line1: adress,
                postal_code: codePostal
              }
            };

            setProcessingTo(true);

            const {data: clientSecret} = await axios.post("/api/payment_intents", {
              amount: price * 100
            });

            console.log(clientSecret)

            const cardElement = elements.getElement(CardElement);

            const paymentMethodReq = await stripe.createPaymentMethod({
              type: "card",
              card: cardElement,
              billing_details: billingDetails
            });

            const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
              payment_method: paymentMethodReq.paymentMethod.id
            })
            console.log(paymentMethodReq)
            console.log(confirmedCardPayment)

            /* if (paymentMethodReq.error) {
               setCheckoutError(paymentMethodReq.error.message);
               setProcessingTo(false);
               return;
             }

             const { error } = await stripe.confirmCardPayment(clientSecret, {
               payment_method: paymentMethodReq.paymentMethod.id
             });

             if (error) {
               setCheckoutError(error.message);
               setProcessingTo(false);
               return;
             }

             onSuccessfulCheckout();
           } catch (err) {
             setCheckoutError(err.message);
           }
           */

          }}
        >
          {props => (
            <form onSubmit={(e) => {e.preventDefault()}}>
              <Row>
                <input
                  name="name"
                  type="text"
                  placeholder="Nom du porteur de la carte"
                  required
                  value={props.values.email}
                  onChange={props.handleChange('email')}
                  className={styles.inputName}
                />
              </Row>
              <Row>
                <div className={styles.CardElementContainer}>
                  <CardElementContainer>
                    <CardElement
                      options={cardElementOpts}
                      onChange={props.handleChange('cardnumber')}
                    />
                  </CardElementContainer>
                </div>
              </Row>
              <Row>
                {/* TIP always disable your submit button while processing payments */}
                <button className={styles.payButton} onClick={props.handleSubmit}>
                  Commandez
                </button>
              </Row>
            </form>
          )}


        </Formik>
      )}


      {paypalClicked && (
        <div >
          <ListGroup.Item>
            <PayPalButton
              amount={totalPrice1}
              shippingPreference="NO_SHIPPING"
              onSuccess={successPaymentHandler}
            />
          </ListGroup.Item>
        </div>
      )}
    </div>
  );
};

export default CheckoutFormStripe;
