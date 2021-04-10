import React, {useContext} from 'react';
import styles from './CardHover.module.css'
import {AppContext} from "./context/AppContext";
import Link from 'next/link';


const CardHoverItem = ({item}) => {




  const [cart, setCart] = useContext(AppContext);
  console.log('cart', cart)

  return (
    <React.Fragment>
      <div>
          <div className={styles.imageContainer}>
            <img src="https://maxandlea.com/wp-content/uploads/2020/07/XYLOPHONE-TABS-compress-150x150.jpg" alt=""/>
            <div>
              <p>{item.name}</p>
            </div>
            <hr/>
          </div>
        <div>
          Quantité: {item.qty}
        </div>
          <hr/>
      </div>
    </React.Fragment>
  )
};


const CardHover = () => {

  const [cart, setCart] = useContext(AppContext);

  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }
  return (
    <div className={styles.hoverContainer}>
      {
        cart ? (
          cart.products.map(item => (
              <CardHoverItem
                item={item}
              />
            )
          )
        ) : <p>Vous n'avez pas d'articles dans votre panier</p>
      }
      <div className="prix-container">
        <p className={styles.subtotal}>Sous-total : {totalPrice1} €</p>
        <hr/>
      </div>
      <div className={styles.buttonsContainer}>
        <Link href="/cart" className={styles.linkPopper}>Voir le panier</Link>
        <Link href="/checkout" className={styles.linkPopper}>Commander</Link>
      </div>
    </div>
  )

}

export default CardHover;
