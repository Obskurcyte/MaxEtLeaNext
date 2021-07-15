import React, {useEffect, useState, useContext} from 'react';
import { Nav } from 'react-bootstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import {AppContext, AppProvider} from "./context/AppContext";
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
                <img src="https://maxandlea.com/wp-content/uploads/2020/05/Logo-Max-et-Lea_Plan-de-travail-1-1536x567.png" alt="" className="imgNavbar"/>
              </Link>
            </div>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => handleClose('en')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.png" alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('es')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.png" alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('al')}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/langfr-225px-Flag_of_Germany.svg.png" className="drapeauAllemand" alt=""/></MenuItem>
              <MenuItem onClick={() => handleClose('fr')}><img src="https://maxandlea.com/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.png" alt=""/></MenuItem>

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
