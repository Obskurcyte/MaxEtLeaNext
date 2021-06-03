import React, {useState, useEffect} from 'react';

export const AppContext = React.createContext([
  {},
  newCart => {},
  commandeCart => {},
  adresseFacturation => {},
  villeFacturation => {},
  codePostalFacturation => {},
  adresseLivraison => {},
  villeLivraison => {},
  codePostalLivraison => {},
  total => {},
  sousTotal => {},
  expedition => {},
  moyenPaiement => {}
]);

export const AppProvider = props => {

  const [cart, setCart] = useState(null);
  const [commandeCart, setCommandeCart] = useState(null);
  const [adresseFacturation, setAdresseFacturation] = useState(null);
  const [total, setTotal] = useState(null);
  const [sousTotal, setSousTotal] = useState(null);
  const [expedition, setExpedition] = useState(null);
  const [moyenPaiement, setMoyenPaiement] = useState(null);
  const [adresseLivraison, setAdresseLivraison] = useState(null);
  const [villeFacturation, setVilleFacturation] = useState(null);
  const [codePostalFacturation, setcodePostalFacturation] = useState(null);
  const [codePostalLivraison, setcodePostalLivraison] = useState(null);
  const [villeLivraison, setVilleLivraison] = useState(null);
  const [nom, setNom] = useState(null);
  const [prenom, setPrenom] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    if ( process.browser) {
      let cartData = localStorage.getItem('woo-next-cart');
      let cartCommandeData = localStorage.getItem('commande-cart');
      cartData = null !== cartData ? JSON.parse(cartData) : '';
      cartCommandeData = null !== cartCommandeData ? JSON.parse(cartCommandeData) : ''
      setCart(cartData)
      setCommandeCart(cartCommandeData)
      console.log(cart)
      console.log(commandeCart)
    }
  }, []);

  return (
    <AppContext.Provider value={[
      cart, setCart,
      commandeCart, setCommandeCart,
      adresseFacturation, setAdresseFacturation,
      moyenPaiement, setMoyenPaiement,
      total, setTotal,
      sousTotal, setSousTotal,
      expedition, setExpedition,
      adresseLivraison, setAdresseLivraison,
      codePostalFacturation, setcodePostalFacturation,
      codePostalLivraison, setcodePostalLivraison,
      villeFacturation, setVilleFacturation,
      villeLivraison, setVilleLivraison,
      nom, setNom,
      prenom, setPrenom,
      email, setEmail,
      phone, setPhone
      ]}>
      {props.children}
    </AppContext.Provider>
  )
}
