import React, { useState } from "react";
import {CardElement, useStripe, useElements, Elements} from "@stripe/react-stripe-js";
import axios from "axios";
import {Row} from 'react-bootstrap'
import styles from './CheckoutFormStripe.module.css'
import {loadStripe} from "@stripe/stripe-js/pure";
import styled from "@emotion/styled";
import {Formik} from "formik";

const CheckoutFormStripe = ({ price, onSuccessfulCheckout, adress, codePostal, email, ville }) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();

  console.log(isProcessing)
  const stripePromise = loadStripe('pk_test_51IjLvTHhHoTNAiE0pkif0qnH6Dl91AUale4WRxVMbPoAGKaScqGFyXxy82Pi2DZw8bfsD82mTceXZ6tIoqqV4XVe00hBpIWhvL')
  const stripe = useStripe();
  const elements = useElements();

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:


  const handleFormSubmit = async ev => {
    ev.preventDefault();

    const billingDetails = {
      name: ev.target.name.value,
      address: {
        city: ville,
        line1: adress,
        postal_code: codePostal
      }
    };

    setProcessingTo(true);


      const { data: clientSecret } = await axios.post("/api/payment_intents", {
        amount: price * 100
      });

      console.log(clientSecret)

      const cardElement = elements.getElement(CardElement);


      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails
      });

      console.log(paymentMethodReq)
    /*  if (paymentMethodReq.error) {
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
  };

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

  // Learning
  // A common ask/bug that users run into is:
  // How do you change the color of the card element input text?
  // How do you change the font-size of the card element input text?
  // How do you change the placeholder color?
  // The answer to all of the above is to use the `style` option.
  // It's common to hear users confused why the card element appears impervious
  // to all their styles. No matter what classes they add to the parent element
  // nothing within the card element seems to change. The reason for this is that
  // the card element is housed within an iframe and:
  // > styles do not cascade from a parent window down into its iframes

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
    <Formik
      initialValues={{email: '', cardnumber: ''}}
      onSubmit={async values => {

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
  );
};

export default CheckoutFormStripe;
