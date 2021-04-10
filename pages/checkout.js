import React, {useContext} from 'react';
import Header from "../components/Header";
import {Formik} from 'formik';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';
import YourOrder from "../components/YourOrder";
import {AppContext} from "../components/context/AppContext";


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
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            console.log(values)
            localStorage.setItem('prenom', values.prenom)
            localStorage.setItem('nom', values.nom)
            localStorage.setItem('adresse', values.adresse)
            localStorage.setItem('postalcode', values.postalcode)
            localStorage.setItem('ville', values.ville)
            localStorage.setItem('pays', values.pays)
            localStorage.setItem('phone', values.phone)
          }}
        >
          {props => (
            <form className={classes.root} noValidate autoComplete="off">
              <div style={{display: 'flex', justifyContent: "space-between"}}>
                <div>
                  <div>
                    <TextField
                      required
                      value={props.values.prenom}
                      onChange={props.handleChange('prenom')}
                      id="outlined-error"
                      label="Prénom"
                      variant="outlined"
                    />
                    <TextField
                      id="outlined-error"
                      value={props.values.nom}
                      onChange={props.handleChange('nom')}
                      required
                      label="Nom"
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      required
                      value={props.values.adresse}
                      onChange={props.handleChange('adresse')}
                      id="outlined-error"
                      label="Numéro et nom de rue"
                      variant="outlined"
                    />
                    <TextField
                      required
                      value={props.values.postalcode}
                      onChange={props.handleChange('postalcode')}
                      id="outlined-error"
                      label="Code postal"
                      variant="outlined"
                    />
                  </div>
                  <TextField
                    required
                    value={props.values.ville}
                    onChange={props.handleChange('ville')}
                    label="Ville"
                    variant="outlined"
                  />
                  <TextField
                    select
                    value={props.values.pays}
                    onChange={props.handleChange('pays')}
                    label="Select"
                    helperText="Veuillez sélectionner un pays"
                    defaultValue="France"
                  >
                    {countries.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div>
                  <TextField
                    required
                    value={props.values.phone}
                    onChange={props.handleChange('phone')}
                    id="outlined-error"
                    label="Numéro de téléphone"
                    variant="outlined"
                  />
                </div>

                <div className="your-orders">
                  {/*	Order*/}
                  <h2 className="text-xl font-medium mb-4">Votre commande</h2>
                  <YourOrder cart={ cart }/>

                  {/*Payment*/}
                </div>
              </div>
              <Link href="/paiement">
                <button className="cart-valide" onClick={props.handleSubmit}>Aller à l'étape suivante</button>
              </Link>
            </form>
          )

          }
        </Formik>
      </div>
    </div>
  )
};

export default CheckoutScreen
