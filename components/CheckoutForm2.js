import React, {useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import {Formik} from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Link from "next/link";
import {gql, useQuery, useMutation} from "@apollo/client";
import YourOrder from "../components/YourOrder";
import PaymentModes from "../components/PaymentModes";
import styles from './CheckoutForm2.module.css';
import {AppContext} from "./context/AppContext";
import Checkbox from '@material-ui/core/Checkbox';
import CheckoutFormStripe from "./CheckoutFormStripe";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js/pure";

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const CheckoutForm2 = props => {

  const stripePromise = loadStripe('pk_test_sIdQGEQcwKTcbOMKcdDnNxTO00z76c41q8')

  const [checked, setChecked] = React.useState(true);

  const [goPaiment, setGoPaiement] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
    phone: '',
    email: '',
    adresseFacturation: '',
    villeFacturation: '',
    paysFacturation: '',
    codePostalFacturation: ''
  }

  const [ cart, setCart ] = useContext( AppContext );

  const classes = useStyles();


  return (
    <div>

      <div className="content" style={{padding: '0 10%', marginTop: '5%'}}>
        {goPaiment ? (
          <Formik
            initialValues={initialValues}
            onSubmit={values => {
              setGoPaiement(true)
            }}
          >
            {props => (
              <form className={classes.root} noValidate autoComplete="off">
                <div>
                  <TextField
                    required
                    value={props.values.email}
                    onChange={props.handleChange('email')}
                    id="outlined-error"
                    label="Email"
                    variant="outlined"
                    className={styles.bigInput}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TextField
                    required
                    value={props.values.prenom}
                    onChange={props.handleChange('prenom')}
                    id="outlined-error"
                    label="Prénom"
                    variant="outlined"
                    className={styles.inputMoyenGauche}
                  />
                  <TextField
                    id="outlined-error"
                    value={props.values.nom}
                    onChange={props.handleChange('nom')}
                    required
                    label="Nom"
                    variant="outlined"
                    className={styles.inputMoyenDroit}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TextField
                    required
                    value={props.values.adresse}
                    onChange={props.handleChange('adresse')}
                    id="outlined-error"
                    label="Numéro et nom de rue"
                    variant="outlined"
                    className={styles.inputMoyenGauche}
                  />
                  <TextField
                    required
                    value={props.values.postalcode}
                    onChange={props.handleChange('postalcode')}
                    id="outlined-error"
                    label="Code postal"
                    variant="outlined"
                    className={styles.inputMoyenDroit}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TextField
                    required
                    value={props.values.ville}
                    onChange={props.handleChange('ville')}
                    label="Ville"
                    variant="outlined"
                    className={styles.inputMoyenGauche}
                  />
                  <TextField
                    select
                    value={props.values.pays}
                    onChange={props.handleChange('pays')}
                    label="Select"
                    helperText="Veuillez sélectionner un pays"
                    defaultValue="France"
                    className={styles.inputMoyenDroit}

                  >
                    {countries.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className={styles.checkboxContainer}>
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                  <p className={styles.paragraphFacturation}>Utiliser une adresse de facturation différente</p>
                </div>

                {checked ? (
                  <div className="facturationDifferente">
                    <div className={styles.inputContainer}>
                      <TextField
                        required
                        value={props.values.adresseFacturation}
                        onChange={props.handleChange('adresseFacturation')}
                        id="outlined-error"
                        label="Numéro et nom de rue"
                        variant="outlined"
                        className={styles.inputMoyenGauche}
                      />
                      <TextField
                        required
                        value={props.values.villeFacturation}
                        onChange={props.handleChange('villeFacturation')}
                        id="outlined-error"
                        label="Ville"
                        variant="outlined"
                        className={styles.inputMoyenDroit}
                      />
                    </div>

                    <div className={styles.inputContainer}>
                      <TextField
                        required
                        value={props.values.codePostalFacturation}
                        onChange={props.handleChange('codePostalFacturation')}
                        id="outlined-error"
                        label="Code Postal"
                        variant="outlined"
                        className={styles.inputMoyenGauche}
                      />
                      <TextField
                        select
                        value={props.values.paysFacturation}
                        onChange={props.handleChange('paysFacturation')}
                        label="Select"
                        helperText="Veuillez sélectionner un pays"
                        defaultValue="France"
                        className={styles.inputMoyenDroit}
                      >
                        {countries.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                ) : ''}


                <div className={styles.inputContainer}>
                  <TextField
                    value={props.values.phone}
                    onChange={props.handleChange('phone')}
                    id="outlined-error"
                    label="Numéro de téléphone (facultatif)"
                    variant="outlined"
                    className={styles.bigInput}
                  />
                </div>

                <Link href="#">
                  <button className="cart-valide" onClick={props.handleSubmit}>Aller à l'étape suivante</button>
                </Link>
              </form>
            )

            }
          </Formik>
        ): <Elements stripe={stripePromise}>
          <div className="formData">
            <CheckoutFormStripe/>
          </div>
        </Elements>}

      </div>
    </div>
  )
};

export default CheckoutForm2
