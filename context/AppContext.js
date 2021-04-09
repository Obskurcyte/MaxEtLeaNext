import React, {useState, useEffect} from 'react';

export const AppContext = React.createContext([
  {},
  newCart => {}
]);

export const AppProvider = props => {
  const [cart, setCart] = useState(null);
  useEffect(() => {
    if ( process.browser) {
      let cartData = localStorage.getItem('woo-next-cart');
      cartData = null !== cartData ? JSON.parse(cartData) : ''
      setCart(cartData)
      console.log(cart)
    }
  }, []);
  return (
    <AppContext.Provider value={[ cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  )
}
