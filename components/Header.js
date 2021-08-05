import React, {useEffect, useState, useContext} from 'react';
import { Nav } from 'react-bootstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import {AppContext} from "./context/AppContext";
import i18next from "i18next";
import CardHover from "./CardHover";
import Link from 'next/link';
import {useDispatch, useSelector} from "react-redux";
import {getDrapeau} from "../store/actions/drapeau";
import {faShoppingBasket} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (props) => {


  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const lang = i18next.language;
  const [cart, setCart] = useContext(AppContext);
  let totalPrice1 = 0;
  if (cart) {
    for (let data in cart.products) {
      totalPrice1 += parseFloat(cart.products[data].totalPrice)
    }
  }
  let user = '';

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      user = localStorage.getItem('userName');
    }
  })

  const drapeau = useSelector(state => state.drapeau.drapeau)

  const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductCount : '';


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang) => {
    i18n.changeLanguage(lang).then(() => setAnchorEl(null))
    if (lang === 'fr') {
      dispatch(getDrapeau('/flagfr.png'))
    } if (lang === 'en') {
      dispatch(getDrapeau('/flagen.png'))
    } if (lang === 'es') {
      dispatch(getDrapeau('/flages.png'))
    } if (lang === 'al') {
      dispatch(getDrapeau('/flagal.png'))
    }
  };

  const renderCart = () => {
    return <CardHover />
  }

  return (
    <div className="stickyHeader">
      <div className="freeContainer">
        <h1 className="freeLivraison">Livraison GRATUITE en Europe (3-5 jours) à partir de 30€ d'achat</h1>
      </div>
        <nav className="containerHeader">
          <div className="drapeauContainer">
            <p className="langue">{lang}</p>
            <img src={drapeau} alt="drapeau français" className="drapeauImg" onClick={handleClick}/>
          </div>
          <Nav className="navBar">
            <div className="imgContainer">
              <Link href="/">
                <img src={'/logogrand.webp'} alt="" className="imgNavbar"/>
              </Link>
            </div>

            <div className="linksContainer">
              <Link href="/">Home</Link>
              <Link href="/about">{t("Footer.1")}</Link>
              <Link href="/contact">{t("Footer.4")}</Link>
              <Link href="/blogs">{t("Footer.3")}</Link>
            </div>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose('en')}><img src={'/flagen.png'} alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('es')}><img src={'/flages.png'} alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('al')}><img src={'/flagal.png'} className="drapeauAllemand" alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('fr')}><img src={'/flagfr.png'} alt=""/></MenuItem>

            </Menu>
            <div className="accountShopping" onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <Link href="/cart">
                <Nav.Link>

                  <div className="cartWrap">
                    <div className="productsCountContainer">
                      <div className="productCountInnerContainer">{productCount ? <span className="productCountText">{productCount}</span> : <span className="productCountText">0</span>}</div>
                    </div>
                    <div className="flex">
                      <div className='productPrice'>
                      {totalPrice1 ? <span className="totalPriceSpan">{totalPrice1.toFixed(2)} €</span> : <span className="totalPriceSpan">0, 00 €</span>}
                      </div>
                      <FontAwesomeIcon icon={faShoppingBasket} className="shoppingCart"/>
                    </div>
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
