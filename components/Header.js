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
import {useDispatch, useSelector} from "react-redux";
import {getDrapeau} from "../store/actions/drapeau";

const Header = () => {

  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

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

  const drapeau = useSelector(state => state.drapeau.drapeau)

  console.log(drapeau)
  const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductCount : '';


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  console.log(open)
  const handleClose = (lang) => {
    i18n.changeLanguage(lang).then(() => setAnchorEl(null))
    if (lang === 'fr') {
      dispatch(getDrapeau('https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png'))
    } if (lang === 'en') {
      dispatch(getDrapeau('https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png'))
    } if (lang === 'es') {
      dispatch(getDrapeau('https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png'))
    } if (lang === 'al') {
      dispatch(getDrapeau('https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langfr-225px-Flag_of_Germany.svg.png'))
    }
  };

  const renderCart = () => {

    return <CardHover />

  }

  return (
    <div className={styles.stickyHeader}>
      <div className={styles.freeContainer}>
        <h1 className={styles.freeLivraison}>Livraison GRATUITE en Europe (3-5 jours) à partir de 30€ d'achat</h1>
      </div>

        <nav>
          <div className={styles.drapeauContainer}>
            <p className={styles.langue}>{lang}</p>
            <img src={drapeau} alt="drapeau français" className={styles.drapeauImg} onClick={handleClick}/>
          </div>
          <Nav className={styles.navBar}>
            <div className={styles.imgContainer}>
              <Link href="/">
                <img src="https://maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-1536x567.png" alt="" className={styles.imgNavbar}/>
              </Link>
            </div>
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
              <MenuItem onClick={() => handleClose('en')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png" alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('es')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png" alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('al')}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langfr-225px-Flag_of_Germany.svg.png" className={styles.drapeauAllemand} alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('fr')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png" alt=""/></MenuItem>

            </Menu>
            <div className={styles.accountShopping} onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <Link href="/cart">
                <Nav.Link>

                  <div className={styles.cartWrap}>
                    {productCount && (<div className={styles.productsCountContainer}>
                      <div className={styles.productCountInnerContainer}>{productCount ? <span className={styles.productCountText}>{productCount}</span> : ''}</div>
                    </div>)}
                    <img src={'/shoppingcart.png'} alt="shopping cart" />
                    {totalPrice1 ? <span className={styles.totalPriceSpan}>{totalPrice1.toFixed(2)}€</span> : ''}
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

export default Header;
