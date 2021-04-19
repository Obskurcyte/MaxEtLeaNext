import React, {useContext} from 'react';
import Header from "../components/Header";
import {Formik} from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';
import YourOrder from "../components/YourOrder";
import {AppContext} from "../components/context/AppContext";
import CheckoutForm from "../components/CheckoutForm";


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const CheckoutScreen = props => {

  const countries = [
    {
      value: 'France',
      label: 'France',
    },
    {
      value: 'USA',
      label: 'Etats-Unis',
    },
    {
      value: 'Allemagne',
      label: 'Allemagne',
    },
    {
      value: 'Suisse',
      label: 'Suisse',
    },
  ];



  const initialValues = {
    nom: '',
    prenom:'',
    adresse: '',
    postalcode: '',
    ville: '',
    pays: '',
    phone: ''
  }

  const [ cart, setCart ] = useContext( AppContext );

  const classes = useStyles();


  return (
    <div>
      <Header />

      <div className="content" style={{padding: '0 10%', marginTop: '5%'}}>

       <CheckoutForm />
      </div>
    </div>
  )
};

export default CheckoutScreen
