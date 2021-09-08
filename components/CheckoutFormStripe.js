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
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { date } from "yup/lib/locale";
import {useTranslation} from "react-i18next";
import ApplePay from "./ApplePay";
import Checkbox from "@material-ui/core/Checkbox";

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

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };


  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open} id="load-dialog">
      <img src={'/ml.gif'} alt=""/>
      <p style={{textAlign: 'center', color: 'white'}}>CHARGEMENT...</p>
    </Dialog>
  );
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

  const [visaClicked, setVisaClicked] = useState(true);
  const [paypalClicked, setPaypalClicked] = useState(false);
  const [bancontactClicked, setBancontactClicked] = useState(false);



  const { t, i18n } = useTranslation();
  console.log(pays)
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


  const createReference = async () => {
    if(localStorage.getItem('ref') != null){
      const encoded = window.btoa("51c3be50ab9c71d50de81306ddb8590a:bdf2b2c8119512ea65c31d49d96c7e92");
    
      const res = await fetch(`https://maxandlea.fr/wp-json/affwp/v1/affiliates?user=1`, {
          //method: 'POST',
          headers: {
            'Authorization': "Basic "+encoded
          }
        })
      const newData = await res.json();
      var aff_id = 0;
      var aff_rate = 0;
      newData.forEach( aff => {
        if(localStorage.getItem('ref').toLowerCase()==aff.user.user_login.toLowerCase()){
          aff_id = aff.affiliate_id;
          aff_rate = aff.rate;
        }
      });
      if(aff_id != 0){
        const livraisonData = localStorage.getItem('livraison');
        const livraisonObject = JSON.parse(livraisonData);
        var total = parseFloat(livraisonObject.total);
        total = total / 100;
        total = total * aff_rate;
        const linkRefCreate = `https://maxandlea.fr/wp-json/affwp/v1/referrals?affiliate_id=`+aff_id+`&amount=`+total.toFixed(2)+`&status=unpaid`;
        const ref = await fetch( linkRefCreate, {
          method: 'POST',
          headers: {
            'Authorization': "Basic "+encoded
          }
        })
        const newRef = await ref.json();
        localStorage.removeItem('ref');
      }
    }
    setProcessingTo(false)
    router.push('/remerciement').then(() => window.location.reload())
  }
  
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
                  value: totalPrice2.toFixed(2)
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
            let relayID = localStorage.getItem('relay-id');
            let relayAdresse = localStorage.getItem('relay-adresse');
            let relayCP = localStorage.getItem('relay-cp');
            let relayVille = localStorage.getItem('relay-ville');
            let relayPays = localStorage.getItem('relay-pays');

            var line_items_array = [];
            if (cartClientCommande && cartClientCommande.products) {
              cartClientCommande.products.forEach(product => {
                var temp_obj = {product_id: product.productId, quantity: product.qty};
                line_items_array.push(temp_obj);
              });
            }

            var data = {
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
                  method_title: dataClientCart.titreLivraison,
                  total: dataClientCart.prixLivraison.toString()
                }
              ]
            };
            if(relayID != '' && dataClientCart.titreLivraison == 'Livraison en point Mondial Relay'){
              data.meta_data = [
                {
                  key: "Mondial Relay Parcel Shop ID",
                  value: relayID
                },
                {
                  key: "user_lang",
                  value: dataClientCart.userLang
                }
              ];
              data.shipping.address_1 = relayAdresse;
              data.shipping.city = relayVille;
              data.shipping.postcode = relayCP;
              data.shipping.country = relayPays;
            }
            else{
              data.meta_data = [
                {
                  key: "user_lang",
                  value: dataClientCart.userLang
                }
              ]
            }
            WooCommerce.post("orders", data)
              .then((response) => {
                console.log(response.data);
                localStorage.removeItem('woo-next-cart')
                localStorage.setItem('moyenPaiement', moyenPaiement);
                createReference();
              })

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

  /*const [stripeCheckoutError, setStripeCheckoutError] = useState(null)

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
  } );*/

  const stripe = useStripe();
  const elements = useElements();

  const [checkoutError, setCheckoutError] = useState(null)

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
    setCheckoutError(null)
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
      return_url: 'https://maxandlea.com',
    });

    if (error) {
      // Show error to your customer.
      console.log(error.message);
    }

    // Otherwise the customer will be redirected away from your
    // page to complete the payment with their bank.
  };


