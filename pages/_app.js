import '../styles/globals.css';
import '../styles/index.css';
import '../styles/footer.css';
import '../styles/playboard.css';
import '../styles/xylophone.css';
import '../styles/cartItem.css';
import '../styles/contact.css';
import '../styles/checkout.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../i18n';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import productReducer from "../store/reducers/product";
import blogReducer from "../store/reducers/blog";
import commandeReducer from "../store/reducers/commandes";
import {AppProvider} from "../components/context/AppContext";
import React from "react";
import { ApolloProvider } from '@apollo/client/react';
import client from "../components/ApolloClient";
import Head from 'next/head'

const rootReducer = combineReducers({
  product: productReducer,
  blog: blogReducer,
  commande: commandeReducer
});


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function MyApp({ Component, pageProps }) {
  return(

    <React.Fragment>
          <Head>
      <script dangerouslySetInnerHTML={{__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KV59DL8');`}} />
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
