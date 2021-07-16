import React, {useContext, useEffect, useRef, useState} from "react";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import {ListGroup, Row, Spinner} from 'react-bootstrap'
import styles from './CheckoutFormStripe.module.css'
import styled from "@emotion/styled";
import {Formik} from "formik";
import {v4} from "uuid";
import {useMutation} from "@apollo/client";
import gql from "graphql-tag";
import {AppContext} from "./context/AppContext";
import {useRouter} from 'next/router';
import Head from "next/head";
import {useDispatch} from "react-redux";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import GooglePayButton from "@google-pay/button-react";
import ApplePay from "./ApplePay";

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

const WooCommerce = new WooCommerceRestApi({
  url: 'https://maxandlea.fr',
  consumerKey: 'ck_9e4d330373ed9a52a684ec88434271aa37652603',
  consumerSecret: 'cs_a0272dea628e462d7288a10226cfa3e1f4ffcaff',
  version: 'wc/v3'
});

const createOrderWoo = async () => {

  let dataClientCart = JSON.parse(localStorage.getItem('livraison'));
  let cartClientCommande = JSON.parse(localStorage.getItem('commande-cart'));

  var line_items_array = [];
  if(cartClientCommande && cartClientCommande.products){
    cartClientCommande.products.forEach( product => {
      var temp_obj = {product_id: product.productId, quantity: product.qty};
      line_items_array.push(temp_obj);
    });
  }

  const data = {
    payment_method: moyenPaiement,
    payment_method_title: moyenPaiement,
    set_paid: true,
    billing: {
      first_name: dataClientCart.prenom,
      last_name: dataClientCart.nom,
      address_1: dataClientCart.adresseFacturation,
      address_2: "",
      city: dataClientCart.villeFacturation,
      state: "",
      postcode: dataClientCart.codePostalFacturation,
      country: dataClientCart.pays,
      email: dataClientCart.email,
      phone: dataClientCart.phone
    },
    shipping: {
      first_name: dataClientCart.prenom,
      last_name: dataClientCart.nom,
      address_1: dataClientCart.adresseLivraison,
      address_2: "",
      city: dataClientCart.villeLivraison,
      state: "",
      postcode: dataClientCart.codePostalLivraison,
      country: dataClientCart.pays
    },
    line_items: line_items_array,
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: dataClientCart.prixLivraison.toString()
      }
    ]
  };


  WooCommerce.post("orders", data)
  .then((response) => {

  })
  .catch((error) => {
    console.log(error.response.data);
  });
}

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
  donneesClient,
  loaded,
                              paysFacturation,
  phone,
  totalPrice2,
  prixLivraison,
  remerciement
                            }) => {
  const [isProcessing, setProcessingTo] = useState(false);

  const [checkoutData, setCheckoutData] = useState({})

  const [visaClicked, setVisaClicked] = useState(false);
  const [paypalClicked, setPaypalClicked] = useState(false);
  const [bancontactClicked, setBancontactClicked] = useState(false);

  const  [
    cart, setCart,
    commandeCart, setCommandeCart,
    adresseFacturation, setAdresseFacturation,
    total, setTotal,
    sousTotal, setSousTotal,
    expedition, setExpedition,
    adresseLivraison, setAdresseLivraison,
    codePostalFacturation, setcodePostalFacturation,
    codePostalLivraison, setCodePostalLivraison,
    villeFacturation, setVilleFacturation,
    villeLivraison, setVilleLivraison
  ] = useContext(AppContext)


  let moyenPaiement;
  if (visaClicked) {
    moyenPaiement = 'Carte de Paiement'
  }

  if (paypalClicked) {
    moyenPaiement = 'Paypal'
  }


  const dispatch = useDispatch();


  const router = useRouter()
  //############    PAYPAL #############//



  const [succeeded, setSucceeded] = useState(false);
  const [paypalErrorMessage, setPaypalErrorMessage] = useState("");
  const [orderID, setOrderID] = useState(false);
  const [billingDetails, setBillingDetails] = useState("");

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency: 'EUR',
              // charge users $499 per order
              value: totalPrice2,
            },
          },
        ],
        // remove the applicaiton_context object if you need your users to add a shipping address
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };

  const onApprove = async (data, actions) => {
    const order = await actions.order.capture();

    if (order.status === 'COMPLETED') {
      localStorage.removeItem('woo-next-cart')
      localStorage.setItem('moyenPaiement', moyenPaiement);
      await router.push({
        pathname: '/remerciement',
      })
      window.location.reload()
    }

  };

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
                  value: totalPrice2
                }
              }
            ]
          })
        },
        style: {
          layout: 'horizontal',
          tagline: 'false'
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          if (order.status === 'COMPLETED') {
            let dataClientCart = JSON.parse(localStorage.getItem('livraison'));
            let cartClientCommande = JSON.parse(localStorage.getItem('commande-cart'));

            var line_items_array = [];
            if(cartClientCommande && cartClientCommande.products){
              cartClientCommande.products.forEach( product => {
                var temp_obj = {product_id: product.productId, quantity: product.qty};
                line_items_array.push(temp_obj);
              });
            }

            const data = {
              payment_method: moyenPaiement,
              payment_method_title: moyenPaiement,
              set_paid: true,
              billing: {
                first_name: dataClientCart.prenom,
                last_name: dataClientCart.nom,
                address_1: dataClientCart.adresseFacturation,
                address_2: "",
                city: dataClientCart.villeFacturation,
                state: "",
                postcode: dataClientCart.codePostalFacturation,
                country: dataClientCart.pays,
                email: dataClientCart.email,
                phone: dataClientCart.phone
              },
              shipping: {
                first_name: dataClientCart.prenom,
                last_name: dataClientCart.nom,
                address_1: dataClientCart.adresseLivraison,
                address_2: "",
                city: dataClientCart.villeLivraison,
                state: "",
                postcode: dataClientCart.codePostalLivraison,
                country: dataClientCart.pays
              },
              line_items: line_items_array,
              shipping_lines: [
                {
                  method_id: "flat_rate",
                  method_title: "Flat Rate",
                  total: dataClientCart.prixLivraison.toString()
                }
              ]
            };

            await router.push({
              pathname: '/remerciement',
            })

            WooCommerce.post("orders", data)
            .then((response) => {
              localStorage.removeItem('woo-next-cart')
              localStorage.setItem('moyenPaiement', moyenPaiement);
              window.location.reload()
            })
            .catch((error) => {
              console.log(error.response.data);
            });

          }
        },
        onError: (err) => {
          console.log(err)
        }
      }).render(paypal.current)
    }, [])

    return (
      <div>
        <div ref={paypal}/>
      </div>
    )
  }




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

  const [stripeCheckoutError, setStripeCheckoutError] = useState(null)

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

  const handleCardDetailsChange = ev => {
    console.log('ev', ev)
    ev.error ?
      setCheckoutError(ev.error.message)

       : setCheckoutError();

    ev.error ? setProcessingTo(false) : ''
  };


  //##############   BANCONTACT #############//

  const handleBanContact = async (e) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // For brevity, this example is using uncontrolled components for
    // the accountholder's name. In a real world app you will
    // probably want to use controlled components.
    // https://reactjs.org/docs/uncontrolled-components.html
    // https://reactjs.org/docs/forms.html#controlled-components

    const accountholderName = e.target['accountholder-name'];

    const response = await axios.post("/api/payment_intents", {
      amount: parseInt(totalPrice2 * 100)
    });

    const {error} = await stripe.confirmBancontactPayment(response.data, {
      payment_method: {
        billing_details: {
          name: accountholderName.value,
        },
      },
      return_url: 'http://localhost:3000/thankyou',
    });

    if (error) {
      // Show error to your customer.
      console.log(error.message);
    }

    // Otherwise the customer will be redirected away from your
    // page to complete the payment with their bank.
  };