///////////////----------------POPUP--------------//////////////////

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);

  };
  const [errorLivraison, setErrorLivraison] = useState(false)

  const handleChange1 = (event, prix, titre = "") => {
    setChecked1(!checked1);
    setChecked2(false);
    setChecked3(false);
    setPrixLivraison(prix);
    setTitreLivraison(titre);
  };

  const handleChange2 = (event, prix, titre = "") => {
    setChecked2(!checked2);
    setChecked1(false);
    setChecked3(false);
    setPrixLivraison(prix);
    setTitreLivraison(titre);
  }

  const handleChange3 = (event, prix, titre = "") => {
    setChecked3(!checked3);
    setChecked1(false);
    setChecked2(false);
    setPrixLivraison(prix);
    setTitreLivraison(titre);
  }

  return (


    <div>
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
            let dataClientCart = JSON.parse(localStorage.getItem('livraison'));
            let cartClientCommande = JSON.parse(localStorage.getItem('commande-cart'));
            let relayID = localStorage.getItem('relay-id');
            let relayAdresse = localStorage.getItem('relay-adresse');
            let relayCP = localStorage.getItem('relay-cp');
            let relayVille = localStorage.getItem('relay-ville');
            let relayPays = localStorage.getItem('relay-pays');

            var line_items_array = [];
            if (cartClientCommande && cartClientCommande.products) {
              cartClientCommande.products.forEach(product => {
                var temp_obj = {product_id: product.productId, quantity: product.qty};
                line_items_array.push(temp_obj);
              });
            }

            var data = {
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
                  method_title: dataClientCart.titreLivraison,
                  total: dataClientCart.prixLivraison.toString()
                }
              ]
            };
            if(relayID != '' && dataClientCart.titreLivraison == 'Livraison en point Mondial Relay'){
              data.meta_data = [
                {
                  key: "Mondial Relay Parcel Shop ID",
                  value: relayID
                },
                {
                  key: "user_lang",
                  value: dataClientCart.userLang
                }
              ];
              data.shipping.address_1 = relayAdresse;
              data.shipping.city = relayVille;
              data.shipping.postcode = relayCP;
              data.shipping.country = relayPays;
            }
            else{
              data.meta_data = [
                {
                  key: "user_lang",
                  value: dataClientCart.userLang
                }
              ]
            }
            WooCommerce.post("orders", data)
              .then((response) => {
                console.log(response.data);
                localStorage.removeItem('woo-next-cart')
                localStorage.setItem('moyenPaiement', moyenPaiement);
                createReference();
                
              })
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
            <span>Credit Card</span><img src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAE3RSTlMAAQQHDg8QJjc/QFBVYYyRz9Ptw1HDpQAAAGRJREFUOMvllDcOgEAQA4cMJuP//5WGmj1BwUlMPdJamyBjqs0hIyxOoObwHNQr7R5bUS5bX2kJ/EtbFfDhsDLXbNugq5svNUkStFfbn2dLvNOkq2+o9tiagKIb7veob3J+lXAC6scp9D/ZXR4AAAAASUVORK5CYII='} alt="" className={styles.payImg}/>
          </div>
          <div className={paypalClicked ? styles.paypalContainerClicked : styles.paypalContainer} onClick={() => {
            setVisaClicked(false)
            setPaypalClicked(true)
            setBancontactClicked(false)
          }}>
            <span>PayPal</span><img src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAMAAACf4xmcAAABQVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACmBC6SAAAAanRSTlMAAQIDBAUGBwgJCgsMERITFBUXGBocHR4fICIjJSYqLC0uMjU2ODk6Oz0+QEVGR0lLTE5PVVZiZmdoaW1zdHd4fn+LjI6SlJWYmp2go6iytbe6vMDBw8rMztHX2tze4OTm6evt7/H3+fv9GxeFdwAAAVZJREFUGBmFwYlCElEYBeBzhwGhgQmN9sVSMaRosawUrFBza9HCNlqoLMDz/g8Qc+8MzPKD3wffY0b9216wkNRhwt8lxKUoaSDGpaiMqFsUdRC1QlkJEZuUVRHxhbIHCFMcYx5hDse4hLCrHCOdX8fIPco+oMzbGHpB2TL2+QNDBxT17BxJB4EuRWtokDwHX4aiT1aRA5fhK1HyK2+3OeDCt0hBayrdoicN31MmfKuo8z/paSPwmmF/Pu4+mlEzr2jUEejQqFhKWZZlF248+8rANHwpGk3sMOEAAZfGnGLCSQGBmzSKeSbcxdAKDfs642oY2aD2Gw8Z9d5FyGdqb9DkSP/dk7MIUzRW0aLWm81mLMQ5NCroU9uC5AqNUpbGMiQ1GpkLNK5B8pxaF1UaDiR71A5Rp3YC0ZnqHc9FvKV2hMmOqb3ERDaN+5godUzP9xxOoTyQ/AfW9kR6a/s4pAAAAABJRU5ErkJggg=='} alt="" className={styles.payImg}/>
          </div>

        </div>

        {pays === 'BE' && (
            <img src={'/Bancontact.png'}
                 alt=""
                 className={bancontactClicked ? styles.paypalImgClicked : styles.paypalImg}
                 onClick={() => {
                   setVisaClicked(false)
                   setPaypalClicked(false)
                   setBancontactClicked(true)
                 }}
            />
        )}
      </div>


      {isProcessing &&  <SimpleDialog open={open} />

     }

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
            setOpen(true)
            const {error, paymentMethod } = await stripe.createPaymentMethod({
              type: 'card',
              card: elements.getElement(CardElement)
            })


            if (!error) {
              const {id} = paymentMethod;

              const handlePayment = () => {
                let dataClientCart = JSON.parse(localStorage.getItem('livraison'));
                let cartClientCommande = JSON.parse(localStorage.getItem('commande-cart'));
                let relayID = localStorage.getItem('relay-id');
                let relayAdresse = localStorage.getItem('relay-adresse');
                let relayCP = localStorage.getItem('relay-cp');
                let relayVille = localStorage.getItem('relay-ville');
                let relayPays = localStorage.getItem('relay-pays');

                var line_items_array = [];
                if (cartClientCommande && cartClientCommande.products) {
                  cartClientCommande.products.forEach(product => {
                    var temp_obj = {product_id: product.productId, quantity: product.qty};
                    line_items_array.push(temp_obj);
                  });
                }

                var data = {
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
                      method_title: dataClientCart.titreLivraison,
                      total: dataClientCart.prixLivraison.toString()
                    }
                  ]
                };
                if(relayID != '' && dataClientCart.titreLivraison == 'Livraison en point Mondial Relay'){
                  data.meta_data = [
                    {
                      key: "Mondial Relay Parcel Shop ID",
                      value: relayID
                    },
                    {
                      key: "user_lang",
                      value: dataClientCart.userLang
                    }
                  ]
                  data.shipping.address_1 = relayAdresse;
                  data.shipping.city = relayVille;
                  data.shipping.postcode = relayCP;
                  data.shipping.country = relayPays;
                }
                else{
                  data.meta_data = [
                    {
                      key: "user_lang",
                      value: dataClientCart.userLang
                    }
                  ]
                }
                WooCommerce.post("orders", data)
                  .then((response) => {
                    console.log(response.data);
                    localStorage.removeItem('woo-next-cart')
                    localStorage.setItem('moyenPaiement', moyenPaiement);
                    localStorage.setItem('total', totalPrice2);
                    localStorage.setItem('prixLivraison', prixLivraison);
                    createReference();
                    
                  })
              }

              try {
                const response = await axios.post('/api/charge', {
                  id,
                  amount : parseInt(totalPrice2 * 100)
                })
                console.log('dataStripe', response)

               if (response.data.url) {
                 stripe.handleCardAction(
                    response.data.id
                  ).then(function(result) {
                    console.log('result', result)
                   if(result.paymentIntent) {
                     handlePayment()
                   } else {
                     setCheckoutError('Une erreur est survenue')
                     setProcessingTo(false)
                   }
                 });
                } else {
                 handlePayment()
               }

              } catch (err) {
                setProcessingTo(false)
                console.log(err)
              }
            }
              }
          }
        >
          {props => (
            <form onSubmit={(e) => {e.preventDefault()}}>
              <div className={styles.cardContainer}>
                <span>{t("Form.1")}</span>
                <div className={styles.cardIconsContainer}><img src="/visa.svg"/><img src="/mastercard.svg"/><img src="/amex.svg"/><img src="/logo-cb.jpg"/></div>
                <Row className="rowCheckout">
                  <input
                    name="name"
                    type="text"
                    placeholder={t("Form.2")}
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
              </div>
              <Row>
                {/* TIP always disable your submit button while processing payments */}
                <button className={styles.payButton} type="submit" onClick={props.handleSubmit} disabled={!!checkoutError}>
                  {t("Form.3")}
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

            var url = new URL(window.location);
            var clientSecret = url.searchParams.get('payment_intent_client_secret');
            localStorage.setItem('total', totalPrice2);
            localStorage.setItem('prixLivraison', prixLivraison);

            const {error} = await stripe.confirmBancontactPayment(response.data, {
              payment_method: {
                billing_details: {
                  name: values.name,
                },
              },
              return_url: 'https://maxandlea.com/remerciement/',
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
                {t("Form.4")}
                <input
                  value={props.values.name}
                  onChange={props.handleChange('name')}
                  placeholder={t("Form.5")}
                  className={styles.inputName}
                  required />
              </label>

              <button className={styles.payButton} type="submit" onClick={props.handleSubmit}>
                {t("Form.3")}
              </button>
            </div>
          )}

        </Formik>
      )}
    </div>
  );
};

export default CheckoutFormStripe;
