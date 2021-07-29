import React, {Fragment, useContext, useEffect, useState} from 'react';
import Header from "../components/Header";
import Head from "next/head";
import Footer from "../components/Footer";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";


const Remerciement = (props) => {

  const [dataClient, setDataClient] = useState(null);
  const [cartCommande, setCartCommande] = useState(null);
  const [moyenPaiement, setMoyenPaiement] = useState('');

  const WooCommerce = new WooCommerceRestApi({
    url: 'https://maxandlea.fr',
    consumerKey: 'ck_9e4d330373ed9a52a684ec88434271aa37652603',
    consumerSecret: 'cs_a0272dea628e462d7288a10226cfa3e1f4ffcaff',
    version: 'wc/v3'
  });

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
      console.log(dataClient)
    }

    const createOrderWoo = async () => {

      let dataClientCart = JSON.parse(localStorage.getItem('livraison'));
      let cartClientCommande = JSON.parse(localStorage.getItem('commande-cart'));

      var line_items_array = [];
      if(cartClientCommande && cartClientCommande.products){
        cartClientCommande.products.forEach( product => {
          var temp_obj = {product_id: product.productId, quantity: product.qty};
          line_items_array.push(temp_obj);
        });
      }
      console.log(dataClientCart);
      const data = {
        payment_method: moyenPaiement,
        payment_method_title: moyenPaiement,
        set_paid: true,
        billing: {
          first_name: dataClientCart.prenom,
          last_name: dataClientCart.nom,
          address_1: dataClientCart.adresseFacturation,
          address_2: "",
          city: dataClientCart.villeFacturation,
          state: "",
          postcode: dataClientCart.codePostalFacturation,
          country: dataClientCart.pays,
          email: dataClientCart.email,
          phone: dataClientCart.phone
        },
        shipping: {
          first_name: dataClientCart.prenom,
          last_name: dataClientCart.nom,
          address_1: dataClientCart.adresseLivraison,
          address_2: "",
          city: dataClientCart.villeLivraison,
          state: "",
          postcode: dataClientCart.codePostalLivraison,
          country: dataClientCart.pays
        },
        line_items: line_items_array,
        shipping_lines: [
          {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: dataClientCart.prixLivraison.toString()
          }
        ]
      };


      WooCommerce.post("orders", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    }

    /*createOrderWoo();*/
  }, []);

  return (
    <div>
      <Head>
        <title>Max And Lea - Remerciement</title>
      </Head>
      <Header />
      {dataClient ? (
        <div className="remerciementContainer">
          <div className="imgRemerciementContainer">
            <img src={'/remerciement.webp'} className='imgRemerciement' alt="wola"/>
            <div className="remerciementParagraph">
              <p>MERCI <br/> NOUS AVONS BIEN REÇU <br/>VOTRE COMMANDE</p>
            </div>


          </div>

          <div className="commandeRecueContainer">
            <h5 id="titre-remerciement">Merci. Votre commande a été reçue</h5>
            <div className="imgLogoContainer">
              <img src={'/logogrand.webp'} alt=""/>
            </div>
            <div className="commandeRecap">
              <h5>Détails de la commande</h5>
              <table className=" table table-hover w-full mb-10 striped bordered hover">
                <thead>
                <tr className="woo-next-cart-head-container text-left">
                  <th className="woo-next-cart-heading-el" scope="col">Produit</th>
                  <th className="woo-next-cart-heading-el" scope="col">Total</th>
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
                  <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">Sous-total</td>
                  <td className="woo-next-checkout-total font-bold text-xl textLeft">{dataClient.sousTotal.toFixed(2)} €</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">Expedition</td>
                  <td className="woo-next-checkout-total font-bold text-xl textLeft">{dataClient.prixLivraison} €</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">Moyen de Paiement</td>
                  <td className="woo-next-checkout-total font-bold text-xl textLeft">{moyenPaiement}</td>
                </tr>
                <tr className="bg-gray-200">
                  <td className="woo-next-checkout-total font-normal text-xl textLeft tdInner">Total</td>
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
                    <th className="woo-next-cart-heading-el" scope="col">Adresse de facturation</th>
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
                    <th className="woo-next-cart-heading-el" scope="col">Adresse de livraison</th>
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

          <div className="white">

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
