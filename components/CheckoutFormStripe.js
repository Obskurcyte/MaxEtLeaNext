import React, {useContext, useEffect, useRef, useState} from "react";
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
import ReactDOM from 'react-dom'
import Head from "next/head";
import {useDispatch} from "react-redux";
import {getCart, setMauvaisCart} from "../store/actions/commandes";
import query from "apollo-cache-inmemory/lib/fragmentMatcherIntrospectionQuery";
import Link from "next/link";

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
  phone,
  remerciement
                            }) => {
  const [isProcessing, setProcessingTo] = useState(false);

  const [checkoutData, setCheckoutData] = useState({})

  const [visaClicked, setVisaClicked] = useState(false);
  const [paypalClicked, setPaypalClicked] = useState(false);

  const dispatch = useDispatch();

  console.log(visaClicked)
  const [ cart, setCart ] = useContext( AppContext );
  console.log(paypalClicked)
  const router = useRouter()
  //############    PAYPAL #############//


  const Paypal = () => {
    const paypal = useRef();
    useEffect(() => {
      window.paypal.Buttons({
        createOrder : (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: 'articles',
                amount: {
                  currency: "EUR",
                  value: totalPrice1
                }
              }
            ]
          })
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if (order.status === 'COMPLETED') {
            localStorage.removeItem('woo-next-cart')
            await router.push('/remerciement')
          }
          console.log(order)
        },
        onError: (err) => {
          console.log(err)
        }
      }).render(paypal.current)
    }, [])
    return (
      <div>
        <div ref={paypal}></div>
      </div>
    )
  }

  console.log('cart', cart)


  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }


  if (cart.products.length === 2) {
    totalPrice1 = totalPrice1 * 0.90
  }

  if (cart.products.length === 3) {
    totalPrice1 = totalPrice1 * 0.85
  }





  //##############   STRIPE #############//

  const [ checkout, { data: checkoutResponse, loading: checkoutLoading, error: checkoutError1 } ] = useMutation( CHECKOUT_MUTATION, {
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

  const [checkoutError, setCheckoutError] = useState('')

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

  const onSuccessfullCheckout = () => {
    router.push('/remerciement')
  }

  const fetchAffiliates = async () => {
    const encoded = window.btoa("51c3be50ab9c71d50de81306ddb8590a:bdf2b2c8119512ea65c31d49d96c7e92")
    ///wp-json/affwp/v1/affiliates
    ///wp-json/affwp/v1/referrals?user_name=theo&amount=15&status=unpaid
    const res = await fetch(`https://maxandlea.fr/wp-json/affwp/v1/affiliates`, {
        //method: 'POST',
        headers: {
          'Authorization': "Basic "+encoded
        }
      })
    const newData = await res.json();
    console.log(newData);
    //return setData(newData.results);
};

const checkPromo = (event) => {
  event.preventDefault();
    fetchAffiliates();
};

  return (

    <div>
      <div className={styles.codePromo}>
        <div>
          <input type="text" placeholder="Code promo" className="inputPromo"/>
        </div>
        <button onClick={checkPromo} className="cart-valide">Valider votre code promo</button>
      </div>
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
            }).then(() => {
              localStorage.removeItem('woo-next-cart')
              router.push('/remerciement')
            })

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


            console.log('wola', paymentMethodReq)
            console.log('wola2', confirmedCardPayment)

            if (paymentMethodReq.error) {
               setCheckoutError(paymentMethodReq.error.message);
               setProcessingTo(false);
             }
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
          <Paypal />
          </ListGroup.Item>
        </div>
      )}
    </div>
  );
};

export default CheckoutFormStripe;
