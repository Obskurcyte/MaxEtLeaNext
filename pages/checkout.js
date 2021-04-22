import React, {useContext, useState} from 'react';
import Header from "../components/Header";
import { makeStyles } from '@material-ui/core/styles';
import {AppContext} from "../components/context/AppContext";
import CheckoutForm from "../components/CheckoutForm";
import {CardElement} from '@stripe/react-stripe-js';
import {loadStripe} from "@stripe/stripe-js/pure";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutFormStripe from "../components/CheckoutFormStripe";
import CartItem from "../components/CartItem";
import CheckoutForm2 from "../components/CheckoutForm2";
import {Formik} from "formik";
import TextField from "@material-ui/core/TextField";
import styles from "../components/CheckoutForm2.module.css";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "next/link";
import Garanties from "../components/GarantiesMaxEtLea";
import Footer from "../components/Footer";
import Carousel from 'react-elastic-carousel';
import Recommande from "../components/Recommande";


const stripePromise = loadStripe('pk_test_sIdQGEQcwKTcbOMKcdDnNxTO00z76c41q8')

console.log(process.env.REACT_APP_PUBLISHABLE_KEY)

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

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [checked, setChecked] = React.useState(false);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const {stripe, elements} = props;

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
  };


  const items = [
    {id: 1, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'},
    {id: 2, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'},
    {id: 3, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'},
    {id: 4, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'},
    {id: 5, title: 'dhhdndndjznjznndzjdzndjznjdzjdnzdz  dzndzd zidzjd zdijzjdzi d zdjzjidzj d zjzdz dz djzjd zd'}
  ]

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

  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }


  const [firstStep, setFirstStep] = useState(false);


  const [goPaiement, setGoPaiement] = useState(false)

  console.log(goPaiement)
  return (
    <div>
      <Header />
      <div className="sliderContainer">
        <img src={'/slider.png'} alt="" className="sliderImgContainer"/>
      </div>

      <div className="cadeauContainer">
        <h2 className="cadeauContainerText">Le plus beau cadeau pour votre enfant</h2>
      </div>

      <div className="carouselContainer">
        <Carousel itemsToShow={1} isRTL={false} className="Carousel">
          <div>
          <div className="carouselInnerContainer">
            <img src={'/apostrophe.png'} alt="" className="apostropheImg"/>
            <p className="carouselDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam magni obcaecati possimus saepe. Dolorum ducimus laudantium sequi suscipit vel.</p>
            <img src={'/apostropheClose.png'} alt="" className="apostropheImg"/>
          </div>
            <p className="auteur">Clara, Italie</p>
          </div>
          <div>
            <div className="carouselInnerContainer">
              <img src={'/apostrophe.png'} alt="" className="apostropheImg"/>
              <p className="carouselDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam magni obcaecati possimus saepe. Dolorum ducimus laudantium sequi suscipit vel.</p>
              <img src={'/apostropheClose.png'} alt="" className="apostropheImg"/>
            </div>
            <p className="auteur">Clara, Italie</p>
          </div>
          <div>
            <div className="carouselInnerContainer">
              <img src={'/apostrophe.png'} alt="" className="apostropheImg"/>
              <p className="carouselDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias magnam magni obcaecati possimus saepe. Dolorum ducimus laudantium sequi suscipit vel.</p>
              <img src={'/apostropheClose.png'} alt="" className="apostropheImg"/>
            </div>
            <p className="auteur">Clara, Italie</p>
          </div>
        </Carousel>
      </div>

      <div className="checkoutTextContainer">
        <h1 className="checkoutText">Checkout</h1>
      </div>

      <div className="checkoutContainer">
        <div className="progressBarContainer">
          <p className="progressBarText">CHOIX DU PRODUIT</p>
          <p className="progressBarText">ADRESSE DE LIVRAISON ET DE FACTURATION</p>
          <p className="progressBarText">PAIEMENT</p>
        </div>
        <div className="hrContainer">
          <img src={'/ellipsePetite.png'} alt="" className="ellipseImg"/>
          <hr className={firstStep ? 'premierHrDone' : 'premierHr'}/>
          <img src={'/ellipsePetite.png'} alt="" className="ellipseImg"/>
          <hr className={goPaiement ? 'deuxiemeHrDone' : 'deuxiemeHr'}/>
          <img src={'/ellipsePetite.png'} alt="" className="ellipseImg"/>
        </div>

        <div className="produitPaiementContainer">
          <div className="produitContainer">
            <p className="produitText">Produit</p>
            <div className="productContainer">
              <div className="imgContainer">
                {
                  cart && cart.products.length && (
                    cart.products.map(item => (
                        <CartItem
                          key={item.productId}
                          item={item}
                          setCart={setCart}
                        />
                      )
                    )
                  )
                }
              </div>
            </div>
            <div className="prixRecap">
              <div className="sousTotal">
                <p className="sousTotalText">Discount PlayBoard</p>
                <p className="itemTotalPrice">20 €</p>
              </div>
              <hr className="hrPrix"/>
              <div className="sousTotal">
                <p className="sousTotalText">
                  Sous-total
                </p>
                <p className="itemTotalPrice">{totalPrice1} €</p>
              </div>
            </div>
          </div>
          <img src={'/Séparation.png'} alt="" className=""/>
          <div className="prixContainer">
            <div className="prixText">
              <a href="javascript:void(0);" onClick={() => setGoPaiement(false)}>
              <p className={!goPaiement ? 'coordonneesText' : 'coordonneesTextLight'}>Coordonnées</p>
              </a>
              <p className={goPaiement ? 'coordonneesText' : 'coordonneesTextLight'}>Paiement</p>
            </div>

            <div className="content">
              {!goPaiement ? (
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
                          onFocus={() => setFirstStep(true)}
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

        </div>
      </div>

      <div className="addOtherArticlesPanier">
        <h5 className="addArticleTitle">Ajouter un article et bénéficiez de 10% sur tout votre panier !</h5>
        <Carousel itemsToShow={3} isRTL={false} className="addItemsCarousel">
          <div className="innerArticleContainer">
            <div className="imgContainerCarousel">
              <img src={'/xylophone.png'} alt="" className="xylophoneImg"/>
              <Link href={'/#'}><p className="savoirplus">En savoir plus</p></Link>
            </div>

            <div className="carouselItemAdd">
              <p className='addCarousel'>Ajouter le Xylophone !</p>
              <div className="prixReduc">
                <p className="prixReducText">12,90 €</p>
                <p className="fauxPrix">21,90 €</p>
              </div>
              <div className="economie">
                <p className="economieText">(-41% economisez 9€)</p>
              </div>
              <div className="buttonAddPanierContainer">
                <button className="buttonAddPanier">Ajouter au panier</button>
              </div>
            </div>

          </div>

          <div className="innerArticleContainer">
            <div className="imgContainerCarousel">
              <img src={'/xylophone.png'} alt="" className="xylophoneImg"/>
              <Link href={'/#'}><p className="savoirplus">En savoir plus</p></Link>
            </div>

            <div className="carouselItemAdd">
              <p className='addCarousel'>Ajouter le Xylophone !</p>
              <div className="prixReduc">
                <p className="prixReducText">12,90 €</p>
                <p className="fauxPrix">21,90 €</p>
              </div>
              <div className="economie">
                <p className="economieText">(-41% economisez 9€)</p>
              </div>
              <div className="buttonAddPanierContainer">
                <button className="buttonAddPanier">Ajouter au panier</button>
              </div>
            </div>

          </div>

          <div className="innerArticleContainer">
            <div className="imgContainerCarousel">
              <img src={'/xylophone.png'} alt="" className="xylophoneImg"/>
              <Link href={'/#'}><p className="savoirplus">En savoir plus</p></Link>
            </div>

            <div className="carouselItemAdd">
              <p className='addCarousel'>Ajouter le Xylophone !</p>
              <div className="prixReduc">
                <p className="prixReducText">12,90 €</p>
                <p className="fauxPrix">21,90 €</p>
              </div>
              <div className="economie">
                <p className="economieText">(-41% economisez 9€)</p>
              </div>
              <div className="buttonAddPanierContainer">
                <button className="buttonAddPanier">Ajouter au panier</button>
              </div>
            </div>

          </div>
        </Carousel>
      </div>

      <div>
        <Recommande />
      </div>
      <div>
        <Garanties />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
};

export default CheckoutScreen
