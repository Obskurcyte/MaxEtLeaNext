import React, { useState, useContext, useEffect } from 'react';
import Billing from "./Billing";
import { AppContext } from "./context/AppContext";
import { useMutation } from '@apollo/client';
import gql from "graphql-tag";
import Link from 'next/link';
import { v4 } from 'uuid';
import {Formik} from "formik";
import Error from "./Error";
import countryList from "./country-list";
const CheckoutForm = () => {

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


  const createCheckoutData = ( order ) => {
    const checkoutData = {
      clientMutationId: v4(),

      billing: {
        firstName: order.firstName,
        lastName: order.lastName,
        address1: order.address1,
        address2: order.address2,
        city: order.city,
        country: order.country,
        state: order.state,
        postcode: order.postcode,
        email: order.email,
        phone: order.phone,
        company: order.company,
      },
      shipping: {
        firstName: order.firstName,
        lastName: order.lastName,
        address1: order.address1,
        address2: order.address2,
        city: order.city,
        country: order.country,
        state: order.state,
        postcode: order.postcode,
        email: order.email,
        phone: order.phone,
        company: order.company,
      },
      shipToDifferentAddress: false,
      paymentMethod: order.paymentMethod,
      isPaid: false,
      transactionId: "hjkhjkhsdsdiui"
    };

    return checkoutData;
  };

  const initialState = {
    firstName: '',
    lastName: '',
    company: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
    createAccount: false,
    orderNotes: '',
    paymentMethod: '',
    errors: null
  };

  // Use this for testing purposes, so you dont have to fill the checkout form over an over again.
  // const initialState = {
  // 	firstName: 'Imran',
  // 	lastName: 'Sayed',
  // 	address1: '109 Hills Road Valley',
  // 	address2: 'Station Road',
  // 	city: 'Pune',
  // 	state: 'Maharastra',
  // 	country: 'ID',
  // 	postcode: '400298',
  // 	phone: '9959338989',
  // 	email: 'imran@gmail.com',
  // 	company: 'Tech',
  // 	createAccount: false,
  // 	orderNotes: '',
  // 	paymentMethod: 'cod',
  // 	errors: null
  // };

  const [ cart, setCart ] = useContext( AppContext );
  const [ input, setInput ] = useState( initialState );
  const [ orderData, setOrderData ] = useState( null );
  const [ requestError, setRequestError ] = useState( null );

  // Get Cart Data.

  // Checkout or CreateOrder Mutation.


  /*
   * Handle form submit.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleFormSubmit = (e) => {
    e.preventDefault()
    const checkOutData = createCheckoutData( input );
    setOrderData( checkOutData );
    setRequestError( null );
    console.log(orderData)
  };

  const [checkoutData, setCheckoutData] = useState({})

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

  console.log(checkoutData)
  console.log(checkout)
  /*
   * Handle onchange input.
   *
   * @param {Object} event Event Object.
   *
   * @return {void}
   */
  const handleOnChange = ( event ) => {

    if ( 'createAccount' === event.target.name ) {
      const newState = { ...input, [event.target.name]: ! input.createAccount };
      setInput( newState );
    } else {
      const newState = { ...input, [event.target.name]: event.target.value };
      setInput( newState );
    }
  };

  useEffect( () => {

    if ( null !== orderData ) {
      // Call the checkout mutation when the value for orderData changes/updates.
      checkout();
    }

  }, [ orderData ] );

  return (
    <>
      { cart ? (

        <Formik
          initialValues={initialState}
          onSubmit={(values) => {

            const checkoutData = {
              clientMutationId: v4(),

              billing: {
                firstName: values.firstName,
                lastName: values.lastName,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                country: values.country,
                state: values.state,
                postcode: values.postcode,
                email: values.email,
                phone: values.phone,
                company: values.company,
              },
              shipping: {
                firstName: values.firstName,
                lastName: values.lastName,
                address1: values.address1,
                address2: values.address2,
                city: values.city,
                country: values.country,
                state: values.state,
                postcode: values.postcode,
                email: values.email,
                phone: values.phone,
                company: values.company,
              },
              shipToDifferentAddress: false,
              isPaid: false,
              transactionId: "hjkhjkhsdsdiui"
            }
            setCheckoutData(checkoutData)

            console.log(values)

          }}>

          {(props) => (
            <form className="woo-next-checkout-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {/*Billing Details*/}
                <div className="billing-details">
                  <h2 className="text-xl font-medium mb-4">Billing Details</h2>
                  <div className="">
                    <div className="">
                      <div className="form-group mb-3">
                        <label className="text-xs" htmlFor="first-name">
                          First Name
                          <abbr className="required" title="required">*</abbr>
                        </label>
                        <input onChange={ props.handleChange('firstName') } value={ props.values.firstName } type="text" name="firstName" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="first-name"/>
                        <Error errors={ input.errors } fieldName={ 'firstName' }/>
                      </div>
                    </div>
                    <div className="">
                      <div className="form-group mb-3">
                        <label className="text-xs" htmlFor="last-name">
                          Last Name
                          <abbr className="required" title="required">*</abbr>
                        </label>
                        <input onChange={ props.handleChange('lastName') } value={ props.values.lastName } type="text" name="lastName" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="last-name"/>
                        <Error errors={ input.errors } fieldName={ 'lastName' }/>
                      </div>
                    </div>
                  </div>
                  {/* Company Name */}
                  <div className="form-group mb-3">
                    <label className="text-xs" htmlFor="first-name">Company Name</label>
                    <input onChange={ props.handleChange('company') } value={ props.values.company } type="text" name="company" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="first-name"/>
                    <Error errors={ input.errors } fieldName={ 'company' }/>
                  </div>
                  {/* Country */}
                  <div className="form-group mb-3">
                    <label className="text-xs" htmlFor="country-select">
                      Country
                      <abbr className="required" title="required">*</abbr>
                    </label>
                    <select onChange={ handleOnChange } value={ input.country } name="country" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="country-select">
                      <option value="">Select a country...</option>
                      { countryList.length && (
                        countryList.map( ( country, index ) => (
                          <option key={ `${country}-${index}` } value={ country.countryCode }>{ country.countryName }</option>
                        ) )
                      ) }
                    </select>
                    <Error errors={ input.errors } fieldName={ 'country' }/>
                  </div>
                  {/* Street Address */}
                  <div className="form-group mb-3">
                    <label className="text-xs" htmlFor="street-address">
                      Street Address
                      <abbr className="required" title="required">*</abbr>
                    </label>
                    <input type="text" onChange={ props.handleChange('adress1') } value={ props.values.address1 } name="address1" placeholder="House number and street name" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded mb-3" id="street-address"/>
                    <Error errors={ input.errors } fieldName={ 'address1' }/>
                    <br/>
                    <input type="text" onChange={ handleOnChange } value={ input.address2 } name="address2" placeholder="Apartment, suite, unit etc.(optional)" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="first-name"/>
                  </div>
                  {/* Town/City */}
                  <div className="form-group mb-3">
                    <label className="text-xs" htmlFor="city">
                      Town/City
                      <abbr className="required" title="required">*</abbr>
                    </label>
                    <input onChange={ props.handleChange('city') } value={ props.values.city } type="text" name="city" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="city"/>
                    <Error errors={ input.errors } fieldName={ 'city' }/>
                  </div>
                  {/* County */}
                  <div className="form-group mb-3">
                    <label className="text-xs" htmlFor="state">
                      State/County
                      <abbr className="required" title="required">*</abbr>
                    </label>
                    <input onChange={ props.handleChange('state') } value={ props.values.state } type="text" name="state" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="state"/>
                    <Error errors={ input.errors } fieldName={ 'state' }/>
                  </div>
                  {/* Post Code */}
                  <div className="form-group mb-3">
                    <label className="text-xs" htmlFor="post-code">
                      Postcode
                      <abbr className="required" title="required">*</abbr>
                    </label>
                    <input onChange={ props.handleChange('postcode') } value={ props.values.postcode } type="text" name="postcode" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="post-code"/>
                    <Error errors={ input.errors } fieldName={ 'postcode' }/>
                  </div>
                  {/*Phone & Email*/}
                  <div className="row">
                    <div className="col-lg-6 col-md-12 p-0 pr-2">
                      <div className="form-group mb-3">
                        <label className="text-xs" htmlFor="phone">
                          Phone
                          <abbr className="required" title="required">*</abbr>
                        </label>
                        <input onChange={ props.handleChange('phone') } value={ props.values.phone } type="text" name="phone" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="phone"/>
                        <Error errors={ input.errors } fieldName={ 'phone' }/>
                      </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 p-0">
                      <div className="form-group mb-3">
                        <label className="text-xs" htmlFor="email">
                          Email
                          <abbr className="required" title="required">*</abbr>
                        </label>
                        <input onChange={ props.handleChange('email') } value={ props.values.email } type="email" name="email" className="form-control woo-next-checkout-input p-1 w-full border-solid border border-gray-500 rounded" id="email"/>
                        <Error errors={ input.errors } fieldName={ 'email' }/>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="woo-next-place-order-btn-wrap mt-5">
                  <Link href="#">
                    <button className="cart-valide" type = "submit" onClick={props.handleSubmit}>Aller à l'étape suivante</button>
                  </Link>
                </div>
              </div>
            </form>
          )}

        </Formik>
      ) : '' }

      {/*	Show message if Order Sucess*/}
    </>
  );
};

export default CheckoutForm