return (


    <div>
      <Head >
        <title>CheckoutStripe</title>
      </Head>
      <div className={styles.paymentMethodsSuperContainer}>
        <GooglePayButton
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['MASTERCARD', 'VISA'],
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: '12345678901234567890',
              merchantName: 'Demo Merchant',
            },
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPriceLabel: 'Total',
              totalPrice: `${totalPrice2}`,
              currencyCode: 'EUR',
              countryCode: 'FR',
            },
            callbackIntents: ['PAYMENT_AUTHORIZATION']
          }}
          onLoadPaymentData={paymentRequest => {
            console.log('load payment data', paymentRequest);
          }}
          onPaymentAuthorized={paymentData => {
            console.log('Payment Authorized Success', paymentData)
            localStorage.removeItem('woo-next-cart')
            localStorage.setItem('moyenPaiement', 'GooglePay');
            router.push('/remerciement').then(() => window.location.reload())
            return {transactionState: 'success'}
          }}
          existingPaymentMethodRequired="false"
          buttonColor="black"
          buttonType="buy"
        />

        {/*<ApplePay totalPrice={totalPrice2}/>*/}

        <div className={styles.paymentMethods}>
          <div className={visaClicked ? styles.visaContainerClicked : styles.visaContainer} onClick={() => {
            setPaypalClicked(false)
            setVisaClicked(true)
            setBancontactClicked(false)
          }}>
            <img src={'/visa.png'} alt="" className={visaClicked ? styles.visaImgClicked : styles.visaImg}/>
          </div>
          <div className={paypalClicked ? styles.paypalContainerClicked : styles.paypalContainer} onClick={() => {
            setVisaClicked(false)
            setPaypalClicked(true)
            setBancontactClicked(false)
          }}>
            <img src={'/paypal.png'} alt="" className={paypalClicked ? styles.paypalImgClicked : styles.paypalImg}/>
          </div>

        </div>

        {pays === 'Belgique' && (
          <div className={bancontactClicked ? styles.banContactContainerClicked : styles.banContactContainer} onClick={() => {
            setVisaClicked(false)
            setPaypalClicked(false)
            setBancontactClicked(true)
          }}>
            <img src={'/Bancontact.png'} alt="" className={bancontactClicked ? styles.paypalImgClicked : styles.paypalImg}/>
          </div>
        )}
      </div>

      {isProcessing && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>}

      {checkoutError && <p className="text-danger">{checkoutError}</p>}

      {visaClicked && (
        <Formik
          initialValues={{email: ''}}
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


            const billingDetails = {
              name: values.email,
              address: {
                city: ville,
                line1: adress,
                postal_code: codePostal
              }
            };

            setProcessingTo(true);

            const {error, paymentMethod } = await stripe.createPaymentMethod({
              type: 'card',
              card: elements.getElement(CardElement)
            })


            if (!error) {
              const {id} = paymentMethod;

              try {
                const {dataStripe} = await axios.post('/api/charge', {
                  id,
                  amount : parseInt(totalPrice2 * 100)
                })
                console.log(dataStripe)
                let dataClientCart = JSON.parse(localStorage.getItem('livraison'));
                let cartClientCommande = JSON.parse(localStorage.getItem('commande-cart'));

                var line_items_array = [];
                if (cartClientCommande && cartClientCommande.products) {
                  cartClientCommande.products.forEach(product => {
                    var temp_obj = {product_id: product.productId, quantity: product.qty};
                    line_items_array.push(temp_obj);
                  });
                }
                const data = {
                  payment_method: moyenPaiement,
                  payment_method_title: moyenPaiement,
                  set_paid: true,
                  billing: {
                    first_name: dataClientCart.prenom,
                    last_name: dataClientCart.nom,
                    address_1: dataClientCart.adresseFacturation,
                    address_2: "",
                    city: dataClientCart.villeFacturation,
                    state: "",
                    postcode: dataClientCart.codePostalFacturation,
                    country: dataClientCart.pays,
                    email: dataClientCart.email,
                    phone: dataClientCart.phone
                  },
                  shipping: {
                    first_name: dataClientCart.prenom,
                    last_name: dataClientCart.nom,
                    address_1: dataClientCart.adresseLivraison,
                    address_2: "",
                    city: dataClientCart.villeLivraison,
                    state: "",
                    postcode: dataClientCart.codePostalLivraison,
                    country: dataClientCart.pays
                  },
                  line_items: line_items_array,
                  shipping_lines: [
                    {
                      method_id: "flat_rate",
                      method_title: "Flat Rate",
                      total: dataClientCart.prixLivraison.toString()
                    }
                  ],
                  meta_data: [
                    {
                      key: "Mondial Relay Parcel Shop ID",
                      value: "FR-051322"
                    }
                  ]
                };
                WooCommerce.post("orders", data)
                  .then((response) => {
                    console.log(response.data);
                    setProcessingTo(false)
                    localStorage.removeItem('woo-next-cart')
                    localStorage.setItem('moyenPaiement', moyenPaiement);
                    router.push('/remerciement').then(() => window.location.reload())
                  })
              } catch (err) {
                setProcessingTo(false)
                console.log(err)
              }
            }


            /*try {
              const { data: clientSecret } = await axios.post("/api/payment_intents", {
                amount: parseInt(totalPrice2 * 100)
              });



              const paymentMethodReq = await stripe.createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: billingDetails
              });

              console.log('payment', paymentMethodReq)
              if (paymentMethodReq.error) {
                setCheckoutError(paymentMethodReq.error.message);
                setProcessingTo(false);
                return;
              }

              const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethodReq.paymentMethod.id
              });


              console.log('error', error)
              if (error) {
                setCheckoutError(error.message);
                setProcessingTo(false);
                return;
              }


              let dataClientCart = JSON.parse(localStorage.getItem('livraison'));
              let cartClientCommande = JSON.parse(localStorage.getItem('commande-cart'));

              var line_items_array = [];
              if (cartClientCommande && cartClientCommande.products) {
                cartClientCommande.products.forEach(product => {
                  var temp_obj = {product_id: product.productId, quantity: product.qty};
                  line_items_array.push(temp_obj);
                });
              }
              const data = {
                payment_method: moyenPaiement,
                payment_method_title: moyenPaiement,
                set_paid: true,
                billing: {
                  first_name: dataClientCart.prenom,
                  last_name: dataClientCart.nom,
                  address_1: dataClientCart.adresseFacturation,
                  address_2: "",
                  city: dataClientCart.villeFacturation,
                  state: "",
                  postcode: dataClientCart.codePostalFacturation,
                  country: dataClientCart.pays,
                  email: dataClientCart.email,
                  phone: dataClientCart.phone
                },
                shipping: {
                  first_name: dataClientCart.prenom,
                  last_name: dataClientCart.nom,
                  address_1: dataClientCart.adresseLivraison,
                  address_2: "",
                  city: dataClientCart.villeLivraison,
                  state: "",
                  postcode: dataClientCart.codePostalLivraison,
                  country: dataClientCart.pays
                },
                line_items: line_items_array,
                shipping_lines: [
                  {
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: dataClientCart.prixLivraison.toString()
                  }
                ],
                meta_data: [
                  {
                    key: "Mondial Relay Parcel Shop ID",
                    value: "FR-051322"
                  }
                ]
              };
              WooCommerce.post("orders", data)
                .then((response) => {
                  console.log(response.data);
                  setProcessingTo(false)
                  localStorage.removeItem('woo-next-cart')
                  localStorage.setItem('moyenPaiement', moyenPaiement);
                  router.push('/remerciement').then(() => window.location.reload())
                })
                .catch((error) => {
                  setProcessingTo(false)
                  console.log('err', error)
                });
            } catch (err) {
              console.log(err)
              setCheckoutError(err.message);
            }


           /* if (stripeError) {
              setStripeCheckoutError('Une erreur pendant le paiement est survenue !')
              setProcessingTo(false)
              console.log('front', stripeError)
            }
            */




              }
          }
        >
          {props => (
            <form onSubmit={(e) => {e.preventDefault()}}>
              <Row className="rowCheckout">
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
              <Row className="rowCheckout">
                <div className={styles.CardElementContainer}>
                    <CardElement
                      options={cardElementOpts}
                      onChange={handleCardDetailsChange}
                    />
                </div>
              </Row>
              <Row>
                {/* TIP always disable your submit button while processing payments */}
                <button className={styles.payButton} type="submit" onClick={props.handleSubmit} disabled={isProcessing || !stripe}>
                  Commandez
                </button>
              </Row>
            </form>
          )}


        </Formik>
      )}


      {(paypalClicked) ? (
        <div >
           <Paypal />
        </div>
      ) : null}

      {bancontactClicked && (
        <Formik
          initialValues={{
          name: ''
        }}
          onSubmit={async values => {
            if (!stripe || !elements) {
              // Stripe.js has not yet loaded.
              // Make sure to disable form submission until Stripe.js has loaded.
              return;
            }

            // For brevity, this example is using uncontrolled components for
            // the accountholder's name. In a real world app you will
            // probably want to use controlled components.
            // https://reactjs.org/docs/uncontrolled-components.html
            // https://reactjs.org/docs/forms.html#controlled-components


            const response = await axios.post("/api/payment_intents", {
              amount: parseInt(totalPrice2 * 100)
            });

            const {error} = await stripe.confirmBancontactPayment(response.data, {
              payment_method: {
                billing_details: {
                  name: values.name,
                },
              },
              return_url: 'http://localhost:3000/thankyou',
            });

            if (error) {
              // Show error to your customer.
              console.log(error.message);
            }
          }}
        >
          {props => (
            <div>
              <label>
                Nom
                <input
                  value={props.values.name}
                  onChange={props.handleChange('name')}
                  placeholder="Entrez votre nom"
                  className={styles.inputName}
                  required />
              </label>

              <button className={styles.payButton} type="submit" onClick={props.handleSubmit}>
                Commandez
              </button>
            </div>
          )}

        </Formik>
      )}
      <div className={styles.securePayment}><p>* Paiements 100% sûrs et sécurisés *</p></div>
    </div>
  );
};

export default CheckoutFormStripe;
