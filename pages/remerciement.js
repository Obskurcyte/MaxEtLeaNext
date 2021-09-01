import React, {Fragment, useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import Head from "next/head";
import Footer from "../components/Footer";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import {useTranslation} from "react-i18next";


const Remerciement = (props) => {

  const { t, i18n } = useTranslation();

  const [dataClient, setDataClient] = useState(null);
  const [cartCommande, setCartCommande] = useState(null);
  const [moyenPaiement, setMoyenPaiement] = useState('');

  const WooCommerce = new WooCommerceRestApi({
    url: 'https://maxandlea.fr',
    consumerKey: 'ck_9e4d330373ed9a52a684ec88434271aa37652603',
    consumerSecret: 'cs_a0272dea628e462d7288a10226cfa3e1f4ffcaff',
    version: 'wc/v3'
  });


    const createReference = async () => {
        if(localStorage.getItem('ref') != null){
            const encoded = window.btoa("51c3be50ab9c71d50de81306ddb8590a:bdf2b2c8119512ea65c31d49d96c7e92");

            const res = await fetch(`https://maxandlea.fr/wp-json/affwp/v1/affiliates?user=1`, {
                //method: 'POST',
                headers: {
                    'Authorization': "Basic "+encoded
                }
            })
            const newData = await res.json();
            var aff_id = 0;
            var aff_rate = 0;
            newData.forEach( aff => {
                if(localStorage.getItem('ref').toLowerCase()==aff.user.user_login.toLowerCase()){
                    aff_id = aff.affiliate_id;
                    aff_rate = aff.rate;
                }
            });
            if(aff_id != 0){
                const livraisonData = localStorage.getItem('livraison');
                const livraisonObject = JSON.parse(livraisonData);
                var total = parseFloat(livraisonObject.total);
                total = total / 100;
                total = total * aff_rate;
                const linkRefCreate = `https://maxandlea.fr/wp-json/affwp/v1/referrals?affiliate_id=`+aff_id+`&amount=`+total.toFixed(2)+`&status=unpaid`;
                const ref = await fetch( linkRefCreate, {
                    method: 'POST',
                    headers: {
                        'Authorization': "Basic "+encoded
                    }
                })
                const newRef = await ref.json();
                localStorage.removeItem('ref');
            }
        }
        router.push('/remerciement').then(() => window.location.reload())
    }

 useEffect(() => {
    const url = new URL(window.location);
    const params = new URLSearchParams(url.search)
    if (params.get('payment_intent')) {
        localStorage.setItem('moyenPaiement', 'Bancontact')
        localStorage.removeItem('woo-next-cart')
    }
  }, [])


  useEffect(() => {
    if ( process.browser) {
      let cartData = localStorage.getItem('livraison');
      let moyenPaiement = localStorage.getItem('moyenPaiement')
      let cartNewData = localStorage.getItem('commande-cart');
      const trueData = JSON.parse(cartData);
      const trueCartData = JSON.parse(cartNewData);
      setDataClient(trueData)
      setCartCommande(trueCartData)
      setMoyenPaiement(moyenPaiement)
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Max And Lea - {t("Remerciement.title")}</title>
      </Head>
      <Header />
      {dataClient ? (
        <div className="remerciementContainer">
          <div className="imgRemerciementContainer">
            <div class="merci-bg-overlay"></div>
            <div className="remerciementParagraph">
              <p>{t("Remerciement.1")}</p>
            </div>
          </div>

          <div className="commandeRecueContainer">
            <h5 id="titre-remerciement">{t("Remerciement.2")}</h5>
            <div className="imgLogoContainer">
              <img src={'/logogrand.webp'} alt=""/>
            </div>
            <div className="commandeRecap">
              <h5>{t("Remerciement.3")}</h5>
              <table className=" table table-hover w-full mb-10 striped bordered hover">
                <thead>
                <tr className="woo-next-cart-head-container text-left">
                  <th className="woo-next-cart-heading-el" scope="col">{t("Remerciement.4")}</th>
                  <th className="woo-next-cart-heading-el" scope="col">{t("Remerciement.5")}</th>
                </tr>

                { (cartCommande && cartCommande.products) && (
                  cartCommande.products.map( item => (
                    <tr>
                      <td key={ item.productId } className="tdInner textLeft">
                        {item.name}  x  {item.qty}
                      </td>
                      <td key={ item.productId } className="textLeft">
                        {(item.totalPrice)} €
                      </td>
                    </tr>
                  ) )
                ) }
                <tr className="bg-gray-200">
                  <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">{t("Remerciement.6")}</td>
                  <td className="woo-next-checkout-total font-bold text-xl textLeft">{dataClient.sousTotal.toFixed(2)} €</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">{t("Remerciement.7")}</td>
                  <td className="woo-next-checkout-total font-bold text-xl textLeft">{dataClient.prixLivraison} €</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">{t("Remerciement.8")}</td>
                  <td className="woo-next-checkout-total font-bold text-xl textLeft">{moyenPaiement}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">{t("Remerciement.5")}</td>
                  <td className="woo-next-checkout-total font-bold text-xl textLeft">{dataClient.total} €</td>
                </tr>

                </thead>
              </table>
            </div>

            <div className="adresseContainer">

              <div className="adresseFacturation">
                <table className=" table table-hover w-full mb-10 striped bordered hover">
                  <thead>
                  <tr className="woo-next-cart-head-container text-left">
                    <th className="woo-next-cart-heading-el" scope="col">{t("Remerciement.9")}</th>
                  </tr>
                  </thead>
                  <tr className="bg-gray-200">
                    <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">
                      <p style={{marginBottom: 0, paddingBottom: 0}}>{dataClient.prenom} {dataClient.nom}</p>
                      <p style={{marginBottom: 0, paddingBottom: 0}}>{dataClient.adresseFacturation}</p>
                      <p style={{marginBottom: 0, paddingBottom: 0}}>{dataClient.codePostalFacturation} {dataClient.villeFacturation}</p>
                      <p style={{marginBottom: 0, paddingBottom: 0}}>{dataClient.phone}</p>
                      <p style={{marginBottom: 0, paddingBottom: 0}}>{dataClient.email}</p>
                      <p></p>
                    </td>
                  </tr>
                </table>
              </div>

              <div className="adresseLivraison">
                <table className=" table table-hover w-full mb-10 striped bordered hover">
                  <thead>
                  <tr className="woo-next-cart-head-container text-left">
                    <th className="woo-next-cart-heading-el" scope="col">{t("Remerciement.10")}</th>
                  </tr>
                  </thead>
                  <tr className="bg-gray-200">
                    <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">
                      <p style={{marginBottom: 0, paddingBottom: 0}}>{dataClient.prenom} {dataClient.nom}</p>
                      <p style={{marginBottom: 0, paddingBottom: 0}}>{dataClient.adresseLivraison}</p>
                      <p style={{marginBottom: 0, paddingBottom: 0}}>{dataClient.codePostalLivraison} {dataClient.villeLivraison}</p>
                    </td>
                  </tr>
                </table>
              </div>

            </div>
          </div>

        </div>
      ) : ''}


      {/*<Fragment>
        { commandeCart ? (
          <Fragment>

            <table className="checkout-cart table table-hover w-full mb-10">
              <thead>
              <tr className="woo-next-cart-head-container text-left">
                <th className="woo-next-cart-heading-el" scope="col"/>
                <th className="woo-next-cart-heading-el" scope="col">Product</th>
                <th className="woo-next-cart-heading-el" scope="col">Total</th>
              </tr>
              </thead>
              <tbody>
              { commandeCart.products && (
                commandeCart.products.map( item => (
                  <CartItem key={ item.productId } item={ item } />
                ) )
              ) }

              <tr className="bg-gray-200">
                <td className=""/>
                <td className="woo-next-checkout-total font-normal text-xl">Subtotal</td>
                <td className="woo-next-checkout-total font-bold text-xl">{totalPrice1} €</td>
              </tr>
              {/* <tr className="">
							<td className=""/>
							<td className="woo-next-checkout-total">Total</td>
							<td className="woo-next-checkout-total">{ cart.totalProductsPrice }</td>
						</tr>
              </tbody>
            </table>
          </Fragment>
        ) : '' }
      </Fragment>
*/}
      <Footer/>
    </div>
  );
};

export default Remerciement;
