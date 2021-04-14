import React, {useEffect, useState, useContext} from 'react';
import { Nav } from 'react-bootstrap';
import styles from "./Header.module.css";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import {AppContext, AppProvider} from "./context/AppContext";
import i18next from "i18next";
import CardHover from "./CardHover";
import Link from 'next/link';

const HeaderJouet = (props) => {

  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const lang = i18next.language;
  const [cart, setCart] = useContext(AppContext);
  console.log('cart', cart);
  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }
  console.log(totalPrice1)
  let user = '';

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      user = localStorage.getItem('userName');
    }
  })


  const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductCount : '';
  const totalPrice = (null !== cart && Object.keys(cart).length) ? cart.totalProductsPrice: '';


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [imgurl, setImgUrl] = useState("https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png")

  console.log(open)
  const handleClose = (lang, url) => {
    i18n.changeLanguage(lang).then(() => setAnchorEl(null)).then(() => setImgUrl(url));
  };

  const renderCart = () => {

    return <CardHover />

  }

  return (
    <div className={styles.stickyHeader}>
      <div style={{backgroundColor: '#e72c59', textAlign: 'center', height: '70px'}}>
        <h1 className={styles.freeLivraison}>Livraison GRATUITE en Europe (3-5 jours) à partir de 30€ d'achat</h1>
      </div>

      <nav>
        <div className={styles.drapeauContainer}>
          <p className={styles.langue}>{lang}</p>
          <img src={imgurl} alt="drapeau français" className={styles.drapeauImg} onClick={handleClick}/>
        </div>
        <Nav className={styles.navBar}>
          <div className={styles.imgContainer}><img src="https://maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-1536x567.png" alt="" className={styles.imgNavbar}/></div>
          <Link href="/" style={{marginTop: '5%'}}>
            <img src={'/home.png'} alt="" style={{width: "3%", height: '3%'}} className={styles.home}/>
          </Link>


          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleClose('en', 'https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png" alt=""/></MenuItem>
            <MenuItem onClick={() => handleClose('es', 'https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png" alt=""/></MenuItem>
            <MenuItem onClick={() => handleClose('al', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langfr-225px-Flag_of_Germany.svg.png')}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langfr-225px-Flag_of_Germany.svg.png" className={styles.drapeauAllemand} alt=""/></MenuItem>
            <MenuItem onClick={() => handleClose('fr', 'https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png" alt=""/></MenuItem>

          </Menu>

          <div className={styles.jouet}>
            <div className={styles.prixJouet}>
              <p className={styles.jouetName}>{props.jouetName}</p>
              <p className={styles.jouetPrix}>{props.jouetPrix}</p>
            </div>

            <div className={styles.prixReduc}>
              <div>
              <p className={styles.economie}>(-40% vous économisez 20€)</p>
              </div>
              <div>
              <p className={styles.prixBarre}>49,90€</p>
              </div>
            </div>
          </div>

          <div className={styles.ajouterPanier}>
            <Link href="/cart"><p className={styles.ajouterPanierText}>Ajouter au panier</p></Link>
          </div>
          <div className={styles.accountShopping} onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <Link href="/cart">
                <Nav.Link>

                  <div className="cart-wrap">
                    {productCount && (<div className={styles.productsCountContainer}>
                      <div className={styles.productCountInnerContainer}>{productCount ? <span className={styles.productCountText}>{productCount}</span> : ''}</div>
                    </div>)}
                    <img src={'/shoppingcart.png'} alt="shopping cart" />
                    {totalPrice1 ? <span className={styles.totalPriceSpan}>€{totalPrice1.toFixed(2)}</span> : ''}
                  </div>
                </Nav.Link>

              </Link>
              {open && renderCart()}
            </div>
        </Nav>
      </nav>
    </div>
  )
}

export default HeaderJouet;
