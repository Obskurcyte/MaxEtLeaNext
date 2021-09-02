import React, { useEffect, useState, useContext } from 'react';
import { Nav } from 'react-bootstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { AppContext } from "./context/AppContext";
import i18next from "i18next";
import CardHover from "./CardHover";
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { getDrapeau } from "../store/actions/drapeau";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Hamburger from 'react-hamburgers';
import Collapsible from "react-collapsible";

const Header = (props) => {


  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const lang = i18next.language;
  const [cart, setCart] = useContext(AppContext);
  const [codePromo, setCodePromo] = useState('')
  useEffect(() => {
    if (process.browser) {
      let cartData = localStorage.getItem('livraison');
      const trueData = JSON.parse(cartData);
      let codePromoData = localStorage.getItem('promoCode');
      const promoCodeData = JSON.parse(codePromoData)
      setCodePromo(promoCodeData)
    }
  }, []);
  let sumPanier = 0;
  let totalPrice2 = 0
  let qtyTotale = 0
  if (cart) {
    for (let data in cart.products) {
      sumPanier += parseFloat(cart.products[data].totalPrice)
      qtyTotale += parseFloat(cart.products[data].qty)
    }
  }



  let playboardReducPrice = 0
  let playboardInCart = []
  if (cart) {
    const playboard = cart.products.filter(obj => {
      return obj.productId === '3163'
    })
    if (playboard.length !== 0) {
      playboardInCart = playboard
      playboardReducPrice = playboard[0].qty * 20
    }
  }

  let tourReducPrice = 0
  let tourInCart = []
  if (cart) {
    const tour = cart.products.filter(obj => {
      return obj.productId === '4527'
    })
    if (tour.length !== 0) {
      tourInCart = tour
      tourReducPrice = tour[0].qty * 7
    }
  }


  let xyloReducPrice = 0
  let xyloInCart = []
  if (cart) {
    const xylo = cart.products.filter(obj => {
      return obj.productId === '4535'
    })
    if (xylo.length !== 0) {
      xyloInCart = xylo
      xyloReducPrice = xylo[0].qty * 9
    }
  }

  let ebookInCart = []
  if (cart) {
    const ebook = cart.products.filter(obj => {
      return obj.productId === '17014'
    })
    if (ebook.length !== 0) {
      ebookInCart = ebook
    }
  }

  //On enlève les ebooks de la qty totale
  if (ebookInCart.length !== 0) {
    qtyTotale = qtyTotale - ebookInCart.length
  }

  let discountPanier = 0;
  if (qtyTotale === 2) {
    discountPanier = (sumPanier * 0.10).toFixed(2)
  } else if (qtyTotale === 3) {
    discountPanier = (sumPanier * 0.15).toFixed(2)
  } else if (qtyTotale >= 4) {
    discountPanier = (sumPanier * 0.20).toFixed(2)
  }


  let totalIntermediaire = sumPanier
  if (discountPanier)
    totalIntermediaire -= discountPanier;

  const reducCodePromo = totalIntermediaire * (1 / codePromo?.amount)

  let totalPrice1 = sumPanier
  if (discountPanier)
    totalPrice1 -= discountPanier;
  if (reducCodePromo)
    totalPrice1 -= reducCodePromo;

  let user = '';

  let numberOfProducts = 0;
  if (cart) {
    for (let data in cart.products) {
      numberOfProducts += parseInt(cart.products[data].qty)
    }
  }

  useEffect(() => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const setLangFromStorage = async () => {
      await delay(50);
      if (localStorage.getItem('lang')) {
        handleClose(localStorage.getItem('lang'))
      }
      await delay(600);
      if (localStorage.getItem('lang')) {
        handleClose(localStorage.getItem('lang'))
      }
      await delay(1200);
      if (localStorage.getItem('lang')) {
        handleClose(localStorage.getItem('lang'))
      }
      await delay(2000);
      if (localStorage.getItem('lang')) {
        handleClose(localStorage.getItem('lang'))
      }
    }
    setLangFromStorage()
  }, []);

  const drapeau = useSelector(state => state.drapeau.drapeau)

  const productCount = (null !== cart && Object.keys(cart).length) ? cart.products.length : '';


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [burgerActive, setBurgerActive] = React.useState(false);
  const [burgerTempClass, setBurgerTempClass] = React.useState(false);

  const delayTime = ms => new Promise(res => setTimeout(res, ms));
  const setBurgerTempClassFunc = async () => {
    setBurgerTempClass(true)
    await delayTime(450);
    setBurgerTempClass(false)
  }

  const burgerDiv = React.createElement('div', {}, <Hamburger active={burgerActive} type="spring" onClick={() => {
    setBurgerActive(!burgerActive)
    setBurgerTempClassFunc()
  }} />);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOutside = () => {
    i18n.changeLanguage(lang).then(() => setAnchorEl(null))
  };

  const handleClose = (lang) => {
    localStorage.setItem('lang', lang)
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
        <h1 className="freeLivraison">{t("BandeauLivraison")}</h1>
      </div>
      <nav className="containerHeader">
        <div className="drapeauContainer" style={{ zIndex: "1" }}>
          <p className="langue">{lang}</p>
          <img src={drapeau} alt="drapeau français" className="drapeauImg" onClick={handleClick} />
        </div>
        <Nav className="navBar">
          <div className="imgContainer" style={{ zIndex: "1" }}>
            <Link href="/">
              <a href="/">
                <img src={'/logogrand.webp'} alt="" className="imgNavbar" />
              </a>
            </Link>
          </div>

          <div className="linksContainer">
            <Link href="/">Home</Link>
            <Link href="/about">{t("Footer.1")}</Link>
            <Link href="/contact">{t("Footer.contact")}</Link>
            <Link href="/blogs">{t("Footer.3")}</Link>
          </div>



          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseOutside}
            style={{ zIndex: "9999" }}
          >
            <MenuItem onClick={() => handleClose('en')}><img src={'/flagen.png'} alt="" /></MenuItem>
            <MenuItem onClick={() => handleClose('es')}><img src={'/flages.png'} alt="" /></MenuItem>
            <MenuItem onClick={() => handleClose('al')}><img src={'/flagal.png'} className="drapeauAllemand" alt="" /></MenuItem>
            <MenuItem onClick={() => handleClose('fr')}><img src={'/flagfr.png'} alt="" /></MenuItem>

          </Menu>
          <div className="accountShopping accountShoppingMobileMain" style={{ zIndex: "1" }}>
            <div onMouseOver={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
              <Link href="/cart">
                <Nav.Link>

                  <div className="cartWrap">
                    <div className="productsCountContainer">
                      <div className="productCountInnerContainer">{productCount ? <span className="productCountText">{numberOfProducts}</span> : <span className="productCountText">0</span>}</div>
                    </div>
                    <div className="flex">
                      <div className='productPrice'>
                        {totalPrice1 ? <span className="totalPriceSpan">{totalPrice1.toFixed(2)} €</span> : <span className="totalPriceSpan">0, 00 €</span>}
                      </div>
                      <FontAwesomeIcon icon={faShoppingBasket} className="shoppingCart" />
                    </div>
                  </div>
                </Nav.Link>

              </Link>
              {open && renderCart()}
            </div>

          </div>
          
        </Nav>
      </nav>
      <div className={!burgerTempClass ? "burgerMenuContainer" : "burgerMenuContainer burgerMenuContainerTemp"}>
        <Collapsible trigger={burgerDiv} overflowWhenOpen="visible" contentInnerClassName="customMenuContainer">
          <div className="linksContainerMobile">
            <Link href="/">Home</Link>
            <Link href="/about">{t("Footer.1")}</Link>
            <Link href="/contact">{t("Footer.contact")}</Link>
            <Link href="/blogs">{t("Footer.3")}</Link>
          </div>
        </Collapsible>
      </div>
    </div>
  )
}

export default Header;
