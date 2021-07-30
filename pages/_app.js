import '../styles/globals.css';
import '../styles/index.css';
import '../styles/footer.css';
import '../styles/playboard.css';
import '../styles/xylophone.css';
import '../styles/cartItem.css';
import '../styles/contact.css';
import '../styles/checkout.css';
import '../styles/blogs.css';
import '../styles/pageBlog.css';
import '../styles/about.css';
import '../styles/equipe.css';
import '../styles/mentionsLegales.css';
import '../styles/remerciement.css';
import '../styles/header.css';
import 'bootstrap/dist/css/bootstrap.css';

import '../i18n';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import productReducer from "../store/reducers/product";
import commandeReducer from "../store/reducers/commandes";
import {AppProvider} from "../components/context/AppContext";
import drapeauReducer from "../store/reducers/drapeau";
import React, {useEffect} from "react";
import { ApolloProvider } from '@apollo/client/react';
import client from "../components/ApolloClient";
import Head from 'next/head';


const rootReducer = combineReducers({
  product: productReducer,
  commande: commandeReducer,
  drapeau : drapeauReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const createVisit = async () => {
      setTimeout(function () {
        console.log("IN USEEFFECT");
        if(localStorage.getItem('ref') != null){
          console.log("ref");
          var encoded = window.btoa("51c3be50ab9c71d50de81306ddb8590a:bdf2b2c8119512ea65c31d49d96c7e92");
          var res = await fetch(`https://maxandlea.fr/wp-json/affwp/v1/affiliates?user=1`, {
              //method: 'POST',
              headers: {
                'Authorization': "Basic "+encoded
              }
            })
          var newData = await res.json();
          console.log(newData)
          var aff_id = 0;
          newData.forEach( aff => {
            if(localStorage.getItem('ref').toLowerCase()==aff.user.user_login.toLowerCase()){
              aff_id = aff.affiliate_id;
            }
          });
          if(aff_id != 0){
            var linkRefCreate = `https://maxandlea.fr/wp-json/affwp/v1/visits?affiliate_id=`+aff_id+`&url=https%3A%2F%2Fmax-et-lea-next.vercel.app`;
            var visit = await fetch( linkRefCreate, {
              method: 'PUT',
              headers: {
                'Authorization': "Basic "+encoded
              }
            })
            var visitData = await visit.json();
            localStorage.setItem("visitId",visitData.visit_id)
            console.log(visitData)
          }
        }
      }, 3000);
    }
    createVisit();
  }, []);
  
  return(

    <React.Fragment>
          <Head>
            <title>MaxEtLea</title>
      <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KV59DL8');`}} />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"
                  integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
                  crossOrigin="anonymous"/>
              <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-gtEjrD/SeCtmISkJkNUaaKMoLD0//ElJ19smozuHV6z3Iehds+3Ulb9Bn9Plx0x4"
  crossOrigin="anonymous"/>

      <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>  
        
      <script type="text/javascript" src="//unpkg.com/leaflet/dist/leaflet.js"></script>  
      <link rel="stylesheet" type="text/css" href="//unpkg.com/leaflet/dist/leaflet.css" />  
        
      <script type="text/javascript" src="https://widget.mondialrelay.com/parcelshop-picker/jquery.plugin.mondialrelay.parcelshoppicker.min.js"></script>  

      <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
              integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
              crossorigin="anonymous"
              />
          </Head>
    <noscript dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KV59DL8" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`}} />

    <AppProvider>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </AppProvider>
  </React.Fragment>

  )
}

export default MyApp
