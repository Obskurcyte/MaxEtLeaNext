import React, {useState, useEffect} from 'react';

export const AppContext = React.createContext([
  {},
  newCart => {},
  commandeCart => {}
]);

export const AppProvider = props => {
  const [cart, setCart] = useState(null);
  const [commandeCart, setCommandeCart] = useState(null);
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
    <AppContext.Provider value={[ cart, setCart, commandeCart, setCommandeCart]}>
      {props.children}
    </AppContext.Provider>
  )
}
